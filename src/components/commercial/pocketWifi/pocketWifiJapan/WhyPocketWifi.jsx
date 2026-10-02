import InfoCard from "@/components/shared/cards/InfoCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { images } from "@/services";
import { useTranslation } from "react-i18next";

function WhyPocketWifi() {
  const { t } = useTranslation();

  return (
    <section className="sec_common_60">
      <div className="container3X rounded-3xl px-6 md:px-12 lg:px-24 py-6 md:py-10 lg:py-15 bg-neutral-100">
        <SectionHeader
          heading={t("pocketWifiJapan.whyUse.title")}
          subHeading={t("pocketWifiJapan.whyUse.titlefollow")}
          headingClassName="text-4xl"
          containerClassName="gap-4"
        />
        <div className="flex flex-col md:flex-row md:items-center gap-6 sm:gap-10 lg:gap-15  mt-6  sm:mt-10 md:mt-15">
          <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-6">
            <InfoCard
              title={t("pocketWifiJapan.whyUse.benifits.0.title")}
              description={t("pocketWifiJapan.whyUse.benifits.0.description")}
              icon={images.roamingFees}
              wrapperClass="bg-neutral-50"
            />
            <InfoCard
              title={t("pocketWifiJapan.whyUse.benifits.1.title")}
              description={t("pocketWifiJapan.whyUse.benifits.1.description")}
              icon={images.powerCable}
              wrapperClass="bg-neutral-50"
            />
          </div>
          <div className="w-full md:max-w-[474px] md:p-6">
            <div className="flex flex-col gap-6 divide-y divide-neutral-300">
              <p className="text-sm sm:text-base md:text-lg text-black-600 sm:px-4">
                <span className="font-semibold text-black-900">
                  {t("pocketWifiJapan.whyUse.extraBenifits.0.title")}{" "}
                </span>
                {t("pocketWifiJapan.whyUse.extraBenifits.0.description")}
              </p>
              <p className="text-sm sm:text-base md:text-lg text-black-600 sm:px-4 pt-6">
                <span className="font-semibold text-black-900">
                  {t("pocketWifiJapan.whyUse.extraBenifits.1.title")}{" "}
                </span>
                {t("pocketWifiJapan.whyUse.extraBenifits.1.description")}
              </p>
              <p className="text-sm sm:text-base md:text-lg text-black-600 sm:px-4 pt-6">
                <span className="font-semibold text-black-900">
                  {t("pocketWifiJapan.whyUse.extraBenifits.2.title")}{" "}
                </span>
                {t("pocketWifiJapan.whyUse.extraBenifits.2.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyPocketWifi;
