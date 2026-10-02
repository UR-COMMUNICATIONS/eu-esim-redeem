import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const WhatWeDoCorporate = () => {
  const { whatWeDo } = useSelector((state) => state.pocketWifi);
  const { t } = useTranslation();

  return (
    <section className="sec_common_60 ">
      <div className="container2X ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-4 lg:gap-y-6">
          {whatWeDo.map((_, index) => (
            <article key={index} className="p-0 lg:p-6">
              <h4 className="text-[18px] lg:text-[28px] font-semibold lg:font-bold leading-[140%] lg:leading-[110%] text-black-900">
                {t(`pocketWifi.whatWeDo.${index}.title`)}
              </h4>
              <div className="my-2 lg:my-6 border-b border-neutral-200"></div>
              <p className="text-black-600 leading-[140%] lg:leading-[150%] text-sm lg:text-base">
                {t(`pocketWifi.whatWeDo.${index}.content`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoCorporate;
