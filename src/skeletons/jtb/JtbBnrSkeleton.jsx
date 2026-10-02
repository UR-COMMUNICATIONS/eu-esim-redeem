const JtbBnrSkeleton = () => {
  return (
    <div className="sec_common_80 xl:px-28 lg:py-10">
      <div className="xl:h-[650px] lg:h-[550px] md:h-[450px] sm:h-[350px] h-[280px] bg-gray-100 rounded-[24px]">
        <div className="flex flex-col justify-between h-full px-6 md:px-15 py-10 xl:py-28 lg:py-16 md:py-20">
          <div className="space-y-3">
            <div className="h-8 bg-gray-300 rounded-[12px] w-[15%]" />
            <div className="h-8 bg-gray-300 rounded-[12px] w-[15%]" />
            <div className="h-[25px] bg-gray-300 rounded-[12px] w-[13%] !mt-5 md:!mt-20" />
          </div>
          <div className="h-[20px] bg-gray-300 rounded-[12px] w-[20%]" />
        </div>
      </div>

      <div className="py-16 text-center space-y-3">
        <div className="h-6 bg-gray-300 rounded-[12px] w-2/3 mx-auto" />
        <div className="h-6 bg-gray-300 rounded-[12px] w-2/4 mx-auto" />
      </div>

      <div className="flex justify-center items-center">
        <div className="h-10 bg-gray-300 rounded-[12px] w-[200px]" />
      </div>
    </div>
  );
};

export default JtbBnrSkeleton;
