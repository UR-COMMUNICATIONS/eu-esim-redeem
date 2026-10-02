import { cn } from "@/lib/utils";
import { CallMadeIcon } from "@/services";
import { memo } from "react";
import { Link } from "react-router-dom";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { useTranslation } from "react-i18next";

const ConnectCard = ({
  item,
  index,
  translate,
  containerClassName,
  ...props
}) => {
  const { nameSpace, isTargetCountry } = useUserLocationLanguage();
  const { t } = useTranslation(["translation", "english", "local"]);

  return (
    <div
      className={cn(
        "rounded-2xl md:rounded-3xl bg-white py-6 md:py-10 px-4 md:px-6 shadow-card-secondary w-full border border-neutral-200 flex flex-col justify-between",
        containerClassName
      )}
      {...props}
    >
      <div className="">
        <div className="h-14 md:h-20 w-14 md:w-20 rounded-xl md:rounded-[22px] bg-main-50 flex_center">
          {item.icon()}
        </div>

        <h2
          className="text-black-700 md:text-[23px] text-[18px] !leading-[1.4] mt-6 md:mt-12 lg:mt-[60px] font-bold"
          title={item.title}
        >
          {translate(`${nameSpace}:howItWorks.howItWorksData.${index}.title`)}
        </h2>

        <p className="text-sm md:text-[18px] text-black-600 !leading-[1.4] mt-2 md:mt-3">
          {translate(`${nameSpace}:howItWorks.howItWorksData.${index}.description`)}
        </p>
      </div>
      <Link
        to={item.link}
        className={cn(
          "text-sm md:text-base text-main-600 !leading-[1.2] mt-6 font-semibold flex items-center gap-2"
        )}
      >
        <span>{translate(`buttonText.findOutMore`)}</span>
        <CallMadeIcon className={"h-5 w-5 md:h-6 md:w-6"} color="#D81F22" />
      </Link>
    </div>
  );
};

export default memo(ConnectCard);
