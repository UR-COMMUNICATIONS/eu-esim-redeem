import CartPaymentCard from "@/components/shared/cards/CartPaymentCard";
import ProductGallery from "@/components/shared/others/ProductGallery";
import Loader from "@/components/shared/Loader";
import OrderSingleItem from "@/components/shared/others/OrderSingleItem";
import PaymentComponent from "@/components/shared/others/PaymentComponent";
import PaymentIframe from "@/components/shared/others/PaymentIframe";
import UserPaymentForm from "@/components/shared/others/UserPaymentForm";
import SupportedPaymentMethods from "@/components/shared/others/SupportedPaymentMethods";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import ApiService from "@/general/apiClient";
import { useDisApi } from "@/general";
import { modulesURLPath } from "@/constants/urls";
import { SERVICE_TYPE_REQUESTS_MAPPING } from "@/constants/planTypes";
import { setCartData } from "@/store/module/cart/cartSlice";
import {
  clearInvalidSession,
  saveAuthData,
  setUserData,
} from "@/store/module/auth/slice";
import { useOrderLogic } from "@/hooks/useOrderLogic";
import { ErrorIcon, PlusIcon, SuccessIcon } from "@/services";
import { useEffect, useState } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const formatDataSize = (dataSize, desc) =>
  Number(dataSize) >= 9999
    ? "True Unlimited"
    : `${dataSize}${desc?.trim() ? " " + desc.trim() : ""}`;

