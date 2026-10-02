import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useDisApi } from "@/general";
import { fetchStateDataToken } from "@/general/getStateData";
import { saveAuthData, setUserInfo } from "@/store/module/auth/slice";
import { setCartData } from "@/store/module/cart/cartSlice";
import { countries } from "@/general/Arrays";
import { APP_SOURCE } from "@/constants/app";

/**
 * The claim itself: the form's field state, the account creation, and the
 * hand-off to ProcessOrder — everything except the markup.
 *
 * Lives in a hook because two screens render the same claim with different
 * layouts: the shared RegisterForm (landing → form → ready) and Natas's
 * single-page claim, where the form sits on the landing itself. Both need the
 * same guards, so neither owns them.
 *
 * The caller renders <ProcessOrder {...orderProps} /> while `ordering` is set,
 * rather than this hook doing it, so the order screen inherits each layout's
 * own chrome. Crucially the caller must keep that inside the same component
 * instance — unmounting the form on a failed order would lose `userCreated`
 * and register the user a second time on retry.
 */
export default function useClaimOrder({
  campaign,
  promoCode,
  planStatus,
  planErrorCode,
  planResult,
  onReady,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    ns,
    key: campaignKey,
    destination,
    plan: planConfig,
    completion,
  } = campaign;

  const picksDestination = destination.from === "user";
  // With a destination in hand, KolOrder resolves the plan itself through
  // fetchLocalPlans, so this form has nothing to wait for and must not put a
  // package/variation in the cart for it to overwrite.
  const usesLocalPlans = planConfig.source === "localPlans";
  // "app" campaigns place the order but never activate, so there's no QR to
  // fetch and EsimOrder must skip its activateEsim call.
  const skipActivation = completion.mode === "app";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [destinationCode, setDestinationCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ordering, setOrdering] = useState(false);
  const [error, setError] = useState("");
  // State, not a ref: the effect below waits on this, and a ref mutation
  // wouldn't re-render — leaving the form stuck on "Processing…" whenever the
  // plan had already resolved (i.e. almost always).
  const [userCreated, setUserCreated] = useState(false);
  // useDisApi memoizes createUser's callback via useCallback([apiCall,
  // dispatch]), so it never picks up a fresh closure after the first render —
  // `email` read directly inside that callback would always be "" (the
  // initial state). This ref is refreshed on every submit instead.
  const emailRef = useRef("");

  const planErrorText = planErrorCode ? t(`${ns}.form.${planErrorCode}`) : "";
  // Campaigns that resolve up front can't be claimed on a broken link; the
  // localPlans ones have nothing resolved yet, so there's nothing to block on.
  const planFailed = !usesLocalPlans && planStatus === "error";

  const canSubmit =
    firstName.trim() &&
    lastName.trim() &&
    email.trim() &&
    phone.trim().length > 4 &&
    agree &&
    (!picksDestination || destinationCode) &&
    !planFailed &&
    !submitting;

  const startOrder = () => {
    // Campaigns with a picker send where the user said they're going; the rest
    // fall back to the country the resolver took off the plan.
    const selected =
      picksDestination &&
      countries.find((c) => c.countryCode === destinationCode);
    const locationCode = picksDestination
      ? destinationCode
      : planResult.locationCode;
    const travelLocation = picksDestination
      ? selected?.countryName || destinationCode
      : planResult.travelLocation;

    dispatch(
      setUserInfo({
        email: email.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phoneNumber: phone,
        locationCode,
        travelLocation,
      }),
    );
    dispatch(
      setCartData({
        fsimFlowType: "E",
        isCallFreeEsim: true,
        esimDetails: [],
        promoCode,
        // Only the flows that resolved the plan themselves seed the cart;
        // fetchLocalPlans writes both of these for the others.
        ...(usesLocalPlans
          ? {}
          : { package: planResult.plan, variation: planResult.variation }),
      }),
    );
    setOrdering(true);
  };

  const createUser = useDisApi({
    apiCall: "createUser",
    setCallBack: async (res) => {
      if (!res?.result) {
        setSubmitting(false);
        setError(res?.message || t(`${ns}.form.registrationFailed`));
        return;
      }
      // createUser (unlike addUser/verifyAndLogin) returns no bearer token,
      // but every request after this now requires one (getUser included) —
      // fetch one for the account we just created, using the same email as
      // its identifier, rather than making the visitor verify again for an
      // account this same request just made.
      //
      // source must match what the account was actually created with, not
      // the campaign key: apidispatcher's createUser case ignores whatever
      // source it's passed and always writes sessionStorage["source"] ||
      // APP_SOURCE (general.services.js, unconditional after the switch) —
      // so that's what's really on file for this account.
      try {
        const result = await fetchStateDataToken({
          userId: emailRef.current,
          source: sessionStorage.getItem("source") || APP_SOURCE,
        });
        if (!result?.token) throw new Error("no token");
        dispatch(saveAuthData({ token: result.token }));
        setUserCreated(true);
      } catch {
        setSubmitting(false);
        setError(t(`${ns}.form.registrationFailed`));
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError("");
    // Retry after a failed order — the account already exists, so go
    // straight back to placing the order instead of registering again.
    if (userCreated) {
      startOrder();
      return;
    }
    setSubmitting(true);
    emailRef.current = email.trim();
    createUser({
      email: email.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phoneNumber: phone,
      source: campaignKey,
    });
  };

  // Once the account is created and the link's plan has resolved, place the
  // order. Either can settle first, so this waits on both and re-checks
  // whenever one of them changes.
  useEffect(() => {
    if (!submitting || !userCreated) return;

    // localPlans campaigns have nothing to wait for — the plan is looked up
    // during the order step, against the destination just chosen.
    if (usesLocalPlans) {
      setSubmitting(false);
      startOrder();
      return;
    }

    if (planStatus === "error") {
      setSubmitting(false);
      setError(planErrorText || t(`${ns}.form.registrationFailed`));
      return;
    }
    if (planStatus !== "success" || !planResult) return;

    setSubmitting(false);
    startOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitting, userCreated, planStatus, planResult, planErrorText]);

  const handleOrderFailed = (message) => {
    setOrdering(false);
    setError(message || t(`${ns}.form.orderFailed`));
  };

  return {
    fields: {
      firstName,
      lastName,
      email,
      phone,
      agree,
      destinationCode,
      setFirstName,
      setLastName,
      setEmail,
      setPhone,
      setAgree,
      setDestinationCode,
    },
    picksDestination,
    usesLocalPlans,
    planFailed,
    planErrorText,
    canSubmit,
    submitting,
    ordering,
    error,
    handleSubmit,
    orderProps: {
      comp: campaignKey,
      skipActivation,
      onSuccess: onReady,
      onFailure: handleOrderFailed,
    },
  };
}
