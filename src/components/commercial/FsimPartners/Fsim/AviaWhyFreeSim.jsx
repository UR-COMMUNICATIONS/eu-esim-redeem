import { useTranslation } from "react-i18next";

const AviaWhyFreeSim = ({ comp, bgColor, textColor, headingColor }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`pb-10 ${bgColor ? `bg-[${bgColor}]` : "bg-red-600"} ${textColor ? `text-${textColor}` : "text-white"}`}
    >
      <div className="containerX mx-auto px-6">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-10 text-center ${headingColor || "text-white"}`}
        >
          {t("avia.whyFreeSim.heading")}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold mb-3">
              {t("avia.whyFreeSim.feature1.title")}
            </h3>
            <p>{t("avia.whyFreeSim.feature1.description")}</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-3">
              {t("avia.whyFreeSim.feature2.title")}
            </h3>
            <p>{t("avia.whyFreeSim.feature2.description")}</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">💼</div>
            <h3 className="text-xl font-semibold mb-3">
              {t("avia.whyFreeSim.feature3.title")}
            </h3>
            <p>{t("avia.whyFreeSim.feature3.description")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AviaWhyFreeSim;
