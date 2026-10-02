import ProductCard from "@/components/shared/cards/ProductCard";
import useDynamicImports from "@/hooks/useDynamicImports";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { cn } from "@/lib/utils";
import { images, productsData } from "@/services";
import { memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Products = ({
  showProductDeadline = false,
  type,
  className,
  ...props
}) => {
  const { hideProducts } = useUserLocationLanguage();

  const [selectedCard, setSelectedCard] = useState(type == "D" ? 1 : 0);
  const products = useMemo(() => productsData(), []);

  let newProducts = [
    ...products.cardData?.filter((item) => !hideProducts.includes(item.type)),
  ];
  const { t } = useTranslation();

  const path =
    "&/countries/{currentCountry}/src/components/commercial/home/ProductsImg.jsx";
  const LazyLoadImage_Dynamic = useDynamicImports(path);
  const { currentCountry } = useUserLocationLanguage();
  const isTargetCountry = currentCountry === "jp";

  return (
    <section className={cn("sec_common_80 bg-main-20", className)} {...props}>
      <div className="containerX overflow-visible">
        <h2 className="title text-center md:text-start">
          {t("productsData.title")}
        </h2>

        <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-8 lg:gap-[60px] trasition_common mt-6 md:mt-10 lg:mt-[60px]">
          <div className="w-full md:w-1/2 min-[950px]:w-[55%] flex flex-col justify-center items-start gap-6 md:gap-9">
            <div className="w-full flex flex-col gap-4 order-2 md:order-1">
              {newProducts
                .filter((item) => item.type !== type)
                .map((item, index) => (
                  <ProductCard
                    key={item.index}
                    item={item}
                    index={item.index}
                    eventHandler={() => setSelectedCard(item.index)}
                    selected={selectedCard === item.index}
                    showCountDown={showProductDeadline}
                  />
                ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 min-[950px]:w-[45%] overflow-visible relative h-[328px] md:h-auto">
            <LazyLoadImage
              // src={products.productImages[selectedCard]}
              src={
                isTargetCountry && selectedCard === 0
                  ? images.japanDeviceBlue
                  : products.productImages[selectedCard]
              }
              height={2000}
              width={2000}
              alt="why choose us"
              title="why choose us"
              className="absolute_center w-auto h-full md:h-auto max-h-[431px]"
            />
          </div>
          {/* <Suspense fallback={<div>Loading...</div>}>
            {LazyLoadImage_Dynamic ?
              <LazyLoadImage_Dynamic
                productImages={products.productImages}
                selectedCard={selectedCard} />
              : null}
          </Suspense> */}
        </div>
      </div>
    </section>
  );
};

export default memo(Products);
