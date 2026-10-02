import InfoCard from "@/components/shared/cards/InfoCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { useTranslation } from "react-i18next";

function ImportantConsiderations() {
  const { t } = useTranslation();
  const steps = [0, 1, 2];

  return (
    <section className="sec_common_60">
      <div className="containerX">
        <SectionHeader
          heading={t("pocketWifiChina.ImportantConsiderations.title")}
          subHeading={t("pocketWifiChina.ImportantConsiderations.titlefollow")}
          containerClassName="gap-4"
          headingClassName="text-4xl"
        />
        <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-10 md:mt-15">
          {steps.map((step) => (
            <InfoCard
              key={step}
              title={t(
                `pocketWifiChina.ImportantConsiderations.considerations.${step}.title`
              )}
              description={t(
                `pocketWifiChina.ImportantConsiderations.considerations.${step}.description`
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

export default ImportantConsiderations;
