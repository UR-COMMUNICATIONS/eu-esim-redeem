import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ErrorIcon, SuccessIcon } from "@/services";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { do2c2pPayment, useDisApi } from "@/general";
import { setCartData } from "@/store/module/cart/cartSlice";
import Loader from "../Loader";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { decryptData, encryptData } from "@/general/encryption";
import { modulesURLPath } from "@/constants/urls";
import ApiService from "@/general/apiClient";

function UserPaymentForm({ handler = () => { } }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const initialCardState = {
    name: "",
    number: "",
    expiry: "",
    cvc: "",
  };

  const [webPaymentUrl, setWebPaymentUrl] = useState(null);
  const [card, setCard] = useState(initialCardState);
  const [process, setProcess] = useState({
    title: "",
    alertMessage: "",
    alertType: "",
    isProcessing: false,
    isSuccess: false,
  });

  // Use ref to maintain latest card data
  const cardRef = useRef(initialCardState);

  // Use ref to maintain latest tokenData
  const tokenDataRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedCard = {
      ...card,
      [name]: value,
    };
    setCard(updatedCard);
    cardRef.current = updatedCard; // Keep ref in sync
  };

  const handleDisable = () => {
    const isActive =
      card.name && card.number && card.expiry && card.cvc ? true : false;
    return !isActive;
  };

  const handleError = (message) => {
    console.log("handleSubmit error:", message);
    setProcess({
      title: t("orderSummary.cardFailed"),
      alertType: "error",
      alertMessage: typeof message === "object" ? message.respDesc : message,
      isProcessing: false,
      isSuccess: true,
    });
  };

  const resetForm = () => {
    setCard(initialCardState);
    cardRef.current = initialCardState;
    tokenDataRef.current = null;
    setWebPaymentUrl(null);
    dispatch(setCartData({ isNewCardAdded: false }));
    handler();
  };

  const handleContinue = () => {
    // Reset form on success
    if (process.alertType === "success") {
      resetForm();
    }

    setProcess({
      title: "",
      alertMessage: "",
      alertType: "",
      isProcessing: false,
      isSuccess: false,
    });
  };

  // Use dispatcher API for payment status verification
  const getPaymentStatus = useDisApi({
    apiCall: "getPaymentStatus",
    setCallBack: async (statusResp) => {
      setWebPaymentUrl(null);

      if (statusResp?.status?.result) {
        dispatch(setCartData({ isNewCardAdded: true }));
        setProcess({
          isProcessing: false,
          isSuccess: true,
          title: t("orderSummary.cardAdded"),
          alertType: "success",
          alertMessage: "Card added successfully!",
        });
      } else {
        handleError(statusResp?.status?.message);
      }
    },
  });

  const onWebPaymentCompleted = async () => {
    const currentTokenData = tokenDataRef.current;

    if (!currentTokenData) {
      handleError("Token data not available");
      return;
    }

    try {
      setProcess((prev) => ({
        ...prev,
        isProcessing: true,
        isSuccess: true,
      }));

      // Call payment status using dispatcher API
      getPaymentStatus({
        invoiceNo: currentTokenData.invoiceNo,
        currency: currentTokenData.currency,
      });
    } catch (error) {
      handleError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const webSource = sessionStorage.getItem('source');
    try {
      setProcess({
        title: "",
        alertMessage: "",
        alertType: "",
        isProcessing: true,
        isSuccess: false,
      });

      // Get the latest card data from ref
      const currentCard = cardRef.current;
      const expiry = currentCard.expiry.split("/");
      const updatedCard = {
        ...currentCard,
        exp_month: expiry[0] ? expiry[0] : null,
        exp_year: expiry[1] ? "20" + expiry[1] : null,
      };

      console.log("Requesting 3DS payment session...");

      // Call pay3ds API to get payment token (matching mobile app flow)
      const params = {
        appUserId: user.appUserId,
        userId: user.userId,
        amount: 0, // 0 for card tokenization
        cardId: 0, // 0 for new card
        returnUrl: window.location.href,
        userName: updatedCard.name,
        newCard: true, // Flag for new card
        tdsRequired: true, // Flag for 3DS authentication
      };

      const request = {
        appUserId: user.appUserId,
        userId: user.userId,
        data: encryptData(params),
        source: webSource || "urwifi",
        platform: "web",
      };

      const tokenResp = await ApiService.request(
        modulesURLPath.Payment.pay3ds,
        request
      );

      console.log("Token response:", tokenResp);

      if (tokenResp.result || tokenResp.status?.result) {
        // Decrypt token data
        const decryptedTokenData = decryptData(tokenResp.data);
        console.log("Decrypted token data:", decryptedTokenData);

        // Store token data in ref
        tokenDataRef.current = decryptedTokenData;

        // Make 2c2p payment with the token (matching mobile app structure)
        const paymentResp = await do2c2pPayment({
          paymentToken: tokenDataRef.current.paymentToken,
          payment: {
            code: {
              channelCode: "CC",
            },
            data: {
              email: user.userId,
              name: updatedCard.name,
              cardNo: updatedCard.number.replace(/\s/g, ""),
              expiryMonth: updatedCard.exp_month,
              expiryYear: updatedCard.exp_year,
              securityCode: updatedCard.cvc,
              cardTokenize: true,
            },
          },
          clientID: tokenDataRef.current.clientId, // Note: capitalized ID
        });
        console.log("2c2p Payment Response:", paymentResp);

        setProcess((prev) => ({
          ...prev,
          isProcessing: false,
          isSuccess: false,
        }));

        // Handle response codes (matching mobile app logic)
        if (paymentResp.respCode === "2000") {
          // Direct success - no 3DS required
          await onWebPaymentCompleted();
        } else if (["1000", "1001", "1002"].includes(paymentResp.respCode)) {
          // 3DS authentication required - show web modal
          setWebPaymentUrl(paymentResp.data);
        } else {
          // Payment failed
          handleError(paymentResp);
        }
      } else {
        handleError(
          tokenResp.message ||
          tokenResp.status?.message ||
          "Failed to create payment session"
        );
      }
    } catch (error) {
      console.error("Payment submission error:", error);
      handleError(error.message);
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col px-3 sm:p-6 border border-main-600 rounded-xl gap-6 mt-6"
      >
        <h4 className="text-lg text-black-900 font-semibold md:mt-0 mt-4">
          {t("form.addCreditDebit")}
        </h4>
        <div className="flex flex-col gap-2 sm:gap-4">
          <Input
            label={t("form.cardholderName")}
            placeholder={t("form.cardholderNamePlaceholder")}
            name="name"
            value={card.name}
            onChange={handleChange}
            required
          />
          <Input
            type="number"
            label={t("form.cardNumber")}
            placeholder={t("form.cardNumberPlaceholder")}
            name="number"
            value={card.number}
            onChange={handleChange}
            className="appearance-none"
            required
          />
          <Input
            type="number"
            label={t("form.cvcCvv")}
            placeholder={t("form.cvcCvvPlaceholder")}
            name="cvc"
            value={card.cvc}
            onChange={handleChange}
            required
          />
          <Input
            label={t("form.expiryDate")}
            placeholder={t("form.expiryDatePlaceholder")}
            name="expiry"
            value={card.expiry}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4 sm:mt-6 flex justify-end md:mb-0 mb-4">
          <Button type="submit" disabled={handleDisable()}>
            {t("buttonText.saveCard")}
          </Button>
        </div>
      </form>

      {/* 3DS Payment Modal - Equivalent to WebPayModal in mobile app */}
      {webPaymentUrl && (
        <Dialog
          open={!!webPaymentUrl}
          onOpenChange={() => onWebPaymentCompleted()}
        >
          <DialogContent className="w-full max-w-4xl h-[90vh] p-0 flex flex-col">
            <div className="px-6 pt-6 pb-4 border-b">
              <DialogTitle>
                {t("orderSummary.completePayment") ||
                  "Complete Payment Authentication"}
              </DialogTitle>
            </div>
            <iframe
              src={webPaymentUrl}
              className="w-full flex-1 border-0"
              title="3DS Authentication"
              onLoad={(e) => {
                // Monitor for completion
                try {
                  const iframeUrl = e.target.contentWindow.location.href;
                  if (
                    iframeUrl.includes("success") ||
                    iframeUrl.includes("complete")
                  ) {
                    onWebPaymentCompleted();
                  }
                } catch (err) {
                  // Cross-origin restrictions - this is expected
                  console.log("Cannot access iframe URL due to CORS");
                }
              }}
            />
            <div className="px-6 py-4 border-t">
              <Button
                onClick={onWebPaymentCompleted}
                variant="outline"
                className="w-full"
              >
                {t("orderSummary.continue")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Processing/Result Dialog */}
      <Dialog open={process.isSuccess} onOpenChange={handleContinue}>
        <DialogContent
          showCloseIcon={true}
          className="w-[calc(100vw-32px)] max-w-[540px] h-auto min-h-[286px] sm:min-h-[438px] rounded-xl md:rounded-3xl flex flex_center flex-col px-4 md:px-8 lg:px-[60px] pt-10 md:pt-[60px] pb-6 md:pb-[60px] gap-6 md:gap-12 bg-main-50"
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
                  {t("orderSummary.cardProcessing")}
                </DialogTitle>
                <p className="text-base text-black-700">
                  {t("orderSummary.cardMessage")}
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
}

export default UserPaymentForm;
