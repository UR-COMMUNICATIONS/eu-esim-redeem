import InternetPackage from "@/components/commercial/home/InternetPackage";
import useDynamicImports from "@/hooks/useDynamicImports";
import useExternalPromo from "@/hooks/useExternalPromo";
import { setCartData } from "@/store/module/cart/cartSlice";
import React, { Suspense } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function ProductInternetPackage() {
  const dispatch = useDispatch();
  useExternalPromo();
  useEffect(() => {
    dispatch(setCartData({ comp: "" }));
  }, []);
  const path =
    "&/countries/{currentCountry}/src/components/commercial/home/SkyticketBanner.jsx";
  const SkyticketBanner_Dynamic = useDynamicImports(path);
  // console.log("Dynamic import path:", path);
  return (
    <div className="overflow-hidden w-full">
      {/* <SkyticketBanner /> */}
      <Suspense fallback={<div>Loading...</div>}>
        {SkyticketBanner_Dynamic ? <SkyticketBanner_Dynamic /> : null}
      </Suspense>
      <InternetPackage isCallPriorityPlans={true} />
    </div>
  );
}

export default ProductInternetPackage;
