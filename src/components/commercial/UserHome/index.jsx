import Loader from "@/components/shared/Loader";
import useUserDevices from "@/hooks/useUserDevices";
import useUserOrders from "@/hooks/useUserOrders";
import { RightIcon, commercialRoutes } from "@/services";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeUserData from "./HomeUserData";
import HomeUserOrder from "./HomeUserOrder";

const UserHome = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Use the reusable hooks for fetching user data - hooks manage state
  const {
    fetchUserOrders,
    orders,
    isLoading: isLoadingOrders,
  } = useUserOrders();
  const {
    fetchUserDevices,
    devices,
    isLoading: isLoadingDevices,
  } = useUserDevices();

  // Fetch user orders and devices when user data is available
  useEffect(() => {
    if (user?.userId || user?.appUserId) {
      fetchUserOrders();
      fetchUserDevices();
    }
  }, [
    user?.userId,
    user?.appUserId,
    user?.phoneNumber,
    fetchUserOrders,
    fetchUserDevices,
  ]);

  // Limit data to first 4 for home view
  const displayedOrders = (orders || []).slice(0, 4);
  const displayedDevices = (devices || []).slice(0, 4);

  return (
    <div className="flex-1 bg-[#FAFAFA] rounded-[8px] pt-6 px-4 overflow-auto animate-fadeIn">
      {/* <div className="my-6">
        <Guidelines />
      </div> */}
      <div className="flex items-center  justify-between">
        <p className="font-bold sm:text-[24px] text-[18px]">
          {t(`myAccount.myDevice`)}
        </p>
        <div
          className="flex gap-1 items-center cursor-pointer"
          onClick={() => navigate(commercialRoutes.userData.path)}
        >
          <p className="text-[#F24144] text-[12px] font-medium">
            {" "}
            {t(`myAccount.viewAll`)}{" "}
          </p>
          <RightIcon className="h-3 w-4" color="#F24144" strokeWidth={1} />
        </div>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 lg:gap-8 mt-4">
        {isLoadingDevices ? (
          <div className="col-span-2 flex items-center justify-center py-8">
            <Loader
              type="Oval"
              color="#f24144"
              secondaryColor="#f24144"
              height={"50px"}
              width={"50px"}
            />
          </div>
        ) : displayedDevices.length > 0 ? (
          displayedDevices.map((device, index) => (
            <HomeUserData
              key={device.device_id || device.order_id || index}
              device={device}
            />
          ))
        ) : (
          <div className="col-span-2 text-center py-8 text-gray-500">
            {t("myAccount.noDevicesFound") || "No devices found"}
          </div>
        )}
      </div>
      <div className="flex items-center  justify-between pt-8">
        <p className="font-bold sm:text-[24px] text-[18px]">
          {t(`myAccount.myOrder`)}
        </p>
        <div
          className="flex gap-1 items-center cursor-pointer"
          onClick={() => navigate(commercialRoutes.userOrder.path)}
        >
          <p className="text-[#f24144] text-[12px] font-medium">
            {" "}
            {t(`myAccount.viewAll`)}{" "}
          </p>
          <RightIcon className="h-3 w-4" color="#f24144" strokeWidth={1} />
        </div>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 lg:gap-8 mt-4">
        {isLoadingOrders ? (
          <div className="col-span-2 flex items-center justify-center py-8">
            <Loader
              type="Oval"
              color="#f24144"
              secondaryColor="#f24144"
              height={"50px"}
              width={"50px"}
            />
          </div>
        ) : displayedOrders.length > 0 ? (
          displayedOrders.map((order, index) => (
            <HomeUserOrder key={order.orderId || index} order={order} />
          ))
        ) : (
          <div className="col-span-2 text-center py-8 text-gray-500">
            {t("myAccount.noOrdersFound") || "No orders found"}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHome;
