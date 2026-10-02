import InfoCard from "@/components/shared/cards/InfoCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { useTranslation } from "react-i18next";

function WifiFeatures() {
  const { t } = useTranslation();
  const steps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <section className="sec_common_60">
      <div className="containerX">
        <SectionHeader
          heading={t("pocketWifiChina.wifiFeatures.title")}
          subHeading={t("pocketWifiChina.wifiFeatures.titlefollow")}
          containerClassName="gap-4"
          headingClassName="text-4xl"
        />
        <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-10 md:mt-15">
          {steps.map((step) => (
            <InfoCard
              key={step}
              title={t(`pocketWifiChina.wifiFeatures.features.${step}.title`)}
              description={t(
                `pocketWifiChina.wifiFeatures.features.${step}.description`
              )}
            >
              <h5 className="text-5xl sm:text-6xl md:text-6xml font-bold text-main-600">
                {step + 1}
              </h5>
            </InfoCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WifiFeatures;
