import InfoCard from "@/components/shared/cards/InfoCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const CnyHowItWorks = () => {
  const { t } = useTranslation(["translation", "english", "local"]);
  const navigate = useNavigate();
  const cnyData = t("cny", { returnObjects: true });
  console.log("🔍 CnyHowItWorks - cnyData:", cnyData);
  console.log("🔍 CnyHowItWorks - typeof cnyData:", typeof cnyData);
  console.log(
    "🔍 CnyHowItWorks - cnyData keys:",
    cnyData && typeof cnyData === "object" ? Object.keys(cnyData) : "N/A",
  );

  const howItWorks = cnyData?.howItWorks || {};
  console.log("🔍 CnyHowItWorks - howItWorks:", howItWorks);
  console.log(
    "🔍 CnyHowItWorks - howItWorks keys:",
    typeof howItWorks === "object" ? Object.keys(howItWorks) : "N/A",
  );

  const steps = Array.isArray(howItWorks?.steps) ? howItWorks.steps : [];
  console.log("🔍 CnyHowItWorks - steps:", steps);
  console.log("🔍 CnyHowItWorks - steps length:", steps.length);

  return (
    <section className="sec_common_60 md:!py-8 !py-2">
      <div className="containerX">
        <div className="mb-6 md:mb-10">
          <p className="text-base sm:text-lg md:text-xl text-black-600 text-center whitespace-pre-line">
            {howItWorks?.introText || ""}
          </p>
        </div>
        <SectionHeader
          heading={howItWorks?.heading || ""}
          containerClassName="gap-4"
        />
        <div className="w-full flex flex-col gap-6 mt-15">
          {steps.length > 0 && steps[0] && (
            <div
              className="cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => navigate("/product/internet-packages")}
            >
              <InfoCard
                title={steps[0].title || ""}
                description={steps[0].description || ""}
              >
                <span className="text-5xl sm:text-6xl md:text-6xl font-bold text-main-600">
                  1
                </span>
              </InfoCard>
            </div>
          )}
          {steps.length > 1 && steps[1] && (
            <div className="cursor-pointer hover:opacity-90 transition-opacity block">
              <InfoCard
                title={steps[1].title || ""}
                description={
                  <span>
                    {steps[1].description1 || ""}{" "}
                    <Link
                      to="/how-to-setup-sim"
                      className="underline text-black-600 hover:text-main-600"
                    >
                      {steps[1].description2 || ""}
                    </Link>
                  </span>
                }
              >
                <span className="text-5xl sm:text-6xl md:text-6xl font-bold text-main-600">
                  2
                </span>
              </InfoCard>
            </div>
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
        {/* <div className="mt-6 md:mt-10">
          <p className="text-sm sm:text-base md:text-lg text-black-600">
            {howItWorks?.warning || ""}
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default CnyHowItWorks;
