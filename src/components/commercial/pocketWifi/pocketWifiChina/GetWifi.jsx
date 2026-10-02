import InfoCard from "@/components/shared/cards/InfoCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { useTranslation } from "react-i18next";

function GetWifi() {
  const { t } = useTranslation();
const steps = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <section className="sec_common_60">
      <div className="containerX">
        <SectionHeader
          heading={t("pocketWifiChina.howToGet.title")}
          subHeading={t("pocketWifiChina.howToGet.titlefollow")}
          headingClassName="text-4xl"
          containerClassName="gap-4"
        />
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mt-15">
          
          {steps.map((step) => (
            <InfoCard
              key={step}
              subtitle={t(
                `pocketWifiChina.howToGet.steps.${step}.title`
              )}
            >
              <h6 className="text-5xl sm:text-6xl md:text-6xml font-bold text-main-600">
                {step + 1}
              </h6>
            </InfoCard>
          ))}
        
        </div>
      </div>
    </section>
  );
}

export default GetWifi;
