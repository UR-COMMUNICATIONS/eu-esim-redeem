import { Button } from "@/components/ui/button";
import { ArrowRightIcon, brandRoutes } from "@/services";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCartData } from "@/store/module/cart/cartSlice";
import useDynamicImages from "@/hooks/useDynamicImages";

const SindoFerryBnr = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClick = (value) => {
    dispatch(setCartData({ fsimFlowType: value }));
    navigate(brandRoutes.brandRegister.path);
  };

  return (
    <>
      {/* <div className="sec_common_80 xl:px-28 lg:py-10">
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 w-full">
          <div className="flex flex-col justify-between w-full md:w-1/2 bg-white rounded-[16px] p-4">
            <img
              src={useDynamicImages("fsim-banner", "sindo-ferry-bnr")}
              alt="anaBanner"
              className="w-full max-w-[480px] md:max-w-[520px] object-contain mx-auto md:rounded-[24px] rounded-[12px]"
            />
            <p className="md:text-[24px] text-[18px] font-semibold text-[#4F4F4F] lg:whitespace-pre-line pt-16 text-center">
              {t(`freesimbnr.sindoferrytraveler`)}
            </p>
            <p className="md:text-[24px] text-[18px] font-semibold text-[#4F4F4F] lg:whitespace-pre-line pb-16 pt-8 text-center">
              {t(`freesimbnr.sindoferryNote`)}
            </p>
            <div className="flex justify-center items-center">
              <Button
                className="bg-[#00264C] hover:bg-[#00264C] text-[18px]"
                onClick={() => handleClick("E")}
              >
                <span> {t(`freesimbnr.sindoferrybuttonTittle`)}</span>
                <ArrowRightIcon className="!h-6 !w-6 shrink-0 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div> */}

      <div className="sec_common_80 xl:px-28 lg:py-10">
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 w-full">
          <div className="flex flex-col justify-between w-full md:w-[100%] bg-white rounded-[16px] p-2">
            <img
              src={useDynamicImages("fsim-banner", "sindo-ferry-bnr")}
              alt="anaBanner"
              className="w-full max-w-[640px] md:max-w-[720px] object-contain mx-auto md:rounded-[24px] rounded-[12px] h-auto"
            />
            <p className="md:text-[28px] text-[20px] font-medium text-[#4F4F4F] lg:whitespace-pre-line pt-16 text-center">
              {t(`freesimbnr.sindoferrytraveler`)}
            </p>
            <p className="md:text-[28px] text-[20px] font-medium text-[#4F4F4F] lg:whitespace-pre-line pb-16 pt-8 text-center">
              {t(`freesimbnr.sindoferryNote`)}
            </p>
            <div className="flex justify-center items-center">
              <Button
                className="bg-[#00264C] hover:bg-[#00264C] text-[20px] px-8 py-4"
                onClick={() => handleClick("E")}
              >
                <span>{t(`freesimbnr.sindoferrybuttonTittle`)}</span>
                <ArrowRightIcon className="!h-6 !w-6 shrink-0 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="sec_common_80 xl:px-28 lg:py-10">
        <img
          src={useDynamicImages("fsim-banner", "sindo-ferry-bnr")}
          alt="anaBanner"
          className="w-full h-auto bg-contain md:rounded-[24px] rounded-[12px]"
        />
        <p className="md:text-[24px] text-[18px] font-semibold text-[#4F4F4F] lg:whitespace-pre-line pt-16 text-center">
          {t(`freesimbnr.sindoferrytraveler`)}
        </p>
        <p className="md:text-[24px] text-[18px] font-semibold text-[#4F4F4F] lg:whitespace-pre-line pb-16 pt-8 text-center">
          {t(`freesimbnr.sindoferryNote`)}
        </p>
        <div className="flex justify-center items-center">
          <Button
            className="bg-[#00264C] hover:bg-[#00264C] text-[18px]"
            onClick={() => handleClick("E")}
          >
            <span> {t(`freesimbnr.sindoferrybuttonTittle`)}</span>
            <ArrowRightIcon className="!h-6 !w-6 shrink-0 ml-2" />
          </Button>
        </div>
      </div> */}
    </>
  );
};

export default SindoFerryBnr;
