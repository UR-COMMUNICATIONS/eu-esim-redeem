import { images } from "@/services";
import React from "react";
import { useTranslation } from "react-i18next";
import useDynamicImages from "@/hooks/useDynamicImages";

const StayConnectedEverywhere = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-main-600">
      <div className="sec_common_80">
        <div className="containerX ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:items-center lg:items-start gap-4 lg:gap-10">
            <div className="space-y-1 md:space-y-6 lg:col-span-2">
              <h2 className="text-5xl lg:text-6xl text-white font-black leading-[110%] lg:leading-[120%] uppercase">
                {t("stayConnectedCTA.heading")}
              </h2>
              <h3 className="text-[18px] lg:text-5xl leading-[140%] lg:leading-[120%] font-black uppercase text-status-alert">
                {t("stayConnectedCTA.subHeading")}
              </h3>
              <h5 className="text-sm lg:text-2xl text-white leading-[140%] lg:leading-normal max-w-[312px] sm:max-w-[712px]">
                {t("stayConnectedCTA.description")}
              </h5>
            </div>

            <div className="relative flex justify-center lg:justify-start">
              <div className="w-[255px] h-[255px] lg:w-[383px] lg:h-[383px] translate-x-8 lg:translate-x-0">
                <img
                  src={useDynamicImages("others", "pocket-wifi-sim-japan" )}
                  alt="wifi"
                  className="transform  w-full h-full"
                />
              </div>

              {/* <div className="w-[153px] h-[153px] lg:w-[231px] lg:h-[231px] absolute bottom-6 -translate-x-[54px]">
                <img
                  src={images.sim1}
                  alt="sim"
                  className="w-full h-full object-contain"
                />
              </div> */}

              <div className="w-[99px] h-[54px] lg:w-[150px] lg:h-[83px] absolute top-0 -translate-x-28 translate-y-8 lg:translate-y-16">
                <img
                  src={useDynamicImages("others", "cloud" )}
                  alt="cloud"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="w-[74px] h-[35px] lg:w-[112px] lg:h-[53px] absolute top-0 translate-x-28 lg:translate-x-[188px] xl:translate-x-60 -translate-y-3.5 lg:-translate-y-10">
                <img
                  src={useDynamicImages("others", "cloud" )}
                  alt="cloud"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StayConnectedEverywhere;
