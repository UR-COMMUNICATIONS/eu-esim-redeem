import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { do2c2pPayment, useDisApi } from "@/general";
import { BackArrowIcon, ErrorIcon, SuccessIcon } from "@/services";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
// import { clientID } from "@/general/keys";
import { setCartData } from "@/store/module/cart/cartSlice";
// import Loader from "../Loader";
import Loader from "@/components/shared/Loader";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

function AddNewCards() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [webPaymentUrl, setWebPaymentUrl] = useState(null);
  const [card, setCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
  });
  const [process, setProcess] = useState({
    title: "",
    alertMessage: "",
    alertType: "",
    isProcessing: false,
    isSuccess: false,
  });
  const cardRef = useRef();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCard((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDisable = () => {
    const isActive =
      card.name && card.number && card.expiry && card.cvc ? true : false;
    return !isActive;
  };

  const handleContinue = () => {
    setProcess({
      ...process,
      isProcessing: false,
      isSuccess: false,
      title: "",
      alertType: "",
      alertMessage: "",
    });
  };

  const getPaymentStatus = useDisApi({
    apiCall: "getPaymentStatus",
    setCallBack: async (res) => {
      if (res?.status?.result) {
        dispatch(setCartData({ isNewCardAdded: true }));
        setProcess({
          ...process,
          isProcessing: false,
          isSuccess: true,
          title: t("orderSummary.cardAdded"),
          alertType: "success",
          alertMessage: res?.status?.message,
        });
      } else {
        console.log("error", res?.status?.message);
        setProcess({
          ...process,
          isProcessing: false,
          isSuccess: true,
          title: t("orderSummary.cardFailed"),
          alertType: "error",
          alertMessage: res?.status?.message,
          // alertMessage: t("orderSummary.somethingWrong")
        });
      }
    },
  });

  const getPaymentToken = useDisApi({
    apiCall: "getPaymentToken",
    setCallBack: async (res) => {
      if (res?.status?.result) {
        const request = cardRef.current;
        request["paymentToken"] = res.paymentToken;
        const paymentResp = await do2c2pPayment(request);
        console.log("2c2p Resp", paymentResp);
        if (paymentResp.respCode === "2000") {
          // onWebPaymentCompleted();
          getPaymentStatus({
            invoiceNo: paymentResp.invoiceNo,
            currency: res.currency,
          });
        }
        // else if (["1000", "1001", "1002"].includes(paymentResp.respCode)) {
        //   setWebPaymentUrl(paymentResp.data);
        // }
        else {
          setProcess({
            ...process,
            isProcessing: false,
            isSuccess: true,
            title: t("orderSummary.cardFailed"),
            alertType: "error",
            alertMessage: paymentResp.respDesc,
          });
        }
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setProcess({ ...process, isProcessing: true, isSuccess: true });
      const expiry = card.expiry.split("/");
      const updatedCard = {
        ...card,
        exp_month: expiry[0] ? expiry[0] : null,
        exp_year: expiry[1] ? "20" + expiry[1] : null,
      };
      const clientID = import.meta.env.VITE_clientID;
      const request = {
        paymentToken: "",
        clientID: clientID,
        locale: "en",
        payment: {
          code: {
            channelCode: "CC",
          },
          data: {
            name: updatedCard.name,
            email: user.userId,
            cardNo: updatedCard.number.replace(/\s/g, ""),
            expiryMonth: updatedCard.exp_month,
            expiryYear: updatedCard.exp_year,
            securityCode: updatedCard.cvc,
            cardTokenize: true,
          },
        },
      };
      cardRef.current = request;
      getPaymentToken({ userId: user.userId, userName: updatedCard.name });
    } catch (e) {
      console.log("e", e);
    }
  };

  // const onWebPaymentCompleted = async () => {
  //   const statusResp = await getPaymentStatus(tokenData.invoiceNo, tokenData.currency);
  //   setIsLoading(false);
  //   setWebPaymentUrl(null);
  //   if (statusResp.status.result) {
  //     // Analytics.logEvent('add_credit_card', {});
  //     showCustomDialog({
  //       type: 'success',
  //       title: appTranslate('success'),
  //       description: 'Card added successfully!',
  //       onConfirmButtonPress: () => {
  //         navigation.goBack();
  //       }
  //     });
  //   }
  //   else {
  //     handleError(statusResp.status.message);
  //   }
  // };

  return (
    <div className="xl:px-10 lg:py-10 flex gap-8 sec_common_user_80">
      <MyAccount />
      <div className="flex-1 bg-[#FAFAFA] rounded-[8px] pt-6 px-4 animate-fadeIn">
        <div className="cursor-pointer" onClick={() => navigate(-1)}>
          <h1 className="flex items-center gap-3 text-[24px] text-[#191919] mb-4 font-bold px-3 border-b border-[#E0E0E0] pb-4">
            <BackArrowIcon
              className="w-6 h-6 cursor-pointer"
              color="black"
              strokeWidth={1}
            />
            {t(`myAccount.addNewCards`)}
          </h1>
        </div>
        <div className="flex flex-col gap-4 mt-8">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="w-full">
                <Input
                  className="w-full"
                  label={
                    <span>
                      {t("myAccount.nameonCards")}
                      <span className="text-[#E41F26]">*</span>
                    </span>
                  }
                  placeholder={t("form.cardholderNamePlaceholder")}
                  name="name"
                  value={card.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full">
                <Input
                  className="w-full appearance-none"
                  type="number"
                  label={
                    <span>
                      {t("myAccount.cardNumber")}
                      <span className="text-[#E41F26]">*</span>
                    </span>
                  }
                  placeholder={t("form.cardNumberPlaceholder")}
                  name="number"
                  value={card.number}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full mt-4">
              <div className="w-full">
                <Input
                  className="w-full"
                  type="number"
                  label={
                    <span>
                      {t("myAccount.cvc")}
                      <span className="text-[#E41F26]">*</span>
                    </span>
                  }
                  placeholder={t("form.cvcCvvPlaceholder")}
                  name="cvc"
                  value={card.cvc}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full">
                <Input
                  className="w-full"
                  label={
                    <span>
                      {t("myAccount.expiry")}
                      <span className="text-[#E41F26]">*</span>
                    </span>
                  }
                  placeholder={t("form.expiryDatePlaceholder")}
                  name="expiry"
                  value={card.expiry}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <p className="text-[#191919] text-[12px] font-normal pt-6">
              {t(`myAccount.chargedFee`)}
            </p>
            <div className="my-12 flex md:justify-start justify-center">
              <Button type="submit" disabled={handleDisable()}>
                {t("myAccount.addCard")}
              </Button>
            </div>
          </form>
        </div>

        <Dialog open={process.isSuccess} onOpenChange={handleContinue}>
          <DialogContent
            showCloseIcon={true}
            className="w-[calc(100vw-32px)] max-w-[540px] h-auto min-h-[286px] sm:min-h-[438px] rounded-xl md:rounded-3xl flex flex_center flex-col px-4 md:px-8 lg:px-[60px] pt-10 md:pt-[60px] pb-6 md:pb-[60px] gap-6 md:gap-12 bg-main-50"
          >
            {process.isProcessing ? (
              <div className="flex flex-col gap-6">
                <Loader
                  type="Oval"
                  color="#f24144"
                  secondaryColor="#f24144"
                  height={100}
                  width={100}
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
                  className="px-10 py-4 bg-[#f24144] text-white rounded-xl max-w-max mx-auto outline-none border-none"
                >
                  {t("orderSummary.continue")}
                </DialogClose>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default AddNewCards;
