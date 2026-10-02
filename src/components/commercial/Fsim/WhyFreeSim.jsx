import { images } from "@/services";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Trans } from 'react-i18next';
import SectionHeader from "@/components/shared/others/SectionHeader";
import useDynamicImages from "@/hooks/useDynamicImages";
const WhyFreeSim = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="sec_common_80 md:py-20 xl:px-28">
            <div className="bg-[#CEF5FF] text-white rounded-[12px] ">
                <div className="md:py-24 py-12 containerX mx-auto">
                    <SectionHeader
                        heading={t("loveFreeSim.heading")}
                        midHeading={t(
                            "loveFreeSim.sectionSubHeading"
                        )}
                        midHeadingClass='text-[#4F4F4F] mt-5 md:text-[26px] text-[20px] whitespace-pre-line'
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 md:mt-16 md:px-15 px-8">
                        {[
                            {
                                img: <img src={useDynamicImages("others", "speedometer")} alt="Speed" className="h-12 w-12" />,
                                text: t("loveFreeSim.speed")
                            },
                            {
                                img: <img src={useDynamicImages("others", "thunder")} alt="thunder" className="h-12 w-12" />,
                                text: t("loveFreeSim.activation"),
                            },
                            {
                                img: <img src={useDynamicImages("others", "iphone")} alt="iphone" className="h-12 w-12" />,
                                text: t("loveFreeSim.compatiblephones"),
                            },
                            {
                                img: <img src={useDynamicImages("others", "free")} alt="free" className="h-12 w-12" />,
                                text: t("loveFreeSim.absolutelyfree"),
                            },
                            {
                                img: <img src={useDynamicImages("others", "tick")} alt="tick" className="h-12 w-10" />,
                                text: t("loveFreeSim.network"),
                            },
                            {
                                img: <img src={useDynamicImages("others", "earth")} className="h-12 w-12" />,
                                text: t("loveFreeSim.rechargeanytime"),
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white text-[#191919] rounded-[12px] md:p-5 p-3 md:h-[174px] h-[136px] flex flex-col justify-between"
                                style={{ opacity: 1 }}
                            >
                                <div className="w-full pl-6">
                                <div className="w-auto h-auto bg-contain ">{item.img}</div>
                                </div>
                                <p className="text-base md:text-lg font-semibold md:h-14 sm:h-12 ">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyFreeSim;
