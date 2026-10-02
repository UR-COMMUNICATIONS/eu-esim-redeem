import PocketWifiCartFooter from "@/components/commercial/pocketWifi/PocketWifiCartFooter";
import { createOrderSummaryComponent } from "@/components/shared/others/OrderSummary";
import { commercialRoutes } from "@/services";

const PocketWifiOrderSummary = createOrderSummaryComponent({
  type: "pocketWifi",
  FooterComponent: PocketWifiCartFooter,
  getRoutes: () => {
    return {
      planSummary: commercialRoutes.pocketWifiPlanSummery.path,
      shippingOption: commercialRoutes.pocketWifiShippingOption.path,
      termsService: commercialRoutes.termsService.path,
      privacyPolicy: commercialRoutes.privacyPolicy.path,
    };
  },
  showAppDownload: false,
  useLocalizedNamespace: true,
});

export default PocketWifiOrderSummary;
