import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

function FeatureCard({
  icon,
  svg = null,
  title = "",
  index,
  className = "",
  ...props
}) {
  return (
    <div
      className={cn(
        "py-5 sm:py-6 md:py-8 px-4 bg-white rounded-2xl flex flex-col items-center justify-center gap-2 sm:gap-4 md:gap-6",
        className
      )}
      {...props}
    >
      <div className="w-8 sm:w-12 md:w-[60px] aspect-square flex items-center justify-center">
        {svg ? (
          svg
        ) : (
          <img
            src={icon}
            alt="icon"
            className={cn("w-full h-full object-contain")}
          />
        )}
      </div>
      <h3 className="text-black-900 text-base sm:text-lg font-semibold text-center sm:whitespace-pre-wrap md:h-14">
        {title}
      </h3>
    </div>
  );
}

export default FeatureCard;
