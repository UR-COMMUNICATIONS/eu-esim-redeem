import InfoCard from "@/components/shared/cards/InfoCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

function SimFeatures() {
  const { t } = useTranslation();
  const steps = [0, 1, 2, 3, 4];

  return (
    <section className="sec_common_60 mt-6 xl:mt-15">
      <div className="containerX">
        <SectionHeader
          heading={t("eSimChina.simFeatures.title")}
          subHeading={t("eSimChina.simFeatures.titlefollow")}
          containerClassName="gap-4"
          headingClassName="text-4xl"
        />
        <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-10 md:mt-15">
          {steps.map((step,index) => (
            <InfoCard
              key={step}
              title={t(`eSimChina.simFeatures.features.${step}.title`)}
              description={
                <Trans
                  i18nKey={`eSimChina.simFeatures.features.${index}.description`}
                  components={{
                    1: (
                      <a
                        href={
                          index === 2
                            ? "https://yoowifi.com/product/pocket-wifi"
                            : index === 3
                              ? "https://yoowifi.com/pocket-wifi-china"
                              : "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-b-2 text-blue-400 border-b-blue-400"
                      ></a>
                    )
                  }}
                />
              }
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

export default SimFeatures;
