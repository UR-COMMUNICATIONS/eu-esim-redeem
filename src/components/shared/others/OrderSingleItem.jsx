import { cn } from "@/lib/utils";

function OrderSingleItem({
  title = "",
  description = "",
  wrapperClass = "",
  titleClass = "",
  descriptionClass = "",
}) {
  return (
    <div
      className={cn("flex items-center justify-between gap-3", wrapperClass)}
    >
      <span className={cn("text-base sm:text-lg text-black-700", titleClass)}>
        {title}
      </span>
      <span
        className={cn("text-base sm:text-lg text-black-700", descriptionClass)}
      >
        {description}
      </span>
    </div>
  );
}

export default OrderSingleItem;
