import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ErrorIcon, SuccessIcon, BackArrowIcon } from "@/services";
import { setUserData, setAddressData } from "@/store/module/auth/slice";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useDisApi } from "@/general";
import { PhoneInput } from "react-international-phone";
import Loader from "@/components/shared/Loader";
import CustomDropdown from "@/components/shared/CustomDropdown";
import { useNavigate } from "react-router-dom";
import { isValidUSZipCode, getStateFromZipCode } from "@/utils/ziptoState";

const defaultAddress = {
  id: null,
  fullName: "",
  addressOne: "",
  addressTwo: "",
  country: "",
  zipCode: "",
  contact: {
    code: "",
    number: "",
  },
  city: "",
  state: "",
  checkIndate: "",
  roomNumber: "",
  type: "",
  default: false,
};

function AddNewAddress() {
  const { user, addressCountry } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const [activeTab, setActiveTab] = useState("home");
  const [process, setProcess] = useState({
    title: "",
    alertMessage: "",
    alertType: "",
    isProcessing: false,
    isSuccess: false,
  });
  const [address, setAddress] = useState(defaultAddress);
  const [zipCodeError, setZipCodeError] = useState("");
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleContinue = () => {
    setProcess({
      ...process,
      isProcessing: false,
      isSuccess: false,
      title: "",
      alertType: "",
      alertMessage: "",
    });
    // Navigate back to address list on success
    if (process.alertType === "success") {
      navigate(-1);
    }
  };

  const getUser = useDisApi({
    apiCall: "getUser",
    setCallBack: (res) => {
      if (res?.user) {
        dispatch(setUserData(res?.user));
      }
    },
  });

  const addAddress = useDisApi({
    apiCall: "addAddress",
    setCallBack: (res) => {
      if (res?.status?.result) {
        getUser({ userId: user.userId });
        setProcess({
          ...process,
          isProcessing: false,
          isSuccess: true,
          title: t("process.success"),
          alertType: "success",
          alertMessage: t("process.addeddAddress"),
        });
        setAddress(defaultAddress);
      } else {
        setProcess({
          ...process,
          isProcessing: false,
          isSuccess: true,
          title: t("process.failed"),
          alertType: "error",
          alertMessage: t("process.FailedAddress"),
        });
      }
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "contact") {
      setAddress({
        ...address,
        contact: {
          code: "+" + value?.country?.dialCode || "",
          number: value.number,
        },
      });
    } else {
      setAddress({ ...address, [name]: value });

      // Clear zip code error when country changes to non-US
      if (name === "country" && value !== "US") {
        setZipCodeError("");
      }

      // Real-time zip code validation for US addresses
      if (name === "zipCode" && address.country === "US") {
        if (!value.trim()) {
          setZipCodeError("");
        } else if (!isValidUSZipCode(value)) {
          setZipCodeError(t("formErrors.invalidZipCode"));
        } else {
          const derivedState = getStateFromZipCode(value);
          if (!derivedState) {
            setZipCodeError(t("formErrors.unrecognizedZipCode"));
          } else {
            setZipCodeError("");
            // Auto-fill state if not already set
            if (!address.state) {
              setAddress((prev) => ({ ...prev, state: derivedState }));
            }
          }
        }
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!address.fullName.trim()) errors.fullName = t("formErrors.fullName");
    if (!address.contact.number?.trim()?.length)
      errors.phone = t("formErrors.phone");
    if (!address.country) errors.country = t("formErrors.country");
    if (activeTab === "home" && !address.addressOne.trim())
      errors.addressOne = t("formErrors.addressOne");
    if (activeTab === "home" && !address.addressTwo.trim())
      errors.addressTwo = t("formErrors.addressTwo");

    // Zip code validation - mandatory only for US addresses
    if (address.country === "US") {
      if (!address.zipCode?.trim()) {
        errors.zipCode = t("formErrors.zipCode");
      } else if (!isValidUSZipCode(address.zipCode)) {
        errors.zipCode =
          t("formErrors.invalidZipCode") ||
          "Please enter a valid US zip code (5 digits)";
      } else {
        // Check if we can determine the state from zip code
        const derivedState = getStateFromZipCode(address.zipCode);
        if (!derivedState) {
          errors.zipCode =
            t("formErrors.unrecognizedZipCode") ||
            "Unable to determine state from this zip code. Please verify the zip code is correct.";
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      // Show validation errors in the dialog instead of alert
      const errorList = Object.values(errors);
      setProcess({
        isProcessing: false,
        isSuccess: true,
        title: t("formErrors.validationFailed") || "Validation Error",
        alertType: "error",
        alertMessage: errorList.join(". "),
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    setProcess({ ...process, isProcessing: true, isSuccess: true });
    const { contact, country, city, state, zipCode } = address;

    // Auto-fill state from zip code for US addresses if not provided
    let finalState = state;
    if (country === "US" && zipCode && !state) {
      finalState = getStateFromZipCode(zipCode);
    }

    let request = {
      ...address,
      userId: user?.userId,
      contact:
        contact.code + "-" + contact.number.substring(contact.code.length),
      country: country,
      city: city.name || city,
      state: finalState,
    };
    addAddress(request);
  };

  useEffect(() => {
    if (user?.userId) {
      getUser({ userId: user.userId });
    }
  }, []);

  return (
    <div className="flex-1 bg-[#FAFAFA] rounded-[8px] pt-6 px-4 animate-fadeIn">
      <div className="cursor-pointer" onClick={() => navigate(-1)}>
        <h1 className="flex items-center gap-3 text-[24px] text-[#191919] mb-4 font-bold px-3 border-b border-[#E0E0E0] pb-4">
          <BackArrowIcon
            className="w-6 h-6 cursor-pointer"
            color="black"
            strokeWidth={1}
          />
          {t(`myAccount.addNewAddress`)}
        </h1>
      </div>
      <div className="flex flex-col gap-4 mt-8">
        <form noValidate onSubmit={handleSubmit} className="w-full">
          <div className="flex gap-4 mb-8 border border-[#D1D5DB] overflow-hidden rounded-full max-w-96 p-1">
            <Button
              className={`w-full sm:max-w-[200px] text-sm font-semibold hover:bg-[#f24144] hover:text-white rounded-full ${
                activeTab === "home"
                  ? "bg-[#f24144] text-white"
                  : "bg-transparent"
              }`}
              type="button"
              variant="ghost"
              onClick={() => setActiveTab("home")}
            >
              {t("myAccount.homeOffice")}
            </Button>

            <Button
              className={`w-full sm:max-w-[200px] text-sm font-semibold rounded-full hover:bg-[#f24144] hover:text-white ${
                activeTab === "hotel"
                  ? "bg-[#f24144] text-white"
                  : "bg-transparent"
              }`}
              type="button"
              variant="ghost"
              onClick={() => setActiveTab("hotel")}
            >
              {t("buttonText.hotel")}
            </Button>
          </div>

          <div className="flex flex-col gap-2 sm:gap-4 mt-2 sm:mt-6 md:mt-8">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="w-full">
                <Input
                  className="w-full"
                  type="text"
                  label={
                    <span>
                      {t("form.fullName")}
                      <span className="text-[#E41F26]">*</span>
                    </span>
                  }
                  placeholder={t("form.enterNameHere")}
                  name="fullName"
                  value={address.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <span className="label">
                  {t("form.phoneNumber")}
                  <span className="text-[#E41F26]">*</span>
                </span>
                <PhoneInput
                  placeholder={t("form.phoneNumber")}
                  defaultCountry={cart?.userCountry?.country?.toLowerCase()}
                  value={address.contact.number}
                  className={cn(
                    "text-sm md:text-base !mt-0 font-normal !leading-normal w-full bg-white",
                  )}
                  onChange={(value, obj) =>
                    handleChange({
                      target: {
                        name: "contact",
                        value: { number: value, country: obj.country },
                      },
                    })
                  }
                  style={{
                    "--react-international-phone-flag-background-color":
                      "transparent rounded-[20px]",
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <span className="label">
                  {t("form.country")}
                  <span className="text-[#E41F26]">*</span>
                </span>
                <CustomDropdown
                  defaultValue={addressCountry}
                  onChange={(countryObj) => {
                    // Update Redux state with selected country or null if cleared
                    dispatch(setAddressData(countryObj || null));
                    handleChange({
                      target: {
                        name: "country",
                        value: countryObj?.countryCode || "",
                      },
                    });
                  }}
                  placeHolder="form.selectCountry"
                  dropDownType="country"
                  dropDownStyle="grey"
                  bgClass="bg-neutral-50"
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <span className="label">
                  {t("form.state")}
                  <span className="text-[#E41F26]">*</span>
                </span>
                <Input
                  type="text"
                  name="city"
                  value={address.city || ""}
                  onChange={handleChange}
                  placeholder={t("form.selectState")}
                />
              </div>
            </div>
            {activeTab === "home" && (
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="w-full">
                  <Input
                    label={
                      <span>
                        {t("form.address")}
                        <span className="text-[#E41F26]">*</span>
                      </span>
                    }
                    placeholder={t("form.enterFullAddress")}
                    name="addressOne"
                    value={address.addressOne}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full">
                  <Input
                    label={
                      <span>
                        {t("form.apartment")}
                        <span className="text-[#E41F26]">*</span>
                      </span>
                    }
                    placeholder={t("form.enterApartmentDetails")}
                    name="addressTwo"
                    value={address.addressTwo}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="w-full">
                <Input
                  label={
                    <span>
                      {t("form.province")}
                      <span className="text-[#E41F26]">*</span>
                    </span>
                  }
                  placeholder={t("form.enterProvince")}
                  name="state"
                  value={address.state}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <Input
                  type="text"
                  label={
                    <span>
                      {t("form.postalCode")}
                      {address.country === "US" && (
                        <span className="text-[#E41F26]">*</span>
                      )}
                    </span>
                  }
                  placeholder={t("form.enterPostalCode")}
                  name="zipCode"
                  value={address.zipCode}
                  onChange={handleChange}
                  required={address.country === "US"}
                  className={zipCodeError ? "border-red-500" : ""}
                />
                {zipCodeError && (
                  <span className="text-xs text-red-500 mt-1">
                    {zipCodeError}
                  </span>
                )}
                {address.country === "US" &&
                  address.zipCode &&
                  !zipCodeError && (
                    <span className="text-xs text-green-600 mt-1">
                      ✓ Valid zip code
                    </span>
                  )}
              </div>
            </div>
          </div>
          <div className="my-12 flex md:justify-start justify-center">
            <Button
              className="!h-11 md:!h-[52px] w-32 text-white hover:bg-[#e23a3d] border-[#f24144] bg-[#f24144]"
              type="submit"
            >
              {t("myAccount.save")}
            </Button>
          </div>
        </form>

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
                  height={100}
                  width={100}
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
                  className="px-10 py-4 bg-[#f24144] text-white rounded-xl max-w-max mx-auto outline-none border-none"
                >
                  {t("orderSummary.continue")}
                </DialogClose>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default AddNewAddress;
