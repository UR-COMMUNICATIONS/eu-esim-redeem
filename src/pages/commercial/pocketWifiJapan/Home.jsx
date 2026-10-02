import WifiPlans from "@/components/commercial/pocketWifi/pocketWifiJapan/WifiPlans";
import DeliveryOptions from "@/components/commercial/pocketWifi/pocketWifiJapan/DeliveryOptions";
import Description from "@/components/commercial/pocketWifi/pocketWifiJapan/Description";
import WifiFeatures from "@/components/commercial/pocketWifi/pocketWifiJapan/WifiFeatures";
import WhyPocketWifi from "@/components/commercial/pocketWifi/pocketWifiJapan/WhyPocketWifi";
import GetWifi from "@/components/commercial/pocketWifi/pocketWifiJapan/GetWifi";
import Comparison from "@/components/commercial/pocketWifi/pocketWifiJapan/pocketWifiDetails/Comparison";
import SupportAndFAQ from "@/components/commercial/pocketWifi/pocketWifiJapan/SupportAndFAQ";
import HeroCommon from "@/components/shared/others/HeroCommon";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import HowItWorks from "@/components/commercial/pocketWifi/pocketWifiJapan/HowItWorks";
import { Helmet } from 'react-helmet-async';

function Home() {
  const { japanDataPlan } = useSelector((state) => state.dataPlan);
  const { t } = useTranslation();
  return (
    <section>
      <Helmet>
        <title>Pocket WiFi for Japan - Unlimited Internet for Tourists</title>
        <link rel="canonical" href="https://yoowifi.com/pocket-wifi-japan" />
        <meta
          name="description"
          content="Stay connected in Japan with Yoowifi’s Pocket WiFi. Enjoy unlimited 4G, connect up to 10 devices, and get free delivery in Singapore"
        />
        <meta
          name="keywords"
          content="pocket wifi japan, pocket wifi rental japan, portable wifi japan, pocket wifi japan price"
        />
        <meta property="og:title" content="Pocket WiFi for Japan – Unlimited Internet for Tourists" />
        <meta
          property="og:description"
          content="Stay connected in Japan with Yoowifi’s Pocket WiFi. Enjoy unlimited 4G, connect up to 10 devices, and get free delivery in Singapore"
        />
        <meta property="og:url" content="https://yoowifi.com/pocket-wifi-japan" />
      </Helmet>
      <HeroCommon
        title={t("pocketWifiJapan.heading")}
        titleClassName="!normal-case md:w-full"
      />
      <Description />
      <WifiPlans />
      <WifiFeatures />
      <WhyPocketWifi />
      <GetWifi />
      <DeliveryOptions />
      <HowItWorks />
      <Comparison japanDataPlan={japanDataPlan} />
      <SupportAndFAQ />
    </section>
  );
}

export default Home;
