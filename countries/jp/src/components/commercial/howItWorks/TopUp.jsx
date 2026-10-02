import SectionHeader from "@/components/shared/others/SectionHeader";
import VideoPlayer from "@/components/shared/others/VideoPlayer";
import { Button } from "@/components/ui/button";
import { topUpData } from "@/services";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const TopUp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="containerX" id="topup">
      <div className="sec_common_60">
        <SectionHeader
          heading={t("howItWorksPage.topUpSection.sectionHeader.heading")}
          subHeading={t("howItWorksPage.topUpSection.sectionHeader.subHeading")}
        />

        <div className="mt-4 md:mt-10  grid-cols-1 lg:grid-cols-2 gap-4 md:gap-10 xl:gap-[76px]">
          <div className="order-2 md:order-1">
            <div className="space-y-2 md:space-y-6">
              {topUpData.map((item, index) => (
                <article
                  key={index}
                  className="border border-neutral-300 rounded-xl md:rounded-3xl px-4 py-6 md:px-6"
                >
                  <p className="mb-1 md:mb-4 uppercase text-main-600 font-semibold leading-[120%] tracking-[2px] text-sm md:text-base">
                    Step {index + 1}
                  </p>

                  <h5 className="text-[18px] md:text-2xl font-semibold md:font-bold text-black-900 leading-[140%]">
                    {t(
                      `howItWorksPage.topUpSection.topUpData.${index}.title`
                    ) || item.title}
                  </h5>

                  <p className="text-black-600 text-sm md:text-[18px] leading-[140%] mt-4 md:mt-1">
                    {t(
                      `howItWorksPage.topUpSection.topUpData.${index}.description`
                    ) || item.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-4 md:mt-8 flex justify-center">
              <Button
                variant="secondary"
                className="!h-11 md:!h-[51px] w-full md:w-[500px]"
                onClick={() => navigate("/contact")}
              >
                {t("buttonText.contactUs")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopUp;
