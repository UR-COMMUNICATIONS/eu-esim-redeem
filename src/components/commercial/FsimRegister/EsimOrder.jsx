import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateExternal, dateformat, useDisApi } from "@/general";

import { setCartData } from "@/store/module/cart/cartSlice";
import KolOrder from "./KolOrder";
import { useNavigate } from "react-router-dom";
import ApiService from "@/general/apiClient";
import { modulesURLPath } from "@/constants/urls";
import { useTranslation } from "react-i18next";

const EsimOrder = ({ comp, skipActivation, onSuccess, onFailure }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo, user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const [process, setProcess] = useState({
    title: "",
    alertMessage: "",
    alertType: "",
    isProcessing: true,
    isSuccess: false,
  });

  const esimActivation = useDisApi({
    apiCall: "activateEsim",
    setCallBack: (res) => {
      dispatch(setCartData({ esimDetails: res?.esims || [] }));
    },
  });

  const createRequest = (planInfo, variation, user) => {
    console.log("createRequest esim");
    const date = dateformat(null);
    let request = {
      orderType: "buy-esim",
      shippingType: "self",
      deviceType: "E",
      shippingCharges: 0,
      promoCode: cart?.promoCode || "",
      cardId: 0,
      quantity: 1,
      startDate: date, //userInfo?.startDate,
      endDate: dateExternal(date, 29),
      planCode: planInfo?.planCode,
      packageCode: variation?.packageCode,
      variationId: Number(variation?.variationId),
      addressId: 0,
      locationCode: userInfo?.locationCode,
      travelingTo: [userInfo?.locationCode],
      travelDetails: [
        {
          startDate: date, //userInfo?.startDate,
          endDate: dateExternal(date, 29), //dateExternal(userInfo?.startDate, 30),
          locationCode: userInfo?.locationCode,
          travelLocation: userInfo?.travelLocation,
        },
      ],
      language: "en",
      pgw: "crpc",
      appUserId: user?.appUserId,
      userId: user?.userId,
      // supCharges: true,
    };
    submitRequest(request);
  };

  const submitRequest = (request) => {
    console.log("FINAL REQUEST", request);
    // setTimeout(() => {
    //     const res = {
    //         "result": true,
    //         "errorCode": "ORDER_SUCCESS",
    //         "message": "Order processed successfully",
    //         "orderId": "2179-79866717433532575",
    //         "data": null
    //     }
    //     dispatch(setCartData({ isCallFreeEsim: false }));
    //     const esims = [{
    //         "smdp": "rsp-eu.simlessly.com",
    //         "planName": "Complimentary eSIM 3GB 15 Days",
    //         "qrCode": "9000025081254830.png",
    //         "iccid": "9000025081254830",
    //         "activationCode": "32CC8D926C0EB7E67A9BB149735C2254"
    //     }]
    //     dispatch(setCartData({ esimDetails: esims }));

    //     // setOrderId(res?.orderId)
    //     setProcess({
    //         // ...prev,
    //         isProcessing: false,
    //         isSuccess: true,
    //         title: res?.result
    //             ? t('orderSummary.orderConfirmed')
    //             : t('orderSummary.orderFailed'),
    //         alertType: res?.result ? 'success' : 'error',
    //         alertMessage: res?.message || t('orderSummary.somethingWrong'),
    //     });
    // }, 4000);

    ApiService.request(modulesURLPath.Order.placeOrder, request)
      .then((res) => {
        // console.log("Order response", { res })
        // Campaigns that hand activation to the app place the order only —
        // no activateEsim, so cart.esimDetails stays empty and no QR is shown.
        if (res?.result || res?.status?.result) {
          if (!skipActivation) {
            esimActivation({
              requestType: "activateEsim",
              orderId: res?.orderId,
              userId: user?.userId,
              appUserId: user?.appUserId,
            });
          }
          // setOrderId(res?.orderId)
          dispatch(setCartData({ isCallFreeEsim: false }));
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
        }
        else {
          dispatch(setCartData({ isCallFreeEsim: false }));
          setProcess({
            // ...prev,
            isProcessing: false,
            isSuccess: false,
            title: t("orderSummary.orderFailed"),
            alertType: "error",
            alertMessage: res?.message || res?.status?.message || t("orderSummary.somethingWrong"),
          });
        }
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
      });
  };

  return (
    <>
      <KolOrder
        comp={comp}
        onCreateRequest={createRequest}
        parentProcess={process}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </>
  );
};

export default EsimOrder;
