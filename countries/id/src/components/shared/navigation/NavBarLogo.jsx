import useGteNavbarStatus from "@/hooks/useGteNavbarStatus";
import { images, LogoIcon } from "@/services";

function NavBarLogo({ isSecondaryNavBar, forceWhite }) {
  const { isScrolled, isWhite, isRedBorder, isHome, isBlack, isBannerRoutes } =
    useGteNavbarStatus();
  const useWhite =
    forceWhite || !isSecondaryNavBar || isBlack || isBannerRoutes;
  return (
    <>
      <img
        src={useWhite ? images.yoowifiWhiteId : images.yoowifiRedId}
        // className="max-w-[100px] sm:max-w-[112px]"
        // className=" md:h-11 md:w-auto h-auto w-[100px]"
        className="h-12 md:h-9 w-auto aspect-auto object-contain"
      />
    </>
  );
}

export default NavBarLogo;
