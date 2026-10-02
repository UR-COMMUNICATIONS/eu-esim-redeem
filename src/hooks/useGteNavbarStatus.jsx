import React, { useEffect, useState } from "react";
import { commercialRoutes } from "@/services";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { heroSlides } from "@/components/commercial/home/Hero";

function useGteNavbarStatus() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { selectedHeroIndex } = useSelector((state) => state.shared);

  const isHome = location?.pathname === "/";
  const bannerPaths = [
    // commercialRoutes.contact.path,
    // commercialRoutes.aboutUs.path,
    commercialRoutes.countryCoverage.path,
  ];
  const isBannerRoutes = bannerPaths?.includes(location?.pathname);

  function handleScroll() {
    setIsScrolled(window.scrollY > 0);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  const currentSlide = heroSlides.find((a) => a.key === selectedHeroIndex);

  return {
    isHome,
    isScrolled,
    isWhite:
      currentSlide?.navbarStyle?.isWhite && !isScrolled && isHome
        ? true
        : false,
    isRedBorder:
      currentSlide?.navbarStyle?.isRedBorder && !isScrolled && isHome
        ? true
        : false,
    isBlack:
      isHome || isScrolled || isBannerRoutes
        ? currentSlide?.navbarStyle?.isBlack
        : false,
    isLightBanner:
      currentSlide?.navbarStyle?.isLightBanner && !isScrolled && isHome
        ? true
        : false,
    isBannerRoutes,
  };
}

export default useGteNavbarStatus;
