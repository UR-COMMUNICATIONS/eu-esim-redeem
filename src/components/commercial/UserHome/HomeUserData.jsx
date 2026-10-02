import { japanDeviceGrey, sim } from "@/services/images";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HomeUserData = ({ device }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Handle navigation to device details
  const handleViewDetails = () => {
    if (device) {
      navigate("/user-account/data-details", {
        state: device,
      });
    }
  };

  // Get device image based on device type
  const getDeviceImage = () => {
    if (!device?.device_type) return japanDeviceGrey;
    const deviceType = device.device_type?.toLowerCase();
    return ["s", "e"].includes(deviceType) ? sim : japanDeviceGrey;
  };

  if (!device) {
    return null;
  }

  return (
    <>
      <div
        className="bg-white border-light rounded-[12px] shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
        onClick={handleViewDetails}
      >
        <div className="flex items-center gap-4">
          <img
            src={getDeviceImage()}
            alt="Device"
            className="w-[48px] h-[86px] object-contain shrink-0"
          />
          <div className="flex-1">
            <p className="font-medium sm:text-[16px] text-[14px] mb-2">
              {device.plan_name || t(`myAccount.myDevice`)}
            </p>
            <div className="border-b border-[#E0E0E0] my-2" />
            <div className="flex justify-between mb-1">
              <span className="sm:text-[14px] text-[12px] text-[#888888]">
                {t(`myAccount.id`)}
              </span>
              <span className="sm:text-[16px] text-[14px] font-medium break-all">
                {device.device_id || "--"}
              </span>
            </div>

            {device.wifi_pwd && (
              <div className="flex justify-between">
                <span className="sm:text-[14px] text-[12px] text-[#888888]">
                  {t(`myAccount.password`)}:
                </span>
                <span className="sm:text-[16px] text-[14px] font-medium">
                  {device.wifi_pwd}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeUserData;
