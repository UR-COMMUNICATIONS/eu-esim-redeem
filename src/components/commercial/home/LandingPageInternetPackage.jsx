/**
 * API calls overview (LandingPageInternetPackage)
 *
 * fetchLocalPlans(promoCode, travelCountry) — from useLocalPlan():
 *   - If promoCode is present:
 *     1. getPromoDetail({ promoCode, travelCountry }) — request: { requestType: "getPromoDetail", promoCode }
 *     2. On success, if promo is type "G": localPlans({ origin, travelingTo: [travelCountry], deviceType, promoCode })
 *        Else: validatePromoCountry({ countryList: [{ countryCode: travelCountry }], promoCode, travelCountry })
 *        Then on success: localPlans({ origin, travelingTo: [travelCountry], deviceType, promoCode })
 *   - If no promoCode:
 *     localPlans({ origin, travelingTo: [travelCountry], deviceType })
 *   - localPlans request: { requestType: "localPlans", origin, travelingTo, deviceType?, promoCode?, language }
 *   - If plans returned and isCallVariations: getPlanVariations({ planCode })
 *
 * fetchPriorityPlans() — from useLocalPlan():
 *   - getTopPriorityPlans({ origin }) — request: { requestType: "getTopPriorityPlans", origin, language }
 *
 * countryObj?.countryCode comes from:
 *   - handleSearch(e): if e is a DOM event → countryObj = countryRef.current || cart.productCountry; else countryObj = e
 *   - countryRef / cart.productCountry are set by handleCountryChange(countryObj), which is the onChange of the
 *     country selector (e.g. CustomDropdown in nav). CustomDropdown passes { ...country, iso2: country.countryCode,
 *     name: country.countryName, isSearch }. The country list items have countryCode and countryName, so
 *     countryObj.countryCode is the selected country code (e.g. "JP", "SG"). cart.productCountry also exposes
 *     iso2 (same as countryCode) and name/translations for display.
 */

import InternetPackageCardLandingPage from "@/components/shared/cards/InternetPackageCardLandingPage";
import { Button } from "@/components/ui/button";
import { dateExternal, useDisApi } from "@/general";
import useLocalPlan from "@/hooks/useLocalPlan";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { RefreshIcon } from "@/services";
import { InternetPackageCardSkeleton } from "@/skeletons/home/InternetPackageSkeleton";
import { setUserData } from "@/store/module/auth/slice";
import { setCartData } from "@/store/module/cart/cartSlice";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const DeviceTypeEnum = {
  Esim: "E",
  Sim: "S",
  PocketDevice: "D",
};

const LANDING_SECTIONS = {
  pocketWifi: {
    title: "Pocket WIFI",
    subtitle:
      "Fast, secure internet in your pocket wherever you travel worldwide",
    filter: (pkg) =>
      pkg.deviceType?.toUpperCase() === DeviceTypeEnum.PocketDevice,
  },
  simEsim: {
    title: "SIM & eSIM",
    subtitle: "Seamless Global Roaming with SIM & eSIM Solutions",
    filter: (pkg) => {
      const type = pkg.deviceType?.toUpperCase();
      return type === DeviceTypeEnum.Sim || type === DeviceTypeEnum.Esim;
    },
  },
};

