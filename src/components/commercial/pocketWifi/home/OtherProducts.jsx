import ProductCard from "@/components/shared/cards/ProductCard";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { images, productsData } from "@/services";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

function OtherProducts() {
  const { currentCountry, isTargetCountry, hideProducts } = useUserLocationLanguage();

  const [selectedCard, setSelectedCard] = useState(0);
  const products = useMemo(() => productsData(), []);

  let newProducts = [...products.cardData?.filter(item => !hideProducts.includes(item.type))];
  newProducts.splice(0, 1);
  const { t } = useTranslation();

  return (
    <section className="pt-15 pb-10 sm:pb-16 md:pb-[120px] px-4 md:px-10 lg:px-16">
      <div className="containerX">
        <h2 className="text-2xml sm:text-3xl md:text-5xl lg:text-6xml text-center md:text-left font-bold text-black-900 leading-[120%]">
          {t("pocketWifi.otherProducts.title")}
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-6 sm:mt-10 md:mt-20">
          <div className="w-full flex flex-col gap-4 max-w-[622px] order-2 md:order-1">
            {newProducts?.map((item, index) => (
              <ProductCard
                key={index}
                index={index}
                item={item}
                eventHandler={() => setSelectedCard(index)}
                selected={selectedCard === index}
              />
            ))}
          </div>
          <div className="w-full max-w-[12rem] md:max-w-max mx-auto md:-mb-24 order-1 md:order-2">
            {selectedCard == 0 ? (
              <img
                src={images.japanDeviceGrey}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={images.router1}
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OtherProducts;
