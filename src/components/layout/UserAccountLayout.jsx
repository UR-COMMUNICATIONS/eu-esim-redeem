import { useDisApi } from "@/general";
import { planCoverage } from "@/general/common.funcitons";
import useModal from "@/hooks/useModal";
import useScrollToTop from "@/hooks/useScrollToTop";
import useSetLocalData from "@/hooks/useSetLocalData";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
// [PHASE1-HIDDEN] commercialRoutes (only the product tabs used it)
// import { commercialRoutes } from "@/services";
import { setCartData } from "@/store/module/cart/cartSlice";
// [PHASE1-HIDDEN] setProductActiveTab (only the product tabs dispatched it)
// import { setProductActiveTab } from "@/store/module/shared/sharedSlice";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import CanonicalTag from "../SEO/CanonicalTag";
import NavBarSecondary from "../shared/navigation/NavBarSecondary";

import MyAccount from "@/components/shared/others/MyAccount";
import useResetSource from "@/hooks/useResetSource";

function UserAccountLayout() {
  useSetLocalData("userAccount");
  useResetSource();
  useScrollToTop();
  const { cart } = useSelector((state) => state.cart);
  const { product } = useSelector((state) => state.pocketWifi);
  const { productTab } = useSelector((state) => state.shared);

  const [details, setDetails] = useState({
    description: cart?.package?.description || "",
    planTerms: cart?.package?.planTerms || "",
    coverage: planCoverage(cart?.planCountriesList || []),
  });

  const { authModal, loginModal, appDownloadModal } = useModal();
  const options = { align: "start" };
  const [emblaRef] = useEmblaCarousel(options);
  const pathname = useLocation().pathname;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isTargetCountry, currentCountry } = useUserLocationLanguage();
  let slicedImages = isTargetCountry
    ? currentCountry === "jp"
      ? [...product.jpImages]
      : [...product.images]?.slice(1, 5)
    : [...product.images];

  const dummyDevices = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  // [PHASE1-HIDDEN] pocket wifi / SIM-eSIM / router product tabs
  // const tabs = [
    // {
      // name: "Pocket WIFI",
      // route: commercialRoutes.pocketWifiRegion.path,
      // translableName: t("pocketWifiRegion.tabs.0"),
    // },
    // {
      // name: "SIM/eSIM",
      // route: commercialRoutes.simRegion.path,
      // translableName: t("pocketWifiRegion.tabs.1"),
    // },
    // {
      // name: "Router",
      // route: commercialRoutes.routerRegion.path,
      // translableName: t("pocketWifiRegion.tabs.2"),
    // },
  // ];

  const getPlanCountriesList = useDisApi({
    apiCall: "planCountriesList",
    setCallBack: (res) =>
      dispatch(setCartData({ planCountriesList: res?.countries || [] })),
  });

  useEffect(() => {
    let planAttbs = {
      description: cart?.package?.description || "",
      planTerms: cart?.package?.planTerms || "",
    };

    if (cart.userLanguage !== "en") {
      planAttbs["description"] =
        cart?.package?.trDescription || cart?.package?.description;
      planAttbs["planTerms"] =
        cart?.package?.trPlanTerms || cart?.package?.planTerms;
    }

    setDetails({
      ...details,
      description: planAttbs["description"],
      planTerms: planAttbs["planTerms"],
      coverage: planCoverage(cart?.planCountriesList || []),
    });

    // setDetails({
    //   ...details,
    //   'description': cart?.package?.description || '',
    //   'planTerms': cart?.package?.planTerms || '',
    //   'coverage': planCoverage(cart?.planCountriesList || [])
    // })
  }, [cart.planCountriesList]);

  useEffect(() => {
    if (cart?.package?.planCode) {
      getPlanCountriesList({ planCode: cart?.package?.planCode });
    }
  }, [cart?.package?.planCode]);

  const mapInfo =
    pathname === "/pocket-wifi/cart-service" ? "planInformation" : "tabs";

  // [PHASE1-HIDDEN] product tab -> active tab sync
  // useEffect(() => {
    // dispatch(
      // setProductActiveTab(tabs.find((tab) => tab.route === pathname)?.name),
    // );
  // }, [pathname]);

  return (
    <main>
      <CanonicalTag />
      <NavBarSecondary />

      <div>
        <div className=" lg:py-10 flex gap-8 sec_common_user_80">
          <MyAccount />
          <Outlet />
        </div>

        {/* <div className="flex flex-col md:flex-row gap-6 sm:gap-10 md:gap-15 pt-6 sm:pt-8 md:pt-10 pb-40 lg:pb-28">
                    <div className="order-1 md:order-2 w-full">
                        <Outlet />
                    </div>
                </div> */}
      </div>

      {authModal}
      {loginModal}
      {appDownloadModal}
    </main>
  );
}

export default UserAccountLayout;
