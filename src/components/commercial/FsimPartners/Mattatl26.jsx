import React from "react";
import useExternalPromo from "@/hooks/useExternalPromo";
import BrandLogo from "./Fsim/BrandLogo";
import Mattatl26Bnr from "./Fsim/Mattatl26Bnr";
import WhyFreeSim from "./Fsim/WhyFreeSim";
import EasySteps from "./Fsim/EasySteps";

const Mattatl26 = () => {
  useExternalPromo();

  return (
    <div className="overflow-hidden w-full">
      <BrandLogo className="pt-10 xl:mb-5" />
      <Mattatl26Bnr />
      <WhyFreeSim
        comp="jtb"
        bgColor="#CEF5FF"
        textColor="#4F4F4F"
        headingColor="text-black"
      />
      <EasySteps color="#00264C" />
    </div>
  );
};

export default Mattatl26;
