import { Button } from "@/components/ui/button";
import useDynamicImages from "@/hooks/useDynamicImages";
import { ArrowRightIcon } from "@/services";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const CnyPromoText = () => {
  const { t } = useTranslation(["translation", "english", "local"]);
  const navigate = useNavigate();
  const cnyData = t("cny", { returnObjects: true });
  const promoText = cnyData?.promoText || {};
  const promoImage = useDynamicImages("fsim-banner", "cny-banner2");

  const handleNext = () => {
    navigate("/product/internet-packages");
  };

  return (
    <div className="containerX mx-auto py-8 md:py-16 px-4">
      <div className="text-center space-y-4 mb-8 md:mb-12  mx-auto">
        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-black">
          {promoText.heading || ""}
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">
          {promoText.subHeading || ""}
        </p>
        <p className="text-base md:text-lg text-gray-600">
          {promoText.text || ""}
        </p>
      </div>
      {/* <div className="containerX mx-auto px-6 py-10 md:py-10">
        <div className="flex justify-center items-center flex-wrap gap-2">

          <Button
            className="bg-[#ed3942] hover:bg-[#ed3942] text-[18px]"
          // onClick={handleNext}
          >
            <span>{t("cny.getYoursNow")}</span>
            <ArrowRightIcon className="!h-6 !w-6 shrink-0 ml-2 md:flex hidden" />
          </Button>

        </div>
      </div> */}
      <div className="flex justify-center items-center py-10 md:py-10">
        <Button
          // className="bg-[#ed3942] hover:bg-[#ed3942] text-[18px]"
          className="bg-[#ed3942] hover:bg-[#ed3942] text-[14px] sm:text-[16px] md:text-[18px] px-4 py-2 sm:px-4 sm:py-2.5"
          onClick={handleNext}
        >
          <span>{t("cny.getYoursNow")}</span>
          <ArrowRightIcon className="!h-6 !w-6 shrink-0 ml-2" />
        </Button>
      </div>
      <div className="w-full flex justify-center items-center rounded-[12px] overflow-hidden">
        <img
          src={promoImage}
          alt="CNY Promo"
          className="max-w-full md:max-w-2xl lg:max-w-4xl h-auto object-contain rounded-[12px]"
        />
      </div>
    </div>
  );
};

export default CnyPromoText;