const ORDER_TYPE_TO_CART_TYPE = {
  buy: "B",
  rent: "R",
  addPlan: "T",
  "buy-sim": "S",
  "buy-esim": "E",
};

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function PaymentLinkOrderSummary() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { user: loggedInUser, auth } = useSelector((state) => state.auth);

  // loading | confirm | otp | verifying | ready | error
  const [loadingState, setLoadingState] = useState("loading");
  const [showForm, setShowForm] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  // ─── OTP login so getUser (and every later request) has a bearer token ────
  const verifyLoginOtp = useDisApi({
    apiCall: "verifyAndLogin",
    setCallBack: (res) => {
      if (!res?.status?.result || !res?.token) {
        setLoadingState("otp");
        setOtpError(res?.status?.message || "Invalid or expired code.");
        return;
      }
      dispatch(saveAuthData({ token: res.token }));
      setLoadingState("loading");
      loadOrderContent(pendingOrder);
    },
  });

  const sendLoginOtp = useDisApi({
    apiCall: "authenticateForLogin",
    setCallBack: (res) => {
      if (res?.status?.result) {
        setLoadingState("otp");
        setOtpError("");
      } else {
        setLoadingState("error");
      }
    },
  });

  const handleOtpVerify = (e) => {
    e?.preventDefault?.();
    if (otp.length !== 6 || !pendingOrder) return;
    setOtpError("");
    setLoadingState("verifying");
    verifyLoginOtp({ userId: pendingOrder.userId, passCode: otp });
  };

  const handleResendOtp = () => {
    if (!pendingOrder) return;
    setOtp("");
    setOtpError("");
    sendLoginOtp({ userId: pendingOrder.userId });
  };

  const handleSendOtpClick = () => {
    if (!pendingOrder) return;
    setOtpError("");
    sendLoginOtp({ userId: pendingOrder.userId });
  };

  const getLocalPlans = useDisApi({
    apiCall: "localPlans",
    setCallBack: (res, params) => {
      if (Array.isArray(res?.plans)) {
        // Only use the result if we get an exact planCode match — never fall back
        // to res.plans[0] which would corrupt cart.package with a wrong plan.
        const matched = res.plans.find((p) => p.planCode === params.planCode);
        if (matched) {
          dispatch(
            setCartData({ package: matched, deposit: res.deposit || 0 }),
          );
        }
      }
    },
  });

  const getPlanCountriesList = useDisApi({
    apiCall: "planCountriesList",
    setCallBack: (res, params) => {
      const firstCountry = res?.countries?.[0]?.countryCode;
      if (firstCountry) {
        getLocalPlans({
          origin: params.originCountry || "SG",
          travelingTo: [firstCountry],
          planCode: params.planCode,
          promoCode: params.promoCode,
        });
      }
    },
  });

  const getPlanVariations = useDisApi({
    apiCall: "getPlanVariations",
    setCallBack: (res, params) => {
      if (Array.isArray(res?.plan)) {
        const matched =
          res.plan.find(
            (v) => String(v.variationId) === String(params.variationId),
          ) || res.plan[0];
        dispatch(setCartData({ variation: matched, planVariations: res.plan }));
      }
    },
  });

  // Runs after OTP login succeeds and we hold a bearer token — identical to
  // the pre-token flow otherwise (getUser now just needs Authorization set).
  const loadOrderContent = async (order) => {
    try {
      // ─── 3. Log the user in now that we hold a bearer token ─────────────────
      let userOriginCountry = "SG";
      let userCurrency = null;
      try {
        const userResp = await ApiService.request(
          "https://coreapi.yoowifi.com/jane2/api/apidispatcher",
          {
            requestType: "getUser",
            userId: order.userId,
            source: order.source || "urwifi",
            platform: "web",
          },
        );

        const userData = userResp?.user
          ? {
              userId: order.userId,
              appUserId: order.appUserId,
              ...userResp.user,
            }
          : { userId: order.userId, appUserId: order.appUserId };
        dispatch(setUserData(userData));
        userOriginCountry =
          userResp?.user?.originCountry ||
          userResp?.user?.addressCountry ||
          "SG";
        userCurrency = userResp?.user?.currency || null;
      } catch (_) {
        dispatch(
          setUserData({ userId: order.userId, appUserId: order.appUserId }),
        );
      }

      // ─── 3. Populate cart state from order data ─────────────────────────────
      dispatch(
        setCartData({
          estimation: {
            requestType:
              order.orderType === "addPlan" ? "add-plan" : order.orderType,
            memberId: order.memberId || "",
            promoCode: order.promocode || "",
            noOfDevices: order.quantity,
            planCode: order.planCode,
            // totalCost populated via charges — put shippingCharges here as fallback
            totalCost: order.shippingCharges || 0,
            delivery: { shippingType: order.shippingType },
          },
          travelDetails: order.travelDetails || [],
          quantity: order.quantity,
          package: {
            planCode: order.planCode,
            planName: order.planName || order.planCode,
            currency:
              userCurrency ||
              order.currency ||
              {
                MY: "MYR",
                ID: "IDR",
                JP: "JPY",
                HK: "HKD",
                SG: "SGD",
                PH: "PHP",
              }[order.originCountry || userOriginCountry] ||
              "SGD",
          },
          cartType: ORDER_TYPE_TO_CART_TYPE[order.orderType] || "B",
          orderId: order.orderId || null,
          variation: {
            packageCode: order.packageCode,
            variationId: order.variationId,
            productType:
              order.deviceType ||
              ORDER_TYPE_TO_CART_TYPE[order.orderType] ||
              "B",
          },
          shipping: {
            type: order.shippingType,
            rate: order.shippingCharges || 0,
          },
          shippingAddress: order.addressId ? { id: order.addressId } : null,
          pickupLocation: { locationCode: order.locationCode || "" },
          // For add-plan: device context needed by createPlanOrderRequest
          ...(order.orderType !== "buy" && order.deviceId
            ? {
                device: {
                  device_id: order.deviceId,
                  order_id: order.orderId,
                  deviceName: order.deviceName || "",
                },
              }
            : {}),
        }),
      );

      // ─── 4. Fetch variation details (and plan name for non-SIM via localPlans) ─
      const cartType = ORDER_TYPE_TO_CART_TYPE[order.orderType] || "B";
      const isAddPlan = order.orderType === "addPlan";
      const isSim = ["S", "E"].includes(cartType);
      if (isAddPlan || isSim) {
        // SIM/eSIM/addPlan: travelDetails may be empty — fetch plan countries first to get a valid country
        getPlanCountriesList({
          planCode: order.planCode,
          promoCode: order.promocode,
          originCountry: userOriginCountry,
        });
      } else {
        const travelingTo =
          order.travelDetails?.[0]?.countryCode ||
          order.travelDetails?.[0]?.locationCode ||
          "SG";
        getLocalPlans({
          origin: userOriginCountry,
          travelingTo: [travelingTo],
          planCode: order.planCode,
          promoCode: order.promocode,
        });
      }
      getPlanVariations({
        planCode: order.planCode,
        variationId: order.variationId,
        // packageCode: order.packageCode,
      });

      // ─── 5. Fetch charges so summary totals are correct ─────────────────────
      try {
        const isAddPlan = order.orderType === "addPlan";
        const travelDetails = order.travelDetails || [];
        const travelingToList = travelDetails.map(
          (t) => t.locationCode || t.countryCode,
        );

        let chargesResp;
        if (isAddPlan && order.deviceId) {
          chargesResp = await ApiService.request(
            modulesURLPath.charges.plancharges,
            {
              orderId: order.orderId || "",
              deviceId: order.deviceId,
              deviceType: order.deviceType || cartType,
              memberId: order.memberId || "",
              promoCode: order.promocode || "",
              startDate: travelDetails[0]?.startDate,
              endDate: travelDetails[travelDetails.length - 1]?.endDate,
              planCode: order.planCode,
              packageCode: order.packageCode,
              variationId: Number(order.variationId),
              travelingTo: travelingToList,
              travelDetails: travelDetails.map((t) => ({
                countryCode: t.locationCode || t.countryCode,
                countryName: t.locationName || t.country,
                startDate: t.startDate,
                endDate: t.endDate || t.startDate,
              })),
              pgw: order.pgw || "",
              userId: order.userId,
              appUserId: order.appUserId,
            },
          );
        } else {
          chargesResp = await ApiService.request(
            modulesURLPath.charges.orderCharges,
            {
              orderType: SERVICE_TYPE_REQUESTS_MAPPING[cartType]?.requestType,
              memberId: order.memberId || "",
              promoCode: order.promocode || "",
              quantity: order.quantity,
              startDate: travelDetails[0]?.startDate,
              endDate: travelDetails[travelDetails.length - 1]?.endDate,
              planCode: order.planCode,
              packageCode: order.packageCode,
              variationId: Number(order.variationId),
              travelingTo: travelingToList,
              travelDetails: travelDetails.map((t) => ({
                countryCode: t.locationCode || t.countryCode,
                countryName: t.locationName || t.country,
                startDate: t.startDate,
                endDate: t.endDate || t.startDate,
              })),
              pgw: order.pgw || "",
              userId: order.userId,
              appUserId: order.appUserId,
            },
          );
        }

        if (chargesResp?.result) {
          const chargesData = chargesResp.charges;
          const totalAmount = chargesData?.charges || 0;
          dispatch(
            setCartData({
              estimation: {
                requestType: isAddPlan
                  ? "add-plan"
                  : SERVICE_TYPE_REQUESTS_MAPPING[cartType]?.requestType,
                planCode: order.planCode,
                estimatedCost: totalAmount,
                costToDisplayInSummary: totalAmount,
                totalCost: totalAmount,
                noOfDevices: order.quantity,
                promoCode: order.promocode || "",
                memberId: order.memberId || "",
                delivery: { shippingType: order.shippingType },
              },
              deposit: chargesData?.deposit ?? 0,
            }),
          );
        }
      } catch (_) {
        // charges fetch failed — totals will show 0 but page still usable
      }

      setLoadingState("ready");
    } catch (_) {
      setLoadingState("error");
    }
  };

  // ─── 1. Fetch plink order on mount, then require an OTP login before any
  // authenticated request (getUser etc.) runs, since getUser now requires a
  // bearer token and this flow never had the user log in before. The OTP is
  // no longer sent automatically — the user sees their own identifier and
  // triggers the send themselves via handleSendOtpClick. ────────────────────
  useEffect(() => {
    if (!orderId) {
      setLoadingState("error");
      return;
    }

    fetch(modulesURLPath.PaymentLink.getOrder(orderId))
      .then((r) => r.json())
      .then((res) => {
        const order = Array.isArray(res.data) ? res.data[0] : res.data;
        // Infer orderType for legacy plink orders that were stored without it
        if (order && !order.orderType && order.deviceId)
          order.orderType = "addPlan";
        if (!res?.result || !order || !order.userId) {
          setLoadingState("error");
          return;
        }

        // ─── 2. Set session source so apidispatcher/ApiService use correct source
        sessionStorage.setItem("source", order.source || "urwifi");

        // If a user is already logged in (has a bearer token) and their
        // appUserId matches this order's owner, reuse that session — no need
        // to make them OTP again. Otherwise the session belongs to someone
        // else (or is stale/absent): clear it and require a fresh OTP login.
        const hasMatchingSession =
          auth?.token &&
          loggedInUser?.appUserId &&
          String(loggedInUser.appUserId) === String(order.appUserId);

        if (hasMatchingSession) {
          setPendingOrder(order);
          loadOrderContent(order);
          return;
        }

        if (loggedInUser) {
          clearInvalidSession(dispatch);
        }

        setPendingOrder(order);
        setLoadingState("confirm");
      })
      .catch(() => setLoadingState("error"));
  }, [orderId]);

  if (loadingState === "loading" || loadingState === "verifying") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader type="Oval" color="#dc2626" height={60} width={60} />
      </div>
    );
  }

  if (loadingState === "confirm") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
        <h3 className="text-xl font-bold text-black-900">Confirm it's you</h3>
        <p className="text-black-700 text-base max-w-sm">
          We'll send a 6-digit verification code to the email/phone on this
          order.
        </p>
        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          <input
            type="text"
            value={pendingOrder?.userId || ""}
            disabled
            className="w-full border-2 rounded-[8px] h-10 px-3 text-center text-black-600 bg-gray-100 disabled:opacity-100"
          />
          <Button type="button" size="lg" onClick={handleSendOtpClick}>
            Send OTP
          </Button>
        </div>
      </div>
    );
  }

  if (loadingState === "otp") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
        <h3 className="text-xl font-bold text-black-900">Verify it's you</h3>
        <p className="text-black-700 text-base max-w-sm">
          We sent a 6-digit code to {pendingOrder?.userId}. Enter it below to
          continue to your order.
        </p>
        <form
          onSubmit={handleOtpVerify}
          className="flex flex-col items-center gap-4 w-full max-w-xs"
        >
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            containerClassName="w-full"
            value={otp}
            onChange={setOtp}
            autoFocus
          >
            <InputOTPGroup className="w-full flex justify-center gap-3">
              {[...Array(6)].map((_, index) => (
                <InputOTPSlot
                  index={index}
                  key={index}
                  className="border-2 shadow-none text-black-600 rounded-[8px] h-10 w-10 text-lg"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {otpError && <p className="text-red-500 text-sm">{otpError}</p>}
          <Button type="submit" size="lg" disabled={otp.length !== 6}>
            Verify
          </Button>
          <button
            type="button"
            onClick={handleResendOtp}
            className="text-sm text-main-600 hover:underline"
          >
            Resend code
          </button>
        </form>
      </div>
    );
  }

  if (loadingState === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
        <ErrorIcon className="w-20 h-20" />
        <h3 className="text-xl font-bold text-black-900">
          Payment Link Invalid
        </h3>
        <p className="text-black-700 text-base max-w-sm">
          This payment link is invalid or has already been used. Please contact
          support.
        </p>
      </div>
    );
  }

  return (
    <PaymentLinkSummaryContent showForm={showForm} setShowForm={setShowForm} />
  );
}

