import Products from "@/components/commercial/home/Products";
import Description from "@/components/commercial/sim/home/Description";
import DeviceCompability from "@/components/commercial/sim/home/DeviceCompability";
import Hero from "@/components/commercial/sim/home/Hero";
import HowToSetup from "@/components/commercial/sim/home/HowToSetup";
import HowToTopUp from "@/components/commercial/sim/home/HowToTopUp";
import KeyFeatures from "@/components/commercial/sim/home/KeyFeatures";
import StepToActiveSim from "@/components/commercial/sim/home/StepToActiveSim";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";

function Home() {
  const { currentCountry } = useUserLocationLanguage();
  return (
    <section className="overflow-x-hidden overflow-y-hidden mb-12">
      <Hero />
      <Description />
      <KeyFeatures />
      <HowToSetup />
      <StepToActiveSim />
      <DeviceCompability />
      <HowToTopUp />
      {/* <OtherProducts /> */}
      {currentCountry !== "id" && <Products type="S" />}
    </section>
  );
}

export default Home;
