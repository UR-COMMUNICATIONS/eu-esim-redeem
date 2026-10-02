import ProductGallery from "@/components/shared/others/ProductGallery";
import { Button } from "@/components/ui/button";
import useDynamicImages from "@/hooks/useDynamicImages";
import { commercialRoutes, HandThumbUp, WifiIcon } from "@/services";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Hero() {
  const { product } = useSelector((state) => state.router);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleNext = () => {
    // dispatch(resetCart());
    navigate(commercialRoutes.productInternetPackages.path);
  };

  return (
    <section className="pt-6 sm:pt-8 md:pt-10 px-4 sm:px-8">
      <div className="containerX">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-10 lg:gap-15">
          <div className="w-full lg:max-w-[532px]">
            <ProductGallery items={product?.images} />
          </div>
          <div className="w-full">
            <h2 className="text-2xl sm:text-4xl md:text-6xml leading-[120%] text-black-900 font-bold">
              {t("router.product.name")}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-black-600 leading-[120%] mt-2 sm:mt-3 md:mt-4">
              <strong className="text-black">
                {" "}
                {t("router.product.descriptionHighlight")} {""}
              </strong>
              {t("router.product.description")}
            </p>
            <div className="flex flex-col gap-4 mt-10">
              <div className="flex items-center gap-4">
                <div className="w-9 md:w-11 aspect-square bg-main-10 rounded-full flex items-center justify-center">
                  <WifiIcon className="" />
                </div>
                <span className="text-sm sm:text-base">
                  {t("router.product.features.0")}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-9 md:w-11 aspect-square bg-main-10 rounded-full flex items-center justify-center">
                  <HandThumbUp />
                </div>
                <span className="text-sm sm:text-base">
                  {t("router.product.features.1")}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-9 md:w-11 aspect-square bg-main-10 rounded-full flex items-center justify-center">
                  <img
                    src={useDynamicImages("others", "tick-sheet")}
                    className="w-[24px] h-[24px] object-contain"
                    alt="tick-sheet"
                    title="tick-sheet"
                  />
                </div>
                <span className="text-sm sm:text-base">
                  {t("router.product.features.2")}
                </span>
              </div>
            </div>
            <Button
              className="px-6 py-4 text-base font-semibold leading-[120%] mt-6 lg:mt-12"
              type="button"
              onClick={handleNext}
            >
              {t("router.product.buttons.text2")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
