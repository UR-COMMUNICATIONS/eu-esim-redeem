function SetupActivationGuideSkeleton() {
    return (
        <section className="container3X sec_common_60 bg-neutral-100 rounded-3xl my-6 xl:my-15">
            {/* SectionHeader Skeleton */}
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="h-6 w-48  bg-gray-300 rounded-[12px] " />
                <div className="h-4 w-80 md:w-[70%] bg-gray-300 rounded-[12px] md:mt-6 mt-3" />
            </div>

            {/* Subtitle */}
            <div className="h-6 w-64 bg-gray-300 rounded-[12px] mx-auto mt-10 mb-4" />

            {/* Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 md:mt-6 lg:mt-10">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 lg:p-8">
                        {/* Device title */}
                        <div className="h-6 w-32 bg-gray-300 rounded-[12px] mb-6" />

                        {/* Steps */}
                        <div className="space-y-3">
                            <div className="h-4 w-5/6 bg-gray-300 rounded-[12px]" />
                            <div className="h-4 w-2/3 bg-gray-300 rounded-[12px]" />
                            <div className="h-4 w-2/3 bg-gray-300 rounded-[12px]" />
                            <div className="h-4 w-full bg-gray-300 rounded-[12px]" />
                            <div className="h-4 w-full bg-gray-300 rounded-[12px]" />
                            <div className="h-4 w-full bg-gray-300 rounded-[12px]" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default SetupActivationGuideSkeleton;
