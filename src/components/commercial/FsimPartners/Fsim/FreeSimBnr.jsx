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
    const freeSim = useDynamicImages("fsim-banner", "free-sim");

    return (
        <div className="sec_common_80 xl:px-28 lg:py-10">
            {/* <FsimLogo className="lg:mb-10" /> */}
            <div
                className="xl:h-[650px] lg:h-[550px] md:h-[450px] sm:h-[350px] h-[280px] bg-no-repeat rounded-[24px] px-6 bg-cover sm:bg-bottom bg-center relative flex flex-col md:justify-between"
                style={{ backgroundImage: `url(${freeSim})` }}
            >

                <div className=" flex flex-col justify-between items-start xl:py-28 lg:py-16 lg:px-10 sm:px-6 py-10 h-full md:py-20">
                    <div>
                        <h1 className="text-[36px] md:text-[56px] lg:text-[100px] font-extrabold text-white whitespace-pre-line leading-[0.90]">
                            {t(`freesimbnr.bannerTittle`)}<br />
                            <span className="sm:font-normal md:text-4xl text-[18px] ">{t(`freesimbnr.Trip`)}</span>
                        </h1>
                    </div>
                    <div>
                        <h1 className="lg:text-[32px] md:text-[22px] sm:text-[18px] text-[14px] text-white leading-tight">
                            <Trans i18nKey="freesimbnr.dec" components={{ b: <b /> }} />
                        </h1>
                    </div>
                </div>
            </div>
            <p className="md:text-[24px] text-[18px] font-semibold text-[#4F4F4F] lg:whitespace-pre-line py-16 text-center">{t(`freesimbnr.indonesiatraveler`)}</p>
            <div className="flex justify-center items-center">
                <Button className="bg-[#00264C] hover:bg-[#00264C] text-[18px]" onClick={() => navigate("/fsim-register")}>
                    <span> {t(`freesimbnr.buttonTittle`)}</span>
                    <ArrowRightIcon className="!h-6 !w-6 shrink-0 ml-2" />
                </Button>
            </div>
        </div>
    );
};

export default FreeSimBnr;
