import WifiPlans from "@/components/commercial/pocketWifi/pocketWifiChina/WifiPlans";
import DeliveryOptions from "@/components/commercial/pocketWifi/pocketWifiChina/DeliveryOptions";
import Description from "@/components/commercial/pocketWifi/pocketWifiChina/Description";
import WifiFeatures from "@/components/commercial/pocketWifi/pocketWifiChina/WifiFeatures";
import WhyPocketWifi from "@/components/commercial/pocketWifi/pocketWifiChina/WhyPocketWifi";
import GetWifi from "@/components/commercial/pocketWifi/pocketWifiChina/GetWifi";
import Comparison from "@/components/commercial/pocketWifi/pocketWifiChina/pocketWifiDetails/Comparison";
import SupportAndFAQ from "@/components/commercial/pocketWifi/pocketWifiChina/SupportAndFAQ";
import HeroCommon from "@/components/shared/others/HeroCommon";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import ImportantConsiderations from "@/components/commercial/pocketWifi/pocketWifiChina/ImportantConsiderations";

function Home() {
  const { chinaDataPlan } = useSelector((state) => state.dataPlan);
  const { t } = useTranslation();
  const { chinaWifiFaqs } = useSelector((state) => state.contact);
  return (
    <section>
      <Helmet>
        <title>Pocket WiFi for China - Unlimited Internet for Tourists</title>
        <link rel="canonical" href="https://yoowifi.com/pocket-wifi-china" />
        <meta
          name="description"
          content="Stay connected in China with Yoowifi’s Pocket WiFi. Enjoy unlimited 4G, connect up to 10 devices, and get free delivery in Singapore"
        />
        <meta
          name="keywords"
          content="pocket wifi china, pocket wifi rental china, portable wifi china, pocket wifi china price"
        />
        <meta
          property="og:title"
          content="Pocket WiFi for China - Unlimited Internet for Tourists"
        />
        <meta
          property="og:description"
          content="Stay connected in China with Yoowifi’s Pocket WiFi. Enjoy unlimited 4G, connect up to 10 devices, and get free delivery in Singapore"
        />
        <meta
          property="og:url"
          content="https://yoowifi.com/pocket-wifi-china"
        />
      </Helmet>
      <HeroCommon
        title={t("pocketWifiChina.heading")}
        titleClassName="!normal-case md:w-full"
      />
      <Description />
      <WifiPlans />
      <WifiFeatures />
      <WhyPocketWifi />
      <GetWifi />
      <DeliveryOptions />
      <Comparison chinaDataPlan={chinaDataPlan} />
      <ImportantConsiderations />
      <SupportAndFAQ data={chinaWifiFaqs} />
    </section>
  );
}

export default Home;
