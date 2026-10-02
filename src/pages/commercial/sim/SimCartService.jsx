// ===========================================
// SimCartService.jsx
// ===========================================
import WifiDevices from "@/components/commercial/pocketWifi/cartService/WifiDevices";
import NumberOfDays from "@/components/commercial/sim/cartService/NumberOfDays";
import SimInformation from "@/components/commercial/sim/cartService/SimInformation";
import SimCartFooter from "@/components/commercial/sim/SimCartFooter";
import { createCartServiceComponent } from "@/components/shared/others/CartService";
import { commercialRoutes } from "@/services";

const SimCartService = createCartServiceComponent({
  type: "sim",
  FooterComponent: SimCartFooter,
  DeviceComponent: WifiDevices,
  DaysComponent: NumberOfDays,
  InfoComponent: SimInformation,
  getRoutes: () => ({
    plan: commercialRoutes.simPlan.path,
    planSummary: commercialRoutes.simPlanSummery.path,
    home: commercialRoutes.home.path,
  }),
  hasDaysSelection: true,
  hasDatePicker: false,
  showRefurbishedWarning: false,
  deviceProductType: null, // Don't filter by productType for SIM
  quantityLabel: "extraText.noOfSimESim",
});

export default SimCartService;
