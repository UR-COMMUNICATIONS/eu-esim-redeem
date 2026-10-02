import InternetPackageCard from "@/components/shared/cards/InternetPackageCard";
import DatePicker from "@/components/shared/others/DatePicker";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dateExternal, orignalFormat, useDisApi } from "@/general";
import useDynamicImports from "@/hooks/useDynamicImports";
import useLocalPlan from "@/hooks/useLocalPlan";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { RefreshIcon } from "@/services";
import { setUserData } from "@/store/module/auth/slice";
import { setCartData } from "@/store/module/cart/cartSlice";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import CountryNote from "./CountryNote";
import { InternetPackageCardSkeleton } from "@/skeletons/home/InternetPackageSkeleton";
import { PLAN_TYPES_MAPPING } from "@/constants/planTypes";
import CustomDropdown from "@/components/shared/CustomDropdown";

const DeviceTypeEnum = {
  Esim: "E",
  Sim: "S",
  PocketDevice: "D",
};

const computeFilteredPackages = (packagesList, selected) => {
  // Default to Pocket Device ("D") if selected is null, undefined, or empty.
  const defaultFilter = [DeviceTypeEnum.PocketDevice];
  const filterValues =
    Array.isArray(selected) && selected.length > 0 ? selected : defaultFilter;

  // If "All" (A) is selected, return all packages without filtering.
  if (filterValues.includes("A")) {
    return packagesList;
  }

  return packagesList.filter(({ deviceType }) => {
    // Special handling: When "Sim" is selected, include both Sim and Esim packages.
    if (filterValues.includes(DeviceTypeEnum.Sim)) {
      if (
        deviceType === DeviceTypeEnum.Sim ||
        deviceType === DeviceTypeEnum.Esim
      ) {
        return true;
      }
    }

    // Check if device type matches any of the selected filter values
    return filterValues.includes(deviceType);
  });
};

