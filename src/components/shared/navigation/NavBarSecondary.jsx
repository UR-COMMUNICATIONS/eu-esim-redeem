import { Button } from "@/components/ui/button";
// [PHASE1-HIDDEN] useActiveMenuItem (only the hidden menu tabs used it)
// import useActiveMenuItem from "@/hooks/useActiveMenuItem";
import useDynamicImports from "@/hooks/useDynamicImports";
import useGteNavbarStatus from "@/hooks/useGteNavbarStatus";
import useModal from "@/hooks/useModal";
// [PHASE1-HIDDEN] useUserLocationLanguage (only fed the hidden menu tabs)
// import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
// [PHASE1-HIDDEN] countriesBasedData (navbar item filtering)
// import { cn, countriesBasedData } from "@/lib/utils";
import { cn } from "@/lib/utils";
// [PHASE1-HIDDEN] icons/routes used only by the hidden menus, search and app download
// import {
//   ArrowDownIcon,
//   CellphoneIcon,
//   CloseIcon,
//   LogoIcon,
//   PersonIcon,
//   SearchIcon,
//   commercialRoutes,
//   corporateRoutes,
// } from "@/services";
import {
  CellphoneIcon,
  CloseIcon,
  PersonIcon,
  commercialRoutes,
} from "@/services";
// [PHASE1-HIDDEN] setCartData (country-coverage search navigation)
// import { setCartData } from "@/store/module/cart/cartSlice";
import { MenuIcon } from "lucide-react";
import { Suspense, memo, useState } from "react";
import { useTranslation } from "react-i18next";
// [PHASE1-HIDDEN] useDispatch (country-coverage search navigation)
// import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "react-redux";
// [PHASE1-HIDDEN] useNavigate (country-coverage search navigation)
// import { Link, useLocation, useNavigate } from "react-router-dom";
import EuWifiLogo from "@/components/shared/navigation/EuWifiLogo";
import { Link, useLocation } from "react-router-dom";
// [PHASE1-HIDDEN] CustomDropdown (destination search)
// import CustomDropdown from "../CustomDropdown";
import LanguageSelect from "../others/LanguageChange";
// [PHASE1-HIDDEN] desktop + mobile mega menus
// import DesktopMegaMenu from "./DesktopMegaMenu";
// import MobileMegaMenu from "./MobileMegaMenu";
import ProfileDropdown from "./ProfileDropdown";
import ProfileDropdownMobile from "./ProfileDropdownMobile";
// import commercialMenuItems from "&/countries/{currentCountry}/src/components/shared/navigation/CommercialMenuItems.js";

// Routes with LandingHeroV2 colored hero: header uses same color when not scrolled
const HERO_NAV_ROUTES = [
  { path: "/ratings", backgroundColor: "#F7D259", textWhite: false },
  {
    path: "/money-back-guarantee",
    backgroundColor: "#D81F22",
    textWhite: true,
  },
  {
    path: "/internet-packages/",
    backgroundColor: "#F7D259",
    textWhite: false,
    matchPrefix: true,
  },
  {
    path: "/pickup/",
    backgroundColor: "#000000",
    textWhite: true,
    matchPrefix: true,
  },
];

const getHeroNavStyle = (pathname) => {
  if (!pathname) return null;
  return (
    HERO_NAV_ROUTES.find((r) =>
      r.matchPrefix ? pathname.startsWith(r.path) : pathname === r.path,
    ) || null
  );
};

