import { Button } from "@/components/ui/button";
import { commercialRoutes, images } from "@/services";
import { servicesData } from "@/services/data";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import useDynamicImports from "@/hooks/useDynamicImports";
import { Suspense } from "react";
import useDynamicImages from "@/hooks/useDynamicImages";

const WhyYoowifi = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const path =
    "&/countries/{currentCountry}/src/components/commercial/home/WhyYoowifiImg.jsx";
  const LazyLoadImage_Dynamic = useDynamicImports(path);

  return (
    <section className="sec_common_60 bg-white px-4 min-[1176px]:px-0">
      <div className="containerX flex flex-col-reverse md:flex-row gap-6 md:gap-10 xl:gap-[60px]">
        {/* <div className="w-full md:w-1/2 min-[950px]:w-2/5 overflow-visible">
          <LazyLoadImage
            src={useDynamicImages("others", "pocket-wifi-sim-japan" )}
            height={2000}
            width={2000}
            alt="why choose us"
            className="min-w-full min-h-full object-cover"
          />
        </div> */}
        <Suspense fallback={<div>Loading...</div>}>
          {LazyLoadImage_Dynamic ? <LazyLoadImage_Dynamic /> : null}
        </Suspense>

        <div className="w-full md:w-1/2 min-[950px]:w-3/5 flex flex-col justify-center items-start gap-4 md:gap-9">
          <h2 className="title text-center md:text-start w-full">
            {t("whyYooWifi.sectionHeading")}
          </h2>

          <div className="flex flex-col gap-2 md:gap-4">
            {servicesData().map(
              ({ _id, icon, image, imageApp, title }, index) => (
                <div key={_id} className="flex items-center gap-4">
                  <div className="flex_center bg-[#FFF1F1] rounded-full h-8 w-8 md:h-11 md:w-11">
                    {icon ? (
                      icon
                    ) : (
                      <>
                        <img
                          src={useDynamicImages("others", image || "")}
                          alt={`Service ${_id}`}
                          title={`Service ${_id}`}
                          className="md:h-8 md:w-8 h-5 w-5 object-contain"
                        />
                        {/* <img
                          src={imageApp}
                          alt={`Service ${_id}`}
                          className="h-8 w-8 object-contain sm:hidden"
                        /> */}
                      </>
                    )}
                  </div>
                  <p className="text-sm md:text-lg !leading-[1.4] text-black-700">
                    {t(`whyYooWifi.servicesData.${index}.title`)}
                  </p>
                </div>
              ),
            )}
          </div>

          <Button
            variant={"secondary"}
            size={"lg"}
            className={"h-11 md:h-[52px] !text-base"}
            onClick={() => navigate(commercialRoutes.aboutUs.path)}
          >
            {t("buttonText.aboutUs")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyYoowifi;
