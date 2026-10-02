
const CustomerCardSkeleton = () => {
  return (
    <div className="bg-gray-100 ring-1 ring-neutral-200 rounded-xl md:rounded-2xl p-4 md:p-6 w-full shrink-0 select-none">
      {/* top quote icon placeholder */}
      <div className="h-[32px] md:h-[52px] w-[32px] bg-gray-300 rounded mb-4"></div>

      {/* description placeholder */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-300 rounded w-[90%]" />
        <div className="h-4 bg-gray-300 rounded w-[85%]" />
        <div className="h-4 bg-gray-300 rounded w-[80%]" />
        <div className="h-4 bg-gray-300 rounded w-[60%]" />
      </div>

      <hr className="h-[1px] w-full bg-[#d7d7d7] my-4 md:my-6" />

      <div className="flex items-center gap-3 mt-2">
        {/* <div className="h-10 w-10 bg-gray-300 rounded-full"></div> */}
        <div>
          {/* <div className="h-4 bg-gray-300 rounded w-[120px] mb-2"></div> */}
          <div className="h-3 bg-gray-300 rounded w-[60px]"></div>
        </div>
      </div>
    </div>
  );
};

const CustomerTestimonialSkeleton = () => {
  return (
    <section className="sec_common_60">
      {/* Header skeleton */}
      <div className="h-8 w-[20%] bg-gray-300 rounded mb-4 mx-auto" />
      <div className="h-6 w-[40%] bg-gray-300 rounded mx-auto mb-6" />

      <div className="container2X mt-16">
        <div className="flex gap-3 md:gap-6 overflow-hidden py-4">
          {/* repeat 3 skeleton customer cards */}
          {[1,2].map(i => (
            <div key={i} className="min-w-[272px] md:min-w-[573px] max-w-[573px]">
              <CustomerCardSkeleton />
            </div>
          ))}
        </div>
      </div>

      {/* dots skeleton */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <div className="h-2 w-8 bg-gray-300 rounded"></div>
        <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
        <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
      </div>
    </section>
  );
};

export default CustomerTestimonialSkeleton;
export { CustomerCardSkeleton };
