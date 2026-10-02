import RouterCartFooter from "@/components/commercial/router/RouterCartFooter";
import { createOrderSummaryComponent } from "@/components/shared/others/OrderSummary";
import { commercialRoutes } from "@/services";

const RouterOrderSummary = createOrderSummaryComponent({
  type: "router",
  FooterComponent: RouterCartFooter,
  getRoutes: () => {
    return {
      planSummary: commercialRoutes.routerPlanSummery.path,
      shippingOption: commercialRoutes.routerShippingOption.path,
      termsService: commercialRoutes.termsService.path,
      privacyPolicy: commercialRoutes.privacyPolicy.path,
    };
  },
  showAppDownload: false,
  useLocalizedNamespace: true,
});

export default RouterOrderSummary;
