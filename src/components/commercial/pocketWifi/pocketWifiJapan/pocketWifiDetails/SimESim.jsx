import SectionHeader from "@/components/shared/others/SectionHeader";
import { Button } from "@/components/ui/button";
import { images, PhoneIcon } from "@/services";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useDynamicImages from "@/hooks/useDynamicImages";

const SimESim = () => {
  const { t } = useTranslation();

  return (
    <section className="sec_common_60">
      <SectionHeader
        heading={t("pocketWifiDetails.sim.heading")}
        subHeading={t("pocketWifiDetails.sim.subHeading")}
      />

      <div className="containerX min-h-[430px] flex flex-col md:flex-row gap-9 md:gap-[60px] mt-4 md:mt-[60px]">
        <div className="w-full md:w-2/5 min-h-[328px] md:min-h-full relative overflow-visible">
          <LazyLoadImage
            src={images.redSimRedShadow}
            height={1000}
            width={1000}
            className="absolute_center top-[60%] max-h-[460px] max-w-[460px] object-cover"
          />
        </div>

        <div className="w-full md:w-3/5 flex flex-col justify-center">
          <h2 className="text-black-900 text-lg md:text-4xl !leading-[1.4] font-semibold md:font-bold">
            {t("pocketWifiDetails.sim.description.title")}
          </h2>
          <p className="p_common mt-2 md:mt-4">
            {t("pocketWifiDetails.sim.description.content")}
          </p>

          <div className="flex items-center justify-center md:justify-start gap-3 mt-6 md:mt-8">
            <Button
              variant="secondary"
              size="lg"
              className="h-11 md:h-[52px] rounded-xl"
            >
              {t("buttonText.viewSimESim")}
            </Button>
            <Button
              className={
                "h-11 md:h-[52px] border border-main-600 text-main-600 text-sm md:text-base font-semibold !leading-[1.2] rounded-[10px]"
              }
              size="sm"
              variant="outlined"
            >
              <PhoneIcon className="!w-5 !h-5" color="#D81F22" />
              <span>{t("buttonText.downloadApp")}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimESim;
