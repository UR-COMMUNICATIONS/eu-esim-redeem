import { Button } from "@/components/ui/button";
import { DiscountBGIcon, PhoneIcon } from "@/services";
import { qrcode } from "@/services/images";
import { setDownloadAppDialogOpen } from "@/store/module/shared/sharedSlice";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage"; 

function DiscountDownloadApp({}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { supportQrcode } = useUserLocationLanguage() 

  return (
    <div className="relative overflow-hidden rounded-2xl bg-main-600">
      <div className="px-8 py-10 text-white flex flex-col sm:flex-row md:flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 md:items-start lg:items-center justify-between relative z-10">
        <div className="w-full flex flex-col gap-3">
          <h2 className="text-xl font-semibold uppercase text-status-alert">
            {t("discountDownloadApp.title")}
          </h2>
          <h3 className="text-5xl font-extrabold">
            {t("discountDownloadApp.percentage")}
          </h3>
          <p className="text-base leading-[140%]">
            {t("discountDownloadApp.description")}
          </p>
        </div>
        <div className="w-full max-w-[200px] flex flex-col gap-4 sm:items-end md:items-start lg:items-end">
          <div className="w-20 h-20">
            <img src={supportQrcode} alt="" className="w-full h-full object-contain" />
          </div>
          <Button
            variant="secondary"
            className="py-4"
            onClick={() => dispatch(setDownloadAppDialogOpen(true))}
          >
            <PhoneIcon className="!w-5 !h-5" />
            <span>{t("buttonText.downloadApp")}</span>
          </Button>
        </div>
      </div>

      <div className="absolute right-0 top-0 z-0">
        <DiscountBGIcon className="xl:h-full lg:h-[350px] md:h-[400px] sm:h-full h-[400px]" />
      </div>
    </div>
  );
}

export default DiscountDownloadApp;
