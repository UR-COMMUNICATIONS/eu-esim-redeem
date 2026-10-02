// createPlanSummaryComponent.js - Factory for all plan summary pages
import Loader from "@/components/shared/Loader";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  SERVICE_TYPE_REQUESTS_MAPPING,
  SUBSCIPTION_PLANS_List,
} from "@/constants/planTypes";
import { modulesURLPath } from "@/constants/urls";
import { countries } from "@/general/Arrays";
import ApiService from "@/general/apiClient";
import {
  interceptChargesResponse,
  registerChargesRequest,
} from "@/general/chargesIntegrity";
import { encryptData } from "@/general/encryption";
import useModal from "@/hooks/useModal";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { formatDate } from "@/lib/utils";
import { ErrorIcon, SuccessIcon } from "@/services";
import { setSavedPath } from "@/store/module/auth/slice";
import { setCartData } from "@/store/module/cart/cartSlice";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * @typedef {Object} PlanSummaryConfig
 * @property {"sim"|"pocketWifi"|"router"} type
 * @property {React.ComponentType<any>} FooterComponent
 * @property {() => { cartService: string, shippingOption: string, orderSummary: string }} getRoutes
 * @property {boolean} [showCountryTranslation] - Show translated country names
 * @property {boolean} [useSimplifiedLayout] - Use simpler layout for SIM
 */

// API Functions (shared across all plan summaries)
const getPaymentGateway = async (params) => {
  const { appUserId, userId } = params;

  return await ApiService.request(modulesURLPath.Payment.getPgw, {
    appUserId: appUserId || "",
    userId: userId || "",
    data: encryptData({
      appUserId: appUserId,
      userId: userId,
    }),
  });
};

const getOrderCharges = async (params) => {
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
    userId,
    appUserId,
    requestId,
  } = params;

  return await ApiService.request(modulesURLPath.charges.orderCharges, {
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
    travelDetails: travelDetails.map((travel) => ({
      countryCode: travel.locationCode || travel.countryCode,
      countryName: travel.travelLocation || travel.countryName,
      startDate: travel.startDate,
      endDate: travel.endDate || travel.startDate,
    })),
    pgw,
    userId,
    appUserId,
    requestId,
  });
};

const getPlanCharges = async (params) => {
  const {
    memberId,
    promoCode,
    startDate,
    endDate,
    planCode,
    packageCode,
    variationId,
    travelingTo,
    travelDetails,
    pgw,
    deviceId,
    deviceType,
    orderId,
    supCharges,
    userId,
    appUserId,
    requestId,
  } = params;

  return await ApiService.request(modulesURLPath.charges.plancharges, {
    orderId: orderId || "",
    deviceId: deviceId || "",
    deviceType: deviceType || "D",
    planCode,
    packageCode,
    variationId: Number(variationId),
    startDate,
    endDate,
    travelingTo: travelingTo || [],
    travelDetails: travelDetails.map((travel) => ({
      countryCode: travel.locationCode || travel.countryCode,
      countryName: travel.travelLocation || travel.countryName,
      startDate: travel.startDate,
      endDate: travel.endDate || travel.startDate,
    })),
    supCharges: supCharges || false,
    pgw,
    memberId: memberId || "",
    promoCode: promoCode || "",
    userId,
    appUserId,
    requestId,
  });
};

