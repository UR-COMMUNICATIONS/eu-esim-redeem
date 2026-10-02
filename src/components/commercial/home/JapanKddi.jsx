import { images, VectorSvg } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeroChildSlides from "./HeroChildSlides";
import ProductRouteCard from "./ProductRouteCard";
import useModal from "@/hooks/useModal";
import { useTranslation } from "react-i18next";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { useState, useEffect } from 'react';
import japankddi from '@assets/images/banner/japan-kddi-sg/japan-kddi.webp'
import japanKddiBg from '@assets/images/banner/japan-kddi-sg/japan-kddi-bg.webp'
import yoodinokddi from '@assets/images/banner/japan-kddi-sg/yoodino-kddi.webp'
import headlinekddi from '@assets/images/banner/japan-kddi-sg/headline-kddi.webp'
import uspkddi from '@assets/images/banner/japan-kddi-sg/usp-kddi.webp'
import discountkddi from '@assets/images/banner/japan-kddi-sg/discount-kddi.webp'
import bestofferskddi from '@assets/images/banner/japan-kddi-sg/best-offers-kddi.webp'
import tnckddi from '@assets/images/banner/japan-kddi-sg/tnc-kddi.webp'

function JapanKddi() {
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
                setBgImage(japankddi); // xl
            } else if (width >= 1024) {
                setBgImage(japankddi); // lg
            } else if (width >= 768) {
                setBgImage(japanKddiBg); // md
            } else if (width >= 480) {
                setBgImage(japanKddiBg); // sm
            } else {
                setBgImage(japanKddiBg); // xxs (under 480px)
            }
        };

        updateBackground();
        window.addEventListener("resize", updateBackground);
        return () => window.removeEventListener("resize", updateBackground);
    }, []);

    const kddiImages = [
        {
            src: yoodinokddi,
            alt: "Yoodino Kddi",
            className: "w-auto max-h-[140px] sm:max-h-[280px] md:max-h-[300px] object-contain",
        },
        {
            src: headlinekddi,
            alt: "Headline Kddi",
            className: "w-auto max-h-[60px] sm:max-h-[90px] md:max-h-[80px] object-contain",
        },
        {
            src: uspkddi,
            alt: "uSP Kddi",
            className: "w-auto max-h-[40px] sm:max-h-[40px] md:max-h-[50px] object-contain",
        },
        {
            src: discountkddi,
            alt: "Discount Kddi",
            className: "w-auto max-h-[80px] sm:max-h-[100px] md:max-h-[120px] object-contain",
        },
        {
            src: bestofferskddi,
            alt: "Best Offer Kddi",
            className: "w-auto max-h-[80px] sm:max-h-[110px] md:max-h-[140px] object-contain",
        },
        {
            src: tnckddi,
            alt: "TNC Kddi",
            className: "w-auto max-h-[20px] sm:max-h-[35px] md:max-h-[40px] object-contain",
        },
    ];
    return (
        <div className="w-full lg:h-full lg:min-h-screen h-full overflow-hidden xl:bg-[length:100%_110%] xl:bg-center lg:bg-[length:100%_100%] lg:bg-center bg-no-repeat bg-[length:100%_100%] bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="flex flex-col justify-end items-center h-full min-h-screen xl:flex xl:mt-0 lg:flex md:mt-0 sm:mt-0 mt-0">
                <div className="lg:hidden flex flex-col items-center gap-1 md:gap-4 p-2">
                    {kddiImages.map((img, index) => (
                        <img
                            key={index}
                            src={img.src}
                            alt={img.alt}
                            className={`${img.className} object-contain`}
                        />
                    ))}
                </div>
                <div className="w-full justify-around items-end px-10 sm:px-0 xl:px-14 lg:px-8 mb-4 xl:mt-0 lg:mt-20 md:mt-0 sm:mt-0 xs:mt-0">
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

export default JapanKddi;