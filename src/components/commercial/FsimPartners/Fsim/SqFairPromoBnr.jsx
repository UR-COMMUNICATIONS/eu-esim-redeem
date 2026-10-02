import { Button } from "@/components/ui/button";
import { ArrowRightIcon, commercialRoutes } from "@/services";
import useDynamicImages from "@/hooks/useDynamicImages";
import { setCartData } from "@/store/module/cart/cartSlice";
import { useTranslation, Trans } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { Globe, RefreshCw } from "lucide-react";
// Brand icon art (white on transparent, sized for the red feature box).
// Imported statically rather than via useDynamicImages: each file is under
// Vite's 4KB inline limit, so these become data URIs that render instantly,
// with no lazy placeholder swap.
import batteryIcon from "@/assets/images/others/battery.webp";
import speedIcon from "@/assets/images/others/speed.webp";
import connectDevicesIcon from "@/assets/images/others/connectdevices.webp";
import support5GIcon from "@/assets/images/others/support5G.webp";

// D = Pocket WiFi (SQFPW), E = eSIM (SQFES). These keys double as the packages
// page `type` filter values (D = Pocket Wifi, E = eSim), so one map drives both
// the promo code and the product filter.
const promoCode = {
  D: "SQFPW",
  E: "SQFES",
};

// Icons pair up positionally with the i18n feature entries for each product.
// Entries are either an imported image URL or a lucide component (used where no
// brand art was supplied yet).
const wifiIcons = [batteryIcon, speedIcon, connectDevicesIcon, Globe];
const esimIcons = [speedIcon, Globe, support5GIcon, RefreshCw];

// Each feature renders as a light label with the value bolded underneath.
// Tolerates a plain string entry in case a locale has not been migrated.
const FeatureBox = ({ icons, features }) => (
  <div className="bg-main-650 text-white rounded-[16px] p-4 md:p-5">
    <div className="grid grid-cols-2 gap-x-4 gap-y-4">
      {features.map((feature, i) => {
        const Icon = icons[i] || Globe;
        const label = typeof feature === "string" ? feature : feature?.label;
        const value = typeof feature === "string" ? "" : feature?.value;
        return (
          <div key={i} className="flex items-center gap-2">
            {typeof Icon === "string" ? (
              <img
                src={Icon}
                alt=""
                aria-hidden="true"
                className="h-6 w-6 shrink-0 object-contain"
              />
            ) : (
              <Icon className="h-6 w-6 shrink-0" strokeWidth={2} />
            )}
            <span className="text-xs md:text-sm !leading-[1.25]">
              {label}
              {value && (
                <>
                  <br />
                  <span className="font-bold">{value}</span>
                </>
              )}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

const ProductCard = ({
  image,
  alt,
  desc,
  buttonText,
  upgradeTitle,
  upgradeText,
  icons,
  features,
  onClick,
}) => (
  // Column holds the white card and, detached below it, the red feature box.
  <div className="flex flex-col w-full md:w-1/2 gap-5">
    <div className="flex flex-col justify-between flex-1 bg-white rounded-[24px] shadow-card-primary p-4 md:p-6">
      <div>
        <img
          src={useDynamicImages("fsim-banner", image)}
          alt={alt}
          className="w-full max-w-[520px] object-contain mx-auto md:rounded-[24px] rounded-[12px]"
        />
        <p className="p_common text-center mt-5">{desc}</p>
      </div>
      <div className="mt-6">
        <div className="flex justify-center">
          <Button
            className="bg-main-650 hover:bg-main-750 text-white text-base md:text-lg font-semibold px-8 py-4 rounded-full shadow-md w-full max-w-md"
            onClick={onClick}
          >
            <span>{buttonText}</span>
            <ArrowRightIcon className="!h-5 !w-5 shrink-0 ml-2" />
          </Button>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm md:text-base font-bold text-black-700">
            {upgradeTitle}
          </p>
          <p className="text-xs md:text-sm text-black-600 mt-1">
            {upgradeText}
          </p>
        </div>
      </div>
    </div>
    <FeatureBox icons={icons} features={features} />
  </div>
);

const SqFairPromoBnr = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation(["translation", "english", "local"]);
  // Banners have the offer text baked in, so pick the matching language file.
  const { currentLanguage } = useUserLocationLanguage();
  const lang = currentLanguage === "id" ? "id" : "en";

  const handleClick = (value) => {
    const code = promoCode[value];
    // Send the customer straight to the internet packages page with the promo
    // already applied: `annex` pre-fills AND locks the promo field (
    // InternetPackage disables it whenever cart.annex is set), while `type`
    // pre-selects the product filter. All that's left is picking a destination.
    sessionStorage.setItem("annex", code);
    dispatch(setCartData({ annex: code, promoCode: code }));
    navigate(
      `${commercialRoutes.productInternetPackages.path}?annex=${code}&type=${value}`,
    );
  };

  const wifiFeatures = t("sqfairpromo.wifi.features", { returnObjects: true });
  const esimFeatures = t("sqfairpromo.esim.features", { returnObjects: true });

  return (
    <div className="sec_common_80 xl:px-28 lg:py-10">
      <h1 className="title mb-10 md:mb-14">
        <Trans
          i18nKey="sqfairpromo.headline"
          components={{ r: <span className="text-main-650" /> }}
        />
      </h1>
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 w-full">
        <ProductCard
          image={`sqfair-wifi-${lang}`}
          alt="Pocket WiFi"
          desc={t("sqfairpromo.wifi.desc")}
          buttonText={t("sqfairpromo.wifi.button")}
          upgradeTitle={t("sqfairpromo.wifi.upgradeTitle")}
          upgradeText={t("sqfairpromo.wifi.upgradeText")}
          icons={wifiIcons}
          features={Array.isArray(wifiFeatures) ? wifiFeatures : []}
          onClick={() => handleClick("D")}
        />
        <ProductCard
          image={`sqfair-esim-${lang}`}
          alt="eSIM"
          desc={t("sqfairpromo.esim.desc")}
          buttonText={t("sqfairpromo.esim.button")}
          upgradeTitle={t("sqfairpromo.esim.upgradeTitle")}
          upgradeText={t("sqfairpromo.esim.upgradeText")}
          icons={esimIcons}
          features={Array.isArray(esimFeatures) ? esimFeatures : []}
          onClick={() => handleClick("E")}
        />
      </div>
    </div>
  );
};

export default SqFairPromoBnr;
