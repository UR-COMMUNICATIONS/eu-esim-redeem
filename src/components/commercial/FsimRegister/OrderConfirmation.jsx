import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SuccessIcon, ErrorIcon, commercialRoutes } from "@/services";
import Loader from "@/components/shared/Loader";
import useLocalPlan from "@/hooks/useLocalPlan";
import { useDispatch, useSelector } from "react-redux";
import { dateExternal, dateformat, useDisApi } from "@/general";
import { handleSimCalculator } from "@/general/calculator";
import ApiService from "@/general/apiClient";
import { modulesURLPath } from "@/constants/urls";
import { setCartData } from "@/store/module/cart/cartSlice";
import { useNavigate, useParams } from "react-router-dom";
import { encryptData } from "@/general/encryption";
import { setUserData } from "@/store/module/auth/slice";
import { fsimConfig } from "../FsimPartners/fsimConfig";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { fetchLocalPlans, process } = useLocalPlan();
  const { cart } = useSelector((state) => state.cart);
  const { localPlans } = useSelector((state) => state.plan);
  const { userInfo } = useSelector((state) => state.auth);

  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);
  const [variat, setVariation] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [request, setRequest] = useState(null);
  const [pgw, setPgw] = useState(null);
  const [esims, setEsims] = useState(null);

  const { brand } = useParams();
  const comp = brand?.toLowerCase();

  const bnrNext = fsimConfig[comp]?.bnrNext || fsimConfig["default"]?.bnrNext;

  // const [promoDetails, setPromoDetails] = useState(cart.promoDetails);
  const date = dateformat(null);
  const [travel, setTravelDetails] = useState([
    {
      startDate: date,
      endDate: dateExternal(date, 30),
      locationCode: "SG",
      travelLocation: "Singapore",
      countryCode: "SG",
      countryName: "Singapore",
    },
  ]);
  const [estimat, setEstimation] = useState({
    requestType: "buy-esim",
    memberId: "",
    planCode: "",
    planName: "",
    promoDiscount: "", // null
    estimatedCost: 0,
    promoDiscountType: "",
    // noOfDevices: cart?.quantity || 1,
    noOfDevices: 1,
    promoCode: "",
    countryCode: "SG",
    totalDays: "",
    promoApplied: false,
    costToDisplayInSummary: null,
    minCharges: null,
    freeDelivery: false,
  });

  const [orderProcess, setProcess] = useState({
    title: "",
    alertMessage: "",
    alertType: "",
    isProcessing: true,
    isSuccess: false,
  });

  // const navQr = {
  //   jtb: commercialRoutes.jtbQr.path,
  //   airasia: commercialRoutes.airAsiaQr.path,
  //   astindo: commercialRoutes.astindoQr.path,
  //   kol: cart.fsimFlowType == "D" ? commercialRoutes.kol.path : commercialRoutes.kolQr.path,
  //   frwfana: cart.fsimFlowType == "D" ? commercialRoutes.frwfana.path : commercialRoutes.frwfanaQr.path,
  // }

  const handleContinue = () => {
    if (orderProcess.isSuccess) {
      // navigate(navQr[comp])
      navigate(`/${brand}/${bnrNext}`);
    } else {
      // navigate(navRegister[comp])
      navigate(`/${brand}/${bnrNext}`);
    }
  };

  const createOrderRequest = (
    travelDetails,
    estimation,
    promoDetails,
    planInfo,
    variation,
  ) => {
    let request = {
      orderType: "buy-esim",
      // memberId: estimation.memberId,
      promoCode: cart?.promoCode || "",
      cardId: 0,
      quantity: estimation.noOfDevices,
      startDate: travelDetails[0].startDate,
      endDate: travelDetails[travelDetails.length - 1].endDate,
      planCode: planInfo?.planCode,
      packageCode: variation?.packageCode,
      variationId: Number(variation?.variationId),
      // invoiceNo: '',
      shippingType: "self",
      locationCode: estimation?.countryCode,
      shippingCharges: 0,
      addressId: 0,
      travelingTo: [travelDetails?.[0]?.locationCode],
      travelDetails: travelDetails,
      supCharges: true,
      pgw: "crpc",
      language: "en",
      appUserId: user?.appUserId,
      userId: user?.userId,
      deviceType: "E",
    };

    if (["kol", "frwfana"].includes(comp) && cart.fsimFlowType == "D") {
      const adsLength = user?.address?.length || 1;
      request = {
        ...request,
        orderType: "rent",
        shippingType: "Domestic",
        startDate: userInfo?.startDate,
        endDate: dateExternal(userInfo?.startDate, 14), // userInfo?.endDate,
        locationCode: userInfo?.locationCode,
        travelingTo: [userInfo?.locationCode],
        travelDetails: [
          {
            startDate: userInfo?.startDate,
            endDate: dateExternal(userInfo?.startDate, 14), // userInfo?.endDate,
            locationCode: userInfo?.locationCode,
            travelLocation: userInfo?.travelLocation,
          },
        ],
        deviceType: "D",
        addressId: user?.address?.[adsLength - 1]?.id || 0,
      };
    }
    setRequest(request);

    // const costIntoDevice = ((estimation?.costToDisplayInSummary || 0) * estimation?.noOfDevices)

    // let request = {
    //   // "requestType": paymentCard.isCorporateCard ? 'rentDevice' : 'rentDevice3DS',
    //   requestType: estimation.requestType,
    //   travelDetails: travelDetails,
    //   planCode: planInfo?.planCode,
    //   packageCode: variation?.packageCode,
    //   variationId: variation?.variationId,
    //   countryCode: estimation.countryCode,
    //   userId: user?.userId,
    //   noOfDevices: estimation.noOfDevices,
    //   startDate: travelDetails[0].startDate,
    //   endDate: travelDetails[travelDetails.length - 1].endDate,
    //   travelingTo: travelDetails.map(value => value.locationCode),
    //   promoCode: cart?.promoCode,
    //   // memberId: estimation.memberId,
    //   // cardId: paymentCard?.cardId || 0,
    //   // "3dStripeToken": paymentCard?.sourceId || "",
    //   // stripeToken: paymentCard?.sourceId || "",
    //   cardId: 0,
    //   "3dStripeToken": "",
    //   stripeToken: "",
    //   total: costIntoDevice,//summary.totalPayable,
    //   totalCost: costIntoDevice, //summary.totalPayable,
    //   amount: costIntoDevice, //summary.totalPayable,
    //   charges: costIntoDevice,//summary.totalPayable,
    //   supCharges: true
    //   // isCorpC: isCorporateCard
    // }

    // request['delivery'] = {
    //   id: 0,
    //   shippingCharges: 0,
    //   shippingType: '',
    //   gst: 0
    // }
    // request['return'] = {
    //   id: 0,
    //   shippingCharges: 0,
    //   shippingType: '',
    //   gst: 0
    // }

    // let travelInfo = {
    //   planName: planInfo.planName,
    //   countriesWithDaysAndRate: travelDetails,
    //   countriesTotal: estimation.costToDisplayInSummary,
    //   noOfDevices: estimation.noOfDevices,
    //   promoDiscount: estimation.promoDiscount,
    //   uniquePromocountries: travelDetails,
    //   total: costIntoDevice,//summary.totalPayable,
    //   costCase: 'rent',
    //   minCharges: planInfo.minCharges
    // }
    // request.summary = {
    //   travelInfo,
    //   countriesWithDaysAndRateForSummary: travelDetails,
    //   currency: planInfo.currency,
    // }
    // console.log('request', request);
    // return request
  };

  const submitRequest = (request) => {
    // console.log('FINAL REQUEST', request);

    // setTimeout(() => {
    //   const res = {
    //     "result": true,
    //     "errorCode": "ORDER_SUCCESS",
    //     "message": "Order processed successfully",
    //     "orderId": "2179-79866717433532575",
    //     "data": null
    //   }
    //   dispatch(setCartData({ isCallFreeEsim: false }));
    //   setOrderId(res?.orderId)
    //   setProcess({
    //     // ...prev,
    //     isProcessing: false,
    //     isSuccess: true,
    //     title: res?.result
    //       ? t('orderSummary.orderConfirmed')
    //       : t('orderSummary.orderFailed'),
    //     alertType: res?.result ? 'success' : 'error',
    //     alertMessage: res?.message || t('orderSummary.somethingWrong'),
    //   });
    // }, 4000);

    ApiService.request(modulesURLPath.Order.placeOrder, request)
      .then((res) => {
        // console.log("Order response", { res })
        dispatch(setCartData({ isCallFreeEsim: false }));
        setOrderId(res?.orderId);
        setProcess({
          // ...prev,
          isProcessing: false,
          isSuccess: true,
          title: res?.result
            ? t("orderSummary.orderConfirmed")
            : t("orderSummary.orderFailed"),
          alertType: res?.result ? "success" : "error",
          alertMessage: res?.message || t("orderSummary.somethingWrong"),
        });
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        setProcess({
          // ...prev,
          isProcessing: false,
          isSuccess: false,
          title: t("orderSummary.orderFailed"),
          alertType: "error",
          alertMessage: t("orderSummary.somethingWrong"),
        });
        // setProcess((prev) => ({
        //   ...prev,
        //   isProcessing: false,
        //   isSuccess: true,
        //   title: t('orderSummary.orderFailed'),
        //   alertType: 'error',
        //   alertMessage: t('orderSummary.somethingWrong'),
        // }));
      });

    // apidispatcher(request, request.requestType)
    //   .then(res => {
    //     console.log('res', res);
    //     setProcess({
    //       ...orderProcess,
    //       isProcessing: false,
    //       isSuccess: true,
    //       title: res?.status?.result ? t("orderSummary.orderConfirmed") : t("orderSummary.orderFailed"),
    //       alertType: res?.status?.result ? 'success' : 'error',
    //       alertMessage: res?.status?.message || t("orderSummary.somethingWrong")
    //     })
    //   })
    //   .catch(error => {
    //     console.log('error', error);
    //     setProcess({
    //       ...orderProcess,
    //       isProcessing: false,
    //       isSuccess: true,
    //       title: t("orderSummary.orderFailed"),
    //       alertType: 'error',
    //       alertMessage: t("orderSummary.somethingWrong")
    //     })
    //   });
  };

  const ratesTravelDetails = (rates, travelDetails) => {
    const { planCountriesList, variation } = cart;
    let selectedCountriesList = [];
    let isRatesListValid = true;
    // console.log('inside ratesDetails', variation);

    travelDetails = travelDetails.map((countryObj, index) => {
      if (!selectedCountriesList.includes(countryObj.locationCode)) {
        selectedCountriesList.push(countryObj.locationCode);
      }
      let planCountry = planCountriesList.find((planCountry) => {
        // if (planInfo.planType?.toUpperCase() !== 'CN') {
        //     return planCountry.countryCode == countryObj.locationCode
        // }
        // MULTI_COUNTRY
        // Select rate based on variation from planCountriesList
        return (
          (planCountry.countryCode?.toLowerCase?.() ==
            countryObj.locationCode?.toLowerCase?.() ||
            planCountry.country?.toLowerCase?.() ==
              countryObj.travelLocation?.toLowerCase?.()) && //marketplace order doesn't have country code
          variation.variationId == planCountry.variationId
        );
      });
      // MULTI_COUNTRY
      // If variationId is not found, select first object of that country and use its rate
      // if first object has 0 rate should we use other object with some rate?
      if (!planCountry) {
        // find where countryCode matches and rate > 0
        planCountry = planCountriesList.find((planCountry) => {
          return (
            planCountry.countryCode == countryObj.locationCode &&
            planCountry.rate > 0
          );
        });
      }

      if (planCountry) {
        rates.push({
          countryCode: planCountry.countryCode,
          rate: planCountry.rate,
        });
      } else if (!planCountry) {
        isRatesListValid = false;
      }
      return {
        locationCode: countryObj.locationCode,
        countryCode: countryObj.locationCode,
        countryName: countryObj.travelLocation,
        startDate: countryObj.startDate,
        endDate: countryObj.endDate,
        rate: planCountry?.rate,
      };
    });

    return {
      rates,
      travelDetails,
      isRatesListValid,
    };
  };

  const getAllVariations = useDisApi({
    apiCall: "getPlanVariations",
    setCallBack: (res) => {
      setVariation(res?.plan?.[0]);
      dispatch(setCartData({ variation: res?.plan?.[0] }));
    },
  });

  useEffect(() => {
    // setProcess({ isProcessing: true });
    // const timer = setTimeout(() => {
    // console.log("processss", !(!process.isProcessing && !process.isSuccess));
    // console.log("processss", process.isProcessing || process.isSuccess);
    setProcess({
      // isProcessing: !(!process.isProcessing && !process.isSuccess),
      isProcessing: process.isProcessing || process.isSuccess,
      isSuccess: process.isSuccess,
      alertType: process.alertType,
      title: process.title,
      alertMessage: process.alertMessage,
    });
    // }, 3000);
    // return () => clearTimeout(timer);
  }, [process]);

  const getPaymentGateway = (params) => {
    const { appUserId, userId } = params;
    ApiService.request(modulesURLPath.Payment.getPgw, {
      appUserId: appUserId || "",
      userId: userId || "",
      data: encryptData({
        appUserId: appUserId,
        userId: userId,
      }),
    })
      .then((res) => {
        console.log("GET PGW response", { res });
        setPgw(res?.data?.pgw);
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
  };

  const getOrderCharges = (params) => {
    const {
      orderType,
      memberId,
      promoCode,
      quantity,
      startDate,
      endDate,
      planCode,
      packageCode,
      variationId,
      travelingTo,
      travelDetails,
      pgw,
    } = params;

    ApiService.request(modulesURLPath.charges.orderCharges, {
      orderType,
      memberId: memberId || "",
      promoCode: promoCode || "",
      quantity,
      startDate,
      endDate,
      planCode,
      packageCode,
      variationId: Number(variationId),
      travelingTo: travelingTo || [],
      travelDetails: travelDetails?.map((travel) => ({
        countryCode: travel.locationCode || travel.countryCode,
        countryName: travel.travelLocation || travel.countryName,
        startDate: travel.startDate,
        endDate: travel.endDate || travel.startDate,
      })),
      pgw,
    })
      .then((res) => {
        console.log("GET Order charges response", { res });
        dispatch(
          setCartData({
            cartType: "R",
            travelDetails: request.travelDetails,
            estimation: {
              requestType: request.requestType,
              planCode: request.planCode,
              planName: request.planName,
              estimatedCost: res?.data?.charges,
              costToDisplayInSummary: res?.data?.charges,
              noOfDevices: request.noOfDevices,
              countryCode: user?.originCountry || "SG",
            },
          }),
        );
        if (comp == "kol") {
          navigate(commercialRoutes.kolOrderSummary.path);
        } else {
          navigate(commercialRoutes.frwfanaOrderSummary.path);
        }
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
  };

  const getUser = useDisApi({
    apiCall: "getUser",
    setCallBack: (res) => {
      if (res?.user) {
        dispatch(setUserData(res?.user));
        setUser(res?.user);
        // getPaymentGateway({
        //   appUserId: user?.appUserId,
        //   userId: user?.userId,
        // });
      } else {
      }
    },
  });

  const esimActivation = useDisApi({
    apiCall: "activateEsim",
    setCallBack: (res) => {
      dispatch(setCartData({ esimDetails: res?.esims || [] }));
      // if (res?.user) {
      // } else {
      // }
    },
  });

  const getShippingRate = useDisApi({
    apiCall: "getShippingRate",
    setCallBack: (res) => {
      if (res?.status?.result) {
        const { shipping, currency } = res;
        dispatch(
          setCartData({ shippingCurrency: currency?.currencyCode || "" }),
        );
        dispatch(setCartData({ shipping: { ...shipping?.[0], rate: 1100 } }));
      }
    },
  });

  useEffect(() => {
    if (cart.isCallFreeEsim) {
      setProcess({ ...orderProcess, isProcessing: true });
      getUser({ userId: userInfo?.email });
      if (["kol", "frwfana"].includes(comp) && cart.fsimFlowType == "D") {
        getShippingRate({
          // userId: user?.userId,
          countryCode: "JP",
        });
      }
      if (comp == "astindo") {
        setVariation(cart.variation);
        setPlan(cart.package);
      } else {
        fetchLocalPlans(cart?.promoCode, travel?.[0]?.locationCode);
      }
    }
  }, []);

  useEffect(() => {
    if (comp !== "astindo") {
      if (cart.isCallFreeEsim && localPlans?.length) {
        const plan = localPlans?.[0];
        setPlan(plan);
        getAllVariations({ planCode: plan.planCode });
        if (["kol", "frwfana"].includes(comp) && cart.fsimFlowType == "D") {
          dispatch(setCartData({ package: plan }));
        }
      }
    }
  }, [localPlans]);

  useEffect(() => {
    // async inside useeffect
    (async () => {
      // if (comp !== "astindo") {
      if (cart.isCallFreeEsim && variat && user) {
        let flag = true,
          calculation = null;
        try {
          let planInfo = JSON.parse(JSON.stringify(plan));
          let variation = JSON.parse(JSON.stringify(variat));
          let travelDetails = JSON.parse(JSON.stringify(travel));
          let estimation = JSON.parse(JSON.stringify(estimat));
          estimation = {
            ...estimation,
            planCode: planInfo.planCode,
            planName: planInfo.planName,
          };

          let rates = [];

          if (planInfo.planType?.toUpperCase() == "CN") {
            const ratesDetails = ratesTravelDetails(rates, travelDetails);
            // console.log('ratesDetails', ratesDetails);

            if (!ratesDetails.isRatesListValid || !ratesDetails.rates.length) {
              return;
            } else {
              // console.log('rateAndDetails', ratesDetails);
              planInfo.rates = ratesDetails.rates;
              travelDetails = ratesDetails.travelDetails;
              // await setTravelDetails(travelDetails)
            }
          } else {
            travelDetails.map((travel) => {
              if (
                !rates.find((rat) => rat.countryCode === travel.locationCode)
              ) {
                rates.push({
                  countryCode: travel.locationCode,
                  rate: travel.rate,
                });
              }
            });
            planInfo.rates = rates;
          }
          // console.log("RATES", rates)
          calculation = await handleSimCalculator(
            travelDetails,
            estimation,
            cart.promoDetails,
            planInfo,
            variation,
          );
          console.log("CALCULATION", calculation);
          if (calculation?.isMulti) {
            if (calculation?.estimatedCost === -1) {
              flag = false;
            }
          }
          let countriesArray = JSON.parse(
            JSON.stringify(calculation.countriesWithDaysAndRate),
          );
          let array = [],
            cost = 0.0;
          if (flag) {
            travelDetails.map((travel) => {
              let ind = countriesArray.findIndex(
                (cou) => cou.locationCode === travel.locationCode,
              );
              if (ind !== -1) {
                let obj = countriesArray[ind];
                obj.costRD = cost + obj?.rate;
                array.push(Object.assign({}, travel, obj));
                countriesArray.splice(ind, 1);
              }
            });
            travelDetails = array;
            estimation = {
              ...estimation,
              estimatedCost: calculation.estimatedCost,
              costToDisplayInSummary: calculation.costToDisplayInSummary,
              minCharges: calculation.minCharges,
            };
            createOrderRequest(
              travelDetails,
              estimation,
              cart.promoDetails,
              planInfo,
              variation,
            );
          } else {
            // setProcess({ ...orderProcess, isProcessing: false })
          }
        } catch (e) {
          console.log("error", e);
        }
      }
      // }
    })();
  }, [variat, user]);

  useEffect(() => {
    if (cart.isCallFreeEsim && request) {
      if (["kol", "frwfana"].includes(comp) && cart.fsimFlowType == "D") {
        if (user?.userId) {
          getPaymentGateway({
            appUserId: user?.appUserId,
            userId: user?.userId,
          });
        }
      } else {
        submitRequest(request);
      }
    }
  }, [request]);

  useEffect(() => {
    if (cart.isCallFreeEsim && pgw) {
      getOrderCharges({
        ...request,
        pgw: pgw,
        // orderType: SERVICE_TYPE_REQUESTS_MAPPING[cart.cartType].requestType,
        // memberId: user?.memberId || "",
        // promoCode: cart?.promoCode || "",
        // quantity: cart.quantity,
        // startDate: cart.travelDetails[0].startDate,
        // endDate:
        //   cart.travelDetails[0].endDate || cart.travelDetails[0].startDate,
        // planCode: cart.package.planCode,
        // packageCode: cart.variation.packageCode,
        // variationId: Number(cart.variation.variationId),
        // travelingTo: travelCountryCodesList,
        // travelDetails: cart.travelDetails,
        // pgw: pgw,
      });
    }
  }, [pgw]);

  // useEffect(() => {
  //   if (cart.isCallFreeEsim && (comp == "kol" && cart.fsimFlowType == "D")) {
  //     if (user?.userId) {
  //       getPaymentGateway({
  //         appUserId: user?.appUserId,
  //         userId: user?.userId,
  //       });
  //     }
  //   }
  // }, [user?.userId]);

  useEffect(() => {
    if (orderId) {
      if (!["kol", "frwfana"].includes(comp) || cart.fsimFlowType == "E") {
        esimActivation({
          requestType: "activateEsim",
          orderId: orderId,
          userId: user?.userId,
          appUserId: user?.appUserId,
        });
      }
      // const esims = [{
      //   "smdp": "rsp-eu.simlessly.com",
      //   "planName": "Complimentary eSIM 3GB 15 Days",
      //   "qrCode": "9000025081254830.png",
      //   "iccid": "9000025081254830",
      //   "activationCode": "32CC8D926C0EB7E67A9BB149735C2254"
      // }]
      // dispatch(setCartData({ esimDetails: esims }));
      // navigate(nav[comp])
    }
  }, [orderId]);

  return (
    <div
      className="w-[calc(100vw-32px)] max-w-[540px] min-h-[286px] sm:min-h-[438px] 
      rounded-2xl shadow-xl border border-gray-100 
      bg-gradient-to-b from-white to-gray-50
      flex flex-col items-center justify-center 
      p-8 md:p-12 gap-8 mx-auto m-10 transition-all duration-300 ease-in-out"
    >
      {orderProcess.isProcessing ? (
        <div className="flex flex-col gap-6 items-center justify-center flex-1 min-h-[200px] animate-fadeIn">
          <div className="p-4 bg-main-500 rounded-full shadow-lg">
            <Loader type="Oval" color="white" height={"18vw"} width={"18vw"}
             className="max-h-[100px] max-w-[100px] min-h-[60px] min-w-[60px]"/>
          </div>
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {t("process.orderProcessing", "Order Processing")}
            </h2>
            <p className="text-gray-600">
              {t(
                "process.processMessage",
                "Please wait while we process your request.",
              )}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 items-center animate-fadeIn">
          <div className="p-4 rounded-full shadow-lg bg-gray-100 transform scale-110 transition-transform">
            {orderProcess.alertType === "success" ? (
              <SuccessIcon className="w-24 h-24 text-green-500" />
            ) : (
              <ErrorIcon className="w-24 h-24 text-red-500" />
            )}
          </div>
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {orderProcess.title}
            </h2>
            <p className="text-gray-600">{orderProcess.alertMessage}</p>
          </div>
          <button
            onClick={handleContinue}
            className={`px-10 py-4 rounded-xl font-medium shadow-md transition-all duration-300 
              ${
                orderProcess.alertType === "success"
                  ? "bg-green-500 hover:bg-green-600 hover:shadow-green-200"
                  : "bg-red-500 hover:bg-red-600 hover:shadow-red-200"
              } text-white`}
          >
            {/* {t("FsimRegister.activateEsim", "Activate Esim")} */}
            {t("orderSummary.continue", "Continue")}
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
