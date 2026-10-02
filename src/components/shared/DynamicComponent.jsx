// LazyWrapper.js
import React, { Suspense } from "react";
import HomeSkeleton from "@/skeletons/home";
import JtbSkeleton from "@/skeletons/jtb";
import CountryListSkeleton from "@/skeletons/home/CountryListSkeleton";
import BannerSkeleton from "@/skeletons/home/BannerSkeleton";
import RegisterFormSkeleton from "@/components/commercial/FsimRegister/RegisterFormSkeleton";
import DownloadYoowifiSkeleton from "@/skeletons/DownloadYoowifiSkeleton";
import InternetPackageSkeleton from "@/skeletons/home/InternetPackageSkeleton";
import Loader from "./Loader";

const fallbacks = {
  HomeSkeleton: <HomeSkeleton />,
  BannerSkeleton: <BannerSkeleton />,
  JtbSkeleton: <JtbSkeleton />,
  CountryListSkeleton: <CountryListSkeleton />,
  DownloadYoowifiSkeleton: <DownloadYoowifiSkeleton />,
  InternetPackageSkeleton: <InternetPackageSkeleton />,
  Loader: (
    <div className="w-full flex items-center justify-center min-h-[400px]">
      <Loader
        type="Oval"
        color="#dc3545"
        height={"18vw"}
        width={"18vw"}
        className="max-h-[100px] max-w-[100px] min-h-[60px] min-w-[60px]"
      />
    </div>
  ),
};

export default function DynamicComponent({
  Comp,
  Fallback = "HomeSkeleton",
  ...props
}) {
  if (!Comp) return;
  return (
    // <Suspense fallback={React.lazy(() => import("@/skeletons/home"))}>
    // <Suspense fallback={fallbacks[Fallback]}>
    <Suspense fallback={fallbacks[Fallback]}>
      <Comp {...props} />
      {/* {React.createElement(Comp)} */}
    </Suspense>
  );
}

// const AboutPage = loadable(() => import('./pages/AboutPage'));
// export default function LazyBanner(importFunc, fallback = null) {
//     const Component = React.lazy(importFunc);

//     return (props) => (
//         <Suspense fallback={fallback ?? <div>Loading...</div>}>
//             <Component {...props} />
//         </Suspense>
//     );
// }
