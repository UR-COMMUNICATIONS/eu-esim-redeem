import React from "react";
import useExternalPromo from "@/hooks/useExternalPromo";
import SqBanner from "./Fsim/SqBanner";
import SqWhyFreeSim from "./Fsim/SqWhyFreeSim";
import SqEasySteps from "./Fsim/SqEasySteps";
import BrandLogo from "./Fsim/BrandLogo";
import TermsList from "@/components/shared/others/TermsList";

const Sq = () => {
  useExternalPromo();
  return (
    <div className="overflow-hidden w-full">
      <BrandLogo className="pt-10" />
      <SqBanner />
      <SqWhyFreeSim
        comp="sq"
        bgColor="#ef4141"
        textColor="#FFFFFF"
        headingColor="text-white"
      />
      <SqEasySteps color="#ed3942" comp="sq" />
      <TermsList
        className="mt-10 md:py-20 px-6 py-10 containerX mx-auto"
        titleKey="sq.termsTitle"
        listKey="sq.termsList"
      />
    </div>
  );
};

export default Sq;
