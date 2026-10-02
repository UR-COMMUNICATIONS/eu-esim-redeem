import useModal from "@/hooks/useModal";
import useSetLocalData from "@/hooks/useSetLocalData";
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
import AppDownloadDialog from "../shared/navigation/AppDownloadDialog";
import { useTranslation } from "react-i18next";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import { setProductActiveTab } from "@/store/module/shared/sharedSlice";
import { commercialRoutes } from "@/services";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import useScrollToTop from "@/hooks/useScrollToTop";
import { useDisApi } from "@/general";
import { setCartData } from "@/store/module/cart/cartSlice";
import CanonicalTag from "../SEO/CanonicalTag";
import useResetSource from "@/hooks/useResetSource";

function SimLayout() {
  useSetLocalData("sim");
  useResetSource();
  useScrollToTop();
  const { product } = useSelector((state) => state.sim);
  const { productTab } = useSelector((state) => state.shared);
  const { cart } = useSelector((state) => state.cart);
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
      translableName: t("simRegion.tabs.0"),
    },
    {
      name: "SIM/eSIM",
      route: commercialRoutes.simRegion.path,
      translableName: t("simRegion.tabs.1"),
    },
    {
      name: "Router",
      route: commercialRoutes.routerRegion.path,
      translableName: t("simRegion.tabs.2"),
    },
  ];

  const getPlanCountriesList = useDisApi({
    apiCall: "planCountriesList",
    setCallBack: (res) =>
      dispatch(setCartData({ planCountriesList: res?.countries || [] })),
  });

  useEffect(() => {
    if (cart?.package?.planCode) {
      getPlanCountriesList({ planCode: cart?.package?.planCode });
    }
  }, [cart?.package?.planCode]);

  useEffect(() => {
    dispatch(
      setProductActiveTab(tabs.find((tab) => tab.route === pathname)?.name),
    );
  }, [pathname]);

  // On leaving the SIM flow entirely, clear promo and plan-specific
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
              <div className="w-full  md:max-w-[480px] flex flex-col gap-6 sm:gap-8 sticky top-10">
                <ProductGallery items={product?.images} />
                <Accordion
                  type="single"
                  className="flex flex-col gap-4 w-full"
                  collapsible
                  style={{ whiteSpace: "pre-line" }}
                >
                  {product.tabs.map((tab, index) => (
                    <AccordionItem value={`item-${index + 1}`} key={index}>
                      <AccordionTrigger>
                        {t(`sim.product.tabs.${index}.title`)}
                      </AccordionTrigger>
                      <AccordionContent>
                        {t(`sim.product.tabs.${index}.content`)}
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

export default SimLayout;
