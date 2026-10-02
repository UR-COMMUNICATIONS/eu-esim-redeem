import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon, commercialRoutes } from "@/services";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const DetailsCard = ({
  image,
  title,
  description,
  titleClassName,
  descriptionClassName,
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full p-3 md:p-4 border-2 border-neutral-200 rounded-xl md:rounded-3xl flex flex-col">
    <div className="w-full aspect-[1.06/1] rounded-[8px] md:rounded-2xl relative overflow-hidden">
      <LazyLoadImage
        src={image}
        alt={title}
        height={1000}
        width={1060}
        className="absolute_center min-w-full min-h-full object-cover"
      />
    </div>
  
    <div className="flex flex-col flex-1 mt-3 md:mt-4">
      <p
        className={cn(
          "text-lg md:text-[28px] font-semibold md:font-bold !leading-[1.1] text-black-900",
          titleClassName
        )}
      >
        {title}
      </p>
      <p
        className={cn(
          "p_common mt-3 flex-1",
          descriptionClassName
        )}
      >
        {description}
      </p>
    </div>
  
    <div className="mt-auto">
      <Link to={commercialRoutes.countryCoverage.path}>
        <Button className="mt-3 md:mt-4 w-full md:w-fit h-11 md:h-[51px] flex items-center">
          <span>{t("buttonText.exploreProducts")}</span>
          <ArrowUpRightIcon className="!h-6 !w-6 shrink-0 ml-2" />
        </Button>
      </Link>
    </div>
  </div>
  
  );
};

export default DetailsCard;
