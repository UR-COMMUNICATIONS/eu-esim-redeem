import ConnectCard from "@/components/shared/cards/ConnectCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const useHowItWorksTranslations = (namespace, t) => {
  return {
    heading: t(`${namespace}:howItWorks.sectionHeading`),
    subHeading: t(`${namespace}:howItWorks.sectionSubHeading`),
    buttonText: t(`${namespace}:howItWorks.buttonText`),
  };
};

const HowItWorks = () => {
  const howItWorksData = useSelector((state) => state.howItWorks);
  const { nameSpace } = useUserLocationLanguage();
  const { t } = useTranslation(["translation", "english", "local"]);

  const { heading, subHeading } = useHowItWorksTranslations(nameSpace, t);

  return (
    <section className="containerX sec_common_60 px-4 md:px-6 xl:px-0 flex flex-col items-center gap-6 md:gap-10 lg:gap-20">
      <SectionHeader heading={heading} subHeading={subHeading} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
        {howItWorksData.map((item, index) => (
          <ConnectCard key={index} index={index} translate={t} item={item} />
        ))}
      </div>

      {/* <Link to={commercialRoutes.howItWorks.path}>
        <Button size="lg" variant="secondary">
          {howItWorks?.buttonText}
        </Button>
      </Link> */}
    </section>
  );
};

export default memo(HowItWorks);
