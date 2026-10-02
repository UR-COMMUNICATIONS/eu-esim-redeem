import CountryList from "@/components/commercial/countryCoverage/CountryList";
// import CountryListSkeleton from '@/skeletons/home/CountryListSkeleton';
import Products from "@/components/commercial/home/Products";
// import ProductsSkeleton from '@/skeletons/home/ProductsSkeleton';
import CorporateBanner from "@/components/shared/others/CorporateBanner";
import CustomerTestimonial from "@/components/shared/others/CustomerTestimonial";
// import CustomerTestimonialSkeleton from '@/skeletons/home/CustomerTestimonialSkeleton';
import React from "react";
import { useLocation } from "react-router-dom";
import { memo } from "react";

const CountryCoverage = ({ isHideBanner }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Get the value of the "region" CountryListSkeleton parameter
  const regionQuery = searchParams.get("region");

  return (
    <div className="overflow-hidden w-full">
      {!isHideBanner && (
        <CorporateBanner isShowBannerBottom={false} isShowTopPricing={false} />
      )}
      <CountryList query={regionQuery} />
      {/* <CountryListSkeleton/> */}
      <Products />
      {/* <ProductsSkeleton/> */}
      <CustomerTestimonial />
      {/* <CustomerTestimonialSkeleton/> */}
    </div>
  );
};

export default memo(CountryCoverage);
