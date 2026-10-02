import { useState, useEffect, useRef } from "react";
import { useApiService } from "@/general";
import { modulesURLPath } from "@/constants/urls";
import { encryptData } from "@/general/encryption";

const usePaymentApis = () => {
  const paramsRef = useRef(null);
  const [pgw, setPgw] = useState(null);
  const [pgwCharges, setCharges] = useState(null);
  const { Payment, Order, charges } = modulesURLPath;

  const getOrderCharges = useApiService({
    apiCall: charges.orderCharges,
    apiName: "orderChagres",
    setCallBack: (res) => {
      if (res?.result) {
        console.log("res?.charges?", res?.charges);
        setCharges(res?.charges?.charges || 0);
      } else {
        setCharges(res);
      }
    },
  });

  const getPaymentGateway = useApiService({
    apiCall: Payment.getPgw,
    apiName: "getPgw",
    setCallBack: (res) => {
      if (res?.result) {
        setPgw(res?.data?.pgw);
      }
    },
  });

  const fetchGateway = (params) => {
    console.log("params", params);
    paramsRef.current = params;
    const { appUserId = "", userId = "" } = params;
    getPaymentGateway({
      appUserId,
      userId,
      data: encryptData({
        appUserId,
        userId,
      }),
    });
  };

  useEffect(() => {
    if (pgw) {
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
      } = paramsRef.current;

      getOrderCharges({
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
      });
    }
  }, [pgw]);

  useEffect(() => {}, []);

  return {
    fetchGateway,
    pgw,
    pgwCharges,
  };
};

export default usePaymentApis;
