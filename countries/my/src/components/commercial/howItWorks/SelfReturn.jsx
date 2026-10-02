import SectionHeader from "@/components/shared/others/SectionHeader";
import VideoPlayer from "@/components/shared/others/VideoPlayer";
import { Button } from "@/components/ui/button";
import { commercialRoutes, selfReturnData } from "@/services";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";

const SelfReturn = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(["translation", "english", "local"])
  const { isTargetCountry, nameSpace } = useUserLocationLanguage();
  console.log('nameSpace nameSpace', nameSpace);

  return (
    <section className="containerX" id="self-return">
      <div className="sec_common_60">
        <SectionHeader
          heading={t("howItWorksPage.selfReturnSection.sectionHeader.heading")}
          subHeading={t(
            "howItWorksPage.selfReturnSection.sectionHeader.subHeading"
          )}
        />

        <div className="mt-4 md:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-10 xl:gap-[76px]">
          <VideoPlayer
            videoUrl="https://www.youtube.com/embed/4-GrURIe-7E"
          />
          <div>
            <div className="space-y-3 md:space-y-6">
              {selfReturnData.map((item, index) => (
                <article
                  key={index}
                  className="flex items-center gap-2 md:gap-4 lg:gap-8"
                >
                  <div className="shirnk-0 w-10 h-10 rounded-[100px] border border-neutral-300 flex items-center justify-center font-semibold text-main-600">
                    {index + 1}
                  </div>

                  <div className="border border-neutral-300 rounded-xl md:rounded-3xl p-4 md:p-6 space-y-4 md:space-y-3 flex-1">
                    <h5 className="text-[18px] md:text-2xl font-semibold md:font-bold text-black-900 leading-[140%]">
                      {t(
                        `howItWorksPage.selfReturnSection.selfReturnData.${index}.title`
                      ) || item.title}
                    </h5>

                    <p className="text-black-600 text-sm md:text-[18px] leading-[140%]">
                      {t(
                        `howItWorksPage.selfReturnSection.selfReturnData.${index}.description`
                      ) || item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-4 md:mt-8 flex gap-x-4 md:ml-[72px]">
              <Link
                to={commercialRoutes.pickDropLocation.path}
                className="flex-1"
              >
                <Button className="!h-11 md:!h-[52px] w-full">
                  {t("buttonText.dropOffLocations")}
                </Button>
              </Link>
              <Link
                to={commercialRoutes.pickDropLocation.path}
                className="flex-1"
              >
                <Button
                  variant="secondary"
                  className="!h-11 md:!h-[52px] w-full"
                  onClick={() => navigate("/contact")}
                >
                  {t("buttonText.contactUs")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelfReturn;
