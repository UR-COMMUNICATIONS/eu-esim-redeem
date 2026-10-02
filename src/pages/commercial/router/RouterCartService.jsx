// ===========================================
// RouterCartService.jsx
// ===========================================
import WifiDevices from "@/components/commercial/pocketWifi/cartService/WifiDevices";
import ServiceDate from "@/components/commercial/pocketWifi/cartService/ServiceDate";
import RouterCartFooter from "@/components/commercial/router/RouterCartFooter";
import { createCartServiceComponent } from "@/components/shared/others/CartService";
import { commercialRoutes } from "@/services";

const RouterCartService = createCartServiceComponent({
  type: "router",
  FooterComponent: RouterCartFooter,
  DeviceComponent: WifiDevices,
  DateComponent: ServiceDate,
  getRoutes: () => ({
    plan: commercialRoutes.routerPlan.path,
    planSummary: commercialRoutes.routerPlanSummery.path,
    home: commercialRoutes.home.path,
  }),
  hasDaysSelection: false,
  hasDatePicker: true,
  showRefurbishedWarning: true,
  deviceProductType: "D",
  quantityLabel: "extraText.noOfRentalDevices",
});

export default RouterCartService;