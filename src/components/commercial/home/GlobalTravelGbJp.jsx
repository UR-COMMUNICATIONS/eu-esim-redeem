import { images, VectorSvg } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeroChildSlides from "./HeroChildSlides";
import ProductRouteCard from "./ProductRouteCard";
import useModal from "@/hooks/useModal";
import { useTranslation } from "react-i18next";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { useState, useEffect } from 'react';
import globalTravelGbDesktop from '@assets/images/banner/global-travel-gb-jp/global-travel-gb-desktop.webp'
import globalTravelGbAsset from '@assets/images/banner/global-travel-gb-jp/global-travel-gb-asset.webp'
import globalTravelGbHeadline from '@assets/images/banner/global-travel-gb-jp/global-travel-gb-headline.webp'
import globalTravelGbBlurb from '@assets/images/banner/global-travel-gb-jp/global-travel-gb-blurb.webp'

function GlobalTravelGbJp() {
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
                setBgImage(globalTravelGbAsset); // xl
            } else if (width >= 1024) {
                setBgImage(globalTravelGbAsset); // lg
            } else if (width >= 768) {
                setBgImage(globalTravelGbAsset); // md
            } else if (width >= 480) {
                setBgImage(globalTravelGbAsset); // sm
            } else {
                setBgImage(globalTravelGbAsset); // xxs (under 480px)
            }
        };

        updateBackground();
        window.addEventListener("resize", updateBackground);
        return () => window.removeEventListener("resize", updateBackground);
    }, []);
    return (
        <section className="relative w-full lg:h-full lg:min-h-screen h-full bg-gradient-to-b from-red-800 to-red-800">
            <div
                className={` w-full h-screen overflow-hidden bg-no-repeat xl:bg-contain bg-contain bg-[position:center_calc(50%+-30px)] sm:bg-[position:center_calc(50%+100px)] md:bg-[position:center_calc(50%+100px)] lg:bg-[position:center_calc(50%+0px)] xl:bg-[position:center_calc(50%+70px)]`}
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                {/* Headline + Blurb wrapper */}
                <div className="flex flex-col items-center relative h-full">
                    {/* Headline */}
                    <div className=" flex justify-center xl:pt-20 lg:pt-20 md:pt-14 sm:pt-20 pt-20">
                        <img
                            src={globalTravelGbHeadline}
                            alt="Headlines"
                            className="w-auto max-h-[120px] xs:max-h-[150px] sm:max-h-[200px] md:max-h-[250px] lg:max-h-[200px] xl:max-h-[300px] object-contain"
                        />
                    </div>

                    {/* Blurb */}
                    {/* <div
                        className="absolute bottom-60 xs:bottom-50 sm:bottom-4 md:bottom-[0px] left-1/2 -translate-x-1/2 lg:static lg:mt-auto lg:ml-[50px] xl:ml-[600px] md:ml-[170px] lg:translate-x-0">
                        <img
                            src={globalTravelGbBlurb}
                            alt="Blurb"
                            className="w-auto max-h-[80px] xs:max-h-[100px] sm:max-h-[160px] md:max-h-[150px] lg:max-h-[150px] xl:max-h-[180px] object-contain"
                        />
                    </div> */}
                    {/* <div className="absolute bottom-80 xs:bottom-50 sm:bottom-20 md:bottom-16 lg:bottom-32 xl:bottom-32 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:ml-[500px] xl:ml-[600px] md:ml-[100px] sm:ml-[100px] xs:ml-[100px]">
                        <img
                            src={globalTravelGbBlurb}
                            alt="Blurb"
                            className="w-auto max-h-[60px] xs:max-h-[60px] sm:max-h-[100px] md:max-h-[100px] lg:max-h-[120px] xl:max-h-[150px] object-contain"
                        />
                    </div> */}
                    <div className="absolute bottom-80 xs:bottom-50 sm:bottom-20 md:bottom-16 lg:bottom-32 xl:bottom-32 left-1/2 -translate-x-1/2 sm:left-[65%] sm:-translate-x-0 md:left-[65%] lg:left-auto lg:translate-x-0 lg:ml-[500px] xl:ml-[600px]">
                        <img
                            src={globalTravelGbBlurb}
                            alt="Blurb"
                            className="w-auto max-h-[60px] xs:max-h-[60px] sm:max-h-[100px] md:max-h-[100px] lg:max-h-[120px] xl:max-h-[150px] object-contain"
                        />
                    </div>
                </div>

                {/* Products + slides section */}
                <div className="absolute bottom-4 w-full px-10 sm:px-0 xl:px-14 lg:px-8">
                    <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-0">
                        {/* Products */}
                        <div className="w-full lg:w-1/2">
                            <div className="grid grid-cols-3 w-full max-w-[460px] mx-auto lg:mx-0 gap-2 sm:gap-3">
                                {products
                                    ?.filter((item) => !hideProducts.includes(item.type))
                                    ?.map((item, index) => (
                                        <ProductRouteCard
                                            key={index}
                                            index={index}
                                            item={item}
                                            onClick={() => handleNavigate(item?.path)}
                                            wrapperClass={`text-white ${isTargetCountry && currentCountry === "jp"
                                                ? "sm:w-[250px] w-auto"
                                                : "lg:py-2 xl:py-5"
                                                }`}
                                        />
                                    ))}
                            </div>
                        </div>

                        {/* Slides */}
                        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                            <HeroChildSlides wrapperClass="text-white xs:max-w-[326px] sm:max-w-[406px] lg:max-w-[506px] w-full pt-0 pb-o sm:pb-0 md:pb-0" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GlobalTravelGbJp;