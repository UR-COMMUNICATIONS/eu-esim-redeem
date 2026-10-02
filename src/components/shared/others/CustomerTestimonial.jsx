import CustomerCard from "@/components/shared/cards/CustomerCard";
import useEmblaCarouselDotButtons from "@/hooks/useEmblaCarouselDotButtons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import SectionHeader from "./SectionHeader";

const CustomerTestimonial = () => {
  // STATES
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // HOOKS
  const options = { align: "start", loop: false };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);
  const { selectedIndex, scrollSnaps } = useEmblaCarouselDotButtons(emblaApi);
  const { t } = useTranslation();

  // REDUX
  const testimonials = useSelector((state) => state.testimonials);

  return (
    <section className="sec_common_60">
      <SectionHeader
        heading={t("customerTestimonial.sectionHeading")}
        subHeading={t("customerTestimonial.sectionSubHeading")}
      />

      {/* CAROUSEL */}
      <div className="container2X w-full overflow-visible mt-6 sm:mt-10 md:mt-20">
        <div className="w-full" ref={emblaRef}>
          <div className="flex gap-3 md:gap-6 lg:gap-8 me-4 md:me-8 lg:me-10 py-4">
            {testimonials.map((item, index) => (
              <CustomerCard
                item={item}
                containerClassName={
                  "relative min-w-[272px] md:min-w-[573px] max-w-[573px]"
                }
                hovered={hoveredIndex === index}
                index={index}
                key={`customer_feedback_${index}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* dots  */}
      <div className="flex items-center justify-center w-full gap-[6px] mt-6 md:mt-11">
        {scrollSnaps.map((_, index) => (
          <button
            aria-label="slide change dot button"
            type="button"
            className={`h-1 md:h-[10px] rounded-full duration-300 select-none cursor-default ${
              index == selectedIndex
                ? "w-4 md:w-12 bg-[#D81F22]"
                : "w-1 md:w-[10px] bg-neutral-300"
            }`}
            key={index}
          />
        ))}
      </div>
    </section>
  );
};

export default memo(CustomerTestimonial);
