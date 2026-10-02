import { Button } from "@/components/ui/button";
import useDynamicImages from "@/hooks/useDynamicImages";
import { cn } from "@/lib/utils";
import { commercialRoutes } from "@/services";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const RAYA_MARKETS = ["sg", "my", "id"];

// Path-based market: yoowifi.com/my/raya => MY (same experience as yoowifi.my/raya)
function getMarketFromPath(pathname) {
  const match = pathname.match(/^\/(my|id|sg)\/raya$/);
  return match && RAYA_MARKETS.includes(match[1]) ? match[1] : null;
}

function Raya() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useSelector((state) => state.cart);
  const pathMarket = getMarketFromPath(location.pathname);
  const country = cart?.userCountry?.country?.toLowerCase();
  const market =
    pathMarket ?? (RAYA_MARKETS.includes(country) ? country : "sg");

  const bannerImage = useDynamicImages(
    "raya",
    `landing-page-yoowifi-raya-${market}`,
  );

  const handleBookNow = () => {
    navigate(commercialRoutes.productInternetPackages.path);
  };

  return (
    <div className="overflow-hidden w-full">
      {/* Full-width banner image (ID / SG / MY) */}
      <section className="relative w-full">
        <img
          src={bannerImage}
          alt=""
          className="w-full h-auto object-cover object-center"
        />
      </section>

      {/* Headline (no background, same font sizes) */}
      <section
        className={cn(
          "w-full flex flex-col items-center justify-center text-center px-4 py-16 md:py-24",
        )}
      >
        <p className="text-4xl md:text-5xl mb-4" aria-hidden>
          {t(`raya.${market}.emoji`)}
        </p>
        <h1 className="font-['SansPro'] text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 max-w-4xl mx-auto leading-tight">
          {t(`raya.${market}.headline`)}
        </h1>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16 space-y-8">
        <p className="font-['DMSans'] text-base md:text-lg text-gray-700 leading-relaxed">
          {t(`raya.${market}.body1`)}
        </p>
        <p className="font-['DMSans'] text-base md:text-lg text-gray-700 leading-relaxed">
          {t(`raya.${market}.body2`)}
        </p>

        {/* Why Yoowifi - ID only */}
        {market === "id" && (
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
            <h2 className="font-['DMSans'] text-xl font-bold text-gray-900 mb-4">
              {t("raya.id.whyTitle")}
            </h2>
            <ul className="space-y-3 font-['DMSans'] text-gray-700">
              {["why1", "why2", "why3", "why4", "why5"].map((key) => (
                <li key={key} className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">●</span>
                  <span>{t(`raya.id.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {market === "id" && (
          <p className="font-['DMSans'] text-base md:text-lg text-gray-700 leading-relaxed">
            {t("raya.id.body3")}
          </p>
        )}

        {/* Promo card */}
        <div className="bg-gradient-to-r from-emerald-700/10 to-teal-700/10 border-2 border-emerald-600/30 rounded-2xl p-6 md:p-8">
          <h2 className="font-['DMSans'] text-xl md:text-2xl font-bold text-gray-900 mb-3">
            {t(`raya.${market}.promoTitle`)}
          </h2>
          <p className="font-['DMSans'] font-semibold text-emerald-700 mb-1">
            {t(`raya.${market}.promoCodeLabel`)}
          </p>
          <p className="font-['DMSans'] text-gray-600 mb-4">
            {t(`raya.${market}.validity`)}
          </p>
          <p className="font-['DMSans'] text-gray-700 mb-6">
            {t(`raya.${market}.ctaText`)}
          </p>
          <Button
            onClick={handleBookNow}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-base font-bold rounded-xl"
          >
            {t(`raya.${market}.ctaButton`)}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Raya;
