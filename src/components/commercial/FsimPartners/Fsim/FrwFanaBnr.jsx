import { Button } from "@/components/ui/button";
import { commercialRoutes, ArrowRightIcon, brandRoutes } from "@/services";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { useDispatch } from "react-redux";
import { setCartData } from "@/store/module/cart/cartSlice";
import useDynamicImages from "@/hooks/useDynamicImages";

const freePormo = {
    "D": "frwfana",
    "E": "frsimana"
}

const FrwFanaBnr = () => {
    const { brand } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation(["translation", "english", "local"]);
    const { nameSpace } = useUserLocationLanguage();

    const handleClick = (value) => {
        sessionStorage.setItem("annex", freePormo[value]);
        dispatch(setCartData({ fsimFlowType: value, annex: freePormo[value], promoCode: freePormo[value] }));
        navigate(brandRoutes.brandRegister.path)
    }

    return (
        <section className="sec_common_80 xl:px-28 lg:py-10 py-6 px-4">
            <div className="w-full mb-8">
                <img
                    src={useDynamicImages("fsim-banner", "frw-fana-bnr")}
                    alt="Free WiFi and eSIM Promo Banner"
                    className="w-full h-auto object-contain mx-auto md:rounded-[24px] rounded-[12px] shadow-sm"
                />
            </div>
            <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-8 w-full">
                <div className="flex flex-col justify-between p-6 w-full md:w-1/2 text-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {t(`kol.getFreeWifi`)}
                    </h2>
                    <Button
                        className="bg-[#ed3942] hover:bg-[#ed3942] text-[18px] font-medium mt-6 self-center flex items-center justify-center px-6 py-4"
                        onClick={() => handleClick("D")}
                    >
                        {t(`kolButton.buttonTextWifi`)}
                        <ArrowRightIcon className="h-6 w-6 ml-2" />
                    </Button>
                </div>
                <div className="flex flex-col justify-between p-6  w-full md:w-1/2 text-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {t(`kol.getFreeeSIM`)}
                    </h2>
                    <Button
                        className="bg-[#ed3942] hover:bg-[#ed3942] text-[18px] font-medium mt-6 self-center flex items-center justify-center px-6 py-4"
                        onClick={() => handleClick("E")}
                    >
                        {t(`kolButton.buttonTextSim`)}
                        <ArrowRightIcon className="h-6 w-6 ml-2" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default FrwFanaBnr;


