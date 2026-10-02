import { Trans, useTranslation } from "react-i18next";
import SectionHeader from "@/components/shared/others/SectionHeader";

const steps = ["one", "two", "three"];

const SqFairPromoSteps = () => {
  const { t } = useTranslation(["translation", "english", "local"]);

  return (
    <div className="containerX mx-auto bg-white md:py-20 px-6 py-10">
      <SectionHeader
        heading={
          <Trans
            i18nKey="sqfairpromo.steps.heading"
            components={{ r: <span className="text-main-650" /> }}
          />
        }
        midHeading={t("sqfairpromo.steps.subHeading")}
        midHeadingClass="text-black-700 mt-5 md:text-[26px] text-[20px] whitespace-pre-line"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 md:mt-12 xl:mt-20">
        {steps.map((key, idx) => (
          <div
            key={key}
            className="flex flex-col items-center text-center rounded-[24px] shadow-card-secondary md:py-8 py-6 px-6"
          >
            <div className="flex_center text-2xl font-bold rounded-full w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-main-650 text-white mb-6">
              {idx + 1}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-black-700 mb-2">
              {t(`sqfairpromo.steps.${key}.title`)}
            </h3>
            <p className="text-sm md:text-base text-black-600 max-w-xs">
              {t(`sqfairpromo.steps.${key}.desc`)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SqFairPromoSteps;
