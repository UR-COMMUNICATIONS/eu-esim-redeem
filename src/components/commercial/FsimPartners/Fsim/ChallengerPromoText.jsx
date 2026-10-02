import { useTranslation } from "react-i18next";

const ChallengerPromoText = () => {
  const { t } = useTranslation();

  return (
    <div className="containerX mx-auto py-12 md:py-20 px-4">
      <div className="mx-auto max-w-5xl">
        {/* Main heading with gradient effect */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-[#E41F26] to-[#FF6B6B] bg-clip-text text-transparent">
            {t("challenger.heading") || "Double Your Data with Yoowifi"}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#E41F26] to-[#FF6B6B] mx-auto rounded-full"></div>
        </div>

        {/* Promo text in a styled card */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-10 lg:p-12">
          <div className="space-y-4 md:space-y-6">
            <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed md:leading-loose text-center">
              {t("challenger.promoText")}
            </p>

            {/* Highlight box */}
            <div className="mt-6 md:mt-8 bg-gradient-to-r from-[#E41F26]/10 to-[#FF6B6B]/10 border-l-4 border-[#E41F26] rounded-r-lg p-4 md:p-6">
              <p className="text-sm md:text-base font-semibold text-[#E41F26] text-center">
                ✨ Get your data matched for FREE when you purchase from
                participating Challenger stores
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengerPromoText;
