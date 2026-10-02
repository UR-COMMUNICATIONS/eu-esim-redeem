import TermsList from "@/components/shared/others/TermsList";
import useExternalPromo from "@/hooks/useExternalPromo";
import BrandLogo from "./Fsim/BrandLogo";
import GdramaBanner from "./Fsim/GdramaBanner";
import GdramaEasySteps from "./Fsim/GdramaEasySteps";
import GdramaWhyFreeSim from "./Fsim/GdramaWhyFreeSim";

const Gdrama = () => {
  useExternalPromo();
  sessionStorage.setItem("source", "urwifiid");
  return (
    <div className="overflow-hidden w-full">
      <BrandLogo className="pt-10" />
      <GdramaBanner />
      <GdramaWhyFreeSim
        comp="gdrama"
        bgColor="#ef4141"
        textColor="#FFFFFF"
        headingColor="text-white"
      />
      <GdramaEasySteps color="#ed3942" comp="gdrama" />
      <TermsList
        className="mt-10 md:py-20 px-6 py-10 containerX mx-auto"
        titleKey="gdrama.termsTitle"
        listKey="gdrama.termsList"
      />
    </div>
  );
};

export default Gdrama;
