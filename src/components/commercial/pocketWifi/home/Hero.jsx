import ProductGallery from "@/components/shared/others/ProductGallery";
import { Button } from "@/components/ui/button";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
// import { cn } from "@/lib/utils";
import {
  commercialRoutes,
  DollarLabelIcon,
  GlobeIcon,
  WifiIcon,
  ShareGroupIcon,
} from "@/services";
import { resetCart } from "@/store/module/cart/cartSlice";
import { useState, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useDynamicImports from "@/hooks/useDynamicImports";

function Hero() {
  const { currentCountry, isTargetCountry, nameSpace } =
    useUserLocationLanguage();
  const { product } = useSelector((state) => state.pocketWifi);
  let slicedImages = isTargetCountry
    ? currentCountry === "jp"
      ? [...product.jpImages]
      : [...product.images]?.slice(0, 5)
    : [...product.images];

  const [activeColor, setActiveColor] = useState(product?.colors[0]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(["translation", "english", "local"]);
  const handleNext = () => {
    // dispatch(resetCart());
    navigate(`${commercialRoutes.productInternetPackages.path}?type=D`);
  };
  // const path = "&/countries/{currentCountry}/src/components/shared/others/ProductGallery.jsx";
  // const ProductGallery_Dynamic = useDynamicImports(path);
  return (
    <section className="pt-6 sm:pt-8 md:pt-10 px-4 sm:px-8">
      <div className="containerX">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-10 lg:gap-15">
          <div className="w-full lg:max-w-[532px]">
            <ProductGallery items={slicedImages} />
            {/* <Suspense fallback={<div>Loading...</div>}>
              {ProductGallery_Dynamic ? <ProductGallery_Dynamic items={slicedImages} /> : null}
            </Suspense> */}
            <p className="text-lg text-black-600 leading-[140%] md:whitespace-pre-wrap mt-5">
              {t(`${nameSpace}:pocketWifi.product.coloursofdevices`)}
            </p>
          </div>
          <div className="w-full">
            <h1 className="text-2xl sm:text-4xl md:text-6xl leading-[120%] text-black-900 font-bold break-words">
              {t(`${nameSpace}:pocketWifi.product.name`)}
            </h1>
            <p
              className="text-sm sm:text-base md:text-lg text-black-600 leading-[120%] mt-2 sm:mt-3 md:mt-4 whitespace-pre-line"
              // dangerouslySetInnerHTML={{
              //   __html: t("pocketWifi.product.description"),
              // }}
            >
              <strong className="text-black">
                {" "}
                {t(`${nameSpace}:pocketWifi.product.descriptionHighlight`)} {""}
              </strong>
              {t(`${nameSpace}:pocketWifi.product.description`)}
            </p>
            <div className="flex flex-col gap-4 mt-10">
              <div className="flex items-center gap-4">
                <div className="w-9 md:w-11 aspect-square bg-main-10 rounded-full flex items-center justify-center">
                  <ShareGroupIcon className="w-[28.15px] h-[28.14px]" />
                </div>
                <span className="text-sm sm:text-base">
                  {t(`${nameSpace}:pocketWifi.product.features.0`)}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-9 md:w-11 aspect-square bg-main-10 rounded-full flex items-center justify-center">
                  <GlobeIcon />
                </div>
                <span className="text-sm sm:text-base">
                  {t(`${nameSpace}:pocketWifi.product.features.1`)}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-9 md:w-11 aspect-square bg-main-10 rounded-full flex items-center justify-center">
                  <WifiIcon className="" />
                </div>
                <span className="text-sm sm:text-base">
                  {t(`${nameSpace}:pocketWifi.product.features.2`)}
                </span>
              </div>
            </div>
            <div className="flex justify-start">
              <Button
                className="px-6 py-4 text-base font-semibold leading-[120%] mt-6 lg:mt-12"
                type="button"
                onClick={handleNext}
              >
                {t(`${nameSpace}:pocketWifi.product.buttons.text2`)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
