import { Button } from "@/components/ui/button";
import { commercialRoutes, images, ArrowRightIcon, brandRoutes } from "@/services";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { useDispatch } from "react-redux";
import { setCartData } from "@/store/module/cart/cartSlice";
import useDynamicImages from "@/hooks/useDynamicImages";

const freePormo = {
    "D": "freewifi",
    "E": "freesim"
}

const KolBnr = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation(["translation", "english", "local"]);
    const { nameSpace } = useUserLocationLanguage();

    const handleClick = (value) => {
        sessionStorage.setItem("annex", freePormo[value]);
        dispatch(setCartData({ fsimFlowType: value, annex: freePormo[value], promoCode: freePormo[value] }));
        // navigate(commercialRoutes.kolRegister.path)
        navigate(brandRoutes.brandRegister.path)

    }

    return (
        <div className="sec_common_80 xl:px-28 lg:py-10">
            <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 w-full">
                {/* Group 1 */}
                <div className="flex flex-col justify-between w-full md:w-1/2 bg-white rounded-[16px] p-4">
                    <div>
                        <img
                            src={useDynamicImages("fsim-banner", "kol-wifi")}
                            alt="kolWifi"
                            className="w-full max-w-[480px] md:max-w-[520px] object-contain mx-auto md:rounded-[24px] rounded-[12px]"
                        />
                        <h2 className="text-xl font-semibold text-gray-800 mt-4 text-center">
                            {t(`kol.getFreeWifi`)}
                        </h2>
                    </div>
                    <div className="flex justify-center mt-6">
                        <Button
                            className="bg-[#ed3942] hover:bg-[#ed3942] text-[18px]"
                            onClick={() => handleClick("D")}
                        >
                            <span> {t(`kolButton.buttonTextWifi`)}</span>
                            <ArrowRightIcon className="!h-6 !w-6 shrink-0 ml-2" />
                        </Button>
                    </div>
                </div>

                {/* Group 2 */}
                <div className="flex flex-col justify-between w-full md:w-1/2 bg-white rounded-[16px] p-4">
                    <div>
                        <img
                            src={useDynamicImages("fsim-banner", "kol-esim")}
                            alt="kolEsim"
                            className="w-full max-w-[480px] md:max-w-[520px] object-contain mx-auto md:rounded-[24px] rounded-[12px]"
                        />
                        <h2 className="text-xl font-semibold text-gray-800 mt-4 text-center">
                            {t(`kol.getFreeeSIM`)}
                        </h2>
                    </div>
                    <div className="flex justify-center mt-6">
                        <Button
                            className="bg-[#ed3942] hover:bg-[#ed3942] text-[18px]"
                            onClick={() => handleClick("E")}                        >
                            <span>{t(`kolButton.buttonTextSim`)}</span>
                            <ArrowRightIcon className="!h-6 !w-6 shrink-0 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KolBnr;
