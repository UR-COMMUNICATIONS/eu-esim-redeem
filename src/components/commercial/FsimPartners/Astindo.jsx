import useExternalPromo from "@/hooks/useExternalPromo";
import AstindoBnr from "./Fsim/AstindoBnr";
import BrandLogo from "./Fsim/BrandLogo";
import EasySteps from "./Fsim/EasySteps";
import WhyFreeSim from "./Fsim/WhyFreeSim";

const Astindo = () => {
  useExternalPromo();
  sessionStorage.setItem("source", "urwifiid");
  return (
    <div className="overflow-hidden w-full">
      <BrandLogo className="pt-10 xl:mb-5" />
      <AstindoBnr />
      <WhyFreeSim
        comp="astindo"
        bgColor="#CEF5FF"
        textColor="#4F4F4F"
        headingColor="text-black"
      />
      <EasySteps comp="astindo" color="#00264C" />
    </div>
  );
};

export default Astindo;
