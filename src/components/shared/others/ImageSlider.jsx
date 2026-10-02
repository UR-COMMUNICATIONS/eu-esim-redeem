import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarouselDotButtons from "@/hooks/useEmblaCarouselDotButtons";
import useDynamicImages from "@/hooks/useDynamicImages";
import { cn } from "@/lib/utils";

const Slide = ({
  image,
  imageFolder,
  imageClassName,
  idx,
  slidesPerView,
  gap,
}) => {
  const src =
    typeof image === "string"
      ? useDynamicImages(imageFolder, image)
      : image.src;
  const alt = typeof image === "string" ? image : image.alt || "";
  const basisClass =
    slidesPerView === 4
      ? "basis-full md:basis-1/2 lg:basis-1/4"
      : slidesPerView === 3
        ? "basis-full md:basis-1/3"
        : slidesPerView === 2
          ? "basis-full md:basis-1/2"
          : "basis-full";
  return (
    <div className={cn("shrink-0 grow-0 overflow-hidden", basisClass, gap)}>
      <img
        src={src}
        alt={alt}
        className={cn("w-full h-auto object-cover", imageClassName)}
        loading={idx === 0 ? "eager" : "lazy"}
      />
    </div>
  );
};

const ImageSlider = ({
  images,
  imageFolder = "landing-page",
  className,
  imageClassName,
  autoplayDelay = 4000,
  showDots = true,
  loop = true,
  slidesPerView = 1,
  slideGap = "px-1 md:px-1.5",
}) => {
  const options = { loop, align: "start" };
  const autoplay = Autoplay({ delay: autoplayDelay, stopOnInteraction: false });
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplay]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useEmblaCarouselDotButtons(emblaApi);

  return (
    <section className={cn("w-full", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex select-none">
          {images.map((img, idx) => (
            <Slide
              key={idx}
              image={img}
              imageFolder={imageFolder}
              imageClassName={imageClassName}
              idx={idx}
              slidesPerView={slidesPerView}
              gap={slideGap}
            />
          ))}
        </div>
      </div>

      {showDots && scrollSnaps.length > 1 && (
        <div className="flex items-center justify-center w-full gap-2 mt-4 md:mt-6">
          {scrollSnaps.map((_, index) => (
            <button
              aria-label="slide change dot button"
              type="button"
              onClick={() => onDotButtonClick(index)}
              className={cn(
                "h-2 md:h-2.5 rounded-full duration-300 select-none cursor-pointer",
                index === selectedIndex
                  ? "w-6 md:w-8 bg-main-600"
                  : "w-2 md:w-2.5 bg-neutral-300",
              )}
              key={index}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ImageSlider;
