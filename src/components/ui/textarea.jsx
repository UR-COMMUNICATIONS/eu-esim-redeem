import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(
  (
    {
      className,
      type,
      wrapperClass,
      label,
      labelClass,
      value,
      onChange,
      maxChars = 250,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("flex flex-col gap-2", wrapperClass)}>
        {label && <span className={cn("label", labelClass)}>{label}</span>}
        <div className="relative w-full h-fit">
          <textarea
            value={value}
            onChange={onChange}
            className={cn(
              "flex min-h-[120px] md:min-h-[198px] w-full rounded-xl border border-neutral-300 bg-neutral-50 p-4 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-black-600 text-black-900 outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 relative z-[2]",
              className
            )}
            ref={ref}
            {...props}
          />

          <span className="absolute z-[3] bottom-4 right-4 text-black-600 text-sm md:text-base !leading-[1.4] md:!leading-normal">
            {value.length}/{maxChars}
          </span>
        </div>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
