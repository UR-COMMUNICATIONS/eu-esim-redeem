import useGteNavbarStatus from "@/hooks/useGteNavbarStatus";
import { LogoIcon } from "@/services";

function NavBarLogo({ isSecondaryNavBar, forceWhite }) {
  const { isBlack, isBannerRoutes } = useGteNavbarStatus();

  const useWhite =
    forceWhite || !isSecondaryNavBar || isBlack || isBannerRoutes;

  return (
    <LogoIcon
      className=" md:h-11 md:w-auto h-auto w-[100px]"
      color={useWhite ? "#fff" : "#E41F26"}
    />
  );
}

export default NavBarLogo;