// Factory function to create plan summary component
function createPlanSummaryComponent(config) {
  return function PlanSummary() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentLanguage } = useUserLocationLanguage();
    const { user } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);
    const { localPlans } = useSelector((state) => state.plan);

    const [process, setProcess] = useState({
      title: "",
      alertMessage: "",
      alertType: "",
      isProcessing: false,
      isOpen: false,
      isSuccess: true,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [paymentGateway, setPaymentGateway] = useState(null);

    const { t } = useTranslation();
    const { setIsAuthDialogOpen } = useModal();

    const isTopUpFlow = cart?.cartType === "T";
    const isSimEsim = ["S", "E"].includes(
      cart?.package?.deviceType?.toUpperCase(),
    );
    const showEndDate = !SUBSCIPTION_PLANS_List.includes(
      cart?.package?.planType?.toUpperCase(),
    );

    // Get routes using the getter function
    const routes = config.getRoutes();

    const handleShowError = (message) => {
      setProcess({
        ...process,
        isOpen: true,
        isProcessing: false,
        alertType: "error",
        alertMessage: message || t("process.somethingWrong"),
      });
    };

    const handleContinue = () => {
      setProcess({
        ...process,
        isProcessing: false,
        isOpen: false,
        title: "",
        alertType: "",
        alertMessage: "",
      });
      navigate(routes.cartService);
    };

    const handleDisable = () => {
      return process.isOpen || isLoading;
    };

    const handlePrev = () => {
      // Clear device and cart type for SIM on back
      if (config.type === "sim") {
        dispatch(
          setCartData({
            device: null,
            cartType: null,
          }),
        );
      }
      navigate(routes.cartService);
    };

    const handleNext = () => {
      if (!user?.userId) {
        dispatch(setSavedPath(routes.orderSummary));
        setIsAuthDialogOpen(true);
        return;
      }

      // Guard: if a promo is active, ensure the selected plan belongs to the
      // promo-filtered list. A page re-mount can silently swap cart.package to
      // a plan that is not linked to the promo code, which causes the API to
      // reject the order. Block navigation and tell the user to re-select.
      if (cart?.promoCode && localPlans?.length) {
        const planStillValid = localPlans.some(
          (p) => p.planCode === cart?.package?.planCode,
        );
        if (!planStillValid) {
          setProcess({
            isOpen: true,
            isProcessing: false,
            isSuccess: false,
            alertType: "error",
            title: t("process.error"),
            alertMessage: t(
              "process.promoPlanMismatch",
              "The selected plan is not available with your promo code. Please go back and re-select a plan.",
            ),
          });
          return;
        }
      }

      const requestType =
        SERVICE_TYPE_REQUESTS_MAPPING[cart?.cartType]?.requestType;

      if (["buy-esim", "add-plan"].includes(requestType)) {
        // eSIM and TopUp - no shipping needed
        dispatch(
          setCartData({
            shipping: null,
            shippingAddress: null,
            pickupLocation: null,
            delivery: null,
          }),
        );
        navigate(routes.orderSummary);
      } else if (
        ["rent-device", "buy-device", "buy-sim", "buy", "rent"].includes(
          requestType,
        )
      ) {
        // Physical SIM, Router/PocketWifi buy/rent - go to shipping
        dispatch(setSavedPath(routes.shippingOption));
        navigate(routes.shippingOption);
      } else {
        // TopUp flow - skip shipping
        navigate(routes.orderSummary);
      }
    };

    const fetchPaymentGateway = async () => {
      try {
        const response = await getPaymentGateway({
          appUserId: user?.appUserId,
          userId: user?.userId,
        });

        console.log("Payment Gateway response", { response });

        if (response.result) {
          return response.data.pgw;
        } else {
          handleShowError(response.status?.message || response.message);
          return null;
        }
      } catch (error) {
        console.error("Error fetching payment gateway:", error);
        handleShowError(error.message);
        return null;
      }
    };

    const fetchOrderCharges = async (pgw) => {
      try {
        setIsLoading(true);

        const travelCountryCodesList = cart.travelDetails.map(
          (travel) => travel.locationCode || travel.countryCode,
        );

        const requestId = String(Date.now());
        const chargesRequest = {
          variationId: Number(cart.variation.variationId),
          startDate: cart.travelDetails[0].startDate,
          endDate:
            cart.travelDetails[0].endDate || cart.travelDetails[0].startDate,
          quantity: cart.quantity || 1,
        };
        registerChargesRequest(requestId, chargesRequest);
        let response;

        if (isTopUpFlow && cart.device?.device_id) {
          // TopUp flow - use getPlanCharges
          response = await getPlanCharges({
            memberId: cart?.promoDetails?.memberId || "",
            promoCode: cart?.promoCode || "",
            startDate: chargesRequest.startDate,
            endDate: chargesRequest.endDate,
            planCode: cart.package.planCode,
            packageCode: cart.variation.packageCode,
            variationId: chargesRequest.variationId,
            travelingTo: travelCountryCodesList,
            travelDetails: cart.travelDetails,
            pgw: pgw,
            deviceId: cart.device.device_id || cart.device.iccid,
            deviceType: isSimEsim ? cart.device.device_type : "D",
            orderId: cart.device.order_id,
            supCharges: user?.supCharges || false,
            userId: user?.userId,
            appUserId: user?.appUserId,
            requestId,
          });
        } else {
          // Buy/Rent flow - use getOrderCharges
          response = await getOrderCharges({
            orderType:
              SERVICE_TYPE_REQUESTS_MAPPING[cart?.cartType]?.requestType,
            memberId: cart?.promoDetails?.memberId || "",
            promoCode: cart?.promoCode || "",
            quantity: chargesRequest.quantity,
            startDate: chargesRequest.startDate,
            endDate: chargesRequest.endDate,
            planCode: cart.package.planCode,
            packageCode: cart.variation.packageCode,
            variationId: chargesRequest.variationId,
            travelingTo: travelCountryCodesList,
            travelDetails: cart.travelDetails,
            pgw: pgw,
            userId: user?.userId,
            appUserId: user?.appUserId,
            requestId,
          });
        }

        console.log("Charges API response:", response);

        const { verified, integrityError } = interceptChargesResponse(
          response,
          requestId,
        );
        if (!verified) {
          console.error("Charges integrity check failed:", integrityError);
          handleShowError(
            "Order charges could not be verified. Please try again.",
          );
          setIsLoading(false);
          return;
        }

        if (response.result) {
          const chargesData = response.charges;
          const totalAmount = chargesData?.charges || 0;

          console.log("Total charges from API:", totalAmount);

          // Map the response charges to travel details
          const updatedTravelDetails = chargesData?.countryDetail
            ? chargesData.countryDetail.map((countryDetail) => {
                const matchingTravel = cart.travelDetails.find(
                  (t) =>
                    (t.locationCode || t.countryCode) ===
                    countryDetail.countryCode,
                );
                return {
                  ...matchingTravel,
                  ...countryDetail,
                  travelLocation:
                    matchingTravel?.travelLocation || countryDetail.countryName,
                  charges: countryDetail.charges,
                };
              })
            : cart.travelDetails;

          // Calculate proper estimation based on type
          const estimationBase = {
            requestType: isTopUpFlow
              ? "add-plan"
              : SERVICE_TYPE_REQUESTS_MAPPING[cart?.cartType]?.requestType,
            planCode: cart.package.planCode,
            planName: cart.package.planName,
            estimatedCost: totalAmount,
            costToDisplayInSummary: totalAmount,
            noOfDevices: cart.quantity,
            countryCode: user?.originCountry || "SG",
            promoApplied: Boolean(cart?.promoDetails?.promoCode),
            promoCode: cart?.promoDetails?.promoCode || "",
            promoDiscount: chargesData?.promoDiscount || 0,
            memberId: cart?.promoDetails?.memberId || "",
            minCharges: cart.package.minCharges || 0,
            deposit: cart.package.deposit || 0,
          };

          // For SIM, adjust the cost calculation
          if (config.type === "sim") {
            estimationBase.totalCost = totalAmount;
            estimationBase.costToDisplayInSummary =
              totalAmount / (cart.quantity || 1);
          }

          dispatch(
            setCartData({
              travelDetails: updatedTravelDetails,
              estimation: estimationBase,
            }),
          );
        } else {
          console.error("Failed to get order charges:", response?.message);
          handleShowError(
            response.status?.message ||
              response.message ||
              t("process.somethingWrong"),
          );
        }
      } catch (error) {
        console.error("Error getting order charges:", error);
        handleShowError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      const initializeData = async () => {
        setIsLoading(true);

        // First, fetch payment gateway
        const pgw = await fetchPaymentGateway();
        if (!pgw) {
          setIsLoading(false);
          return;
        }

        setPaymentGateway(pgw);

        // Then fetch order charges
        await fetchOrderCharges(pgw);
      };

      if (user?.userId && cart.variation?.variationId) {
        initializeData();
      }
    }, [cart.variation?.variationId]);

    // Handle translated plan attributes
    let planAttbs = {
      planName: cart.package?.planName,
      nameAttributes: cart.package?.nameAttributes,
      description: cart.package?.description,
    };

    if (cart.userLanguage !== "en") {
      planAttbs = {
        planName: cart.package?.trPlanName || cart.package?.planName,
        nameAttributes:
          cart.package?.trNameAttributes || cart.package?.nameAttributes,
        description: cart.package?.trDescription || cart.package?.description,
      };
    }

    const { FooterComponent } = config;

    if (isLoading) {
      return (
        <div className="w-full flex items-center justify-center min-h-[400px]">
          <Loader
            type="Oval"
            color="#dc3545"
            height={"18vw"}
            width={"18vw"}
            className="max-h-[100px] max-w-[100px] min-h-[60px] min-w-[60px]"
          />
        </div>
      );
    }

    // Simplified layout for SIM
    if (config.useSimplifiedLayout) {
      return (
        <div className="w-full">
          <div className="w-full py-6 px-4 sm:p-8 md:p-10 bg-neutral-100 rounded-2xl">
            <h4 className="text-black-900 text-2xl font-bold mb-6">
              {t("extraText.planSummary")}
            </h4>

            {/* Plan Name */}
            <div className="mb-6">
              <h5 className="text-lg font-semibold text-black-900 mb-4">
                {planAttbs.planName}
              </h5>
            </div>

            {/* Travel Details */}
            <div className="divide-y divide-neutral-300">
              {cart.travelDetails?.map((travel, index) => (
                <div key={index} className="py-4 first:pt-0">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-base text-black-700">
                      {t("extraText.orderDate")}:
                    </span>
                    <span className="text-base text-black-700">
                      {travel.startDate}
                    </span>
                  </div>
                  {cart.package?.planType?.toUpperCase() === "CN" &&
                    travel.charges && (
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-base text-black-700">
                          {t("extraText.amount")}:
                        </span>
                        <span className="text-base text-black-700">
                          {cart.package.currency} {travel.charges.toFixed(2)}
                        </span>
                      </div>
                    )}
                </div>
              ))}
            </div>

            {/* Plan Summary */}
            <div className="divide-y divide-neutral-300 mb-6">
              <div className="flex items-center justify-between gap-3 py-3">
                <span className="text-base text-black-700">
                  {t("extraText.chosenPlan")}
                </span>
                <span className="text-base text-black-700">
                  {planAttbs.planName}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 py-3">
                <span className="text-base text-black-700">
                  {t("extraText.dataAvailable")}
                </span>
                <span className="text-base text-black-700 uppercase">
                  {cart.variation?.dataSize} {cart.variation?.desc}
                </span>
              </div>
              {!isTopUpFlow && (
                <div className="flex items-center justify-between gap-3 py-3">
                  <span className="text-base text-black-700">
                    {t("extraText.quantity")}
                  </span>
                  <span className="text-base text-black-700">
                    {cart.quantity}
                  </span>
                </div>
              )}
            </div>

            {/* Total Amount */}
            {cart.estimation?.estimatedCost !== null &&
            cart.estimation?.estimatedCost > 0 ? (
              <div className="flex items-center justify-between gap-3 pt-5 border-t border-neutral-300">
                <span className="text-lg text-black-900 font-semibold">
                  {t("extraText.totalAmount")}
                </span>
                <span className="text-lg text-black-900 font-semibold">
                  {cart.package?.currency}{" "}
                  {cart.estimation?.totalCost?.toFixed(2) ||
                    cart.estimation?.estimatedCost?.toFixed(2) ||
                    "0.00"}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3 pt-5 border-t border-neutral-300">
                <span className="text-base text-black-700">
                  {t("extraText.calculatingCharges") ||
                    "Calculating charges..."}
                </span>
              </div>
            )}
          </div>

          <FooterComponent
            prevHandler={handlePrev}
            nextHandler={handleNext}
            disableHandler={handleDisable}
          />
        </div>
      );
    }

    // Standard layout for PocketWifi and Router
    return (
      <div className="w-full">
        <div className="w-full py-6 px-4 sm:p-8 md:p-10 bg-neutral-100 rounded-2xl">
          <h4 className="text-black-900 text-2xl font-bold mb-6">
            {t("extraText.planSummary")}
          </h4>

          {/* Chosen Plan */}
          <div className="flex flex-col gap-4 pb-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-base sm:text-lg text-black-700">
                {t("extraText.chosenPlan")}
              </span>
              <span
                className="text-base sm:text-lg text-black-700 text-right"
                style={{ whiteSpace: "pre-line" }}
              >
                {planAttbs.planName}
              </span>
            </div>

            {/* Travel Details */}
            {cart.travelDetails?.map((travel, index) => {
              let translatedCountry = null;
              if (config.showCountryTranslation) {
                translatedCountry = countries.find(
                  (cou) =>
                    cou.countryCode ===
                    (travel.locationCode || travel.countryCode),
                );
              }

              return (
                <div
                  key={(travel.locationCode || travel.countryCode) + index}
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-base sm:text-lg text-black-700">
                      {t("extraText.country")}
                    </span>
                    <span className="text-base sm:text-lg text-black-700 text-right">
                      {config.showCountryTranslation &&
                      translatedCountry?.translations?.[cart?.userLanguage]
                        ? translatedCountry.translations[cart.userLanguage]
                        : travel.travelLocation}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-base sm:text-lg text-black-700">
                      {t("extraText.startDate")}
                    </span>
                    <span className="text-base sm:text-lg text-black-700">
                      {formatDate(travel.startDate, currentLanguage)}
                    </span>
                  </div>
                  {showEndDate && travel.endDate && (
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-base sm:text-lg text-black-700">
                        {t("extraText.endDate")}
                      </span>
                      <span className="text-base sm:text-lg text-black-700">
                        {formatDate(travel.endDate, currentLanguage)}
                      </span>
                    </div>
                  )}
                  {cart?.package?.planType?.toUpperCase() === "CN" &&
                    travel.charges && (
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-base sm:text-lg text-black-700">
                          {t("extraText.amount")}
                        </span>
                        <span className="text-base sm:text-lg text-black-700">
                          {`${cart?.package?.currency} ${
                            travel.charges?.toFixed(2) || "0.00"
                          }`}
                        </span>
                      </div>
                    )}
                </div>
              );
            })}

            {/* Data Available */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-base sm:text-lg text-black-700">
                {t("extraText.dataAvailable")}
              </span>
              <span className="text-base sm:text-lg text-black-700">
                {cart?.variation?.dataSize + " " + cart?.variation?.desc}
              </span>
            </div>

            {/* Quantity - Only show for Buy/Rent, not TopUp */}
            {!isTopUpFlow && (
              <div className="flex items-center justify-between gap-3">
                <span className="text-base sm:text-lg text-black-700">
                  {t("extraText.quantity")}
                </span>
                <span className="text-base sm:text-lg text-black-700">
                  {cart?.quantity}
                </span>
              </div>
            )}
          </div>

          {/* Total Amount */}
          <div className="flex items-center justify-between gap-3 pt-5 border-t border-neutral-300">
            <span className="text-lg text-black-900 font-semibold">
              {t("extraText.totalAmount")}
            </span>
            <span className="text-lg text-black-900 font-semibold">
              {cart?.package?.currency}{" "}
              {cart?.estimation?.estimatedCost?.toFixed(2) || "0.00"}
            </span>
          </div>
        </div>

        <FooterComponent
          prevHandler={handlePrev}
          nextHandler={handleNext}
          disableHandler={handleDisable}
        />

        {/* Error Dialog */}
        <Dialog open={process.isOpen} onOpenChange={handleContinue}>
          <DialogContent
            showCloseIcon={true}
            className="w-[calc(100vw-32px)] max-w-[540px] h-auto min-h-[286px] sm:min-h-[438px] rounded-xl md:rounded-3xl flex flex_center flex-col px-4 md:px-8 lg:px-[60px] pt-10 md:pt-[60px] pb-6 md:pb-[60px] gap-6 md:gap-12 bg-main-50"
          >
            {isLoading ? (
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
                />
                <div className="text-center flex flex-col gap-3 sm:gap-4">
                  <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-700">
                    {t("process.processRates")}
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
      </div>
    );
  };
}

export { createPlanSummaryComponent };
