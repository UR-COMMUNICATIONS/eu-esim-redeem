function SupportAndFAQSkeleton() {
    return (
        <div className="px-4 2xl:px-0 sec_common_80">
            <div className="sec_common_60 pb-3 md:pb-10 lg:pb-20 container3X rounded-2xl md:rounded-3xl bg-gray-100 px-3 md:px-6 min-[1320px]:px-0">
                {/* Header Skeleton */}
                <div className="w-full flex flex-col items-center gap-3">
                    <div className="h-6 w-72 md:w-[60%] bg-gray-300 rounded-[12px]" />
                </div>

                {/* Two Column FAQ Skeleton */}
                <div className="containerX xl:px-0 grid md:grid-cols-2 gap-y-3 md:gap-10 mt-4 md:mt-8 lg:mt-[60px]">
                    {/* Left side */}
                    <div className="space-y-3 md:space-y-6 rounded-xl">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-fit bg-white py-4 md:py-7 rounded-lg px-4 md:px-6 flex items-center justify-between"
                            >
                                <div className="flex-1">
                                    <div className="bg-gray-300 rounded-[12px] h-5 w-3/4" />
                                </div>
                                <div className="bg-gray-300 rounded-[12px] h-5 w-5 ml-4" />
                            </div>
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="space-y-3 md:space-y-6 rounded-xl">
                        {[1, 2].map((i) => (
                            <div
                                key={i}
                                className="h-fit bg-white py-4 md:py-7 rounded-lg px-4 md:px-6 flex items-center justify-between"
                            >
                                <div className="flex-1">
                                    <div className="bg-gray-300 rounded-[12px] h-5 w-3/4" />
                                </div>
                                <div className="bg-gray-300 rounded-[12px] h-5 w-5 ml-4" />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SupportAndFAQSkeleton;
