import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { BackArrowIconFilled } from "@/services";

function OrderDetails() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { state } = useLocation();
  const order = state;
  console.log("user", user);

  const address = user?.address?.find((ads) => ads.id === order?.addressId);
  let userAddress = "--";
  if (address) {
    userAddress =
      address?.addressOne +
      " " +
      address?.addressTwo +
      " " +
      address?.country +
      " " +
      address?.zipCode;
  }

  console.log("state", order);

  return (
    <>
      {/* <MyAccount /> */}

      <div className="flex-1 flex flex-col gap-4 animate-fadeIn">
        {/* Top Card - Header with Arrow and Title */}
        {/* <div className="bg-white border-light rounded-[12px] shadow-sm"> */}
        <div
          className="cursor-pointer rounded-t-[12px] pt-4"
          onClick={() => navigate(-1)}
        >
          <h1 className="flex items-center gap-3 text-[24px] text-[#191919] mb-4 font-bold px-3 border-b border-[#E0E0E0] pb-4">
            <BackArrowIconFilled className="w-6 h-6" color="black" />
            {t("extraText.orderInformation")}
          </h1>
          {/* </div> */}
        </div>

        {/* Details Card */}
        <div className="bg-white border-light rounded-[12px] shadow-sm p-4 sm:p-6">
          <div className="text-[#191919] text-[14px] sm:text-[16px] space-y-3">
            <div className="flex justify-between">
              <span>{t("order.status")}</span>
              <span className="sm:text-[18px] text-[16px]">
                {order?.orderStatus || "--"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>{t("order.orderId")}</span>
              <span className="sm:text-[18px] text-[16px]">
                {order?.orderId || "--"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>{t("order.productName")}</span>
              <span className="sm:text-[18px] text-[16px]">
                {order?.planName || "--"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>{t("order.type")}</span>
              <span className="sm:text-[18px] text-[16px]">
                {order?.productType || "--"}
              </span>
            </div>

            {/* <div className="flex justify-between">
              <span>{t("order.coverage")}</span>
              <span className="sm:text-[18px] text-[16px]">null</span>
            </div> */}

            <div className="flex justify-between">
              <span>{t("order.orderDate")}</span>
              <span className="sm:text-[18px] text-[16px]">
                {order?.orderDate || "--"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>{t("order.quantity")}</span>
              <span className="sm:text-[18px] text-[16px]">
                {order?.noOfDevices || "--"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>{t("order.travelLocation")}</span>
              <span className="sm:text-[18px] text-[16px]">
                {order?.travelingTo || "--"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>{t("order.shippingType")}</span>
              <span className="sm:text-[18px] text-[16px]">
                {order?.shippingType || "--"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>{t("order.shippingAddress")}</span>
              <span className="sm:text-[18px] text-[16px]">
                {userAddress || "--"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>{t("order.travelStartDate")}</span>
              <span className="sm:text-[18px] text-[16px]">
                {order?.startDate || "--"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>{t("order.travelEndDate")}</span>
              <span className="sm:text-[18px] text-[16px]">
                {order?.endDate || "--"}
              </span>
            </div>

            {/* <div className="border-b border-[#E0E0E0] my-6" /> */}

            {/* <div className="flex justify-between">
              <span>{t("order.subtotal")}</span>
              <span className="sm:text-[18px] text-[16px]">--</span>
            </div>

            <div className="flex justify-between">
              <span>{t("order.discount")}</span>
              <span className="sm:text-[18px] text-[16px]">--</span>
            </div>

            <div className="flex justify-between">
              <span>{t("order.shippingFee")}</span>
              <span className="sm:text-[18px] text-[16px]">--</span>
            </div>

            <div className="flex justify-between">
              <span>{t("order.tax")}</span>
              <span className="sm:text-[18px] text-[16px]">--</span>
            </div> */}

            <div className="border-b border-[#E0E0E0] my-6" />

            <div className="flex justify-between text-[14px] sm:text-[16px]">
              <span>{t("order.total")}</span>
              <span className="sm:text-[24px] text-[18px] font-bold">
                ${order?.orderCharges || "--"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
