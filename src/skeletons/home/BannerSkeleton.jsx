import React from 'react';
import { cn } from "@/lib/utils";

const HeroChildSlidesSkeleton = ({ wrapperClass = "" }) => {
    return (
        <div
            className={cn(
                "w-full max-w-[536px]",
                wrapperClass
            )}
        >
            <div className="w-full bg-gray-300 rounded h-[100px]" />
            <div className="flex gap-1 mt-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div
                        key={index}
                        className="w-full h-1 rounded-full bg-gray-300"
                    />
                ))}
            </div>
        </div>
    );
};

const BannerSkeleton = () => {
    return (
        <div className="w-full  overflow-hidden bg-gray-200">
            <div className="flex flex-col justify-end items-center h-full min-h-screen">

                <div className="w-full px-10 sm:px-0 xl:px-14 lg:px-8 mb-8">
                    <div className="flex flex-col lg:flex-row justify-between gap-8">

                        <div className="w-full lg:w-1/2 flex items-center lg:justify-start justify-center">
                            <div className="grid grid-cols-3 w-full max-w-[460px] gap-2 sm:gap-3">
                                {Array.from({ length: 3 }).map((_, idx) => (
                                    <div key={idx} className="p-4 bg-gray-300 rounded-xl h-[100px]" />
                                ))}
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                            <HeroChildSlidesSkeleton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerSkeleton;
