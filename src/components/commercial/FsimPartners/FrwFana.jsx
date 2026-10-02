import React from "react";
import useExternalPromo from "@/hooks/useExternalPromo";
import KolWhyFreeSim from "./Fsim/KolWhyFreeSim";
import KolEasySteps from "./Fsim/KolEasySteps";
import FrwFanaBnr from "./Fsim/FrwFanaBnr";
import BrandLogo from "./Fsim/BrandLogo";

const FrwFana = () => {
    useExternalPromo();
    return (
        <div className="overflow-hidden w-full">
            <BrandLogo className="pt-10" />
            <FrwFanaBnr />
            <KolWhyFreeSim comp="kol" bgColor="#ef4141" textColor="#FFFFFF" headingColor="text-white" />
            <KolEasySteps color="#ed3942" />
        </div>
    );
};

export default FrwFana;
