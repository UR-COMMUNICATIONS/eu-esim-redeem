import SectionHeader from "@/components/shared/others/SectionHeader";
import DetailsCard from "./DetailsCard";
import { useTranslation } from "react-i18next";
import useDynamicImages from "@/hooks/useDynamicImages";

const ForBusiness = ({ data = [] }) => {
  const { t } = useTranslation();

  return (
    <div className="containerX sec_common_60 xl:px-0">
      <SectionHeader
        heading={t("aboutUs.business.heading")}
        subHeading={t("aboutUs.business.subHeading")}
      />

      <div className="mt-4 md:mt-8 lg:mt-[60px]">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-8">
          {data?.map((item, index) => {
           const img = useDynamicImages("others", item?.image, "webp"); 
            return (
            <DetailsCard
              image={img} 
              title={t(`aboutUs.business.content.${index}.title`)}
              description={t(`aboutUs.business.content.${index}.description`)}
              key={index}
               />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ForBusiness;
