import { affiliateServiceData } from "@/services";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AffiliateService = () => {
  const { t } = useTranslation();

  return (
    <section className="container3X sec_common_80 xl:!px-0">
      <div className="bg-[#ECECEC] rounded-xl md:rounded-3xl -mt-[50px]">
        <div className="sec_common_80">
          <div className="containerX">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {affiliateServiceData.map((data, index) => (
                <article
                  key={index}
                  className="px-4 py-8 md:py-6 bg-white rounded-2xl"
                >
                  <span className="shrink-0 flex justify-center">
                    {data.icon()}
                  </span>

                  <h5 className="text-[18px] xl:text-2xl font-semibold xl:font-bold leading-[140%] text-center text-black-900 mt-4 md:mt-6 mb-4">
                    {t(`affiliate.affiliateServiceData.${index}.title`) ||
                      data.title}
                  </h5>

                  <p className="text-sm xl:text-[18px] text-center text-[#888888]">
                    {t(`affiliate.affiliateServiceData.${index}.description`) ||
                      data.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex_center mt-8 md:mt-16">
        <a
          href="https://forms.office.com/pages/responsepage.aspx?id=YQkYSh5Ja0-4yrtS2ujt_iL0xW0nZt9PhuJghqBawIRUNkxQUUE1T0EzSkxLMUlWUERZUEJSRVVWRC4u&route=shorturl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="lg" variant="secondary">
            {t(`affiliate.buttontittle`)}
          </Button>
        </a>
      </div>
    </section>
  );
};

export default AffiliateService;
