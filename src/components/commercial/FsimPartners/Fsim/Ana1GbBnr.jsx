import { Button } from "@/components/ui/button";
import useDynamicImages from "@/hooks/useDynamicImages";
import { ArrowRightIcon, commercialRoutes } from "@/services";
import { setCartData } from "@/store/module/cart/cartSlice";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// E = eSIM (ANA1GB). The key doubles as the packages page `type` filter value.
const promoCode = {
  E: "ANA1GB",
};

const Ana1GbBnr = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation(["translation", "english", "local"]);

  const handleClick = (value) => {
    const code = promoCode[value];
    // Same flow as /sqfairpromo: go straight to the internet packages page with
    // the promo pre-applied. `annex` pre-fills AND locks the promo field, while
    // `type` pre-selects the product filter. All that's left is picking a
    // destination country.
    sessionStorage.setItem("annex", code);
    dispatch(setCartData({ annex: code, promoCode: code }));
    navigate(
      `${commercialRoutes.productInternetPackages.path}?annex=${code}&type=${value}`,
    );
  };

  return (
    <section className="sec_common_80 xl:px-28 lg:py-10 py-6 px-4">
      {/* <div className="w-full mb-8">
        <img
          src={useDynamicImages("fsim-banner", "frw-fana-bnr")}
          alt="ANA 1GB Free eSIM Promo Banner"
          className="w-full h-auto object-contain mx-auto md:rounded-[24px] rounded-[12px] shadow-sm"
        />
      </div> */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-8 w-full">
        <div className="w-full md:w-1/2 rounded-3xl border border-rose-100 bg-gradient-to-br from-white via-rose-50 to-rose-100/70 p-6 md:p-8 text-center shadow-[0_14px_34px_rgba(237,57,66,0.12)]">
          <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-[#ed3942]/80" />
          <h2 className="text-2xl md:text-[30px] font-bold leading-tight text-gray-900">
            {t(`ana1gb.heading`)}
          </h2>
          <p className="mt-4 text-[15px] md:text-base leading-relaxed text-gray-600">
            {t(`ana1gb.getFreeeSIM`)}
          </p>
          <Button
            className="mt-7 self-center inline-flex items-center justify-center rounded-xl bg-[#ed3942] px-7 py-6 text-[17px] font-semibold text-white shadow-[0_10px_24px_rgba(237,57,66,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d9343c]"
            onClick={() => handleClick("E")}
          >
            {t(`ana1gbButton.buttonTextSim`)}
            <ArrowRightIcon className="h-6 w-6 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Ana1GbBnr;
