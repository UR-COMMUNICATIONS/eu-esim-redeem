import { images, VectorSvg } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeroChildSlides from "./HeroChildSlides";
import ProductRouteCard from "./ProductRouteCard";
import useModal from "@/hooks/useModal";
import { useTranslation } from "react-i18next";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { useState, useEffect } from 'react';

function NatasSingapore() {
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

    return (
        <div className="w-full h-full bg-blue-500">
            <div className="flex flex-col justify-end items-center h-full min-h-screen xl:flex xl:mt-0 lg:flex md:mt-0 sm:mt-0 mt-0">
                <div className="flex flex-col lg:flex-row items-evenly md:items-center justify-evenly w-full lg:pt-2 pt-0">
                    {/* Left column */}
                    <div className="order-2 lg:order-1 flex flex-col items-center">
                        <img
                            src={images.natasLogos}
                            alt="Discount Kddi"
                            className="w-auto xl:h-[100px] lg:h-[90px] md:h-[80px] sm:h-[80px] h-[40px] object-contain"
                        />
                        <img
                            src={images.natasHeadlines}
                            alt="Discount Kddi"
                            className="w-auto xl:h-[250px] lg:h-[230px] md:h-[180px] sm:h-[160px] h-[80px]  object-contain"
                        />
                        <img
                            src={images.dateandtime}
                            alt="Discount Kddi"
                            className="w-auto xl:h-[220px] lg:h-[210px] md:h-[180px] sm:h-[150px] h-[90px] object-contain"
                        />
                    </div>

                    {/* Right column */}
                    <div className="flex justify-center md:justify-start items-center order-1 lg:order-2">
                        <img
                            src={images.natasBanner}
                            alt="Discount Kddi"
                            className="w-auto xl:h-[675px] lg:h-[625px] md:h-[445px] sm:h-[405px] h-[290px] object-contain"
                        />
                    </div>
                </div>
                <div className="w-full justify-around items-end px-10 sm:px-0 xl:px-14 lg:px-8 mb-4 xl:mt-0 lg:mt-0 md:mt-0 sm:mt-0 xs:mt-0">
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
                            <HeroChildSlides wrapperClass="text-black xs:max-w-[326px] sm:max-w-[406px] lg:max-w-[506px] w-full pt-0 sm:pt-0 lg:pt-0 xl:pt-0 pb-0 sm:pb-0 md:pb-0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NatasSingapore;