import SectionHeader from "@/components/shared/others/SectionHeader";
import { RedCross, RedTick } from "@/services";
import React from "react";
import { useTranslation } from "react-i18next";

export default function SimComparison() {
  const { t } = useTranslation();

  const simData = {
    whatsBetter: {
      title: "FeSIM vs. Physical SIM – What's Better?",
      titlefollow:
        "Yoowifi gives you options because we know one size doesn't fit all. Whether you're a digital nomad or casual traveller, we've got you covered:",
      esim: {
        title: "eSIM",
        points: [
          {
            text: "Fast activation via QR code—instant connection",
            isNegative: false,
          },
          { text: "No SIM swapping needed", isNegative: false },
          { text: "Convenient for international travel", isNegative: false },
          { text: "Not all networks/phones support eSIM", isNegative: true },
        ],
      },
      physicalSim: {
        title: "Physical SIM Card",
        points: [
          { text: "Works with most phones", isNegative: false },
          {
            text: "Easy to swap SIMs when changing devices",
            isNegative: false,
          },
          { text: "Ideal for users who are not tech-savvy", isNegative: false },
          { text: "Requires physical delivery or pickup", isNegative: true },
        ],
      },
    },
  };

  return (
    <section className="container3X sec_common_60 bg-neutral-100 rounded-3xl">
      <div className="container3X rounded-3xl px-0 2xl:px-12 py-6 bg-neutral-100">
        <SectionHeader
          heading={t("eSimChina.whatsBetter.title")}
          subHeading={t("eSimChina.whatsBetter.titlefollow")}
          headingClassName="text-4xl"
          containerClassName="gap-4"
        />

        <div className="flex flex-col md:flex-row gap-6 mt-6 md:mt-10 lg:mt-15">
          {/* eSIM Card */}
          <div className="flex-1 flex flex-col rounded-2xl">
            <div className="bg-red-600 text-white py-3 md:py-5 lg:py-6 px-8 font-semibold rounded-t-2xl text-center text-lg md:text-xl lg:text-2xl">
              {t("eSimChina.whatsBetter.esim.title")}
            </div>
            <ul className="flex-1 space-y-3 text-sm md:text-base lg:text-lg bg-neutral-50 rounded-b-2xl">
              {simData.whatsBetter.esim.points.map((point, index) => (
                <li
                  key={index}
                  className={`flex items-start py-2 md:py-4 lg:py-6 px-8 ${
                    index !== simData.whatsBetter.esim.points.length - 1
                      ? "border-b border-neutral-200"
                      : ""
                  }`}
                >
                  <span className="mr-3 md:mr-3 lg:mr-5">
                    {point.isNegative ? <RedCross /> : <RedTick />}
                  </span>
                  {t(`eSimChina.whatsBetter.esim.points.${index + 1}`)}
                </li>
              ))}
            </ul>
          </div>

          {/* Physical SIM Card */}
          <div className="flex-1 flex flex-col rounded-2xl">
            <div className="bg-red-600 text-white py-3 md:py-5 lg:py-6 px-8 font-semibold rounded-t-2xl text-center text-lg md:text-xl lg:text-2xl">
              {t("eSimChina.whatsBetter.pocketWifi.title")}
            </div>
            <ul className="flex-1 space-y-3 text-sm md:text-base lg:text-lg bg-neutral-50 rounded-b-2xl">
              {simData.whatsBetter.physicalSim.points.map((point, index) => (
                <li
                  key={index}
                  className={`flex items-start py-2 md:py-4 lg:py-6 px-8 ${
                    index !== simData.whatsBetter.physicalSim.points.length - 1
                      ? "border-b border-neutral-200"
                      : ""
                  }`}
                >
                  <span className="mr-3 md:mr-3 lg:mr-5">
                    {point.isNegative ? <RedCross /> : <RedTick />}
                  </span>
                  {t(`eSimChina.whatsBetter.pocketWifi.points.${index + 1}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
