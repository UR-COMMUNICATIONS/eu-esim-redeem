import { useState } from "react";
import { useTranslation } from "react-i18next";

import SectionHeader from "@/components/shared/others/SectionHeader";
import { cn } from "@/lib/utils";

import { ana1GbUpgradeRegions } from "../fsimConfig";

// Coverage of the paid 15-day unlimited upgrade, in the same shape as the home
// page CountryList: region tabs over a country grid. Unlike the free-plan
// coverage above it, a traveller gets the countries of the one region they
// pick, not the union of all of them, so the tabs carry real meaning here.
const Ana1GbUpgradeCoverage = () => {
  const { t } = useTranslation();
  const [currentRegion, setCurrentRegion] = useState(ana1GbUpgradeRegions[0]);

  return (
    <section className="containerX">
      <div className="sec_common_80 xl:!px-0">
        <SectionHeader
          heading={t("ana1gbCountryCoverage.heading", "Plan Coverage")}
          midHeading={t(
            "ana1gbCountryCoverage.headingNote",
            "(Varies by Selected Region)",
          )}
          midHeadingClass="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mt-1"
        />

        <div className="my-4 lg:my-15 flex bg-neutral-200 rounded-[14px] py-2 px-2 overflow-x-auto">
          {ana1GbUpgradeRegions.map((region) => (
            <button
              key={region.labelKey}
              type="button"
              className={cn(
                "flex-1 whitespace-nowrap transition-all duration-300 ease-in-out py-3 md:py-4 px-4 text-sm md:text-base",
                region.labelKey === currentRegion.labelKey
                  ? "text-white bg-main-600 rounded-[8px] font-semibold"
                  : "bg-neutral-200 text-neutral-700 font-normal",
              )}
              onClick={() => setCurrentRegion(region)}
            >
              {t(`ana1gbUpgradeCoverage.regions.${region.labelKey}`)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-5">
          {currentRegion.countries.map((country) => (
            <div
              key={country}
              className="p-3 bg-neutral-100 rounded-xl flex items-center justify-center min-h-[68px]"
            >
              <p
                className="text-sm lg:text-[18px] font-semibold text-center"
                title={country}
              >
                {country}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ana1GbUpgradeCoverage;
