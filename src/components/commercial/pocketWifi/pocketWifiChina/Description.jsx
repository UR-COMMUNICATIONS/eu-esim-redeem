import { useTranslation } from "react-i18next";
import useDynamicImages from "@/hooks/useDynamicImages";


function Description() {
  const { t } = useTranslation();
  // const pocketWifiChina = pocketWifiChina;
  return (
    <div className="pt-6 md:pt-10 xl:pt-15 pb-6 md:pb-10 px-4 md:px-10 lg:px-16">
      <div className="containerX">
        <div className="text-black-600 mb-4 text-base lg:text-lg">{t("pocketWifiChina.hero.para1")}</div>
        <div className="text-black-600 text-base lg:text-lg">{t("pocketWifiChina.hero.para2")}</div>
        <img src={useDynamicImages("others", "pocket-wifi-china" )} className="rounded-xl mt-8 lg:mt-14" />
      </div>
    </div>
  );
}

export default Description;
