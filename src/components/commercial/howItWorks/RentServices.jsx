import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { rentServicesData } from "@/services";
import React from "react";
import { useTranslation } from "react-i18next";

const RentServices = () => {
  const { nameSpace } = useUserLocationLanguage()
  const { t } = useTranslation(["translation", "english", "local"])

  return (
    <section className="container3X sec_common_80 xl:!px-0">
      <div className="bg-[#ECECEC] rounded-xl md:rounded-3xl">
        <div className="sec_common_80">
          <div className="containerX">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {rentServicesData.map((data, index) => (
                <article
                  key={index}
                  className="px-4 py-8 md:py-6  bg-white rounded-2xl"
                >
                  <span className="shrink-0 flex justify-center">
                    {data.icon()}
                  </span>

                  <h5 className="text-[18px] xl:text-2xl font-semibold xl:font-bold leading-[140%] text-center text-black-900 mt-4 md:mt-6 mb-4">
                    {/* {t(`howItWorksPage.rentServices.${index}.title`) || data.title} */}
                    {t(`${nameSpace}:howItWorksPage.rentServices.${index}.title`)}
                  </h5>

                  <p className="text-black-700 text-sm xl:text-[16px] text-center">
                    {/* {t(`howItWorksPage.rentServices.${index}.description`) || data.description} */}
                    {t(`${nameSpace}:howItWorksPage.rentServices.${index}.description`)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentServices;
