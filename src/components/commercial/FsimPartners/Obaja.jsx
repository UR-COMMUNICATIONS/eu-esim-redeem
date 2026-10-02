import TermsList from "@/components/shared/others/TermsList";
import useExternalPromo from "@/hooks/useExternalPromo";
import BrandLogo from "./Fsim/BrandLogo";
import ObajaBanner from "./Fsim/ObajaBanner";
import ObajaEasySteps from "./Fsim/ObajaEasySteps";
import ObajaWhyFreeSim from "./Fsim/ObajaWhyFreeSim";

const Obaja = () => {
  useExternalPromo();
  sessionStorage.setItem("source", "urwifiid");
  return (
    <div className="overflow-hidden w-full">
      <BrandLogo className="pt-10" />
      <ObajaBanner />
      <ObajaWhyFreeSim
        comp="obaja"
        bgColor="#ef4141"
        textColor="#FFFFFF"
        headingColor="text-white"
      />
      <ObajaEasySteps color="#ed3942" comp="obaja" />
      <TermsList
        className="mt-10 md:py-20 px-6 py-10 containerX mx-auto"
        titleKey="obaja.termsTitle"
        listKey="obaja.termsList"
      />
    </div>
  );
};

export default Obaja;
