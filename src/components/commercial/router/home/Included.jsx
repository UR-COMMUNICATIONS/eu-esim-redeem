import InfoCard from "@/components/shared/cards/InfoCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { PowerAdapterIcon, RouterIcon } from "@/services";
import { useTranslation } from "react-i18next";

function Included() {
  const { t } = useTranslation();

  return (
    <section className="sec_common_60">
      <div className="containerX">
        <SectionHeader
          heading={t("router.whatsIncluded.heading")}
          subHeading={t("router.whatsIncluded.subHeading")}
          containerClassName="gap-4"
        />
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-6  mt-6 sm:mt-10 md:mt-15">
          <InfoCard
            wrapperClass="w-full bg-neutral-200"
            title={t("router.whatsIncluded.includedList.0")}
          >
            <div className="w-15 sm:w-20 aspect-square flex items-center justify-center bg-white rounded-xl">
              <RouterIcon className="w-10 sm:w-14" />
            </div>
          </InfoCard>
          <InfoCard
            wrapperClass="w-full bg-neutral-200"
            title={t("router.whatsIncluded.includedList.1")}
          >
            <div className="w-15 sm:w-20 aspect-square flex items-center justify-center bg-white rounded-xl">
              <PowerAdapterIcon className="w-10 sm:w-14" />
            </div>
          </InfoCard>
        </div>
      </div>
    </section>
  );
}

export default Included;
