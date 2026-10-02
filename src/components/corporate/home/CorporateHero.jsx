import SectionHeader from "@/components/shared/others/SectionHeader";
import useDynamicImages from "@/hooks/useDynamicImages";
import React from "react";
import { useTranslation } from "react-i18next";

const CorporateHero = () => {
  const { t } = useTranslation();

  return (
    <section className="sec_common_60 bg-white">
      <div className="container2X flex flex-col-reverse md:flex-row gap-6 md:gap-10 lg:gap-[60px]">
        <div className="flex flex-col items-center justify-center">
          <SectionHeader
            heading={t("corporateHero.heading")}
            subHeading={t("corporateHero.subHeading")}
            containerClassName="pb-10 mb:pb-[60px]"
            headingClassName="md:text-[5rem]"
            subHeadingClassName="text-sm md:text-base"
          />
          <div className="containerX">
            <img src={useDynamicImages("others", "corporate-hero" )} alt="corporate-hero"></img>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateHero;
