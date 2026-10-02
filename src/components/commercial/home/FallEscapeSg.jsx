import { images, VectorSvg } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeroChildSlides from "./HeroChildSlides";
import ProductRouteCard from "./ProductRouteCard";
import useModal from "@/hooks/useModal";
import { useTranslation } from "react-i18next";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { useState, useEffect } from 'react';
import fallEscapeSgDesktop from '@assets/images/banner/fall-escape-sg/fall-escape-sg-desktop.webp'
import fallEscapeSgMobile from '@assets/images/banner/fall-escape-sg/fall-escape-sg-mobile.webp'
import fallEscapeSgHeadline from '@assets/images/banner/fall-escape-sg/fall-escape-sg-headline.webp'
import fallEscapeSgPromo from '@assets/images/banner/fall-escape-sg/fall-escape-sg-promo.webp'
import fallEscapeSgDate from '@assets/images/banner/fall-escape-sg/fall-escape-sg-date.webp'
import fallEscapeSgPlane from '@assets/images/banner/fall-escape-sg/fall-escape-sg-plane.webp'
import fallEscapeSgAsset from '@assets/images/banner/fall-escape-sg/fall-escape-sg-asset.webp'
import fallEscapeSgAssetpromo from '@assets/images/banner/fall-escape-sg/fall-escape-sg-assetpromo.webp'

function FallEscapeSg() {
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
                setBgImage(fallEscapeSgDesktop); // xl
            } else if (width >= 1024) {
                setBgImage(fallEscapeSgDesktop); // lg
            } else if (width >= 768) {
                setBgImage(fallEscapeSgMobile); // md
            } else if (width >= 480) {
                setBgImage(fallEscapeSgMobile); // sm
            } else {
                setBgImage(fallEscapeSgMobile); // xxs (under 480px)
            }
        };

        updateBackground();
        window.addEventListener("resize", updateBackground);
        return () => window.removeEventListener("resize", updateBackground);
    }, []);
    return (

        <div className="relative w-full aspect-auto overflow-hidden">
            <img
                src={fallEscapeSgDesktop}
                alt=""
                className="inset-0 w-full h-auto object-cover"
            />
            {/* <div
                className="absolute bottom-2 left-2 md:bottom-6 md:left-6 flex space-x-2"

            // className="grid grid-cols-3 w-full max-w-[460px] mx-auto lg:mx-0 gap-2 sm:gap-3"

            > */}

                <div className="absolute bottom-2 left-4 md:bottom-6 md:left-6 grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-[460px]">
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


        // <div className="w-full lg:h-full lg:min-h-screen h-full overflow-hidden xl:bg-cover xl:bg-center bg-no-repeat bg-[length:100%_100%] bg-center"
        //     style={{ backgroundImage: `url(${bgImage})` }}
        // >
        //     <div className="flex flex-col justify-end items-center h-full min-h-screen xl:flex xl:mt-0 lg:flex md:mt-0 sm:mt-0 mt-0">
        //         <div className="lg:hidden flex flex-col items-center sm:gap-4 gap-2">
        //             <div>
        //                 <img
        //                     src={fallEscapeSgHeadline}
        //                     alt='Headlines'
        //                     className="w-auto max-h-[80px] xs:max-h-[100px] sm:max-h-[170px] md:max-h-[200px] object-contain"
        //                 />
        //             </div>
        //             <div className="flex justify-center">
        //                 <img
        //                     src={fallEscapeSgPromo}
        //                     alt='Annual Plans'
        //                     className="w-auto max-h-[80px] xs:max-h-[100px] sm:max-h-[180px] md:max-h-[200px] object-contain"
        //                 />
        //             </div>
        //             <div className="flex justify-center">
        //                 <img
        //                     src={fallEscapeSgDate}
        //                     alt='Promo Code'
        //                     className="w-auto max-h-[25px] xs:max-h-[30px] sm:max-h-[60px] md:max-h-[80px] object-contain"
        //                 />
        //                 <img
        //                     src={fallEscapeSgPlane}
        //                     alt='Yoodino Clipart'
        //                     className="w-auto max-h-[25px] xs:max-h-[30px] sm:max-h-[60px] md:max-h-[60px] ml-4 object-contain"
        //                 />
        //             </div>
        //             <div className="flex justify-center">
        //                 <img
        //                     src={fallEscapeSgAsset}
        //                     alt='Promo Code'
        //                     className="w-auto max-h-[100px] xs:max-h-[150px] sm:max-h-[200px] md:max-h-[250px] object-contain"
        //                 />
        //                 <img
        //                     src={fallEscapeSgAssetpromo}
        //                     alt='Yoodino Clipart'
        //                     className="w-auto max-h-[50px] xs:max-h-[100px] sm:max-h-[150px] md:max-h-[180px] object-contain"
        //                 />
        //             </div>
        //         </div>
        //         <div className="w-full justify-around items-end px-10 sm:px-0 xl:px-14 lg:px-8 mb-4 xl:mt-0 lg:mt-20 md:mt-10 sm:mt-10 xs:mt-10 mt-10">
        //             <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-0">
        //                 <div className="w-full lg:w-1/2">
        // <div className="grid grid-cols-3 w-full max-w-[460px] mx-auto lg:mx-0 gap-2 sm:gap-3">
        //     {products
        //         ?.filter(item => !hideProducts.includes(item.type))
        //         ?.map((item, index) => (
        //             <ProductRouteCard
        //                 key={index}
        //                 index={index}
        //                 item={item}
        //                 onClick={() => handleNavigate(item?.path)}
        //                 wrapperClass={`text-white ${isTargetCountry && currentCountry === 'jp'
        //                     ? 'sm:w-[250px] w-auto'
        //                     : 'lg:py-2 xl:py-5'
        //                     }`}
        //             />
        //         ))}
        // </div>
        //                 </div>
        //                 <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
        //                     <HeroChildSlides wrapperClass="text-white xs:max-w-[326px] sm:max-w-[406px] lg:max-w-[506px] w-full pt-0 sm:pt-0 lg:pt-0 xl:pt-0 pb-0 sm:pb-0 md:pb-0" />
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}

export default FallEscapeSg;