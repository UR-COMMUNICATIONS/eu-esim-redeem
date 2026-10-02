import { cn } from "@/lib/utils";
import { memo } from "react";

const SectionHeader = ({
  heading,
  subHeading,
  containerClassName,
  headingClassName,
  subHeadingClassName,
  midHeading,
  midHeadingClass,
}) => {
  return (
    <div
      className={cn(containerClassName, "flex flex-col gap-4 cursor-default")}
    >
      <div>
        <h2 className={cn(headingClassName, "title")}>{heading}</h2>

        {midHeading && (
          <h2
            className={cn(
              "text-black-900 text-sm leading-[140%] md:text-2xl text-center",
              midHeadingClass,
            )}
          >
            {midHeading}
          </h2>
        )}
      </div>

      <p
        className={cn(
          subHeadingClassName,
          "text-xs md:text-lg !leading-[1.4] text-center text-black-700",
        )}
      >
        {subHeading}
      </p>
    </div>
  );
};

export default memo(SectionHeader);
