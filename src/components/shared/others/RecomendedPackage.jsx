import PackageCard from "@/components/shared/cards/PackageCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { Button } from "@/components/ui/button";
import { commercialRoutes, RefreshIcon } from "@/services";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { filterPlans } from "@/general/common.funcitons";
import { setCartData } from "@/store/module/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function RecomendedPackage({ devType = "D", imgType = "D" }) {
  const { packages } = useSelector((state) => state.plan);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(4);
  const [recomandedPackages, setPackages] = useState(
    filterPlans(packages, "D", imgType),
  );

  // const [recomandedPackages, setPackages] = useState(filterPlans(packages, 'D', 'R')); // D is device type and R is image type

  // const [packages, setPackages] = useState( recomandedPackages?.slice(0, currentIndex) || []);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoadMore = () => {
    if (currentIndex < recomandedPackages?.length) {
      setIsLoadMore(true);
      setTimeout(() => {
        const newIndex = currentIndex + 4;
        setCurrentIndex(newIndex);
        // setPackages(recomandedPackages?.slice(0, newIndex) || []);
        setIsLoadMore(false);
      }, 300);
    }
  };

  const handleSelectPlan = (item) => {
    dispatch(
      setCartData({
        package: item,
        compflowType: "PP",
        planVariations: [],
        variation: {},
        cartType: "",
        device: null,
      }),
    );

    if (item?.deviceType === "D" && devType === "D") {
      navigate(commercialRoutes.pocketWifiCartService.path);
    } else if (item?.deviceType === "R" || devType === "R") {
      navigate(commercialRoutes.routerCartService.path);
    } else {
      navigate(commercialRoutes.simCartService.path);
    }

    // if (item?.deviceType === "D") {
    //   navigate(commercialRoutes.pocketWifiCartService.path);
    // } else if (item?.deviceType === "R") {
    //   navigate(commercialRoutes.routerCartService.path);
    // } else {
    //   navigate(commercialRoutes.simCartService.path);
    // }
  };

  useEffect(() => {
    setPackages(filterPlans(packages, "D", imgType));
  }, [packages]);

  // console.log('recomandedPackages', recomandedPackages);

  return (
    <section className="sec_common_60">
      <div className="containerX">
        <SectionHeader
          heading={t("recommendedPackages.heading")}
          subHeading={t("recommendedPackages.subHeading")}
          containerClassName="gap-4"
        />
        <div className="grid md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 mt-6 sm:mt-8 md:mt-15 text-8xl">
          {recomandedPackages?.slice(0, currentIndex)?.map((item, index) => (
            <PackageCard
              wrapperClass="cursor-pointer"
              key={index}
              index={index}
              item={item}
              hideDetails={true}
              onClick={() => handleSelectPlan(item)}
            />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleLoadMore}
            disabled={currentIndex < recomandedPackages?.length ? false : true}
            variant="alert"
            type="button"
          >
            <span>{t("buttonText.loadMore")}</span>
            <RefreshIcon className={isLoadMore ? "animate-spin" : ""} />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default RecomendedPackage;
