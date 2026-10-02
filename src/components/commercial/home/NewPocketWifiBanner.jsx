import { images, VectorSvg } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeroChildSlides from "./HeroChildSlides";
import ProductRouteCard from "./ProductRouteCard";
import useModal from "@/hooks/useModal";
import { useTranslation } from "react-i18next";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { useState, useEffect } from 'react';

function NewPocketWifiBanner() {
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
                setBgImage(images.NewPockectWifiBnr); // xl
            } else if (width >= 1024) {
                setBgImage(images.NewPockectWifiBnr); // lg
            } else if (width >= 768) {
                setBgImage(images.NewPockectWifiMobileBnr); // md
            } else if (width >= 480) {
                setBgImage(images.NewPockectWifiMobileBnr); // sm
            } else {
                setBgImage(images.NewPockectWifiMobileBnr); // xxs (under 480px)
            }
        };

        updateBackground();
        window.addEventListener("resize", updateBackground);
        return () => window.removeEventListener("resize", updateBackground);
    }, []);



    return (
        <div className="w-full h-full overflow-hidden xl:bg-[length:100%_100%] bg-no-repeat bg-top bg-cover"
            style={{ backgroundImage: `url(${bgImage})` }}
        >

            <div className="flex flex-col justify-end items-center h-full min-h-screen xl:mt-0 lg:mt-0 md:mt-0 sm:mt-0 mt-0">

                <div className="lg:flex hidden lg:flex-col w-full lg:justify-center h-full">
                    <h1 className="font-medium text-white text-center leading-tight xl:text-[96px] lg:text-[72px] lg:w-1/2">
                        <span className="xl:text-[72px] lg:text-[52px]">{t(`newPockectWifiBanner.theNew`)}</span><br /><span className="font-extrabold ">{t(`newPockectWifiBanner.pocket`)}<br />{t(`newPockectWifiBanner.wifi`)}</span>
                    </h1>
                </div>
                <div className="lg:hidden flex flex-col w-full justify-start h-full md:pt-28 sm:pt-24 pt-16">
                    <h1 className="font-medium text-white text-center leading-tight md:text-[72px] sm:text-[52px] text-[38px]">
                        <span className="md:text-[52px] sm:text-[42px] text-[32px]">{t(`newPockectWifiBanner.theNew`)} </span><br /><span className="font-extrabold ">{t(`newPockectWifiBanner.pocketWifi`)}</span>
                    </h1>
                </div>
                <div className="w-full justify-around items-end px-10 sm:px-0 xl:px-14 lg:px-8 mb-4 lg:mb-8">
                    <div className="flex flex-col lg:flex-col justify-between lg:items-start  gap-0">
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
                                                : 'lg:py-2 xl:py-5 md:py-5'
                                                }`}
                                        />
                                    ))}
                            </div>
                        </div>
                        <div className="w-full flex justify-center lg:justify-start">
                            <HeroChildSlides wrapperClass="text-black xs:max-w-[326px] sm:max-w-[406px] lg:max-w-[506px] w-full pt-4 sm:pt-0 lg:pt-8 xl:pt-8 pb-0 sm:pb-0 md:pb-0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewPocketWifiBanner;





