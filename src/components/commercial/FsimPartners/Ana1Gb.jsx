import React from "react";
import useExternalPromo from "@/hooks/useExternalPromo";
import KolWhyFreeSim from "./Fsim/KolWhyFreeSim";
import Ana1GbSteps from "./Fsim/Ana1GbSteps";
import Ana1GbBnr from "./Fsim/Ana1GbBnr";
import Ana1GbUpgradeCoverage from "./Fsim/Ana1GbUpgradeCoverage";
import BrandLogo from "./Fsim/BrandLogo";
import CountryCoverage from "./Fsim/CountryCoverage";
import { ana1GbCountries } from "./fsimConfig";

const Ana1Gb = () => {
  useExternalPromo();
  return (
    <div className="overflow-hidden w-full">
      <BrandLogo className="pt-10" />
      <Ana1GbBnr />
      {/* <CountryCoverage
        countries={ana1GbCountries.map((country) => country.name)}
        translationNamespace="ana1gbCountryCoverage"
      /> */}
      <Ana1GbUpgradeCoverage />
      <KolWhyFreeSim
        comp="kol"
        bgColor="#ef4141"
        textColor="#FFFFFF"
        headingColor="text-white"
      />
      <Ana1GbSteps />
    </div>
  );
};

export default Ana1Gb;
