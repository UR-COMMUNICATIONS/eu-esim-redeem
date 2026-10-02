import { images, VectorSvg } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeroChildSlides from "./HeroChildSlides";
import ProductRouteCard from "./ProductRouteCard";
import useModal from "@/hooks/useModal";
import { useTranslation } from "react-i18next";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { useState, useEffect } from 'react';
import yoowifiAutumnDesktop from '@assets/images/banner/yoowifi-autumn-jp/yoowifi-autumn-desktop.webp'
import yoowifiAutumnBg from '@assets/images/banner/yoowifi-autumn-jp/yoowifi-autumn-bg.webp'
import yoowifiAutumnMobileBg from '@assets/images/banner/yoowifi-autumn-jp/yoowifi-autumn-mobile-bg.webp'
import yoowifiAutumnAsset from '@assets/images/banner/yoowifi-autumn-jp/yoowifi-autumn-asset.webp'
import yoowifiAutumnHeadline from '@assets/images/banner/yoowifi-autumn-jp/yoowifi-autumn-headline.webp'
import yoowifiAutumnAssetleafleft from '@assets/images/banner/yoowifi-autumn-jp/yoowifi-autumn-asset-leafleft.webp'
import yoowifiAutumnAssetleafright from '@assets/images/banner/yoowifi-autumn-jp/yoowifi-autumn-asset-leafright.webp'

function YoowifiAutumnJp() {
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
                setBgImage(yoowifiAutumnDesktop); // xl
            } else if (width >= 1024) {
                setBgImage(yoowifiAutumnBg); // lg
            } else if (width >= 768) {
                setBgImage(yoowifiAutumnMobileBg); // md
            } else if (width >= 480) {
                setBgImage(yoowifiAutumnMobileBg); // sm
            } else {
                setBgImage(yoowifiAutumnMobileBg); // xxs (under 480px)
            }
        };

        updateBackground();
        window.addEventListener("resize", updateBackground);
        return () => window.removeEventListener("resize", updateBackground);
    }, []);
    return (
        <div className="w-full lg:h-full lg:min-h-screen h-full overflow-hidden bg-no-repeat xl:bg-cover xl:bg-center bg-center bg-cover"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="flex flex-col justify-end items-center h-full min-h-screen xl:flex xl:mt-0 lg:flex md:mt-0 sm:mt-0 mt-0">
                {/* <div className="xl:hidden flex flex-col lg:flex-row items-center sm:gap-4 gap-2">
                    <div className="order-2 lg:order-1">
                        <img
                            src={yoowifiAutumnAsset}
                            alt="Headlines"
                            className="w-auto max-h-[200px] xs:max-h-[230px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-full object-contain"
                        />
                    </div>
                    <div className="flex justify-center order-1 lg:order-2">
                        <img
                            src={yoowifiAutumnHeadline}
                            alt="Annual Plans"
                            className="w-auto max-h-[200px] xs:max-h-[230px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-full object-contain"
                        />
                    </div>
                </div> */}
                <div className="xl:hidden relative w-full flex flex-col lg:flex-row items-center sm:gap-4 gap-2">
                    <img
                        src={yoowifiAutumnAssetleafleft}
                        alt="Leaf Left"
                        className="absolute top-0 left-5 lg:left-20 w-[60px] sm:w-[100px] md:w-[140px] lg:w-[180px] object-contain"
                    />
                    <img
                        src={yoowifiAutumnAssetleafright}
                        alt="Leaf Right"
                        className="absolute top-0 right-5 lg:right-20 w-[60px] sm:w-[100px] md:w-[140px] lg:w-[180px] object-contain"
                    />
                    <div className="order-2 lg:order-1 z-10">
                        <img
                            src={yoowifiAutumnAsset}
                            alt="Headlines"
                            className="w-auto max-h-[200px] xs:max-h-[230px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-full object-contain"
                        />
                    </div>
                    <div className="flex justify-center order-1 lg:order-2 z-10">
                        <img
                            src={yoowifiAutumnHeadline}
                            alt="Annual Plans"
                            className="w-auto max-h-[200px] xs:max-h-[230px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-full object-contain"
                        />
                    </div>
                </div>

                <div className="w-full justify-around items-end px-10 sm:px-0 xl:px-14 lg:px-8 mb-4 xl:mt-0 lg:mt-10 md:mt-0 sm:mt-0 xs:mt-0 mt-0">
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

export default YoowifiAutumnJp;