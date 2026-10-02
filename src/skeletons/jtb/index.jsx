import React from "react";
import JtbLogoSkeleton from "./JtbLogoSkeleton";
import JtbBnrSkeleton from "./JtbBnrSkeleton";
import FooterSkeleton from "../FooterSkeleton";
import DownloadYoowifiSkeleton from "../DownloadYoowifiSkeleton";
import WhyFreeSimSkeleton from "../WhyFreeSimSkeleton";
import NavBarSecondarySkeleton from "../NavBarSecondarySkeleton";
import EasyStepsSkeleton from "../EasyStepsSkeleton";

const JtbSkeleton = () => {
    return (
        <>
            {/* <NavBarSecondarySkeleton /> */}
            <JtbLogoSkeleton className="pt-10 xl:mb-5" />
            <JtbBnrSkeleton />
            <WhyFreeSimSkeleton />
            <EasyStepsSkeleton />
            {/* <DownloadYoowifiSkeleton /> */}
            {/* <FooterSkeleton /> */}
        </>
    );
};

export default JtbSkeleton;
