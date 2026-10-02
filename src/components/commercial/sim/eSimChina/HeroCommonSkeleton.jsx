import React from "react";

const HeroCommonSkeleton = () => {
  return (
    <section className="w-full bg-gray-100 px-4 md:px-6 xl:px-0 py-6 md:py-10 lg:py-[94px] relative overflow-hidden">
      <div className="containerX flex flex-col md:flex-row md:items-center gap-3 md:gap-6 relative z-[2]">
        {/* Title skeleton */}
        <h1 className="text-[28px] md:text-[60px] !leading-[1.1] w-full md:w-1/2 text-white font-bold uppercase">
          <div className="h-8 md:h-10 bg-gray-300 rounded-[12px] md:w-[130%] w-[70%]"></div>
        </h1>

        {/* Description skeleton */}
        {/* <div className="w-full md:w-1/2">
          <p className="!leading-[1.4] text-white font-medium text-[17px]">
            <div className="h-4 bg-gray-300/50 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300/50 rounded w-5/6"></div>
          </p>
          <p className="!leading-[1.4] text-white mt-2 font-light">
            <div className="h-4 bg-gray-300/50 rounded w-2/3"></div>
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default HeroCommonSkeleton;
