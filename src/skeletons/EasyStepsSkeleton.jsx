const EasyStepsSkeleton = () => {
  const skeletonItems = [1, 2, 3];

  return (
    <div className="containerX mx-auto bg-white md:py-20 px-6 text-center">
      {/* Heading placeholder */}
      <div className="h-8 bg-gray-300 rounded-[12px] w-2/3 mx-auto mb-4" />
      <div className="h-5 bg-gray-300 rounded-[12px] w-1/2 mx-auto" />

      {/* Steps skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 md:mt-12 xl:mt-20">
        {skeletonItems.map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center border-none rounded-[24px] md:py-6 py-4 lg:px-0 md:px-2 sm:px-0"
          >
            {/* Circle number placeholder */}
            <div className="flex items-center justify-center mb-6 rounded-full w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-gray-300" />

            {/* Description placeholder */}
            <div className="h-4 bg-gray-300 rounded-[12px] w-3/4 mb-2" />
            <div className="h-4 bg-gray-300 rounded-[12px] w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EasyStepsSkeleton;
