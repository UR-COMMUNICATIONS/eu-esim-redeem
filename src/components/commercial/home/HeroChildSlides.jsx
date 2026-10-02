import AutoResizeText from "@/components/shared/AutoResizeText ";
import useEmblaCarouselDotButtons from "@/hooks/useEmblaCarouselDotButtons";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslation } from "react-i18next";

function HeroChildSlides({
  wrapperClass = "",
  selectedClass = "bg-main-750",
  defaultClass = "bg-main-60",
}) {
  const options = { align: "start", loop: true, watchDrag: false };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 2000 }),
  ]);
  const { selectedIndex, scrollSnaps } = useEmblaCarouselDotButtons(emblaApi);
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        "pt-10 sm:pt-12 lg:pt-20 xl:pt-40 pb-6 sm:pb-10 md:pb-16 w-full max-w-[536px]",
        wrapperClass
      )}
    >
      <div className="w-full overflow-hidden cursor-default" ref={emblaRef}>
        <div className="flex w-full">
          {Array(3)
            .fill("")
            .map((_, index) => (
              <SlideCard
                key={index}
                title={t(`heroHome.slides.${index}.title`)}
                subTitle={t(`heroHome.slides.${index}.subTitle`)}
                description={t(`heroHome.slides.${index}.description`)}
              />
            ))}
        </div>
      </div>
      <div className="flex gap-1 mt-4">
        {scrollSnaps?.map((_, index) => (
          <div
            className={cn(
              "w-full h-1 rounded-full duration-300",
              index === selectedIndex ? selectedClass : defaultClass
            )}
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default HeroChildSlides;

export const SlideCard = ({ title, subTitle, description }) => {
  return (
    <div className="w-full shrink-0 flex items-end justify-center">
      <div className="w-full flex gap-4">
        <div className="font-meid whitespace-pre-wrap flex flex-col justify-end">
          <AutoResizeText
            maxLines={2}
            baseFontSize={window.innerWidth < 640 ? 20 : 32}
            className="font-bold leading-tight"
          >
            {title}
          </AutoResizeText>

          <AutoResizeText
            maxLines={1}
            baseFontSize={window.innerWidth < 640 ? 12 : 14}
            className="uppercase leading-tight font-medium"
          >
            {subTitle}
          </AutoResizeText>
        </div>

        <p className="text-xs sm:text-sm flex-grow w-full">{description}</p>
      </div>
    </div>
  );
};
