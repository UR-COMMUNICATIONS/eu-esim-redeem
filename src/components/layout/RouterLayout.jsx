import useSetLocalData from "@/hooks/useSetLocalData";
import useScrollToTop from "@/hooks/useScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../shared/navigation/NavBar";
import ProductGallery from "../shared/others/ProductGallery";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import NavBarSecondary from "../shared/navigation/NavBarSecondary";
import useModal from "@/hooks/useModal";
import AppDownloadDialog from "../shared/navigation/AppDownloadDialog";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { setProductActiveTab } from "@/store/module/shared/sharedSlice";
import { setCartData } from "@/store/module/cart/cartSlice";
import useEmblaCarousel from "embla-carousel-react";
import { commercialRoutes } from "@/services";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import CanonicalTag from "../SEO/CanonicalTag";
import useResetSource from "@/hooks/useResetSource";

function RouterLayout() {
  useSetLocalData("router");
  useResetSource();
  useScrollToTop();
  const { product } = useSelector((state) => state.router);
  const { productTab } = useSelector((state) => state.shared);
  const { authModal, loginModal, appDownloadModal } = useModal();
  const options = { align: "start" };
  const [emblaRef] = useEmblaCarousel(options);
  const pathname = useLocation().pathname;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const tabs = [
    {
      name: "Pocket WIFI",
      route: commercialRoutes.pocketWifiRegion.path,
      translableName: t("routerRegion.tabs.0"),
    },
    {
      name: "SIM/eSIM",
      route: commercialRoutes.simRegion.path,
      translableName: t("routerRegion.tabs.1"),
    },
    {
      name: "Router",
      route: commercialRoutes.routerRegion.path,
      translableName: t("routerRegion.tabs.2"),
    },
  ];

  useEffect(() => {
    dispatch(
      setProductActiveTab(tabs.find((tab) => tab.route === pathname)?.name),
    );
  }, [pathname]);

  // On leaving the Router flow entirely, clear promo and plan-specific
  // selections. Country and dates are preserved to ease re-entry.
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

          <div className="flex flex-col-reverse md:flex-row gap-6 sm:gap-10 md:gap-15 pt-6 sm:pt-8 md:pt-10 pb-40 lg:pb-28">
            <div className="w-full md:max-w-max">
              <div
                className="w-full md:max-w-[480px] flex flex-col gap-6 sm:gap-8 sticky top-10"
                style={{ whiteSpace: "pre-line" }}
              >
                <ProductGallery items={product?.images} />
                <Accordion
                  type="single"
                  className="flex flex-col gap-4 w-full"
                  collapsible
                >
                  {product.tabs.map((tab, index) => (
                    <AccordionItem value={`item-${index + 1}`} key={index}>
                      <AccordionTrigger>
                        {t(`router.product.tabs.${index}.title`)}
                      </AccordionTrigger>
                      <AccordionContent>
                        {t(`router.product.tabs.${index}.content`)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
      {authModal}
      {loginModal}
      {appDownloadModal}
    </main>
  );
}

export default RouterLayout;
