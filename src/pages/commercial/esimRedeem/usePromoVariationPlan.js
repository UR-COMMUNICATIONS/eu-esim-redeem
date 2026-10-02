import { useCallback, useState } from "react";
import { useDisApi } from "@/general";

/**
 * Resolves the plan and package tier a voucher link points at.
 *
 * Shared by every campaign: the hops are a property of the promo/plan APIs, so
 * the only campaign-specific parts are passed in as strategies. Failures
 * surface as stable codes (see ERROR_CODES) which the caller renders from its
 * own translation namespace.
 *
 * Hops, all confirmed against live responses:
 *   1. getPromoDetail(promoCode) → the plan code, as `promoPlan`
 *      (e.g. "NAT26ESSEAV"). No country anywhere in this payload.
 *   2. getPlanVariations(planCode) → the plan's package tiers, carrying data
 *      size / days / packageCode but, again, no country. Which tier to take is
 *      `variationBy`: "varid" matches the link's param exactly (never falls
 *      back to [0]), "first" takes the single tier these promos return.
 *   2b. getLocalPlan(planCode) → the plan's own record, which is the only
 *      payload carrying a human-readable `planName` ("South East Asia eSIM").
 *      Display only, so it runs alongside the chain rather than in it — the
 *      order never waits on it.
 *   3. planCountriesList(planCode) — only when the campaign has no destination
 *      picker. placeOrder requires `locationCode`, and a link with no varid or
 *      country param yields none, so the first covered country stands in. This
 *      mirrors PaymentLinkOrderSummary.jsx, which does the same for the same
 *      reason. Campaigns that ask the user where they're going skip this hop
 *      entirely and pass the selected country instead.
 *
 * `result` is state rather than a ref because Natas renders the resolved plan
 * (name, coverage, data/days) in its hero — the screen has to repaint when the
 * hops land, not just when `status` flips.
 */

// Kept as codes rather than English strings so each campaign renders them from
// its own namespace. Every campaign's `form` block must define all three.
export const ERROR_CODES = {
  INVALID_LINK: "invalidLink",
  PLAN_UNAVAILABLE: "planUnavailable",
  MISSING_DESTINATION: "missingDestination",
};

const pickVariation = (variations, { variationBy, variationId }, linkVarid) => {
  if (!variations?.length) return null;
  // An explicit pin wins over both strategies.
  const pinned = variationId ?? (variationBy === "varid" ? linkVarid : null);
  if (pinned == null) return variations[0];
  return (
    variations.find((v) => String(v.variationId) === String(pinned)) || null
  );
};

const usePromoVariationPlan = (campaign) => {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorCode, setErrorCode] = useState("");
  const [result, setResult] = useState(null);

  const { plan: planStrategy, destination } = campaign;
  const needsPlanCountries = destination.from === "planCountries";

  const getPlanCountries = useDisApi({
    apiCall: "planCountriesList",
    setCallBack: (res, params) => {
      const first = res?.countries?.[0];
      if (!first?.countryCode) {
        setStatus("error");
        setErrorCode(ERROR_CODES.MISSING_DESTINATION);
        return;
      }
      setResult((prev) => ({
        ...prev,
        plan: params.planInfo,
        variation: params.variation,
        locationCode: first.countryCode,
        travelLocation: first.countryName || first.countryCode,
        // The whole list, for campaigns that show what the plan covers. Names
        // come back already translated — the dispatcher sends `language`.
        countries: res.countries,
      }));
      setStatus("success");
    },
  });

  // Display only: a failure here leaves planName null and the caller falls
  // back, rather than failing the claim over a missing label.
  const getLocalPlan = useDisApi({
    apiCall: "getLocalPlan",
    setCallBack: (res) => {
      const planName = res?.plan?.planName || res?.planName;
      // The payload shape isn't pinned down yet, so log what came back next
      // to the field we picked out of it.
      console.log("GETLOCALPLAN RESPONSE:", res, "→ planName:", planName);
      if (!planName) return;
      setResult((prev) => ({ ...prev, planName }));
    },
  });

  const getPlanVariations = useDisApi({
    apiCall: "getPlanVariations",
    setCallBack: (res, params) => {
      const matched = pickVariation(
        res?.plan,
        planStrategy,
        params.variationId,
      );
      if (!matched) {
        setStatus("error");
        setErrorCode(ERROR_CODES.PLAN_UNAVAILABLE);
        return;
      }
      if (!needsPlanCountries) {
        // The form's dropdown supplies locationCode, so the order is already
        // fully determined.
        setResult((prev) => ({
          ...prev,
          plan: params.planInfo,
          variation: matched,
        }));
        setStatus("success");
        return;
      }
      getPlanCountries({
        planCode: params.planCode,
        planInfo: params.planInfo,
        variation: matched,
      });
    },
  });

  const getPromoDetail = useDisApi({
    apiCall: "getPromoDetail",
    setCallBack: (res, params) => {
      const planCode = res?.promoPlan;
      if (!res?.status?.result || !planCode) {
        setStatus("error");
        setErrorCode(ERROR_CODES.INVALID_LINK);
        return;
      }
      // Fired here rather than chained, so the name arrives while the
      // variation and country hops are still in flight.
      getLocalPlan({ planCode });
      getPlanVariations({
        planCode,
        variationId: params.variationId,
        // Only planCode is needed downstream — EsimOrder reads
        // cart.package.planCode, and KolOrder gates on it. The display name
        // comes from getLocalPlan above; this payload has no such field.
        planInfo: { planCode },
      });
    },
  });

  const resolve = useCallback(
    (promoCode, variationId) => {
      setResult(null);
      setErrorCode("");
      // varid is only required by campaigns that select their tier with it.
      const needsVarid = planStrategy.variationBy === "varid";
      if (!promoCode || (needsVarid && !variationId)) {
        setStatus("error");
        setErrorCode(ERROR_CODES.INVALID_LINK);
        return;
      }
      setStatus("loading");
      getPromoDetail({ promoCode, variationId });
    },
    [getPromoDetail, planStrategy.variationBy],
  );

  return { status, errorCode, result, resolve };
};

export default usePromoVariationPlan;