function InternetPackage({ isCallPriorityPlans = false }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { packages } = useSelector((state) => state.plan);
  const { cart } = useSelector((state) => state.cart);
  const [promoCode, setpromoCode] = useState(cart?.promoCode);
  const [searchTerm, setSearchTerm] = useState({ label: "", value: "" });
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(8);
  const [filteredPackages, setFilteredPackages] = useState(
    packages.slice(0, currentIndex),
  );
  const [isSearchDisabled, setSearchDisable] = useState(true);

  const [planSection, setPlanSection] = useState({
    daily: {
      index: 4,
      actualPlans: [],
      filteredPlans: [],
    },
    yearly: {
      index: 4,
      actualPlans: [],
      filteredPlans: [],
    },
    monthly: {
      index: 4,
      actualPlans: [],
      filteredPlans: [],
    },
  });

  const {
    currentLanguage,
    defaultProduct,
    currentCountry,
    isTargetCountry,
    hideProductFilter,
    nameSpace,
  } = useUserLocationLanguage();
  const { process, fetchLocalPlans, fetchPriorityPlans } = useLocalPlan();
  const [searchParams] = useSearchParams();

  const datas = [
    { _id: 0, name: "All", value: "A" },
    { _id: 1, name: "Pocket Wifi", value: "D" },
    { _id: 2, name: "Sim", value: "S" },
    { _id: 3, name: "eSim", value: "E" },
  ];

  const typeParam = searchParams.get("type");
  // ANA1GB arrives as ?annex=ANA1GB and lists every plan in one grid, without
  // the daily/yearly/monthly split. Read the URL only, never cart.annex: that
  // is persisted in sessionStorage and never cleared, so it would follow the
  // user onto the home page and flatten those sections too.
  const isAnaPage =
    (searchParams.get("annex") || "").toUpperCase() === "ANA1GB";
  const initialSelected = typeParam ? [typeParam] : defaultProduct;
  const [selected, setSelected] = useState(initialSelected);
  const { t } = useTranslation(["translation", "english", "local"]);
  const countryRef = useRef(null);
  // Pre-fill dates from previously entered travel details so the user doesn't
  // have to re-enter them when returning to the home screen.
  const [travel, setTravel] = useState({
    startDate: cart?.travelDetails?.[0]?.startDate || null,
    endDate: cart?.travelDetails?.[0]?.endDate || null,
  });

  const computedPackages = useMemo(
    () => computeFilteredPackages(filteredPackages, selected),
    [filteredPackages, selected],
  );

  // Merged ANA grid reads the full list: filteredPackages is capped at 8.
  const allPlans = useMemo(
    () => computeFilteredPackages(packages, selected),
    [packages, selected],
  );

  const handleLoadMore = (section) => {
    const currIndex = planSection[section]?.index;
    const currPlans = planSection[section]?.actualPlans?.length;

    if (currIndex < currPlans) {
      setIsLoadMore(true);
      const newIndex = currIndex + 4;

      setTimeout(() => {
        setPlanSection({
          ...planSection,
          [section]: {
            ...planSection[section],
            index: newIndex,
            filteredPlans:
              [...planSection[section]?.actualPlans?.slice(0, newIndex)] || [],
          },
        });
        setIsLoadMore(false);
      }, 300);
    }
  };

  const handleDisable = () => {
    console.log("searchTerm", searchTerm);

    const isActive = searchTerm?.value ? true : false;
    return !isActive;
  };

  const getUser = useDisApi({
    apiCall: "getUser",
    setCallBack: (res) => {
      dispatch(setUserData(res?.user || null));
    },
  });

  useEffect(() => {
    setCurrentIndex(8);
    const monthlyAndVolume = [
      ...PLAN_TYPES_MAPPING.monthly,
      ...PLAN_TYPES_MAPPING.volume,
    ];
    const computedPackages = computeFilteredPackages(packages, selected);
    const yearly = computedPackages.filter((pkg) => pkg.planType === "Y");
    const monthly = computedPackages.filter((pkg) =>
      monthlyAndVolume?.includes(pkg.planType),
    );
    const daily = computedPackages.filter((pkg) =>
      PLAN_TYPES_MAPPING.daily?.includes(pkg.planType),
    );

    // console.log("yearly plans", yearly);
    // console.log("monthly plans", monthly);
    // console.log("daily plans", daily);

    setFilteredPackages(packages.slice(0, 8));

    setPlanSection({
      // ...planSection,
      daily: {
        index: 4,
        actualPlans: daily,
        filteredPlans: daily.slice(0, 4),
      },
      yearly: {
        index: 4,
        actualPlans: yearly,
        filteredPlans: yearly.slice(0, 4),
      },
      monthly: {
        index: 4,
        actualPlans: monthly,
        filteredPlans: monthly.slice(0, 4),
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
    if (cart.annex) {
      // console.log("useeffect annex", cart.annex, cart.annexCountryCode);
      setpromoCode(cart.promoCode);
    }
  }, [cart.annex]);

  useEffect(() => {
    if (cart.productCountry && cart.annex) {
      // console.log("useeffect product country and annex", cart.productCountry, cart.annex);
      const { name, iso2, translations } = cart.productCountry;
      setSearchTerm({
        ...searchTerm,
        label: translations[currentLanguage] || name,
        value: iso2,
      });
    }
  }, [cart?.productCountry, cart?.annex]);

  useEffect(() => {
    if (!isCallPriorityPlans) {
      setSearchDisable(false);
      if (
        cart?.productCountry?.countryCode &&
        cart?.productCountry?.isCallPlans
      ) {
        // console.log("useeffect product country", cart.productCountry);
        handleSearch(cart?.productCountry);
      }
    }
  }, [cart?.productCountry?.countryCode]);

  useEffect(() => {
    if (isCallPriorityPlans) {
      // A promo arriving as ?annex= was applied deliberately by a partner
      // landing page (e.g. /sqfairpromo -> ?annex=SQFPW), so it must survive
      // mount and reach the plan fetch. Only clear a promo left over from a
      // previous flow, which is the case this reset was written for.
      if (!searchParams.get("annex")) {
        // Clear both the redux value and the local input state so the field
        // shows empty.
        dispatch(setCartData({ promoCode: "", promoDetails: null }));
        setpromoCode("");
      }
      // If a country is already selected (preserved from a prior search),
      // enable the search button so the user can re-search immediately.
      if (cart?.productCountry?.countryCode) {
        setSearchDisable(false);
      }
    }
  }, []);

  useEffect(() => {
    // console.log("isCallPriorityPlans", isCallPriorityPlans);
    if (isCallPriorityPlans && cart.userCountry?.country) {
      // console.log("useeffect priority plans");
      fetchPriorityPlans();
      if (user?.userId) {
        getUser({ userId: user.userId });
      }
    }
  }, [cart?.userCountry?.country]);

  // useEffect(() => {
  //   console.log("isCallPriorityPlans", isCallPriorityPlans);
  //   if (isCallPriorityPlans) {
  //     if (cart.userCountry?.country) {
  //       console.log("useeffect priority plans");
  //       fetchPriorityPlans();
  //       if (user?.userId) {
  //         getUser({ userId: user.userId });
  //       }
  //     }
  //   }
  //   else {
  //     setSearchDisable(false);
  //     if (cart?.productCountry?.countryCode && cart?.productCountry?.isCallPlans) {
  //       console.log("useeffect product country", cart.productCountry);
  //       handleSearch(cart?.productCountry);
  //     }
  //   }
  // }, [cart?.userCountry?.country, cart?.productCountry?.countryCode]);

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

  const handlePromoCode = (e) => {
    setpromoCode(e.target.value);
  };

  const handleSearch = (e) => {
    let countryObj = null;
    if (e?.target) {
      e.preventDefault();
      countryObj = countryRef?.current || cart?.productCountry;
    } else {
      countryObj = e;
    }
    const travelCountry = countryObj?.countryCode;
    // Promo trace: a non-empty promoCode here means fetchLocalPlans routes to
    // getPromoDetail (discounted plans) rather than plain getLocalPlans.

    fetchLocalPlans(promoCode, travelCountry);
    dispatch(
      setCartData({
        promoCode: promoCode,
        // Keep travelDetails, countriesList and productCountry in sync so the
        // CartService country dropdown shows the chosen country as selected
        // (it reads from countriesList) and validation (reads travelDetails)
        // agrees with what's displayed.
        productCountry: countryObj,
        countriesList: [countryObj],
        travelDetails: [
          {
            locationCode: countryObj?.countryCode,
            travelLocation: countryObj?.countryName,
            startDate: travel.startDate,
            endDate: travel.endDate,
          },
        ],
      }),
    );
  };

  const handleCountryChange = (countryObj) => {
    countryRef.current = countryObj;
    if (countryObj) {
      const { isSearch } = countryObj;
      countryObj.isCallPlans = false;
      dispatch(
        setCartData({
          productCountry: countryObj,
          countriesList: [countryObj],
        }),
      );
      if (isSearch) {
        handleSearch(countryObj);
      }
      setSearchDisable(false);
    } else {
      setSearchDisable(true);
    }
  };

  const toggleButton = (paramName) => {
    // computedPackages([...planSection.daily.filteredPlans])
    // console.log("paramName", paramName);

    const monthlyAndVolume = [
      ...PLAN_TYPES_MAPPING.monthly,
      ...PLAN_TYPES_MAPPING.volume,
    ];

    const computedPackages = computeFilteredPackages(packages, [paramName]);

    const yearly = computedPackages.filter((pkg) => pkg.planType === "Y");
    const monthly = computedPackages.filter((pkg) =>
      monthlyAndVolume?.includes(pkg.planType),
    );
    const daily = computedPackages.filter((pkg) =>
      PLAN_TYPES_MAPPING.daily?.includes(pkg.planType),
    );

    setPlanSection({
      daily: {
        ...planSection.daily,
        actualPlans: daily,
        filteredPlans: daily.slice(0, planSection.daily.index),
      },
      yearly: {
        ...planSection.yearly,
        actualPlans: yearly,
        filteredPlans: yearly.slice(0, planSection.yearly.index),
      },
      monthly: {
        ...planSection.monthly,
        actualPlans: monthly,
        filteredPlans: monthly.slice(0, planSection.monthly.index),
      },
    });

    // setSelected([paramName])
    // setSelectedProduct((prevSelected) =>
    //   prevSelected.includes(paramName) ? [] : [paramName],
    // );

    setSelected((prevSelected) =>
      prevSelected.includes(paramName) ? [] : [paramName],
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
            {/* <CustomDropdown onChange={handleCountryChange} /> */}
            <CustomDropdown
              defaultValue={cart?.productCountry}
              onChange={handleCountryChange}
            />
            <div className="flex-1 md:mt-0 mt-2">
              <Input
                name="promoCode"
                placeholder={t("pocketWifiRegion.form.fields.1.placeholder")}
                required
                onChange={handlePromoCode}
                value={promoCode || ""}
                className="bg-neutral-50 border border-neutral-300 h-[48px] !placeholder-gray-400"
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
                disabled={isSearchDisabled}
              >
                {" "}
                {t("buttonText.searchPlans")}
              </Button>
            </div>
          </div>
          <CountryNote />
        </div>
        {(!isTargetCountry || currentCountry === "id") && (
          <div className="flex gap-2 mb-8">
            {t("datas", { returnObjects: true })
              .filter((item) => !hideProductFilter.includes(item.value))
              .map((data) => (
                // {datas.map((data) => (
                <button
                  key={data._id}
                  className={`px-4 py-2 md:px-[32px] md:py-[10px] rounded-lg text-sm ${selected.includes(data.value) ? "bg-[#FFC400] text-white" : "bg-gray-200 text-black"}`}
                  onClick={() => toggleButton(data.value)}
                >
                  {data.name}
                </button>
              ))}
          </div>
        )}
        {process.isProcessing ? (
          <InternetPackageCardSkeleton />
        ) : filteredPackages.length > 0 ? (
          <>
            <div className="w-full flex flex-col gap-10">
              {isAnaPage ? (
                allPlans.length > 0 ? (
                  <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-8 mt-4">
                    {allPlans.map((data, index) => (
                      <InternetPackageCard key={index} data={data} flow="PP" />
                    ))}
                  </div>
                ) : (
                  <p className="p_common text-center w-full">
                    {t("notFound.noPackage")}
                  </p>
                )
              ) : (
                Object.keys(planSection).map((section, idx) => (
                  <div key={idx} className={`${section.bg}`}>
                    {planSection[section]?.filteredPlans?.length > 0 && (
                      <h2 className="md:text-[36px] text-[24px] font-bold text-[#191919]">
                        {t(`${nameSpace}:interntPlans.${section}`)}
                      </h2>
                    )}
                    <div className="flex">
                      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-8 mt-4">
                        {planSection[section]?.filteredPlans?.map(
                          (data, index) => (
                            <InternetPackageCard
                              key={`${section.title}-${index}`}
                              data={data}
                              flow="PP"
                            />
                          ),
                        )}
                      </div>
                    </div>
                    {planSection[section]?.filteredPlans?.length > 0 && (
                      <div className="mt-8 md:mt-12 flex justify-center">
                        <Button
                          onClick={() => handleLoadMore(section)}
                          disabled={
                            planSection[section]?.index <
                            planSection[section]?.actualPlans?.length
                              ? false
                              : true
                          }
                          variant="alert"
                          type="button"
                        >
                          <span>{t("buttonText.loadMore")}</span>
                          <RefreshIcon
                            className={isLoadMore ? "animate-spin" : ""}
                          />
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
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
