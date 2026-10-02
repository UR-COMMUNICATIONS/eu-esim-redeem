import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, type, wrapperClass, label, labelClass, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-2", wrapperClass)}>
        {label && <span className={cn("label", labelClass)}>{label}</span>}
        <input
          type={type}
          className={cn(
            "flex h-[3.25rem] w-full rounded-xl border border-neutral-300 bg-neutral-50 p-4 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-neutral-400 text-black-900 outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
