import ActiveSimCard from "@/components/shared/cards/ActiveSimCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function StepToActiveSim() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { activateSteps } = useSelector((state) => state.sim);
  const { t } = useTranslation();

  return (
    <section className="sec_common_60 bg-neutral-50">
      <div className="containerX">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <h2 className="text-center sm:text-left text-2xml sm:text-3xl md:text-5xl font-bold text-black-900 flex-1 leading-[110%]">
            {t("sim.activateSteps.heading")}
          </h2>
          <div className="flex items-center gap-2">
            {[
              { id: 0, label: "iOS" },
              { id: 1, label: "Android" },
            ].map(({ id, label }) => (
              <Button
                key={id}
                type="button"
                className="min-w-[100px] sm:min-w-[140px] py-5 h-9 md:h-[51px] !text-sm md:!text-base"
                variant={activeIndex === id ? "default" : "outline"}
                onClick={() => setActiveIndex(id)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-6 sm:mt-10 md:mt-16 lg:gap-20 flex flex-col gap-6 sm:gap-10 md:gap-15">
          {activateSteps[activeIndex]?.deviceSteps?.map((item, index) => (
            <ActiveSimCard
              wrapperClass={
                index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
              }
              activeIndex={activeIndex}
              index={index}
              item={item}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StepToActiveSim;
