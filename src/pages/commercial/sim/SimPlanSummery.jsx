// ===========================================
// SimPlanSummary.jsx
// ===========================================
import SimCartFooter from "@/components/commercial/sim/SimCartFooter";
import { createPlanSummaryComponent } from "@/components/shared/others/PlanSummary";
import { commercialRoutes } from "@/services";

const SimPlanSummary = createPlanSummaryComponent({
  type: "sim",
  FooterComponent: SimCartFooter,
  getRoutes: () => ({
    cartService: commercialRoutes.simCartService.path,
    shippingOption: commercialRoutes.simShippingOption.path,
    orderSummary: commercialRoutes.simOrderSummery.path,
  }),
  showCountryTranslation: false,
  useSimplifiedLayout: true, // SIM uses simpler layout
});

export default SimPlanSummary;
