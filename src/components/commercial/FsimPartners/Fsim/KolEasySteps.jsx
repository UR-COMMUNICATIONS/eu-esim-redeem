import { Button } from "@/components/ui/button";
import { commercialRoutes, images, ShareGroupIcon } from "@/services";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Trans } from "react-i18next";
import SectionHeader from "@/components/shared/others/SectionHeader";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";

const KolEasySteps = ({ comp, color }) => {
  const navigate = useNavigate();
  const { t } = useTranslation(["translation", "english", "local"]);
  const { nameSpace } = useUserLocationLanguage();

  const easySteps = t(`kolStep`, { returnObjects: true });
  const steps = comp == "astindo" ? easySteps.astindo : easySteps;

  const items = [
    {
      index: "1",
      description: steps.one,
      // description: t("easySteps.one"),
    },
    {
      index: "2",
      description: steps.two,
      // description: t("easySteps.two"),
    },
    {
      index: "3",
      description: steps.three,
      // description: t("easySteps.three"),
    },
  ];

  return (
    <div className="containerX mx-auto bg-white md:py-20 px-6 py-10">
      <SectionHeader
        // heading={t("easySteps.heading")}
        heading={steps.heading}
        midHeading={steps.sectionSubHeading}
        // midHeading={t(
        //     "easySteps.sectionSubHeading"
        // )}
        midHeadingClass="text-[#4F4F4F] mt-5 md:text-[26px] text-[20px] whitespace-pre-line"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 md:mt-12 xl:mt-20 text-center">
        {items.map(({ title, description, index }, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center opacity-100 border-none rounded-[24px] border-[#DCDCDC] md:py-6 py-4 lg:px-0 md:px-2 sm:px-0"
          >
            {/* <div className="flex items-center justify-center text-4xl mb-6 rounded-[100px] w-[50px] h-[50px] md:w-[60px] md:h-[60px] border border-[#00264C] bg-[#00264C] text-white text-center"> */}
            <div
              className={`flex items-center justify-center text-4xl mb-6 rounded-[100px] w-[50px] h-[50px] md:w-[60px] md:h-[60px] border border-[${color}] bg-[${color}] text-white text-center`}
            >
              {index}
            </div>
            <p className="text-[#4F4F4F] mt-2 text-lg max-w-xs">
              {description}
            </p>
          </div>
        ))}
      </div>
      {/* Terms & Conditions moved to page level via shared TermsList component */}
    </div>
  );
};

export default KolEasySteps;
