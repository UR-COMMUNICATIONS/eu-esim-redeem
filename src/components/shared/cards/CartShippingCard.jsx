import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function CartShippingCard({ item = {}, index, isActive = false, ...props }) {
  const { cart } = useSelector((state) => state.cart);
  const { t } = useTranslation();
  const dispType = item.type == 'self' ? t(`shippingOptions.${0}.title`) : item?.type
  const dispRate = item.type == 'self' ? 'Free' : cart.shippingCurrency + ' ' + item?.rate

  let shipAttbs = {
    type: dispType,
    description: item.description?.replace(/\\n/g, "\n")
  };

  if (cart.userLanguage !== "en") {
    shipAttbs["type"] = item?.trType || dispType;
    shipAttbs["description"] = item?.trDescription?.replace(/\\n/g, "\n") || item.description?.replace(/\\n/g, "\n");
  }

  { item.description?.replace(/\\n/g, "\n") }

  return (
    <div
      className={cn(
        "p-6 min-h-[154px] flex items-center rounded-xl border-2 cursor-pointer",
        isActive ? "border-main-600" : "border-neutral-400"
      )}
      {...props}
    >
      <div className="flex w-full items-end gap-2">
        <div className="flex-1 flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-black-900">
            {shipAttbs["type"]}
          </h2>
          <p className="text-base text-black-700" style={{ whiteSpace: 'pre-line' }}>
            {/* {item.description?.replace(/\\n/g, "\n")} */}
            {shipAttbs["description"]}
          </p>
        </div>
        <span className="text-2xl font-bold text-main-600">{dispRate}</span>
      </div>
    </div>
  );
}

export default CartShippingCard;
