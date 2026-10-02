import { cn } from "@/lib/utils";

function SetupSimCard({ icon, title, description, wrapperClass = "" }) {
  return (
    <div
      className={cn(
        "w-full max-w-[360px] md:max-w-none p-6 text-center",
        wrapperClass
      )}
    >
      <div className="w-15 sm:w-16 md:w-20 aspect-square flex items-center justify-center mb-5 sm:mb-6 md:mb-8 mx-auto">
        {icon()}
      </div>
      <h3 className="text-base sm:text-lg md:text-2xl font-bold text-black-900 mb-2 sm:mb-3 md:mb-4">
        {title}
      </h3>
      <p className="text-xs sm:text-base md:text-lg text-black-600">
        {description}
      </p>
    </div>
  );
}

export default SetupSimCard;
