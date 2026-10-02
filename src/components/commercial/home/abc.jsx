import InternetPackageCard from "@/components/shared/cards/InternetPackageCard";
import Loader from "@/components/shared/Loader";
import DatePicker from "@/components/shared/others/DatePicker";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dateExternal, dateformat, orignalFormat, useDisApi } from "@/general";
import { countries } from "@/general/Arrays";
import { filterPlans } from "@/general/common.funcitons";
import useDynamicImports from "@/hooks/useDynamicImports";
import useExternalPromo from "@/hooks/useExternalPromo";
import useLocalPlan from "@/hooks/useLocalPlan";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { images, RefreshIcon } from "@/services";
import { setUserData } from "@/store/module/auth/slice";
import { setCartData } from "@/store/module/cart/cartSlice";
import {
  setLocalPlans,
  setTopPriorityPlans,
} from "@/store/module/plan/planSlice";
import { Suspense } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import CountryNote from "./CountryNote";
import { InternetPackageCardSkeleton } from "@/skeletons/home/InternetPackageSkeleton";
import { PLAN_TYPES_MAPPING } from "@/constants/planTypes";

const DeviceTypeEnum = {
  Esim: "E",
  Sim: "S",
  PocketDevice: "D",
};

const computeFilteredPackages = (packagesList, selected) => {
  // Default to Pocket Device ("D") if selected is null, undefined, or empty.
  const defaultFilter = DeviceTypeEnum.PocketDevice;
  const filterValue =
    Array.isArray(selected) && selected.length > 0
      ? selected[0]
      : defaultFilter;

  // If "All" is selected, return every package.
  if (filterValue === "A") {
    return packagesList;
  }

  return packagesList.filter(({ deviceType }) => {
    // When "Sim" is selected, include both Sim and Esim packages.
    if (filterValue === DeviceTypeEnum.Sim) {
      return (
        deviceType === DeviceTypeEnum.Sim || deviceType === DeviceTypeEnum.Esim
      );
    }
    // Otherwise, return only packages matching the filterValue.
    return deviceType === filterValue;
  });
};

