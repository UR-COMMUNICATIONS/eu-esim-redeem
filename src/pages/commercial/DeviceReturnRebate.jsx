import yellowDevice from "@/assets/images/pocket-wifi/yellow-device.webp";
import greyDevice from "@/assets/images/pocket-wifi/yoowifi-device-old.webp";
import TermsCard from "@/components/commercial/moneyBackGuarantee/TermsCard";
import useDynamicImages from "@/hooks/useDynamicImages";
import { useTranslation } from "react-i18next";

function DeviceReturnRebate() {
  const { t } = useTranslation();
  const deviceRebateBanner = useDynamicImages(
    "landing-page",
    "10-debt-landing-page",
  );
  const deviceRebateBannerMobile = useDynamicImages(
    "landing-page",
    "10-debt-landing-page-mobile",
  );
  const termsList = t("DeviceReturnRebate.terms", { returnObjects: true });
  const termsItems = Array.isArray(termsList)
    ? termsList.map((text) => ({ text }))
    : [];

  return (
    <div className="overflow-hidden w-full flex flex-col">
      <section className="w-full bg-neutral-100 border-b-2 border-[#D1D5DB] shadow-sm pt-0 mt-0">
        <img
          src={deviceRebateBannerMobile}
          alt={t("DeviceReturnRebate.bannerAlt")}
          className="mx-auto block h-auto w-full max-w-[1700px] object-contain object-center md:hidden"
        />
        <img
          src={deviceRebateBanner}
          alt={t("DeviceReturnRebate.bannerAlt")}
          className="mx-auto hidden h-auto w-full max-w-[1700px] object-contain object-center md:block"
        />
      </section>

      <section className="containerX bg-white pt-12 pb-10 md:pt-16 md:pb-14 order-3 md:order-1">
        <h2 className="font-['DMSans'] font-bold text-[26px] md:text-[34px] leading-[120%] text-[#191919] text-center px-4 sm:px-6 md:px-0">
          {t("DeviceReturnRebate.eligibleHeading")}
        </h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="rounded-2xl border border-[#F3F4F6] bg-white p-5 md:p-6 shadow-sm">
            <img
              src={yellowDevice}
              alt={t("DeviceReturnRebate.yellowAlt")}
              className="w-full h-[210px] md:h-[280px] object-contain"
            />
            <p className="mt-4 text-center font-semibold text-[#166534]">
              {t("DeviceReturnRebate.eligibleCaption")}
            </p>
          </div>

          <div className="rounded-2xl border border-[#F3F4F6] bg-white p-5 md:p-6 shadow-sm">
            <img
              src={greyDevice}
              alt={t("DeviceReturnRebate.greyAlt")}
              className="w-full h-[210px] md:h-[280px] object-contain"
            />
            <p className="mt-4 text-center font-semibold text-[#B91C1C]">
              {t("DeviceReturnRebate.notEligibleCaption")}
            </p>
          </div>
        </div>
      </section>

      <section className="containerX pb-6 md:pb-10 order-1 md:order-2">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 md:p-8 shadow-sm">
          <h3 className="font-['DMSans'] font-bold text-[24px] md:text-[30px] text-[#191919] mb-6">
            {t("DeviceReturnRebate.stepsHeading")}
          </h3>
          <ol className="list-decimal pl-6 space-y-4 text-[#4B5563] text-base md:text-lg">
            <li>{t("DeviceReturnRebate.step1")}</li>
            <li>
              {t("DeviceReturnRebate.step2Lead")}
              <span className="font-semibold text-[#191919]">
                {t("DeviceReturnRebate.address")}
              </span>
              {t("DeviceReturnRebate.step2Trail")}
            </li>
          </ol>

          <div className="mt-6 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] p-4 md:p-5">
            <h4 className="font-semibold text-[#9A3412] mb-3">
              {t("DeviceReturnRebate.formHeading")}
            </h4>
            <div className="space-y-2 text-[#7C2D12]">
              <p>{t("DeviceReturnRebate.nameLabel")}</p>
              <p>{t("DeviceReturnRebate.mobileLabel")}</p>
              <p className="pt-2">{t("DeviceReturnRebate.payNowNote")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="containerX pb-16 order-2 md:order-3">
        <div className="max-w-7xl mx-auto bg-[#FFF2F2] py-8 px-2 md:px-6 rounded-md">
          <h3 className="font-['DMSans'] font-bold text-[30px] md:text-[36px] leading-[140%] text-center text-[#191919] mb-8">
            {t("DeviceReturnRebate.termsHeading")}
          </h3>
          <TermsCard
            title={t("DeviceReturnRebate.termsCardTitle")}
            items={termsItems}
          />
        </div>
      </section>
    </div>
  );
}

export default DeviceReturnRebate;
