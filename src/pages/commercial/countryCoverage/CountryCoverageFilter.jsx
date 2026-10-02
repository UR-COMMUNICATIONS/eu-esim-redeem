import PackageFilterList from "@/components/commercial/countryCoverage/PackageFilterList";
import StayConnectedEverywhere from "@/components/commercial/countryCoverage/StayConnectedEverywhere";
import HowItWorks from "@/components/commercial/home/HowItWorks";
import CustomerTestimonial from "@/components/shared/others/CustomerTestimonial";
import { useLocation } from "react-router-dom";
import useDynamicImports from "@/hooks/useDynamicImports";
import React, { Suspense } from "react";
import InternetPackage from "@/components/commercial/home/InternetPackage";

const CountryCoverageFilter = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Get the value of the "region" query parameter
  const regionQuery = searchParams.get("region");
  const countryQuery = searchParams.get("country");

  const path =
    "&/countries/{currentCountry}/src/components/commercial/home/HowItWorks.jsx";
  const HowItWorks_Dynamic = useDynamicImports(path);

  return (
    <div className="overflow-hidden w-full">
      <InternetPackage />
      {/* <PackageFilterList params={{ regionQuery, countryQuery }} /> */}
      <CustomerTestimonial />
      <StayConnectedEverywhere />
      {/* <HowItWorks /> */}
      <Suspense fallback={<div>Loading...</div>}>
        {HowItWorks_Dynamic ? <HowItWorks_Dynamic /> : <HowItWorks />}
      </Suspense>
    </div>
  );
};

export default CountryCoverageFilter;
