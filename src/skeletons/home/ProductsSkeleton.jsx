import React from "react";

const ProductCardSkeleton = ({ selected = false }) => {
    return (
        <div
            className={`ring-1 w-full h-fit rounded-lg md:rounded-2xl p-4 md:p-5 flex flex-col min-[1176px]:flex-row gap-4 md:gap-10 ${selected ? "bg-gray-200" : "bg-gray-100"
                }`}
        >
            {/* Left column */}
            <div className="flex flex-col gap-3 w-full">
                {selected ? (
                    <>
                        <div className="h-6 bg-gray-300 rounded w-[60%] mb-2" />
                        <div className="h-4 bg-gray-300 rounded w-full" />
                        <div className="h-4 bg-gray-300 rounded w-full" />
                        <div className="h-4 bg-gray-300 rounded w-full" />
                        <div className="h-4 bg-gray-300 rounded w-full" />
                    </>
                ) : (
                    <div className="flex items-center justify-start w-full h-full">
                        <div className="h-[34px] w-[160px] bg-gray-300 rounded" />
                    </div>
                )}
            </div>
            {selected ? (
                <div className="flex items-start justify-end w-full mt-2">
                    <div className="h-[44px] w-[120px] bg-gray-300 rounded" />
                </div>
            ) : (
                <div className="flex flex-col gap-3 w-full">
                    <div className="h-4 bg-gray-300 rounded w-full" />
                    <div className="h-4 bg-gray-300 rounded w-full" />
                    <div className="h-4 bg-gray-300 rounded w-full" />
                </div>
            )}
        </div>
    );
};


const ProductsSkeleton = () => {
    return (
        <section className="sec_common_80 bg-main-20">
            <div className="containerX overflow-visible">
                {/* Title */}
                <div className="h-8 w-1/4 bg-gray-300 rounded mb-6"></div>

                <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-8 lg:gap-[60px] mt-10 md:mt-20">
                    {/* Left side skeleton list */}
                    <div className="w-full md:w-1/2 min-[950px]:w-[55%] flex flex-col gap-4">
                        {[0, 1, 2].map((i) => (
                            <ProductCardSkeleton key={i} selected={i === 0} />
                        ))}
                    </div>

                    {/* Right side image */}
                    <div className="w-[35%] md:w-1/2 min-[950px]:w-[20%] h-[328px] md:h-[390px] bg-gray-300 rounded-[24px] mx-auto"></div>
                </div>
            </div>
        </section>
    );
};

export default ProductsSkeleton;
export { ProductCardSkeleton };
