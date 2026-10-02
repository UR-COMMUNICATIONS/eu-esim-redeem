import React from "react";

export default function SimComparisonSkeleton() {
    return (
        <section className="container3X sec_common_60 bg-neutral-100 rounded-3xl">
            <div className="container3X rounded-3xl px-0 2xl:px-12 py-6 bg-neutral-100">
                {/* Header Skeleton */}
                <div className="flex flex-col items-center">
                    <div className="h-6 bg-gray-300 rounded-[12px] w-2/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded-[12px] w-4/6 mb-2 md:mt-6 mt-3"></div>
                    <div className="h-4 bg-gray-300 rounded-[12px] w-3/6 mb-2"></div>
                </div>

                {/* Two columns skeleton */}
                <div className="flex flex-col md:flex-row gap-6 mt-6 md:mt-10 lg:mt-15">
                    {/* eSIM Card Skeleton */}
                    <div className="flex-1 flex flex-col rounded-2xl">
                        <div className="h-12 md:h-16 lg:h-20 bg-gray-300 rounded-t-2xl"></div>
                        <ul className="flex-1 space-y-4 bg-neutral-50 rounded-b-2xl p-6">
                            {[...Array(4)].map((_, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                                    <div className="h-4 w-3/4 bg-gray-300 rounded-[12px]"></div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Physical SIM Card Skeleton */}
                    <div className="flex-1 flex flex-col rounded-2xl">
                        <div className="h-12 md:h-16 lg:h-20 bg-gray-300 rounded-t-2xl"></div>
                        <ul className="flex-1 space-y-4 bg-neutral-50 rounded-b-2xl p-6">
                            {[...Array(4)].map((_, i) => (
                                <li key={i} className="flex items-center gap-3 ">
                                    <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                                    <div className="h-4 w-3/4 bg-gray-300 rounded-[12px]"></div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
