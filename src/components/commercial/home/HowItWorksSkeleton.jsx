const ConnectCardSkeleton = () => {
  return (
    <div className="rounded-2xl bg-white w-full border border-neutral-200 p-4 md:p-6 flex flex-col justify-between">
      {/* icon placeholder */}
      <div className="h-14 md:h-20 w-14 md:w-20 bg-gray-300 rounded-xl"></div>

      {/* title placeholder */}
      <div className="h-5 bg-gray-300 rounded w-2/3 mt-6 md:mt-12"></div>

      {/* description placeholder */}
      <div className="mt-3 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-[70%]"></div>
        <div className="h-4 bg-gray-300 rounded w-[50%]"></div>
      </div>

      {/* link placeholder */}
      <div className="mt-10 h-4 w-[100px] bg-gray-300 rounded" />
    </div>
  );
};


const HowItWorksSkeleton = () => {
  return (
    <section className="containerX sec_common_60 px-4 md:px-6 xl:px-0 flex flex-col items-center gap-6 md:gap-10 lg:gap-0">
      {/* header placeholders */}
      <div className="h-8 bg-gray-300 rounded w-[50%]"></div>
      <div className="h-6 bg-gray-300 rounded w-[20%] lg:mt-10"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 w-full lg:mt-20">
        {[1,2,3].map(i => (
          <ConnectCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSkeleton;
export { ConnectCardSkeleton };