import { hostServices } from "@/general/host.services";
import { AdyenCheckout, Card, Dropin } from "@adyen/adyen-web";
// import "@adyen/adyen-web/styles/adyen.css";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const PaymentComponent = ({
  onSetShowAdyenPaymentModal,
  summary,
  setinvoiceNo,
  adyenSession,
}) => {
  const paymentContainer = useRef(null);
  const { user } = useSelector((state) => state.auth);
  // const userId = user?.userId ?? null;
  // const appUserId = user?.appUserId ?? null;

  useEffect(() => {
    Promise.all([
      import("@adyen/adyen-web/styles/adyen.css")
    ]);
  }, []);

  useEffect(() => {
    let ignore = false;
    // let session = null;

    const config = {
      environment: hostServices.adyenEnv,
      clientKey: hostServices.adyenClientKey,
      returnUrl: window.location.href,
      // Note: Depending on your Adyen version you may need to move card/dropin configuration
      // into a paymentMethodsConfiguration object.
      card: {
        holderNameRequired: true,
        showStorePaymentField: false,
      },
      dropin: {
        showRemovePaymentMethodButton: true,
        showPreselectedStoredPaymentMethod: false,
      },
      locale: "en-US",
      showWarnings: true,
    };

    // const params = {
    //   appUserId,
    //   userId,
    //   amount: Number(summary?.totalPayable || 0),
    //   cardId: 0,
    //   returnUrl: window.location.href,
    //   userName: "",
    //   newCard: true,
    //   // currency: "JPY",
    // };

    // const request = {
    //   appUserId: params.appUserId,
    //   userId: params.userId,
    //   data: encryptData(params),
    //   source: "urwifi",
    //   platform: "app",
    // };

    const createCheckout = async () => {
      // try {
      //   // Create the payment session by calling your backend
      //   const response = await fetch(modulesURLPath.Payment.paynon3ds, {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json",
      //     },
      //     method: "POST",
      //     body: JSON.stringify(request),
      //   });
      //   const tokenResp = await response.json();

      //   if (tokenResp.data) {
      //     const decData = decryptData(tokenResp.data);
      //     console.log({ decData });
      //     setinvoiceNo(decData?.invoiceNo);
      //     session = decData.adyenData;
      //   } else {
      //     console.error(tokenResp.status?.message);
      //   }
      // } catch (error) {
      //   console.error("Error creating payment session:", error);
      // }

      try {
        //// CREATE ORDER API CALL ASYNC
        // Initialize the Adyen Checkout with the session and configuration
        const checkout = await AdyenCheckout({
          countryCode: user?.originCountry?.toUpperCase() || "JP",
          ...config,
          session: adyenSession,
          onPaymentCompleted: (response, _component) => {
            console.log("onPaymentCompleted:", response);
            onSetShowAdyenPaymentModal(false);
          },
          onPaymentFailed: (response, _component) => {
            console.log("onPaymentFailed:", response);
            onSetShowAdyenPaymentModal(false);
          },
          onError: (error, _component) => {
            console.error("onError:", JSON.stringify(error, null, 3));
            onSetShowAdyenPaymentModal(false);
          },
        });

        // Mount the Drop-in component if the container is available
        if (paymentContainer.current && !ignore) {
          new Dropin(checkout, {
            paymentMethodComponents: [Card],
          }).mount(paymentContainer.current);
        }
      } catch (error) {
        console.error("Adyen checkout initialization error:", error);
      }
    };

    // Check if the container is available before starting initialization
    if (paymentContainer.current) {
      createCheckout();
    } else {
      console.log("Payment container not available yet.");
    }

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={() => onSetShowAdyenPaymentModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
        <div className="payment-component ">
          <div ref={paymentContainer} className="payment" />
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;
