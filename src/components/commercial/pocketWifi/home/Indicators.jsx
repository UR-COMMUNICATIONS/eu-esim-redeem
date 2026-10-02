import InfoCard from "@/components/shared/cards/InfoCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import useDynamicImages from "@/hooks/useDynamicImages";
import { useTranslation } from "react-i18next";

function Indicators() {
  const { t } = useTranslation();

  return (
    <section className="sec_common_60">
      <div className="containerX">
        <SectionHeader
          heading={t("pocketWifi.ledIndicators.heading")}
          subHeading={t("pocketWifi.ledIndicators.subHeading")}
          containerClassName="gap-4"
        />
        <div className="flex flex-col md:flex-row md:items-center gap-6 sm:gap-10 lg:gap-15  mt-6  sm:mt-10 md:mt-15">
          <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-6">
            <InfoCard
              title={t("pocketWifi.ledIndicators.content.capacity.title")}
              description={t(
                "pocketWifi.ledIndicators.content.capacity.description"
              )}
              icon={useDynamicImages("indicators", "charging")}
            // icon={images.charging}
            />
            <InfoCard
              title={t("pocketWifi.ledIndicators.content.charging.title")}
              description={t(
                "pocketWifi.ledIndicators.content.charging.description"
              )}
              icon={useDynamicImages("indicators", "battery")}
            // icon={images.battery}
            />
          </div>
          <div className="w-full md:max-w-[474px] md:p-6">
            <div className="flex flex-col gap-6 divide-y divide-neutral-300">
              <p className="text-sm sm:text-base md:text-lg text-black-600 sm:px-4">
                {t("pocketWifi.ledIndicators.content.support")}
              </p>
              <p className="text-sm sm:text-base md:text-lg text-black-600 sm:px-4 pt-6">
                {t("pocketWifi.ledIndicators.content.systemUpdateNote")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Indicators;
