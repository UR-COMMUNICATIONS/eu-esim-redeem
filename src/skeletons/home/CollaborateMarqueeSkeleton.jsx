const CollaborateMarqueeSkeleton = () => {
  return (
    <div className="w-full bg-[#FFFBEC] pb-6 pt-6 md:pb-[60px] md:pt-10">
      {/* Title placeholder */}
      <div className="mx-auto h-5 md:h-7 bg-gray-300 rounded w-[20%] mb-6" />

      {/* Logo placeholders in a row */}
      <div className="flex overflow-hidden whitespace-nowrap gap-8 justify-center px-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-[18px] md:h-6 lg:h-10 w-full bg-gray-300 rounded"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CollaborateMarqueeSkeleton;
