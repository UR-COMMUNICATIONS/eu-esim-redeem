import ConnectCard from "@/components/shared/cards/ConnectCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { Button } from "@/components/ui/button";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { commercialRoutes } from "@/services";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const howItWorksData = useSelector((state) => state.howItWorks);
  const { nameSpace, isTargetCountry } = useUserLocationLanguage();
  const { t } = useTranslation(["translation", "english", "local"]);

  const howItWorks = t(`${nameSpace}:howItWorks`, { returnObjects: true });

  return (
    <section className="containerX sec_common_60 px-4 md:px-6 xl:px-0 flex flex-col items-center gap-6 md:gap-10 lg:gap-20">
      <SectionHeader
        heading={howItWorks?.sectionHeading}
        subHeading={howItWorks?.sectionSubHeading}
      />

      <div className="grid w-fit mx-auto grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
        {howItWorksData.slice(0, 2).map((item, index) => (
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

export default HowItWorks;
