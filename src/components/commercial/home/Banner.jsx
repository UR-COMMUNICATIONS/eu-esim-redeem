import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeroChildSlides from "./HeroChildSlides";
import ProductRouteCard from "./ProductRouteCard";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { useState, useEffect } from "react";
import BannerSkeleton from "@/skeletons/home/BannerSkeleton";
import { commercialRoutes } from "@/services";

function Banner({ desktopImage, mobileImage, altAttr, titleAttr, bnrPath }) {
  const { products } = useSelector((state) => state.shared);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { currentCountry, isTargetCountry, hideProducts } =
    useUserLocationLanguage();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleBannerClick = () => {
    if (bnrPath) {
      navigate(`/${bnrPath}`)
    }
  };

  const [image, setImage] = useState(null);

  useEffect(() => {
    const updateBackground = () => {
      const width = window.innerWidth;
      let mounted = true;
      let imagePath = desktopImage;
      if (width < 1024) {
        imagePath = mobileImage;
      }
      import(`@assets/images/banner/${imagePath}.webp`)
        .then((mod) => {
          if (mounted) setImage(mod.default); // URL of the image
        })
        .catch(console.error);

      return () => {
        mounted = false;
      };
    };

    updateBackground();
    window.addEventListener("resize", updateBackground);
    return () => window.removeEventListener("resize", updateBackground);
  }, []);

  return (
    <div className="relative w-full aspect-auto overflow-hidden">
      {!image ? (
        <BannerSkeleton />
      ) : (
        <img
          src={image}
          alt={altAttr}
          title={titleAttr}
          loading="lazy"
          className="inset-0 w-full h-auto object-cover cursor-pointer"
          onClick={handleBannerClick}
        />
      )}

      <div className="absolute inset-x-0 bottom-2 px-4 md:bottom-6 md:px-6 w-full">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-4">
          <div className="w-full lg:w-1/2 flex justify-center md:justify-center lg:justify-start">
            <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-[460px] mx-auto">
              {products
                ?.filter((item) => !hideProducts.includes(item.type))
                ?.map((item, index) => (
                  <ProductRouteCard
                    key={index}
                    index={index}
                    item={item}
                    onClick={() => handleNavigate(item?.path)}
                    wrapperClass="text-white lg:py-2 xl:py-5"
                  // wrapperClass={`text-white ${isTargetCountry && currentCountry === 'jp'
                  //     ? 'sm:w-[250px] w-auto'
                  //     : 'lg:py-2 xl:py-5'
                  //     }`}
                  />
                ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end z-20">
            <HeroChildSlides wrapperClass="text-white xs:max-w-[326px] sm:max-w-[406px] lg:max-w-[506px] w-full pt-0 sm:pt-0 lg:pt-0 xl:pt-0 pb-0 sm:pb-0 md:pb-16 lg:pb-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
