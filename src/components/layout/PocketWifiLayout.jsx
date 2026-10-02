import useModal from "@/hooks/useModal";
import useSetLocalData from "@/hooks/useSetLocalData";
import useScrollToTop from "@/hooks/useScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import NavBarSecondary from "../shared/navigation/NavBarSecondary";
import ProductGallery from "../shared/others/ProductGallery";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useTranslation } from "react-i18next";
import useEmblaCarousel from "embla-carousel-react";
import { commercialRoutes } from "@/services";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { setProductActiveTab } from "@/store/module/shared/sharedSlice";
import { useDisApi } from "@/general";
import { planCoverage } from "@/general/common.funcitons";
import { setCartData } from "@/store/module/cart/cartSlice";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import CanonicalTag from "../SEO/CanonicalTag";
import useResetSource from "@/hooks/useResetSource";

function PocketWifiLayout() {
  useSetLocalData("pocketWifi");
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

  const tabs = [
    {
      name: "Pocket WIFI",
      route: commercialRoutes.pocketWifiRegion.path,
      translableName: t("pocketWifiRegion.tabs.0"),
    },
    {
      name: "SIM/eSIM",
      route: commercialRoutes.simRegion.path,
      translableName: t("pocketWifiRegion.tabs.1"),
    },
    {
      name: "Router",
      route: commercialRoutes.routerRegion.path,
      translableName: t("pocketWifiRegion.tabs.2"),
    },
  ];

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

  useEffect(() => {
    dispatch(
      setProductActiveTab(tabs.find((tab) => tab.route === pathname)?.name),
    );
  }, [pathname]);

  // On leaving the PocketWifi flow entirely (navbar/browser back to home or a
  // different product), clear the promo and plan-specific selections so the
  // next flow starts clean. Country and dates (travelDetails/productCountry)
  // are intentionally preserved to ease re-entry.
  useEffect(() => {
    return () => {
      dispatch(
        setCartData({
          promoCode: "",
          promoDetails: null,
          package: {},
          planVariations: [],
          variation: {},
          variationData: {},
          groupVariations: {},
          cartType: "",
          device: null,
        }),
      );
    };
  }, []);

  return (
    <main>
      <CanonicalTag />
      <NavBarSecondary />
      <div className="px-4 md:px-10 lg:px-16 relative">
        <div className="containerX">
          {/* TAB BAR */}
          {pathname.includes("region") && (
            <div className="w-full flex md:hidden flex-col gap-5 mt-6">
              <h2 className="text-base md:text-2xl !leading-[1.2] md:!leading-[1.4] font-semibold md:font-bold">
                {t("pocketWifiRegion.header.text")}
              </h2>
              <div ref={emblaRef} className="w-full max-w-full overflow-hidden">
                <div className="flex items-center gap-4">
                  {tabs.map(({ name, translableName }) => (
                    <Button
                      key={name}
                      className={cn(
                        "w-full hover:bg-secondary-500",
                        productTab.activeTab === name
                          ? "text-black-900 font-semibold"
                          : "",
                      )}
                      variant={
                        productTab.activeTab === name ? "secondary" : "outline"
                      }
                      onClick={() => dispatch(setProductActiveTab(name))}
                    >
                      {translableName ||
                        name.charAt(0).toUpperCase() + name.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* <div className="flex flex-col md:flex-row gap-6 sm:gap-10 md:gap-15 pt-6 sm:pt-8 md:pt-10 pb-40 lg:pb-28">
            <div className="w-full md:max-w-max">
              <div className="w-full md:max-w-[480px] flex flex-col gap-6 sm:gap-8 sticky top-10" style={{ whiteSpace: 'pre-line' }}>
                <ProductGallery
                  // items={product?.images} 
                  items={slicedImages?.length ? slicedImages : product?.images}
                />
                
                <Accordion
                  type="single"
                  className="flex flex-col gap-4 w-full"
                  defaultValue="item-1"
                  collapsible
                >
                  {product.tabs.slice(0, 2).map((tab, index) => (
                    <AccordionItem value={`item-${index + 1}`} key={index}>
                      <AccordionTrigger>
                        {t(`pocketWifi.product.${mapInfo}.${index}.title`)}
                      </AccordionTrigger>
                      <AccordionContent>
                        {mapInfo === 'tabs' ?
                          t(`pocketWifi.product.${mapInfo}.${index}.content`) :
                          details[t(`pocketWifi.product.${mapInfo}.${index}.content`)]
                        }
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
            <Outlet />
          </div> */}
          {/* <div className="flex flex-col md:flex-row gap-6 sm:gap-10 md:gap-15 pt-6 sm:pt-8 md:pt-10 pb-40 lg:pb-28">
            {pathname === "/pocket-wifi/order-summary" ? (
              <>
                <div className="block md:hidden w-full">
                  <Outlet />
                </div>

                <div className="block md:hidden w-full md:max-w-max">
                  <div className="w-full md:max-w-[480px] flex flex-col gap-6 sm:gap-8 sticky top-10 whitespace-pre-line">
                    <ProductGallery
                      items={slicedImages?.length ? slicedImages : product?.images}
                    />

                    <Accordion
                      type="single"
                      className="flex flex-col gap-4 w-full"
                      defaultValue="item-1"
                      collapsible
                    >
                      {product.tabs.slice(0, 2).map((tab, index) => (
                        <AccordionItem value={`item-${index + 1}`} key={index}>
                          <AccordionTrigger>
                            {t(`pocketWifi.product.${mapInfo}.${index}.title`)}
                          </AccordionTrigger>
                          <AccordionContent>
                            {mapInfo === "tabs"
                              ? t(`pocketWifi.product.${mapInfo}.${index}.content`)
                              : details[t(`pocketWifi.product.${mapInfo}.${index}.content`)]}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>

                <div className="hidden md:flex w-full md:max-w-max gap-6 sm:gap-10 md:gap-15">
                  <div className="w-full md:max-w-[480px] flex flex-col gap-6 sm:gap-8 sticky top-10 whitespace-pre-line">
                    <ProductGallery
                      items={slicedImages?.length ? slicedImages : product?.images}
                    />
                    <Accordion
                      type="single"
                      className="flex flex-col gap-4 w-full"
                      defaultValue="item-1"
                      collapsible
                    >
                      {product.tabs.slice(0, 2).map((tab, index) => (
                        <AccordionItem value={`item-${index + 1}`} key={index}>
                          <AccordionTrigger>
                            {t(`pocketWifi.product.${mapInfo}.${index}.title`)}
                          </AccordionTrigger>
                          <AccordionContent>
                            {mapInfo === "tabs"
                              ? t(`pocketWifi.product.${mapInfo}.${index}.content`)
                              : details[t(`pocketWifi.product.${mapInfo}.${index}.content`)]}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                  <Outlet />
                </div>
              </>
            ) : (
              <>
                <div className="w-full md:max-w-max">
                  <div className="w-full md:max-w-[480px] flex flex-col gap-6 sm:gap-8 sticky top-10 whitespace-pre-line">
                    <ProductGallery
                      items={slicedImages?.length ? slicedImages : product?.images}
                    />

                    <Accordion
                      type="single"
                      className="flex flex-col gap-4 w-full"
                      defaultValue="item-1"
                      collapsible
                    >
                      {product.tabs.slice(0, 2).map((tab, index) => (
                        <AccordionItem value={`item-${index + 1}`} key={index}>
                          <AccordionTrigger>
                            {t(`pocketWifi.product.${mapInfo}.${index}.title`)}
                          </AccordionTrigger>
                          <AccordionContent>
                            {mapInfo === "tabs"
                              ? t(`pocketWifi.product.${mapInfo}.${index}.content`)
                              : details[t(`pocketWifi.product.${mapInfo}.${index}.content`)]}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
                <Outlet />
              </>
            )}
          </div> */}
          <div className="flex flex-col md:flex-row gap-6 sm:gap-10 md:gap-15 pt-6 sm:pt-8 md:pt-10 pb-40 lg:pb-28">
            {/* Outlet (main content) */}
            <div className="order-1 md:order-2 w-full">
              <Outlet />
            </div>

            {/* Gallery + Accordion */}
            <div className="order-2 md:order-1 w-full md:max-w-[480px] flex flex-col gap-6 sm:gap-8 sticky top-10 whitespace-pre-line">
              <ProductGallery
                items={slicedImages?.length ? slicedImages : product?.images}
              />

              <Accordion
                type="single"
                className="flex flex-col gap-4 w-full"
                defaultValue="item-1"
                collapsible
              >
                {product.tabs.slice(0, 2).map((tab, index) => (
                  <AccordionItem value={`item-${index + 1}`} key={index}>
                    <AccordionTrigger>
                      {t(`pocketWifi.product.${mapInfo}.${index}.title`)}
                    </AccordionTrigger>
                    <AccordionContent>
                      {mapInfo === "tabs"
                        ? t(`pocketWifi.product.${mapInfo}.${index}.content`)
                        : details[
                            t(`pocketWifi.product.${mapInfo}.${index}.content`)
                          ]}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      {authModal}
      {loginModal}
      {appDownloadModal}
    </main>
  );
}

export default PocketWifiLayout;
