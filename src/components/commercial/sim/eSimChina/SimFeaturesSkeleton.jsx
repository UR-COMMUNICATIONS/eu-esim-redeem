function SimFeaturesSkeleton() {
    const steps = [0, 1, 2, 3, 4];

    return (
        <section className="sec_common_60 mt-6 xl:mt-15">
            <div className="containerX">
                {/* Skeleton Header */}
                <div className="flex flex-col items-center">
                    <div className="h-6 bg-gray-300 rounded-[12px] w-2/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded-[12px] w-4/6 mb-2 md:mt-6 mt-3"></div>
                    <div className="h-4 bg-gray-300 rounded-[12px] w-2/6 mb-2"></div>
                </div>

                {/* Skeleton Cards */}
                <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-10 md:mt-15">
                    {steps.map((step) => (
                        <div
                            key={step}
                            className="p-6 border rounded-lg flex items-center justify-between gap-6 md:gap-12"
                        >
                            <div className="h-12 w-12 bg-gray-300 rounded-[12px]" />
                            <div className="flex-1 space-y-3 md:space-y-6">
                                <div className="h-6 w-[30%] bg-gray-300 rounded-[12px]" />
                                <div className="h-4 w-[80%] bg-gray-300 rounded-[12px]" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SimFeaturesSkeleton;
