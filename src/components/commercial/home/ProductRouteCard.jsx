import AutoResizeText from "@/components/shared/AutoResizeText ";
import useModal from "@/hooks/useModal";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "@/services";
import { useTranslation } from "react-i18next";

function ProductRouteCard({
  item,
  wrapperClass = "",
  pocketWifiColor = "",
  routerColor = "",
  simColor = "",
  index,
  ...props
}) {
  const { t } = useTranslation();

  const { currentCountry } = useUserLocationLanguage();

  return (
    <div
      className={cn(
        // smaller padding & radius on mobile, larger on sm+
        // "py-5 px-2 sm:px-4 rounded-xl bg-black-800 flex flex-col text-center items-center justify-center gap-2 cursor-pointer w-full opacity-70 hover:opacity-90",
        "py-2 px-2 sm:py-5 sm:px-4 rounded-lg sm:rounded-xl bg-black-800 flex flex-col text-center items-center justify-center gap-1.5 sm:gap-2 cursor-pointer w-full max-w-[140px] xs:max-w-[180px] sm:max-w-[220px] md:max-w-[280px] opacity-70 hover:opacity-90",
        wrapperClass
      )}
      {...props}
    >
      {/* Icon size smaller on mobile */}
      <div
        className={cn(
          "flex items-center justify-center mx-auto",
          item.type === "S" ? "w-4 h-4 sm:w-8 sm:h-8" : "w-5 h-5 sm:w-8 sm:h-8"
        )}
      >
        {/* <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center mx-auto"> */}
        {item?.icon({ pocketWifiColor, routerColor, simColor })}
      </div>

      {/* Text shrinks for mobile */}
      <AutoResizeText
        maxLines={1}
        baseFontSize={window.innerWidth < 640 ? 12 : 18}
        className="font-semibold leading-[100%]"
      >
        {currentCountry == "jp" && item.type == "S" ?
          t(`productsData.cardDataLatest.${item.type}.titleJp`)
          :
          t(`productsData.cardDataLatest.${item.type}.title`)
        }

      </AutoResizeText>

      {/* Button text & spacing smaller on mobile */}
      <button
        type="button"
        className="outline-none flex items-center justify-center gap-1 xs:gap-2 text-main-600 font-semibold sm:mt-0 -mt-1"
      >
        <AutoResizeText
          maxLines={1}
          baseFontSize={window.innerWidth < 640 ? 10 : 14}
          className="leading-none"
        >
          {item.type == "D"
            ? t("buttonText.buyRent")
            : t("buttonText.buyNow")}
        </AutoResizeText>

        <ArrowUpRightIcon className="w-3 sm:w-4" color="#d81f22" />
      </button>
    </div>

  );
}

export default ProductRouteCard;
