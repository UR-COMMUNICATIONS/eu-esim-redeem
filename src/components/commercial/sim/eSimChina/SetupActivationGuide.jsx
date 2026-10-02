import SectionHeader from "@/components/shared/others/SectionHeader";
import React from "react";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

export default function SetupActivationGuide() {
  const { t } = useTranslation();

  return (
    <section className="container3X sec_common_60 bg-neutral-100 rounded-3xl my-6 xl:my-15">
      <SectionHeader
        heading={t("eSimChina.setupActivation.title")}
        subHeading={
          <Trans
            i18nKey="eSimChina.setupActivation.titlefollow"
            components={{
              1: (
                <a
                  href="https://yoowifi.com/esim-thailand"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b-2 border-b-blue-400 text-blue-400"
                />
              )
            }}
          />
        }
        headingClassName="text-4xl"
        containerClassName="gap-4"
      />

      <h3 className="text-black-900 text-base leading-[140%] md:text-2xl text-center mt-10 mb-4 font-semibold">
        {t("eSimChina.setupActivation.titlefollow2")}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm md:text-base mt-6 md:mt-6 lg:mt-10">
        {t("eSimChina.setupActivation.guides", { returnObjects: true }).map(
          (guide, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 lg:p-8">
              <h4 className="text-red-600 font-semibold text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 lg:mb-10">
                {guide.device}
              </h4>
              <ol className="list-decimal list-inside space-y-2 md:space-y-3 lg:space-y-4 text-sm md:text-base lg:text-lg text-gray-700">
                {guide.steps.map((step, stepIndex) => (
                  <li key={stepIndex}>{step}</li>
                ))}
              </ol>
            </div>
          )
        )}
      </div>
    </section>
  );
}
