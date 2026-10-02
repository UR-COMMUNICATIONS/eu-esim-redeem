import { Button } from "@/components/ui/button";
import { commercialRoutes, images, ArrowRightIcon, brandRoutes } from "@/services";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Trans } from 'react-i18next';
import FsimLogo from "./FsimLogo";
import airAsia from '@assets/images/fsim-banner/air-asia.webp'
import airasiaTagon from '@assets/images/fsim-banner/air-asia-tag-on.webp'
import useDynamicImports from "@/hooks/useDynamicImports";
import { Suspense } from "react";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { useDispatch } from "react-redux";
import { setCartData } from "@/store/module/cart/cartSlice";
import useDynamicImages from "@/hooks/useDynamicImages";

const AirAsiaBnr = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation(["translation", "english", "local"]);
    const { nameSpace } = useUserLocationLanguage();

    const path = "&/countries/{currentCountry}/src/components/commercial/FsimPartners/Fsim/AirAsiaRoaming.jsx";
    const AirAsiaRoaming_Dynamic = useDynamicImports(path);

    const handleClick = (value) => {
        dispatch(setCartData({ fsimFlowType: value }));
        // navigate(commercialRoutes.airAsiaRegister.path)
        navigate(brandRoutes.brandRegister.path)

    }

    return (
        <div className="sec_common_80 xl:px-28 lg:py-10">
            <img
                src={useDynamicImages("fsim-banner", "air-asia")}
                alt="anaBanner"
                className="w-full h-full bg-contain md:rounded-[24px] rounded-[12px]"
            />
            <p className="md:text-[24px] text-[18px] font-semibold text-[#4F4F4F] lg:whitespace-pre-line py-16 text-center">{t(`airasia.indonesiatraveler`)}</p>
            <div className="flex justify-center items-center">
                <Button
                    className="bg-[#ed3942] hover:bg-[#ed3942] text-[18px]"
                    onClick={() => handleClick("E")}

                >
                    <span> {t(`freesimbnr.buttonTittle`)}</span>
                    <ArrowRightIcon className="!h-6 !w-6 shrink-0 ml-2" />
                </Button>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                {AirAsiaRoaming_Dynamic ? <AirAsiaRoaming_Dynamic /> : null}
            </Suspense>
            {/* <div className="md:pt-20 pt-14">
                <a
                    href="https://yoowifi.com/my/pocket-wifi/cart-service"
                    // target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src={airasiaTagon}
                        alt="anaBanner"
                        className="w-full h-full bg-contain md:rounded-[24px] rounded-[12px]"
                    />
                </a>
            </div> */}
        </div>
    );
};

export default AirAsiaBnr;
