// import React from "react";

// const InternetPackageSkeleton = () => {
//   return (
//     <div className="sec_common_80 px-4 min-[1176px]:px-0 bg-neutral-50">
//       {/* Title skeleton */}
//       <div className="h-8 w-1/2 bg-gray-300 rounded mb-4 mx-auto" />

//       <div className="containerX flex flex-col items-center">
//         {/* Search + Promo inputs */}
//         <div className="bg-white border-[#EEEEEE] px-4 w-full max-w-[800px] mt-10 mb-5 rounded-[16px]">
//           <div className="md:flex flex-wrap items-center gap-4 w-full mt-6 lg:mt-10 mb-2">
//             <div className="flex-1 mb-2">
//               <div className="h-[48px] w-full bg-gray-300 rounded"></div>
//             </div>
//             <div className="flex-1 mb-2">
//               <div className="h-[48px] w-full bg-gray-300 rounded"></div>
//             </div>
//           </div>

//           <div className="md:flex items-center w-full gap-2 mb-8">
//             <div className="flex-1 flex gap-2 mb-2">
//               <div className="h-[48px] w-full bg-gray-300 rounded"></div>
//               <div className="h-[48px] w-full bg-gray-300 rounded"></div>
//             </div>
//             <div className="w-full flex-1">
//               <div className="h-[48px] w-full bg-gray-300 rounded"></div>
//             </div>
//           </div>
//         </div>

//         {/* Filter buttons */}
//         <div className="flex gap-2 mb-8">
//           {[...Array(4)].map((_, idx) => (
//             <div key={idx} className="h-[36px] w-[100px] bg-gray-300 rounded"></div>
//           ))}
//         </div>

//         {/* Grid of package cards */}
//         <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-8">
//           {Array.from({ length: 8 }).map((_, index) => (
//             <div key={index} className="h-[180px] bg-gray-300 rounded-lg"></div>
//           ))}
//         </div>

//         {/* Load more button */}
//         <div className="mt-8 flex justify-center">
//           <div className="h-[42px] w-[180px] bg-gray-300 rounded"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InternetPackageSkeleton;


import React from "react";

// Skeleton for Individual Card
export const InternetPackageCardSkeleton = () => {
    return (
        <>
            {/* <div className="flex gap-2 mb-8">
                {[...Array(4)].map((_, idx) => (
                    <div
                        key={idx}
                        className="h-[36px] sm:w-[100px] w-[50px] bg-gray-300 rounded sm:px-0 px-2"
                    ></div>
                ))}
            </div> */}

            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-8">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-[8px] md:rounded-3xl p-2 md:p-4 ring-[2px] ring-neutral-200 flex flex-col h-full"
                    >
                        <div className="w-full aspect-[1.06/1] relative overflow-hidden rounded-[4px] md:rounded-2xl">
                            <div className="absolute inset-0 bg-gray-300"></div>
                        </div>

                        <div className="h-4 bg-gray-300 rounded w-3/4 mt-3 mb-2"></div>

                        <div className="flex-grow">
                            <div className="h-3 bg-gray-300 rounded w-2/3 mb-2"></div>
                            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                        </div>

                        <hr className="my-3 h-[1px] bg-neutral-100" />

                        <div className="flex justify-between items-center">
                            <div className="space-y-1">
                                <div className="h-2 bg-gray-300 rounded w-12"></div>
                                <div className="h-4 bg-gray-300 rounded w-16 sm:w-20"></div>
                            </div>
                            <div className="h-9 w-16 sm:w-20 bg-gray-300 rounded-lg"></div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

// Main Skeleton for full page
const InternetPackageSkeleton = () => {
    return (
        <div className="sec_common_80 px-4 min-[1176px]:px-0 bg-neutral-50">
            <div className="h-8 w-[60%] sm:w-1/4 bg-gray-300 rounded mb-2 mx-auto" />
            <div className="h-6 w-[40%] sm:w-[18%] bg-gray-300 rounded mx-auto" />

            <div className="containerX flex flex-col items-center">
                <div className="bg-white border-[#EEEEEE] px-4 w-full max-w-[800px] mt-10 mb-5 rounded-[16px]">
                    <div className="md:flex flex-wrap items-center gap-4 w-full mt-6 lg:mt-10 mb-2">
                        <div className="flex-1 mb-2">
                            <div className="h-[48px] w-full bg-gray-300 rounded"></div>
                        </div>
                        <div className="flex-1 mb-2">
                            <div className="h-[48px] w-full bg-gray-300 rounded"></div>
                        </div>
                    </div>
                    <div className="flex items-center w-full mb-8 gap-2">
                        <div className="w-[70%]">
                            <div className="h-[48px] w-full bg-gray-300 rounded"></div>
                        </div>
                        <div className="w-[30%]">
                            <div className="h-[48px] w-full bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>
                {/* <div className="flex gap-2 mb-8">
                    {[...Array(4)].map((_, idx) => (
                        <div key={idx} className="h-[36px] sm:w-[100px] w-[50px] bg-gray-300 rounded sm:px-0 px-2"></div>
                    ))}
                </div>

                <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-8">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <InternetPackageCardSkeleton key={index} />
                    ))}
                </div> */}
                <InternetPackageCardSkeleton />
                <div className="mt-8 flex justify-center">
                    <div className="h-[42px] sm:w-[180px] w-[100px] bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default InternetPackageSkeleton;

