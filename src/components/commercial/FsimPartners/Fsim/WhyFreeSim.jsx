import SectionHeader from "@/components/shared/others/SectionHeader";
import useDynamicImages from "@/hooks/useDynamicImages";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const WhyFreeSim = ({
  bgColor = "#CEF5FF",
  textColor = "#4F4F4F",
  headingColor = "text-black",
}) => {
  const { t } = useTranslation(["translation", "english", "local"]);

  const { brand } = useParams();
  const comp = brand?.toLowerCase();

  // const loveFreeSim = t(`loveFreeSim`, { returnObjects: true });
  // const heading = comp == "astindo" ? loveFreeSim.astindo.heading : loveFreeSim.heading

  const loveFreeSim = t(`loveFreeSim`, { returnObjects: true });
  const loveFreeSimData = Object.assign(loveFreeSim.default, loveFreeSim[comp]);

  const {
    heading,
    sectionSubHeading,
    speed,
    activation,
    compatiblephones,
    absolutelyfree,
    network,
    rechargeanytime,
  } = loveFreeSimData;

  // console.log("comp", comp);
  // console.log("loveFreeSimData", loveFreeSimData);

  const freeSimColors = {
    jtb: {
      bgColor: "#CEF5FF",
      textColor: "#4F4F4F",
      headingColor: "text-black",
    },
    airasia: {
      bgColor: "#ef4141",
      textColor: "#FFFFFF",
      headingColor: "text-white",
    },
    cny: {
      bgColor: "#ef4141",
      textColor: "#FFFFFF",
      headingColor: "text-white",
    },
    astindo: {
      bgColor: "#CEF5FF",
      textColor: "#4F4F4F",
      headingColor: "text-black",
    },
    default: {
      bgColor: "#CEF5FF",
      textColor: "#4F4F4F",
      headingColor: "text-black",
    },
  };

  const fsimbgColor = freeSimColors[comp] || freeSimColors["default"];
  // console.log("fsimbgColor", fsimbgColor);

  return (
    <div className="sec_common_80 md:py-20 xl:px-28">
      {/* <div className="bg-[#CEF5FF] text-white rounded-[12px] "> */}
      {/* <div className={`text-white rounded-[12px] bg-[${bgColor}]`}> */}
      <div
        className="text-white md:rounded-[24px] rounded-[12px]"
        // style={{ backgroundColor: freeSimColors[comp].bgColor }}>
        style={{ backgroundColor: fsimbgColor?.bgColor }}
      >
        <div className="md:py-24 py-12 containerX mx-auto">
          <SectionHeader
            // heading={t("loveFreeSim.heading")}
            heading={heading}
            headingClassName={`${headingColor}`}
            midHeading={sectionSubHeading}
            // headingClassName='text-black'
            // midHeading={t(
            //     "loveFreeSim.sectionSubHeading"
            // )}
            // midHeadingClass='text-[#4F4F4F] mt-5 md:text-[26px] text-[20px] whitespace-pre-line'
            midHeadingClass={`text-[${textColor}] mt-5 md:text-[26px] text-[20px] whitespace-pre-line`}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 md:mt-16 md:px-15 px-8">
            {[
              {
                img: (
                  <img
                    src={useDynamicImages("others", "speedometer")}
                    alt="Speed"
                    className="h-12 w-12"
                  />
                ),
                text: speed,
                // text: t(`loveFreeSim.speed`)
              },
              {
                img: (
                  <img
                    src={useDynamicImages("others", "thunder")}
                    alt="thunder"
                    className="h-12 w-12"
                  />
                ),
                text: activation,
                // text: t(`loveFreeSim.activation`),
              },
              {
                img: (
                  <img
                    src={useDynamicImages("others", "iphone")}
                    alt="iphone"
                    className="h-12 w-12"
                  />
                ),
                text: compatiblephones,
                // text: t(`loveFreeSim.compatiblephones`),
              },
              {
                img: (
                  <img
                    src={useDynamicImages("others", "free")}
                    alt="free"
                    className="h-12 w-12"
                  />
                ),
                text: absolutelyfree,
                key: "absolutelyfree",
                // text: t("loveFreeSim.absolutelyfree"),
              },
              {
                img: (
                  <img
                    src={useDynamicImages("others", "tick")}
                    alt="tick"
                    className="h-12 w-10"
                  />
                ),
                text: network,
                // text: t("loveFreeSim.network"),
              },
              {
                img: (
                  <img
                    src={useDynamicImages("others", "earth")}
                    alt="earth"
                    className="h-12 w-12"
                  />
                ),
                text: rechargeanytime,
                // text: t("loveFreeSim.rechargeanytime"),
              },
            ]
              .filter((item) =>
                comp !== "sindoferry" ? item : item.key !== "absolutelyfree",
              )
              .map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white text-[#191919] rounded-[12px] md:p-5 p-3 md:h-[174px] h-[136px] flex flex-col justify-between"
                  style={{ opacity: 1 }}
                >
                  <div className="w-full pl-6">
                    <div className="w-auto h-auto bg-contain ">{item.img}</div>
                  </div>
                  <p className="text-base md:text-lg font-semibold md:h-20 sm:h-16 ">
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

export default WhyFreeSim;
