import React from "react";
import WhyFreeSim from "./Fsim/WhyFreeSim";
import EasySteps from "./Fsim/EasySteps";
import AirAsiaBnr from "./Fsim/AirAsiaBnr";
import useExternalPromo from "@/hooks/useExternalPromo";
import BrandLogo from "./Fsim/BrandLogo";

const AirAsia = () => {
    useExternalPromo();
    return (
        <div className="overflow-hidden w-full">
            <BrandLogo className="pt-10 xl:mb-5" />
            <AirAsiaBnr />
            <WhyFreeSim comp="airasia" bgColor="#ef4141" textColor="#FFFFFF" headingColor="text-white" />
            <EasySteps color="#ed3942" />
        </div>
    );
};

export default AirAsia;
