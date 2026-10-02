import { Fragment } from "react";
import HowToSetup from "@/components/commercial/sim/home/HowToSetup";
import HowToTopUp from "@/components/commercial/sim/home/HowToTopUp";
import StepToActiveSim from "@/components/commercial/sim/home/StepToActiveSim";
import DeviceCompability from "@/components/commercial/sim/home/DeviceCompability";
import { useTranslation } from "react-i18next";

const HowToSetupSim = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <HowToSetup link={{ to: "/product/sim", text: t("buttonText.BuySIMeSIM") }} />

      <StepToActiveSim />
      <DeviceCompability />
      <HowToTopUp />
    </Fragment>
  );
};

export default HowToSetupSim;
