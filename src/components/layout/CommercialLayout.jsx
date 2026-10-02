import useModal from "@/hooks/useModal";
import useSetLocalData from "@/hooks/useSetLocalData";
// [PHASE1-HIDDEN] Link / useLocation were only used by the hidden header branches
// import { Link, Outlet, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
// import { Suspense } from "react";
// import NavBarSecondarySkeleton from "@/skeletons/NavBarSecondarySkeleton";
// import DownloadYoowifiSkeleton from "@/skeletons/DownloadYoowifiSkeleton";
// import FooterSkeleton from "@/skeletons/FooterSkeleton";

// [PHASE1-HIDDEN] wesim logo (wesim-only header)
// import logoWesim from "@/assets/images/logo-wesim.webp";
import Footer from "@/components/shared/navigation/Footer";
// [PHASE1-HIDDEN] NavBar (the "/" header) - NavBarSecondary is used everywhere now
// import NavBar from "@/components/shared/navigation/NavBar";
import NavBarSecondary from "@/components/shared/navigation/NavBarSecondary";
// [PHASE1-HIDDEN] useDynamicImports (DownloadYoowifi block)
// import useDynamicImports from "@/hooks/useDynamicImports";
import useResetSource from "@/hooks/useResetSource";
import useScrollToTop from "@/hooks/useScrollToTop";
// [PHASE1-HIDDEN] Suspense (only wrapped the DownloadYoowifi block)
// import { Suspense } from "react";
import CanonicalTag from "../SEO/CanonicalTag";

// const NavBar = React.lazy(() => import("@/components/shared/navigation/NavBar"));
// const NavBarSecondary = React.lazy(() => import("@/components/shared/navigation/NavBarSecondary"));
// const DownloadYoowifi = React.lazy(() => import("@/components/shared/others/DownloadYoowifi"));
// const Footer = React.lazy(() => import("@/components/shared/navigation/Footer"));

function CommercialLayout() {
  useSetLocalData("commercialLayout");
  useResetSource();
  useScrollToTop();
  // [PHASE1-HIDDEN] per-path header switching: every page now gets NavBarSecondary
  // const location = useLocation();
  // const { pathname } = location;
  // const isHome = pathname === "/";
  // const isInstantWesim = pathname === "/instant-wesim";
  // const isHome = location.pathname === "/:countryCode?";
  const { authModal, otpModal, loginModal, appDownloadModal } = useModal();
  // [PHASE1-HIDDEN] dynamic DownloadYoowifi block above the footer
  // const path =
  //   "&/countries/{currentCountry}/src/components/shared/others/DownloadYoowifi.jsx";
  // const LazyLoadImage_Dynamic = useDynamicImports(path, "comp", [
  //   "ph",
  //   "id",
  //   "my",
  // ]);

  // console.log("isHome: LazyLoadImage_Dynamic", LazyLoadImage_Dynamic);

  return (
    <main>
      <CanonicalTag />
      {/* <Suspense
        fallback={<NavBarSecondarySkeleton />}> */}
      {/* [PHASE1-HIDDEN] wesim-only header and the "/" NavBar branch
      {isInstantWesim ? (
        <header className="sticky top-0 left-0 w-full z-40 border-b border-neutral-200 bg-white">
          <div className="w-full max-w-[2560px] mx-auto flex items-center px-4 py-3">
            <Link to="/instant-wesim" className="block">
              <img
                src={logoWesim}
                alt="WeSim"
                className="h-10 w-24 rounded-sm"
              />
            </Link>
          </div>
        </header>
      ) : isHome ? (
        <NavBar />
      ) : (
        <NavBarSecondary />
      )} */}
      <NavBarSecondary />
      {/* </Suspense> */}
      <Outlet />
      {/* [PHASE1-HIDDEN] dynamic DownloadYoowifi block; the footer is now unconditional
      {!isInstantWesim && (
        <>
          <Suspense fallback={<div>Loading...</div>}>
            {LazyLoadImage_Dynamic ? <LazyLoadImage_Dynamic /> : null}
          </Suspense>
          <Footer />
        </>
      )} */}
      <Footer />
      {authModal}
      {loginModal}
      {appDownloadModal}
    </main>
  );
}

export default CommercialLayout;
