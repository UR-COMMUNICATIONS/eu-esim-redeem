import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDynamicImages from "@/hooks/useDynamicImages";
import { useVisitorId } from "@/hooks/useVisitorId";
import { cn } from "@/lib/utils";
import { commercialRoutes, validateEmail } from "@/services";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
  Loader2,
  PartyPopper,
  Shield,
  User,
  UserCheck,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useNavigate } from "react-router-dom";
import { defaultSignupConfig, signupConfigs } from "@/constants/signupConfigs";
import ApiService from "@/general/apiClient";

const SimpleSignup = ({ className, onSuccess, type }) => {
  const config = signupConfigs[type] || defaultSignupConfig;
  const navigate = useNavigate();

  // Use useRef to preserve form data during re-renders
  const formDataRef = useRef({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phoneCode: "",
  });

  // State for UI updates only
  const [formData, setFormData] = useState(formDataRef.current);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [status, setStatus] = useState({
    type: null,
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [anaStats, setAnaStats] = useState(null);
  const [anaStatsLoading, setAnaStatsLoading] = useState(false);

  const { t } = useTranslation();
  const recaptchaRef = useRef(null);
  const recaptchaToken = useRef(null);
  const userIdRef = useRef(null);
  const visitorId = useVisitorId();
  const agreeToTermsRef = useRef(false);

  // Sync ref with state to prevent re-render issues
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  useEffect(() => {
    agreeToTermsRef.current = agreeToTerms;
  }, [agreeToTerms]);

  useEffect(() => {
    if (type !== "ana") return;

    setAnaStatsLoading(true);
    ApiService.request(commercialRoutes.quickSignupAna.getAnaStatsApi, {})
      .then((res) => {
        setAnaStats(res);
      })
      .catch(() => {
        setAnaStats(null);
      })
      .finally(() => {
        setAnaStatsLoading(false);
      });
  }, [type]);

  // Memoize benefits to prevent unnecessary re-renders
  const benefits = useMemo(
    () => [
      { icon: Zap, text: t("signup.benefit1") },
      { icon: Shield, text: t("signup.benefit2") },
    ],
    [t],
  );

  // Validation function using refs to get current values
  const validateForm = useCallback(() => {
    const currentFormData = formDataRef.current;
    const currentAgreeToTerms = agreeToTermsRef.current;
    const newErrors = {};

    console.log("Validating form with data:", currentFormData); // Debug

    if (
      !currentFormData.firstName ||
      currentFormData.firstName.trim().length < 2
    ) {
      newErrors.firstName = t(
        "validation.firstNameRequired",
        "First name is required",
      );
    }

    if (
      !currentFormData.lastName ||
      currentFormData.lastName.trim().length < 2
    ) {
      newErrors.lastName = t(
        "validation.lastNameRequired",
        "Last name is required",
      );
    }

    if (!validateEmail(currentFormData.email)) {
      newErrors.email = t(
        "validation.invalidEmail",
        "Please enter a valid email",
      );
    }

    if (!currentFormData.phone || currentFormData.phone.trim().length <= 5) {
      newErrors.phone = t(
        "validation.phoneRequired",
        "Phone number is required",
      );
    }

    if (!currentAgreeToTerms) {
      newErrors.terms = t(
        "validation.termsRequired",
        "You must agree to the terms and conditions",
      );
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [t]);

  // API call function for user creation
  const createUserWithNewApi = useCallback(async () => {
    try {
      const currentFormData = formDataRef.current;
      console.log("Creating user with data:", currentFormData); // Debug

      setStatus({
        type: "loading",
        message: t("signup.creatingyourAccount"),
      });

      // Better phone number processing
      let phoneNumber = currentFormData.phone;
      if (
        currentFormData.phoneCode &&
        phoneNumber.startsWith(currentFormData.phoneCode)
      ) {
        phoneNumber = phoneNumber.substring(currentFormData.phoneCode.length);
      }
      phoneNumber = phoneNumber.replace(/\D/g, "");
      const finalPhoneNumber = currentFormData.phoneCode + "-" + phoneNumber;

      const userData = {
        email: currentFormData.email.trim(),
        firstName: currentFormData.firstName.trim(),
        lastName: currentFormData.lastName.trim(),
        phoneNumber: finalPhoneNumber,
        source: config.source,
        platform: "web",
        referralCode: "ANA",
      };

      console.log("Final userData being sent:", userData); // Debug

      const response = await fetch(
        "https://coreapi.yoowifi.com/yw-services/user/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: t("signup.accountcreatedSuccess"),
        });
        // setShowSuccessScreen(true);
        setIsSubmitting(false);

        // Re-fetch ANA stats to get accurate user count after successful registration
        if (type === "ana") {
          ApiService.request(commercialRoutes.quickSignupAna.getAnaStatsApi, {})
            .then((res) => setAnaStats(res))
            .catch(() => {});
        }

        // Call onSuccess if provided, but don't reset form or redirect
        if (onSuccess) onSuccess(data);
      } else {
        setStatus({
          type: "error",
          message: data?.message || t("signup.registrationFailed"),
        });
        setIsSubmitting(false);
        resetCaptcha();
      }
    } catch (error) {
      console.error("User creation failed:", error);
      setStatus({
        type: "error",
        message: t("signup.failed"),
      });
      setIsSubmitting(false);
      resetCaptcha();
    }
  }, [t, onSuccess]);

  const resetCaptcha = useCallback(() => {
    if (recaptchaRef.current) {
      try {
        recaptchaRef.current.reset();
        setCaptchaToken(null);
        recaptchaToken.current = null;
      } catch (error) {
        console.error("Error resetting CAPTCHA:", error);
      }
    }
    setShowCaptcha(false);
  }, []);

  const resetFormSafely = useCallback(() => {
    if (!isSubmitting) {
      const emptyFormData = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        phoneCode: "",
      };

      formDataRef.current = emptyFormData;
      setFormData(emptyFormData);
      setCaptchaToken(null);
      setAgreeToTerms(false);
      agreeToTermsRef.current = false;
      setStatus({ type: null, message: "" });
      setErrors({});
      resetCaptcha();
      // setShowSuccessScreen(false);
    }
  }, [isSubmitting, resetCaptcha]);

  // New function to handle going back from success screen
  const handleBackToForm = useCallback(() => {
    resetFormSafely();
  }, [resetFormSafely]);

  // CAPTCHA verification handler
  const handleCaptchaVerify = useCallback((token) => {
    console.log(
      "CAPTCHA verified, form data at verification:",
      formDataRef.current,
    ); // Debug

    recaptchaToken.current = token;
    setCaptchaToken(token);
    setShowCaptcha(false);

    // Use setTimeout to ensure state updates are complete
    setTimeout(() => {
      submitRegistration();
    }, 100);
  }, []);

  const submitRegistration = useCallback(() => {
    if (isSubmitting) return;

    const currentFormData = formDataRef.current;
    console.log("Submitting registration with data:", currentFormData); // Debug

    setIsSubmitting(true);
    userIdRef.current = currentFormData.email;

    // Directly call create user API without checking if user exists
    createUserWithNewApi();
  }, [isSubmitting, createUserWithNewApi]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (isSubmitting) return;

      const currentFormData = formDataRef.current;
      console.log("Form submit - current data:", currentFormData); // Debug

      if (!validateForm()) {
        setStatus({
          type: "error",
          message: t("signup.pleaseCorrectErrors"),
        });
        return;
      }

      // Show CAPTCHA if not already verified (skip for ana)
      if (type !== "ana" && !captchaToken && !recaptchaToken.current) {
        console.log("Showing CAPTCHA, preserving form data:", currentFormData); // Debug
        setShowCaptcha(true);
        return;
      }

      submitRegistration();
    },
    [isSubmitting, validateForm, captchaToken, submitRegistration, t, type],
  );

  // Improved input handlers that update both ref and state
  const updateFormData = useCallback(
    (field, value) => {
      const processedValue = field === "email" ? value.toLowerCase() : value;

      // Update ref immediately to preserve data during re-renders
      formDataRef.current = {
        ...formDataRef.current,
        [field]: processedValue,
      };

      // Update state for UI
      setFormData((prev) => ({
        ...prev,
        [field]: processedValue,
      }));

      console.log(
        `${field} updated:`,
        processedValue,
        "Full form:",
        formDataRef.current,
      ); // Debug

      // Clear field-specific error
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      }
    },
    [errors],
  );

  const handleInputChange = useCallback(
    (field) => (e) => {
      updateFormData(field, e.target.value);
    },
    [updateFormData],
  );

  const handlePhoneChange = useCallback(
    (value, obj) => {
      const phoneCode = "+" + (obj?.country?.dialCode || "");

      // Update both phone and phoneCode simultaneously
      const newFormData = {
        ...formDataRef.current,
        phone: value,
        phoneCode: phoneCode,
      };

      formDataRef.current = newFormData;
      setFormData(newFormData);

      console.log(
        "Phone updated:",
        { value, phoneCode },
        "Full form:",
        formDataRef.current,
      ); // Debug

      if (errors.phone) {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }
    },
    [errors.phone],
  );

  const handleTermsChange = useCallback(
    (e) => {
      const checked = e.target.checked;
      agreeToTermsRef.current = checked;
      setAgreeToTerms(checked);

      if (errors.terms) {
        setErrors((prev) => ({ ...prev, terms: "" }));
      }
    },
    [errors.terms],
  );

  const openPrivacyHref = useCallback(
    (privacyPath) => {
      if (!privacyPath) return;
      if (/^https?:\/\//i.test(privacyPath)) {
        window.open(privacyPath, "_blank", "noopener,noreferrer");
        return;
      }
      navigate(privacyPath);
    },
    [navigate],
  );

  const handleMyPrivacyPolicyClick = useCallback(
    (e) => {
      e.preventDefault();
      navigate(commercialRoutes.privacyPolicy.path);
    },
    [navigate],
  );

  const handleAnaPrivacyPolicyClick = useCallback(
    (e) => {
      e.preventDefault();
      openPrivacyHref(commercialRoutes.anaPrivacyPolicy.path);
    },
    [openPrivacyHref],
  );

  // Single privacy link (e.g. Natas) — uses config.privacyPath
  const handleTermsClick = useCallback(
    (e) => {
      e.preventDefault();
      openPrivacyHref(config?.privacyPath);
    },
    [config?.privacyPath, openPrivacyHref],
  );

  // Updated Success Screen Component with Back Button
  const SuccessScreen = () => {
    return (
      <div className="text-center py-8">
        <div className="mb-6">
          <div className="relative inline-block">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <UserCheck className="w-10 h-10 text-green-600" />
            </div>
            <PartyPopper className="absolute -top-2 -right-2 w-8 h-8 text-yellow-500 animate-bounce" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {t(
            "signup.welcomeTitle",
            `Welcome ${formDataRef.current.firstName}!`,
          )}
        </h3>
        <p className="text-gray-600 mb-4">{t("signup.registrationSuccess")}</p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center gap-2 text-green-700">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium text-base sm:text-sm">
              {t("signup.accountReady")}
            </span>
          </div>
        </div>

        {/* Back Button */}
        <Button
          onClick={handleBackToForm}
          variant="outline"
          className="w-full h-12 text-base font-semibold group"
          size="lg"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          {t("signup.backToForm", "Back to Redemption Form")}
        </Button>
      </div>
    );
  };

  return (
    <div
      className={cn("min-h-screen flex relative overflow-hidden", className)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-main-50 via-white to-main-50/30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-main-100/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-main-100/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-main-50/10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Left Side - Benefits */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-16 xl:p-20 relative z-10">
        <div className="max-w-2xl flex flex-col justify-center h-full">
          <div className="flex-1 flex flex-col justify-center">
            <div className="inline-flex items-center gap-3 bg-main-100 text-main-700 px-5 py-3 rounded-full text-base font-medium mb-8">
              <img
                src={useDynamicImages("fsim-banner", "yoowifi-without-hexagon")}
                alt="corporate symbol"
                className="h-6 w-auto object-contain"
              />
              {t("signup.instantSignup")}
            </div>
            <h1 className="text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t("signup.heroTitle")}
            </h1>
            <div className="space-y-5 mb-10">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-main-100 rounded-xl flex items-center justify-center group-hover:bg-main-200 transition-colors">
                      <Icon className="w-6 h-6 text-main-600" />
                    </div>
                    <span className="text-gray-700 font-medium text-lg">
                      {benefit.text}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="pt-10 border-t border-gray-200">
              {/* ANA total-registered card (replaced by dynamic count in trustedBy below)
              {type === "ana" && (
                <div className="mb-8">
                  {anaStatsLoading && (
                    <div className="rounded-2xl border border-main-200/50 bg-gradient-to-br from-main-50/90 to-white p-6 shadow-sm">
                      <div className="h-4 w-40 bg-main-100/80 rounded animate-pulse mb-3" />
                      <div className="h-10 w-28 bg-main-100/60 rounded animate-pulse" />
                    </div>
                  )}
                  {!anaStatsLoading && anaStats?.users != null && (
                    <div className="rounded-2xl border border-main-200/60 bg-gradient-to-br from-main-50 via-white to-main-100/30 p-6 shadow-sm ring-1 ring-main-100/80">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-main-600 text-white shadow-md shadow-main-600/25">
                          <Users className="h-6 w-6" strokeWidth={2} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium uppercase tracking-wide text-main-700/90">
                            {t(
                              "signup.anaTotalRegisteredLabel",
                              "Total registered users",
                            )}
                          </p>
                          <p className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-gray-900">
                            {Number(anaStats.users).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              */}
              <div className="flex items-center gap-8">
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 bg-gradient-to-br from-main-400 to-main-600 rounded-full border-2 border-white flex items-center justify-center"
                    >
                      <User className="w-6 h-6 text-white" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-base text-gray-600">
                    {type === "ana" && anaStats?.users != null
                      ? t("signup.trustedByAna", {
                          count: Number(anaStats.users).toLocaleString(),
                        })
                      : t("signup.trustedBy")}
                  </p>
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">
                        ★
                      </span>
                    ))}
                    <span className="text-base text-gray-600 ml-1">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 lg:flex-initial lg:w-[540px] flex items-center justify-center p-4 sm:p-8 relative z-10">
        <div className="w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
            {!showSuccessScreen ? (
              <>
                {/* Mobile Header */}
                <div className="lg:hidden mb-6 text-center">
                  <div className="inline-flex items-center gap-2 bg-main-100 text-main-700 px-3 py-1.5 rounded-full text-xs font-medium mb-3">
                    <Zap className="w-3 h-3" />
                    {t("signup.instantSignup", "Instant Signup")}
                  </div>
                  {/* Mobile ANA stat card — count shown in trustedBy on desktop; reuse same line on small screens
                  {type === "ana" && anaStatsLoading && (
                    <div className="mx-auto max-w-xs rounded-xl border border-main-200/50 bg-main-50/80 px-4 py-3">
                      <div className="mx-auto h-3 w-32 bg-main-100 rounded animate-pulse" />
                    </div>
                  )}
                  {type === "ana" &&
                    !anaStatsLoading &&
                    anaStats?.users != null && (
                      <div className="mx-auto max-w-xs rounded-xl border border-main-200/60 bg-gradient-to-r from-main-50 to-white px-4 py-3 text-center shadow-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-main-700">
                          {t(
                            "signup.anaTotalRegisteredLabel",
                            "Total registered users",
                          )}
                        </p>
                        <p className="text-2xl font-bold tabular-nums text-gray-900">
                          {Number(anaStats.users).toLocaleString()}
                        </p>
                      </div>
                    )}
                  */}
                  {type === "ana" && (
                    <p className="mt-3 text-sm text-gray-600 px-2">
                      {anaStats?.users != null
                        ? t("signup.trustedByAna", {
                            count: Number(anaStats.users).toLocaleString(),
                          })
                        : t("signup.trustedBy")}
                    </p>
                  )}
                </div>

                {/* Form Header */}
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4 gap-2 items-center">
                    {/* <div className="w-14 h-14 bg-gradient-to-br from-main-500 to-main-600 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-7 h-7 text-white" />
                    </div> */}
                    {config.logo && (
                      <>
                        <img
                          src={useDynamicImages("fsim-banner", config.logo)}
                          alt="corporate symbol"
                          className="md:h-14 h-10 w-auto object-contain"
                        />

                        <img
                          src={useDynamicImages("fsim-banner", "close")}
                          alt="corporate symbol"
                          className="md:h-8 h-6 w-auto object-contain"
                        />
                      </>
                    )}
                    <img
                      src={useDynamicImages(
                        "fsim-banner",
                        "yoowifi-without-hexagon",
                      )}
                      alt="corporate symbol"
                      className="md:h-10 h-7 w-auto object-contain"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {t("signup.createyourAccount")}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {t("signup.filldetailsInstant")}
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="h-2 w-2 rounded-full bg-main-500"></div>
                  <div className="h-1.5 w-16 rounded-full bg-main-500"></div>
                  <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                </div>

                {/* Status Alert */}
                {status.type && status.type !== "loading" && (
                  <div
                    className={cn(
                      "mb-6 p-4 rounded-lg border flex items-start gap-3",
                      status.type === "success" &&
                        "border-green-200 bg-green-50",
                      status.type === "error" && "border-red-200 bg-red-50",
                    )}
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    )}
                    <p
                      className={cn(
                        "text-sm",
                        status.type === "success" && "text-green-800",
                        status.type === "error" && "text-red-800",
                      )}
                    >
                      {status.message}
                    </p>
                  </div>
                )}

                {/* Main Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Input
                        placeholder={t("signup.firstName", "First Name")}
                        value={formData.firstName}
                        onChange={handleInputChange("firstName")}
                        className={cn(
                          "h-11",
                          errors.firstName && "border-red-500",
                        )}
                        disabled={isSubmitting}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <Input
                        placeholder={t("signup.lastName")}
                        value={formData.lastName}
                        onChange={handleInputChange("lastName")}
                        className={cn(
                          "h-11",
                          errors.lastName && "border-red-500",
                        )}
                        disabled={isSubmitting}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Input
                      type="email"
                      placeholder={t("signup.email")}
                      value={formData.email}
                      onChange={handleInputChange("email")}
                      className={cn("h-11", errors.email && "border-red-500")}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <PhoneInput
                      defaultCountry={config.defaultCountry}
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className={cn(
                        "w-full",
                        errors.phone && "[&_input]:border-red-500",
                      )}
                      disabled={isSubmitting}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Terms and Conditions */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        checked={agreeToTerms}
                        onChange={handleTermsChange}
                        className={cn(
                          "mt-0.5 h-4 w-4 rounded border-gray-300 text-main-600 focus:ring-main-500",
                          errors.terms && "border-red-500",
                        )}
                        disabled={isSubmitting}
                      />
                      <label
                        htmlFor="agreeToTerms"
                        className="text-sm text-gray-600 leading-relaxed cursor-pointer"
                      >
                        {type === "ana" ? (
                          <span>
                            {t("signup.agreeToTerms")}{" "}
                            <button
                              type="button"
                              onClick={handleMyPrivacyPolicyClick}
                              className="text-main-600 hover:text-main-700 font-medium hover:underline cursor-pointer align-baseline"
                            >
                              {t(
                                "signup.privacyPolicyMyLink",
                                "Privacy Policy",
                              )}
                            </button>
                            {t("signup.privacyPoliciesJoiner", " & ")}
                            <button
                              type="button"
                              onClick={handleAnaPrivacyPolicyClick}
                              className="text-main-600 hover:text-main-700 font-medium hover:underline cursor-pointer align-baseline"
                            >
                              {t(
                                "signup.anaPrivacyPolicyLink",
                                "ANA Privacy Policy",
                              )}
                            </button>
                          </span>
                        ) : (
                          <>
                            {t("signup.agreeToTerms")} <br />
                            <button
                              type="button"
                              onClick={handleTermsClick}
                              className="text-main-600 hover:text-main-700 font-medium hover:underline cursor-pointer"
                            >
                              {t("signup.ana")}
                            </button>
                          </>
                        )}
                      </label>
                    </div>
                    {errors.terms && (
                      <p className="text-red-500 text-xs ml-7">
                        {errors.terms}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold group"
                    size="lg"
                    disabled={isSubmitting || !agreeToTerms}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {status.message || t("signup.creatingAccount")}
                      </>
                    ) : (
                      <>
                        {t("signup.signUpInstant")}
                        <Zap className="ml-2 h-4 w-4 group-hover:animate-pulse" />
                      </>
                    )}
                  </Button>

                  {/* Mobile Benefits */}
                  <div className="lg:hidden pt-4 flex items-center justify-center gap-6 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3" /> {t("signup.instant")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3" /> {t("signup.secure")}
                    </span>
                  </div>
                </form>
              </>
            ) : (
              <SuccessScreen />
            )}
          </div>

          {!showSuccessScreen && (
            <div className="hidden lg:block mt-6 text-center">
              <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                {t("signup.secureMessage")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CAPTCHA Modal - Isolated to prevent parent re-renders */}
      {showCaptcha && type !== "ana" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-center">
              {t("signup.verifyCaptcha", "Quick Security Check")}
            </h3>
            <p className="text-sm text-gray-600 text-center mb-4">
              {t("signup.captchaMessage")}
            </p>
            <div className="flex justify-center mb-4">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Ld3PTkrAAAAAEGBI0Xwlo6q2lmmuLQ_ZkLNECXm"
                onChange={handleCaptchaVerify}
                onExpired={() => setCaptchaToken(null)}
              />
            </div>
            <button
              onClick={() => setShowCaptcha(false)}
              className="w-full text-gray-500 hover:text-gray-700 text-sm underline"
            >
              {t("signup.cancel")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleSignup;
