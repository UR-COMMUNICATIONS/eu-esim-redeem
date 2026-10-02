import FeatureCard from "@/components/shared/cards/FeatureCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function KeyFeatures({ wrapperClass = "" }) {
  const { features } = useSelector((state) => state.router);
  const { t } = useTranslation();

  return (
    <section className="px-4">
      <div className="container3X sec_common_80 bg-neutral-250 rounded-3xl lg:px-12 xl:px-15">
        <div>
          <SectionHeader
            heading={t("router.features.heading")}
            subHeading={t("router.features.subHeading")}
            containerClassName="gap-4"
          />

          <div
            className={cn(
              "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 mt-4 sm:mt-10 md:mt-15",
              wrapperClass
            )}
          >
            {features?.map((item, index) => (
              <FeatureCard
                svg={item?.icon()}
                index={index}
                title={t(`router.features.featureList.${index}`)}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default KeyFeatures;
