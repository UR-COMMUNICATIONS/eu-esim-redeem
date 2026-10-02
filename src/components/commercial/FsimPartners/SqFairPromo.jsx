import useExternalPromo from "@/hooks/useExternalPromo";
import BrandLogo from "./Fsim/BrandLogo";
import SqFairPromoBnr from "./Fsim/SqFairPromoBnr";
import SqFairPromoSteps from "./Fsim/SqFairPromoSteps";
import TermsList from "@/components/shared/others/TermsList";

const SqFairPromo = () => {
  useExternalPromo();
  return (
    <div className="overflow-hidden w-full">
      <BrandLogo className="pt-10" />
      <SqFairPromoBnr />
      <SqFairPromoSteps />
      <TermsList
        className="mt-10 md:py-20 px-6 py-10 containerX mx-auto"
        titleKey="sqfairpromo.termsTitle"
        listKey="sqfairpromo.termsList"
        titleClassName="no-underline"
      />
    </div>
  );
};

export default SqFairPromo;
