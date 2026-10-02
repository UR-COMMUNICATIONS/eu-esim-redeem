import { cn } from "@/lib/utils";
import { VisaIcon } from "@/services";

function CartPaymentCard({ item = {}, wrapperClass = "", ...props }) {
  // const numbers = item?.cardNumber?.match(/.{1,4}/g);
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-y-14 py-6 px-4 rounded-[10.629px] bg-black-800 text-white font-gilroy cursor-pointer",
        wrapperClass
      )}
      {...props}
    >
      <div className="flex justify-between">
        <span className="font-bold text-xxs">Credit Card</span>
        <VisaIcon />
      </div>
      <div className="flex items-center gap-4">
        <span className="font-base font-medium">
          {"\n" + "••••\xa0••••\xa0••••\xa0" + item.cardLastDigits}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium text-xxs">{item?.userName}</span>
        <span className="font-medium text-xxs">{['crpc', '2c2p'].includes(item?.pgw) ? item.cardBrand : item.expiry}</span>
      </div>
    </div>
  );
}

export default CartPaymentCard;
