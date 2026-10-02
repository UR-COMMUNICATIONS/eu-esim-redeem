import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateExternal, dateformat, singenservice } from "@/general";

import { setCartData } from "@/store/module/cart/cartSlice";
import usePaymentApis from "@/hooks/usePaymentApis";
import KolOrder from "./KolOrder";
import { useNavigate } from "react-router-dom";
import { brandRoutes } from "@/services";
import ApiService from "@/general/apiClient";
import { modulesURLPath } from "@/constants/urls";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const PocketWifiOrder = ({ comp }) => {
  const { t } = useTranslation();
  const reqRef = useRef(null);
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

  const { fetchGateway, pgwCharges } = usePaymentApis();

  const createRequest = (planInfo, variation, user) => {
    console.log("createRequest");
    const date = dateformat(null);
    const startDate = userInfo?.startDate || date;
    const adsLength = user?.address?.length || 1;
    let request = {
      orderType: "rent",
      shippingType: "Domestic",
      deviceType: "D",
      shippingCharges: 0,
      promoCode: cart?.promoCode || "",
      cardId: 0,
      quantity: 1,
      startDate: startDate,
      endDate: dateExternal(startDate, 13),
      planCode: planInfo?.planCode,
      packageCode: variation?.packageCode,
      variationId: Number(variation?.variationId),
      addressId: user?.address?.[adsLength - 1]?.id || 0,
      locationCode: userInfo?.locationCode,
      travelingTo: [userInfo?.locationCode],
      travelDetails: [
        {
          startDate: userInfo?.startDate,
          endDate: dateExternal(userInfo?.startDate, 13),
          locationCode: userInfo?.locationCode,
          travelLocation: userInfo?.travelLocation,
        },
      ],
      language: "en",
      appUserId: user?.appUserId,
      userId: user?.userId,
      supCharges: false,
    };
    //  const { userId, appUserId, ...rest } = user
    reqRef.current = request;
    fetchGateway(request);
  };

  const submitRequest = (request) => {
    console.log("FINAL REQUEST", request);
    // setTimeout(() => {
    //   const res = {
    //     "result": true,
    //     "errorCode": "ORDER_SUCCESS",
    //     "message": "Order processed successfully",
    //     "orderId": "2179-79866717433532575",
    //     "data": null
    //   }
    //   dispatch(setCartData({ isCallFreeEsim: false }));
    //   // const esims = [{
    //   //   "smdp": "rsp-eu.simlessly.com",
    //   //   "planName": "Complimentary eSIM 3GB 15 Days",
    //   //   "qrCode": "9000025081254830.png",
    //   //   "iccid": "9000025081254830",
    //   //   "activationCode": "32CC8D926C0EB7E67A9BB149735C2254"
    //   // }]
    //   // dispatch(setCartData({ esimDetails: esims }));

    //   // setOrderId(res?.orderId)
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
        console.log("Order response", { res });
        // setOrderId(res?.orderId)
        dispatch(setCartData({ isCallFreeEsim: false }));
        if (comp == "euwifi") {
          const order = {
            app_user_id: request.appUserId,
            device_id: userInfo.deviceId.replace(/\s+/g, ""),
            order_id: res.orderId,
            order_type: request.orderType,
            tracking_no: null,
            tracking_url: null,
            shipping_type: request.shippingType,
            address: request.addressId,
            user_id: request.userId,
            card_id: 123,
            flow_type: "normal",
            token_id: 123,
            promoCode: request.promoCode,
            request_source: "eu",
            fromCRM: true,
          };
          console.log("order", order);
          singenservice(order, "/order/UpdateAssignDevices")
            .then((res) => {
              console.log("UPDATE ASSIGNED DEVICE API RES :", res);
              if (res.status.result) {
                setProcess({
                  // ...prev,
                  isProcessing: false,
                  isSuccess: true,
                  title: res?.status?.result
                    ? t("orderSummary.orderConfirmed")
                    : t("orderSummary.orderFailed"),
                  alertType: res?.status?.result ? "success" : "error",
                  alertMessage:
                    res?.status?.message || t("orderSummary.somethingWrong"),
                });
              } else {
                setProcess({
                  // ...prev,
                  isProcessing: false,
                  isSuccess: true,
                  title: res?.status?.result
                    ? t("orderSummary.orderConfirmed")
                    : t("orderSummary.orderFailed"),
                  alertType: res?.status?.result ? "success" : "error",
                  alertMessage:
                    res?.status?.message || t("orderSummary.somethingWrong"),
                });
              }
            })
            .catch((error) => {
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
            });
        } else {
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

  useEffect(() => {
    console.log("pgwCharges", pgwCharges);
    if (typeof pgwCharges === "object" && pgwCharges !== null) {
      setProcess({
        // ...prev,
        isProcessing: false,
        isSuccess: true,
        title: pgwCharges?.result
          ? t("orderSummary.orderConfirmed")
          : t("orderSummary.orderFailed"),
        alertType: pgwCharges?.result ? "success" : "error",
        alertMessage: pgwCharges?.message || t("orderSummary.somethingWrong"),
      });
      return;
    }

    if (![undefined, null].includes(pgwCharges)) {
      let request = reqRef.current;
      request = {
        ...request,
        pgwCharges,
      };
      console.log("reqObj", request);

      dispatch(
        setCartData({
          cartType: "R",
          travelDetails: request.travelDetails,
          estimation: {
            requestType: request.requestType,
            planCode: request.planCode,
            planName: request.planName,
            estimatedCost: request.pgwCharges,
            costToDisplayInSummary: request.pgwCharges,
            noOfDevices: request.quantity,
            countryCode: user?.originCountry || "SG",
          },
        }),
      );
      if (
        [
          "sqfairid",
          "obaja",
          "obaja2026",
          "wita",
          "wita2026",
          "avia",
          "avia2026",
          "gdrama26",
          "panorama26",
          "euwifi",
        ].includes(comp)
      ) {
        // request.supCharges = true;
        request.pgw = "2c2p";
        submitRequest(request);
      } else {
        navigate(`/${comp}/${brandRoutes.brandOrderSummary.path}`);
      }
    } else {
      dispatch(setCartData({ package: null, variation: null }));
    }
  }, [pgwCharges]);

  return (
    <>
      <KolOrder
        comp={comp}
        onCreateRequest={createRequest}
        parentProcess={process}
      />
    </>
  );
};

export default PocketWifiOrder;
