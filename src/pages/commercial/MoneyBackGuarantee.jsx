import {
  ESimTerms,
  TermsAndConditions,
} from "@/components/commercial/moneyBackGuarantee";
import LandingHeroV2 from "@/components/shared/others/LandingHeroV2";
import { commercialRoutes } from "@/services";
import { useNavigate } from "react-router-dom";

const PAGE_KEY = "moneyBackGuarantee";

function MoneyBackGuarantee() {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate(commercialRoutes.productInternetPackages.path);
  };

  return (
    <div className="overflow-hidden w-full">
      <LandingHeroV2 pageKey={PAGE_KEY} backgroundColor="#D81F22" />
      <ESimTerms onBuyNow={handleBuyNow} />
      <TermsAndConditions onBuyNow={handleBuyNow} />
    </div>
  );
}

export default MoneyBackGuarantee;
