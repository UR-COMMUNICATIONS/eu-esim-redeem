import { useDisApi } from "@/general";
import { filterPlans } from "@/general/common.funcitons";
import { setCartData } from "@/store/module/cart/cartSlice";
import {
  setLocalPlans,
  setTopPriorityPlans,
} from "@/store/module/plan/planSlice";
import { useRef, useTransition } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useLocalPlan = () => {
  // const {
  //     promoCode,
  //     userCountry: { country = "SG" } = {},
  //     productCountry: { iso2: travelCountry = "SG" }
  // } = cart
  const varRef = useRef(null);
  const { t } = useTransition();
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { promoCode, userCountry, productCountry } = cart || {};
  const { country = "SG" } = userCountry ?? {};
  const { iso2: travelCountry = "SG" } = productCountry ?? {};

  const [process, setProcess] = useState({
    title: "",
    alertMessage: "",
    alertType: "",
    isProcessing: false,
    isSuccess: false,
  });

  const getAllVariations = useDisApi({
    apiCall: "getPlanVariations",
    setCallBack: (res) => {
      // setVariation(res?.plan?.[0])
      const variation = res?.plan?.[0];
      // An order needs packageCode + variationId off the variation, so a plan
      // that resolves but has no packages configured can never be ordered.
      // Without this the order screen waits on a variation that never arrives
      // and the loader spins forever.
      if (!variation?.variationId) {
        setProcess({
          isProcessing: false,
          isSuccess: false,
          alertType: "error",
          title: "Error Message",
          alertMessage: "No packages available for this plan",
        });
        return;
      }
      dispatch(setCartData({ variation, planVariations: res?.plan }));
    },
  });

  const getLocalPlans = useDisApi({
    apiCall: "localPlans",
    setCallBack: (res, params) => {
      if (!params.promoCode) {
        dispatch(setCartData({ promoDetails: null }));
      }
      dispatch(setTopPriorityPlans(filterPlans(res?.plans || [])));
      dispatch(setLocalPlans(filterPlans(res?.plans || [])));
      dispatch(setCartData({ deposit: res?.deposit || 0 }));

      if (!res?.plans?.length) {
        setProcess({
          isProcessing: false,
          isSuccess: false,
          alertType: "error",
          title: "Error Message",
          alertMessage: "No plans available", //t('FsimRegister.noPlans')
        });
        // setProcess({
        //     isProcessing: true,
        //     isSuccess: false,
        //     alertType: "",
        //     title: "",
        //     alertMessage: ""
        // });
      } else {
        setProcess({
          isProcessing: false,
          isSuccess: true,
          alertType: "success",
          title: "",
          alertMessage: "", //t('FsimRegister.noPlans')
        });
        const isCallVariations = varRef?.current;
        if (isCallVariations) {
          varRef.current = null;
          const plan = res?.plans?.[0];
          dispatch(setCartData({ package: plan }));
          getAllVariations({ planCode: plan?.planCode });
        }
      }

      // if (res?.plans?.length) {
      //     if (!params.promoCode) {
      //         dispatch(setCartData({ promoDetails: null }));
      //     }
      //     dispatch(setTopPriorityPlans(filterPlans(res.plans)));
      //     dispatch(setLocalPlans(res.plans));
      //     dispatch(setCartData({ deposit: res?.deposit || 0 }));
      //     setProcess({ isProcessing: false, isSuccess: true, });
      // }
      // else {
      //     setProcess({
      //         isProcessing: false,
      //         isSuccess: false,
      //         alertType: 'error',
      //         title: "Error Message",
      //         alertMessage: 'No plans available'//t('FsimRegister.noPlans')
      //     });
      // }
    },
    // onError: (err) => {
    //     setProcess({ isProcessing: false, isSuccess: false, error: err.message });
    // },
  });

  const getPromoDetail = useDisApi({
    apiCall: "getPromoDetail",
    setCallBack: (res, params) => {
      if (res?.status?.result) {
        dispatch(setCartData({ promoDetails: res }));
        if (res.promoType == "G") {
          getLocalPlans({
            origin: country,
            // userId: user?.userId,
            travelingTo: [params.travelCountry],
            deviceType: "",
            promoCode: params.promoCode, //cart.promoCode
          });
        } else {
          getValidPromo({
            countryList: [{ countryCode: params.travelCountry }],
            promoCode: params.promoCode,
            travelCountry: params.travelCountry,
          });
        }
      } else {
        console.log("getPromoResp error: " + res?.status?.message);
        dispatch(setTopPriorityPlans([]));
        dispatch(setLocalPlans([]));
        dispatch(setCartData({ deposit: 0 }));
        setProcess({
          isProcessing: false,
          isSuccess: false,
          alertType: "error",
          title: "Error Message",
          alertMessage: res?.status?.message,
        });
      }
    },
  });

  const getValidPromo = useDisApi({
    apiCall: "validatePromoCountry",
    setCallBack: (res, params) => {
      if (res?.status?.result && res?.countryList?.[0]?.promo) {
        getLocalPlans({
          origin: country,
          // userId: user?.userId,
          travelingTo: [params.travelCountry],
          deviceType: "",
          promoCode: params.promoCode,
        });
      } else {
        // this.setState({ isLoading: false, promoApplied: false, promoDetails: null, plans: [] });
        dispatch(setTopPriorityPlans([]));
        dispatch(setLocalPlans([]));
        dispatch(setCartData({ deposit: 0 }));
        setProcess({
          isProcessing: false,
          isSuccess: false,
          alertType: "error",
          title: "Error Message",
          alertMessage: res?.status?.message,
        });
        // this.setState({
        //     isProcessing: false,
        //     isSuccess: false,
        //     // title: "",
        //     // alertMessage: "",
        //     // alertType: "",
        //     isLoading: false, promoApplied: false, promoDetails: null, plans: []
        // });
      }
    },
  });

  const getPackages = useDisApi({
    apiCall: "getTopPriorityPlans",
    setCallBack: (res) => {
      let plans = filterPlans(res?.plans || []);
      const source = sessionStorage.getItem("source");
      if (source === "urwifiid") {
        plans = plans.sort((a, b) => {
          const aIsTop = a.priority >= 1 && a.priority <= 3;
          const bIsTop = b.priority >= 1 && b.priority <= 3;
          if (aIsTop && bIsTop) return a.priority - b.priority;
          if (aIsTop) return -1;
          if (bIsTop) return 1;
          return Number(a.rate) - Number(b.rate);
        });
      }
      dispatch(setTopPriorityPlans(plans));
      // Note: do NOT clear productCountry/countriesList here. Priority plans are
      // fetched by origin (user country), not by travel destination, so the
      // user's previously selected country can stay prefilled for easy re-entry.
      setProcess({ isProcessing: false, isSuccess: false, error: undefined });
    },
  });

  const fetchLocalPlans = (promoCode, travellingTo, isCallVariations) => {
    varRef.current = isCallVariations;
    setProcess({ isProcessing: true, isSuccess: false, error: undefined });
    if (promoCode?.length) {
      getPromoDetail({ promoCode: promoCode, travelCountry: travellingTo });
    } else {
      getLocalPlans({
        origin: country,
        travelingTo: [travellingTo],
        deviceType: "",
      });
    }
  };

  const fetchPriorityPlans = () => {
    setProcess({ isProcessing: true, isSuccess: true, error: undefined });
    getPackages({ origin: country });
  };

  useEffect(() => {
    // fetchLocalPlans();
  }, []);

  return { process, fetchLocalPlans, fetchPriorityPlans };
};

export default useLocalPlan;
