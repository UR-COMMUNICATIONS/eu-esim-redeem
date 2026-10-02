import CustomDropdown from "@/components/shared/CustomDropdown";
import Loader from "@/components/shared/Loader";
import DatePicker from "@/components/shared/others/DatePicker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { dateExternal, dateformat, orignalFormat, useDisApi } from "@/general";
import { countries } from "@/general/Arrays";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { cn } from "@/lib/utils";
import blueDeviceImg from "@/assets/images/others/blue device.webp";
import { ArrowRightIcon, commercialRoutes } from "@/services";
import { fetchStateDataToken } from "@/general/getStateData";
import { saveAuthData, setUserInfo } from "@/store/module/auth/slice";
import { setCartData } from "@/store/module/cart/cartSlice";
import { setLocalPlans } from "@/store/module/plan/planSlice";
import { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { PhoneInput } from "react-international-phone";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fsimConfig } from "../FsimPartners/fsimConfig";

const pocketWifi = [
  "AD",
  "AE",
  "AL",
  "AM",
  "AT",
  "AU",
  "BA",
  "BD",
  "BE",
  "BG",
  "BH",
  "BN",
  "CA",
  "CH",
  "CN",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "EG",
  "ES",
  "FI",
  "FR",
  "GB",
  "GE",
  "GG",
  "GI",
  "GR",
  "HK",
  "HR",
  "HU",
  "ID",
  "IE",
  "IL",
  "IM",
  "IN",
  "IS",
  "IT",
  "JE",
  "JO",
  "JP",
  "KG",
  "KH",
  "KR",
  "KW",
  "KZ",
  "LA",
  "LI",
  "LK",
  "LT",
  "LU",
  "LV",
  "MA",
  "MC",
  "ME",
  "MK",
  "MO",
  "MT",
  "MX",
  "MY",
  "NL",
  "NO",
  "NP",
  "NZ",
  "OM",
  "PH",
  "PK",
  "PL",
  "PT",
  "QA",
  "RE",
  "RO",
  "RS",
  "SA",
  "SE",
  "SG",
  "SI",
  "SK",
  "SM",
  "TH",
  "TN",
  "TR",
  "TW",
  "UA",
  "US",
  "UZ",
  "VA",
  "VN",
  "ZA",
];

const esim = [
  "AU",
  "AT",
  "BD",
  "BE",
  "BG",
  "KH",
  "CA",
  "CN",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HK",
  "HU",
  "IN",
  "ID",
  "IE",
  "IT",
  "JP",
  "LV",
  "LT",
  "LU",
  "MO",
  "MY",
  "MT",
  "NL",
  "NZ",
  "PH",
  "PL",
  "PT",
  "QA",
  "SG",
  "SK",
  "SI",
  "KR",
  "ES",
  "SE",
  "CH",
  "TW",
  "TH",
  "TR",
  "GB",
  "US",
  "VN",
];

