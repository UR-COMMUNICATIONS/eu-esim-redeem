import SectionHeader from "@/components/shared/others/SectionHeader";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Benefits = () => {
  const { benefitsData } = useSelector((state) => state.pocketWifi);
  const { t } = useTranslation();

  return (
    <div className="containerX sec_common_80 lg:!px-0">
      <SectionHeader
        heading={t("benefits.heading")}
        subHeading={t("benefits.subHeading")}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-6 mt-6 lg:mt-15">
        {benefitsData.map((item, index) => (
          <article
            key={index}
            className="border border-neutral-200 rounded-3xl lg:py-10 lg:px-6 px-4 py-6 flex flex-col items-center"
          >
            {item.icon()}

            <h5 className="mt-4 lg:mt-8 mb-4 text-black-900 text-center text-[18px] lg:text-2xl leading-[140%] font-semibold lg:font-bold w-full font-dmsans">
              {t(`benefits.benefitsData.${index}.title`)}
            </h5>

            <p className="text-black-600 lg:text-black-700 text-center text-sm lg:text-base leading-[140%]">
              {t(`benefits.benefitsData.${index}.content`)}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
