import SectionHeader from "@/components/shared/others/SectionHeader";
import { t } from "i18next";

function HowToGet() {
  const data = [
    {
      title: "Daily rate",
      description:
        "Our Pocket WiFi Monster Daily Plan, starting from just S$2.50/day, offers a choice between 3GB or 10GB of daily data, with speeds of up to 300Mbps.",
    },
    {
      title: "Fair usage policy (FUP)",
      description:
        "Each plan includes a specified daily data allowance, and once this limit is reached, your connection speed will be reduced.",
    },
  ];

  return (
    <section className="sec_common_60 mb-6 xl:mb-15">
      <div className="containerX">
        <SectionHeader
          heading={t(`eSimChina.getSim.title`)}
          subHeading={t(`eSimChina.getSim.titlefollow`)}
          containerClassName="gap-4"
          headingClassName="text-4xl"
        />
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-10 md:mt-15">
          {data.map((_, index) => (
            <div className="p-4 sm:p-6 sm:pl-8 md:pl-10 rounded-xl sm:rounded-2xl border border-main-200 flex flex-col gap-2 sm:gap-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-main-600">
                {t(`eSimChina.getSim.plans.${index}.title`)}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-black-600 leading-[140%]">
                {t(`eSimChina.getSim.plans.${index}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowToGet;
