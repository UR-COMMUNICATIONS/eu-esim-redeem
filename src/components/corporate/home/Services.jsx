import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Services = () => {
  const { services } = useSelector((state) => state.pocketWifi);
  const { t } = useTranslation();

  return (
    <section className="px-4">
      <div className="container3X sec_common_80 bg-[#ECECEC] rounded-3xl cursor-default">
        <div className="containerX  lg:px-0">
          <div className="grid grid-cols-1 dm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((item, index) => (
              <article
                key={index}
                className="px-4 py-8 bg-white rounded-xl lg:rounded-2xl flex flex-col items-center justify-center hover:opacity-80"
              >
                {item.icon()}

                <h6 className="text-[18px] my-4 lg:mt-6 lg:mb-4 text-center text-black-900 font-semibold leading-[140%]">
                  {t(`pocketWifi.services.${index}.title`)}
                </h6>

                <p className="text-sm lg:text-base text-center text-black-600 leading-[140%] lg:leading-[150%]">
                  {t(`pocketWifi.services.${index}.content`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
