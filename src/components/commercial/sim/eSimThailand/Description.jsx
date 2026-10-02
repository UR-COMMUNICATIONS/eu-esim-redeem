import { useTranslation } from "react-i18next";
import useDynamicImages from "@/hooks/useDynamicImages";

function Description() {
  const { t } = useTranslation();
  // const eSimThailand = eSimThiland;
  return (
    <div className="pt-6 md:pt-10 xl:pt-15 pb-6 md:pb-10 xl:pb-15 px-4 md:px-10 lg:px-16">
      <div className="containerX">
        <div className="text-black-600 mb-4 text-base lg:text-lg">
          {t("eSimThailand.hero.para1")}
        </div>
        <div className="text-black-600 text-base lg:text-lg">
          {t("eSimThailand.hero.para2")}
        </div>
        <h2 className="text-2xl md:text-4xl mt-8 md:mt-12 mb-2 lg:mt-20 text-center md:text-left font-semibold">
          {t("eSimThailand.hero.imageHeading")}
        </h2>
        <img src={useDynamicImages("others", "esim-thailand" )} className="rounded-xl lg:mt-14" />

        <div className="text-black-600 mb-4 text-base lg:text-lg mt-8">
          {t("eSimThailand.hero.para3")}
        </div>
        <div className="text-black-600 mb-4 text-base lg:text-lg mt-8">
          {t("eSimThailand.hero.para4")}
        </div>
        <div className="text-black-600 text-base lg:text-lg">
          {t("eSimThailand.hero.para5")}
        </div>
      </div>
    </div>
  );
}

export default Description;
