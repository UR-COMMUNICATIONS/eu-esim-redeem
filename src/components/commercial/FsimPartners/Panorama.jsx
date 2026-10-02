import TermsList from "@/components/shared/others/TermsList";
import useExternalPromo from "@/hooks/useExternalPromo";
import BrandLogo from "./Fsim/BrandLogo";
import PanoramaBanner from "./Fsim/PanoramaBanner";
import PanoramaEasySteps from "./Fsim/PanoramaEasySteps";
import PanoramaWhyFreeSim from "./Fsim/PanoramaWhyFreeSim";

const Panorama = () => {
  useExternalPromo();
  sessionStorage.setItem("source", "urwifiid");
  return (
    <div className="overflow-hidden w-full">
      <BrandLogo className="pt-10" />
      <PanoramaBanner />
      <PanoramaWhyFreeSim
        comp="panorama"
        bgColor="#ef4141"
        textColor="#FFFFFF"
        headingColor="text-white"
      />
      <PanoramaEasySteps color="#ed3942" comp="panorama" />
      <TermsList
        className="mt-10 md:py-20 px-6 py-10 containerX mx-auto"
        titleKey="panorama.termsTitle"
        listKey="panorama.termsList"
      />
    </div>
  );
};

export default Panorama;
