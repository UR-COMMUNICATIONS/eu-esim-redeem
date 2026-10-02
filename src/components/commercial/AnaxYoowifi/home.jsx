import japanDeviceGrey from "@/assets/images/pocket-wifi/japan-device-grey.webp";
import { Button } from "@/components/ui/button";
import useDynamicImages from "@/hooks/useDynamicImages";
import { ArrowRightIcon, CalendarIcon, commercialRoutes } from "@/services";
import { setCartData } from "@/store/module/cart/cartSlice";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AnaxYoowifi = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const anaBanner = useDynamicImages("anax-banner", "ana-banner-image");

  const { t } = useTranslation(["translation", "english", "local"]);
  const steps = t("anaxYoowifi.howtoRedeemSteps", { returnObjects: true });
  const plans = t("anaxYoowifi.plans", { returnObjects: true });
  const terms = t("anaxYoowifi.terms", { returnObjects: true });

  const country = {
    countryCode: "SG",
    countryName: "Singapore",
    dialCode: "+65",
    translations: {
      en: "Singapore",
      es: "Singapore",
      fr: "Singapore",
      gm: "Singapore",
      id: "Singapore",
      jp: "シンガポール",
      ms: "Singapore",
      ph: "Singapore",
      th: "Singapore",
      vi: "Singapore",
      zhcn: "Singapore",
      zhhk: "Singapore",
    },
  };

  const handleNext = () => {
    navigate(commercialRoutes.productInternetPackages.path);
  };

  useEffect(() => {
    dispatch(setCartData({ annex: "YOOWANA", promoCode: "YOOWANA" }));
    const countryObj = cart?.reactCountries.find((cou) => cou.iso2 === "SG");
    dispatch(
      setCartData({ productCountry: countryObj, countriesList: [countryObj] }),
    );
  }, []);

  return (
    <div className="md:px-8 pt-6 px-2">
      <div
        className="w-full md:h-[360px] rounded-[12px] bg-cover bg-center relative px-4 md:px-[37px] flex flex-col md:justify-between"
        style={{ backgroundImage: `url(${anaBanner})` }}
      >
        <img
          src={useDynamicImages("anax-banner", "anax")}
          alt="anaBanner"
          className="w-[200px] md:w-[334px] h-auto pt-4 md:pt-[29px]"
        />

        <div className="pt-6 md:pt-0 md:pb-6">
          <h1 className="text-[18px] md:text-[36px] lg:text-[45px] font-bold text-white leading-tight">
            {t(`anaxYoowifi.catchUsAt`)}
          </h1>
          <h1 className="text-[32px] md:text-[60px] lg:text-[100px] font-bold text-white leading-tight pb-6 md:pb-0">
            {t(`anaxYoowifi.mattaFair`)}
          </h1>
        </div>
      </div>
      <div className="flex flex-col px-6 md:px-12 py-10 md:py-16 max-w-7xl mx-auto font-sans">
        {/* Header Section */}
        <div className="w-full lg:w-3/4 mb-10 md:mb-16 space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {t(`anaxYoowifi.stayConnected`)}
          </h1>
          <p className="text-lg md:text-xl font-medium text-gray-600 pb-4">
            {t(`anaxYoowifi.stayWherever`)}
          </p>
          <p className="text-base md:text-lg text-gray-800 leading-relaxed">
            {t(`anaxYoowifi.understandImportance`)}
          </p>
          <p className="text-base md:text-lg text-gray-800 leading-relaxed">
            {t(`anaxYoowifi.UnlimitedData`)}
          </p>
        </div>

        {/* Main Content & Image Flex */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left Column: Steps, Button, Callout, Terms */}
          <div className="flex-1 lg:flex-[1.5] space-y-10">
            {/* Steps Section */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {t(`anaxYoowifi.howtoRedeem`)}
              </h2>
              <p className="text-base md:text-lg text-gray-800">
                {t(`anaxYoowifi.startedEasy`)}
              </p>

              <ol className="list-decimal list-outside ml-5 space-y-4 text-base md:text-lg text-gray-800 font-medium">
                {steps.map((step, index) => (
                  <li key={index} className="pl-2">
                    <span className="leading-relaxed">{step}</span>
                    {step.includes("Choose your plan") && (
                      <ul className="list-disc list-outside ml-6 mt-3 space-y-2 text-base text-gray-600 font-normal">
                        {plans.map((plan, idx) => (
                          <li key={idx} className="pl-1">
                            {plan}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </div>

            {/* Action Button */}
            <div>
              <Button
                className="bg-[#00264C] hover:bg-[#001a33] text-white text-lg px-8 py-6 rounded-lg transition-colors shadow-md flex items-center"
                onClick={handleNext}
              >
                <span>{t(`anaxYoowifi.redeemButton`)}</span>
                <ArrowRightIcon className="h-5 w-5 ml-3 hidden md:block" />
              </Button>
            </div>

            {/* Special Offer Callout Box */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <CalendarIcon className="w-7 h-7 text-blue-900" />
                <h3 className="text-xl font-bold text-blue-900">
                  {t(`anaxYoowifi.fairSpecial`)}
                </h3>
              </div>
              <p className="text-base md:text-lg text-blue-800 font-medium leading-relaxed">
                {t(`anaxYoowifi.fromSeptember`)}
              </p>
            </div>

            {/* Terms and Conditions */}
            <div className="pt-8 border-t border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                {t(`anaxYoowifi.termsConditions`)}
              </h3>
              <ul className="space-y-3 text-sm md:text-base text-gray-600">
                {terms.map((term, index) => (
                  <li
                    key={index}
                    className={
                      term.bullet
                        ? "list-disc list-outside ml-5 pl-1 leading-relaxed"
                        : "list-none leading-relaxed"
                    }
                  >
                    {term.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="flex-1 lg:flex-1 w-full flex justify-center lg:sticky lg:top-12">
            <img
              src={japanDeviceGrey}
              alt="Pocket Wifi Device"
              className="w-[200px] sm:w-[280px] md:w-[320px] lg:w-[400px] h-auto object-contain drop-shadow-2xl transition-transform hover:scale-105 duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnaxYoowifi;
