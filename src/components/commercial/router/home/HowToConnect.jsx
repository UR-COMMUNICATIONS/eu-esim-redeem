import InfoCard from "@/components/shared/cards/InfoCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { useTranslation } from "react-i18next";

function HowToConnect() {
  const { t } = useTranslation();

  return (
    <section className="sec_common_60">
      <div className="containerX">
        <SectionHeader
          heading={t("router.howToConnectRouter.heading")}
          subHeading={t("router.howToConnectRouter.subHeading")}
          containerClassName="gap-4"
        />
        <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-10 md:mt-15">
          <InfoCard
            titleClass="font-normal"
            title={t("router.howToConnectRouter.steps.0")}
          >
            <span className="text-5xl sm:text-6xl md:text-6xml font-bold text-main-600">
              1
            </span>
          </InfoCard>
          <InfoCard
            titleClass="font-normal"
            title={t("router.howToConnectRouter.steps.1")}
          >
            <span className="text-5xl sm:text-6xl md:text-6xml font-bold text-main-600">
              2
            </span>
          </InfoCard>
          <InfoCard
            titleClass="font-normal"
            title={t("router.howToConnectRouter.steps.2")}
          >
            <span className="text-5xl sm:text-6xl md:text-6xml font-bold text-main-600">
              3
            </span>
          </InfoCard>
        </div>
      </div>
    </section>
  );
}

export default HowToConnect;
