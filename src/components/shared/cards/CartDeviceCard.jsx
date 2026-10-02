import { cn } from "@/lib/utils";

function CartDeviceCard({
  item = {},
  translableName = "",
  isActive = false,
  id = "ID:",
  ...props
}) {
  return (
    <div
      className={cn(
        "py-2.5 px-3 flex flex-col gap-1.5 rounded-xl cursor-pointer bg-neutral-50 border transition-all duration-200",
        isActive
          ? "border-main-600 bg-main-50"
          : "border-neutral-200 hover:border-main-600 hover:bg-main-50 hover:shadow-sm",
      )}
      {...props}
    >
      <p className="text-base font-semibold text-black-700">
        {item?.device_name || translableName}
      </p>
      <p className="text-sm font-medium text-black-600">
        {id} {item?.device_id}
      </p>
    </div>
  );
}

export default CartDeviceCard;
