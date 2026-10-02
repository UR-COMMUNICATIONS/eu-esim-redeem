import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { qrcode } from "@/services/images";
import { useTranslation } from "react-i18next";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import useDynamicImages from "@/hooks/useDynamicImages";

const AppDownloadDialog = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const { supportQrcode } = useUserLocationLanguage()

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent
        showCloseIcon={true}
        className={cn(
          "bg-main-600 w-[calc(100vw-32px)] max-w-[540px] h-auto min-h-[286px] sm:min-h-[438px] rounded-xl md:rounded-3xl flex flex_center flex-col px-4 md:px-8 lg:px-[60px] pt-10 md:pt-[60px] pb-6 md:pb-[60px] gap-6 md:gap-12 border-0 ring-0 outline-0"
        )}
      >
        <DialogTitle className={"hidden"} />

        <div className="w-full max-w-[400px] md:max-w-[650px] mb-9 md:mb-0 px-0 relative z-[3]">
          <h2 className="text-xl md:text-3xl md:font-semibold text-status-alert leading-[120%] md:uppercase">
            {t("downloadYooWifi.downloadText")}
          </h2>
          <h3 className="text-6xl md:text-[5rem] font-bold md:font-extrabold text-white mt-1 md:mt-4">
            Yoowifi
          </h3>
          <p className="text-base md:text-xl text-white">
            {t("downloadYooWifi.ctaText")}
          </p>
          <div className="mt-10 flex flex-row items-center md:items-start lg:items-center gap-4 md:gap-10">
            <div className="flex flex-col gap-2 md:gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.urwifi.com"
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                <img
                  src={useDynamicImages("others", "google-play")}
                  alt="google play"
                  className="w-[160px] md:w-[210px] h-auto"
                />
              </a>
              <a
                href="https://apps.apple.com/sg/app/id1632273383"
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                <img
                  src={useDynamicImages("others", "apple-store")}
                  alt="google play"
                  className="w-[160px] md:w-[210px] h-auto"
                />
              </a>
            </div>
            <div>
              <img
                src={supportQrcode}
                alt="google play"
                className="w-[110px] md:w-[160px] aspect-square"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppDownloadDialog;
