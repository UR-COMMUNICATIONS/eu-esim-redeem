import React from "react";
import useExternalPromo from "@/hooks/useExternalPromo";
import KolBnr from "./Fsim/KolBnr";
import KolWhyFreeSim from "./Fsim/KolWhyFreeSim";
import KolEasySteps from "./Fsim/KolEasySteps";
import BrandLogo from "./Fsim/BrandLogo";
import TermsList from "@/components/shared/others/TermsList";

const Kol = () => {
  useExternalPromo();
  return (
    <div className="overflow-hidden w-full">
      <BrandLogo className="pt-10" />
      <KolBnr />
      <KolWhyFreeSim
        comp="kol"
        bgColor="#ef4141"
        textColor="#FFFFFF"
        headingColor="text-white"
      />
      <KolEasySteps color="#ed3942" />
      <TermsList
        className="mt-10 md:py-20 px-6 py-10 containerX mx-auto"
        titleKey="kol.termsTitle"
        listKey="kol.termsList"
      />
    </div>
  );
};

export default Kol;
