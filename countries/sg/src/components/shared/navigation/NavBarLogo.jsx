import useGteNavbarStatus from "@/hooks/useGteNavbarStatus";
import { images, LogoIcon } from "@/services";

function NavBarLogo({ isSecondaryNavBar, forceWhite }) {
  const { isScrolled, isWhite, isRedBorder, isHome, isBlack, isBannerRoutes } =
    useGteNavbarStatus();

  const useWhite =
    forceWhite || !isSecondaryNavBar || isBlack || isBannerRoutes;

  return (
    <>
      <LogoIcon
        // className="max-w-[100px] sm:max-w-[112px]"
        className=" md:h-11 md:w-auto h-auto w-[100px]"
        color={useWhite ? "#fff" : "#E41F26"}
      />
    </>
  );
}

export default NavBarLogo;
