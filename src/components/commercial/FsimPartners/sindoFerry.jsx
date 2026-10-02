import React from "react";
import WhyFreeSim from "./Fsim/WhyFreeSim";
import EasySteps from "./Fsim/EasySteps";
import useExternalPromo from "@/hooks/useExternalPromo";
import SindoFerryBnr from "./Fsim/sindoferryBnr";
import BrandLogo from "./Fsim/BrandLogo";
import { useParams } from "react-router-dom";

const SindoFerry = () => {
  useExternalPromo();

  // const { brand } = useParams();
  // const comp = brand?.toLowerCase();

  return (
    <div className="overflow-hidden w-full">
      <BrandLogo className="pt-10 xl:mb-5" />
      <SindoFerryBnr />
      <WhyFreeSim
        comp="sindoferry"
        bgColor="#CEF5FF"
        textColor="#4F4F4F"
        headingColor="text-black"
      />
      <EasySteps color="#00264C" />
    </div>
  );
};

export default SindoFerry;
