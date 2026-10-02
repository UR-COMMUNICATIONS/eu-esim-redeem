import CountryWiseLocation from "@/components/commercial/pickDropLocation/CountryWiseLocation";
import ReturnDevice from "@/components/commercial/pickDropLocation/ReturnDevice";
import HeroCommon from "@/components/shared/others/HeroCommon";
import useDynamicImports from "@/hooks/useDynamicImports";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { Fragment, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const PickDropLocation = () => {
  // const { t } = useTranslation();
  const { t } = useTranslation(["translation", "english", "local"]);
  const { currentCountry, isTargetCountry, nameSpace } =
    useUserLocationLanguage();
  const { hash } = useLocation();
  const shouldShowCountryWiseLocation =
    !isTargetCountry || (currentCountry === "my" && hash === "#view-location");
  const path =
    "&/countries/{currentCountry}/src/components/commercial/pickDropLocation/ReturnDevice.jsx";
  const ReturnDevice_Dynamic = useDynamicImports(path);
  console.log("shouldShowCountryWiseLocation", shouldShowCountryWiseLocation);
  return (
    <Fragment>
      <HeroCommon title={t(`${nameSpace}:pickDropLocation.heroTitle`)} />
      {/* <ReturnDeicve /> */}
      <Suspense fallback={<div>Loading...</div>}>
        {ReturnDevice_Dynamic ? <ReturnDevice_Dynamic /> : <ReturnDevice />}
      </Suspense>
      {shouldShowCountryWiseLocation && <CountryWiseLocation />}
    </Fragment>
  );
};

export default PickDropLocation;
