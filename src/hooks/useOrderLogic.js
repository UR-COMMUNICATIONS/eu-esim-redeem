// useOrderLogic.js - Added QRIS payment method support
import { modulesURLPath } from "@/constants/urls";
import { APP_SOURCE } from "@/constants/app";
import { useDisApi } from "@/general";
import ApiService from "@/general/apiClient";
import { decryptData, encryptData } from "@/general/encryption";
import { commercialRoutes } from "@/services";
import { setCartData } from "@/store/module/cart/cartSlice";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useUserLocationLanguage from "./useUserLocationLanguage";
import { SERVICE_TYPE_REQUESTS_MAPPING } from "@/constants/planTypes";

export const useOrderLogic = (extraConfig = {}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentCountry } = useUserLocationLanguage();
  const { cart } = useSelector((state) => state.cart);
  const [invoiceNo, setinvoiceNo] = useState(null);
  const [adyenSession, setadyenSession] = useState(null);
  const { user, userPaymentCards } = useSelector((state) => state.auth);
  const userId = user?.userId ?? null;
  const appUserId = user?.appUserId ?? null;

  const [showAdyenPaymentModal, setShowAdyenPaymentModal] = useState(false);
  const [webPaymentUrl, setWebPaymentUrl] = useState(null);
  const [cards, setCards] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [process, setProcess] = useState({
    title: "",
    alertMessage: "",
    alertType: "",
    isProcessing: false,
    isSuccess: false,
  });
  const [pgwType, setPgwType] = useState(null);

  //selected payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("CC");

  // Ref to store token data for payment completion check
  const tokenDataRef = useRef(null);
  // Ref to track which invoiceNo has already triggered an order placement
  const placedOrderRef = useRef(null);
  // Snapshot of the plan/variation taken at submit time (BEFORE payment). The
  // order is actually placed in an effect that runs AFTER payment completes and
  // reads cart live — if a background localPlans call mutates cart.package while
  // the payment iframe is open, the live read would submit the wrong plan
  // (e.g. PWEUDP1D + a stale variation -> "Invalid variation ID" after payment).
  // Using this frozen snapshot guarantees we submit exactly what was validated.
  const orderItemRef = useRef(null);
  // Guards the best-effort "place order on tab close" path so it can't double-fire.
  const beaconSentRef = useRef(false);

  // Calculate summary values to work for both SIM/eSIM and PocketWifi
  const totalCost =
    cart.estimation?.estimatedCost ||
    cart.estimation?.totalCost ||
    cart.estimation?.costToDisplayInSummary ||
    0;

  const quantity = cart.quantity || 1;
  const delvCharges = cart?.promoDetails?.freeDelivery
    ? 0
    : cart.shipping?.rate || 0;

  const summary = {
    currency: cart?.package?.currency,
    planCode: cart?.package?.planCode,
    planName: cart?.package?.planName,
    minCharges: cart?.package?.minCharges,
    deposit: cart.deposit,
    quantity: quantity,
    deliveryCharges: delvCharges,
    subTotal: (totalCost / quantity).toFixed(2),
    totalDataCharges: totalCost.toFixed(2),
    totalPayable: (totalCost + delvCharges + (cart?.deposit || 0)).toFixed(2),
    shippingType: cart.shipping?.type,
  };

  const localLanguage = sessionStorage.getItem("i18next");

  useEffect(() => {
    if (invoiceNo && placedOrderRef.current !== invoiceNo) {
      placedOrderRef.current = invoiceNo;

      if (pgwType === "ADYEN") {
        setShowAdyenPaymentModal(true);
      }

      if (cart?.estimation?.requestType === "add-plan") {
        onPlacePlanOrder();
      } else {
        onPlaceOrder();
      }
    }
  }, [invoiceNo, pgwType]);

  useEffect(() => {
    if (!showAdyenPaymentModal) {
      setadyenSession(null);
    }
  }, [showAdyenPaymentModal]);

  // Common function to disable submission based on checkbox and card selection
  const handleDisable = () => {
    if (pgwType === "ADYEN") {
      return !isChecked;
    }

    // NEW: For non-card payment methods (QRIS, GCASH, etc.), only check the checkbox
    if (selectedPaymentMethod !== "CC") {
      return !isChecked;
    }

    // For card payments, check both checkbox and card selection
    return !(isChecked && cart?.paymentCard?.cardId);
  };

  // Common payment card selection logic with proper object spread
  const handlePaymentCardSelect = (item) => {
    const paymentCard = {
      ...item,
      isCorporateCard: item.pgw === "crpc",
    };
    dispatch(setCartData({ paymentCard }));
  };

  // API call to get the payment gateway type
  const getPaymentGateway = async () => {
    const webSource = sessionStorage.getItem("source");
    try {
      const response = await fetch(modulesURLPath.Payment.getPgw, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          userId,
          appUserId,
          data: encryptData({
            userId,
            appUserId,
          }),
          source: webSource || APP_SOURCE,
          platform: "web",
        }),
      });
      const { data } = await response.json();
      setPgwType(data?.pgw);
    } catch (error) {
      console.error("Error fetching payment gateway:", error);
    }
  };

  useEffect(() => {
    getPaymentGateway();
  }, []);

  const createPurchaseOrderRequest = () => {
    // Use the pre-payment snapshot when available so a mid-payment cart change
    // can't alter the submitted plan/variation; fall back to live cart for
    // paths that skip handleSubmit (crpc / zero-amount).
    const snap = orderItemRef.current;
    return {
      orderType: SERVICE_TYPE_REQUESTS_MAPPING[cart.cartType]?.requestType,
      memberId: cart.estimation?.memberId,
      promoCode: cart?.estimation?.promoCode || cart?.promoCode || "",
      // cardId:
      //   Number(summary?.totalPayable) === 0 || selectedPaymentMethod !== "CC"
      //     ? 0
      //     : cart.paymentCard?.cardId || 0,
      cardId:
        selectedPaymentMethod !== "CC" ? 0 : cart.paymentCard?.cardId || 0, // card id should not be 0 even amount is 0 (req from sir)
      quantity: cart.estimation.noOfDevices,
      startDate: cart.travelDetails[0].startDate,
      endDate: cart.travelDetails[cart.travelDetails.length - 1].endDate,
      planCode: snap?.estimationPlanCode || cart.estimation.planCode,
      packageCode: snap?.packageCode || cart.variation?.packageCode,
      variationId: Number(snap?.variationId || cart.variation?.variationId),
      invoiceNo: invoiceNo,
      shippingType:
        summary.shippingType || cart.estimation?.delivery?.shippingType,
      locationCode: cart.pickupLocation?.locationCode,
      shippingCharges: cart?.promoDetails?.freeDelivery
        ? 0
        : cart?.shipping?.rate || 0,
      addressId: cart?.shippingAddress?.id || undefined,
      travelDetails: cart.travelDetails,
      travelingTo: cart?.travelDetails.map((value) => value.locationCode),
      supCharges: Boolean(user?.supCharges),
      // The card's pgw (crpc/2c2p) only applies when paying by card. For
      // QRIS / bank transfer / GCash a stale selected card must NOT override
      // the real gateway, so fall back to pgwType for non-card methods.
      pgw:
        selectedPaymentMethod === "CC" && cart?.paymentCard?.pgw === "crpc"
          ? "crpc"
          : selectedPaymentMethod === "CC" && cart?.paymentCard?.pgw === "2c2p"
            ? "2c2p"
            : pgwType,
      paymentMethod: selectedPaymentMethod,
      language: localLanguage,
      ...(cart.orderId ? { orderId: cart.orderId } : {}),
    };
  };

  const createPlanOrderRequest = () => {
    // Use the pre-payment snapshot when available so a mid-payment cart change
    // can't alter the submitted plan/variation; fall back to live cart for
    // paths that skip handleSubmit (crpc / zero-amount).
    const snap = orderItemRef.current;
    return {
      memberId: cart.estimation.memberId,
      promoCode: cart?.estimation?.promoCode || cart?.promoCode || "",
      cardId:
        selectedPaymentMethod !== "CC" ? 0 : cart.paymentCard?.cardId || 0,
      startDate: cart.travelDetails[0].startDate,
      endDate: cart.travelDetails[cart.travelDetails.length - 1].endDate,
      planCode:
        snap?.estimationPlanCode || snap?.planCode || cart.package.planCode,
      packageCode: snap?.packageCode || cart.variation?.packageCode,
      variationId: Number(snap?.variationId || cart.variation?.variationId),
      invoiceNo: invoiceNo,
      travelDetails: cart.travelDetails,
      travelingTo: cart?.travelDetails.map((value) => value.locationCode),
      supCharges: Boolean(user?.supCharges),
      deviceId: cart.device?.device_id,
      orderId: cart.device?.order_id,
      deviceType: snap?.productType || cart.variation?.productType,
      // The card's pgw (crpc/2c2p) only applies when paying by card. For
      // QRIS / bank transfer / GCash a stale selected card must NOT override
      // the real gateway, so fall back to pgwType for non-card methods.
      pgw:
        selectedPaymentMethod === "CC" && cart?.paymentCard?.pgw === "crpc"
          ? "crpc"
          : selectedPaymentMethod === "CC" && cart?.paymentCard?.pgw === "2c2p"
            ? "2c2p"
            : pgwType,
      paymentMethod: selectedPaymentMethod,
      language: localLanguage,
      ...(cart.orderId ? { orderId: cart.orderId } : {}),
    };
  };

  const injectFacebookPixel = () => {
    if (!document.getElementById("fb-pixel-script")) {
      const script = document.createElement("script");
      script.id = "fb-pixel-script";
      script.innerHTML = `     
                !function (f, b, e, v, n, t, s) {
                if (f.fbq) return; n = f.fbq = function () {
                n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                };
                if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
                n.queue = []; t = b.createElement(e); t.async = !0;
                t.src = v; s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s)
                }(window, document, 'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '1605490250094780');
                fbq('track', 'PageView');
            `;
      document.head.appendChild(script);
    }

    if (!document.getElementById("fb-pixel-noscript")) {
      const noscript = document.createElement("noscript");
      noscript.id = "fb-pixel-noscript";
      noscript.innerHTML = `
            <img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=1605490250094780&ev=PageView&noscript=1" />
            `;
      document.body.appendChild(noscript);
    }
  };

  const pushPurchaseEvent = (orderId) => {
    const firedKey = `purchase_fired_${orderId}`;
    if (sessionStorage.getItem(firedKey)) return;
    sessionStorage.setItem(firedKey, "true");

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null }); // Clear previous ecommerce data

    window.dataLayer.push({
      event: "custom_button_purchase",
      ecommerce: {
        transaction_id: orderId,
        value: parseFloat(summary.totalPayable),
        currency: summary.currency || "SGD",
        items: [
          {
            item_name: summary.planName || cart.variation?.packageName || "",
            item_id: summary.planCode || cart.variation?.packageCode || "",
            item_category: cart.cartType,
            price: parseFloat(summary.subTotal),
            quantity: summary.quantity,
          },
        ],
      },
    });

    if (user?.email) {
      window.dataLayer.push({
        user_data: {
          email: user.email.toLowerCase().trim(),
          address: {
            country: currentCountry || "",
          },
        },
      });
    }
  };

  const onPlaceOrder = () => {
    ApiService.request(
      modulesURLPath.Order.placeOrder,
      createPurchaseOrderRequest(),
    )
      .then((res) => {
        console.log("Order response", { res });
        if (res?.result) {
          pushPurchaseEvent(res.orderId || invoiceNo);
        }
        // if (currentCountry == "id") {
        //     injectFacebookPixel()
        // }
        setProcess((prev) => ({
          ...prev,
          isProcessing: false,
          isSuccess: true,
          title: res?.result
            ? t("orderSummary.orderConfirmed")
            : t("orderSummary.orderFailed"),
          alertType: res?.result ? "success" : "error",
          alertMessage: res?.message || t("orderSummary.somethingWrong"),
        }));
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        setShowAdyenPaymentModal(false);
        setWebPaymentUrl(null);
        setProcess((prev) => ({
          ...prev,
          isProcessing: false,
          isSuccess: true,
          title: t("orderSummary.orderFailed"),
          alertType: "error",
          alertMessage: t("orderSummary.somethingWrong"),
        }));
      });
  };

  const onPlacePlanOrder = () => {
    ApiService.request(
      modulesURLPath.Order.placePlanOrder,
      createPlanOrderRequest(),
    )
      .then((res) => {
        console.log("Order response", { res });
        if (res?.result) {
          pushPurchaseEvent(res.orderId || invoiceNo);
        }
        setProcess((prev) => ({
          ...prev,
          isProcessing: false,
          isSuccess: true,
          title: res?.result
            ? t("orderSummary.orderConfirmed")
            : t("orderSummary.orderFailed"),
          alertType: res?.result ? "success" : "error",
          alertMessage: res?.message || t("orderSummary.somethingWrong"),
        }));
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        setShowAdyenPaymentModal(false);
        setWebPaymentUrl(null);
        setProcess((prev) => ({
          ...prev,
          isProcessing: false,
          isSuccess: true,
          title: t("orderSummary.orderFailed"),
          alertType: "error",
          alertMessage: t("orderSummary.somethingWrong"),
        }));
      });
  };

  // Use dispatcher API for payment status verification
  const getPaymentStatus = useDisApi({
    apiCall: "getPaymentStatus",
    setCallBack: async (statusResp) => {
      setWebPaymentUrl(null);

      if (statusResp?.status?.result) {
        // Payment verified - proceed with order placement
        setinvoiceNo(statusResp.invoiceNo || tokenDataRef.current?.invoiceNo);
      } else {
        setProcess((prev) => ({
          ...prev,
          isProcessing: false,
          isSuccess: true,
          title: t("orderSummary.paymentFailed"),
          alertType: "error",
          alertMessage:
            statusResp?.status?.message ||
            t("orderSummary.paymentVerificationFailed"),
        }));
      }
    },
  });

  const handleSubmit = async () => {
    try {
      // CC payment requires a card to be selected
      if (selectedPaymentMethod === "CC" && !cart.paymentCard?.cardId) {
        setProcess((prev) => ({
          ...prev,
          isProcessing: false,
          isSuccess: true,
          title: t("orderSummary.paymentFailed"),
          alertType: "error",
          alertMessage: t(
            "orderSummary.pleaseSelectCard",
            "Please select a card to proceed",
          ),
        }));
        return;
      }

      // Pre-payment consistency guard: the order's planCode comes from
      // cart.package (top-up) or cart.estimation (buy/rent), while
      // packageCode/variationId come from cart.variation. If these point at
      // different plans (or the variation is missing), the backend rejects the
      // order AFTER payment ("Invalid variation ID"), leaving the user charged
      // with no order. Block BEFORE any payment is initiated.
      //
      // Fails CLOSED: we only allow payment when the variation provably belongs
      // to the selected plan (same planCode AND a usable variationId).
      const orderPlanCode =
        cart?.estimation?.planCode || cart?.package?.planCode;
      const variationPlanCode = cart?.variation?.planCode;
      const variationId = cart?.variation?.variationId;

      const planVariationOutOfSync =
        // a plan is selected for the order...
        Boolean(orderPlanCode) &&
        // ...but the variation is missing, has no id, or belongs to a
        // different plan.
        (!cart?.variation ||
          !variationId ||
          !variationPlanCode ||
          orderPlanCode !== variationPlanCode);

      if (planVariationOutOfSync) {
        setProcess((prev) => ({
          ...prev,
          isProcessing: false,
          isSuccess: true,
          title: t("orderSummary.orderFailed"),
          alertType: "error",
          alertMessage: t(
            "orderSummary.planMismatch",
            "Your plan selection is out of sync. Please go back and re-select your plan before paying.",
          ),
        }));
        return;
      }

      // Freeze the validated plan/variation BEFORE payment starts. The order
      // builders read from this snapshot so a mid-payment cart mutation can't
      // change what gets submitted. Only take the snapshot once per checkout
      // session — if the user retries (closes iframe and resubmits), the cart
      // may have already mutated, so we keep the original frozen values.
      if (!orderItemRef.current) {
        orderItemRef.current = {
          planCode: cart?.package?.planCode,
          estimationPlanCode: cart?.estimation?.planCode,
          packageCode: cart?.variation?.packageCode,
          variationId: cart?.variation?.variationId,
          productType: cart?.variation?.productType,
        };
      }

      setProcess((prev) => ({
        ...prev,
        isProcessing: true,
      }));

      console.log("cart.paymentCard", cart.paymentCard);
      console.log("selectedPaymentMethod", selectedPaymentMethod); // NEW: Log selected payment method

      // Handle corporate card (crpc) - no payment session needed.
      // Only applies to ACTUAL card payments. A previously-selected corporate
      // card can linger in cart.paymentCard (persisted) even when the user picks
      // QRIS / bank transfer / GCash — without the CC guard, those non-card
      // methods would wrongly short-circuit to a "crpc" invoice and skip the
      // real payment session.
      if (selectedPaymentMethod === "CC" && cart.paymentCard?.pgw === "crpc") {
        setinvoiceNo("crpc");
        return;
      }

      // Handle zero amount - skip payment session, place order directly
      if (Number(summary?.totalPayable) === 0) {
        setinvoiceNo("inv-UR0000000ZRO");
        return;
      }

      // Create return URL for payment gateway redirect
      const returnUrl = window.location.origin + "/payment-return";

      const params = {
        appUserId,
        userId,
        amount: Number(summary?.totalPayable || 0),
        cardId:
          selectedPaymentMethod !== "CC" ? 0 : cart.paymentCard?.cardId || 0, // Set cardId to 0 for non-card payments
        returnUrl: returnUrl,
        // storedPaymentMethodId: undefined,
        // encryptedSecurityCode: undefined,
        currency: summary?.currency,
        paymentMethod: selectedPaymentMethod, //Pass the selected payment method (CC, QRIS, GCASH, etc.)
        tdsRequired: true,
      };

      console.log("Payment parameters:", params);

      const request = {
        data: encryptData(params),
      };

      const tokenResp = await ApiService.request(
        modulesURLPath.Payment.paynon3ds,
        request,
      );

      setProcess((prev) => ({
        ...prev,
        isSuccess: false,
        isProcessing: false,
      }));

      console.log("Token response", { tokenResp });

      if (tokenResp.result) {
        // Handle ADYEN response
        if (typeof tokenResp.data === "string") {
          let tokenData = decryptData(tokenResp.data);
          console.log({ tokenData });
          setadyenSession(tokenData.adyenData);
          setinvoiceNo(tokenData?.invoiceNo);
        }
        // Handle 2C2P response
        else if (tokenResp.data) {
          const invoiceNumber = tokenResp.data.invoiceNo;
          const redirectURL = tokenResp.data.redirectURL;

          // Store token data for later use
          tokenDataRef.current = {
            invoiceNo: invoiceNumber,
            redirectURL: redirectURL,
            currency: summary?.currency,
          };

          // Check if 3DS or redirect is required (for cards) or payment UI needed (for QRIS)
          if (redirectURL && redirectURL !== "false") {
            // Show iframe - this will show 3DS for cards or QR code for QRIS
            setWebPaymentUrl(redirectURL);
          } else {
            // Non-3DS card payment - proceed directly
            setinvoiceNo(invoiceNumber);
          }
        }
      } else {
        setProcess((prev) => ({
          ...prev,
          isProcessing: false,
          isSuccess: true,
          title: t("orderSummary.orderFailed"),
          alertType: "error",
          alertMessage:
            tokenResp.message ||
            tokenResp.errorMessage ||
            t("orderSummary.somethingWrong"),
        }));
      }
    } catch (error) {
      setProcess((prev) => ({
        ...prev,
        isProcessing: false,
        isSuccess: true,
        title: t("orderSummary.orderFailed"),
        alertType: "error",
        alertMessage: error.message || t("orderSummary.somethingWrong"),
      }));
    }
  };

  // Handle payment completion - VERIFY payment status before proceeding
  const handlePaymentSuccess = async () => {
    console.log("Payment iframe closed - verifying payment status...");

    const currentTokenData = tokenDataRef.current;

    if (!currentTokenData) {
      console.error("Token data not available for verification");
      setWebPaymentUrl(null);
      setProcess((prev) => ({
        ...prev,
        isProcessing: false,
        isSuccess: true,
        title: t("orderSummary.paymentFailed"),
        alertType: "error",
        alertMessage: t("orderSummary.paymentDataMissing"),
      }));
      return;
    }

    try {
      // Close the payment iframe and show the processing state. Without closing
      // it here, the iframe Dialog stays open behind the "Order Processing"
      // dialog, and a later close attempt produces a confusing double-dialog.
      setWebPaymentUrl(null);
      setProcess((prev) => ({
        ...prev,
        isProcessing: true,
        isSuccess: true,
      }));

      // For 2C2P payment gateway - bypass payment status verification for all payment methods
      if (pgwType === "2C2P") {
        console.log(
          `Bypassing payment status verification for 2C2P gateway with payment method: ${selectedPaymentMethod}`,
        );
        // Directly set invoice number to proceed with order placement
        setinvoiceNo(currentTokenData.invoiceNo);
        return;
      }

      // Call payment status verification API for other payment gateways (ADYEN)
      getPaymentStatus({
        invoiceNo: currentTokenData.invoiceNo,
        currency: currentTokenData.currency,
      });
    } catch (error) {
      console.error("Error verifying payment status:", error);
      setWebPaymentUrl(null);
      setProcess((prev) => ({
        ...prev,
        isProcessing: false,
        isSuccess: true,
        title: t("orderSummary.paymentFailed"),
        alertType: "error",
        alertMessage:
          error.message || t("orderSummary.paymentVerificationError"),
      }));
    }
  };

  // Handle payment iframe close.
  // For 2C2P (which also routes Alipay / QRIS / GCash), the gateway often
  // completes payment OFF our domain (Alipay app/site) and never redirects the
  // iframe back to yoowifi.com — so the success-detection in PaymentIframe never
  // fires and the order would never be placed even though the user may have
  // paid. Per product decision, for 2C2P we place the order on close REGARDLESS
  // of payment status: the order request must reach the backend so there is a
  // record/log to reconcile, refund, or fulfil the order internally. Payment
  // confirmation is async and not reliable at this point anyway (same reason we
  // already bypass status verification for 2C2P in handlePaymentSuccess).
  const handlePaymentClose = () => {
    setWebPaymentUrl(null);

    const currentTokenData = tokenDataRef.current;
    // Place the order on close ONLY for off-domain channels (QRIS/IMBANK/Alipay)
    // where the gateway never returns to confirm — there, "closing the window"
    // means the user finished paying. For CARD, closing the iframe is a genuine
    // CANCEL: do NOT place an order (the card order is placed via
    // handlePaymentSuccess on 3DS completion / "I've Completed Payment").
    const isOffDomainChannel = selectedPaymentMethod !== "CC";
    if (
      isOffDomainChannel &&
      pgwType === "2C2P" &&
      currentTokenData?.invoiceNo
    ) {
      // Show the "Processing Order" dialog while the order request is placed.
      setProcess((prev) => ({
        ...prev,
        isProcessing: true,
        isSuccess: true,
      }));
      setinvoiceNo(currentTokenData.invoiceNo);
      return;
    }

    // Card cancel (or no token) — just dismiss, place no order.
    setProcess({
      isProcessing: false,
      isSuccess: false,
      title: "",
      alertType: "",
      alertMessage: "",
    });
  };

  // Best-effort: if the user leaves the page (closes tab / navigates away) while
  // the 2C2P payment iframe is still open, fire the order request anyway. Alipay
  // and other off-domain methods never redirect back to us, and the payment
  // status API is unreliable (timing → false "failed"), so the in-app close
  // handlers can't catch a hard tab-close. We send the order with a keepalive
  // fetch (survives unload). The backend then has a record to reconcile/fulfil.
  useEffect(() => {
    // Only arm this while a 2C2P payment iframe is open with a known invoice.
    if (
      !webPaymentUrl ||
      pgwType !== "2C2P" ||
      !tokenDataRef.current?.invoiceNo
    ) {
      return;
    }
    beaconSentRef.current = false;

    const sendOrderOnExit = () => {
      if (beaconSentRef.current) return;
      // If the normal flow already placed this invoice, don't duplicate.
      if (placedOrderRef.current === tokenDataRef.current?.invoiceNo) return;
      beaconSentRef.current = true;

      try {
        const isAddPlan = cart?.estimation?.requestType === "add-plan";
        const endpoint = isAddPlan
          ? modulesURLPath.Order.placePlanOrder
          : modulesURLPath.Order.placeOrder;
        // Use the ref directly — React state (invoiceNo) is a stale closure at
        // pagehide time and may still be null even though tokenDataRef was set.
        const beaconInvoiceNo = tokenDataRef.current?.invoiceNo;
        const body = isAddPlan
          ? { ...createPlanOrderRequest(), invoiceNo: beaconInvoiceNo }
          : { ...createPurchaseOrderRequest(), invoiceNo: beaconInvoiceNo };
        const webSource = sessionStorage.getItem("source");

        // keepalive lets the request outlive the page being torn down.
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          keepalive: true,
          body: JSON.stringify({
            ...body,
            source: webSource || APP_SOURCE,
            platform: "web",
            userId,
            appUserId,
          }),
        }).catch(() => {});
      } catch (e) {
        // best-effort only
      }
    };

    // NOTE: intentionally NOT using visibilitychange/'hidden' — on mobile,
    // Alipay/GCash app-switching fires 'hidden' while the user is still paying,
    // which would place the order prematurely. 'pagehide' only fires on real
    // page teardown (tab close / navigation away), which is what we want.
    window.addEventListener("pagehide", sendOrderOnExit);

    return () => {
      window.removeEventListener("pagehide", sendOrderOnExit);
    };
  }, [webPaymentUrl, pgwType]);

  const handleContinue = (route = commercialRoutes.home.path) => {
    setProcess({
      isProcessing: false,
      isSuccess: false,
      title: "",
      alertType: "",
      alertMessage: "",
    });

    if (process.alertType === "success") {
      navigate(route);
    }
  };

  // Get user cards - only for 2C2P gateway and card payments
  const getUserCardsEnc = useDisApi({
    apiCall: "getUserCardsEnc",
    setCallBack: (res) => {
      if (res?.status?.result) {
        let decCards = decryptData(res.data);
        if (Array.isArray(decCards)) {
          const filteredCards = decCards.filter(
            (i) => i.pgw === "2c2p" || i.pgw === "crpc",
          );
          setCards(filteredCards);
          if (filteredCards.length > 0) {
            const firstCard = filteredCards[0];
            dispatch(
              setCartData({
                paymentCard: {
                  ...firstCard,
                  isCorporateCard: firstCard.pgw === "crpc",
                },
              }),
            );
            setIsChecked(true);
          }
        }
      } else {
        setCards([]);
      }
    },
  });

  useEffect(() => {
    // Only fetch cards for 2C2P and when payment method is CC
    if (pgwType && pgwType !== "ADYEN" && selectedPaymentMethod === "CC") {
      getUserCardsEnc({ userId: user?.userId });
    }
  }, [cart.isNewCardAdded, pgwType, invoiceNo, selectedPaymentMethod]); // Added selectedPaymentMethod dependency

  const handleReset = () => {
    setProcess({
      isProcessing: false,
      isSuccess: false,
      title: "",
      alertType: "",
      alertMessage: "",
    });
    setinvoiceNo(null);
    setShowAdyenPaymentModal(false);
    setWebPaymentUrl(null);
    tokenDataRef.current = null;
    orderItemRef.current = null;
  };

  return {
    cards,
    isChecked,
    setIsChecked,
    process,
    setProcess,
    summary,
    handleDisable,
    handlePaymentCardSelect,
    handleSubmit,
    handleContinue,
    handleReset,
    userPaymentCards,
    pgwType,
    showAdyenPaymentModal,
    setShowAdyenPaymentModal,
    setinvoiceNo,
    onPlaceOrder,
    adyenSession,
    webPaymentUrl,
    handlePaymentSuccess,
    handlePaymentClose,
    selectedPaymentMethod, // Expose selectedPaymentMethod
    setSelectedPaymentMethod, // Expose setSelectedPaymentMethod
  };
};
