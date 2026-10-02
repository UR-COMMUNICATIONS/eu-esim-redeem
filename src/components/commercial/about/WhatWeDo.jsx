import ServiceCard from "@/components/shared/cards/ServiceCard";
import { useTranslation } from "react-i18next";

const WhatWeDo = ({ data = [] }) => {
  const { t } = useTranslation();
  return (
    <div className="containerX sec_common_60 xl:px-0">
      <h2 className="title">{t("aboutUs.whatWeDo.header")}</h2>

      <div className="mt-4 md:mt-6 lg:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.map((item, index) => (
          <ServiceCard
            key={index}
            icon={item?.icon}
            image={item?.image}
            title={t(`aboutUs.whatWeDo.details.${index}.title`)}
            description={t(`aboutUs.whatWeDo.details.${index}.description`)}
          />
        ))}
      </div>
    </div>
  );
};

export default WhatWeDo;
