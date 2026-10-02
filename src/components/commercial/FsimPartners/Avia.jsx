import React from "react";
import useExternalPromo from "@/hooks/useExternalPromo";
import AviaBanner from "./Fsim/AviaBanner";
import AviaWhyFreeSim from "./Fsim/AviaWhyFreeSim";
import AviaEasySteps from "./Fsim/AviaEasySteps";
import BrandLogo from "./Fsim/BrandLogo";
import TermsList from "@/components/shared/others/TermsList";

const Avia = () => {
  useExternalPromo();
  sessionStorage.setItem("source", "urwifiid");
  return (
    <div className="overflow-hidden w-full">
      <BrandLogo className="pt-10" />
      <AviaBanner />
      <AviaWhyFreeSim
        comp="avia"
        bgColor="#ef4141"
        textColor="#FFFFFF"
        headingColor="text-white"
      />
      <AviaEasySteps color="#ed3942" comp="avia" />
      <TermsList
        className="mt-10 md:py-20 px-6 py-10 containerX mx-auto"
        titleKey="avia.termsTitle"
        listKey="avia.termsList"
      />
    </div>
  );
};

export default Avia;
