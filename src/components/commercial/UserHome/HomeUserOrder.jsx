import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/lib/utils";

const HomeUserOrder = ({ order }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || "en";

  // Handle navigation to order details
  const handleViewDetails = () => {
    navigate("/user-account/order-details", {
      state: order,
    });
  };

  // Get status color based on order status
  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower.includes("open") || statusLower.includes("active")) {
      return "text-[#56AD7E]";
    }
    if (statusLower.includes("completed")) {
      return "text-[#4F4F4F]";
    }
    if (statusLower.includes("cancelled") || statusLower.includes("failed")) {
      return "text-[#F24144]";
    }
    return "text-[#4F4F4F]";
  };

  // Format order ID (show last 5 characters if it's long)
  const formatOrderId = (orderId) => {
    if (!orderId) return "--";
    return orderId.length > 8 ? `...${orderId.slice(-5)}` : orderId;
  };

  if (!order) {
    return null;
  }

  return (
    <>
      <div className="bg-white border-light rounded-[12px] shadow-sm">
        <div className="flex justify-between pt-4 px-4">
          <div className="gap-1 flex">
            <p className="sm:text-[12px] text-[12px] text-[#888888]">
              {t(`order.status`)}
            </p>
            <p
              className={`sm:text-[14px] text-[14px] ${getStatusColor(order.orderStatus)}`}
            >
              {order.orderStatus || "N/A"}
            </p>
          </div>
          <div className="gap-1 flex">
            <p className="sm:text-[12px] text-[12px] text-[#888888]">
              {t(`order.orderId`)}
            </p>
            <p className="sm:text-[14px] text-[14px] text-[#191919]">
              {formatOrderId(order.orderId)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4">
          <div className="flex-1">
            <h1 className="font-semibold sm:text-[16px] text-[14px]">
              {order.planName || order.productName || "N/A"}
            </h1>
            {order.travelingTo && (
              <div className="inline-flex items-center justify-center border border-[#BDBDBD] rounded-full px-3 sm:px-4 py-1 sm:py-1.5 my-4">
                <p className="font-normal text-[12px] sm:text-[14px] text-[#4F4F4F] leading-tight whitespace-nowrap">
                  {order.travelingTo}
                </p>
              </div>
            )}
            <div>
              <div className="flex justify-between">
                {order.startDate && (
                  <div>
                    <p className="sm:text-[10px] text-[10px] text-[#888888]">
                      {t(`extraText.startDate`)}
                    </p>
                    <p className="sm:text-[12px] text-[12px]">
                      {formatDate(order.startDate, currentLanguage) ||
                        order.startDate}
                    </p>
                  </div>
                )}
                {order.endDate && (
                  <div>
                    <p className="sm:text-[10px] text-[10px] text-[#888888]">
                      {t(`extraText.endDate`)}
                    </p>
                    <p className="sm:text-[12px] text-[12px]">
                      {formatDate(order.endDate, currentLanguage) ||
                        order.endDate}
                    </p>
                  </div>
                )}
                {order.shippingType && (
                  <div>
                    <p className="sm:text-[10px] text-[10px] text-[#888888]">
                      {t(`myAccount.deliveryType`)}
                    </p>
                    <p className="sm:text-[12px] text-[12px]">
                      {order.shippingType}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="border-light border-t pt-4 mt-4 p-4">
          <div className="flex gap-3 justify-end items-end">
            <Button
              onClick={handleViewDetails}
              className="!py-3 !bg-transparent !text-[#191919] !border-[#191919] !border"
            >
              {t(`myAccount.viewDetails`)}
            </Button>
            {/* <Button className="!py-3">{t(`myAccount.addDevice`)}</Button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeUserOrder;
