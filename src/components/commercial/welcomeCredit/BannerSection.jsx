import useDynamicImages from "@/hooks/useDynamicImages";
import useModal from "@/hooks/useModal";
import { useSelector } from "react-redux";

// Countries that have dedicated banners. All others fall back to "sg".
const SUPPORTED_MARKETS = ["sg", "my", "id", "ph", "jp", "hk"];

function BannerSection() {
  const { cart } = useSelector((state) => state.cart);
  const country = cart?.userCountry?.country?.toLowerCase();
  const market = SUPPORTED_MARKETS.includes(country) ? country : "sg";
  const { setIsAuthDialogOpen } = useModal();

  // Web:    src/assets/images/welcome-credit/banner-{market}.webp
  // Mobile: src/assets/images/welcome-credit/banner-{market}-mobile.webp
  const webSrc = useDynamicImages("welcome-credit", `banner-${market}`);
  const mobileSrc = useDynamicImages(
    "welcome-credit",
    `banner-${market}-mobile`,
  );

  const handleBannerClick = () => {
    setIsAuthDialogOpen(true, "signUp");
  };

  return (
    <section className="relative w-full">
      {webSrc ? (
        <picture className="block w-full">
          {mobileSrc && (
            <source media="(max-width: 767px)" srcSet={mobileSrc} />
          )}
          <img
            src={webSrc}
            alt=""
            className="w-full h-auto object-cover object-center cursor-pointer"
            onClick={handleBannerClick}
          />
        </picture>
      ) : (
        <div className="w-full h-[360px] sm:h-[400px] md:h-[460px] lg:h-[520px] bg-neutral-100 flex items-center justify-center">
          <span className="font-['DMSans'] text-sm text-neutral-400 select-none">
            Banner image
          </span>
        </div>
      )}
    </section>
  );
}

export default BannerSection;
