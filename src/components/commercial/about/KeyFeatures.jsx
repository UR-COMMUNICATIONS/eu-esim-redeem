import FeatureCard from "@/components/shared/cards/FeatureCard";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const KeyFeatures = ({ data = [], wrapperClass = "" }) => {
  const { t } = useTranslation();

  return (
    <section className="sec_common_60 px-4">
      <div className="container3X sec_common_80 bg-transparent rounded-3xl lg:px-12 xl:px-15">
        <div
          className={cn(
            "containerX grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6",
            wrapperClass
          )}
        >
          {data?.map((item, index) => (
            <FeatureCard
              svg={item?.icon()}
              title={t(`aboutUs.features.${index}`)}
              key={index}
              className="border border-main-600"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
