import TermsList from "@/components/shared/others/TermsList";
import { Button } from "@/components/ui/button";
import useExternalPromo from "@/hooks/useExternalPromo";
import { ArrowRightIcon, commercialRoutes } from "@/services";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CnyBnr from "./Fsim/CnyBnr";
import CnyEligibleCountries from "./Fsim/CnyEligibleCountries";
import CnyHowItWorks from "./Fsim/CnyHowItWorks";
import CnyHowToApply from "./Fsim/CnyHowToApply";
import CnyPromoText from "./Fsim/CnyPromoText";

const Cny = () => {
  useExternalPromo();
  const navigate = useNavigate();
  // const { t } = useTranslation(["translation", "english", "local"]);
  const { t } = useTranslation();

  const handleNext = () => {
    navigate(commercialRoutes.productInternetPackages.path);
  };

  return (
    <div className="overflow-hidden w-full">
      <div className="pt-10 xl:mb-5">
        <CnyBnr
          bnrName="huat"
          altAttr="Huat Banner"
          bnrTitle={t("cny.bnrTitlePocketWifi")}
          bnrText={t("cny.bnrTextPocketWifi")}
          btnText={t("cny.ctaPocketWifi")}
        />
      </div>
      <div>
        <CnyBnr
          bnrName="cny-banner"
          altAttr="CNY Banner"
          bnrTitle={t("cny.bnrTitleEsim")}
          bnrText={t("cny.bnrTextEsim")}
          btnText={t("cny.ctaEsim")}
        />
      </div>

      <CnyHowItWorks />
      <CnyEligibleCountries />
      {/* <CnyHowToApply /> */}
      <TermsList
        className="md:py-12 px-6 py-4 containerX mx-auto"
        titleKey="cny.termsTitle"
        listKey="cny.termsList"
      />
      <CnyPromoText />
      <TermsList
        className="md:pb-12 px-6 py-4 containerX mx-auto"
        titleKey="cny.promoTermsTitle"
        listKey="cny.promoTermsList"
      />
      {/* <WhyFreeSim comp="cny" bgColor="#ef4141" textColor="#FFFFFF" headingColor="text-white" />
      <CnyEasySteps comp="cny" color="#ed3942" />
      <TermsList className="mt-10 md:py-20 px-6 py-10 containerX mx-auto" titleKey="cny.termsTitle" listKey="cny.termsList" /> */}
    </div>
  );
};

export default Cny;
