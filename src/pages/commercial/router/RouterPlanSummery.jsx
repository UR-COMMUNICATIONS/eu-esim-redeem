// ===========================================
// RouterPlanSummary.jsx
// ===========================================
import RouterCartFooter from "@/components/commercial/router/RouterCartFooter";
import { createPlanSummaryComponent } from "@/components/shared/others/PlanSummary";
import { commercialRoutes } from "@/services";

const RouterPlanSummary = createPlanSummaryComponent({
  type: "router",
  FooterComponent: RouterCartFooter,
  getRoutes: () => ({
    cartService: commercialRoutes.routerCartService.path,
    shippingOption: commercialRoutes.routerShippingOption.path,
    orderSummary: commercialRoutes.routerOrderSummery.path,
  }),
  showCountryTranslation: true,
  useSimplifiedLayout: false,
});

export default RouterPlanSummary;
