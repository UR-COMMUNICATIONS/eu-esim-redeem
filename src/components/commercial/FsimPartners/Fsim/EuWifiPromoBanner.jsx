import desktopBanner from "@/assets/images/others/EUwifi_DesktopBanner_1440x500.webp";
import mobileBanner from "@/assets/images/others/EUwifi_MobileBanner_1080x1080.webp";

const EuWifiPromoBanner = () => {
  return (
    <section className="w-full overflow-hidden">
      <img
        src={desktopBanner}
        alt="EU Pocket WiFi promotion"
        className="hidden md:block w-full h-auto object-cover"
        width={1440}
        height={500}
      />
      <img
        src={mobileBanner}
        alt="EU Pocket WiFi promotion"
        className="block md:hidden w-full h-auto object-cover"
        width={1080}
        height={1080}
      />
    </section>
  );
};

export default EuWifiPromoBanner;
