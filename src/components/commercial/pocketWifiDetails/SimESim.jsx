import SectionHeader from "@/components/shared/others/SectionHeader";
import { Button } from "@/components/ui/button";
import { commercialRoutes, images, PhoneIcon } from "@/services";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useModal from "@/hooks/useModal";
import { useNavigate } from "react-router-dom";
import useDynamicImports from "@/hooks/useDynamicImports";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { Suspense } from "react";


const SimESim = ({ type }) => {
  const { currentCountry, nameSpace } = useUserLocationLanguage();
  const isTargetCountry = currentCountry === "jp";
  const { t } = useTranslation();
  const { setAppDownloadDialogOpen } = useModal();
  const navigate = useNavigate();

  const handleNext = (event) => {
    if (type === "S") {
      navigate(commercialRoutes.simRegion.path);
      // } else if (isTargetCountry) {
      //   navigate(commercialRoutes.productInternetPackages.path);
    } else {
      navigate(commercialRoutes.pocketWifiRegion.path);
    }
  };
  const path = "&/countries/{currentCountry}/src/components/commercial/pocketWifiDetails/SimESimImg.jsx";
  const LazyLoadImage_Dynamic = useDynamicImports(path);

  return (
    <section className="sec_common_60">
      {/* <SectionHeader
        // subHeading={t("pocketWifiDetails.sim.subHeading")}
        heading={type === "S" ? t("pocketWifiDetails.sim.heading") : t("pocketWifiDetails.device.heading")}
        // containerClassName=' bg-red-500 pl-[0px]'
        // headingClassName={`${
        //   type === "S" ? "md:pl-[100px]" : "md:pl-[160px]"
        // }`}
      /> */}
      <div className="containerX min-h-[430px] flex flex-col md:flex-row gap-9 md:gap-[60px] mt-4 md:mt-[0px]">
        <div className="w-full md:w-2/5 min-h-[328px] md:min-h-full relative overflow-visible md:bg-transparent bg-neutral-100 rounded-[10px]">
          {/* <LazyLoadImage
            src={type === "S" ? images.pocketWifiSimRed2 : images.japanDeviceGrey}
            height={1000}
            width={1000}
            className="absolute_center object-cover max-w-[260px] max-h-[260px] sm:max-w-[320px] sm:max-h-[320px] md:max-w-[460px] md:max-h-[460px]"
            alt={type === "S" ? "Pocket Wifi SIM" : "Device Image"}
          /> */}
          <Suspense fallback={<div>Loading...</div>}>
            {LazyLoadImage_Dynamic ?
              <LazyLoadImage_Dynamic type={type} />
              : null}
          </Suspense>
        </div>

        <div className="w-full md:w-3/5 flex flex-col justify-start md:pt-10">
          <h2 className="text-black-900 md:text-[60px] text-[30px] !leading-[1.4] font-semibold md:font-bold md:flex justify-center md:justify-start">
            {type === "S" ? t(`${nameSpace}:pocketWifiDetails.sim.heading`) : t("pocketWifiDetails.device.heading")}
          </h2>

          <p className="p_common mt-2 md:mt-4">
            {type === "S" ? (
              t(`${nameSpace}:pocketWifiDetails.sim.description.content`)
            ) : (
              <>
                <strong className="text-black">{t("pocketWifi.product.descriptionHighlight")}</strong>
                {' '}{t("pocketWifi.product.description")}
              </>
            )}
          </p>
          <div className="flex items-center justify-center md:justify-start gap-3 mt-6 md:mt-8">
            <Button
              variant="secondary"
              size="lg"
              className="h-11 md:h-[52px] rounded-xl"
              onClick={(event) => handleNext(event)}
            >
              {t("buttonText.viewPlans")}
            </Button>
            <Button
              className={
                "h-11 md:h-[52px] border border-main-600 text-main-600 text-sm md:text-base font-semibold !leading-[1.2] rounded-[10px]"
              }
              size="sm"
              variant="outlined"
              onClick={() => setAppDownloadDialogOpen(true)}
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
