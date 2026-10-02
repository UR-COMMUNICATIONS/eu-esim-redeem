import PocketWifiCartFooter from "@/components/commercial/pocketWifi/PocketWifiCartFooter";
import { createOrderSummaryComponent } from "@/components/shared/others/OrderSummary";
import { commercialRoutes } from "@/services";
import { useParams } from "react-router-dom";

const FsimOrderSummary = () => {
  const { brand } = useParams();
  const comp = brand?.toLowerCase();

  const OrderSummary = createOrderSummaryComponent({
    type: "pocketWifi",
    FooterComponent: PocketWifiCartFooter,
    getRoutes: () => {
      const isEuWifi = comp === "euwifi";
      return {
        home: `/${comp}`,
        planSummary: commercialRoutes.pocketWifiPlanSummery.path,
        shippingOption: `/${comp}`, //commercialRoutes.kol.path,
        termsService: isEuWifi
          ? commercialRoutes.euTermsAndConditions.path
          : commercialRoutes.termsService.path,
        privacyPolicy: isEuWifi
          ? commercialRoutes.euPrivacyPolicy.path
          : commercialRoutes.privacyPolicy.path,
      };
    },
    showAppDownload: false,
    useLocalizedNamespace: true,
  });

  return (
    <div className="w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-lg w-full h-full">
        <OrderSummary />
      </div>
    </div>
  );
};

// const FsimOrderSummary = createOrderSummaryComponent({
//     type: "pocketWifi",
//     FooterComponent: PocketWifiCartFooter,
//     getRoutes: () => {
//         return {
//             planSummary: commercialRoutes.pocketWifiPlanSummery.path,
//             shippingOption: commercialRoutes.kol.path,
//             termsService: commercialRoutes.termsService.path,
//             privacyPolicy: commercialRoutes.privacyPolicy.path,
//         };
//     },
//     showAppDownload: false,
//     useLocalizedNamespace: true,
// });

export default FsimOrderSummary;
