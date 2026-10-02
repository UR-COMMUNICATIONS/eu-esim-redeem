function DeliveryPickupSkeleton() {
  return (
    <section className="containerX sec_common_60 px-4 md:px-6 xl:px-0 flex flex-col items-center gap-6 md:gap-10 lg:gap-20">
      {/* Skeleton Header */}
      <div className="w-full flex flex-col items-center gap-3">
        <div className="h-6 w-48 md:w-72 bg-gray-300 rounded-[12px]" />
        <div className="h-4 w-[80%] bg-gray-300 rounded-[12px] md:mt-6 mt-3" />
        <div className="h-4 w-[40%] bg-gray-300 rounded-[12px]" />
      </div>

      {/* Skeleton Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 w-full">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl md:rounded-2xl bg-gray-100 py-6 md:py-10 px-4 md:px-6 w-full flex flex-col justify-between"
          >
            <div className="flex-1 flex flex-col justify-between">
              {/* Icon Placeholder */}
              <div className="h-14 md:h-20 w-14 md:w-20 rounded-lg md:rounded-xl bg-white" />

              {/* Title Placeholder */}
              <div className="mt-6 md:mt-12 lg:mt-[60px]">
                <div className="h-6 md:h-7 w-40 bg-gray-300 rounded-[12px]" />

                {/* Description Lines */}
                <div className="mt-2 md:mt-3 space-y-2">
                  <div className="h-4 md:h-5 w-full bg-gray-300 rounded-[12px]" />
                  <div className="h-4 md:h-5 w-2/3 bg-gray-300 rounded-[12px]" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DeliveryPickupSkeleton;
