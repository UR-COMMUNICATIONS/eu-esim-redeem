import React from "react";
import useExternalPromo from "@/hooks/useExternalPromo";
import BrandLogo from "./Fsim/BrandLogo";
import JoyParadiseBnr from "./Fsim/JoyParadiseBnr";
import WhyFreeSim from "./Fsim/WhyFreeSim";
import EasySteps from "./Fsim/EasySteps";

const JoyParadise = () => {
  useExternalPromo();

  return (
    <div className="overflow-hidden w-full">
      <BrandLogo className="pt-10 xl:mb-5" />
      <JoyParadiseBnr />
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

export default JoyParadise;
