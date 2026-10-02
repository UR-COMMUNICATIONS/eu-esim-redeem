import React from "react";
import useExternalPromo from "@/hooks/useExternalPromo";
import WitaBanner from "./Fsim/WitaBanner";
import WitaWhyFreeSim from "./Fsim/WitaWhyFreeSim";
import WitaEasySteps from "./Fsim/WitaEasySteps";
import BrandLogo from "./Fsim/BrandLogo";
import TermsList from "@/components/shared/others/TermsList";

const Wita = () => {
  useExternalPromo();
  sessionStorage.setItem("source", "urwifiid");
  return (
    <div className="overflow-hidden w-full">
      <BrandLogo className="pt-10" />
      <WitaBanner />
      <WitaWhyFreeSim
        comp="wita"
        bgColor="#ef4141"
        textColor="#FFFFFF"
        headingColor="text-white"
      />
      <WitaEasySteps color="#ed3942" comp="wita" />
      <TermsList
        className="mt-10 md:py-20 px-6 py-10 containerX mx-auto"
        titleKey="wita.termsTitle"
        listKey="wita.termsList"
      />
    </div>
  );
};

export default Wita;
