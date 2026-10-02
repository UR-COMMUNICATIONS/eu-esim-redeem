import SectionHeader from "@/components/shared/others/SectionHeader";
import VideoPlayer from "@/components/shared/others/VideoPlayer";
import { Button } from "@/components/ui/button";
import useModal from "@/hooks/useModal";
import { cn } from "@/lib/utils";
import React from "react";
import { commercialRoutes, rentWifiData } from "@/services";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RentYooWifi = () => {
  const { setAppDownloadDialogOpen } = useModal();
  const { t } = useTranslation();

  return (
    <section id="rent" className="containerX">
      <div className="sec_common_80 xl:!px-0">
        <SectionHeader
          heading={t("howItWorksPage.rentWifiSection.sectionHeader.heading")}
          subHeading={t(
            "howItWorksPage.rentWifiSection.sectionHeader.subHeading"
          )}
        />

        <div className="grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[76px] mt-10">
          <div className=" grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-6 order-2 lg:order-1">
            {rentWifiData.map(
              ({ step, title, description, buttonText, icon }, index) => (
                <div
                  key={index}
                  className={cn(
                    "border border-neutral-300 rounded-xl md:rounded-3xl px-4 py-6 md:px-6 mb-6",
                    index === 0 && "lg:col-span-2"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm md:text-base font-semibold leading-[120%] text-main-600">
                        {t(
                          `howItWorksPage.rentWifiSection.rentWifiData.${index}.step`
                        ) || step}
                      </p>
                      <h5 className="text-[18px] md:text-2xl font-semibold md:font-bold leading-[140%] mt-2 md:mt-4">
                        {t(
                          `howItWorksPage.rentWifiSection.rentWifiData.${index}.title`
                        ) || title}
                      </h5>
                    </div>
                    {buttonText && (
                      <Button
                        className="!w-[180px] !h-[40px] !text-sm !font-medium items-center gap-x-1 hidden md:flex"
                        onClick={() => setAppDownloadDialogOpen(true)}
                      >
                        {t(
                          `howItWorksPage.rentWifiSection.rentWifiData.${index}.buttonText`
                        ) || buttonText}
                        {icon()}
                      </Button>
                    )}
                  </div>

                  <p className="text-black-600 text-[18px] leading-[140%] mt-4">
                    {t(
                      `howItWorksPage.rentWifiSection.rentWifiData.${index}.description`
                    ) || description}
                  </p>

                  {buttonText && (
                    <Button
                      className="!w-[167px] !h-[32px] !text-sm !font-medium items-center gap-x-1 flex md:hidden mt-4"
                      onClick={() => setAppDownloadDialogOpen(true)}
                    >
                      {t(
                        `howItWorksPage.rentWifiSection.rentWifiData.${index}.buttonText`
                      ) || buttonText}
                      {icon()}
                    </Button>
                  )}
                </div>
              )
            )}

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 w-full lg:col-span-2 mt-2 lg:mt-0">
              <Link
                to={commercialRoutes.pickDropLocation.path}
                className="flex-1 w-full"
              >
                <Button className="w-full h-11 md:h-[52px]">
                  {t("howItWorksPage.rentWifiSection.links.0.title")}
                </Button>
              </Link>

              <Link
                to={commercialRoutes.contact.path}
                className="flex-1 w-full"
              >
                <Button className="w-full h-11 md:h-[52px]" variant="secondary">
                  {t("howItWorksPage.rentWifiSection.links.1.title")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentYooWifi;
