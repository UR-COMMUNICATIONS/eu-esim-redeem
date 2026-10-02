import InfoCard from "@/components/shared/cards/InfoCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { useTranslation } from "react-i18next";

const YOOWIFI_INSTAGRAM_URL =
  "https://www.instagram.com/yoowifi.co?igsh=MWg1M3FtNml5ZGh0bg==";

const ChallengerHowToRedeem = () => {
  const { t } = useTranslation();
  const challengerData = t("challenger", { returnObjects: true });
  const howToRedeem = challengerData?.howToRedeem || {};

  const steps = Array.isArray(howToRedeem?.steps) ? howToRedeem.steps : [];

  const wrapStep2 = (node, key) => (
    <a
      key={key}
      href={YOOWIFI_INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group block cursor-pointer hover:opacity-90 transition-opacity"
    >
      {node}
    </a>
  );

  return (
    <section className="sec_common_60 md:!py-8 !py-2">
      <div className="containerX">
        <SectionHeader
          heading={howToRedeem?.heading || t("challenger.howToRedeem.heading")}
          containerClassName="gap-4"
        />
        <div className="w-full flex flex-col gap-6 mt-15">
          {steps.length > 0 ? (
            steps.map((step, index) => {
              const card = (
                <InfoCard
                  key={index}
                  title={step.title || ""}
                  description={step.description || ""}
                  descriptionClass={index === 1 ? "group-hover:underline" : ""}
                >
                  <span className="text-5xl sm:text-6xl md:text-6xl font-bold text-main-600">
                    {index + 1}
                  </span>
                </InfoCard>
              );
              return index === 1 ? wrapStep2(card, index) : card;
            })
          ) : (
            <>
              <InfoCard
                title={t("challenger.howToRedeem.step1.title")}
                description={t("challenger.howToRedeem.step1.description")}
              >
                <span className="text-5xl sm:text-6xl md:text-6xl font-bold text-main-600">
                  1
                </span>
              </InfoCard>
              {wrapStep2(
                <InfoCard
                  title={t("challenger.howToRedeem.step2.title")}
                  description={t("challenger.howToRedeem.step2.description")}
                  descriptionClass="group-hover:underline"
                >
                  <span className="text-5xl sm:text-6xl md:text-6xl font-bold text-main-600">
                    2
                  </span>
                </InfoCard>,
              )}
              <InfoCard
                title={t("challenger.howToRedeem.step3.title")}
                description={t("challenger.howToRedeem.step3.description")}
              >
                <span className="text-5xl sm:text-6xl md:text-6xl font-bold text-main-600">
                  3
                </span>
              </InfoCard>
            </>
          )}
        </div>
        {howToRedeem?.note && (
          <div className="mt-6 md:mt-10">
            <p className="text-sm sm:text-base md:text-lg text-black-600">
              {howToRedeem.note}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChallengerHowToRedeem;
