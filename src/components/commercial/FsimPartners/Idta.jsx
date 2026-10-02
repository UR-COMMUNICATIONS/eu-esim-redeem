import IdtaLogo from "./Fsim/IdtaLogo";
import EasySteps from "./Fsim/IdtaEasySteps";
import EsimFooter from "./Fsim/IdtaEsimFooter";
import FreeSimBnr from "./Fsim/IdtaBanner";
import WhyFreeSim from "./Fsim/IdtaWhyFreeSim";
import { useTranslation } from "react-i18next";
import useExternalPromo from "@/hooks/useExternalPromo";
import BrandLogo from "./Fsim/BrandLogo";

function Idta() {
  const { t } = useTranslation();
  useExternalPromo();
  sessionStorage.setItem("source", "urwifiid");
  return (
    <div className="overflow-hidden w-full">
      {/* <IdtaLogo className="pt-10 xl:mb-5" /> */}
      <BrandLogo className="pt-10 xl:mb-5" />
      <FreeSimBnr courtesyText={t(`freesimbnr.esim5gb7days`)} />
      <WhyFreeSim />
      <EasySteps />
      <EsimFooter />
    </div>
  );
}

export default Idta;