function InternetPackage() {
  // useExternalPromo();
  const { user } = useSelector((state) => state.auth);
  const { packages } = useSelector((state) => state.plan);
  const { cart } = useSelector((state) => state.cart);
  // console.log({ cart });
  const [isDropdown, setDropdown] = useState(false);
  const [promoCode, setpromoCode] = useState(cart?.promoCode);
  const [searchTerm, setSearchTerm] = useState({ label: "", value: "" });
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [dropdownSuggestions, setDropdownSuggestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(8);
  const [filteredPackages, setFilteredPackages] = useState(packages.slice(0, currentIndex));
  const [yearlyPackages, setYearlyPackages] = useState([]);
  const [monthlyPackages, setMonthlyPackages] = useState([]);
  const [dailyPackages, setDailyPackages] = useState([]);

  const [planSection, setPlanSection] = useState({
    daily: {
      index: 4,
      actualPlans: [],
      filteredPlans: []
    },
    yearly: {
      index: 4,
      actualPlans: [],
      filteredPlans: []
    },
    monthly: {
      index: 4,
      actualPlans: [],
      filteredPlans: []
    },
  });

  const [totLength, setLength] = useState({
    yearly: 0,
    monthly: 0,
    daily: 0
  });

  const { currentCountry, currentLanguage, isTargetCountry, hideProductFilter, defaultProduct } = useUserLocationLanguage();
  const { process, fetchLocalPlans, fetchPriorityPlans } = useLocalPlan();


  const datas = [
    { _id: 0, name: "All", value: "A" },
    { _id: 1, name: "Pocket Wifi", value: "D" },
    { _id: 2, name: "Sim", value: "S" },
    { _id: 3, name: "eSim", value: "E" },
  ];
  const [selected, setSelected] = useState(defaultProduct);
  // const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation(["translation", "english", "local"])
  const inputRef = useRef(null);
  const [travel, setTravel] = useState({
    startDate: null, // new Date(),
    endDate: null  // new Date(),
  });

  const computedPackages = useMemo(
    () => computeFilteredPackages(filteredPackages, selected),
    [filteredPackages, selected]
  );


  const handleLoadMore = (section) => {

    const currIndex = planSection[section]?.index
    const currPlans = planSection[section]?.actualPlans?.length

    if (currIndex < currPlans) {
      setIsLoadMore(true);
      const newIndex = currIndex + 4;

      setTimeout(() => {

        setPlanSection({
          ...planSection,
          [section]: {
            ...planSection[section],
            index: newIndex,
            filteredPlans: [...planSection[section]?.actualPlans?.slice(0, newIndex)] || []
          }
        })
        setIsLoadMore(false);
      }, 300);
    }

  };

  const handleDisable = () => {
    console.log("searchTerm", searchTerm);

    const isActive = searchTerm?.value ? true : false;
    return !isActive
  }

  const getUser = useDisApi({
    apiCall: "getUser",
    setCallBack: (res) => {
      dispatch(setUserData(res?.user || null));
    },
  });

  useEffect(() => {
    if (cart.userCountry?.country) {
      // if (packages.length == 0 || cart.userLanguage !== "en") {
      // if (!cart.annex) {
      fetchPriorityPlans()
      // }
      // }
      if (user?.userId) {
        getUser({ userId: user.userId });
      }
    }
  }, [cart?.userCountry?.country]);

  useEffect(() => {
    setCurrentIndex(8);
    const monthlyAndVolume = [...PLAN_TYPES_MAPPING.monthly, ...PLAN_TYPES_MAPPING.volume]
    const computedPackages = computeFilteredPackages(packages, selected)
    const yearly = computedPackages.filter(pkg => pkg.planType === 'Y');
    const monthly = computedPackages.filter(pkg => monthlyAndVolume?.includes(pkg.planType));
    const daily = computedPackages.filter(pkg => PLAN_TYPES_MAPPING.daily?.includes(pkg.planType));

    // console.log("yearly plans", yearly);
    // console.log("monthly plans", monthly);
    // console.log("daily plans", daily);

    setFilteredPackages(packages.slice(0, 8));

    setPlanSection({
      // ...planSection,
      daily: {
        index: 4,
        actualPlans: daily,
        filteredPlans: daily.slice(0, 4)
      },
      yearly: {
        index: 4,
        actualPlans: yearly,
        filteredPlans: yearly.slice(0, 4)
      },
      monthly: {
        index: 4,
        actualPlans: monthly,
        filteredPlans: monthly.slice(0, 4)
      },
    });

    // setPlans(prev => ({
    //   ...prev,
    //   monthly: [...prev.monthly, newPlan]
    // }));


    // setPlanSection(prev => ({
    //   ...prev,
    //   yearly: {
    //     ...prev.monthly,
    //     plans: [...prev.monthly.plans, newPlan]
    //   },
    //   monthly: {
    //     ...prev.monthly,
    //     plans: [...prev.monthly.plans, newPlan]
    //   },
    //   daily: {
    //     ...prev.monthly,
    //     plans: [...prev.monthly.plans, newPlan]
    //   }
    // }));

  }, [packages, cart.userLanguage]);

  useEffect(() => {
    // console.log("useeffect annex", cart.annex, cart.annexCountryCode);
    if (cart.annex) {
      setpromoCode(cart.promoCode)
      // fetchLocalPlans(cart.promoCode, cart.annexCountryCode)
      // fetchLocalPlans(cart.promoCode, cart?.annexCountryCode || cart?.userCountry?.country)
    }
  }, [cart.annex]);

  useEffect(() => {
    // console.log("ueeeffect annex and product country");
    // console.log("annex", cart.annex);
    // console.log("product country", cart.productCountry);
    if (cart.productCountry && cart.annex) {
      const { name, iso2, translations } = cart.productCountry
      setSearchTerm({ ...searchTerm, label: translations[currentLanguage] || name, value: iso2 });
    }
  }, [cart?.productCountry, cart?.annex]);

  // useEffect(() => {
  //   console.log("inside ueeeffect");
  //   console.log("annex", cart.annex);
  //   console.log("product country", cart.productCountry);

  //   if (cart.annex && cart.productCountry) {
  //     const { name, iso2, translations } = cart.productCountry
  //     setpromoCode(cart.promoCode)
  //     fetchLocalPlans(cart.promoCode, iso2)
  //     setSearchTerm({ ...searchTerm, label: translations[currentLanguage] || name, value: iso2 });
  //   }
  // }, [cart?.annex, cart?.productCountry]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchTerm({ ...searchTerm, label: input, value: '' });
    if (input) {
      // const suggestions = countries.filter((cou) =>
      //   [cou.countryName, cou.trCountryName]
      //     .some(attr => attr?.toLowerCase()?.includes(input?.toLowerCase()))
      // );
      const suggestions = countries.filter((country) =>
        // Get an array of all translation strings from the "translations" object
        Object.values(country.translations).some((translation) =>
          translation?.toLowerCase().includes(input?.toLowerCase())
        )
      );

      setDropdownSuggestions(suggestions);
    } else {
      setDropdownSuggestions([]);
    }
  };

  const handlePromoCode = (e) => {
    // console.log("e.target.value", e.target.value);
    setpromoCode(e.target.value);
  };

  const handleDropdownSelect = (country) => {
    // Set searchTerm to selected country and clear dropdown suggestions
    setDropdown(true);
    const { countryName, countryCode } = country;
    // setSearchTerm({ label: countryName, value: countryCode });
    setSearchTerm({ label: country.translations[currentLanguage], value: countryCode });
    const countryObj = cart?.reactCountries.find(
      (cou) => cou.iso2 === countryCode
    );
    dispatch(
      setCartData({ productCountry: countryObj, countriesList: [countryObj] })
    );
    setDropdownSuggestions([]);
    inputRef?.current?.focus();
  };

  // helper at top of your component
  const normalize = (str) => (str || "")?.toLowerCase()?.replace(/\s+/g, "") // ?.replace(/[\s\.\-']/g, "");

  // searchTerm.label?.toLowerCase()?.replace(/\s+/g, "") || "";


  const handleSearch = (e) => {
    e.preventDefault();
    // Filter packages based on search term
    let travelCountry = cart.productCountry?.iso2;
    const trSearch = normalize(searchTerm.label);
    // console.log("trSearch", trSearch);
    let trCountry = null;
    if (trSearch) {
      trCountry = countries.find((cou) =>
        [
          normalize(cou.translations[currentLanguage]),
          normalize(cou.countryName)
        ].some((attr) => attr.includes(trSearch))
      );
    }
    // console.log("trCountry", trCountry);
    const countryObj = cart?.reactCountries.find(
      // (cou) => normalize(cou.name) === normalize(trCountry?.countryName)
      (cou) => normalize(cou.iso2) === normalize(trCountry?.countryCode)
    );
    // console.log("countryObj", countryObj);
    if (countryObj) {
      travelCountry = countryObj.iso2;
      setSearchTerm({
        ...searchTerm,
        label: countryObj.translations[currentLanguage] || countryObj.name,
        value: countryObj.iso2,
      });
      dispatch(
        setCartData({
          productCountry: countryObj,
          countriesList: [countryObj],
        })
      );
      fetchLocalPlans(promoCode, travelCountry);
    } else {
      travelCountry = "";
    }

    dispatch(
      setCartData({
        promoCode: promoCode,
        travelDetails: [{
          locationCode: cart?.productCountry?.iso2,
          travelLocation: cart?.productCountry?.name,
          startDate: travel.startDate,
          endDate: travel.endDate
        }],
      })
    );

    // const results = packages.filter((pkg) => pkg.country.toLowerCase().includes(searchTerm.toLowerCase()));
    // setFilteredPackages(results);
    setDropdown(false);
    setDropdownSuggestions([]);
  };

  const toggleButton = (paramName) => {
    setSelected((prevSelected) =>
      prevSelected.includes(paramName) ? [] : [paramName]
    );
  };

  const handleDates = (date, idx) => {
    try {
      if (date) {
        let formattedDate = dateExternal(date);
        let newTravel = { ...travel };
        let startDate = newTravel["startDate"];
        let endDate = newTravel["endDate"];
        if (!startDate || (startDate && endDate)) {
          if (formattedDate <= endDate || !endDate) {
            newTravel = {
              ...newTravel,
              startDate: formattedDate,
              endDate: null,
            };
          } else {
            newTravel = {
              ...newTravel,
              startDate: formattedDate,
              endDate: null,
            };
          }
        } else if (startDate && !endDate) {
          if (formattedDate >= startDate || !startDate) {
            newTravel["endDate"] = formattedDate;
          } else {
            newTravel = {
              ...newTravel,
              startDate: formattedDate,
              endDate: null,
            };
          }
        }
        setTravel(newTravel);
      }
    } catch (e) {
      console.log("EXCEPTION", e);
    }
  };

  const path =
    "&/countries/{currentCountry}/src/components/commercial/home/AnnexCountryNote.jsx";
  const AnnexCountryNote_Dynamic = useDynamicImports(path);

  return (
    <div className="sec_common_80 px-4 min-[1176px]:px-0 bg-neutral-50">
      <SectionHeader
        heading={t("internetPackages.sectionHeading")}
        subHeading={t("internetPackages.sectionSubHeading")}
      />
      <div className="containerX flex_center flex-col">
        <div className="bg-white border-[#EEEEEE] px-4 w-full max-w-[800px] mt-10 mb-5 rounded-[16px]">
          <div className="md:flex flex-wrap items-center gap-4 w-full  mt-6 lg:mt-10 mb-2 ">
            <div className="flex-1 relative md:mt-0 mt-2">
              <form onSubmit={handleSearch} className="relative">
                <input
                  id="searchCountry"
                  ref={inputRef}
                  type="text"
                  value={searchTerm.label}
                  onChange={handleInputChange}
                  placeholder={t("internetPackages.searchPlaceholder")}
                  className="h-[48px] w-full bg-neutral-100 border border-neutral-300 rounded-xl px-4 text-sm md:text-base outline-none !placeholder-gray-400"
                />
                {dropdownSuggestions.length > 0 && (
                  <div className="absolute w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto z-10">
                    {dropdownSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => handleDropdownSelect(suggestion)}
                        className="flex items-center cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        <span>{suggestion.translations[currentLanguage]}</span>
                        {/* <span>{suggestion.countryName}</span> */}
                      </div>
                    ))}
                  </div>
                )}
              </form>
            </div>
            <div className="flex-1 md:mt-0 mt-2">
              <Input
                name="promoCode"
                placeholder={t("pocketWifiRegion.form.fields.1.placeholder")}
                required
                onChange={handlePromoCode}
                defaultValue={promoCode}
                className="bg-neutral-100 border border-neutral-300 h-[48px] !placeholder-gray-400"
                // disabled={promoCode == 'SKYTICKET' ? true : false}
                disabled={cart.annex ? true : false}

              />
            </div>
          </div>
          <div className="md:flex items-center w-full gap-2 mb-8">
            <div className="md:flex w-full relative">
              <DatePicker
                date={{
                  from: orignalFormat(travel.startDate),
                  to: orignalFormat(travel.endDate),
                }}
                value={travel.startDate}
                setDate={(date) => handleDates(date, "startDate")}
                wrapper="flex flex-1 items-start gap-2 md:mt-0 mt-2"
                radius="md:!rounded-tr-none md:!rounded-br-none"
                isHideLabel={true}
                label={t("form.startDate")}
                placeholderColor="text-gray-400 font-medium"
              // disabled={{ before: new Date() }}
              />
              <DatePicker
                date={{
                  from: orignalFormat(travel.startDate),
                  to: orignalFormat(travel.endDate),
                }}
                value={travel.endDate}
                setDate={(date) => handleDates(date, "endDate")}
                wrapper="flex flex-1 items-start gap-2 md:mt-0 mt-2"
                radius="md:!rounded-tl-none md:!rounded-bl-none"
                isHideLabel={true}
                label={t("form.endDate")}
                placeholderColor="text-gray-400 font-medium"
              // placeholderColor="text-gray-300"
              // disabled={{ before: new Date() }}
              />
            </div>

            <div className="w-full flex-1">
              <Button
                onClick={handleSearch}
                className={"font-medium text-sm h-[48px] w-full md:mt-0 mt-2"}
                size={"sm"}
                type="submit"
                // disabled={handleDisable}
                disabled={searchTerm?.value ? false : true}
              >
                {" "}
                {t("buttonText.searchPlans")}
              </Button>
            </div>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            {AnnexCountryNote_Dynamic ? <AnnexCountryNote_Dynamic /> : <CountryNote />}
          </Suspense>
        </div>
        {/* {!isTargetCountry && (
          <div className="flex gap-2 mb-8">
            {t("datas", { returnObjects: true })
              .filter(item => !hideProductFilter.includes(item.value))
              .map((data) => (
                // {datas.map((data) => (
                <button
                  key={data._id}
                  className={`px-4 py-2 md:px-[32px] md:py-[10px] rounded-lg text-sm ${selected.includes(data.value)
                    ? "bg-[#FFC400] text-white"
                    : "bg-gray-200 text-black"
                    }`}
                  onClick={() => toggleButton(data.value)}
                >
                  {data.name}
                </button>
              ))}
          </div>
        )} */}
        {process.isProcessing ? (
          <InternetPackageCardSkeleton />
        ) : filteredPackages.length > 0 ? (
          <>
            <div className="w-full flex flex-col gap-10">
              {Object.keys(planSection).map((section, idx) => (
                <div key={idx} className={`${section.bg}`}>
                  {planSection[section]?.filteredPlans?.length > 0 &&
                    <h2 className="md:text-[36px] text-[24px] font-bold text-[#191919]">
                      {t(`interntPlans.${section}`)}
                    </h2>
                  }
                  <div className="flex">
                    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-8 mt-4">
                      {planSection[section]?.filteredPlans?.map((data, index) => (
                        <InternetPackageCard
                          key={`${section.title}-${index}`}
                          data={data}
                          flow="PP"
                        />
                      ))}
                    </div>
                  </div>
                  {planSection[section]?.filteredPlans?.length > 0 && (
                    <div className="mt-8 md:mt-12 flex justify-center">
                      <Button
                        onClick={() => handleLoadMore(section)}
                        disabled={planSection[section]?.index < planSection[section]?.actualPlans?.length ? false : true}
                        variant="alert"
                        type="button"
                      >
                        <span>{t("buttonText.loadMore")}</span>
                        <RefreshIcon className={isLoadMore ? "animate-spin" : ""} />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="p_common text-center w-full">
            {t("notFound.noPackage")}
          </p>
        )}
      </div>
    </div>
  );
}

export default InternetPackage;
