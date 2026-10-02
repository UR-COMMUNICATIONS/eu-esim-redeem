import GetYourOwn from "@/components/commercial/home/GetYourOwn";
// import Hero from "@/components/commercial/home/Hero";
import HowItWorks from "@/components/commercial/home/HowItWorks";
import InternetPackage from "@/components/commercial/home/InternetPackage";
import WhyYoowifi from "@/components/commercial/home/WhyYoowifi";
import CollaborateMarquee from "@/components/shared/CollaborateMarquee";
import CountryCoverage from "./countryCoverage/CountryCoverage";
import useDynamicImports from "@/hooks/useDynamicImports";
import React, { Suspense } from "react";
import HowItWorksSkeleton from "@/components/commercial/home/HowItWorksSkeleton";
import BannerSkeleton from "@/skeletons/home/BannerSkeleton";
import StayConnected from "@/components/commercial/StayConnected.jsx";
import StayConnectedYourWay from "@/components/commercial/home/StayConnectedYourWay";
// import GetYourOwnSkeleton from "@/skeletons/home/GetYourOwnSkeleton";
// import InternetPackageSkeleton from "@/components/commercial/home/InternetPackageSkeleton";
// import WhyYoowifiSkeleton from "@/components/commercial/home/WhyYoowifiSkeleton";
// import HowItWorksSkeleton from "@/components/commercial/home/HowItWorksSkeleton";
// import CollaborateMarqueeSkeleton from "@/components/shared/CollaborateMarqueeSkeleton";

const Hero = React.lazy(() => import("@/components/commercial/home/Hero"));

function Home() {
  const path =
    "&/countries/{currentCountry}/src/components/commercial/home/HowItWorks.jsx";
  const HowItWorks_Dynamic = useDynamicImports(path);
  return (
    <div className="overflow-hidden w-full">
      <Suspense fallback={<BannerSkeleton />}>
        <Hero />
      </Suspense>
      {/* <Hero /> */}
      {/* <GetYourOwn /> */}
      <InternetPackage isCallPriorityPlans={true} />
      <StayConnectedYourWay />
      <WhyYoowifi />
      {/* <StayConnectedRegions /> */}
      <CountryCoverage isHideBanner={true} />
      {/* <CustomerTestimonial /> */}
      <Suspense fallback={<HowItWorksSkeleton />}>
        {HowItWorks_Dynamic ? <HowItWorks_Dynamic /> : null}
      </Suspense>

      <CollaborateMarquee />
    </div>
  );
}

export default Home;
