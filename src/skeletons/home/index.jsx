import React from "react";
import FooterSkeleton from "../FooterSkeleton";
import DownloadYoowifiSkeleton from "../DownloadYoowifiSkeleton";
import NavBarSecondarySkeleton from "../NavBarSecondarySkeleton";
import BannerSkeleton from "./BannerSkeleton";
import GetYourOwnSkeleton from "./GetYourOwnSkeleton";
import InternetPackageSkeleton from "./InternetPackageSkeleton";
import WhyYoowifiSkeleton from "./WhyYoowifiSkeleton";
import CountryListSkeleton from "./CountryListSkeleton";
import { ProductCardSkeleton } from "./ProductsSkeleton";
import CustomerTestimonialSkeleton from "./CustomerTestimonialSkeleton";
import CollaborateMarqueeSkeleton from "./CollaborateMarqueeSkeleton";

const HomeSkeleton = () => {
    return (
        <>
            <NavBarSecondarySkeleton />
            <BannerSkeleton />
            <GetYourOwnSkeleton />
            <InternetPackageSkeleton />
            <WhyYoowifiSkeleton />
            <CountryListSkeleton />
            {/* <ProductCardSkeleton /> */}
            <CustomerTestimonialSkeleton />
            {/* <CollaborateMarqueeSkeleton /> */}
            <DownloadYoowifiSkeleton />
            <FooterSkeleton />
        </>
    );
};

export default HomeSkeleton;
