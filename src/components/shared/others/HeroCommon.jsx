import { cn } from "@/lib/utils";
import { YooWifiLogoIcon } from "@/services";
import React from "react";

const HeroCommon = ({
  title,
  description,
  titleClassName,
  descriptionClassName,
  children,
  Subdescription,
}) => {
  return (
    <section className="w-full bg-main-600 px-4 md:px-6 xl:px-0 py-6 md:py-10 lg:py-[94px] relative overflow-hidden">
      <YooWifiLogoIcon className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[20%] z-[1] w-[326px] md:w-[880px] h-auto" />
      {children ? (
        children
      ) : (
        <div className="containerX flex flex-col md:flex-row md:items-center gap-3 md:gap-6 relative z-[2]">
          {title && (
            <h1
              className={cn(
                "text-[28px] md:text-[60px] !leading-[1.1] w-full md:w-1/2 text-white font-bold uppercase",
                titleClassName
              )}
            >
              {title}
            </h1>
          )}
          <div className="w-full md:w-1/2">
            {description && (
              <p
                className={cn(
                  "!leading-[1.4] text-white font-medium text-[17px]",
                  descriptionClassName
                )}
              >
                {description}
              </p>
            )}
            {Subdescription && (
              <p
                className={cn(
                  "!leading-[1.4] text-white mt-2 font-light",
                  descriptionClassName
                )}
              >
                {Subdescription}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroCommon;
