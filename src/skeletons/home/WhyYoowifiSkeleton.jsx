import React from "react";

const WhyYoowifiSkeleton = () => {
  return (
    <section className="sec_common_60 bg-white px-4 min-[1176px]:px-0">
      <div className="containerX flex flex-col-reverse md:flex-row gap-6 md:gap-10 lg:gap-[60px]">
        
        {/* Image placeholder */}
        <div className="w-full md:w-1/2 min-[950px]:w-2/5 flex justify-center">
          {/* <div className="h-[420px] w-[360px] bg-gray-300 rounded-[24px] mx-auto" /> */}
          <div className="bg-gray-300 rounded-[24px] mx-auto w-full max-w-[360px] h-[420px]" />
        </div>

        {/* Text / features / button */}
        <div className="w-full md:w-1/2 min-[950px]:w-3/5 flex flex-col justify-center items-start gap-4 md:gap-9 ">
          <div className="h-8 bg-gray-300 rounded w-2/4 mb-6" />
          
          {/* Features skeleton */}
          <div className="flex flex-col gap-3 md:gap-4 w-full">
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="bg-gray-300 rounded-full h-10 w-10 md:h-11 md:w-11" />
                <div className="h-6 bg-gray-300 rounded w-2/4" />
              </div>
            ))}
          </div>

          {/* Button placeholder */}
          <div className="h-[52px] w-[160px] bg-gray-300 rounded-[12px] mt-2" />
        </div>
      </div>
    </section>
  );
};

export default WhyYoowifiSkeleton;
