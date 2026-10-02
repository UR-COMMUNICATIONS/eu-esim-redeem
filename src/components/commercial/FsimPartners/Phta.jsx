import PhtaLogo from "./Fsim/PhtaLogo";
import EasySteps from "./Fsim/PhtaEasySteps";
import EsimFooter from "./Fsim/PhtaEsimFooter";
import FreeSimBnr from "./Fsim/PhtaBanner";
import WhyFreeSim from "./Fsim/PhtaWhyFreeSim";
import { useTranslation } from "react-i18next";
import useExternalPromo from "@/hooks/useExternalPromo";
import BrandLogo from "./Fsim/BrandLogo";

function Phta() {
  const { t } = useTranslation();
  useExternalPromo();
  sessionStorage.setItem("source", "urwifiph");
  return (
    <div className="overflow-hidden w-full">
      {/* <PhtaLogo className="pt-10 xl:mb-5" /> */}
      <BrandLogo className="pt-10 xl:mb-5" />
      <FreeSimBnr courtesyText={t(`freesimbnr.esim5gb7days`)} />
      <WhyFreeSim />
      <EasySteps />
      <EsimFooter />
    </div>
  );
}

export default Phta;
