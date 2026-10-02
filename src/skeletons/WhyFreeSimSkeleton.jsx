const WhyFreeSimSkeleton = () => {
    return (
        <div className="sec_common_80 md:py-20 xl:px-28">
            <div className="rounded-[12px] bg-gray-100">
                <div className="md:py-24 py-12 containerX mx-auto">
                    {/* Section Heading */}
                    <div className="flex flex-col items-center">
                        <div className="h-8 bg-gray-300 rounded-[12px] w-2/3 mb-4" />
                        <div className="h-5 bg-gray-300 rounded-[12px] w-1/2" />
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 md:mt-16 md:px-15 px-8">
                        {Array.from({ length: 6 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-[12px] md:p-5 p-3 md:h-[174px] h-[136px] flex flex-col justify-between"
                            >
                                <div className="w-full pl-6">
                                    <div className="bg-gray-300 rounded-[12px] w-12 h-12" />
                                </div>
                                <div className="bg-gray-300 rounded-[12px] w-3/4 h-5" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyFreeSimSkeleton;
