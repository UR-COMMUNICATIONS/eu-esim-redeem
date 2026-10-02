import React from "react";
import { useTranslation } from "react-i18next";
import useDynamicImages from "@/hooks/useDynamicImages";

const FeatureCard = ({ imageKey, title, description, imageFolder }) => {
  const imageSrc = useDynamicImages(imageFolder, imageKey ?? "");
  return (
    <div className="flex flex-col w-full">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-[220px] object-cover rounded-2xl mb-6 shadow-sm"
      />
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const colClass = { 2: "md:grid-cols-2", 3: "md:grid-cols-3" };

const BuiltForAgencies = ({
  sectionKey = "travelAgency.builtForAgencies",
  imageFolder = "TravelAgency",
  /** When set, overrides each item's `image` from translations (same order as items). */
  imageKeys,
  columns = 3,
}) => {
  const { t } = useTranslation();
  const agencyFeatures =
    t(`${sectionKey}.items`, { returnObjects: true }) || [];

  return (
    <section className="bg-white py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-[40px] font-bold text-gray-900 mb-4">
            {t(`${sectionKey}.heading`)}
          </h2>
          <p className="text-gray-500 text-base md:text-lg">
            {t(`${sectionKey}.subheading`)}
          </p>
        </div>

        <div
          className={`grid grid-cols-1 ${colClass[columns] ?? "md:grid-cols-3"} gap-8 md:gap-12 ${columns === 2 ? "max-w-4xl mx-auto" : ""}`}
        >
          {agencyFeatures.map((feature, index) => (
            <FeatureCard
              key={feature.title || index}
              imageKey={imageKeys?.[index] ?? feature.image}
              title={feature.title}
              description={feature.description}
              imageFolder={imageFolder}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuiltForAgencies;