function LandingPageInternetPackage({ urlCountryCode, urlCountryName }) {
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
    pocketWifi: {
      index: 4,
      actualPlans: [],
      filteredPlans: [],
    },
    simEsim: {
      index: 4,
      actualPlans: [],
      filteredPlans: [],
    },
  });

  const { currentLanguage, defaultProduct } = useUserLocationLanguage();
  const { process, fetchLocalPlans, fetchPriorityPlans } = useLocalPlan();

  const [selected, setSelected] = useState(defaultProduct);
  const { t } = useTranslation(["translation", "english", "local"]);
  const countryRef = useRef(null);
  // Pre-fill dates from previously entered travel details so the user doesn't
  // have to re-enter them when returning to this screen.
  const [travel, setTravel] = useState({
    startDate: cart?.travelDetails?.[0]?.startDate || null,
    endDate: cart?.travelDetails?.[0]?.endDate || null,
  });

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

  const getUser = useDisApi({
    apiCall: "getUser",
    setCallBack: (res) => {
      dispatch(setUserData(res?.user || null));
    },
  });

  useEffect(() => {
    setCurrentIndex(8);
    const pocketWifiPlans = packages.filter(LANDING_SECTIONS.pocketWifi.filter);
    const simEsimPlans = packages.filter(LANDING_SECTIONS.simEsim.filter);

    setFilteredPackages(packages.slice(0, 8));

    setPlanSection({
      pocketWifi: {
        index: 4,
        actualPlans: pocketWifiPlans,
        filteredPlans: pocketWifiPlans.slice(0, 4),
      },
      simEsim: {
        index: 4,
        actualPlans: simEsimPlans,
        filteredPlans: simEsimPlans.slice(0, 4),
      },
    });
  }, [packages, cart.userLanguage]);

  useEffect(() => {
    if (cart.annex) {
      setpromoCode(cart.promoCode);
    }
  }, [cart.annex]);

  useEffect(() => {
    if (cart.productCountry && cart.annex) {
      const { name, iso2, translations } = cart.productCountry;
      setSearchTerm((prev) => ({
        ...prev,
        label: translations[currentLanguage] || name,
        value: iso2,
      }));
    }
  }, [cart?.productCountry, cart?.annex, currentLanguage]);

  useEffect(() => {
    // User is back on the home/landing screen. Clear any promo from a previous
    // flow so it doesn't carry over to the next plan selection. Clear both the
    // redux value and the local input state so the field shows empty.
    if (!urlCountryCode) {
      dispatch(setCartData({ promoCode: "", promoDetails: null }));
      setpromoCode("");
      // If a country is already selected (preserved from a prior search),
      // enable the search button so the user can re-search immediately.
      if (cart?.productCountry?.countryCode) {
        setSearchDisable(false);
      }
    }
  }, []);

  // getTopPriorityPlans: fetches "priority" plans by user origin (not travel destination). Only run when we're
  // not on a country URL — on e.g. /internet-packages/japan we only want localPlans with travelingTo from URL.
  useEffect(() => {
    if (!cart.userCountry?.country) return;
    if (user?.userId) {
      getUser({ userId: user.userId });
    }
    if (!urlCountryCode) {
      fetchPriorityPlans();
    }
  }, [cart?.userCountry?.country, urlCountryCode]);

  // When visiting a country URL (e.g. /internet-packages/japan), call localPlans with travelingTo from URL
  useEffect(() => {
    if (!urlCountryCode) return;
    const countryObj = {
      countryCode: urlCountryCode,
      countryName: urlCountryName || urlCountryCode,
      iso2: urlCountryCode,
      name: urlCountryName || urlCountryCode,
    };
    countryRef.current = countryObj;
    dispatch(
      setCartData({
        productCountry: countryObj,
        countriesList: [countryObj],
        travelDetails: [
          {
            locationCode: urlCountryCode,
            travelLocation: urlCountryName || urlCountryCode,
            startDate: travel.startDate,
            endDate: travel.endDate,
          },
        ],
      }),
    );
    setSearchTerm((prev) => ({
      ...prev,
      label: urlCountryName || urlCountryCode,
      value: urlCountryCode,
    }));
    setSearchDisable(false);
    fetchLocalPlans(promoCode || "", urlCountryCode);
  }, [urlCountryCode]);

  const handleSearch = (e) => {
    let countryObj = null;
    if (e?.target) {
      e.preventDefault();
      countryObj = countryRef?.current || cart?.productCountry;
    } else {
      countryObj = e;
    }
    const travelCountry = countryObj?.countryCode;
    fetchLocalPlans(promoCode, travelCountry);
    dispatch(
      setCartData({
        promoCode: promoCode,
        // Keep travelDetails, countriesList and productCountry in sync so the
        // CartService country dropdown shows the chosen country as selected.
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
    const pocketWifiPlans = packages.filter(LANDING_SECTIONS.pocketWifi.filter);
    const simEsimPlans = packages.filter(LANDING_SECTIONS.simEsim.filter);

    setPlanSection({
      pocketWifi: {
        ...planSection.pocketWifi,
        actualPlans: pocketWifiPlans,
        filteredPlans: pocketWifiPlans.slice(0, planSection.pocketWifi.index),
      },
      simEsim: {
        ...planSection.simEsim,
        actualPlans: simEsimPlans,
        filteredPlans: simEsimPlans.slice(0, planSection.simEsim.index),
      },
    });

    setSelected((prevSelected) =>
      prevSelected.includes(paramName) ? [] : [paramName],
    );
  };

  const handleDates = (date) => {
    try {
      if (date) {
        const formattedDate = dateExternal(date);
        let newTravel = { ...travel };
        const startDate = newTravel.startDate;
        const endDate = newTravel.endDate;
        if (!startDate || (startDate && endDate)) {
          newTravel = {
            ...newTravel,
            startDate: formattedDate,
            endDate: null,
          };
        } else if (startDate && !endDate) {
          if (formattedDate >= startDate || !startDate) {
            newTravel.endDate = formattedDate;
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
    } catch (err) {
      console.error("handleDates", err);
    }
  };

  return (
    <div className="sec_common_80 px-4 min-[1176px]:px-0 bg-neutral-50">
      <div className="containerX flex_center flex-col">
        {process.isProcessing ? (
          <InternetPackageCardSkeleton />
        ) : filteredPackages.length > 0 ? (
          <>
            <div className="w-full flex flex-col gap-16">
              {Object.keys(LANDING_SECTIONS).map((sectionKey) => {
                const sectionConfig = LANDING_SECTIONS[sectionKey];
                const section = planSection[sectionKey];
                const plans = section?.filteredPlans ?? [];

                return (
                  <div key={sectionKey}>
                    <header className="text-center mb-10">
                      <h2 className="font-['DMSans'] font-bold text-[40px] md:text-[64px] leading-[120%] text-[#191919] tracking-normal text-center">
                        {sectionConfig.title}
                      </h2>
                      <p className="font-['DMSans'] font-normal text-[18px] leading-[140%] tracking-normal text-center text-gray-600 mt-3 max-w-2xl mx-auto">
                        {sectionConfig.subtitle}
                      </p>
                    </header>

                    {plans.length > 0 ? (
                      <>
                        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8">
                          {plans.map((data, index) => (
                            <InternetPackageCardLandingPage
                              key={`${sectionKey}-${index}`}
                              data={data}
                              flow="PP"
                            />
                          ))}
                        </div>
                        <div className="mt-8 md:mt-12 flex justify-center">
                          <Button
                            onClick={() => handleLoadMore(sectionKey)}
                            disabled={
                              section?.index >= section?.actualPlans?.length
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
                      </>
                    ) : (
                      <p className="p_common text-center w-full text-gray-500">
                        {t("notFound.noPackage")}
                      </p>
                    )}
                  </div>
                );
              })}
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

export default LandingPageInternetPackage;
