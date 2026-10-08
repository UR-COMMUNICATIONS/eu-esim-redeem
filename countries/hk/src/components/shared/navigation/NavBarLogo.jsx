import EuWifiLogo from "@/components/shared/navigation/EuWifiLogo";

/**
 * Header brand mark. Previously the Yoowifi `LogoIcon`, tinted white or red
 * per surface via `forceWhite`/`isSecondaryNavBar`; the EU Wifi logo is a
 * fixed artwork that reads on both, so those props are no longer read. The
 * callers still pass them, which is harmless.
 */
function NavBarLogo() {
  return <EuWifiLogo className="h-auto w-[100px] md:h-11 md:w-auto" />;
}

export default NavBarLogo;
