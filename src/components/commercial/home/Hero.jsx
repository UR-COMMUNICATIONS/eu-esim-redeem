import useEmblaCarouselDotButtons from "@/hooks/useEmblaCarouselDotButtons";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { cn } from "@/lib/utils";
import { setHeroIndex } from "@/store/module/shared/sharedSlice";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "./Banner";

export const heroSlides = [
  {
    key: "SgNationalDay",
    component: (
      <Banner
        desktopImage="sg_national_day_desktop"
        mobileImage="sg_national_day_mobile"
        altAttr="YooWiFi Singapore National Day eSIM Promotion"
        titleAttr="Singapore National Day"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: false, isBlack: true },
    dotColor: "bg-white",
    showForCountries: ["SG"],
  },
  {
    key: "WelcomeCreditId",
    component: (
      <Banner
        desktopImage="welcome_credit_id_desktop"
        mobileImage="welcome_credit_id_mobile"
        altAttr="Welcome Credit Indonesia"
        titleAttr="Welcome Credit"
        bnrPath="welcome-credit"
      />
    ),
    navbarStyle: {
      isWhite: false,
      isRedBorder: false,
      isBlack: false,
      isLightBanner: true,
    },
    dotColor: "bg-secondary-500",
    showForCountries: ["ID"],
  },
  {
    key: "WelcomeCreditMy",
    component: (
      <Banner
        desktopImage="welcome_credit_my_desktop"
        mobileImage="welcome_credit_my_mobile"
        altAttr="Welcome Credit Malaysia"
        titleAttr="Welcome Credit"
        bnrPath="welcome-credit"
      />
    ),
    navbarStyle: {
      isWhite: false,
      isRedBorder: false,
      isBlack: false,
      isLightBanner: true,
    },
    dotColor: "bg-secondary-500",
    showForCountries: ["MY"],
  },
  {
    key: "WelcomeCreditSg",
    component: (
      <Banner
        desktopImage="welcome_credit_sg_desktop"
        mobileImage="welcome_credit_sg_mobile"
        altAttr="Welcome Credit Singapore"
        titleAttr="Welcome Credit"
        bnrPath="welcome-credit"
      />
    ),
    navbarStyle: {
      isWhite: false,
      isRedBorder: false,
      isBlack: false,
      isLightBanner: true,
    },
    dotColor: "bg-secondary-500",
    showForCountries: ["SG"],
  },
  {
    key: "WelcomeCreditPh",
    component: (
      <Banner
        desktopImage="welcome_credit_ph_desktop"
        mobileImage="welcome_credit_ph_mobile"
        altAttr="Welcome Credit Philippines"
        titleAttr="Welcome Credit"
        bnrPath="welcome-credit"
      />
    ),
    navbarStyle: {
      isWhite: false,
      isRedBorder: false,
      isBlack: false,
      isLightBanner: true,
    },
    dotColor: "bg-secondary-500",
    showForCountries: ["PH"],
  },
  {
    key: "WelcomeCreditJp",
    component: (
      <Banner
        desktopImage="welcome_credit_jp_desktop"
        mobileImage="welcome_credit_jp_mobile"
        altAttr="Welcome Credit Japan"
        titleAttr="Welcome Credit"
        bnrPath="welcome-credit"
      />
    ),
    navbarStyle: {
      isWhite: false,
      isRedBorder: false,
      isBlack: false,
      isLightBanner: true,
    },
    dotColor: "bg-secondary-500",
    showForCountries: ["JP"],
  },
  {
    key: "WelcomeCreditHk",
    component: (
      <Banner
        desktopImage="welcome_credit_hk_desktop"
        mobileImage="welcome_credit_hk_mobile"
        altAttr="Welcome Credit Hong Kong"
        titleAttr="Welcome Credit"
        bnrPath="welcome-credit"
      />
    ),
    navbarStyle: {
      isWhite: false,
      isRedBorder: false,
      isBlack: false,
      isLightBanner: true,
    },
    dotColor: "bg-secondary-500",
    showForCountries: ["HK"],
  },
  {
    key: "BusinessId",
    component: (
      <Banner
        desktopImage="business_id_desktop"
        mobileImage="business_id_mobile"
        altAttr="Yoowifi Business Indonesia"
        titleAttr="Yoowifi Business"
        bnrPath="corporate/business"
      />
    ),
    navbarStyle: {
      isWhite: false,
      isRedBorder: false,
      isBlack: false,
      isLightBanner: true,
    },
    dotColor: "bg-secondary-500",
    showForCountries: ["ID"],
  },
  {
    key: "BusinessSea",
    component: (
      <Banner
        desktopImage="business_sea_desktop"
        mobileImage="business_sea_mobile"
        altAttr="Yoowifi Business"
        titleAttr="Yoowifi Business"
        bnrPath="corporate/business"
      />
    ),
    navbarStyle: {
      isWhite: false,
      isRedBorder: false,
      isBlack: false,
      isLightBanner: true,
    },
    dotColor: "bg-secondary-500",
    showForCountries: ["SG", "MY", "PH"],
  },

  {
    key: "UnlimitedSg",
    component: (
      <Banner
        desktopImage="sg_unlimited_desktop"
        mobileImage="sg_unlimited_mobile"
        altAttr="Singapore Unlimited Data eSIM Plan"
        titleAttr="Singapore Unlimited Data"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: false, isBlack: true },
    dotColor: "bg-secondary-500", // different one
    showForCountries: ["SG"],
  },

  {
    key: "Umrah",
    component: (
      <Banner
        desktopImage="id_umrah_desktop"
        mobileImage="id_umrah_mobile"
        altAttr="Umrah Data eSIM"
        titleAttr="Umrah Data"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: false, isBlack: true },
    dotColor: "bg-secondary-500", // different one
    showForCountries: ["ID"],
  },
  {
    key: "UnlimitedId",
    component: (
      <Banner
        desktopImage="id_unlimited_desktop"
        mobileImage="id_unlimited_mobile"
        altAttr="Unlimited Data eSIM"
        titleAttr="Unlimited Data"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: false, isBlack: true },
    dotColor: "bg-secondary-500", // different one
    showForCountries: ["ID"],
  },
  {
    key: "UnlimitedMy",
    component: (
      <Banner
        desktopImage="my_unlimited_desktop"
        mobileImage="my_unlimited_mobile"
        altAttr="Unlimited Data eSIM"
        titleAttr="Unlimited Data"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: false, isBlack: true },
    dotColor: "bg-secondary-500",
    showForCountries: ["MY"],
  },
  {
    key: "UnlimitedPh",
    component: (
      <Banner
        desktopImage="ph_unlimited_desktop"
        mobileImage="ph_unlimited_mobile"
        altAttr="Unlimited Data eSIM"
        titleAttr="Unlimited Data"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: false, isBlack: true },
    dotColor: "bg-secondary-500", // different one
    showForCountries: ["PH"],
  },

  {
    key: "alwaysCheaperId",
    component: (
      <Banner
        desktopImage="always_cheaper_id_desktop"
        mobileImage="always_cheaper_id_mobile"
        altAttr="Affordable Travel Data Rates Comparison"
        titleAttr="Always Cheaper Rates"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: false, isBlack: true },
    dotColor: "bg-secondary-500",
    showForCountries: ["ID"],
  },
  {
    key: "alwaysCheaperMy",
    component: (
      <Banner
        desktopImage="always_cheaper_my_desktop"
        mobileImage="always_cheaper_my_mobile"
        altAttr="Affordable Travel Data Rates Comparison"
        titleAttr="Always Cheaper Rates"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: false, isBlack: true },
    dotColor: "bg-secondary-500",
    showForCountries: ["MY"],
  },
  {
    key: "alwaysCheaperSg",
    component: (
      <Banner
        desktopImage="always_cheaper_sg_desktop"
        mobileImage="always_cheaper_sg_mobile"
        altAttr="Affordable Travel Data Rates Comparison"
        titleAttr="Always Cheaper Rates"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: false, isBlack: true },
    dotColor: "bg-secondary-500",
    showForCountries: ["SG"],
  },
  {
    key: "alwaysCheaperPh",
    component: (
      <Banner
        desktopImage="always_cheaper_ph_desktop"
        mobileImage="always_cheaper_ph_mobile"
        altAttr="Affordable Travel Data Rates Comparison"
        titleAttr="Always Cheaper Rates"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: false, isBlack: true },
    dotColor: "bg-secondary-500",
    showForCountries: ["PH"],
  },

  {
    key: "GlobalTravelJp",
    component: (
      <Banner
        desktopImage="global_travel_desktop"
        mobileImage="global_travel_mobile"
        altAttr="Global Travel Data eSIM"
        titleAttr="Global Travel"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: false, isBlack: true },
    dotColor: "bg-secondary-500", // different one
    showForCountries: ["JP"],
  },

  {
    key: "DiscountBannerJp",
    component: (
      <Banner
        desktopImage="discounted_jp_desktop"
        mobileImage="discounted_jp_mobile"
        altAttr="Discounted Data eSIM"
        titleAttr="Discounted Data"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: false, isBlack: true },
    dotColor: "bg-secondary-500", // different one
    showForCountries: ["JP"],
  },
  {
    key: "connected",
    // component: <HeroConnected />,
    component: (
      <Banner
        desktopImage="hero_connected_desktop"
        mobileImage="hero_connected_mobile"
        altAttr="Stay Connected Globally with YooWiFi"
        titleAttr="Stay Connected"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: true, isBlack: true },
    dotColor: "bg-secondary-500", // example color
    hideForCountries: ["JP"],
  },
  {
    key: "connectedJP",
    component: (
      <Banner
        desktopImage="hero_connected_jp_desktop"
        mobileImage="hero_connected_jp_mobile"
        altAttr="Stay Connected Globally with YooWiFi"
        titleAttr="Stay Connected"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: true, isBlack: true },
    dotColor: "bg-secondary-500", // example color
    showForCountries: ["JP"],
  },
  {
    key: "travel",
    component: (
      <Banner
        desktopImage="hero_travel_desktop"
        mobileImage="hero_travel_mobile"
        altAttr="International Travel eSIM and Pocket WiFi"
        titleAttr="Travel with YooWiFi"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: false, isBlack: true },
    dotColor: "bg-secondary-500",
    hideForCountries: ["JP", "ID", "MY", "PH", "SG"],
  },
  {
    key: "discoverId",
    component: (
      <Banner
        desktopImage="hero_discover_id_desktop"
        mobileImage="hero_discover_id_mobile"
        altAttr="Discover the World with Seamless Internet"
        titleAttr="Discover the World"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: true, isBlack: true },
    dotColor: "bg-main-600",
    showForCountries: ["ID"],
  },
  {
    key: "discoverMy",
    component: (
      <Banner
        desktopImage="hero_discover_my_desktop"
        mobileImage="hero_discover_my_mobile"
        altAttr="Discover the World with Seamless Internet"
        titleAttr="Discover the World"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: true, isBlack: true },
    dotColor: "bg-main-600",
    showForCountries: ["MY"],
  },
  {
    key: "discoverSg",
    component: (
      <Banner
        desktopImage="hero_discover_sg_desktop"
        mobileImage="hero_discover_sg_mobile"
        altAttr="Discover the World with Seamless Internet"
        titleAttr="Discover the World"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: true, isBlack: true },
    dotColor: "bg-main-600",
    showForCountries: ["SG"],
  },
  {
    key: "discoverPh",
    component: (
      <Banner
        desktopImage="hero_discover_ph_desktop"
        mobileImage="hero_discover_ph_mobile"
        altAttr="Discover the World with Seamless Internet"
        titleAttr="Discover the World"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: true, isBlack: true },
    dotColor: "bg-main-600",
    showForCountries: ["PH"],
  },
  {
    key: "discoverJP",
    component: (
      <Banner
        desktopImage="hero_discover_jp_desktop"
        mobileImage="hero_discover_jp_mobile"
        altAttr="Discover the World with Seamless Internet"
        titleAttr="Discover the World"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: true, isBlack: true },
    dotColor: "bg-main-600", // different one
    showForCountries: ["JP"],
  },
  {
    key: "HkEscapeholiday",
    component: (
      <Banner
        desktopImage="hk_escapeholiday_desktop"
        mobileImage="hk_escapeholiday_mobile"
        altAttr="Hong Kong Escape Holiday Travel eSIM"
        titleAttr="Escape Holiday"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: false, isBlack: true },
    dotColor: "bg-white",
    showForCountries: ["HK"],
  },
  {
    key: "IdEscapeholiday",
    component: (
      <Banner
        desktopImage="id_escapeholiday_desktop"
        mobileImage="id_escapeholiday_mobile"
        altAttr="Indonesia Escape Holiday Travel eSIM"
        titleAttr="Escape Holiday"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: false, isBlack: true },
    dotColor: "bg-white",
    showForCountries: ["ID"],
  },
  {
    key: "JpEscapeholiday",
    component: (
      <Banner
        desktopImage="jp_escapeholiday_desktop"
        mobileImage="jp_escapeholiday_mobile"
        altAttr="Japan Escape Holiday Travel eSIM"
        titleAttr="Escape Holiday"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: false, isBlack: true },
    dotColor: "bg-white",
    showForCountries: ["JP"],
  },
  {
    key: "MyEscapeholiday",
    component: (
      <Banner
        desktopImage="my_escapeholiday_desktop"
        mobileImage="my_escapeholiday_mobile"
        altAttr="Malaysia Escape Holiday Travel eSIM"
        titleAttr="Escape Holiday"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: false, isBlack: true },
    dotColor: "bg-white",
    showForCountries: ["MY"],
  },
  {
    key: "PhEscapeholiday",
    component: (
      <Banner
        desktopImage="ph_escapeholiday_desktop"
        mobileImage="ph_escapeholiday_mobile"
        altAttr="Philippines Escape Holiday Travel eSIM"
        titleAttr="Escape Holiday"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: false, isBlack: true },
    dotColor: "bg-white",
    showForCountries: ["PH"],
  },
  {
    key: "SgEscapeholiday",
    component: (
      <Banner
        desktopImage="sg_escapeholiday_desktop"
        mobileImage="sg_escapeholiday_mobile"
        altAttr="Singapore Escape Holiday Travel eSIM"
        titleAttr="Escape Holiday"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: false, isBlack: true },
    dotColor: "bg-white",
    showForCountries: ["SG"],
  },
];

