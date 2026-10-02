import SectionHeader from "@/components/shared/others/SectionHeader";
import DetailsCard from "./DetailsCard";
import { useTranslation } from "react-i18next";
import useDynamicImages from "@/hooks/useDynamicImages";

const ForPersonal = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className="containerX sec_common_60 xl:px-0">
      <SectionHeader
        heading={t("aboutUs.personal.heading")}
        subHeading={t("aboutUs.personal.subHeading")}
      />

      <div className="mt-4 md:mt-8 lg:mt-[60px]">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-8">
          {data?.map((item, index) => {
            const imageSrc = useDynamicImages("others", item?.image || "");
            return (
              <DetailsCard
                image={imageSrc}
                title={t(`aboutUs.personal.content.${index}.title`)}
                description={t(`aboutUs.personal.content.${index}.description`)}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ForPersonal;
