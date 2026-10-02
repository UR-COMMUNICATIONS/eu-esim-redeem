function HowToGetSkeleton() {
    return (
        <section className="sec_common_60 mb-6 xl:mb-15">
            <div className="containerX">
                <div className="flex flex-col items-center">
                    <div className="h-6 bg-gray-300 rounded-[12px] w-2/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded-[12px] w-4/6 mb-2 md:mt-6 mt-3"></div>
                </div>
                {/* Plans grid skeleton */}
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-10 md:mt-15">
                    {[1, 2].map((i) => (
                        <div
                            key={i}
                            className="p-4 sm:p-6 sm:pl-8 md:pl-10 rounded-xl sm:rounded-2xl border border-gray-300 flex flex-col gap-2 sm:gap-4"
                        >
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-300">
                                <div className="h-5 bg-gray-300 rounded-[12px] w-2/3"></div>
                            </h3>
                            <p className="text-sm sm:text-base md:text-lg text-black-300 leading-[140%]">
                                <div className="h-4 bg-gray-300 rounded-[12px] w-full mb-2"></div>
                                <div className="h-4 bg-gray-300 rounded-[12px] w-5/6"></div>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HowToGetSkeleton;
