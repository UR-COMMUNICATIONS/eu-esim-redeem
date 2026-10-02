import useDynamicImages from "@/hooks/useDynamicImages";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

function ActiveSimCard({ item = {}, activeIndex, index, wrapperClass = "" }) {
  const { t } = useTranslation();
  return (
    <div
      className={cn(
        "flex  flex-col-reverse items-center gap-6 sm:gap-10 md:gap-[4.5rem]",
        wrapperClass,
      )}
    >
      <div className="w-full md:max-w-none h-[270px] sm:h-[340px] lg:h-[480px] bg-neutral-200 rounded-3xl px-4 pt-5 sm:pt-7 md:pt-10 overflow-hidden">
        <img
          src={useDynamicImages("others", item?.image || "")}
          alt={item?.title}
          title={item?.title}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-full md:max-w-[520px] md:h-[300px]">
        <h3 className="uppercase text-sm sm:text-lg md:text-2xl font-light text-main-600">
          {t(
            `sim.activateSteps.steps.${activeIndex}.deviceSteps.${index}.title`,
          )}
        </h3>
        <h4 className="text-lg sm:text-2xl lg:text-4xl font-bold text-black-900 mt-2 mb-4 leading-[140%]">
          {t(
            `sim.activateSteps.steps.${activeIndex}.deviceSteps.${index}.description`,
          )}
        </h4>
        <ul className="list-decimal text-sm sm:text-base md:text-lg text-black-700 pl-3 sm:pl-4 leading-[140%]">
          {item?.steps?.map((step, stepIndex) => (
            <li className="mt-3" key={stepIndex}>
              {t(
                `sim.activateSteps.steps.${activeIndex}.deviceSteps.${index}.steps.${stepIndex}`,
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ActiveSimCard;
