import { cn } from "@/lib/utils";
import { addZeroToNumber, MinusIcon, PlusIcon } from "@/services";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function CartQuantity({
  max = 1,
  defaultValue = 1,
  setter = () => { },
  label = "",
  labelClass = "",
}) {
  const { t } = useTranslation();
  const [count, setCount] = useState(defaultValue);

  // TODO: add quantity logic
  const handleQuantity = (type = "increment") => {
    if (type === "increment") {
      if (count < max) {
        setCount((prev) => prev + 1);
        setter(count + 1);
      }
    } else {
      if (count > 1) {
        setCount((prev) => prev - 1);
        setter(count - 1);
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 sm:gap-4">
      {label && <span className={cn("label md:text-[18px]", labelClass)}>{t(label)}</span>}
      <div className="flex items-stretch gap-4 mt-2 md:mt-4">
        <button
          className="sm:min-w-[100px] py-3 sm:py-4 bg-neutral-100 flex items-center justify-center border border-neutral-300 rounded-xl"
          onClick={() => handleQuantity("decrement")}
        >
          <MinusIcon />
        </button>
        <div className="w-full py-3 sm:p-4 bg-neutral-100 border border-neutral-200 rounded-xl text-center text-base font-bold text-black-900">
          {addZeroToNumber(count)}
        </div>
        <button
          className="sm:min-w-[100px] py-3 sm:py-4 bg-neutral-100 flex items-center justify-center border border-neutral-300 rounded-xl"
          onClick={() => handleQuantity("increment")}
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}

export default CartQuantity;
