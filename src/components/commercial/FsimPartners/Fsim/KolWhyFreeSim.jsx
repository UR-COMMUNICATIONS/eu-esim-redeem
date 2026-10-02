import { images } from "@/services";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Trans } from "react-i18next";
import SectionHeader from "@/components/shared/others/SectionHeader";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import useDynamicImages from "@/hooks/useDynamicImages";

const KolWhyFreeSim = ({
  comp,
  bgColor = "#CEF5FF",
  textColor = "#4F4F4F",
  headingColor = "text-black",
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation(["translation", "english", "local"]);
  const { nameSpace } = useUserLocationLanguage();

  const loveFreeSim = t(`loveFreeSim`, { returnObjects: true });

  const freeSimColors = {
    jtb: {
      bgColor: "#CEF5FF",
      textColor: "#4F4F4F",
      headingColor: "text-black",
    },
    kol: {
      bgColor: "#ef4141",
      textColor: "#FFFFFF",
      headingColor: "text-white",
    },
  };

  return (
    <div className="sec_common_80 md:py-20 xl:px-28">
      <div
        className="text-white md:rounded-[24px] rounded-[12px]"
        style={{ backgroundColor: freeSimColors[comp].bgColor }}
      >
        <div className="md:py-24 py-12 containerX mx-auto">
          <SectionHeader
            heading={t("kolInfo.heading")}
            headingClassName={`${headingColor}`}
            midHeading={t("loveFreeSim.sectionSubHeading")}
            midHeadingClass={`text-[${textColor}] mt-5 md:text-[26px] text-[20px] whitespace-pre-line`}
          />
          {/* <h2 className="text-center text-2xl md:text-3xl font-bold text-white mb-6 mt-[10px]">
                        {t("kolInfo.pocketWifi")}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 md:px-15 px-8">
                        {[
                            {
                                img: <img src={useDynamicImages("others", "speedometer")} alt="Speed" className="h-12 w-12" />,
                                text: t(`kolInfo.speed`),
                            },
                            {
                                img: <img src={useDynamicImages("others", "thunder")} alt="Thunder" className="h-12 w-12" />,
                                text: t(`kolInfo.activation`),
                            },
                            {
                                img: <img src={useDynamicImages("others", "iphone")} alt="iPhone" className="h-12 w-12" />,
                                text: t(`kolInfo.compatiblephones`),
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white text-[#191919] rounded-[12px] md:p-5 p-3 md:h-[174px] h-[136px] flex flex-col justify-between"
                            >
                                <div className="w-full pl-6">{item.img}</div>
                                <p className="text-base md:text-lg font-semibold md:h-20 sm:h-16">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div> */}
          <h2 className="text-center text-2xl md:text-3xl font-bold text-white mt-10">
            {t("kolInfo.esim")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 md:px-15 px-8">
            {[
              {
                img: (
                  <img
                    src={useDynamicImages("others", "free")}
                    alt="Free"
                    className="h-12 w-12"
                  />
                ),
                text: t("kolInfo.absolutelyfree"),
              },
              {
                img: (
                  <img
                    src={useDynamicImages("others", "tick")}
                    alt="Tick"
                    className="h-12 w-10"
                  />
                ),
                text: t("loveFreeSim.network"),
              },
              {
                img: (
                  <img
                    src={useDynamicImages("others", "earth")}
                    alt="Earth"
                    className="h-12 w-12"
                  />
                ),
                text: t("kolInfo.rechargeanytime"),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white text-[#191919] rounded-[12px] md:p-5 p-3 md:h-[174px] h-[136px] flex flex-col justify-between"
              >
                <div className="w-full pl-6">{item.img}</div>
                <p className="text-base md:text-lg font-semibold md:h-20 sm:h-16">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KolWhyFreeSim;
