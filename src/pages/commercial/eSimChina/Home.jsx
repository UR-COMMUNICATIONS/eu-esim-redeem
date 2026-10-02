import HowToGet from "@/components/commercial/sim/eSimChina/HowToGet";
import Description from "@/components/commercial/sim/eSimChina/Description";
import SimFeatures from "@/components/commercial/sim/eSimChina/SimFeatures";
import ThingsToKnow from "@/components/commercial/sim/eSimChina/ThingsToKnow";
import SupportAndFAQ from "@/components/commercial/sim/eSimChina/SupportAndFAQ";
import HeroCommon from "@/components/shared/others/HeroCommon";
import { useTranslation } from "react-i18next";
import SimComparison from "@/components/commercial/sim/eSimChina/SimComparison";
import SetupActivationGuide from "@/components/commercial/sim/eSimChina/SetupActivationGuide";
import DeliveryPickup from "@/components/commercial/sim/eSimChina/DeliveryPickup";
import { Helmet } from "react-helmet-async";
// import DescriptionSkeleton from "@/components/commercial/sim/eSimChina/DescriptionSkeleton";
// import HeroCommonSkeleton from "@/components/commercial/sim/eSimChina/HeroCommonSkeleton";
// import HowToGetSkeleton from "@/components/commercial/sim/eSimChina/HowToGetSkeleton";
// import SimComparisonSkeleton from "@/components/commercial/sim/eSimChina/SimComparisonSkeleton";
// import SimFeaturesSkeleton from "@/components/commercial/sim/eSimChina/SimFeaturesSkeleton";
// import DeliveryPickupSkeleton from "@/components/commercial/sim/eSimChina/DeliveryPickupSkeleton";
// import SetupActivationGuideSkeleton from "@/components/commercial/sim/eSimChina/SetupActivationGuideSkeleton";
// import SupportAndFAQSkeleton from "@/components/commercial/sim/eSimChina/SupportAndFAQSkeleton";

function Home() {
  const { t } = useTranslation();
  return (
    <section>
      <Helmet>
        <title>
          China SIM Card & eSIM for Tourists - Prepaid Unlimited Data
        </title>
        <link rel="canonical" href="https://yoowifi.com/esim-china" />
        <meta
          name="description"
          content="Travelling from Singapore to China? Discover the best eSIM and SIM card options for tourists—easy activation, affordable data plans, and airport pickup."
        />
        <meta
          name="keywords"
          content="esim for china, esim for china travel, esim china number, esim card china"
        />
        <meta
          property="og:title"
          content="China SIM Card & eSIM for Tourists - Prepaid, Unlimited Data"
        />
        <meta
          property="og:description"
          content="Travelling from Singapore to China? Discover the best eSIM and SIM card options for tourists—easy activation, affordable data plans, and airport pickup."
        />
        <meta property="og:url" content="https://yoowifi.com/eSim-china" />
      </Helmet>
      <HeroCommon
        title={t("eSimChina.heading")}
        titleClassName="!normal-case md:w-full"
      />
      {/* <HeroCommonSkeleton /> */}
      <Description />
      {/* <DescriptionSkeleton/> */}
      <HowToGet />
      {/* <HowToGetSkeleton/> */}
      <SimComparison />
      {/* <SimComparisonSkeleton/> */}
      <SimFeatures />
      {/* <SimFeaturesSkeleton/> */}
      <DeliveryPickup />
      {/* <DeliveryPickupSkeleton/> */}
      <SetupActivationGuide />
      {/* <SetupActivationGuideSkeleton/> */}
      <ThingsToKnow />
      <SupportAndFAQ />
      {/* <SupportAndFAQSkeleton/> */}
    </section>
  );
}

export default Home;
