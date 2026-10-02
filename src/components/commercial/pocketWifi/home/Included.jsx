import InfoCard from "@/components/shared/cards/InfoCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { ChargingCable, DevicePouch, PowerIcon } from "@/services";
import { useTranslation } from "react-i18next";

function Included() {
  const { t } = useTranslation();

  return (
    <section className="sec_common_60">
      <div className="containerX">
        <SectionHeader
          heading={t("pocketWifi.whatsIncluded.heading")}
          subHeading={t("pocketWifi.whatsIncluded.subHeading")}
          containerClassName="gap-4"
        />
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 md:gap-15  mt-6 sm:mt-10 md:mt-15">
          <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-6">
            <InfoCard
              title={t("pocketWifi.whatsIncluded.includedList.chargingCable")}
            >
              <div className="w-15 sm:w-20 aspect-square flex items-center justify-center bg-white rounded-xl">
                <ChargingCable className="w-10 sm:w-14" />
              </div>
            </InfoCard>
            <InfoCard
              title={t("pocketWifi.whatsIncluded.includedList.devicePouch")}
            >
              <div className="w-15 sm:w-20 aspect-square flex items-center justify-center bg-white rounded-xl">
                <DevicePouch className="w-10 sm:w-14" />
              </div>
            </InfoCard>
          </div>
          <div className="w-full sm:max-w-[474px]">
            <h4 className="text-lg sm:text-xl md:text-2xml text-black-900 font-bold">
              {t("pocketWifi.whatsIncluded.includedList.quickstart")}
            </h4>
            <div className="flex flex-col gap-6 divide-y divide-neutral-300 mt-6 sm:mt-8 md:mt-10">
              <div className="flex gap-4">
                <PowerIcon className="w-10 h-10 sm:w-15 sm:h-15" />
                <div className="flex flex-col gap-2">
                  <h5 className="text-base sm:text-lg md:text-2xl font-bold text-black-700 leading-[140%]">
                    {t("pocketWifi.whatsIncluded.includedList.powerOn")}
                  </h5>
                  <p className="text-sm sm:text-base md:text-lg text-black-600">
                    {t("pocketWifi.whatsIncluded.includedList.pressNote")}
                  </p>
                </div>
              </div>
              <div className="flex pt-6 gap-4">
                <PowerIcon
                  className="w-10 h-10 sm:w-15 sm:h-15"
                  color="#D81F22"
                />
                <div className="flex flex-col gap-2">
                  <h5 className="text-base sm:text-lg md:text-2xl font-bold text-black-700 leading-[140%]">
                    {t("pocketWifi.whatsIncluded.includedList.powerOff")}
                  </h5>
                  <p className="text-sm sm:text-base md:text-lg text-black-600">
                    {t("pocketWifi.whatsIncluded.includedList.pressNote")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Included;
