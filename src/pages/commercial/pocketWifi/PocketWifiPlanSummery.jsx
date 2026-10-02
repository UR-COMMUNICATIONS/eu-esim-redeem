// ===========================================
// PocketWifiPlanSummary.jsx
// ===========================================
import PocketWifiCartFooter from "@/components/commercial/pocketWifi/PocketWifiCartFooter";
import { createPlanSummaryComponent } from "@/components/shared/others/PlanSummary";
import { commercialRoutes } from "@/services";

const PocketWifiPlanSummary = createPlanSummaryComponent({
  type: "pocketWifi",
  FooterComponent: PocketWifiCartFooter,
  getRoutes: () => ({
    cartService: commercialRoutes.pocketWifiCartService.path,
    shippingOption: commercialRoutes.pocketWifiShippingOption.path,
    orderSummary: commercialRoutes.pocketWifiOrderSummery.path,
  }),
  showCountryTranslation: true,
  useSimplifiedLayout: false,
});

export default PocketWifiPlanSummary;
