import { Button } from "@/components/ui/button";
import { commercialRoutes, images, ShareGroupIcon } from "@/services";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Trans } from "react-i18next";
import SectionHeader from "@/components/shared/others/SectionHeader";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";

const CnyEasySteps = ({ comp, color }) => {
  const navigate = useNavigate();
  const { t } = useTranslation(["translation", "english", "local"]);
  const { nameSpace } = useUserLocationLanguage();

  // Use translated steps like KolEasySteps does
  const steps = t(`cnyStep`, { returnObjects: true });
  const items = [
    {
      index: "1",
      description: steps.one || 'Start by clicking the "Redeem" button',
    },
    {
      index: "2",
      description: steps.two || "Fill in your details: Name, email, mobile.",
    },
    {
      index: "3",
      description:
        steps.three || "Instantly receive your eSIM QR code and activate.",
    },
  ];

  return (
    <div className="containerX mx-auto bg-white md:py-20 px-6 py-10">
      {/* <SectionHeader
        heading="3 Easy Steps To Get Free eSIM"
        midHeading="Just a few simple steps to claim and activate your free eSIM — no hassle, no roaming fees."
        midHeadingClass="text-[#4F4F4F] mt-5 md:text-[26px] text-[20px] whitespace-pre-line"
      /> */}

      <SectionHeader
        heading={steps.heading}
        midHeading={steps.sectionSubHeading}
        midHeadingClass="text-[#4F4F4F] mt-5 md:text-[26px] text-[20px] whitespace-pre-line"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 md:mt-12 xl:mt-20 text-center">
        {items.map(({ title, description, index }, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center opacity-100 border-none rounded-[24px] border-[#DCDCDC] md:py-6 py-4 lg:px-0 md:px-2 sm:px-0"
          >
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
    </div>
  );
};

export default CnyEasySteps;
