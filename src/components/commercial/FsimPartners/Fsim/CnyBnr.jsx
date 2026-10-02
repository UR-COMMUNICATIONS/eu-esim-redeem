// import { Button } from "@/components/ui/button";
// import useDynamicImages from "@/hooks/useDynamicImages";
// import { ArrowRightIcon, brandRoutes, images } from "@/services";
// import { setCartData } from "@/store/module/cart/cartSlice";
// import { useTranslation } from "react-i18next";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const freePormo = {
//   D: "freewifi",
//   E: "freesim",
// };

// const CnyBnr = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { t } = useTranslation();

//   const huat = useDynamicImages("fsim-banner", "huat")
//   const cnyBanner = useDynamicImages("fsim-banner", "cny-banner");

//   const handleClick = (value) => {
//     // align with KolBnr behavior: persist annex and promo, and store in cart
//     const annex = freePormo[value];
//     if (annex) sessionStorage.setItem("annex", annex);
//     dispatch(
//       setCartData({
//         fsimFlowType: value,
//         annex,
//         promoCode: annex,
//       }),
//     );
//     navigate(brandRoutes.brandRegister.path);
//   };

//   return (
//     <div className="sec_common_80 xl:px-28 lg:py-10">

//       <div className="relative w-full aspect-auto overflow-hidden">

//         <img
//           src={huat}
//           alt="Free eSIM Landing"
//           className="w-full h-full bg-contain rounded-[12px]"
//         />

//         <img
//           src={cnyBanner}
//           alt="Cny Banner"
//           className="w-full h-auto bg-contain rounded-[12px]"
//         // className="relative w-full aspect-auto overflow-hidden"
//         // className="w-[150px] md:w-[150px] h-auto pt-4 md:pt-[29px]"
//         />
//       </div>

//       <div className="pt-6 md:pt-0 md:pb-6">
//       <p className="md:text-[24px] text-[18px] font-semibold text-white lg:whitespace-pre-line">{t(`cny.getFreeeSIM`)}</p>
//       <div className="flex justify-center items-center mt-4">
//             <Button className="bg-[#ed3942] hover:bg-[#ed3942] text-[18px]" onClick={() => handleClick("E")}>
//               <span> {t(`freesimbnr.buttonTittle`)}</span>
//               <ArrowRightIcon className="!h-6 !w-6 shrink-0 ml-2" />
//             </Button>
//           </div>
//       </div>
//     </div>

//   );
// };

// export default CnyBnr;

import { Button } from "@/components/ui/button";
import useDynamicImages from "@/hooks/useDynamicImages";
import { ArrowRightIcon, commercialRoutes } from "@/services";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const freePormo = {
  D: "freewifi",
  E: "freesim",
};

const CnyBnr = ({
  bnrName,
  altAttr,
  titleAttr,
  bnrTitle,
  bnrText,
  btnText,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const banner = useDynamicImages("fsim-banner", bnrName);

  const handleNext = () => {
    navigate("/product/internet-packages");
  };

  const handleBannerClick = () => {
    navigate(commercialRoutes.home.path);
  };

  return (
    <div className="sec_common_80 xl:px-28 lg:py-10">
      <img
        src={banner}
        alt={altAttr}
        title={titleAttr}
        loading="lazy"
        className="inset-0 w-full h-full object-contain rounded-3xl cursor-pointer hover:opacity-90 transition-opacity"
        // onClick={handleBannerClick}
      />
      <p className="md:text-[24px] text-[18px] font-bold text-[#4F4F4F] lg:whitespace-pre-line py-12 text-center">
        {bnrTitle}
      </p>
      <p className="md:text-[22px] text-[16px] font-normal text-[#4F4F4F] lg:whitespace-pre-line pb-12 text-center">
        {bnrText}
      </p>
      <div className="flex justify-center items-center">
        <Button
          type="button"
          className="bg-[#ed3942] hover:bg-[#ed3942] text-[14px] sm:text-[16px] md:text-[18px] px-4 py-2 sm:px-4 sm:py-2.5"
          // className="bg-[#ed3942] hover:bg-[#ed3942] text-[14px] sm:text-[16px] md:text-[18px]"
          onClick={handleNext}
        >
          <span>{btnText}</span>
          <ArrowRightIcon className="!h-6 !w-6 shrink-0 ml-1.5" />
        </Button>
      </div>
    </div>
  );
};

export default CnyBnr;