const RegisterForm = ({ comp: compProp }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const adsRef = useRef();
  const { brand } = useParams();
  const comp = (compProp || brand)?.toLowerCase();
  const isEuWifi = comp === "euwifi";
  const privacyPolicyPath = isEuWifi
    ? commercialRoutes.euPrivacyPolicy.path
    : commercialRoutes.privacyPolicy.path;
  const termsPath = isEuWifi
    ? commercialRoutes.euTermsAndConditions.path
    : commercialRoutes.termsService.path;
  const conditionI18nKey = isEuWifi
    ? "FsimRegister.euwifi.condition"
    : ["astindo", "sindoferry"].includes(comp)
      ? "FsimRegister.astindo.condition"
      : ["kol", "frwfana"].includes(comp)
        ? "FsimRegister.kol.condition"
        : "FsimRegister.condition";
  const { currentLanguage } = useUserLocationLanguage();
  const navigateNext =
    fsimConfig[comp]?.registerNext || fsimConfig["default"]?.registerNext;
  const travelCountry =
    fsimConfig[comp]?.country || fsimConfig["default"]?.country;

  const Register = t("FsimRegister", { returnObjects: true });
  // console.log("register", Register);

  let FsimRegister = Register;
  if (["astindo", "sindoferry"].includes(comp)) {
    FsimRegister = Register.astindo;
  } else if (["kol", "frwfana"].includes(comp)) {
    FsimRegister = Register.kol;
    FsimRegister.buttonText =
      cart.fsimFlowType == "D"
        ? FsimRegister.buttonTextWifi
        : FsimRegister.buttonTextEsim;
  } else if (
    [
      "sq",
      "sqfairid",
      "avia",
      "avia2026",
      "obaja",
      "obaja2026",
      "wita",
      "wita2026",
      "panorama26",
      "gdrama26",
      "euwifi",
    ].includes(comp)
  ) {
    // For wifi partner pages, use wifi button text
    const partnerRegister = Register[comp];
    if (partnerRegister && partnerRegister.buttonTextWifi) {
      FsimRegister = { ...Register, ...partnerRegister };
      FsimRegister.buttonText = partnerRegister.buttonTextWifi;
    } else {
      // Fallback: use default Register but change button text to wifi
      FsimRegister = { ...Register };
      FsimRegister.buttonText =
        Register.kol?.buttonTextWifi || "Continue to Claim\nMy Free Wifi";
    }
  }

  // const FsimRegister = comp == "astindo" ? Register.astindo : Register

  const [contact, setContact] = useState({ code: "", number: "" });
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [email, setEmail] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const isAna1Gb = comp === "ana1gb";
  const ana1GbCountries = fsimConfig["ana1gb"]?.countries || [];
  const [isChecked, setIsChecked] = useState(false);
  const [address, setAddress] = useState({
    country: "",
    city: "",
    addressOne: "",
    addressTwo: "",
    state: "",
    zipCode: "",
  });
  const date = dateformat(null);
  const [travel, setTravel] = useState({
    startDate: null, //date,
    endDate: null, //dateExternal(date, 30),
    locationCode: travelCountry.countryCode,
    travelLocation: travelCountry.countryName,
    // countryCode: travelCountry.countryCode,
    // countryName: travelCountry.countryName
    // locationCode: 'SG',
    // travelLocation: 'Singapore',
    // countryCode: 'SG',
    // countryName: 'Singapore'
  });

  console.log("travel", travel);

  const [process, setProcess] = useState({
    isProcessing: false,
  });

  const handleNavigation = () => {
    setIsChecked(false);
    dispatch(setCartData({ isCallFreeEsim: true }));
    dispatch(setCartData({ esimDetails: [] }));
    navigate(`/${brand}/${navigateNext}`);
  };

  const handleDisable = () => {
    const isActive =
      isChecked &&
      email &&
      name.firstName &&
      name.lastName &&
      contact.code &&
      contact.number.length > 4 &&
      (comp !== "euwifi" || deviceId.trim().length > 0) &&
      // ana1gb: travel.locationCode starts as the SG fallback, so require a
      // code actually picked from the ana1gb coverage list (SG is not in it)
      (!isAna1Gb ||
        ana1GbCountries.some((c) => c.code === travel.locationCode));
    return !isActive;
  };

  const addAddress = useDisApi({
    apiCall: "addAddress",
    setCallBack: (res) => {
      if (res?.status?.result) {
        handleNavigation();
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

  const verifyAndRegister = useDisApi({
    apiCall: "createUser",
    setCallBack: async (res) => {
      if (!res?.result) {
        setProcess({ ...process, isProcessing: true });
        return;
      }
      // createUser returns no bearer token, but every request after this now
      // requires one (getUser, called from ProcessOrder/KolOrder on the eSIM
      // path) — fetch one for the account just created rather than making
      // the visitor verify again. Source must match what createUser actually
      // stored, not any campaign-specific value: apidispatcher's createUser
      // case always writes sessionStorage["source"] || "urwifi", regardless
      // of what gets passed in.
      try {
        // Not `email` directly: useDisApi memoizes this callback via
        // useCallback([apiCall, dispatch]), so it never picks up a fresh
        // closure after the first render — `email` here would always read
        // back "" (the initial state). adsRef.current is refreshed on every
        // submit in handleSignUp, so it always holds the value actually
        // submitted.
        const result = await fetchStateDataToken({
          userId: adsRef.current?.userId,
          source: sessionStorage.getItem("source") || "urwifi",
        });
        if (!result?.token) throw new Error("no token");
        dispatch(saveAuthData({ token: result.token }));
      } catch {
        setProcess({ ...process, isProcessing: true });
        return;
      }
      if (["kol", "frwfana"].includes(comp) && cart.fsimFlowType == "D") {
        const adsObj = adsRef.current;
        addAddress(adsObj);
      } else {
        handleNavigation();
      }
    },
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    setProcess({ ...process, isProcessing: true });
    // const parts = name.trim().split(" ");
    const request = {
      email: email,
      firstName: name.firstName,
      lastName: name.lastName,
      phoneNumber:
        contact.code + "-" + contact.number.substring(contact.code.length),
      // firstName: parts[0],
      // lastName: parts.slice(1).join(" "),
      // startDate: travel.startDate,
      // endDate: travel.endDate,
      // address: address,
      ...(comp === "euwifi" && { deviceId: deviceId.trim() }),
    };
    const { ...rest } = address;
    const adsObj = {
      // id: userInfo?.appUserId,
      userId: email,
      fullName: name.firstName + " " + name.lastName,
      ...rest,
      contact:
        contact.code + "-" + contact.number.substring(contact.code.length),
    };
    adsRef.current = { ...adsObj };
    dispatch(setUserInfo({ ...request, ...adsObj, ...travel }));
    verifyAndRegister(request);
  };

  useEffect(() => {
    dispatch(setLocalPlans([]));
    dispatch(setCartData({ package: null, variation: null }));
  }, []);

  const handleCountryChange = (countryObj) => {
    console.log("countryobj", countryObj);

    const { countryCode = "", countryName = "" } = countryObj || {};
    setTravel({
      ...travel,
      locationCode: countryCode,
      travelLocation: countryName,
    });
  };

  // const handleCountryChange = (countryObj) => {
  //   countryRef.current = countryObj;
  //   if (countryObj) {
  //     const { isSearch } = countryObj;
  //     countryObj.isCallPlans = false;
  //     dispatch(
  //       setCartData({
  //         productCountry: countryObj,
  //         countriesList: [countryObj],
  //       }),
  //     );
  //     if (isSearch) {
  //       handleSearch(countryObj);
  //     }
  //     setSearchDisable(false);
  //   } else {
  //     setSearchDisable(true);
  //   }
  // };

  const displayCoutriesList = (list) => {
    return list
      .map((poc) => {
        // Look up the country in the master list by matching countryCode
        const translatedCountry = countries.find(
          (country) => country.countryCode === poc,
        );
        // If master entry exists, return the translated name for the selected language.
        if (translatedCountry) {
          // Try to get the translation. If not available, fallback to the english name.
          return (
            translatedCountry.translations?.[currentLanguage] ||
            translatedCountry.countryName
          );
        }
        // Fallback: if no master entry, use the country name from the API.
        return countryObj.country;
      })
      .join(", ");
  };

  // const handleDates = (date, idx) => {
  //     try {
  //         if (date) {
  //             let formattedDate = dateExternal(date);
  //             let newTravel = { ...travel };
  //             let startDate = newTravel["startDate"];
  //             let endDate = newTravel["endDate"];
  //             if (!startDate || (startDate && endDate)) {
  //                 if (formattedDate <= endDate || !endDate) {
  //                     newTravel = {
  //                         ...newTravel,
  //                         startDate: formattedDate,
  //                         endDate: null,
  //                     };
  //                 } else {
  //                     newTravel = {
  //                         ...newTravel,
  //                         startDate: formattedDate,
  //                         endDate: null,
  //                     };
  //                 }
  //             } else if (startDate && !endDate) {
  //                 if (formattedDate >= startDate || !startDate) {
  //                     newTravel["endDate"] = formattedDate;
  //                 } else {
  //                     newTravel = {
  //                         ...newTravel,
  //                         startDate: formattedDate,
  //                         endDate: null,
  //                     };
  //                 }
  //             }
  //             setTravel(newTravel);
  //         }
  //     } catch (e) {
  //         console.log("EXCEPTION", e);
  //     }
  // };

  const handleDates = (selectedDate) => {
    try {
      if (!selectedDate) return;

      let newTravel = { ...travel };

      // KOL brand → only start date, no end date
      if (comp === "kol") {
        newTravel.startDate = dateExternal(selectedDate);
        newTravel.endDate = null;
      }
      // For others (range or normal)
      else if (Array.isArray(selectedDate)) {
        const [start, end] = selectedDate;
        newTravel.startDate = start ? dateExternal(start) : null;
        newTravel.endDate = end ? dateExternal(end) : null;
      } else {
        const start = dateExternal(selectedDate);
        newTravel.startDate = start;
        newTravel.endDate = null;
      }

      setTravel(newTravel);
    } catch (e) {
      console.error("Date handling exception:", e);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  return (
    <div className={cn(!isEuWifi && "min-h-screen")}>
      <h2
        className={cn(
          "font-bold text-[#4F4F4F] text-center",
          isEuWifi ? "text-2xl lg:text-3xl" : "text-2xl lg:text-4xl",
        )}
      >
        {FsimRegister?.header || t(`FsimRegister.header`)}
      </h2>
      <p
        className={cn(
          "text-[#888888] mt-2 text-center text-sm lg:text-lg",
          isEuWifi ? "mb-4" : "mb-6",
        )}
      >
        {/* {t(`FsimRegister.dec`)} */}
        {FsimRegister?.dec}
      </p>

      <form className="space-y-5">
        <Input
          placeholder={t(`signup.firstName`)}
          name="firstName"
          type="text"
          onChange={
            (e) => setName({ ...name, firstName: e.target.value })
            // setName(e.target.value)
          }
          required
        />
        <Input
          placeholder={t(`signup.lastName`)}
          name="lastName"
          type="text"
          onChange={
            (e) => setName({ ...name, lastName: e.target.value })
            // setName(e.target.value)
          }
          required
        />
        <Input
          // placeholder={t(`FsimRegister.email`)}
          placeholder={FsimRegister.email}
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
            "text-sm md:text-base font-normal !leading-normal w-full bg-white",
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
        {comp === "euwifi" && (
          <>
            <Input
              placeholder="Device Serial Number"
              name="deviceId"
              type="text"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              required
            />
            <img
              src={blueDeviceImg}
              alt="Device serial number location"
              className="mx-auto mt-2 w-full max-w-[280px] h-auto object-contain"
            />
          </>
        )}

        {isAna1Gb && (
          <CustomDropdown
            placeHolder="form.travelCountry"
            onChange={handleCountryChange}
            filteredCountries={ana1GbCountries.map((country) => country.code)}
          />
        )}

        {[
          "kol",
          "frwfana",
          "obaja2026",
          "wita2026",
          "avia2026",
          "sqfairid",
          "panorama26",
          "gdrama26",
        ].includes(comp) &&
          cart.fsimFlowType == "D" && (
            <>
              <CustomDropdown
                placeHolder="form.travelCountry"
                onChange={handleCountryChange}
              />
              <div className="md:flex w-full relative">
                <DatePicker
                  date={{
                    from: orignalFormat(travel.startDate),
                    to: orignalFormat(travel.endDate),
                  }}
                  value={
                    travel.endDate
                      ? [new Date(travel.startDate), new Date(travel.endDate)]
                      : travel.startDate
                        ? new Date(travel.startDate)
                        : null
                  }
                  // value={travel.startDate ? new Date(travel.startDate) : null}
                  setDate={handleDates}
                  //  setDate={(date) => handleDates(date, "startDate")}
                  wrapper="flex flex-1 items-start gap-2 md:mt-0 mt-2"
                  // radius="md:!rounded-tr-none md:!rounded-br-none"
                  isHideLabel={true}
                  label={t("form.startDate")}
                  placeholderColor="text-gray-400 font-medium"
                  closeOnSingleSelect={true}
                  allowSingleSelect={true}
                  // disabled={{ before: new Date() }}
                />

                {/* <DatePicker
                                date={{
                                    from: orignalFormat(travel.startDate),
                                    to: orignalFormat(travel.endDate),
                                }}
                                value={travel.endDate ? new Date(travel.endDate) : null}
                                setDate={(date) => handleDates(date, "endDate")}
                                wrapper="flex flex-1 items-start gap-2 md:mt-0 mt-2"
                                radius="md:!rounded-tl-none md:!rounded-bl-none"
                                isHideLabel={true}
                                label={t("form.endDate")}
                                placeholderColor="text-gray-400 font-medium"
                            // placeholderColor="text-gray-300"
                            // disabled={{ before: new Date() }}
                            /> */}
              </div>

              {/* Address Fields */}
              <CustomDropdown
                placeHolder="form.addressCountry"
                onChange={(countryObj) =>
                  setAddress({
                    ...address,
                    country: countryObj?.countryCode || "",
                  })
                }
              />
              {/* <Input
                            type="text"
                            name="city"
                            placeholder={t("form.selectState")}
                            value={address.city}
                            onChange={handleAddressChange}
                        /> */}
              <Input
                // placeholder={t("form.enterFullAddress")}
                placeholder={t("form.enterYourAddress")}
                name="addressOne"
                type="text"
                value={address.addressOne}
                onChange={handleAddressChange}
                required
              />
              {/* <Input
                            placeholder={t("form.enterApartmentDetails")}
                            name="addressTwo"
                            type="text"
                            value={address.addressTwo}
                            onChange={handleAddressChange}
                        /> */}
              {/* <Input
                            placeholder={t("form.enterProvince")}
                            name="state"
                            type="text"
                            value={address.state}
                            onChange={handleAddressChange}
                        /> */}
              <Input
                type="text"
                placeholder={t("form.enterPostalCode")}
                name="zipCode"
                value={address.zipCode}
                onChange={handleAddressChange}
                required
                className="no-spinner"
              />
            </>
          )}
      </form>
      <div className="flex items-center gap-4 xl:mt-12 lg:mt-6 mt-12">
        <Switch
          checked={isChecked}
          onCheckedChange={(ev) => setIsChecked(ev)}
        />
        <p className="text-[#888888] text-sm lg:text-lg whitespace-pre-line sm:mb-0 mb-2 ">
          <Trans
            i18nKey={conditionI18nKey}
            components={{
              a1: isEuWifi ? (
                <Link
                  to={termsPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#244C75] font-semibold border-b-2 border-[#244C75]"
                />
              ) : (
                <a
                  href={termsPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#244C75] font-semibold border-b-2 border-[#244C75]"
                />
              ),
              a2: isEuWifi ? (
                <Link
                  to={privacyPolicyPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#244C75] font-semibold border-b-2 border-[#244C75]"
                />
              ) : (
                <a
                  href={privacyPolicyPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#244C75] font-semibold border-b-2 border-[#244C75]"
                />
              ),
            }}
          />
        </p>
        {/* <p className="text-black-700 text-base sm:text-lg">
                        {t("orderSummary.readAndAgree")}{" "}
                        <span className="font-semibold">
                            <a
                                href={commercialRoutes.termsService.path}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t("orderSummary.termsAndConditions")}</a>{" "}&{" "}
                            <a
                                href={commercialRoutes.privacyPolicy.path}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t("orderSummary.privacyPolicy")}</a>.
                        </span>
                    </p> */}
      </div>
      {comp === "kol" && (
        <div className="xl:mt-12 lg:mt-6 mt-12">
          {cart.fsimFlowType === "D" ? (
            <Accordion type="single" collapsible={true} defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger className="!text-sm md:!text-base !font-bold text-black-700">
                  {t("extraText.freeWifiListCountry")}
                </AccordionTrigger>
                <AccordionContent className="!text-xs md:!text-base !leading-[120%] md:!leading-[150%] text-black-700">
                  {displayCoutriesList(pocketWifi)}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : cart.fsimFlowType === "E" ? (
            <Accordion type="single" collapsible={true} defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger className="!text-sm md:!text-base !font-bold text-black-700">
                  {t("extraText.freeeSIMListCountry")}
                </AccordionTrigger>
                <AccordionContent className="!text-xs md:!text-base !leading-[120%] md:!leading-[150%] text-black-700">
                  {displayCoutriesList(esim)}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : null}
        </div>
      )}

      <div className="flex justify-center items-center xl:mt-12 lg:mt-6 mt-12">
        <Button
          // className={cn(
          //   "!bg-[#ed3942] !hover:bg-[#ed3942] text-[18px] w-full flex items-center justify-center text-center",
          //   "disabled:pointer-events-none disabled:bg-disabled [&_svg]:pointer-events-none [&_svg]:size-8 [&_svg]:shrink-0 ",
          //   process.isProcessing && "!p-0 !h-[64px]",
          // )}

          className={cn(
            "bg-[#ed3942] hover:bg-[#ed3942] text-[18px] w-full flex items-center justify-center text-center",
            "disabled:pointer-events-none disabled:bg-disabled disabled:opacity-50",
            "[&_svg]:pointer-events-none [&_svg]:size-8 [&_svg]:shrink-0",
            process.isProcessing && "!p-0 !h-[64px]",
          )}
          onClick={handleSignUp}
          disabled={handleDisable()}
        >
          {process.isProcessing ? (
            <div className="flex justify-center items-center w-full h-full">
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
            <>
              <span className="block sm:inline sm:whitespace-nowrap whitespace-pre-line leading-snug">
                {/* {t(`FsimRegister.buttonText`)} */}
                {FsimRegister.buttonText}
              </span>
              <ArrowRightIcon className="!h-6 !w-6 shrink-0 ml-2 mt-1 sm:mt-0" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
