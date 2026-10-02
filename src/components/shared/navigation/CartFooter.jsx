import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function CartFooter({
  name = "Pocket Wifi",
  packageName = "SGD 0.00",
  isActive = false,
  colors = [],
  prevHandler = () => {},
  nextHandler = () => {},
  ...props
}) {
  return (
    <div
      className={cn("w-full py-4 px-16 bg-white shadow-mid flex items-center")}
      {...props}
    >
      <div className="w-full">
        <h2 className="text-2xml text-black-900 font-bold">{name}</h2>
      </div>
      <div className="flex items-center gap-20">
        {colors?.lenght > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-black-700">Color</span>
            <div className="flex items-center gap-4">
              <div
                className="w-7 aspect-square rounded-full border border-secondary-500"
                style={{ background: "#F9F9F9" }}
              ></div>
              <div
                className="w-7 aspect-square rounded-full"
                style={{ background: "#F9F9F9" }}
              ></div>
              <div
                className="w-7 aspect-square rounded-full"
                style={{ background: "#F9F9F9" }}
              ></div>
            </div>
          </div>
        )}
        <h3 className="text-black-900 text-2xml font-bold whitespace-nowrap">
          {packageName}
        </h3>
        <div className="flex items-center gap-5">
          <Button
            variant="outline"
            className="min-w-[140px] font-semibold"
            onClick={prevHandler}
          >
            Previous
          </Button>
          <Button
            className={cn("min-w-[140px] font-semibold")}
            disabled={!isActive}
            onClick={nextHandler}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartFooter;
