import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { cn } from "@/lib/utils";
import {
  CheckSlideIcon,
  commercialRoutes,
  GroupAffiliateIcon,
  InfoIcon,
  MapCoverageIcon,
  MapPickupIcon,
  TravelIcon,
} from "@/services";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const DesktopMegaMenu = ({ isShow = false, onClose }) => {
  const { t } = useTranslation(["translation", "english", "local"])

  const { currentCountry, isTargetCountry, nameSpace } = useUserLocationLanguage();
  const targetCountry = isTargetCountry ? currentCountry : "sg"

  const handleClose = () => {
    if (onClose) onClose(); 
  };


  return (
    <div
      className={cn(
        " hidden xl:block overflow-hidden duration-300 absolute w-[100vw] left-0",
        isShow ? "max-h-[320px]" : "max-h-0"
      )}
    >
      <div className="pt-6">
        <div className="bg-neutral-black text-white px-4 py-8">
          <div className="w-full max-w-[1392px] mx-auto relative ">
            <div className="w-full grid grid-cols-6 gap-3 2xl:gap-6">
              {/* Travel Data */}
              <div className="flex items-start gap-3 flex-1 w-full">
                <div className="w-8 aspect-square flex items-center justify-center bg-main-600 rounded ">
                  <TravelIcon className="shrink-0 w-5 h-5" />
                </div>
                <div>
                  <span className="text-lg font-semibold leading-[140%]">
                    {t("navbar.megamenu.menuItems.0.title")}
                  </span>
                  <div className="text-sm flex flex-col gap-3 mt-3">
                    <NavLink
                      onClick={handleClose}
                      className={({ isActive }) =>
                        ` hover:text-main-500 duration-300 ${isActive ? "text-main-600" : "text-white"
                        }`
                      }
                      to={commercialRoutes.pocketWifiDetails.path}
                    >
                      {t("navbar.megamenu.menuItems.0.items.0")}
                    </NavLink>
                    {/* <NavLink
                       onClick={handleClose} 
                      to={commercialRoutes.simHome.path}
                      className={({ isActive }) =>
                        ` hover:text-main-500 duration-300 ${
                          isActive ? "text-main-600" : "text-white"
                        }`
                      }
                    >
                      {t("navbar.megamenu.menuItems.0.items.1")}
                    </NavLink> */}
                    {/* {!isTargetCountry && */}
                      <NavLink
                        onClick={handleClose}
                        to={commercialRoutes.simEsimDetails.path}
                        className={({ isActive }) =>
                          ` hover:text-main-500 duration-300 ${isActive ? "text-main-600" : "text-white"
                          }`
                        }
                      >
                        {t(`${nameSpace}:navbar.megamenu.menuItems.0.items.1`)}
                      </NavLink>
                    {/* } */}
                  </div>
                </div>
              </div>
              {/* Country Coverage */}
              <div className="flex items-start gap-3 flex-1 w-full">
                <div className="w-8 aspect-square flex items-center justify-center bg-main-600 rounded ">
                  <MapCoverageIcon className="shrink-0 w-5 h-5" />
                </div>
                <div>
                  <span className="text-lg font-semibold leading-[140%]">
                    {t("navbar.megamenu.menuItems.1.title")}
                  </span>
                  <div className="text-sm flex flex-col gap-3 mt-3">
                    <NavLink
                      onClick={handleClose}
                      to={`${commercialRoutes.countryCoverage.path}?region=asia`}
                      className={({ isActive }) =>
                        ` hover:text-main-500 duration-300 ${isActive ? "text-main-600" : "text-white"
                        }`
                      }
                    >
                      {t("navbar.megamenu.menuItems.1.items.0")}
                    </NavLink>
                    <NavLink
                      onClick={handleClose}
                      to={`${commercialRoutes.countryCoverage.path}?region=europe`}
                      className={({ isActive }) =>
                        ` hover:text-main-500 duration-300 ${isActive ? "text-main-600" : "text-white"
                        }`
                      }
                    >
                      {t("navbar.megamenu.menuItems.1.items.1")}
                    </NavLink>
                    <NavLink
                      onClick={handleClose}
                      to={`${commercialRoutes.countryCoverage.path}?region=americas`}
                      className={({ isActive }) =>
                        ` hover:text-main-500 duration-300 ${isActive ? "text-main-600" : "text-white"
                        }`
                      }
                    >
                      {t("navbar.megamenu.menuItems.1.items.2")}
                    </NavLink>
                    <NavLink
                      onClick={handleClose}
                      to={`${commercialRoutes.countryCoverage.path}?region=oceania`}
                      className={({ isActive }) =>
                        ` hover:text-main-500 duration-300 ${isActive ? "text-main-600" : "text-white"
                        }`
                      }
                    >
                      {t("navbar.megamenu.menuItems.1.items.3")}
                    </NavLink>
                    <NavLink
                      onClick={handleClose}
                      to={`${commercialRoutes.countryCoverage.path}?region=africa`}
                      className={({ isActive }) =>
                        ` hover:text-main-500 duration-300 ${isActive ? "text-main-600" : "text-white"
                        }`
                      }
                    >
                      {t("navbar.megamenu.menuItems.1.items.4")}
                    </NavLink>
                  </div>
                </div>
              </div>

              {/* Pickup/Drop off Location */}
              <div className="flex items-start gap-3 flex-1 w-full">
                <div className="w-8 aspect-square flex items-center justify-center bg-main-600 rounded shrink-0">
                  <MapPickupIcon className="shrink-0 w-5 h-5" />
                </div>
                <div>
                  <span className="text-lg font-semibold leading-[140%]">
                    {!isTargetCountry ? t("navbar.megamenu.menuItems.2.title") : t(`${nameSpace}:navbar.megamenu.menuItems.2.titleJP`)}
                  </span>
                  <div className="text-sm flex flex-col gap-3 mt-3">
                    {!isTargetCountry && 
                    <NavLink
                      onClick={handleClose}
                      to={commercialRoutes.pickDropLocation.path}
                      className={({ isActive }) =>
                        ` hover:text-main-500 duration-300 ${isActive ? "text-main-600" : "text-white"
                        }`
                      }
                    >
                      {t("navbar.megamenu.menuItems.2.items.0")}
                    </NavLink>}
                    <NavLink
                      onClick={handleClose}
                      to={commercialRoutes.pickDropLocation.path}
                      className={({ isActive }) =>
                        ` hover:text-main-500 duration-300 ${isActive ? "text-main-600" : "text-white"
                        }`
                      }
                    >
                      {t(`${nameSpace}:navbar.megamenu.menuItems.2.items.1`)}
                    </NavLink>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div className="flex items-start gap-3 flex-1 w-full">
                <div className="w-8 aspect-square flex items-center justify-center bg-main-600 rounded shrink-0">
                  <CheckSlideIcon className="shrink-0 w-5 h-5" />
                </div>
                <div>
                  <span className="text-lg font-semibold leading-[140%]">
                    {t("navbar.megamenu.menuItems.3.title")}
                  </span>
                  <div className="text-sm flex flex-col gap-3 mt-3">
                    <NavLink
                      onClick={handleClose}
                      to={`${commercialRoutes.howItWorks.path}/#rent`}
                      className={({ isActive }) =>
                        ` hover:text-main-500 duration-300 ${isActive ? "text-main-600" : "text-white"
                        }`
                      }
                    >
                      {t("navbar.megamenu.menuItems.3.items.0")}
                    </NavLink>
                    <NavLink
                      onClick={handleClose}
                      to={`${commercialRoutes.howItWorks.path}/#self-return`}
                      className={({ isActive }) =>
                        ` hover:text-main-500 duration-300 ${isActive ? "text-main-600" : "text-white"
                        }`
                      }
                    >
                      {t(`${nameSpace}:navbar.megamenu.menuItems.3.items.1`)}
                    </NavLink>
                    <NavLink
                      onClick={handleClose}
                      to={`${commercialRoutes.howItWorks.path}/#topup`}
                      className={({ isActive }) =>
                        ` hover:text-main-500 duration-300 ${isActive ? "text-main-600" : "text-white"
                        }`
                      }
                    >
                      {t("navbar.megamenu.menuItems.3.items.2")}
                    </NavLink>
                  </div>
                </div>
              </div>

              {/* Affiliate */}
              <div className="flex items-start gap-3 flex-1 w-full">
                <div className="w-8 aspect-square flex items-center justify-center bg-main-600 rounded shrink-0">
                  <GroupAffiliateIcon className="shrink-0 w-5 h-5" />
                </div>
                <div>
                  <span className="text-lg font-semibold leading-[140%]">
                    {t("navbar.megamenu.menuItems.4.title")}
                  </span>
                  <div className="text-sm flex flex-col gap-3 mt-3">
                    <NavLink
                      onClick={handleClose}
                      to={`${commercialRoutes.affiliate.path}/#join-affiliate`}
                      className={({ isActive }) =>
                        ` hover:text-main-500 duration-300 ${isActive ? "text-main-600" : "text-white"
                        }`
                      }
                    >
                      {t("navbar.megamenu.menuItems.4.items.0")}
                    </NavLink>
                    <NavLink
                      onClick={handleClose}
                      to={`${commercialRoutes.affiliate.path}/#lets-talk`}
                      className={({ isActive }) =>
                        ` hover:text-main-500 duration-300 ${isActive ? "text-main-600" : "text-white"
                        }`
                      }
                    >
                      {t("navbar.megamenu.menuItems.4.items.1")}
                    </NavLink>
                  </div>
                </div>
              </div>
              {/* How To */}
              <div className="flex items-start gap-3 flex-1 w-full">
                <div className="w-8 aspect-square flex items-center justify-center bg-main-600 rounded shrink-0">
                  <InfoIcon className="shrink-0 w-5 h-5" />
                </div>
                <div>
                  <span className="text-lg font-semibold leading-[140%]">
                    {t(`${nameSpace}:navbar.megamenu.menuItems.5.title`)}
                  </span>
                  <div className="text-sm flex flex-col gap-3 mt-3">
                    {/* {!isTargetCountry && */}
                      <NavLink
                        onClick={handleClose}
                        to={commercialRoutes.howToSetupSim.path}
                        className={({ isActive }) =>
                          ` hover:text-main-500 duration-300 ${isActive ? "text-main-600" : "text-white"
                          }`
                        }
                      >
                        {t("navbar.megamenu.menuItems.5.items.0")}
                      </NavLink>
                    {/* } */}
                    <NavLink
                      onClick={handleClose}
                      to={commercialRoutes.howToConnectPocketWifi.path}
                      className={({ isActive }) =>
                        ` hover:text-main-500 duration-300 ${isActive ? "text-main-600" : "text-white"
                        }`
                      }
                    >
                      {t("navbar.megamenu.menuItems.5.items.1")}
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopMegaMenu;
