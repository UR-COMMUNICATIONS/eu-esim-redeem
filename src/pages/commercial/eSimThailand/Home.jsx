import HowToGet from "@/components/commercial/sim/eSimThailand/HowToGet";
import Description from "@/components/commercial/sim/eSimThailand/Description";
import SimFeatures from "@/components/commercial/sim/eSimThailand/SimFeatures";
import ThingsToKnow from "@/components/commercial/sim/eSimThailand/ThingsToKnow";
import SupportAndFAQ from "@/components/commercial/sim/eSimThailand/SupportAndFAQ";
import HeroCommon from "@/components/shared/others/HeroCommon";
import { useTranslation } from "react-i18next";
import SimComparison from "@/components/commercial/sim/eSimThailand/SimComparison";
import SetupActivationGuide from "@/components/commercial/sim/eSimThailand/SetupActivationGuide";
import DeliveryPickup from "@/components/commercial/sim/eSimThailand/DeliveryPickup";
import { Helmet } from "react-helmet-async";

function Home() {
  const { t } = useTranslation();
  return (
    <section>
      <Helmet>
        <title>
          Thailand SIM Card & eSIM for Tourists – Prepaid, Unlimited Data
        </title>
        <link rel="canonical" href="https://yoowifi.com/esim-thailand" />
        <meta
          name="description"
          content="Travelling from Singapore to Thailand? Discover the best eSIM and SIM card options for tourists—easy activation, affordable data plans, and airport pickup."
        />
        <meta
          name="keywords"
          content="esim for thailand, thailand sim card for tourist, sim card for thailand, sim card for thailand travel"
        />
        <meta
          property="og:title"
          content="Thailand SIM Card & eSIM for Tourists – Prepaid, Unlimited Data"
        />
        <meta
          property="og:description"
          content="Travelling from Singapore to Thailand? Discover the best eSIM and SIM card options for tourists—easy activation, affordable data plans, and airport pickup."
        />
        <meta property="og:url" content="https://yoowifi.com/eSim-thailand" />
      </Helmet>
      <HeroCommon
        title={t("eSimThailand.heading")}
        titleClassName="!normal-case md:w-full"
      />
      <Description />
      <HowToGet />
      <SimComparison />
      <SimFeatures />
      <DeliveryPickup />
      <SetupActivationGuide />
      <ThingsToKnow />
      <SupportAndFAQ />
    </section>
  );
}

export default Home;
