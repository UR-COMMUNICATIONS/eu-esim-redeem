import React from "react";

function DownloadYoowifiSkeleton() {
    return (
        <section className="bg-gray-100 relative overflow-hidden">
            {/* Left background shape */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 z-[1] bg-gray-100 w-1/2 md:w-2/3 h-full" />

            <div className="w-full max-w-[1220px] mx-auto relative z-[3] px-4 lg:px-0 pt-10">
                <div className="flex flex-row items-end gap-10">
                    {/* Text + Buttons + QR */}
                    <div className="w-full max-w-xl space-y-6 mb-10">
                        {/* Heading */}
                        <div className="h-4 md:h-6 bg-gray-300 rounded-[12px] w-1/2 mb-6" />
                        <div className="h-5 md:h-8 bg-gray-300 rounded-[12px] w-2/3" />
                        <div className="h-10 md:h-16 bg-gray-300 rounded-[12px] w-3/4" />


                        {/* Buttons + QR */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <div className="flex flex-col gap-3 w-full sm:w-auto">
                                <div className="bg-gray-300 rounded-[12px] h-10 sm:h-12 w-full sm:w-52" />
                                <div className="bg-gray-300 rounded-[12px] h-10 sm:h-12 w-full sm:w-52" />
                            </div>
                            <div className="bg-gray-300 rounded-[12px] aspect-square w-16 sm:w-40 h-28" />
                        </div>
                    </div>

                    {/* Side Image Placeholder */}
                    <div className="w-full sm:w-1/2 md:w-2/5 lg:w-[30%] px-8">
                        <div
                            className=" w-full h-64 sm:h-72 lg:h-[25rem] rounded-t-[34px] bg-gradient-to-br from-gray-300 to-gray-200 shadow-lg skew-x-[-15deg]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DownloadYoowifiSkeleton;