const NavBarSecondary = () => {
  const { pathname } = useLocation();
  const { isScrolled, isWhite, isRedBorder, isHome, isBlack, isBannerRoutes } =
    useGteNavbarStatus();
  const heroNavStyle = getHeroNavStyle(pathname);
  const useHeroNavColor = heroNavStyle && !isScrolled;
  const path =
    "&/countries/{currentCountry}/src/components/shared/navigation/NavBarLogo.jsx";
  // const menuItemsPath = "&/countries/{currentCountry}/src/components/shared/navigation/CommercialMenuItems.js";

  const NavBarLogo_Dynamic = useDynamicImports(path);
  // const commercialMenuItems = useDynamicImports(menuItemsPath, "data");
  const [isShowMenu, setIsShowMenu] = useState(false);
  // [PHASE1-HIDDEN] mega menu + destination search state
  // const [showMegaMenu, setShowMegaMenu] = useState(false);
  // const [showSearchbar, setShowSearchbar] = useState(false);
  const { setIsAuthDialogOpen, setAppDownloadDialogOpen } = useModal();
  // [PHASE1-HIDDEN] navigate / dispatch (country-coverage search navigation)
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);

  const { cart } = useSelector((state) => state.cart);

  // const { currentCountry, isTargetCountry, hideNavbarItems } =
  //   useUserLocationLanguage();

  // [PHASE1-HIDDEN] country-based navbar item filtering
  // const { currentCountry, isTargetCountry } = useUserLocationLanguage();
  // const targetCountry = isTargetCountry ? currentCountry : "sg";
  // const { hideNavbarItems } = countriesBasedData[targetCountry];

  // Phase 1 header tabs: only the pages that are still routed. Labels come
  // from navbar.commercialLatest.* so they follow the language selector.
  const navTabs = [
    { value: "home", path: commercialRoutes.home.path },
    { value: "privacyPolicy", path: commercialRoutes.privacyPolicy.path },
    { value: "termsService", path: commercialRoutes.termsService.path },
  ];

  // [PHASE1-HIDDEN] header menu tabs (Home, Pocket WIFI, Router, SIM/eSIM, Contact, About Us)
  // const commercialMenuItems = [
    // {
      // name: "Home",
      // value: "home",
      // path: commercialRoutes.home.path,
      // activePath: commercialRoutes.home.activePath,
    // },
    // {
      // name: "Pocket WIFI",
      // value: "pocketwifi",
      // path: commercialRoutes.pocketWifiHome.path,
      // activePath: commercialRoutes.pocketWifiHome.activePath,
      // // path: commercialRoutes.pocketWifiHome.path,
      // // activePath: commercialRoutes.pocketWifiHome.activePath,
    // },
    // {
      // name: "Router",
      // value: "router",
      // path: commercialRoutes.productRouters.path,
      // activePath: commercialRoutes.productRouters.activePath,
    // },
    // {
      // name: "SIM/eSIM",
      // value: targetCountry == "jp" ? "esim" : "simesim",
      // path: commercialRoutes.simHome.path,
      // activePath: commercialRoutes.simHome.activePath,
    // },
    // {
      // name: "Contact Us",
      // value: "contact",
      // path: commercialRoutes.contact.path,
      // activePath: commercialRoutes.contact.activePath,
    // },
    // {
      // name: "About Us",
      // value: "about",
      // path: commercialRoutes.aboutUs.path,
      // activePath: commercialRoutes.aboutUs.activePath,
    // },
  // ];
  //
  // const menuItems = useActiveMenuItem(
    // commercialMenuItems.filter((item) => !hideNavbarItems.includes(item.value)),
  // );

  const handleModalOpen = (name = "auth", value) => {
    if (name == "auth") {
      setIsAuthDialogOpen(value);
    } else if (name == "download") {
      setAppDownloadDialogOpen(value);
    } else {
      setIsAuthDialogOpen(value);
    }
    setIsShowMenu(false);
  };

  // [PHASE1-HIDDEN] country-coverage/filter navigation
  // const handleCountryChange = (country) => {
    // if (country) {
      // country.isCallPlans = true;
      // dispatch(
        // setCartData({ productCountry: country, countriesList: [country] }),
      // );
      // navigate("country-coverage/filter");
    // }
  // };

  // console.log("isRedBorder", isRedBorder);
  // console.log("isScrolled", isScrolled);
  // console.log("isBlack", isBlack);
  // console.log("isWhite", isWhite);

  const headerBg = useHeroNavColor
    ? heroNavStyle.backgroundColor
    : isScrolled
      ? "#000000"
      : undefined;
  const headerBorder =
    isScrolled || useHeroNavColor ? "border-transparent" : "border-neutral-200";
  const navTextWhite =
    isScrolled || (useHeroNavColor && heroNavStyle?.textWhite);

  return (
    <header
      className={cn(
        "sticky top-0 left-0 w-full z-40 duration-300 border-b",
        headerBorder,
      )}
      style={headerBg ? { backgroundColor: headerBg } : undefined}
    >
      <div className="w-full max-w-[1600px] mx-auto">
        <nav
          className={cn(
            "w-full duration-300 flex items-center lg:gap-10 2xl:gap-15 justify-between px-4 py-2 sm:py-4",
            navTextWhite ? "text-white" : "text-white xl:text-black-700",
          )}
        >
          <div className="flex w-full xl:w-auto items-center gap-2 sm:gap-6 justify-between">
            <Link to={commercialRoutes.home.path}>
              <div className="relative w-[140px] h-auto">
                <Suspense
                  fallback={
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-center">Loading...</span>
                    </div>
                  }
                >
                  {NavBarLogo_Dynamic ? (
                    <div className="absolute inset-0 flex justify-between items-center">
                      <NavBarLogo_Dynamic
                        isSecondaryNavBar={true}
                        forceWhite={navTextWhite}
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-center">Loading...</span>
                    </div>
                  )}
                </Suspense>
              </div>
              {/* <LazyLoadImage
                src={images.yoowifiWhiteJp}
                height="40"
                width="112.381"
              /> */}
            </Link>
            {/* [PHASE1-HIDDEN] mobile destination search dropdown
            <div className="w-full max-w-[200px] xs:max-w-full  items-center justify-end xs:gap-1 flex xl:hidden">
              <div
                className={cn(
                  "w-full relative duration-300 origin-left",
                  showSearchbar
                    ? "max-w-[200px] xs:max-w-full"
                    : "max-w-0 overflow-hidden ",
                )}
              >
                <CustomDropdown
                  // defaultValue={cart?.productCountry}
                  onChange={handleCountryChange}
                  defaultHeight="h-[40px]"
                />
            */}
                {/* <CountrySelect
                  name="country"
                  // defaultValue={countriesList[index]}
                  // filteredCodes={filteredCodes}
                  onChange={(val) => handleCountryChange(val)}
                  containerClassName={cn(
                    "country-search bg-transparent",
                    // "whiteSearch"
                    // (!isScrolled && isBlack) // WORKING
                    //   ? "blackSearch" : "whiteSearch",
                    // isBlack
                    //   ? "blackSearch" : "whiteSearch",
                    // isRedBorder && !showMegaMenu
                    //   ? "blackSearch"
                    //   : isScrolled || (!isHome && !showMegaMenu)
                    //     ? "blackSearch"
                    //     : "whiteSearch",
                    // isWhite ? "whiteText" : ""
                  )}
                  inputClassName={cn(
                    "!border-none !outline-none bg-transparent !py-1",
                    navTextWhite
                      ? "text-white placeholder:!text-white"
                      : " text-black placeholder:!text-[#888888]"
                  )}
                  placeHolder={t("extraText.selectCountry")}
                  autoComplete="off"
                  lang="fr"
                // disabled={
                //   cart?.productCountry?.iso2 === travel.locationCode &&
                //   index === 0
                // }
                />
                <SearchIcon
                  className="absolute inset-y-0 top-1/2 -translate-y-1/2 left-3"
                  color={navTextWhite ? "#fafafa" : "#191919"}

                // color={
                //   isRedBorder
                //     ? "#757575"
                //     : isScrolled || (!isHome && !isBannerRoutes)
                //       ? "#757575"
                //       : "#FAFAFA"
                // }
                /> */}
              {/* [PHASE1-HIDDEN] mobile destination search toggle
              </div>
              {showSearchbar ? (
                <button
                  type="button"
                  className="border-none outline-none"
                  onClick={() => setShowSearchbar(false)}
                >
                  <CloseIcon
                    className="w-6 h-6"
                    color={navTextWhite ? "#757575" : "#191919"}
                  />
                </button>
              ) : (
                <button
                  type="button"
                  className="border-none outline-none"
                  onClick={() => setShowSearchbar(true)}
                >
                  <SearchIcon className="w-6 h-6" color="#757575" />
                </button>
              )}
            </div>
              */}
            <button
              type="button"
              className="outline-none border-none xl:hidden"
              onClick={() => setIsShowMenu(true)}
            >
              <MenuIcon color={navTextWhite ? "#fff" : "#000"} />
            </button>
          </div>
          <div
            className={cn(
              "flex-1 xl:flex flex-col xl:flex-row xl:items-center xl:justify-between text-lg xl:text-sm font-semibold fixed xl:!static  top-0 left-0 w-full bg-black h-screen xl:bg-transparent xl:h-auto p-4 xl:p-0 overflow-auto xl:overflow-visible duration-500",
              isShowMenu
                ? "translate-x-0"
                : "translate-x-full xl:translate-x-[auto]",
            )}
          >
            <div className="max-w-[360px] pt-10 xl:pt-0 xl:max-w-none mx-auto flex-1 xl:flex flex-col xl:flex-row xl:items-center xl:justify-between">
              <div className="flex xl:hidden w-full xl:w-auto items-center justify-between pb-10">
                <Link to={commercialRoutes.home.path}>
                  <EuWifiLogo className="h-auto w-[120px]" />
                </Link>
                <button
                  type="butotn"
                  className="outline-none border-none xl:hidden absolute top-4 right-4"
                  onClick={() => setIsShowMenu(false)}
                >
                  <CloseIcon />
                </button>
              </div>
              <ul className="flex flex-col xl:flex-row xl:items-center gap-y-1 gap-x-2">
                {navTabs.map((item) => (
                  <li key={item.value}>
                    <Link
                      className={cn(
                        "menuItem hover:after:bg-main-600",
                        pathname.toLowerCase() === item.path.toLowerCase()
                          ? "after:scale-x-100 font-semibold after:bg-main-600 bg-main-600 xl:bg-transparent"
                          : "",
                      )}
                      onClick={() => setIsShowMenu(false)}
                      to={item.path}
                    >
                      {t(`navbar.commercialLatest.${item.value}`)}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* [PHASE1-HIDDEN] header menu tabs
              <ul className="flex flex-col xl:flex-row xl:items-center gap-y-1 gap-x-2">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      className={cn(
                        "menuItem hover:after:bg-main-600",
                        item.isActive
                          ? "after:scale-x-100 font-semibold after:bg-main-600 bg-main-600 xl:bg-transparent"
                          : "",
                      )}
                      onClick={() => setIsShowMenu(false)}
                      to={item.path}
                    >
                      {t(`navbar.commercialLatest.${item.value}`)}
                    </Link>
                  </li>
                ))}

              */}
                {/* mega menu  */}
                {/* [PHASE1-HIDDEN] desktop + mobile mega menus
                <li
                  className="hidden xl:block"
                  onMouseEnter={() => setShowMegaMenu(true)}
                  onMouseLeave={() => setShowMegaMenu(false)}
                >
                  <div
                    className="flex items-center justify-between xl:justify-start cursor-pointer w-full max-w-[320px] p-3 rounded-lg xl:rounded-none hover:bg-main-600 xl:w-auto xl:max-w-none xl:p-0 xl:hover:text-inherit xl:hover:bg-transparent hover:text-white"
                    onClick={() => setShowMegaMenu(!showMegaMenu)}
                  >
                    <span>{t("navbar.megamenu.menuText")}</span>
                    <ArrowDownIcon
                      className={cn(
                        showMegaMenu ? "-rotate-180" : "-rotate-0",
                        "transform transition_common duration-150",
                      )}
                      pathClass={
                        navTextWhite ? "fill-white" : "fill-neutral-black"
                      }
                    />
                  </div>
                  <DesktopMegaMenu
                    isShow={showMegaMenu}
                    onClose={() => setShowMegaMenu(false)}
                  />
                </li>
                <MobileMegaMenu setIsShowMenu={setIsShowMenu} />
              </ul>
                */}
              {/* [PHASE1-HIDDEN] corporate site link (corpRoutes are hidden)
              {!hideNavbarItems.includes("corporate") && (
                <Link
                  className={cn(
                    "menuItem p-3 xl:p-0",
                    navTextWhite ? "text-white" : "text-white xl:text-main-600",
                  )}
                  to={corporateRoutes.home.path}
                >
                  {t("extraText.corporate")}
                </Link>
              )}
              */}
              <div className="flex flex-col xl:flex-row xl:items-center gap-3 w-full xl:w-auto flex-1 xl:flex-none justify-end xl:justify-center mt-6 xl:mt-0">
                {/* [PHASE1-HIDDEN] desktop destination search dropdown
                <div className="w-full relative hidden xl:block max-w-[198px]">
                  <CustomDropdown
                    // defaultValue={cart?.productCountry}
                    onChange={handleCountryChange}
                    defaultHeight="h-[40px]"
                  />
                */}

                  {/* <CountrySelect
                    name="country"
                    // defaultValue={countriesList[index]}
                    // filteredCodes={filteredCodes}
                    onChange={(val) => handleCountryChange(val)}
                    containerClassName={cn(
                      "country-search bg-transparent",
                      isRedBorder && !showMegaMenu
                        ? "blackSearch"
                        : isScrolled || (!isHome && !showMegaMenu)
                          ? "blackSearch"
                          : "whiteSearch",
                      isWhite ? "whiteText" : ""
                    )}
                    inputClassName={cn(
                      "!border-none !outline-none bg-transparent !py-1",
                      isScrolled ? "!text-white placeholder:!text-white" : "!text-black placeholder:!text-[#888888]"
                    )}
                    placeHolder={t("extraText.selectCountry")}
                    autoComplete="off"
                    lang="fr"
                  // disabled={
                  //   cart?.productCountry?.iso2 === travel.locationCode &&
                  //   index === 0
                  // }
                  />
                  <SearchIcon
                    className="absolute inset-y-0 top-1/2 -translate-y-1/2 left-3"
                    // color={
                    //   isRedBorder
                    //     ? "#757575"
                    //     : isScrolled || (!isHome && !isBannerRoutes)
                    //       ? "#757575"
                    //       : "#fafafa"
                    // }
                    color={navTextWhite ? "#fafafa" : "#757575"}
                  />
                     color={navTextWhite ? "#fafafa" : "#757575"}
                  /> */}
                {/* [PHASE1-HIDDEN] desktop destination search dropdown (closing tag)
                </div>
                */}
                <Button
                  variant="secondary"
                  className={
                    "px-6 md:py-3 rounded-[10px] w-full max-w-[320px] xl:w-auto hidden"
                  }
                >
                  <span> {t(`buttonText.login`)}</span>
                </Button>
                {user?.userId ? (
                  <ProfileDropdownMobile />
                ) : (
                  <Button
                    variant="outline"
                    className={
                      "px-6 py-3 bg-transparent border-main-600 text-main-600 hover:bg-main-600 hover:text-white rounded-[10px] w-full max-w-[320px] xl:w-auto xl:hidden"
                    }
                    onClick={() => handleModalOpen("auth", true)}
                  >
                    <span> {t(`buttonText.login`)}</span>
                  </Button>
                )}
                <Button
                  className={cn(
                    "px-6 py-3 rounded-[10px] w-full max-w-[320px] xl:w-auto bg-eu-600 text-white hover:bg-eu-500",
                  )}
                  onClick={() => handleModalOpen("download", true)}
                >
                  <CellphoneIcon color="#fff" className="w-5 h-5 shrink-0" />
                  <span>{t("buttonText.downloadApp")}</span>
                </Button>
                <LanguageSelect />
                {user?.userId ? (
                  <ProfileDropdown />
                ) : (
                  <Button
                    className={
                      "min-w-10 min-h-10 p-0 rounded-[10px] hidden xl:flex"
                    }
                    variant="gold"
                    onClick={() => handleModalOpen("auth", true)}
                    aria-label="Modal"
                  >
                    <PersonIcon className="!h-6 !w-6 shrink-0" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default memo(NavBarSecondary);