// ─── Inner component renders only when cart is ready ─────────────────────────
function PaymentLinkSummaryContent({ showForm, setShowForm }) {
  const { cart } = useSelector((state) => state.cart);
  const { product: pocketWifiProduct } = useSelector(
    (state) => state.pocketWifi,
  );
  const { product: simProduct } = useSelector((state) => state.sim);
  const isSim = ["S", "E"].includes(cart?.variation?.productType);
  const product = isSim ? simProduct : pocketWifiProduct;

  const {
    cards,
    isChecked,
    setIsChecked,
    process,
    summary,
    handleDisable,
    handlePaymentCardSelect,
    handleSubmit,
    handleContinue,
    setProcess,
    pgwType,
    showAdyenPaymentModal,
    setShowAdyenPaymentModal,
    setinvoiceNo,
    onPlaceOrder,
    adyenSession,
    webPaymentUrl,
    handlePaymentSuccess,
    handlePaymentClose,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
  } = useOrderLogic();

  const handleGoBack = () => {
    setProcess({
      isProcessing: false,
      isSuccess: false,
      title: "",
      alertType: "",
      alertMessage: "",
    });
    setIsChecked(false);
    setShowForm(false);
    setinvoiceNo(null);
  };

  return (
    <>
      <div className="px-4 md:px-10 lg:px-16">
        <div className="containerX">
          <div className="flex flex-col md:flex-row gap-6 sm:gap-10 md:gap-15 pt-6 sm:pt-8 md:pt-10 pb-40 lg:pb-28">
            {/* Gallery — left column, sticky */}
            <div className="order-2 md:order-1 w-full md:max-w-[480px] flex flex-col gap-6 sm:gap-8 sticky top-10 self-start">
              <ProductGallery items={product?.images || []} />
            </div>

            {/* Order content — right column */}
            <div className="order-1 md:order-2 w-full">
              {showAdyenPaymentModal && (
                <PaymentComponent
                  adyenSession={adyenSession}
                  onSetShowAdyenPaymentModal={setShowAdyenPaymentModal}
                  summary={summary}
                  setinvoiceNo={setinvoiceNo}
                  onPlaceOrder={onPlaceOrder}
                />
              )}

              {webPaymentUrl && (
                <PaymentIframe
                  paymentUrl={webPaymentUrl}
                  onSuccess={handlePaymentSuccess}
                  onClose={handlePaymentClose}
                  orderOnExit={selectedPaymentMethod !== "CC"}
                  paymentMethod={selectedPaymentMethod}
                  title="Complete Payment"
                />
              )}

              <div className="w-full">
                <h4 className="text-black-900 text-base sm:text-lg md:text-2xl font-bold">
                  Order Summary
                </h4>

                {/* Summary card */}
                <div className="bg-neutral-100 rounded-2xl py-6 px-4 sm:p-8 md:p-10 divide-y divide-neutral-300 mt-4 sm:mt-6">
                  <div className="pb-5 flex flex-col gap-4">
                    <OrderSingleItem
                      title="Plan Name"
                      description={
                        summary.planName || cart?.package?.planName || "—"
                      }
                    />
                    {cart?.device?.device_id && (
                      <OrderSingleItem
                        title="Device"
                        description={
                          cart.device.deviceName || cart.device.device_id
                        }
                      />
                    )}
                  </div>

                  {/* Variation, Destinations & Promo */}
                  {(cart?.variation?.packageName ||
                    cart?.variation?.dataSize ||
                    cart?.variation?.days ||
                    cart?.travelDetails?.length > 0 ||
                    cart?.promoCode) && (
                    <div className="pb-5 flex flex-col gap-4 pt-5">
                      {cart?.variation?.packageName && (
                        <OrderSingleItem
                          title="Data Plan"
                          description={cart.variation.packageName}
                        />
                      )}
                      {cart?.variation?.dataSize && (
                        <OrderSingleItem
                          title="Data Size"
                          description={formatDataSize(
                            cart.variation.dataSize,
                            cart.variation.desc,
                          )}
                        />
                      )}
                      {cart?.variation?.days && (
                        <OrderSingleItem
                          title="Duration"
                          description={`${cart.variation.days} days`}
                        />
                      )}
                      {isSim &&
                        cart?.travelDetails?.[0]?.startDate &&
                        cart?.variation?.days && (
                          <OrderSingleItem
                            title="Package Dates"
                            description={(() => {
                              const start = new Date(
                                cart.travelDetails[0].startDate,
                              );
                              const end = new Date(start);
                              end.setDate(
                                end.getDate() + Number(cart.variation.days) - 1,
                              );
                              const fmt = (d) =>
                                d.toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                });
                              return `${fmt(start)} → ${fmt(end)}`;
                            })()}
                          />
                        )}
                      {!isSim && cart?.travelDetails?.length > 0 && (
                        <div className="flex justify-between gap-3">
                          <span className="text-sm text-black-700 shrink-0">
                            Destinations
                          </span>
                          <div className="flex flex-col gap-1 text-right">
                            {cart.travelDetails.map((td, i) => (
                              <span
                                key={i}
                                className="text-sm text-black-900 font-medium"
                              >
                                {td.locationName ||
                                  td.travelLocation ||
                                  td.country ||
                                  td.countryCode}
                                {td.startDate && (
                                  <span className="text-black-500 font-normal">
                                    {" "}
                                    ({td.startDate}
                                    {td.endDate && td.endDate !== td.startDate
                                      ? ` → ${td.endDate}`
                                      : ""}
                                    )
                                  </span>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {cart?.promoCode && (
                        <OrderSingleItem
                          title="Promo Code"
                          description={cart.promoCode}
                          descriptionClass="text-green-600 font-semibold"
                        />
                      )}
                    </div>
                  )}

                  <div className="pb-5 flex flex-col gap-4 pt-5">
                    {isSim ? (
                      <OrderSingleItem
                        title="Total Data Charges"
                        description={`${summary.currency} ${summary.totalDataCharges}`}
                        descriptionClass="uppercase"
                      />
                    ) : (
                      <>
                        <OrderSingleItem
                          title="Minimum Charges"
                          description={`${summary.currency} ${summary.minCharges ?? "0.00"}`}
                          descriptionClass="uppercase"
                        />
                        <OrderSingleItem
                          title="Deposit"
                          description={`${summary.currency} ${summary.deposit ?? "0.00"}`}
                          descriptionClass="uppercase"
                        />
                      </>
                    )}
                    <OrderSingleItem
                      title="Sub-total"
                      description={`${summary.currency} ${summary.subTotal}`}
                      descriptionClass="uppercase"
                    />
                    <OrderSingleItem
                      title="Quantity"
                      description={summary.quantity}
                      descriptionClass="uppercase"
                    />
                  </div>

                  {!isSim && (
                    <div className="pb-5 flex flex-col gap-4 pt-5">
                      {summary.shippingType === "self" ? (
                        <>
                          <OrderSingleItem
                            title="Self pick-up delivery fee"
                            description="FREE"
                          />
                          <OrderSingleItem
                            title="Return drop-off fee"
                            description="FREE"
                          />
                        </>
                      ) : (
                        <OrderSingleItem
                          title="Total Delivery Charges"
                          description={`${summary.currency} ${summary.deliveryCharges}`}
                        />
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-3 pt-5">
                    <span className="text-lg text-black-900 font-semibold">
                      Total Amount
                    </span>
                    <span className="text-lg text-black-900 font-semibold">
                      {summary.currency} {summary.totalPayable}
                    </span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mt-4 sm:mt-6">
                  {pgwType === "2C2P" && (
                    <div className="mb-6">
                      <h4 className="text-black-900 text-base sm:text-lg md:text-2xl font-bold mb-4">
                        Payment Method
                      </h4>
                      <SupportedPaymentMethods
                        onTypeChange={setSelectedPaymentMethod}
                        selectedPaymentMethod={selectedPaymentMethod}
                      />
                    </div>
                  )}

                  {pgwType === "2C2P" && selectedPaymentMethod === "CC" && (
                    <>
                      {cards?.length > 0 && (
                        <div className="mt-4 sm:mt-6 grid lg:grid-cols-2 gap-4">
                          {cards.map((item, index) => (
                            <CartPaymentCard
                              wrapperClass={
                                cart?.paymentCard?.cardId === item?.cardId
                                  ? "bg-red-700"
                                  : ""
                              }
                              item={item}
                              key={index}
                              onClick={() => handlePaymentCardSelect(item)}
                            />
                          ))}
                          <button
                            type="button"
                            className="h-full min-h-[200px] text-lg font-semibold text-black-900 bg-neutral-200 rounded-2xl flex items-center justify-center"
                            onClick={() => setShowForm(true)}
                          >
                            <PlusIcon />
                            <span>Add Card</span>
                          </button>
                        </div>
                      )}

                      {cards?.length === 0 && !showForm && (
                        <div className="mt-4 sm:mt-6">
                          <h4 className="text-black-900 text-base sm:text-lg md:text-2xl font-bold">
                            Add New Payment Method
                          </h4>
                          <button
                            type="button"
                            onClick={() => setShowForm(true)}
                            className="px-10 py-6 w-full rounded-2xl bg-neutral-100 flex items-center gap-2 text-sm sm:text-base md:text-lg text-black-900 font-semibold mt-6"
                          >
                            <PlusIcon /> <span>Add Card</span>
                          </button>
                        </div>
                      )}

                      {showForm && (
                        <UserPaymentForm handler={() => setShowForm(false)} />
                      )}
                    </>
                  )}
                </div>

                {/* T&C toggle */}
                <div className="flex items-start gap-4 mt-6 sm:mt-8">
                  <Switch
                    checked={isChecked}
                    onCheckedChange={setIsChecked}
                    className="mt-1 shrink-0"
                  />
                  <p className="text-black-700 text-base sm:text-lg">
                    I have read and agreed to the{" "}
                    <span className="font-semibold">
                      Terms &amp; Conditions &amp; Privacy Policy.
                    </span>
                  </p>
                </div>
              </div>

              {/* Success/Error Dialog */}
              <Dialog open={process.isSuccess}>
                <DialogContent
                  showCloseIcon={false}
                  className="w-[calc(100vw-32px)] max-w-[800px] h-full max-h-[400px] sm:max-h-[500px] flex items-center justify-center p-10 bg-main-50"
                >
                  {process.isProcessing ? (
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
                          Processing Your Order
                        </DialogTitle>
                        <p className="text-base text-black-700">
                          Hang tight! We're processing your payment and placing
                          your order...
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
                        {process.alertType === "success" ? (
                          <>
                            <p className="text-base text-black-700">
                              {process.alertMessage}
                            </p>
                            <DialogClose
                              onClick={() => handleContinue("/")}
                              className="px-10 py-4 bg-main-600 text-white rounded-xl max-w-max mx-auto outline-none border-none md:mt-5"
                            >
                              Continue
                            </DialogClose>
                          </>
                        ) : (
                          <>
                            <p className="text-base text-black-700">
                              {process.alertMessage ||
                                "Something went wrong. Please try again."}
                            </p>
                            <DialogClose
                              onClick={handleGoBack}
                              className="px-10 py-4 bg-main-600 text-white rounded-xl max-w-max mx-auto outline-none border-none md:mt-5"
                            >
                              Try Again
                            </DialogClose>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
            {/* end right column */}
          </div>
          {/* end flex row */}
        </div>
        {/* end containerX */}
      </div>
      {/* end px-4 wrapper */}
      {/* Pay button — no Previous */}
      <div className="w-full py-4 px-4 sm:px-8 lg:px-16 bg-white shadow-mid fixed bottom-0 left-0 z-10">
        <div className="w-full max-w-[1312px] mx-auto flex justify-end">
          <Button
            type="button"
            className="min-w-[180px] font-semibold"
            disabled={handleDisable()}
            onClick={handleSubmit}
          >
            Pay {summary.currency} {summary.totalPayable}
          </Button>
        </div>
      </div>
    </>
  );
}

export default PaymentLinkOrderSummary;
