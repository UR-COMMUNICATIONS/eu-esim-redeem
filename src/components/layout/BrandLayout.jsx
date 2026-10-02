import useModal from "@/hooks/useModal";
import useScrollToTop from "@/hooks/useScrollToTop";
import useSetLocalData from "@/hooks/useSetLocalData";
import NotFound from "@/pages/NotFound";
import { lazy } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { fsimConfig } from "../commercial/FsimPartners/fsimConfig";
import CanonicalTag from "../SEO/CanonicalTag";
import DynamicComponent from "../shared/DynamicComponent";
import Footer from "../shared/navigation/Footer";
import NavBarSecondary from "../shared/navigation/NavBarSecondary";
import DownloadYoowifi from "../shared/others/DownloadYoowifi";
import EuWifiPromoBanner from "../commercial/FsimPartners/Fsim/EuWifiPromoBanner";
import useResetSource from "@/hooks/useResetSource";

const components = {
  fsim: lazy(() => import("@/components/commercial/FsimPartners/Jtb")),
  jtb: lazy(() => import("@/components/commercial/FsimPartners/Jtb")),
  cny2026: lazy(() => import("@/components/commercial/FsimPartners/Cny")),
  sq: lazy(() => import("@/components/commercial/FsimPartners/Sq")),
  sqfairid: lazy(() => import("@/components/commercial/FsimPartners/Sq")),
  sqfairpromo: lazy(
    () => import("@/components/commercial/FsimPartners/SqFairPromo"),
  ),
  avia: lazy(() => import("@/components/commercial/FsimPartners/Avia")),
  avia2026: lazy(() => import("@/components/commercial/FsimPartners/Avia")),
  obaja: lazy(() => import("@/components/commercial/FsimPartners/Obaja")),
  obaja2026: lazy(() => import("@/components/commercial/FsimPartners/Obaja")),
  wita: lazy(() => import("@/components/commercial/FsimPartners/Wita")),
  wita2026: lazy(() => import("@/components/commercial/FsimPartners/Wita")),
  panorama26: lazy(
    () => import("@/components/commercial/FsimPartners/Panorama"),
  ),
  gdrama26: lazy(() => import("@/components/commercial/FsimPartners/Gdrama")),
  kol: lazy(() => import("@/components/commercial/FsimPartners/Kol")),
  airasia: lazy(() => import("@/components/commercial/FsimPartners/AirAsia")),
  astindo: lazy(() => import("@/components/commercial/FsimPartners/Astindo")),
  frwfana: lazy(() => import("@/components/commercial/FsimPartners/FrwFana")),
  ana1gb: lazy(() => import("@/components/commercial/FsimPartners/Ana1Gb")),
  sindoferry: lazy(
    () => import("@/components/commercial/FsimPartners/SindoFerry"),
  ),
  joyparadise: lazy(
    () => import("@/components/commercial/FsimPartners/JoyParadise"),
  ),
  mattatl26: lazy(
    () => import("@/components/commercial/FsimPartners/Mattatl26"),
  ),
  euwifi: lazy(() => import("@/components/commercial/FsimPartners/EuWifi")),
  "welcome-credit": lazy(() => import("@/pages/commercial/WelcomeCredit")),
};

function BrandLayout() {
  useSetLocalData("brandLayout");
  // useResetSource();
  useScrollToTop();
  const { authModal, loginModal, appDownloadModal } = useModal();
  const { brand } = useParams();
  const location = useLocation();
  const isBaseRoute = [`/${brand}`, `/${brand}/`].includes(location.pathname);
  // console.log("branddddddddddd", brand);
  // console.log("location", location);
  const allowedBrands = Object.keys(fsimConfig).filter(
    (val) => val !== "default",
  );
  // console.log("allowedBrands", allowedBrands);
  const isValidBrand = allowedBrands.includes(brand);
  const isEuWifi = brand?.toLowerCase() === "euwifi";
  const hideFooter = isEuWifi;
  // console.log("isValidBrand", isValidBrand);

  if (!isValidBrand) {
    return <NotFound />;
  }

  return (
    <main>
      <CanonicalTag />
      <NavBarSecondary />
      {/* <DynamicComponent Comp={components[brand?.toLowerCase()]} /> */}
      {isBaseRoute && (
        <DynamicComponent Comp={components[brand?.toLowerCase()]} />
      )}
      <Outlet />
      {isEuWifi ? <EuWifiPromoBanner /> : <DownloadYoowifi />}
      {!hideFooter && <Footer />}
      {authModal}
      {loginModal}
      {appDownloadModal}
    </main>
  );
}

export default BrandLayout;
