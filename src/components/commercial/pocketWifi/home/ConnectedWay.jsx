import SectionHeader from "@/components/shared/others/SectionHeader";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

function ConnectedWay() {
  // const data = [
  //   {
  //     title: "Buy Your Own Device",
  //     description:
  //       "Purchase a device for long-term, reliable connectivity whenever you need it.",
  //   },
  //   {
  //     title: "Rental",
  //     description:
  //       "Access reliable connectivity when you need it with flexible, short-term device rental options—ideal for trips, events, or temporary use.",
  //   },
  // ];

  const { t } = useTranslation();
  const data = t("pocketWifi.stayConnectedYourWay.ways", { returnObjects: true })

  return (
    <section className="sec_common_60">
      <div className="containerX">
        <SectionHeader
          heading={t(`pocketWifi.stayConnectedYourWay.heading`)}
          subHeading={t(`pocketWifi.stayConnectedYourWay.subHeading`)}
          containerClassName="gap-4"
        />
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-10 md:mt-15">
          {data.map((dat, index) => (
            <div className="p-4 sm:p-6 sm:pl-8 md:pl-10 rounded-xl sm:rounded-2xl border border-main-600 bg-main-100 flex flex-col gap-2 sm:gap-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-main-600">
                {/* {t(`pocketWifi.stayConnectedYourWay.ways.${index}.title`)} */}
                {dat.title}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-black-600 leading-[140%]">
                {/* {t(`pocketWifi.stayConnectedYourWay.ways.${index}.description`)} */}
                {dat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ConnectedWay;
