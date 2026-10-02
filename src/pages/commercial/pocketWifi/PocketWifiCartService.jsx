// ===========================================
// PocketWifiCartService.jsx
// ===========================================
import WifiDevices from "@/components/commercial/pocketWifi/cartService/WifiDevices";
import ServiceDate from "@/components/commercial/pocketWifi/cartService/ServiceDate";
import PocketWifiCartFooter from "@/components/commercial/pocketWifi/PocketWifiCartFooter";
import { createCartServiceComponent } from "@/components/shared/others/CartService";
import { commercialRoutes } from "@/services";

const PocketWifiCartService = createCartServiceComponent({
  type: "pocketWifi",
  FooterComponent: PocketWifiCartFooter,
  DeviceComponent: WifiDevices,
  DateComponent: ServiceDate,
  getRoutes: () => ({
    plan: commercialRoutes.pocketWifiPlan.path,
    planSummary: commercialRoutes.pocketWifiPlanSummery.path,
    home: commercialRoutes.home.path,
  }),
  hasDaysSelection: false,
  hasDatePicker: true,
  showRefurbishedWarning: true,
  deviceProductType: "D",
  quantityLabel: "extraText.noOfRentalDevices",
});

export default PocketWifiCartService;
