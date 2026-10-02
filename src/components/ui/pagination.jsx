import * as React from "react"
import { cn } from "@/lib/utils"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { PaginationLeftChevronIcon } from "@/services";

const Pagination = ({
  className,
  ...props
}) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props} />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props} />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg",
      className, isActive ? "bg-main-600 text-white font-semibold" : "text-black-600 font-normal"
    )}
    {...props} />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className, disabled, ...props
}) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className, disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer")}
    {...props}
  >
    <button disabled={disabled} className="disabled:cursor-not-allowed">
      <PaginationLeftChevronIcon className="h-4 w-4" />
    </button>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className, disabled, ...props
}) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className, disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer")}
    {...props}>
    <button disabled={disabled} className="disabled:cursor-not-allowed">
      <PaginationLeftChevronIcon className="h-4 w-4 rotate-180" />
    </button>

  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}>
    <DotsHorizontalIcon className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
