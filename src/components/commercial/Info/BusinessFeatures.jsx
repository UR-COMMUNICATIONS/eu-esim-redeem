import useDynamicImages from "@/hooks/useDynamicImages";
import React from "react";
import { useTranslation } from "react-i18next";

const FeatureItem = ({ item, index }) => {
  const { t } = useTranslation();
  const imageName = item.image?.replace(/\.\w+$/, "");
  const imageExt = item.image?.split(".").pop() || "webp";
  const IMAGE_SOURCE = useDynamicImages("landing-page", imageName, imageExt);

  return (
    <div
      key={`info.businessFeatures.item.${index}`}
      className="flex flex-col text-left group"
    >
      <div className="w-full aspect-[3/2] overflow-hidden rounded-2xl mb-6 shadow-sm border border-neutral-200/60 bg-neutral-100">
        <img
          src={IMAGE_SOURCE}
          alt={item.alt}
          width={1536}
          height={1024}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>
      <h3 className="text-xl font-bold text-neutral-900 mb-2">{item.title}</h3>
      <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-3">
        {item.description}
      </p>
      {item.highlights?.length > 0 && (
        <ul className="text-sm md:text-base text-neutral-600 leading-relaxed list-disc pl-5 space-y-1 mb-3">
          {item.highlights.map((highlight, highlightIndex) => (
            <li key={highlightIndex}>{highlight}</li>
          ))}
        </ul>
      )}
      {item.bestFor && (
        <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
          <span className="font-semibold text-neutral-800">
            {t("info.businessFeatures.bestForLabel")}{" "}
          </span>
          {item.bestFor}
        </p>
      )}
    </div>
  );
};
export default function BusinessFeatures() {
  const { t } = useTranslation();

  const items = t("info.businessFeatures.items", { returnObjects: true });
  return (
    <section className="bg-white px-6 py-16 md:py-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mb-4">
          {t("info.businessFeatures.title")}
        </h2>
        <p className="max-w-3xl mx-auto text-base md:text-lg text-neutral-600 leading-relaxed mb-12 md:mb-16">
          {t("info.businessFeatures.subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {items.map((item, index) => (
            <FeatureItem key={item.id ?? index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
