import { images, VectorSvg } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeroChildSlides from "./HeroChildSlides";
import ProductRouteCard from "./ProductRouteCard";
import useModal from "@/hooks/useModal";
import { useTranslation } from "react-i18next";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { useState, useEffect } from 'react';
import globalTravelDesktop from '@assets/images/banner/global-travel-jp/global-travel-desktop.webp'
import globalTravelMobilebg from '@assets/images/banner/global-travel-jp/global-travel-mobile-bg.webp'
import globalTravelHeadline from '@assets/images/banner/global-travel-jp/global-travel-headline.webp'
import globalTravelAsset from '@assets/images/banner/global-travel-jp/global-travel-asset.webp'

function GlobalTravelJp() {
    const { products } = useSelector((state) => state.shared);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setIsAuthDialogOpen } = useModal();
    const { t } = useTranslation();
    const { currentCountry, isTargetCountry, hideProducts } = useUserLocationLanguage();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const [bgImage, setBgImage] = useState(null);

    useEffect(() => {
        const updateBackground = () => {
            const width = window.innerWidth;

            if (width >= 1280) {
                setBgImage(globalTravelDesktop); // xl
            } else if (width >= 1024) {
                setBgImage(globalTravelDesktop); // lg
            } else if (width >= 768) {
                setBgImage(globalTravelMobilebg); // md
            } else if (width >= 480) {
                setBgImage(globalTravelMobilebg); // sm
            } else {
                setBgImage(globalTravelMobilebg); // xxs (under 480px)
            }
        };

        updateBackground();
        window.addEventListener("resize", updateBackground);
        return () => window.removeEventListener("resize", updateBackground);
    }, []);
    return (
        <div className="w-full lg:h-full lg:min-h-screen h-full overflow-hidden bg-no-repeat xl:bg-cover xl:bg-center lg:bg-[length:100%_100%] bg-center bg-cover"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="flex flex-col justify-end items-center h-full min-h-screen xl:flex xl:mt-0 lg:flex md:mt-0 sm:mt-0 mt-0">
                <div className="lg:hidden flex flex-col items-center gap-2">
                    <div>
                        <img
                            src={globalTravelHeadline}
                            alt='Headlines'
                            className="w-auto max-h-[100px] xs:max-h-[150px] sm:max-h-[250px] md:max-h-[300px] object-contain"
                        />
                    </div>
                    <div>
                        <img
                            src={globalTravelAsset}
                            alt='Annual Plans'
                            className="w-auto max-h-[180px] xs:max-h-[250px] sm:max-h-[400px] md:max-h-[500px] object-contain"
                        />
                    </div>
                </div>
                <div className="w-full justify-around items-end px-10 sm:px-0 xl:px-14 lg:px-8 mb-4 xl:mt-0 lg:mt-20 md:mt-2 sm:mt-10 xs:mt-10 mt-10">
                    <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-0">
                        <div className="w-full lg:w-1/2">
                            <div className="grid grid-cols-3 w-full max-w-[460px] mx-auto lg:mx-0 gap-2 sm:gap-3">
                                {products
                                    ?.filter(item => !hideProducts.includes(item.type))
                                    ?.map((item, index) => (
                                        <ProductRouteCard
                                            key={index}
                                            index={index}
                                            item={item}
                                            onClick={() => handleNavigate(item?.path)}
                                            wrapperClass={`text-white ${isTargetCountry && currentCountry === 'jp'
                                                ? 'sm:w-[250px] w-auto'
                                                : 'lg:py-2 xl:py-5'
                                                }`}
                                        />
                                    ))}
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                            <HeroChildSlides wrapperClass="text-white xs:max-w-[326px] sm:max-w-[406px] lg:max-w-[506px] w-full pt-0 sm:pt-0 lg:pt-0 xl:pt-0 pb-0 sm:pb-0 md:pb-0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GlobalTravelJp;