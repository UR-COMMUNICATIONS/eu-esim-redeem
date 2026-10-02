import React from "react";
import { useTranslation } from "react-i18next";

import SectionHeader from "@/components/shared/others/SectionHeader";

const defaultCountries = [
  "Cambodia",
  "Hong Kong",
  "Indonesia",
  "Macao",
  "Malaysia",
  "Philippines",
  "Singapore",
  "Taiwan",
  "Thailand",
  "Vietnam",
];

const CountryCoverage = ({
  countries = defaultCountries,
  translationNamespace = "frwfanaCountryCoverage",
}) => {
  const { t } = useTranslation();

  return (
    <section className="containerX">
      <div className="sec_common_80 xl:!px-0">
        <SectionHeader
          heading={t(`${translationNamespace}.heading`, "Country Coverage")}
          subHeading={t(
            `${translationNamespace}.subHeading`,
            "Stay connected across Asia with our comprehensive network coverage in these destinations",
          )}
        />

        <div className="mt-4 lg:mt-15 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-5">
          {countries.map((country, index) => (
            <div
              key={index}
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

export default CountryCoverage;
