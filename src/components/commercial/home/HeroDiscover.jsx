import AutoResizeText from "@/components/shared/AutoResizeText ";
import useModal from "@/hooks/useModal";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { images } from "@/services";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeroChildSlides from "./HeroChildSlides";
import ProductRouteCard from "./ProductRouteCard";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { setSavedPath } from "@/store/module/auth/slice";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import AutoResizeText from "@/components/shared/AutoResizeText ";
import heroDiscover from '@assets/images/banner/hero-discover/heroDiscover.webp'

function HeroDiscover() {
  const { products } = useSelector((state) => state.shared);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setIsAuthDialogOpen } = useModal();
  const { t } = useTranslation();
  const { currentCountry, isTargetCountry, hideProducts } =
    useUserLocationLanguage();
  const handleNavigate = (path) => {
    navigate(path);
    // dispatch(setSavedPath(path))
    // if (user) {
    //   navigate(path)
    // } else {
    //   setIsAuthDialogOpen(true);
    // }
  };

  return (
    <div className="flex-full  min-h-full  bg-yellow-400 text-black-900 pt-16 sm:pt-28 px-4 sm:px-10 md:px-16 overflow-hidden relative">
      <div className="w-full max-w-[1190px] mx-auto relative z-50">
        <AutoResizeText
          baseFontSize={64}
          maxLines={2}
          className="max-w-[686px] mx-auto lg:mx-0 text-3xl sm:text-5xl md:text-7xl leading-[115%] xl:!leading-none font-sansPro uppercase font-extrabold text-center lg:text-left"
        >
          {t("heroHome.heroDiscover.discover")}
        </AutoResizeText>

        <div className="mt-10 md:mt-12 ">
          <div className="flex flex-col gap-10 sm:gap-12 md:gap-14 w-full">
            <div className="grid grid-cols-3 w-full max-w-[460px] mx-auto lg:mx-0 gap-2 sm:gap-3">
              {products?.filter(item => !hideProducts.includes(item.type))?.map((item, index) => (
                <ProductRouteCard
                  key={index}
                  item={item}
                  index={index}
                  onClick={() => handleNavigate(item?.path)}
                  wrapperClass={`bg-white-rgb ${isTargetCountry && currentCountry == 'jp' ? 'sm:w-[250px] w-auto' : ''}`}
                  simColor="#000"
                />
              ))}
            </div>
          </div>
          <div className="flex justify-center lg:justify-start mt-60 md:mt-[550px] sm:mt-[490px] lg:mt-0">
            <HeroChildSlides />
          </div>
        </div>
      </div>
      <div className="w-full max-w-[320px] sm:max-w-[420px] md:max-w-[640px] xl:max-w-[760px]  absolute -bottom-8 sm:bottom-20 md:-bottom-24 lg:-bottom-64 right-0 z-30 duration-300">
        <img src={heroDiscover} alt="" className="w-full duration-300" />
      </div>
    </div>
  );
}

export default HeroDiscover;
