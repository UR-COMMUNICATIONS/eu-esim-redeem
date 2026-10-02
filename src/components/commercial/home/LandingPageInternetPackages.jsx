import LandingPageInternetPackage from "@/components/commercial/home/LandingPageInternetPackage";
import useDynamicImports from "@/hooks/useDynamicImports";
import useExternalPromo from "@/hooks/useExternalPromo";
import { setCartData } from "@/store/module/cart/cartSlice";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";

function LandingPageInternetPackages({ urlCountryCode, urlCountryName }) {
  const dispatch = useDispatch();
  useExternalPromo();

  useEffect(() => {
    dispatch(setCartData({ comp: "" }));
  }, [dispatch]);

  const skyticketBannerPath =
    "&/countries/{currentCountry}/src/components/commercial/home/SkyticketBanner.jsx";
  const SkyticketBanner_Dynamic = useDynamicImports(skyticketBannerPath);

  return (
    <div className="overflow-hidden w-full">
      <Suspense fallback={<div>Loading...</div>}>
        {SkyticketBanner_Dynamic ? <SkyticketBanner_Dynamic /> : null}
      </Suspense>
      <LandingPageInternetPackage
        urlCountryCode={urlCountryCode}
        urlCountryName={urlCountryName}
      />
    </div>
  );
}

export default LandingPageInternetPackages;
