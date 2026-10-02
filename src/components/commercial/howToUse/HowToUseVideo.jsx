import SectionHeader from "@/components/shared/others/SectionHeader";
import Video from "@/components/shared/others/Video";
import { VIDEO_BASE_URL } from "@/constants/urls";
import { useTranslation } from "react-i18next";

function HowToUseVideo({ videoName, heading, subHeading }) {
  const { t } = useTranslation();

  // Default video if none provided (fallback to YouTube)
  const defaultVideoSrc = "https://www.youtube.com/embed/v4iNm8kI_QU";

  // Construct full video URL from base URL and video name
  const videoSrc = videoName
    ? `${VIDEO_BASE_URL}/${videoName}`
    : defaultVideoSrc;

  return (
    <section className="sec_common_60">
      <div className="containerX">
        <SectionHeader
          heading={heading || "How to Buy & Activate a SIM/eSIM"}
          // subHeading={subHeading || t("sim.howToSetup.howToBuysubHeading")}
          containerClassName="gap-4 md:mb-[60px] mb-[30px]"
        />
        <div className="md:h-[677px] h-auto">
          <Video
            src={videoSrc}
            title={t("sim.howToSetup.videoTitle") || "How to use SIM card"}
          />
        </div>
      </div>
    </section>
  );
}

export default HowToUseVideo;
