import { cn } from "@/lib/utils";

function InfoCard({
  title = "",
  icon = "",
  wrapperClass = "",
  titleClass = "",
  description = "",
  descriptionClass = "",
  children,
  subtitle,
  ...props
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 sm:gap-6 md:gap-10 bg-neutral-100 rounded-2xl p-6",
        wrapperClass,
      )}
      {...props}
    >
      {children ? (
        children
      ) : (
        <div className="w-15 sm:w-20 aspect-square flex items-center justify-center shrink-0">
          <img
            src={icon}
            alt="icon"
            title={title || "indicator icon"}
            className="w-full h-full object-contain"
          />
        </div>
      )}
      <div>
        <h3
          className={cn(
            "text-black-900 text-lg sm:text-xl md:text-2xl font-bold",
            titleClass,
          )}
        >
          {title}
        </h3>
        {subtitle && (
          <p
            className={cn(
              "text-black-900 text-base sm:text-lg md:text-xl",
              title ? "mt-2 sm:mt-4" : "",
            )}
          >
            {subtitle}
          </p>
        )}
        {description && (
          <p
            className={cn(
              "text-black-600 text-sm sm:text-base md:text-lg",
              title ? " mt-2 sm:mt-4" : "",
              descriptionClass && descriptionClass,
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export default InfoCard;
