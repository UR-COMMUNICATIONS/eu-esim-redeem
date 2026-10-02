import { cn } from "@/lib/utils";

const JtbLogoSkeleton = ({ className = "" }) => {
  const logos = [
    "w-[70px] h-[40px] sm:w-[85px] sm:h-[48px]",
    "w-[30px] h-[40px] sm:w-[40px] sm:h-[50px]",
    "w-[112px] h-[40px] sm:w-[140px] sm:h-[50px]",
  ];

  return (
    <div
      className={cn(
        "flex flex-wrap justify-center items-center gap-4 w-full",
        className
      )}
    >
      {logos.map((size, index) => (
        <div
          key={index}
          className={`${size} bg-gray-300 rounded-[12px]`}
        />
      ))}
    </div>
  );
};

export default JtbLogoSkeleton;
