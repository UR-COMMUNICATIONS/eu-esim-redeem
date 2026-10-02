import { Button } from "@/components/ui/button";
import useActiveMenuItem from "@/hooks/useActiveMenuItem";
import useDynamicImports from "@/hooks/useDynamicImports";
import useGteNavbarStatus from "@/hooks/useGteNavbarStatus";
import useModal from "@/hooks/useModal";
import { cn } from "@/lib/utils";
import {
  CellphoneIcon,
  CloseIcon,
  commercialRoutes,
  corporateRoutes,
  LogoIcon,
  PersonIcon,
  SearchIcon,
} from "@/services";
import { setCartData } from "@/store/module/cart/cartSlice";
import "@/styles/country.css";
import { MenuIcon } from "lucide-react";
import { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LanguageSelect from "../others/LanguageChange";
import CustomDropdown from "../CustomDropdown";

export const corporateMenuItems = [
  {
    name: "Iot",
    path: corporateRoutes.iot.path,
    activePath: corporateRoutes.iot.activePath,
  },
  {
    name: "Hotel",
    path: corporateRoutes.hotel.path,
    activePath: corporateRoutes.hotel.activePath,
  },
  {
    name: "Travel Agency",
    path: corporateRoutes.travelAgency.path,
    activePath: corporateRoutes.travelAgency.activePath,
  },
  {
    name: "Maritime Internet",
    path: corporateRoutes.maritimeInternet.path,
    activePath: corporateRoutes.maritimeInternet.activePath,
  },
  {
    name: "Events",
    path: corporateRoutes.events.path,
    activePath: corporateRoutes.events.activePath,
  },
  {
    name: "About Us",
    path: corporateRoutes.aboutUs.path,
    activePath: corporateRoutes.aboutUs.activePath,
  },
  {
    name: "Commercial",
    path: corporateRoutes.commercial.path,
    activePath: corporateRoutes.commercial.activePath,
  },
];

function CorporateNavbar() {
  const { isScrolled, isRedBorder, isHome, isWhite, isBlack } =
    useGteNavbarStatus();
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showSearchbar, setShowSearchbar] = useState(false);
  const menuItems = useActiveMenuItem(corporateMenuItems);
  const { setIsAuthDialogOpen, setAppDownloadDialogOpen } = useModal();
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const path =
    "&/countries/{currentCountry}/src/components/shared/navigation/NavBarLogo.jsx";
  const NavBarLogo_Dynamic = useDynamicImports(path);

  const handleCountryChange = (country) => {
    if (country) {
      country.isCallPlans = true;
      dispatch(
        setCartData({ productCountry: country, countriesList: [country] }),
      );
      navigate("country-coverage/filter");
    }
  };

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
  // console.log("isRedBorder", isRedBorder);
  // console.log("isScrolled", isScrolled);
  // console.log("isHome", isHome);
  // console.log("isWhite", isWhite);

  return (
    <header
      className={cn(
        "sticky top-0 left-0 w-full z-40 duration-300 border-b border-neutral-200",
        isScrolled ? "bg-black border-black-900" : "",
      )}
    >
      <div className="w-full max-w-[1600px] mx-auto relative">
        <nav
          className={cn(
            "w-full duration-300 flex items-center lg:gap-10 justify-between px-4 py-2 sm:py-4",
            isScrolled ? "text-white" : "text-white xl:text-black-700",
          )}
        >
          <div className="flex w-full xl:w-auto items-center gap-2 sm:gap-6  justify-betweenpx-3">
            <Link to={commercialRoutes.home.path}>
              <Suspense fallback={<div>Loading...</div>}>
                {NavBarLogo_Dynamic ? (
                  <NavBarLogo_Dynamic isSecondaryNavBar={!isHome} />
                ) : null}
              </Suspense>
            </Link>
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
                  onChange={handleCountryChange}
                  defaultHeight="h-[40px]"
                />
                {/* <CountrySelect
                  name="country"
                  // defaultValue={countriesList[index]}
                  // filteredCodes={filteredCodes}
                  onChange={(val) => handleCountryChange(val)}
                  containerClassName={cn(
                    "country-search bg-transparent",
                    // "whiteSearch"
                    // isBlack
                    //   ? "blackSearch" : "whiteSearch",
                    // isRedBorder
                    //   ? "blackSearch"
                    //   : isScrolled || (!isHome)
                    //     ? "blackSearch"
                    //     : "whiteSearch",
                    // isWhite ? "whiteText" : ""
                  )}
                  inputClassName={cn(
                    "!border-none !outline-none bg-transparent !py-1",
                    isScrolled
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
                  color={isScrolled ? "#fafafa" : "#191919"}
                /> */}
              </div>
              {showSearchbar ? (
                <button
                  type="button"
                  className="border-none outline-none"
                  onClick={() => setShowSearchbar(false)}
                >
                  <CloseIcon
                    className="w-6 h-6"
                    color={isScrolled ? "#757575" : "#191919"}
                  />
                </button>
              ) : (
                <button
                  type="button"
                  className="border-none outline-none"
                  onClick={() => setShowSearchbar(true)}
                >
                  <SearchIcon
                    className="w-6 h-6"
                    color={
                      isRedBorder
                        ? "#757575"
                        : isScrolled || !isHome
                          ? "#757575"
                          : "#FAFAFA"
                    }
                  />
                </button>
              )}
            </div>
            <button
              type="butotn"
              className="outline-none border-none xl:hidden"
              onClick={() => setIsShowMenu(true)}
            >
              <MenuIcon color={isScrolled ? "#fff" : "#000"} />
            </button>
          </div>
          <div
            className={cn(
              "flex-1 xl:flex flex-col xl:flex-row xl:items-center xl:justify-between text-lg xl:text-sm font-semibold fixed xl:relative top-0 left-0 w-full bg-black h-screen xl:bg-transparent xl:h-auto p-4 xl:p-0 overflow-auto xl:overflow-visible duration-100",
              isShowMenu
                ? "translate-x-0"
                : "translate-x-full xl:translate-x-0",
            )}
          >
            <div className="max-w-[360px] pt-10 xl:pt-0 xl:max-w-none mx-auto flex-1 xl:flex flex-col xl:flex-row xl:items-center xl:justify-between">
              <div className="flex xl:hidden w-full xl:w-auto items-center justify-between pb-10">
                <Link to={commercialRoutes.home.path}>
                  <LogoIcon color="#E41F26" />
                </Link>
                <button
                  type="butotn"
                  className="outline-none border-none xl:hidden absolute top-4 right-4"
                  onClick={() => setIsShowMenu(false)}
                >
                  <CloseIcon />
                </button>
              </div>
              <ul className="flex flex-col xl:flex-row xl:items-center 2xl:gap-1">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      className={cn(
                        "menuItem font-normal hover:after:bg-main-600",
                        item.isActive
                          ? "after:scale-x-100 font-semibold after:bg-main-600 bg-main-600 xl:bg-transparent"
                          : "",
                      )}
                      to={item.path}
                      onClick={() => setIsShowMenu(false)}
                    >
                      {t(`navbar.corporate.${index}.name`)}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                className={cn(
                  "menuItem p-3 xl:p-0 text-white xl:text-main-600",
                )}
                to={commercialRoutes.home.path}
              >
                {t("navbar.forYoo")}
              </Link>
              <div className="flex flex-col xl:flex-row xl:items-center gap-3 w-full xl:w-auto flex-1 xl:flex-none justify-end xl:justify-center mt-6 xl:mt-0">
                <div className="w-full relative hidden xl:block max-w-[198px]">
                  <CustomDropdown
                    onChange={handleCountryChange}
                    defaultHeight="h-[40px]"
                  />

                  {/* <CountrySelect
                    name="country"
                    // defaultValue={countriesList[index]}
                    // filteredCodes={filteredCodes}
                    onChange={(val) => handleCountryChange(val)}
                    // containerClassName={cn(
                    //   "country-search bg-transparent",
                    //   "whiteSearch",
                    //   isBlack
                    //     ? "blackSearch" : "whiteSearch",
                    //   isRedBorder
                    //     ? "blackSearch"
                    //     : isScrolled || (!isHome)
                    //       ? "blackSearch"
                    //       : "whiteSearch",
                    //   isWhite ? "whiteText" : ""
                    // )}
                    //  inputClassName={cn(
                    //   "!border-none !outline-none bg-transparent !py-1",
                    //   isScrolled
                    //     ? "text-white placeholder:!text-white"
                    //     : " text-black placeholder:!text-[#888888]"
                    // )}
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
                    color={isScrolled ? "#FAFAFA" : "#757575"}
                  /> */}
                </div>
                <Button
                  variant="secondary"
                  className={
                    "px-6 md:py-3 rounded-[10px] w-full max-w-[320px] xl:w-auto hidden"
                  }
                >
                  <span>Login</span>
                </Button>
                <Button
                  variant="outline"
                  className={
                    "px-6 md:py-3 bg-transparent border-main-600 text-main-600 hover:bg-main-600 hover:text-white rounded-[10px] w-full max-w-[320px] xl:w-auto xl:hidden"
                  }
                  onClick={() => handleModalOpen("auth", true)}
                >
                  <span>Login</span>
                </Button>
                <Button
                  className={cn(
                    "px-6 md:py-3 rounded-[10px] w-full max-w-[320px] xl:w-auto bg-main-600 text-white",
                  )}
                  onClick={() => handleModalOpen("download", true)}
                >
                  <CellphoneIcon color="#fff" className="w-5 h-5 shrink-0" />
                  <span>{t("buttonText.downloadApp")}</span>
                </Button>
                <LanguageSelect />
                <Button
                  className={
                    "min-w-10 min-h-10 p-0 rounded-[10px] hidden xl:flex"
                  }
                  variant="secondary"
                  onClick={() => handleModalOpen("auth", true)}
                >
                  <PersonIcon className="!h-6 !w-6 shrink-0" />
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default CorporateNavbar;
