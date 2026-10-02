import { Button } from "@/components/ui/button";
import { ArrowRightIcon, brandRoutes } from "@/services";
import useDynamicImages from "@/hooks/useDynamicImages";
import { useNavigate, useParams } from "react-router-dom";
import { setCartData } from "@/store/module/cart/cartSlice";
import { useDispatch } from "react-redux";

const freePormo = {
  D: "EUPW5GB90D",
  // "E": "freesim"
};

const EuWifiBanner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { brand } = useParams();
  const freeSim = useDynamicImages("fsim-banner", "eu-banner");

  // const handleGetFree = () => {
  //   navigate(`/${brand}/register`);
  // };

  const handleClick = (value) => {
    sessionStorage.setItem("annex", freePormo[value]);
    dispatch(
      setCartData({
        fsimFlowType: value,
        annex: freePormo[value],
        promoCode: freePormo[value],
      }),
    );
    // navigate(commercialRoutes.kolRegister.path)
    navigate(brandRoutes.brandRegister.path);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Hero banner — same image as /astindo */}

      <div className="relative w-full aspect-auto overflow-hidden rounded-[24px]">
        <img
          src={freeSim}
          // alt={altAttr}
          // title={titleAttr}
          loading="lazy"
          className="inset-0 w-full h-auto object-cover cursor-pointer"
        />
      </div>
      {/* <div
        className="xl:h-[650px] lg:h-[550px] md:h-[450px] sm:h-[350px] h-[280px] bg-no-repeat rounded-[24px] px-6 bg-cover sm:bg-bottom bg-center relative flex flex-col md:justify-between"
        style={{ backgroundImage: `url(${freeSim})` }}
      >
        <div className="flex flex-col justify-between items-start xl:py-28 lg:py-16 lg:px-10 sm:px-6 py-10 h-full md:py-20">
          <div>
            <h1 className="text-[36px] md:text-[56px] lg:text-[100px] font-extrabold text-white whitespace-pre-line leading-[0.90]">
              Enjoy 5GB of
              <br />
              <br />
              <span className="sm:font-normal md:text-4xl text-[18px]">
                Free Travel Data
              </span>
            </h1>
          </div>
          <div>
            <h1 className="lg:text-[32px] md:text-[22px] sm:text-[18px] text-[14px] text-white leading-tight">
              Courtesy of <strong>Garuda Indonesia</strong>
            </h1>
          </div>
        </div>
      </div> */}

      {/* Promo text */}
      <p className="md:text-[24px] text-[18px] font-semibold text-[#4F4F4F] py-10 text-center">
        Register as a EU Wifi member and receive complimentary 5GB travel data
        for your trip across Asia.
      </p>

      {/* CTA */}
      <div className="flex justify-center items-center">
        <Button
          onClick={() => handleClick("D")}
          className="bg-[#00264C] hover:bg-[#00264C] text-[18px]"
        >
          <span>Get My Free 5GB</span>
          <ArrowRightIcon className="!h-6 !w-6 shrink-0 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default EuWifiBanner;
