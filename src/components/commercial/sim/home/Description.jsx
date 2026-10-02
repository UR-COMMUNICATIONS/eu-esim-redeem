import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function Description() {
  const { product } = useSelector((state) => state.sim);
  const options = { align: "start" };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { t } = useTranslation();

  return (
    <div className="pt-12 pb-15 px-4 md:px-10 lg:px-16">
      <div className="containerX">
        <Tabs defaultValue={product?.tabs[0]?.title} className="w-full">
          <div ref={emblaRef} className="max-w-full overflow-hidden">
            <TabsList>
              {product?.tabs?.map((item, index) => (
                <TabsTrigger key={index} value={item?.title}>
                  {t(`sim.product.tabs.${index}.title`)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {product?.tabs?.map((item, index) => (
            <TabsContent key={index} value={item?.title}>
              <p className="text-lg text-black-600 leading-[140%] whitespace-pre-wrap">
                {t(`sim.product.tabs.${index}.content`)}
              </p>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default Description;
