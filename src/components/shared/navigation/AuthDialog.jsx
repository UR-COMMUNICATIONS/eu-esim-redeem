import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  commercialRoutes,
  ErrorIcon,
  SuccessIcon,
  validateEmail,
} from "@/services";
import { Fragment, useEffect, useRef, useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { LogOutIcon, User2Icon, UserIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDisApi } from "@/general";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearInvalidSession,
  saveAuthData,
  setUserData,
} from "@/store/module/auth/slice";
import { resetCart } from "@/store/module/cart/cartSlice";
import { resetPlan } from "@/store/module/plan/planSlice";
import Loader from "../Loader";
import ReCAPTCHA from "react-google-recaptcha";
import useModal from "@/hooks/useModal";
import { useVisitorId } from "@/hooks/useVisitorId";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import CustomDropdown from "../CustomDropdown";

const DialogHeader = ({ title, text }) => {
  return (
    <div className="flex flex-col gap-1 md:gap-2">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-700 !leading-[1.4] text-center">
        {title}
      </h1>
      <p className="text-sm md:text-base !leading-[1.4] md:!leading-[1.5] text-center text-black-600">
        {text}
      </p>
    </div>
  );
};

const OTPInput = ({ setOtp, ...props }) => {
  return (
    <InputOTP
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      containerClassName={"w-full"}
      onChange={(otp) => setOtp(otp)}
      autoFocus
      {...props}
    >
      <InputOTPGroup className={"w-full flex justify-center gap-3"}>
        {[...Array(6)].map((_, index) => (
          <InputOTPSlot
            index={index}
            key={index}
            readOnly
            className={
              "border-2 shadow-none text-black-600 rounded-[8px] md:rounded-xl h-10 md:h-[52px] w-10 md:w-[52px] text-lg md:text-[27px] !leading-[1.4]"
            }
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
};

const BottomTextLink = ({ text, linkText, onClick }) => (
  <p className="text-sm md:text-base font-normal text-black-600 mt-2 md:mt-3">
    {text}{" "}
    <span
      className="cursor-pointer font-semibold text-eu-600 hover:underline"
      onClick={onClick}
    >
      {linkText}
    </span>
  </p>
);

const AuthDialog = ({ isOpen, setIsOpen, initialFlow = "signIn" }) => {
  // console.log("initialFlow", initialFlow);
  // const initialSignIn = initialFlow == 'signUp' ? null : 1;
  // const initialSignUp = initialFlow === 'signUp' ? 1 : null;
  // console.log("initialSignIn", initialSignIn);
  // console.log("initialSignUp", initialSignUp);

  const { setIsAuthDialogOpen } = useModal();
  const { savedPath, user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [signInStage, setSignInStage] = useState(1);
  // const [signInStage, setSignInStage] = useState(user?.userId ? 4 : 1);
  const [signUpStage, setSignUpStage] = useState(null);
  const [phone, setPhone] = useState("");
  const [contact, setContact] = useState({ code: "", number: "" });
  const [otp, setOtp] = useState("");
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [isVerify, setIsVerify] = useState(false);
  const [isNavigate, setIsNavigate] = useState(false);
  const [flow, setFlow] = useState(initialFlow);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [error, setError] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);
  const [inCaptchaVerification, setinCaptchaVerification] = useState(false);
  const [showCaptchaModal, setShowCaptchaModal] = useState(false);
  const [process, setProcess] = useState({
    title: "",
    alertMessage: "",
    alertType: "",
    isDialog: false,
    isProcessing: false,
    isSuccess: false,
  });

  const { t } = useTranslation(["translation", "english", "local"]);
  const { nameSpace } = useUserLocationLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRef = useRef();
  const recaptchaRef = useRef(null);
  const recaptchaToken = useRef(null);

  const visitorId = useVisitorId();

  // console.log("signInStage", signInStage);
  // console.log("signUpStage", signUpStage);

  useEffect(() => {
    // display register page initially
    if (initialFlow == "signUp") {
      setSignInStage(null);
      setSignUpStage(1);
    } else {
      setSignInStage(1);
      setSignUpStage(null);
    }
  }, [initialFlow]);

  // SETS THE DISABLED STATE OF THE CONTINUE BUTTON - CAPTCHA REQUIREMENT REMOVED

  useEffect(() => {
    if (user?.userId) {
      setSignInStage(4); // update when user.userId becomes available
    }
  }, [user?.userId]);
  useEffect(() => {
    if (signInStage === 1) {
      setIsButtonDisabled(contact.number.length <= 5);
    } else if (signInStage === 2 || signUpStage === 3) {
      setIsButtonDisabled(otp.length !== 6);
    } else if (signUpStage === 1) {
      setIsButtonDisabled(
        name.firstName.length < 1 || name.lastName.length < 1,
      );
    } else if (signUpStage === 2) {
      setIsButtonDisabled(!validateEmail(email) || contact.number.length <= 5);
    }
  }, [signInStage, signUpStage, phone, otp, name, email, contact.number]);

  // Reset CAPTCHA when dialog opens or stages change
  useEffect(() => {
    if (isOpen) {
      setCaptchaKey((prev) => prev + 1);
      setCaptchaToken(null);
    }
  }, [isOpen, signInStage, signUpStage]);

  const getUser = useDisApi({
    apiCall: "getUser",
    setCallBack: (res) => {
      if (res?.user) {
        dispatch(setUserData(res?.user));
        setProcess({
          ...process,
          isDialog: false,
          isProcessing: false,
          isSuccess: false,
          title: "",
          alertType: "",
          alertMessage: "",
        });
        setIsNavigate(true);
      } else {
        // getUser is called right after verifyAndLogin/addUser save a bearer
        // token (saveAuthData) — if it fails here (expired/rejected token,
        // backend error), the user is left with a token claiming they're
        // authenticated but no user data ever loaded. logoutHandler() clears
        // that half-formed session (redux + localStorage["yoowifi_admin"]/
        // ["user_data"]) and sends them back to a clean login state instead of
        // leaving a stuck "logged in but broken" dialog open. It closes the
        // dialog itself, so there's no error banner left to show inside it.
        console.log(
          "getUser failed after login/registration:",
          res?.status?.message,
        );
        setIsNavigate(false);
        logoutHandler();
      }
    },
  });

  const registerPassCode = useDisApi({
    apiCall: "authenticateUser",
    setCallBack: (res) => {
      if (res?.status?.result) {
        setSignUpStage(3);
        setProcess({
          ...process,
          isDialog: false,
          isProcessing: false,
          isSuccess: true,
          title: "",
          alertType: "",
          alertMessage: "",
        });
      } else {
        setSignUpStage(2);
        resetCaptcha();
        setProcess({
          ...process,
          isDialog: true,
          isProcessing: false,
          isSuccess: true,
          title: t("process.failed"),
          alertType: t("process.error"),
          alertMessage: res?.status?.message,
        });
      }
    },
  });

  const verifyAndRegister = useDisApi({
    apiCall: "addUser",
    setCallBack: (res) => {
      if (res?.status?.result) {
        // addUser now returns a bearer token on account creation — persist it
        // so apidispatcher/ApiService attach it as Authorization from here on.
        if (res?.token) {
          dispatch(saveAuthData({ token: res.token }));
        }
        const userId = userRef.current;
        getUser({ userId: userId });
      } else {
        setProcess({
          ...process,
          isDialog: true,
          isProcessing: false,
          isSuccess: true,
          title: t("process.failed"),
          alertType: t("process.error"),
          alertMessage: res?.status?.message,
        });
      }
    },
  });

  const loginPassCode = useDisApi({
    apiCall: "authenticateForLogin",
    setCallBack: (res) => {
      if (res?.status?.result) {
        userRef.current = res.userId;
        setSignInStage(2);
        setProcess({
          ...process,
          isDialog: false,
          isProcessing: false,
          isSuccess: true,
          title: "",
          alertType: "",
          alertMessage: "",
        });
      } else {
        setSignInStage(1);
        resetCaptcha();
        setProcess({
          ...process,
          isDialog: true,
          isProcessing: false,
          isSuccess: true,
          title: t("process.failed"),
          alertType: t("process.error"),
          alertMessage: res?.status?.message,
        });
      }
    },
  });

  const verifyAndLogin = useDisApi({
    apiCall: "verifyAndLogin",
    setCallBack: (res) => {
      if (res?.status?.result) {
        // Backend now returns a bearer token on login — persist it so
        // apidispatcher can attach it as Authorization on every request after.
        if (res?.token) {
          dispatch(saveAuthData({ token: res.token }));
        }
        const userId = userRef.current;
        getUser({ userId: userId });
      } else {
        setProcess({
          ...process,
          isDialog: true,
          isProcessing: false,
          isSuccess: true,
          title: t("process.failed"),
          alertType: t("process.error"),
          alertMessage: res?.status?.message,
        });
      }
    },
  });

  const handleCaptchaVerify = (token) => {
    setinCaptchaVerification(true);
    recaptchaToken.current = token;
    setCaptchaToken(token);
    setError("");
    setShowCaptchaModal(false); // Hide CAPTCHA modal

    // Continue with the flow after CAPTCHA verification
    setTimeout(() => {
      continueAfterCaptcha();
    }, 100);
  };

  // Separate function to continue flow after CAPTCHA
  const continueAfterCaptcha = () => {
    const phoneNumber =
      contact.code + "-" + contact.number.substring(contact.code.length);
    const request = {
      userId: email,
      firstName: name.firstName,
      lastName: name.lastName,
      userName: name.firstName + " " + name.lastName,
      phone: phoneNumber,
      dob: "2000-01-01",
      country: cart.userCountry?.country,
      originCountry: cart.userCountry?.country,
    };

    if (signInStage === 1 && contact.number.length > 5) {
      setProcess({ ...process, isProcessing: true, isDialog: true });
      loginPassCode({
        userId: phoneNumber,
        captchaToken: recaptchaToken.current,
        fingerPrint: visitorId,
      });
    } else if (
      signUpStage === 2 &&
      validateEmail(email) &&
      contact.number.length > 6
    ) {
      setProcess({ ...process, isProcessing: true, isDialog: true });
      registerPassCode({
        ...request,
        captchaToken: recaptchaToken.current,
        fingerPrint: visitorId,
      });
    }
  };

  const resetCaptcha = () => {
    if (recaptchaRef.current) {
      try {
        recaptchaRef.current.reset();
        setCaptchaToken(null);
        setCaptchaKey((prev) => prev + 1);
      } catch (error) {
        console.error("Error resetting CAPTCHA:", error);
        setCaptchaKey((prev) => prev + 1);
        setCaptchaToken(null);
      }
    }
    setShowCaptchaModal(false);
  };

  useEffect(() => {
    if (isNavigate) {
      setIsOpen(false);
      setSignInStage(4);
    }
  }, [isNavigate]);

  // EVENT HANDLER TO HANDLE NEXT/CONTINUE BUTTON PRESS
  const handleContinuePress = () => {
    if (process.isDialog) {
      if (flow == "signIn") {
        setSignInStage(1);
        setSignUpStage(null);
      } else {
        setSignUpStage(1);
        setSignInStage(null);
      }
      setProcess({
        ...process,
        isDialog: false,
        isProcessing: false,
        isSuccess: true,
        title: "",
        alertType: "",
        alertMessage: "",
      });
    } else {
      const phoneNumber =
        contact.code + "-" + contact.number.substring(contact.code.length);
      const request = {
        userId: email,
        firstName: name.firstName,
        lastName: name.lastName,
        userName: name.firstName + " " + name.lastName,
        phone: phoneNumber,
        dob: "2000-01-01",
        country: cart.userCountry?.country,
        originCountry: cart.userCountry?.country,
      };

      if (signInStage === 1 && contact.number.length > 5) {
        if (!captchaToken) {
          setShowCaptchaModal(true); // Show CAPTCHA modal
          return;
        }
        setProcess({ ...process, isProcessing: true, isDialog: true });
        loginPassCode({
          userId: phoneNumber,
          captchaToken: recaptchaToken.current,
          fingerPrint: visitorId,
        });
      } else if (signInStage === 2 && otp.length === 6) {
        setSignInStage(3);
        setProcess({ ...process, isProcessing: true, isDialog: true });
        verifyAndLogin({ userId: userRef.current, passCode: otp });
      } else if (signInStage === 3) {
        setSignInStage(4);
      } else if (
        signUpStage === 1 &&
        name.firstName.length >= 1 &&
        name.lastName.length >= 1
      ) {
        // No CAPTCHA for first name/last name stage - directly go to stage 2
        setSignUpStage(2);
      } else if (
        signUpStage === 2 &&
        validateEmail(email) &&
        contact.number.length > 6
      ) {
        if (!captchaToken) {
          setShowCaptchaModal(true); // Show CAPTCHA modal
          return;
        }
        setProcess({ ...process, isProcessing: true, isDialog: true });
        registerPassCode({
          ...request,
          captchaToken: recaptchaToken.current,
          fingerPrint: visitorId,
        });
      } else if (signUpStage === 3) {
        setSignUpStage(4);
        setProcess({ ...process, isProcessing: true, isDialog: true });
        userRef.current = request.userId;
        verifyAndRegister({
          ...request,
          passCode: otp,
          notificationId: "",
          fireBaseId: "",
        });
      } else if (signUpStage === 4) {
        setSignUpStage(5);
      } else {
        setIsOpen(false);
      }
    }
  };

  const logoutHandler = () => {
    // clearInvalidSession() dispatches resetAuth() and clears every
    // localStorage key auth code writes (yoowifi_admin, user_data, user_info)
    // — see store/module/auth/slice.jsx. Everything below it is this dialog's
    // own extra cleanup for an explicit Logout click (cart/plan state, local
    // form state, navigating home) that a mere invalid-session check
    // elsewhere in the app shouldn't also trigger.
    clearInvalidSession(dispatch);
    dispatch(resetCart());
    dispatch(resetPlan());
    setIsButtonDisabled(false);
    setSignInStage(1);
    setSignUpStage(null);
    setIsOpen(false);
    setName({ firstName: "", lastName: "" });
    setEmail("");
    setPhone("");
    setOtp("");
    setIsVerify(false);
    setIsNavigate(false);
    setCaptchaToken(null);
    setError("");
    dispatch(setUserData(null));
    navigate(commercialRoutes.home.path);
  };

  const resetDialog = () => {
    setIsOpen(!isOpen);
    resetCaptcha();
    setProcess({
      ...process,
      isDialog: false,
      isProcessing: false,
      isSuccess: false,
      title: "",
      alertType: "",
      alertMessage: "",
    });
  };

  return (
    <>
      {/* Main Auth Dialog - Hide when CAPTCHA modal is showing */}
      <Dialog
        open={isOpen && !showCaptchaModal}
        onOpenChange={() => resetDialog()}
        modal={true}
      >
        <DialogContent
          showCloseIcon={true}
          className={cn(
            "w-[calc(100vw-32px)] max-w-[540px] h-auto min-h-[286px] sm:min-h-[438px] rounded-xl md:rounded-3xl flex flex_center flex-col px-4 md:px-8 lg:px-[60px] pt-10 md:pt-[60px] pb-6 md:pb-[60px] gap-6 md:gap-12",
            signInStage === 3 || signUpStage === 4
              ? "bg-eu-50"
              : "bg-white",
          )}
        >
          <DialogTitle className={"hidden"} />

          {process.isDialog && (
            <Fragment>
              {process.isProcessing ? (
                <div className="flex flex-col gap-6 items-center justify-center h-full w-full">
                  <Loader
                    type="Oval"
                    color="white"
                    height={"18vw"}
                    width={"18vw"}
                    className="max-h-[100px] max-w-[100px] min-h-[60px] min-w-[60px]"
                    wrapperStyle={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                </div>
              ) : (
                <ErrorIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-24 md:h-24" />
              )}
              <div className="text-center flex flex-col gap-2 sm:gap-2">
                <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-700">
                  {process.isProcessing
                    ? t("process.processing")
                    : t("process.failed")}
                </DialogTitle>
                <p className="text-base text-black-700">
                  {process.isProcessing
                    ? t("process.processMessage")
                    : process.alertMessage}
                </p>
              </div>
            </Fragment>
          )}

          {/* SIGN IN FLOW */}
          {!process.isDialog && signInStage === 1 && (
            <Fragment>
              <DialogHeader title={t(`login.title`)} text={t(`login.text`)} />
              <PhoneInput
                defaultCountry={cart?.userCountry?.country?.toLowerCase()}
                value={contact.number}
                className={cn(
                  "text-sm md:text-base !mt-0 font-normal !leading-normal w-full bg-white",
                )}
                onChange={(value, obj) =>
                  setContact({
                    ...contact,
                    code: "+" + obj?.country?.dialCode || "",
                    number: value,
                  })
                }
                style={{
                  "--react-international-phone-flag-background-color":
                    "transparent rounded-[20px]",
                }}
              />
              {/* <div className=" w-full flex gap-2">
                <Input className={cn(
                  "text-sm md:text-base font-normal !leading-normal w-[84px] h-[48px] "
                )} />
                <CustomDropdown />
              </div> */}
            </Fragment>
          )}

          {(signInStage === 2 || signUpStage === 3) && (
            <Fragment>
              <DialogHeader
                title={t(`authModal.authMessages.verification.title`)}
                text={t(`authModal.authMessages.verification.text`)}
              />
              <OTPInput setOtp={setOtp} />
            </Fragment>
          )}

          {/* SIGN UP FLOW */}
          {signUpStage === 1 && (
            <Fragment>
              <DialogHeader
                title={t(`authModal.authMessages.signUp.title`)}
                text={t(`authModal.authMessages.signUp.text`)}
              />
              <div className="flex flex-col gap-2 md:gap-3 w-full">
                <Input
                  placeholder={t(`authModal.placeholders.firstName`)}
                  name="firstName"
                  type="text"
                  onChange={(e) =>
                    setName({ ...name, firstName: e.target.value })
                  }
                  required
                />
                <Input
                  placeholder={t(`authModal.placeholders.lastName`)}
                  name="lastName"
                  type="text"
                  onChange={(e) =>
                    setName({ ...name, lastName: e.target.value })
                  }
                  required
                />
              </div>
            </Fragment>
          )}

          {!process.isDialog && signUpStage === 2 && (
            <Fragment>
              <DialogHeader
                title={t(`authModal.authMessages.signUp.title`)}
                text={t(`authModal.authMessages.signUp.text`)}
              />
              <div className="flex flex-col gap-2 md:gap-3 w-full">
                <Input
                  placeholder={t(`authModal.placeholders.email`)}
                  name="email"
                  type="email"
                  onChange={(e) =>
                    setEmail(e.target.value.replace(/\s/g, "").toLowerCase())
                  }
                  required
                />
                <PhoneInput
                  defaultCountry={cart?.userCountry?.country?.toLowerCase()}
                  value={contact.number}
                  className={cn(
                    "text-sm md:text-base !mt-0 font-normal !leading-normal w-full bg-white",
                  )}
                  onChange={(value, obj) =>
                    setContact({
                      ...contact,
                      code: "+" + obj?.country?.dialCode || "",
                      number: value,
                    })
                  }
                  style={{
                    "--react-international-phone-flag-background-color":
                      "transparent rounded-[20px]",
                  }}
                />
              </div>
            </Fragment>
          )}

          {/* WHEN USER IS LOGGED IN */}
          {(signInStage > 3 || signUpStage > 4) && (
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center justify-center">
                <User2Icon
                  className="h-20 w-20 rounded-full bg-eu-600 sm:h-24 sm:w-24 md:h-28 md:w-28"
                  stroke="#fff"
                />
              </div>
              <DialogHeader
                title={`${t("authModal.authMessages.loginSuccessful.Hi")} 
                ${user?.firstName || "user"} ${user?.lastName || ""}!`}
                text={
                  signInStage
                    ? t(`authModal.authMessages.loginSuccessful.text`)
                    : t(`authModal.authMessages.accountReady.text`)
                }
              />
              <Button
                variant="secondary"
                size="lg"
                className=""
                onClick={logoutHandler}
              >
                <LogOutIcon className="w-6 h-6" /> {t(`buttonText.logout`)}
              </Button>
            </div>
          )}

          {/* EVENT HANDLER BUTTON WITH BOTTOM TEXT AND NAVIGATION */}
          {!process.isProcessing && signInStage <= 3 && signUpStage <= 4 && (
            <div className="w-full flex_center flex-col">
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <Button
                size="lg"
                className={cn(
                  "h-11 md:h-[52px] text-base font-semibold !leading-[1.2] rounded-xl select-none",
                  isButtonDisabled && "bg-disabled",
                  "bg-eu-600 hover:bg-eu-500",
                  "w-full",
                )}
                disabled={isButtonDisabled}
                onClick={handleContinuePress}
              >
                {(signInStage === 1 || signUpStage === 2) &&
                  t(`buttonText.continue`)}
                {(signInStage === 2 || signUpStage === 3) &&
                  t(`buttonText.verify`)}
                {(signInStage === 3 || signUpStage === 4) &&
                  t(`buttonText.continue`)}
                {signUpStage === 1 && t(`buttonText.next`)}
              </Button>

              {!process.isDialog && signInStage && signInStage === 1 && (
                <BottomTextLink
                  text={t(`authModal.prompts.noAccount.text`)}
                  linkText={t([
                    `${nameSpace}:authModal.prompts.noAccount.linkText`,
                    "authModal.prompts.noAccount.linkText",
                  ])}
                  onClick={() => {
                    setFlow("signUp");
                    setSignUpStage(1);
                    setSignInStage(null);
                    resetCaptcha();
                    setError("");
                  }}
                />
              )}

              {!process.isDialog && signUpStage && signUpStage <= 2 && (
                <BottomTextLink
                  text={t(`authModal.prompts.hasAccount.text`)}
                  linkText={t(`authModal.prompts.hasAccount.linkText`)}
                  onClick={() => {
                    setFlow("signIn");
                    setSignInStage(1);
                    setSignUpStage(null);
                    resetCaptcha();
                    setError("");
                  }}
                />
              )}

              {(signInStage === 2 || signUpStage === 3) && (
                <BottomTextLink
                  text={t(`authModal.prompts.resendOTP.text`)}
                  linkText={t(`authModal.prompts.resendOTP.linkText`)}
                  onClick={() => {
                    if (signInStage === 2) {
                      const phoneNumber =
                        contact.code +
                        "-" +
                        contact.number.substring(contact.code.length);
                      loginPassCode({
                        userId: phoneNumber,
                        captchaToken: recaptchaToken.current,
                        fingerPrint: visitorId,
                      });
                    } else if (signUpStage === 3) {
                      const phoneNumber =
                        contact.code +
                        "-" +
                        contact.number.substring(contact.code.length);
                      const request = {
                        userId: email,
                        firstName: name.firstName,
                        lastName: name.lastName,
                        userName: name.firstName + " " + name.lastName,
                        phone: phoneNumber,
                        dob: "2000-01-01",
                        country: cart.userCountry?.country,
                        originCountry: cart.userCountry?.country,
                      };
                      registerPassCode({
                        ...request,
                        captchaToken: recaptchaToken.current,
                        fingerPrint: visitorId,
                      });
                    }
                  }}
                />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Separate CAPTCHA Modal */}
      {showCaptchaModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Please verify you're not a robot
            </h3>
            <div className="flex justify-center mb-4">
              <ReCAPTCHA
                key={captchaKey}
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_captchaKey}
                onChange={handleCaptchaVerify}
                onExpired={() => {
                  setCaptchaToken(null);
                  setinCaptchaVerification(false);
                }}
                onErrored={() => {
                  setError(
                    "Error with CAPTCHA verification. Please try again.",
                  );
                  setinCaptchaVerification(false);
                  setCaptchaToken(null);
                }}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setShowCaptchaModal(false);
                  setError("");
                }}
                className="text-gray-500 hover:text-gray-700 text-sm underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthDialog;
