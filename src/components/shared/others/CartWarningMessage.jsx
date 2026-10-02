import { WarningIcon } from "@/services";
import { useTranslation } from "react-i18next";

/**
 * Reusable warning message component for cart service
 * @param {Object} props
 * @param {"noDataSize" | "noDevices" | "notLoggedIn"} props.type - Type of warning message
 * @param {string} [props.customMessage] - Custom message to display (optional)
 */
const CartWarningMessage = ({ type, customMessage }) => {
  const { t } = useTranslation();

  const getMessage = () => {
    if (customMessage) return customMessage;

    switch (type) {
      case "noDataSize":
        return (
          t("extraText.noDataSizeAvailable") ||
          "No data size options available for this plan"
        );
      case "noDevices":
        return (
          t("myAccount.noDevicesFound") ||
          "No devices found. Please add a device to continue."
        );
      case "notLoggedIn":
        return (
          t("extraText.pleaseLogin") ||
          t("login.login") ||
          "Please login to continue"
        );
      default:
        return "";
    }
  };

  return (
    <div className="flex items-center gap-2 w-full py-2 border-light-red rounded-md pl-2 bg-light-red">
      <WarningIcon className="w-5 h-5 shrink-0" color="#F24144" />
      <p className="text-md text-main-600 font-medium">{getMessage()}</p>
    </div>
  );
};

export default CartWarningMessage;
