import SimCartFooter from "@/components/commercial/sim/SimCartFooter";
import { createOrderSummaryComponent } from "@/components/shared/others/OrderSummary";
import { commercialRoutes } from "@/services";

const SimOrderSummary = createOrderSummaryComponent({
  type: "sim",
  FooterComponent: SimCartFooter,
  // Use getter function - commercialRoutes is imported only when needed
  getRoutes: () => {
    return {
      planSummary: commercialRoutes.simPlanSummery.path,
      shippingOption: commercialRoutes.simShippingOption.path,
      termsService: commercialRoutes.termsService.path,
      privacyPolicy: commercialRoutes.privacyPolicy.path,
    };
  },
  showAppDownload: false,
  useLocalizedNamespace: true,
});

export default SimOrderSummary;
