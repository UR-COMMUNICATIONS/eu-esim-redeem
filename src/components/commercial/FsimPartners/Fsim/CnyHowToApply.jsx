import InfoCard from "@/components/shared/cards/InfoCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { useTranslation } from "react-i18next";

const CnyHowToApply = () => {
  const { t } = useTranslation(["translation", "english", "local"]);
  const cnyData = t("cny", { returnObjects: true });
  console.log("🔍 CnyHowToApply - cnyData:", cnyData);
  console.log("🔍 CnyHowToApply - typeof cnyData:", typeof cnyData);
  console.log(
    "🔍 CnyHowToApply - cnyData keys:",
    cnyData && typeof cnyData === "object" ? Object.keys(cnyData) : "N/A",
  );

  const howToApply = cnyData?.howToApply || {};
  console.log("🔍 CnyHowToApply - howToApply:", howToApply);
  console.log(
    "🔍 CnyHowToApply - howToApply keys:",
    typeof howToApply === "object" ? Object.keys(howToApply) : "N/A",
  );

  const steps = Array.isArray(howToApply?.steps) ? howToApply.steps : [];
  console.log("🔍 CnyHowToApply - steps:", steps);
  console.log("🔍 CnyHowToApply - steps length:", steps.length);

  return (
    <section className="sec_common_60">
      <div className="containerX">
        <SectionHeader
          heading={howToApply?.heading || ""}
          containerClassName="gap-4"
        />
        <div className="w-full flex flex-col gap-6 mt-15">
          {steps.length > 0 && steps[0] && (
            <InfoCard
              title={steps[0].title || ""}
              description={steps[0].description || ""}
            >
              <span className="text-5xl sm:text-6xl md:text-6xl font-bold text-main-600">
                1
              </span>
            </InfoCard>
          )}
          {steps.length > 1 && steps[1] && (
            <InfoCard
              title={steps[1].title || ""}
              description={steps[1].description || ""}
            >
              <span className="text-5xl sm:text-6xl md:text-6xl font-bold text-main-600">
                2
              </span>
            </InfoCard>
          )}
          {steps.length > 2 && steps[2] && (
            <InfoCard
              title={steps[2].title || ""}
              description={steps[2].description || ""}
            >
              <span className="text-5xl sm:text-6xl md:text-6xl font-bold text-main-600">
                3
              </span>
            </InfoCard>
          )}
        </div>
      </div>
    </section>
  );
};

export default CnyHowToApply;
