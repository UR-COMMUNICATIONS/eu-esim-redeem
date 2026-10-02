import { Button } from "@/components/ui/button";
import useDynamicImages from "@/hooks/useDynamicImages";
import { ArrowRightIcon, commercialRoutes } from "@/services";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ChallengerBanner = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const banner = useDynamicImages("fsim-banner", "challenger-banner");

  const handleNext = () => {
    navigate(commercialRoutes.productInternetPackages.path);
  };

  return (
    <div className="sec_common_80 xl:px-28 lg:py-10">
      <img
        src={banner}
        alt="Challenger Banner"
        loading="lazy"
        className="inset-0 w-full h-full object-contain rounded-3xl"
      />
    </div>
  );
};

export default ChallengerBanner;
