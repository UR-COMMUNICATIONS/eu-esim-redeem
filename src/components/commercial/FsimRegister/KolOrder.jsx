import { useEffect, useRef, useState } from "react";
import useLocalPlan from "@/hooks/useLocalPlan";
import { useDispatch, useSelector } from "react-redux";
import { useDisApi } from "@/general";
import { SuccessIcon, ErrorIcon, brandRoutes } from "@/services";
import { setCartData } from "@/store/module/cart/cartSlice";
import { setUserData } from "@/store/module/auth/slice";
import Loader from "@/components/shared/Loader";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { fsimConfig } from "../FsimPartners/fsimConfig";

const KolOrder = ({
  onCreateRequest,
  comp,
  parentProcess,
  onSuccess,
  onFailure,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { fetchLocalPlans, process } = useLocalPlan();
  const { userInfo, user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { package: planInfo, variation } = cart;

  // `??`, not `||`: a campaign that opts out sets this to false, and `||`
  // would fall straight through to the default's `true` and call it anyway.
  const isCallLocalPlans =
    fsimConfig[comp]?.isCallLocalPlans ??
    fsimConfig["default"].isCallLocalPlans;

  const [orderProcess, setProcess] = useState({
    title: "",
    alertMessage: "",
    alertType: "",
    isProcessing: true,
    isSuccess: false,
  });
  // getUser, the plan-resolving chain, and the order-placement screen all
  // write to orderProcess independently and in parallel — without this, a
  // later unrelated update (e.g. the plan chain still mid-flight) silently
  // overwrites an error one of them already set, reviving the spinner.
  const hardErrorRef = useRef(false);

  const handleContinue = () => {
    if (onSuccess && orderProcess.isSuccess) {
      onSuccess();
    } else if (orderProcess.isSuccess && cart.fsimFlowType === "E") {
      navigate(`/${comp}/${brandRoutes.brandQr.path}`);
    } else if (onFailure) {
      // Let the caller decide where a failed order goes, instead of always
      // bouncing to the brand's home page.
      onFailure(orderProcess.alertMessage);
    } else {
      navigate(`/${comp}`);
      // navigate(`/${comp}/${brandRoutes.brandRegister.path}`);
    }
  };

  const getUser = useDisApi({
    apiCall: "getUser",
    setCallBack: (res) => {
      if (res?.user) {
        dispatch(setUserData(res?.user));
      } else {
        // Without this, a failed lookup here left the trio-wait below stuck
        // forever: user never populates, onCreateRequest never fires, and the
        // spinner had nothing telling it to stop.
        hardErrorRef.current = true;
        setProcess({
          isProcessing: false,
          isSuccess: false,
          alertType: "error",
          title: t("process.error", "Error"),
          alertMessage:
            res?.status?.message ||
            t(
              "orderSummary.somethingWrong",
              "Something went wrong. Please try again.",
            ),
        });
      }
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
    if (!cart.isCallFreeEsim) {
      navigate(`/${comp}`);
      return;
    }
    getUser({ userId: userInfo?.email });
    if (isCallLocalPlans) {
      getShippingRate({ countryCode: "JP" });
      fetchLocalPlans(cart?.promoCode || "   ", userInfo?.locationCode, true);
    }
    dispatch(setCartData({ isCallFreeEsim: false }));
  }, []);

  useEffect(() => {
    if (planInfo?.planCode && variation?.variationId && user?.userId) {
      onCreateRequest(planInfo, variation, user);
    }
  }, [planInfo, variation, user]);

  useEffect(() => {
    if (hardErrorRef.current) return;
    setProcess({
      isProcessing: process.isProcessing || process.isSuccess,
      isSuccess: process.isSuccess,
      alertType: process.alertType,
      title: process.title,
      alertMessage: process.alertMessage,
    });
  }, [process]);

  useEffect(() => {
    if (hardErrorRef.current) return;
    if (parentProcess) {
      setProcess({
        isProcessing: parentProcess.isProcessing,
        isSuccess: parentProcess.isSuccess,
        alertType: parentProcess.alertType,
        title: parentProcess.title,
        alertMessage: parentProcess.alertMessage,
      });
    }
  }, [parentProcess]);

  // console.log("orderProcess", orderProcess);

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
            <div className="flex justify-center items-center w-full h-full">
              <Loader
                type="Oval"
                color="white"
                height={"18vw"}
                width={"18vw"}
                className="max-h-[80px] max-w-[80px] min-h-[60px] min-w-[60px]"
                wrapperStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </div>
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

export default KolOrder;
