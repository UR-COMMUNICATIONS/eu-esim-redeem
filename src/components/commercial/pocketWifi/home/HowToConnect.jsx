import InfoCard from "@/components/shared/cards/InfoCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { useTranslation } from "react-i18next";

function HowToConnect() {
  const { t } = useTranslation(["translation", "english", "local"]);
  const { nameSpace, isTargetCountry } = useUserLocationLanguage();

  const pocketWifi = t(`${nameSpace}:pocketWifi`, { returnObjects: true });

  return (
    <section className="sec_common_60">
      <div className="containerX">
        <SectionHeader
          heading={pocketWifi?.howToConnect?.heading}
          subHeading={pocketWifi?.howToConnect?.subHeading}
          containerClassName="gap-4"
        />
        <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-10 md:mt-15">
          {pocketWifi?.howToConnect?.steps?.map((step, index) => (
            <InfoCard
              key={index}
              title={step?.title}
              description={step?.description}
            >
              <span className="text-5xl sm:text-6xl md:text-6xml font-bold text-main-600">
                {index + 1}
              </span>
            </InfoCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowToConnect;
