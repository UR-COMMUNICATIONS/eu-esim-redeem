import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "react-international-phone";
import MyAccount from "@/components/shared/others/MyAccount";
import Loader from "@/components/shared/Loader";
import { useDisApi } from "@/general";
import { setUserData } from "@/store/module/auth/slice";
import CustomDropdown from "@/components/shared/CustomDropdown";
import { languages, countries } from "@/general/Arrays";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { ErrorIcon, SuccessIcon } from "@/services";

/**
 * UserProfile component
 * - Prefills form from redux `auth.user`
 * - Calls `editUser` API via useDisApi
 * - Updates redux with setUserInfo on success
 */

const UserProfile = ({ cart }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Get current user from redux
  const { user } = useSelector((state) => state.auth || {});

  // local form state
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState({ code: "", number: "" });
  const [originCountry, setOriginCountry] = useState(null);
  const [language, setLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // process for loader / messages
  const [process, setProcess] = useState({
    title: "",
    alertMessage: "",
    alertType: "", // 'success' | 'error' | ''
    isProcessing: false,
    isSuccess: false,
  });

  // Helper function to populate form from user data
  const populateFormFromUserData = (userData) => {
    setName({
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
    });
    setEmail(userData.userId || userData.email || "");
    setContact({
      code: userData.Country || userData.countryCode || "",
      number: userData.phoneNumber || userData.mobile || "",
    });

    // Map originCountry: if it's a string (country code), find the country object
    if (userData.originCountry) {
      if (typeof userData.originCountry === "string") {
        const countryObj = countries.find(
          (c) => c.countryCode === userData.originCountry,
        );
        setOriginCountry(countryObj || null);
      } else {
        setOriginCountry(userData.originCountry);
      }
    } else {
      setOriginCountry(null);
    }

    // Ensure language is uppercase to match the dropdown values
    if (userData.language) {
      const lang = userData.language.toUpperCase();
      setLanguage(lang);
    }
  };

  // simple form validation -> enable/disable Save button
  const handleDisable = () => {
    // Only validate editable fields (firstName, lastName)
    // Email and phone are read-only, so we don't need to validate them for enabling save
    const isActive = name.firstName?.trim() && name.lastName?.trim();
    return !isActive;
  };

  const handleContinue = () => {
    setProcess({
      ...process,
      isProcessing: false,
      isSuccess: false,
      title: "",
      alertType: "",
      alertMessage: "",
    });
  };

  // Fetch user data on component mount
  const getUser = useDisApi({
    apiCall: "getUser",
    setCallBack: (res) => {
      if (res?.user) {
        // Update Redux state
        dispatch(setUserData(res?.user));

        // Populate the form directly from the API response
        populateFormFromUserData(res.user);

        // Update sessionStorage and localStorage with the language from backend
        if (res.user.language) {
          const langLowerCase = res.user.language.toLowerCase();
          sessionStorage.setItem("user_language", langLowerCase);
          sessionStorage.setItem("i18next", langLowerCase);

          // Update localStorage user_data
          const userData = JSON.parse(localStorage.getItem("user_data"));
          if (userData) {
            userData.language = langLowerCase;
            localStorage.setItem("user_data", JSON.stringify(userData));
          }
        }
      }
      // Set loading to false after data is loaded
      setIsLoading(false);
    },
  });

  // Call getUser when component mounts - only once
  useEffect(() => {
    if (user?.userId) {
      getUser({ userId: user.userId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useDisApi for editUser
  const updateUserApi = useDisApi({
    apiCall: "updateUserProfile",
    setCallBack: (res) => {
      // Check both res.result and res.status.result
      if (res?.result || res?.status?.result) {
        setProcess({
          title: t("myAccount.saveProfile"),
          alertMessage:
            t("myAccount.updateSuccess") || "Profile updated successfully",
          alertType: "success",
          isProcessing: false,
          isSuccess: true,
        });

        // Fetch updated user data from backend
        // The getUser callback will populate the form and update storage
        getUser({ userId: user.userId });
      } else {
        setProcess((p) => ({
          ...p,
          alertMessage:
            res?.message || t("myAccount.updateFailed") || "Update failed",
          alertType: "error",
          isProcessing: false,
          isSuccess: false,
        }));
      }
    },
  });

  const handleSave = async (e) => {
    e?.preventDefault();
    // start loader
    setProcess({
      title: t("myAccount.saveProfile"),
      alertMessage: "",
      alertType: "",
      isProcessing: true,
      isSuccess: false,
    });

    // prepare request payload (match your API shape)
    const request = {
      userId: email?.trim(),
      firstName: name.firstName?.trim(),
      lastName: name.lastName?.trim(),
      contact: user.phoneNumber,
      // phone: contact.number,
      // countryCode: contact.code,
      originCountry: originCountry?.countryCode || originCountry,
      language: language?.toLowerCase(), // API expects lowercase language codes
    };

    console.log("Submitting user profile update:", request);
    console.log("Current language state:", language);
    console.log("Current originCountry state:", originCountry);

    try {
      // call the API (useDisApi hook likely returns a function)
      await updateUserApi(request);
      // note: updateUserApi's setCallBack will update redux & process states
    } catch (err) {
      // fallback error handling
      console.error("editUser error:", err);
      setProcess({
        title: t("myAccount.saveProfile"),
        alertMessage: t("myAccount.updateFailed") || "Update failed",
        alertType: "error",
        isProcessing: false,
        isSuccess: false,
      });
    }
  };

  // Skeleton component for loading state
  const SkeletonInput = () => (
    <div className="w-full h-[48px] bg-neutral-200 rounded-xl animate-pulse"></div>
  );

  return (
    <>
      {/* <MyAccount /> */}

      <div className="flex-1 bg-[#FAFAFA] rounded-[8px] pt-6 px-4 animate-fadeIn">
        <h1 className="text-[24px] text-[#191919] mb-4 font-bold px-3 border-b border-[#E0E0E0] pb-4">
          {t(`myAccount.myProfile`)}
        </h1>

        {isLoading ? (
          // Skeleton loading state
          <div className="flex flex-col gap-4 mt-8">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex-1 flex flex-col">
                <div className="h-5 w-24 bg-neutral-200 rounded mb-2 animate-pulse"></div>
                <SkeletonInput />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="h-5 w-24 bg-neutral-200 rounded mb-2 animate-pulse"></div>
                <SkeletonInput />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full md:mt-1">
              <div className="flex-1 flex flex-col">
                <div className="h-5 w-16 bg-neutral-200 rounded mb-3 animate-pulse"></div>
                <SkeletonInput />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="h-5 w-20 bg-neutral-200 rounded mb-3 animate-pulse"></div>
                <SkeletonInput />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full md:mt-1">
              <div className="flex-1 flex flex-col">
                <div className="h-5 w-32 bg-neutral-200 rounded mb-3 animate-pulse"></div>
                <SkeletonInput />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="h-5 w-24 bg-neutral-200 rounded mb-3 animate-pulse"></div>
                <SkeletonInput />
              </div>
            </div>

            <div className="flex gap-4 my-11">
              <div className="w-[160px] h-[50px] bg-neutral-200 rounded-xl animate-pulse"></div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="flex flex-col gap-4 mt-8">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex-1 flex flex-col">
                <label className="text-[16px] font-medium mb-2">
                  {t(`authModal.placeholders.firstName`)}
                  <span className="text-[#E41F26]">*</span>
                </label>
                <Input
                  placeholder={t(`authModal.placeholders.firstName`)}
                  name="firstName"
                  type="text"
                  value={name.firstName}
                  onChange={(e) =>
                    setName({ ...name, firstName: e.target.value })
                  }
                  className="w-full"
                />
              </div>

              <div className="flex-1 flex flex-col">
                <label className="text-[16px] font-medium mb-2">
                  {t(`authModal.placeholders.lastName`)}
                  <span className="text-[#E41F26]">*</span>
                </label>
                <Input
                  placeholder={t(`authModal.placeholders.lastName`)}
                  name="lastName"
                  type="text"
                  value={name.lastName}
                  onChange={(e) =>
                    setName({ ...name, lastName: e.target.value })
                  }
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full md:mt-1">
              <div className="flex-1 flex flex-col">
                <label className="text-[16px] font-medium mb-3">
                  {t(`authModal.placeholders.email`)}
                  <span className="text-[#E41F26]">*</span>
                </label>
                <Input
                  placeholder={t(`authModal.placeholders.email`)}
                  name="email"
                  type="email"
                  value={email}
                  disabled={true}
                  className="w-full bg-neutral-100 cursor-not-allowed"
                />
              </div>

              <div className="flex-1 flex flex-col">
                <label className="text-[16px] font-medium mb-3">
                  {t(`form.phone`)}
                  <span className="text-[#E41F26]">*</span>
                </label>

                <PhoneInput
                  defaultCountry={cart?.userCountry?.country?.toLowerCase()}
                  value={contact.number}
                  disabled={true}
                  className={cn(
                    "text-sm md:text-base !mt-0 font-normal !leading-normal w-full bg-neutral-100 cursor-not-allowed",
                  )}
                  style={{
                    "--react-international-phone-flag-background-color":
                      "transparent rounded-[20px]",
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full md:mt-1">
              <div className="flex-1 flex flex-col">
                <label className="text-[16px] font-medium mb-3">
                  {t(`form.originCountry`)}
                </label>
                <CustomDropdown
                  defaultValue={originCountry}
                  onChange={(countryObj) => {
                    setOriginCountry(countryObj || null);
                  }}
                  placeHolder="form.selectOriginCountry"
                  dropDownType="country"
                  dropDownStyle="grey"
                  bgClass="bg-neutral-50"
                />
              </div>

              <div className="flex-1 flex flex-col">
                <label className="text-[16px] font-medium mb-3">
                  {t(`form.language`)}
                </label>
                <select
                  value={language}
                  onChange={(e) => {
                    const newLang = e.target.value;
                    console.log(
                      "Language dropdown changed from:",
                      language,
                      "to:",
                      newLang,
                    );
                    setLanguage(newLang);
                  }}
                  className="h-[48px] w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 text-sm md:text-base font-medium outline-none text-gray-500"
                >
                  <option value="">{t("form.selectLanguage")}</option>
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4 my-11">
              {/* <Button
              type="button"
              className="bg-transparent hover:bg-transparent text-[16px] text-[#f24144] hover:text-[#f24144] !border-[#f24144]"
              style={{ border: "1px solid #f24144" }}
              onClick={() => window.location.reload()}
            >
              {t(`myAccount.changeDetails`)}
            </Button> */}

              <Button
                type="submit"
                className={cn(
                  "bg-[#f24144] hover:bg-[#f24144] text-[16px] h-[50px] min-w-[160px] flex items-center justify-center !border-[#f24144]",
                )}
                disabled={process.isProcessing || handleDisable()}
              >
                {process.isProcessing ? (
                  <div className="flex flex-col gap-6 items-center justify-center h-full w-full">
                    <Loader
                      type="Oval"
                      color="#f24144"
                      secondaryColor="#f24144"
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
                  t("myAccount.saveProfile")
                )}
              </Button>
            </div>
          </form>
        )}
      </div>

      <Dialog open={process.isSuccess} onOpenChange={handleContinue}>
        <DialogContent
          showCloseIcon={true}
          className="w-[calc(100vw-32px)] max-w-[540px] h-auto min-h-[286px] sm:min-h-[438px] rounded-xl md:rounded-3xl flex flex_center flex-col px-4 md:px-8 lg:px-[60px] pt-10 md:pt-[60px] pb-6 md:pb-[60px] gap-6 md:gap-12 bg-main-50"
        >
          {process.isProcessing ? (
            <div className="flex flex-col gap-6 items-center justify-center h-full w-full">
              <Loader
                type="Oval"
                color="#f24144"
                secondaryColor="#f24144"
                height={"18vw"}
                width={"18vw"}
                className="max-h-[100px] max-w-[100px] min-h-[60px] min-w-[60px]"
                wrapperStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
              <div className="text-center flex flex-col gap-3 sm:gap-4">
                <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-700">
                  {t("process.processing")}
                </DialogTitle>
                <p className="text-base text-black-700">
                  {t("process.processMessage")}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-center">
                {process.alertType === "success" ? (
                  <SuccessIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />
                ) : (
                  <ErrorIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />
                )}
              </div>
              <div className="text-center flex flex-col gap-3 sm:gap-4">
                <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-700">
                  {process.title}
                </DialogTitle>
                <p className="text-base text-black-700">
                  {process.alertMessage}
                </p>
              </div>
              <DialogClose
                onClick={handleContinue}
                className="px-10 py-4 bg-main-600 text-white rounded-xl max-w-max mx-auto outline-none border-none"
              >
                {t("orderSummary.continue")}
              </DialogClose>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserProfile;
