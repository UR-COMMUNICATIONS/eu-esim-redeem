// import Products from "@/components/commercial/home/Products";
import ConnectedWay from "@/components/commercial/pocketWifi/home/ConnectedWay";
import Description from "@/components/commercial/pocketWifi/home/Description";
import DoesItWork from "@/components/commercial/pocketWifi/home/DoesItWork";
import Hero from "@/components/commercial/pocketWifi/home/Hero";
// import HowToConnect from "@/components/commercial/pocketWifi/home/HowToConnect";
import Included from "@/components/commercial/pocketWifi/home/Included";
import Indicators from "@/components/commercial/pocketWifi/home/Indicators";
import KeyFeatures from "@/components/commercial/pocketWifi/home/KeyFeatures";
// import OtherProducts from "@/components/commercial/pocketWifi/home/OtherProducts";
// import PlanTopUp from "@/components/commercial/pocketWifi/home/PlanTopUp";
import PocketWiFiRental from "@/components/commercial/pocketWifi/home/PocketWiFiRental";
import RecomendedPackage from "@/components/shared/others/RecomendedPackage";
// import ReturnDevice from "@/components/commercial/pocketWifi/home/ReturnDevice";
// import useExternalPromo from "@/hooks/useExternalPromo";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";

function Home() {
  const { currentCountry, isTargetCountry, idNull, HowToConnectNull } =
    useUserLocationLanguage();
  return (
    <section className="overflow-x-hidden">
      <Hero />
      <Description />
      <RecomendedPackage devType="D" imgType="D" />
      <KeyFeatures />
      <ConnectedWay />
      <Included />
      <Indicators />
      <DoesItWork />
      <PocketWiFiRental />
      {/* {!HowToConnectNull && <HowToConnect />} */}
      {/* <HowToConnect /> */}
      {/* {!idNull && <ReturnDevice />} */}
      {/* <ReturnDevice /> */}
      {/* <PlanTopUp /> */}
      {/* <OtherProducts /> */}
      {/* {!isTargetCountry && <Products type="D" />} */}
    </section>
  );
}

export default Home;
