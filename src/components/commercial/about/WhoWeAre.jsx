import useDynamicImages from "@/hooks/useDynamicImages";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";

const WhoWeAre = ({ data = {} }) => {
  const { t } = useTranslation(["translation", "english", "local"]);
  const { nameSpace, isTargetCountry } = useUserLocationLanguage();

  return (
    <div className="container2X sec_common_60 xl:px-0 flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-10">
      <div className="w-full lg:w-1/2">
        <h2 className="title text-start">{t("aboutUs.whoWeAre.title")}</h2>
        <p className="mt-4 md:mt-6 p_common whitespace-pre-wrap">
          {t(`${nameSpace}:aboutUs.whoWeAre.description`)}
        </p>
      </div>
      <div className="w-full lg:w-1/2 flex_center">
        <div className="aspect-[1.5/1] w-full relative overflow-hidden rounded-xl md:rounded-s-3xl">
          <LazyLoadImage
            // src={data.image || ""}
            src={useDynamicImages("others", data.image || "")}
            alt={data.title}
            title={data.title}
            className="absolute_center min-w-full min-h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
