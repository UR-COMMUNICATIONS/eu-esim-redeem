import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:bg-disabled [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 !leading-none w-fit",
  {
    variants: {
      variant: {
        default: "bg-main-600 text-white shadow hover:bg-main-500",
        secondary: "bg-secondary-500 hover:bg-secondary-400 text-black-900",
        alert: "bg-secondary-500 text-black-900",
        outline:
          "border border-neutral-400 hover:border-neutral-600 hover:bg-neutral-300/50 hover:text-black-900",
        ghost: "hover:bg-main-500 hover:text-black-900",
        cancel:
          "border-neutral-300 bg-neutral-100 shadow-sm hover:bg-neutral-100 text-black-700",
        link: "text-zinc-900 underline-offset-4 hover:underline",
        black: "bg-black text-white py-4 px-10",
      },
      size: {
        default: "px-6 py-4",
        sm: "px-6 py-3 rounded-[6px] text-sm",
        lg: "px-6 py-3 md:px-10 md:py-4",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