function Hero() {
  const options = {
    loop: true,
    watchDrag: false,
  };

  const autoplay = Autoplay({ delay: 12000, stopOnInteraction: false });
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplay]);
  const { isTargetCountry } = useUserLocationLanguage();

  // const [emblaRef, emblaApi] = useEmblaCarousel(options, [
  //   Autoplay({ delay: 6000 }),
  // ]);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const currentLanguage = sessionStorage.getItem("i18next")?.toUpperCase();
  const currentCountry = cart.userCountry?.country?.toUpperCase();
  // const isJapanCountry =
  //   currentCountry === "JP" &&
  //   (currentLanguage === "EN" || currentLanguage === "JP");
  // const handleUpdateHeroSelectedIndex = (index) => {
  //   const key = heroSlides[index]?.key;
  //   dispatch(setHeroIndex(key));
  // };
  // const { selectedIndex, scrollSnaps } = useEmblaCarouselDotButtons(
  //   emblaApi,
  //   heroSlides,
  //   handleUpdateHeroSelectedIndex
  // );
  const filteredHeroSlides = heroSlides.filter((slide) => {
    if (
      slide.showForCountries &&
      !slide.showForCountries.includes(currentCountry)
    ) {
      return false;
    }
    if (
      slide.hideForCountries &&
      slide.hideForCountries.includes(currentCountry)
    ) {
      return false;
    }
    if (
      slide.showForLanguages &&
      !slide.showForLanguages.includes(currentLanguage)
    ) {
      return false;
    }
    return true;
  });

  const handleUpdateHeroSelectedIndex = (index) => {
    const key = filteredHeroSlides[index]?.key;
    dispatch(setHeroIndex(key));
  };

  const { selectedKey, scrollSnaps } = useEmblaCarouselDotButtons(
    emblaApi,
    filteredHeroSlides,
    handleUpdateHeroSelectedIndex,
  );

  const handleDotClick = (index) => {
    if (emblaApi) {
      autoplay.reset();
      emblaApi.scrollTo(index);
    }
  };

  return (
    <section className="w-full relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className={cn("flex select-none")}>
          {filteredHeroSlides.map((slide, idx) => (
            <div
              key={slide.key}
              className="flex-[0_0_100%] shrink-0 grow-0 overflow-hidden"
            >
              {slide.component}
            </div>
          ))}
        </div>
        <div className="md:hidden flex flex-row items-center justify-center gap-2.5 pr-4 mt-5">
          {scrollSnaps?.map((_, index) => {
            const slide = filteredHeroSlides[index];
            const isSelected = selectedKey === slide?.key;

            return (
              <button
                onClick={() => handleDotClick(index)}
                className={cn(
                  "w-3 rounded-xl duration-300 bg-secondary-500",
                  isSelected ? `h-3 w-8 ` : "h-3 bg-black",
                )}
                key={index}
              ></button>
            );
          })}
        </div>
      </div>

      {/* Dot Buttons */}
      <div
        // className="absolute md:right-16 md:bottom-28 z-[38] hidden md:flex md:flex-col items-center gap-2.5"
        className="absolute right-0 bottom-40 z-[38] hidden md:flex md:flex-col items-center gap-2.5 pr-4"
      >
        {scrollSnaps?.map((_, index) => {
          const slide = filteredHeroSlides[index];
          const isSelected = selectedKey === slide?.key;

          return (
            <button
              onClick={() => handleDotClick(index)}
              className={cn(
                "w-3 rounded-xl duration-300",
                isSelected
                  ? `h-3 w-8 md:w-3 md:h-8 ${slide.dotColor}`
                  : "h-3 bg-white-rgb",
              )}
              key={index}
            ></button>
          );
        })}
      </div>
    </section>
  );
}

export default Hero;
