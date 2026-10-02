import { Button } from "@/components/ui/button";
import useDynamicImages from "@/hooks/useDynamicImages";
import { ArrowRightIcon, brandRoutes } from "@/services";
import { setCartData } from "@/store/module/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const JoyParadiseBnr = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const freeSim = useDynamicImages("fsim-banner", "free-sim");

  const handleClick = (value) => {
    dispatch(setCartData({ fsimFlowType: value }));
    navigate(brandRoutes.brandRegister.path);
  };

  return (
    <div className="sec_common_80 xl:px-28 lg:py-10">
      <div
        className="xl:h-[650px] lg:h-[550px] md:h-[450px] sm:h-[350px] h-[280px] bg-no-repeat md:rounded-[24px] rounded-[12px] px-6 bg-cover sm:bg-bottom bg-center relative flex flex-col md:justify-between"
        style={{ backgroundImage: `url(${freeSim})` }}
      >
        <div className="flex flex-col justify-between items-start xl:py-28 lg:py-16 lg:px-10 sm:px-6 py-10 h-full md:py-20">
          <div>
            <h1 className="text-[36px] md:text-[56px] lg:text-[100px] font-extrabold text-white whitespace-pre-line leading-[0.90]">
              {t("freesimbnr.joyParadise.bannerTitle")}
              <br />
              <span className="sm:font-normal md:text-4xl text-[18px] ">
                {t("freesimbnr.joyParadise.bannerSubtitle")}
              </span>
            </h1>
          </div>
          <p className="text-white text-[20px] md:text-[28px] lg:text-[36px] font-bold leading-tight">
            {t("freesimbnr.joyParadise.bannerVolume")}
          </p>
        </div>
      </div>

      <div className="py-16 text-center space-y-5">
        <p className="md:text-[24px] text-[18px] font-semibold text-[#4F4F4F] lg:whitespace-pre-line">
          {t("freesimbnr.joyParadise.description")}
        </p>
        <p className="max-w-5xl mx-auto text-sm md:text-base italic text-[#6B7280] leading-relaxed px-2">
          {t("freesimbnr.joyParadise.countriesCoverage")}
        </p>
      </div>

      <div className="flex justify-center items-center pt-16">
        <Button
          className="bg-[#00264C] hover:bg-[#00264C] text-[18px]"
          onClick={() => handleClick("E")}
        >
          <span>{t("freesimbnr.joyParadise.buttonTitle")}</span>
          <ArrowRightIcon className="!h-6 !w-6 shrink-0 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default JoyParadiseBnr;
