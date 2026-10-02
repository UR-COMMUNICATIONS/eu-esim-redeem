import { images, VectorSvg } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeroChildSlides from "./HeroChildSlides";
import ProductRouteCard from "./ProductRouteCard";
import useModal from "@/hooks/useModal";
import { useTranslation } from "react-i18next";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { useState, useEffect } from 'react';
import JapanGreenDeviceBanner from '@assets/images/banner/discount-banner-Jp/japan-green-device-banner.webp'
import JapanGreenMdDeviceBanner from '@assets/images/banner/discount-banner-Jp/japan-green-md-device-banner.webp'
import JapanGreenMobileDeviceBanner from '@assets/images/banner/discount-banner-Jp/japan-green-mobile-device-banner.webp'
import anytimeJp from '@assets/images/banner/discount-banner-Jp/anytime-jp.webp'
import connectionJp from '@assets/images/banner/discount-banner-Jp/connection-jp.webp'

function DiscountBannerJp() {
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
                setBgImage(JapanGreenDeviceBanner); // xl
            } else if (width >= 1024) {
                setBgImage(JapanGreenDeviceBanner); // lg
            } else if (width >= 768) {
                setBgImage(JapanGreenMdDeviceBanner); // md
            } else if (width >= 480) {
                setBgImage(JapanGreenMdDeviceBanner); // sm
            } else {
                setBgImage(JapanGreenMobileDeviceBanner); // xxs (under 480px)
            }
        };

        updateBackground();
        window.addEventListener("resize", updateBackground);
        return () => window.removeEventListener("resize", updateBackground);
    }, []);



    return (
        <div className="w-full h-full overflow-hidden lg:object-contain lg:bg-center lg:bg-[length:100%_100%] bg-no-repeat sm:bg-center sm:bg-cover bg-[length:100%_100%] bg-center object-contain md:bg-center md:bg-cover"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="flex flex-col justify-end items-center h-full min-h-screen xl:mt-0 lg:mt-16 md:mt-0 sm:mt-0 mt-0">

                <div className="flex justify-between lg:flex-col gap-x-4 lg:gap-6 md:gap-0 w-full md:items-end md:justify-between lg:justify-center mt-0 md:h-full">
                    <img
                        src={anytimeJp}
                        alt="any time Jp"
                        className="w-full max-w-[150px] sm:max-w-[280px] md:max-w-[340px] lg:max-w-[320px] xl:max-w-[380px] h-auto order-1 lg:order-2 "
                    />
                    <img
                        src={connectionJp}
                        alt="connection Jp"
                        className="w-full max-w-[220px] sm:max-w-[340px] md:max-w-[340px] lg:max-w-[390px] xl:max-w-[490px] h-auto order-2 lg:order-1"
                    />
                </div>
                <div className="w-full justify-around items-end px-10 sm:px-0 xl:px-14 lg:px-8 mb-4 xl:mt-0 lg:mt-0 md:mt-0 sm:mt-10 xs:mt-0 xl:pb-0 lg:pb-0 md:pt-10 sm:pt-0 pt-6 lg:mb-20 xl:mb-5 md:mb-20">
                    <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-0">
                        <div className="w-full lg:w-1/2">
                            <div className="grid grid-cols-3 w-full max-w-[460px] mx-auto lg:mx-0 gap-2 sm:gap-3 md:mx-6">
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
                                                : 'lg:py-2 xl:py-5 md:py-0'
                                                }`}
                                        />
                                    ))}
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                            <HeroChildSlides wrapperClass="text-black xs:max-w-[326px] sm:max-w-[406px] lg:max-w-[506px] w-full pt-0 sm:pt-0 lg:pt-0 xl:pt-0 pb-0 sm:pb-0 md:pb-0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiscountBannerJp;





