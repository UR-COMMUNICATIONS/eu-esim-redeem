import { Button } from "@/components/ui/button";
import { planImageMapping } from "@/constants/planTypes";
import { cn } from "@/lib/utils";
import { commercialRoutes } from "@/services";
import { setCartData } from "@/store/module/cart/cartSlice";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AstindoPackageCard = ({ data, type = 2, flow }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { cart } = useSelector((state) => state.cart);
  let url = null;
  const baseUrl = "https://yw-web-images.s3.ap-southeast-1.amazonaws.com/";
  if (data?.productImage) {
    url = baseUrl + data.productImage;
  } else {
    let defaultImg =
      data.deviceType?.toUpperCase() == "D"
        ? "defaultPocketwifi.png"
        : "defaultSimEsim.png";
    url = baseUrl + defaultImg;
  }

  const handleBuyNow = (planData) => {
    dispatch(
      setCartData({
        package: planData,
        compflowType: flow,
        planVariations: [],
        variation: {},
        cartType: "",
        device: null,
      }),
    );
    navigate(commercialRoutes.astindoCartService.path);
  };

  // const currentLanguage = sessionStorage.getItem('i18next')?.toUpperCase();
  // const currentCountry = cart.userCountry?.country?.toUpperCase();
  // const isJapanCountry = (currentCountry === 'JP' && (currentLanguage === 'EN' || currentLanguage === 'JP'))

  let planAttbs = {
    planName: data.planName,
    nameAttributes: data.nameAttributes,
    description: data.description,
  };

  if (cart.userLanguage !== "en") {
    planAttbs["planName"] = data?.trPlanName || data.planName;
    planAttbs["nameAttributes"] = data?.trNameAttributes || data.nameAttributes;
    planAttbs["description"] = data?.trDescription || data.description;
  }

  // useEffect(() => {
  //   console.log('inside alskaslksalsak', cart);

  //   // getPlanCountries({ planCode: item.planCode })
  // }, [cart.userLanguage]);

  return (
    <div className="bg-white rounded-[8px] md:rounded-3xl p-2 md:p-4 ring-[2px] ring-neutral-200 hover:ring-0 shadow-none hover:shadow-card-primary transition_common flex flex-col h-full">
      <div className="w-full aspect-[1.06/1] relative overflow-hidden rounded-[4px] md:rounded-2xl">
        <LazyLoadImage
          src={url + "?v=${new Date().getTime()}"}
          alt={"middel east"}
          height={1000}
          width={2000}
          className="absolute_center min-h-full min-w-full object-cover"
        />
      </div>
      <h2 className="text-base md:text-[22px] !leading-[1.1] font-semibold text-start mt-2 md:mt-4 h-12 line-clamp-2">
        {type === 1 ? "Middle East" : planAttbs.planName}
      </h2>
      <div className="flex-grow flex flex-col justify-between items-start mt-2">
        <p
          className="text-[14px] md:text-[16px] font-normal text-gray-400"
          style={{ whiteSpace: "pre-line", fontFamily: "DMSans, sans-serif" }}
        >
          {planAttbs.nameAttributes}
        </p>
      </div>
      <hr className="my-1 md:my-4 h-[1px] bg-neutral-100" />
      <div className="flex justify-between items-center gap-2 md:gap-4">
        <div className="flex flex-col">
          {/* {data?.planType == 'CN' && */}
          <p className="text-[10px] sm:text-sm md:text-base text-black-700 !leading-normal">
            {t("extraText.from")}
          </p>
          {/* } */}
          <h2 className="text-[10px] sm:text-sm md:text-2xl lg:text-[20px] text-black-700 font-semibold md:font-semibold !leading-[1.2] md:!leading-[1.1]">
            {data.currency + " " + data.rate}
            {/* {data?.rate <= 0 || data?.planType?.toUpperCase() === 'CN' ? null :
              data.currency + ' ' + data.rate
            } */}
          </h2>
        </div>

        {/* <div className="flex flex-col">
          {data?.planType == 'CN' || data?.deviceType == 'E' ?
            <p className="text-[10px] sm:text-sm md:text-base text-black-700 !leading-normal">
              {t("extraText.from")}
            </p>
            :
            null
          }
          <h2 className="text-[10px] sm:text-sm md:text-2xl lg:text-[28px] text-black-700 font-semibold md:font-bold !leading-[1.2] md:!leading-[1.1]">
            {data?.planType != 'CN' || ['S', 'E'].includes(data?.deviceType) ? data.currency + " " + data?.rate : data.currency + " " + data?.rates?.[0]?.rate?.toFixed(2)}
          </h2>
        </div> */}
        <Button
          className={cn(
            type === 1
              ? "!px-2 !py-[5px] md:!px-4 md:!py-3"
              : "text-base !px-2 !py-1 md:!px-4 md:!py-3",
            "text-[10px] md:text-base !leading-[1.2] rounded-sm md:rounded-xl",
          )}
          onClick={() => handleBuyNow(data)}
        >
          {type === 1 ? t("buttonText.findOutMore") : t("buttonText.buyNow")}
        </Button>
      </div>
    </div>
  );
};

export default AstindoPackageCard;
