import useDynamicImages from "@/hooks/useDynamicImages";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { YooWifiLogoIcon } from "@/services";
import { useTranslation } from "react-i18next";

function DownloadYoowifi() {
  const { t } = useTranslation();
  const { supportQrcode } = useUserLocationLanguage();

  return (
    <section className="bg-main-600 relative overflow-hidden">
      <YooWifiLogoIcon className="absolute top-1/2 left-0 -translate-y-1/2 z-[1] w-[326px] md:w-[880px] h-full" />
      <div className="w-full max-w-[1220px] mx-auto relative z-[3] sec_common_60 xl:px-0 bg-lime-500">
        <div className="w-full max-w-[400px] md:max-w-[650px] mb-9 md:mb-0 px-0 relative z-[3]">
          <p className="text-base md:text-3xl md:font-semibold text-status-alert leading-[120%] md:uppercase">
            {t("downloadYooWifi.downloadText")}
          </p>
          <h1 className="text-5xl md:text-[4rem] font-bold md:font-extrabold text-white mt-1 md:mt-4">
            Yoowifi App
          </h1>
          <p className="text-sm md:text-2xl text-white mt-2">
            {t("downloadYooWifi.ctaText")}
          </p>
          <div className="mt-10 flex flex-col md:flex-row items-start lg:items-center gap-4 md:gap-10">
            <div className="flex flex-col gap-2 md:gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.urwifi.com"
                target="_blank"
                rel="noopener noreferrer"
                className=""
                title="Google Play"
              >
                <img
                  src={useDynamicImages("others", "google-play")}
                  alt="google play"
                  title="Google Play"
                  className="w-[113px] md:w-[210px] h-auto"
                />
              </a>
              <a
                href="https://apps.apple.com/sg/app/id1632273383"
                target="_blank"
                rel="noopener noreferrer"
                className=""
                title="Apple Store"
              >
                <img
                  src={useDynamicImages("others", "apple-store")}
                  alt="Apple Store"
                  title="Apple Store"
                  className="w-[113px] md:w-[210px] h-auto"
                />
              </a>
            </div>
            <div>
              <img
                src={supportQrcode}
                alt="download qr code"
                title="Download QR Code"
                className="w-[60px] md:w-[160px] aspect-square"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-[1%] min-[1176px]:right-[0%] h-auto w-3/5 min-[500px]:w-1/2 md:w-2/5 lg:w-[40%] z-[2]">
          <img
            src={useDynamicImages("others", "download")}
            alt="Download YooWiFi App for iOS and Android"
            title="Download App"
            className="max-w-[481px] h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}

export default DownloadYoowifi;
