// CountryListSkeleton.jsx

import React from "react";

const CountryListSkeleton = () => {
  return (
    <section className="containerX">
      <div className="sec_common_80 xl:!px-0">

        {/* Header placeholders */}
        <div className="h-8 w-1/4 bg-gray-300 rounded mb-4 mx-auto" />
        <div className="h-6 w-[50%] bg-gray-300 rounded mx-auto mb-8" />

        {/* Region Tabs Skeleton */}
        <div className="my-4 lg:my-15 flex bg-neutral-200 rounded-[14px] py-4 px-2 overflow-x-auto">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="h-10 bg-gray-300 rounded w-full mx-1"
            />
          ))}
        </div>

        {/* Grid of country cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-5 mt-6">
          {Array.from({ length: 20 }).map((_, idx) => (
            <div
              key={idx}
              className="p-3 bg-gray-200 rounded-xl flex items-center gap-2"
            >
              <div className="w-12 h-8 md:w-[80px] md:h-[50px] bg-gray-300 rounded" />
              <div className="h-4 w-1/2 bg-gray-300 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountryListSkeleton;
