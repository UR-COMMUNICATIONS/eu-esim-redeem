import { Button } from "@/components/ui/button";
import useDynamicImages from "@/hooks/useDynamicImages";
import { formatOfferTextWithHighlights } from "@/lib/utils";
import { ArrowRightIcon, brandRoutes } from "@/services";
import { setCartData } from "@/store/module/cart/cartSlice";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

// Fallback mapping if query param is not provided
const freePormo = {
  D: "OBAJA26",
  // E: "freesim",
};

const ObajaBanner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClick = (value) => {
    sessionStorage.setItem("annex", freePormo[value]);
    dispatch(setCartData({ fsimFlowType: value, annex: freePormo[value], promoCode: freePormo[value] }));
    navigate(brandRoutes.brandRegister.path)
  };

  return (
    <div className="sec_common_80 xl:px-28 lg:py-10 ">
      <img
        src={useDynamicImages("fsim-banner", "sq-banner")}
        alt="Free eSIM Landing"
        className="w-full h-full bg-contain rounded-3xl"
      />

      {/* White Card Container */}
      <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg max-w-3xl mx-auto mt-8">
        {/* Main Offer Text with Bold Red Highlights */}
        <p className="text-base md:text-lg lg:text-xl text-[#4F4F4F] text-center mb-6 leading-relaxed">
          {formatOfferTextWithHighlights(
            t(`obaja.getFreeeSIM`).split("\n\n")[0],
          )}
        </p>

        {/* Note Box */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
          <p className="text-sm md:text-base text-[#4F4F4F] text-center">
            <span className="font-bold text-[#ed3942]">Note</span>
            {t(`obaja.getFreeeSIM`).includes("\n\n")
              ? ": " + t(`obaja.getFreeeSIM`).split("\n\n")[1]
              : ": If the country is not in the 90-country Free Wifi list, a daily fee applies."}
          </p>
        </div>

        {/* Gradient Button */}
        <div className="flex justify-center items-center mb-4">
          <Button
            className="bg-gradient-to-r from-[#ed3942] to-[#ff6b7a] hover:from-[#ed3942] hover:to-[#ff6b7a] text-white text-base md:text-lg font-semibold px-8 py-4 rounded-full shadow-md transition-all duration-300 w-full max-w-md"
            onClick={() => handleClick("D")}
          >
            <span>{t(`obaja.obajaButton.buttonTextWifi`)}</span>
            <ArrowRightIcon className="!h-5 !w-5 shrink-0 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ObajaBanner;
