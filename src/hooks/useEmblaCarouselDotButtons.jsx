import { useCallback, useEffect, useState } from "react";

const useEmblaCarouselDotButtons = (
  emblaApi,
  slides = [],
  setter = () => {}
) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onDotButtonClick = useCallback(
    (index) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi) => {
    const snapIndex = emblaApi.selectedScrollSnap();
    setSelectedIndex(snapIndex);
    setter(snapIndex);
  }, [setter]);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex, // number
    selectedKey: slides[selectedIndex]?.key || null, // string (for Hero)
    scrollSnaps,
    onDotButtonClick,
  };
};

export default useEmblaCarouselDotButtons;
