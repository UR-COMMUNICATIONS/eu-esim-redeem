import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useDynamicImages from "@/hooks/useDynamicImages";

const AwardsAndAchievements = ({ data = {} }) => {
  const [selectedAward, setSelectedAward] = useState(0);
  const { t } = useTranslation();

  const imageSrc = useDynamicImages("others", data.images?.[selectedAward] || "");

  return (
    <div className="containerX sec_common_60 xl:px-0 ">
      <h2 className="title">{t("aboutUs.awardsAndAchievements.header")}</h2>

      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-10 mt-4 md:mt-6 lg:mt-12">
        <div className="w-full lg:w-2/5 flex flex-col">
          {data.details?.map((item, index) => (
            <div
              className="w-full py-3 md:py-4 border-b border-neutral-200 cursor-pointer"
              key={index}
            // onClick={() => setSelectedAward(index)}
            >
              <p className="text-sm md:text-base !leading-[1.4] md:!leading-[1.5] text-black-700">
                {item?.year}
              </p>
              <h2
                className={cn(
                  selectedAward === index ? "text-main-600" : "text-main-600",
                  "text-lg md:text-2xl font-semibold md:font-bold text-start"
                )}
              >
                {t(`aboutUs.awardsAndAchievements.details.${index}.title`)}
              </h2>
              {/* {selectedAward === index && ( */}
              <p className="mt-4 md:mt-6 p_common whitespace-pre-wrap transition_common">
                {t(
                  `aboutUs.awardsAndAchievements.details.${index}.description`
                )}
              </p>
              {/* )} */}
            </div>
          ))}
        </div>

        <div className="w-full lg:w-3/5 flex_center">
          <div className="aspect-[1.9/1] w-full relative overflow-hidden rounded-xl md:rounded-s-3xl">
            <LazyLoadImage
              src={imageSrc}
              // src={data.images[selectedAward] || ""}
              alt={`award-${selectedAward}`}
              height={1000}
              width={1900}
              className="absolute_center min-w-full min-h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardsAndAchievements;
