import { Button } from "@/components/ui/button";
import { cn, getCurrencyDisplay } from "@/lib/utils";
import { commercialRoutes, images } from "@/services";
import { setCartData } from "@/store/module/cart/cartSlice";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Globe, Zap, Database } from "lucide-react";

const DEVICE_TYPE = { PocketDevice: "D", Router: "R", Sim: "S", Esim: "E" };

const InternetPackageCardLandingPage = ({ data, type = 2, flow }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { cart } = useSelector((state) => state.cart);

  const deviceType = data?.deviceType?.toUpperCase();
  const isPocketWifi =
    deviceType === DEVICE_TYPE.PocketDevice ||
    deviceType === DEVICE_TYPE.Router;
  const cardImage = isPocketWifi ? images.japanDeviceGrey : images.sim1;

  const handleBuyNow = (planData) => {
    dispatch(
      setCartData({
        package: planData,
        compflowType: flow,
        planVariations: [],
        variation: {},
        groupVariations: {},
        variationData: {},
        device: null,
        cartType: "",
      }),
    );
    if (planData?.deviceType === "D") {
      navigate(commercialRoutes.pocketWifiCartService.path);
    } else if (planData?.deviceType === "R") {
      navigate(commercialRoutes.routerCartService.path);
    } else {
      navigate(commercialRoutes.simCartService.path);
    }
  };

  let planAttbs = {
    planName: data.planName,
    nameAttributes: data.nameAttributes,
    description: data.description,
  };

  if (cart.userLanguage !== "en") {
    planAttbs.planName = data?.trPlanName || data.planName;
    planAttbs.nameAttributes = data?.trNameAttributes || data.nameAttributes;
    planAttbs.description = data?.trDescription || data.description;
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-6">
        <div className="hidden md:flex w-16 h-16 bg-gray-50 rounded-xl items-center justify-center overflow-hidden shrink-0">
          <LazyLoadImage
            src={cardImage}
            alt={planAttbs.planName}
            className="w-10 h-10 object-contain"
          />
        </div>
        <h2 className="font-['DMSans'] font-bold text-base md:text-[20px] leading-tight text-[#191919] line-clamp-2">
          {type === 1 ? "Middle East" : planAttbs.planName}
        </h2>
      </div>

      <p className="font-['DMSans'] text-sm text-gray-500 mb-6 line-clamp-2">
        Stay connected across 160 countries, no matter where your journey takes
      </p>

      <hr className="border-gray-100 mb-6" />

      <div className="space-y-4 mb-8 flex-grow">
        <div className="flex items-center gap-3 text-gray-500 font-['DMSans'] text-sm">
          <Database size={18} className="text-[#D32F2F]" />
          <span>Unlimited data for 1 month</span>
        </div>
        <div className="flex items-center gap-3 text-gray-500 font-['DMSans'] text-sm">
          <Globe size={18} className="text-[#D32F2F]" />
          <span>160 countries</span>
        </div>
        <div className="flex items-center gap-3 text-gray-500 font-['DMSans'] text-sm">
          <Zap size={18} className="text-[#D32F2F]" />
          <span>Hi Speed 4G data</span>
        </div>
      </div>

      <div className="space-y-4 mt-auto">
        <div className="flex items-baseline gap-1 font-['DMSans']">
          <span className="text-lg md:text-[24px] font-bold text-[#191919]">
            {getCurrencyDisplay(data.currency)}
            {data.rate}
          </span>
          {/* <span className="text-gray-400 text-sm">/month</span> */}
        </div>

        <Button
          className={cn(
            "w-full py-6 text-base font-bold rounded-xl transition-all active:scale-[0.98]",
            "bg-[#C63D2F] hover:bg-[#A32F24] text-white",
          )}
          onClick={() => handleBuyNow(data)}
        >
          {type === 1 ? t("buttonText.findOutMore") : t("buttonText.buyNow")}
        </Button>
      </div>
    </div>
  );
};

export default InternetPackageCardLandingPage;
