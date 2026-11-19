import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setCartData } from "@/store/module/cart/cartSlice";
import { Button } from "@/components/ui/button";

/**
 * What a voucher link shows once its eSIM has already been claimed: the claim
 * form is replaced by a View button. The eSIM is known only by its ICCID, and
 * the backend names the QR image after it ("<iccid>.png"), so that is all the
 * ready screen is given — it renders the QR and the ICCID from it.
 */
export default function RedeemedView({ iccid, ns, onView, className = "" }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleView = () => {
    dispatch(setCartData({ esimDetails: [{ iccid, qrCode: `${iccid}.png` }] }));
    onView();
  };

  return (
    <div
      className={`flex w-full max-w-xl flex-col items-center gap-4 rounded-3xl border border-neutral-200 bg-neutral-50 p-8 text-center ${className}`}
    >
      <h2 className="text-2xl font-bold text-black-900 md:text-3xl">
        {t(`${ns}.redeemed.title`, "This eSIM has already been claimed")}
      </h2>
      <p className="text-base text-black-600">
        {t(
          `${ns}.redeemed.description`,
          "You can view your eSIM and its QR code again below.",
        )}
      </p>
      <Button
        type="button"
        onClick={handleView}
        className="rounded-full px-10 py-4 text-lg font-semibold"
      >
        {t(`${ns}.redeemed.view`, "View eSIM")}
      </Button>
    </div>
  );
}
