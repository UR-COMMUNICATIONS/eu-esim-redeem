import { Button } from "@/components/ui/button";
import { commercialRoutes, images, ArrowRightIcon } from "@/services";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Trans } from 'react-i18next';
import FsimLogo from "./FsimLogo";
import useDynamicImages from "@/hooks/useDynamicImages";
const FreeSimBnr = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="sec_common_80 xl:px-28 lg:py-10">
            <FsimLogo className="lg:mb-10" />
            <img
                src={useDynamicImages("fsim-banner", "air-asia" )}
                alt="anaBanner"
                className="w-full h-full bg-contain rounded-[24px]"
            />
            <p className="md:text-[24px] text-[18px] font-semibold text-[#4F4F4F] lg:whitespace-pre-line py-16 text-center">{t(`airasia.indonesiatraveler`)}</p>
            <div className="flex justify-center items-center">
                <Button className="bg-[#00264C] hover:bg-[#00264C] text-[18px]"
                // onClick={() => navigate("/fsim-register")}
                >
                    <span> {t(`freesimbnr.buttonTittle`)}</span>
                    <ArrowRightIcon className="!h-6 !w-6 shrink-0 ml-2" />
                </Button>
            </div>
        </div>
    );
};

export default FreeSimBnr;
