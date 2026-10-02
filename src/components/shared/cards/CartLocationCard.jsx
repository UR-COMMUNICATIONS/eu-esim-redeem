import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";

function CartLocationCard({ item = {}, wrapperClass = "", ...props }) {

  const { cart } = useSelector((state) => state.cart);

  let locAttbs = {
    locationCode: item?.locationCode,
    locationName: item?.locationName,
    address: item?.addressOne + " " + item?.addressTwo,
    zipCode: item?.zipCode,
    locationCountry: item?.locationCountry
  };

  if (cart.userLanguage !== "en") {
    locAttbs["locationName"] = item?.trLocationName || item?.locationName
    locAttbs["address"] = item?.trAddressOne || item?.addressOne + " " + item?.trAddressTwo || item?.addressTwo
  }


  return (
    <div
      className={cn(
        "px-8 py-6 hover:bg-neutral-100 cursor-pointer duration-300",
        wrapperClass
      )}
      {...props}
    >
      <h2 className="text-base font-semibold text-black-900 mb-2">
        {locAttbs?.locationName}
      </h2>
      <span className="tag">{locAttbs?.locationCountry}</span>
      <p className="text-sm font-semibold text-black-700 mb-1 mt-3">
        {locAttbs?.locationCode}
      </p>
      <p className="text-sm text-black-600">
        {locAttbs?.address}
      </p>
      <p className="text-sm text-black-600">
        {locAttbs?.zipCode} {locAttbs?.locationCountry}
      </p>
    </div>
  );
}

export default CartLocationCard;
