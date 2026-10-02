import useDynamicImages from "@/hooks/useDynamicImages";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CompanyMission = ({ data = {} }) => {
  const { t } = useTranslation();

  return (
    <div className="container2X sec_common_60 xl:px-0">
      <h2 className="title text-center">{t("aboutUs.companyMission.title")}</h2>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-10 mt-4 md:mt-6 lg:mt-12">
        <div className="w-full md:w-1/2 flex_center">
          <div className="aspect-[1.5/1] w-full relative overflow-hidden rounded-xl md:rounded-3xl">
            <LazyLoadImage
              // src={data.mission.image || ""}
              src={useDynamicImages("others", data.mission.image || "")}
              alt={data.mission.title}
              className="absolute_center min-w-full min-h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex_center flex-col">
          {/* <p className="text-[28px] md:text-5xl !leading-[1.28] md:leading-[1.1] mt-3 font-extrabold md:font-bold text-black-900">
            {data.mission.year}
          </p> */}
          <p className="text-lg md:text-4xl font-semibold md:font-bold !leading-[1.4] mt-1 md:mt-6">
            {t("aboutUs.companyMission.mission.title")}
          </p>
          <hr className="w-full h-[1px] bg-neutral-200 my-3 md:my-4" />
          <p className="mt-4 md:mt-6 p_common whitespace-pre-wrap">
            {t("aboutUs.companyMission.mission.description")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyMission;
