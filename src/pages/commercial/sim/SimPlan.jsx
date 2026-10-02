import PackageCard from "@/components/shared/cards/PackageCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { commercialRoutes } from "@/services";
import { handleNextSimCart, setSimCartData } from "@/store/module/sim/slice";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SimCartService from "./SimCartService";
import { useTranslation } from "react-i18next";
import { filterPlans, planCoverage } from "@/general/common.funcitons";
import { useDisApi } from "@/general";
import { setLocalPlans } from "@/store/module/plan/planSlice";
import { PLAN_TYPES_MAPPING } from "@/constants/planTypes";
import { setCartData } from "@/store/module/cart/cartSlice";
import SimCartFooter from "@/components/commercial/sim/SimCartFooter";
import Loader from "@/components/shared/Loader";

function SimPlan() {
  const { t } = useTranslation();
  const tabs = [
    { tab: "all", translableName: t("simPlan.tabs.0") },
    { tab: "daily", translableName: t("simPlan.tabs.1") },
    { tab: "monthly", translableName: t("simPlan.tabs.2") },
    { tab: "multi-country", translableName: t("simPlan.tabs.3") },
  ];

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { localPlans } = useSelector((state) => state.plan);
  const [plans, setPlans] = useState(filterPlans(localPlans, ["S", "E"]));
  const [planCountries, setPlanCountries] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  const [process, setProcess] = useState({ isProcessing: true });

  const isActivePackage = Boolean(
    cart?.package?.planCode || cart?.topup?.planCode,
  );
  const deviceSelect =
    cart?.cartType === "topup" ? Boolean(cart?.device?.deviceId) : true;
  const isCountryAvailable = Boolean(cart?.productCountry?.id);
  const isStartDateAvailable = Boolean(cart?.startDate);

  const isActivePlan =
    isActivePackage && deviceSelect && isCountryAvailable ? true : false;
  const isActive = cart?.package?.planCode && isActivePlan ? true : false;
  const options = { align: "start" };
  const [emblaRef] = useEmblaCarousel(options);
  const navigate = useNavigate();

  const filterByCategory = (item) => {
    if (activeTab == "all") return true;
    else return PLAN_TYPES_MAPPING[activeTab].includes(item.planType);
  };

  const handleSelectPlan = (item) => {
    dispatch(
      setCartData({
        package: item,
        planVariations: [],
        travelDetails: [],
        variation: {},
      }),
    );
  };

  const handleNext = () => {
    dispatch(
      setCartData({
        cartType: "",
        planVariations: [],
        travelDetails: [],
        variation: {},
        compflowType: null,
      }),
    );
    navigate(commercialRoutes.simCartService.path);
  };

  const handlePrev = () => {
    navigate(commercialRoutes.simRegion.path);
  };

  const checkPromoValidity = () => {
    try {
      // setProcess({ ...process, isProcessing: true })
      if (cart?.promoCode?.length) {
        getPromoDetail({ promoCode: cart.promoCode.trim() });
      } else {
        getCountryPlans();
      }
    } catch (error) {
      // showAlert({ type: 'error', message: error.message })
    }
  };

  const getPromoDetail = useDisApi({
    apiCall: "getPromoDetail",
    setCallBack: (res) => {
      if (res?.status?.result) {
        dispatch(setCartData({ promoDetails: res }));
        if (res.promoType == "G") {
          getLocalPlans({
            origin: cart.userCountry?.country || user?.originCountry || "SG",
            userId: user?.userId,
            travelingTo: [cart.productCountry?.iso2 || ""],
            deviceType: "",
            promoCode: cart.promoCode,
          });
        } else {
          getValidPromo({
            countryList: [{ countryCode: cart.productCountry?.iso2 || "" }],
            promoCode: cart.promoCode.trim(),
          });
        }
      } else {
      }
    },
  });

  const getValidPromo = useDisApi({
    apiCall: "validatePromoCountry",
    setCallBack: (res) => {
      if (res && res?.countryList[0]?.promo) {
        getLocalPlans({
          origin: cart.userCountry?.country || user?.originCountry || "SG",
          userId: user?.userId,
          travelingTo: [cart.productCountry?.iso2 || ""],
          deviceType: "",
          promoCode: cart.promoCode,
        });
      } else {
        // this.setState({ isLoading: false, promoApplied: false, promoDetails: null, plans: [] });
      }
    },
  });

  const getLocalPlans = useDisApi({
    apiCall: "localPlans",
    setCallBack: (res) => {
      const returnedPlans = res?.plans || [];
      dispatch(setLocalPlans(returnedPlans));
      dispatch(setCartData({ deposit: res?.deposit || 0 }));
      setProcess({ isProcessing: false });

      const currentPlanCode = cart?.package?.planCode;
      if (currentPlanCode) {
        const stillValid = returnedPlans.some(
          (p) => p.planCode === currentPlanCode,
        );
        if (!stillValid) {
          dispatch(
            setCartData({ package: {}, variation: {}, planVariations: [] }),
          );
        }
      }
    },
  });

  const getPlanCountries = useDisApi({
    apiCall: "planCountries",
    setCallBack: (res) =>
      dispatch(setCartData({ planCountries: res?.countries || [] })),
    // setCallBack: (res) => setPlanCountries(res?.countries || [])
  });

  const getPlanCountriesList = useDisApi({
    apiCall: "planCountriesList",
    setCallBack: (res) =>
      dispatch(setCartData({ planCountriesList: res?.countries || [] })),
  });

  useEffect(() => {
    if (cart?.promoCode?.length) {
      getPromoDetail({ promoCode: cart.promoCode.trim() });
    } else {
      getLocalPlans({
        origin: cart.userCountry?.country || user?.originCountry || "SG",
        travelingTo: [cart.productCountry?.iso2 || ""],
        deviceType: "",
      });
    }
  }, []);

  useEffect(() => {
    setPlans(filterPlans(localPlans, ["S", "E"]));
  }, [localPlans]);

  useEffect(() => {
    if (cart.package.planCode) {
      getPlanCountries({ planCode: cart.package.planCode });
      getPlanCountriesList({ planCode: cart.package.planCode });
    }
  }, [cart.package?.planCode]);

  const handleDisable = () => {
    const isActive = cart?.package?.planCode ? true : false;
    return !isActive;
  };

  return (
    <div className="w-full overflow-auto">
      <div className="w-full flex flex-col gap-5">
        <h2 className="text-base sm:text-xl md:text-2xl font-semibold md:font-bold text-black-900">
          {t("simPlan.heading")}
        </h2>
        <div ref={emblaRef} className="w-full max-w-full overflow-hidden">
          <div className="flex items-center gap-4">
            {tabs.map(({ tab, translableName }) => (
              <Button
                key={tab}
                className={cn(
                  "w-full hover:bg-secondary-500",
                  activeTab === tab ? "text-black-900 font-semibold" : "",
                )}
                variant={activeTab === tab ? "secondary" : "outline"}
                onClick={() => setActiveTab(tab)}
              >
                {translableName || tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-12">
        {plans.length ? (
          plans?.filter(filterByCategory)?.map((item, index) => (
            <PackageCard
              wrapperClass={`cursor-pointer ${cart?.package?.planCode == item?.planCode ? "border-main-600" : ""}`}
              item={item}
              index={index}
              key={index}
              onClick={() => handleSelectPlan(item)}
              // planCountries={planCountries}
            />
          ))
        ) : process.isProcessing ? (
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
            />{" "}
          </div>
        ) : (
          <h2 className="text-center font-bold text-2xl my-4">
            {t("noCoverage", {
              countryName: cart.productCountry?.name || t("thisCountry"),
            })}
            {/* {`No Coverage for ${cart.productCountry?.name || 'this country'}`} */}
          </h2>
        )}
      </div>
      <SimCartFooter
        prevHandler={handlePrev}
        nextHandler={handleNext}
        disableHandler={handleDisable}
      />
    </div>
  );
}

export default SimPlan;
