import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarouselDotButtons from "@/hooks/useEmblaCarouselDotButtons";
import { cn } from "@/lib/utils";

const LandingHeroSlider = ({
  children,
  className,
  autoplayDelay = 6000,
  showDots = true,
  loop = true,
  dotColor = "bg-white",
}) => {
  const options = { loop, align: "start" };
  const autoplay = Autoplay({ delay: autoplayDelay, stopOnInteraction: false });
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplay]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useEmblaCarouselDotButtons(emblaApi);

  const slides = Array.isArray(children) ? children : [children];

  return (
    <section className={cn("w-full relative", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex select-none">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className="flex-[0_0_100%] shrink-0 grow-0 overflow-hidden"
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {showDots && scrollSnaps.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              aria-label="slide change dot button"
              type="button"
              onClick={() => onDotButtonClick(index)}
              className={cn(
                "h-2 rounded-full duration-300 select-none cursor-pointer",
                index === selectedIndex
                  ? "w-6 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/70",
              )}
              key={index}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default LandingHeroSlider;
