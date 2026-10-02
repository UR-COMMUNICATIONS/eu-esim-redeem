import React from "react";
import JtbBnr from "./Fsim/JtbBnr";
import WhyFreeSim from "./Fsim/WhyFreeSim";
import EasySteps from "./Fsim/EasySteps";
import useExternalPromo from "@/hooks/useExternalPromo";
import BrandLogo from "./Fsim/BrandLogo";

const Jtb = () => {
    useExternalPromo();
    return (
        <div className="overflow-hidden w-full">
            <BrandLogo className="pt-10 xl:mb-5" />
            <JtbBnr />
            <WhyFreeSim comp="jtb" bgColor="#CEF5FF" textColor="#4F4F4F" headingColor="text-black" />
            <EasySteps color="#00264C" />
        </div>
    );
};

export default Jtb;
