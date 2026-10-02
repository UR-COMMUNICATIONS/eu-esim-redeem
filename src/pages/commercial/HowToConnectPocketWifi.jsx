import HowToConnect from "@/components/commercial/connectPocketWifi/HowToConnect";
import ReturnDevice from "@/components/commercial/connectPocketWifi/ReturnDevice";
import TopUpPlan from "@/components/commercial/connectPocketWifi/TopUpPlan";
import { Fragment } from "react";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";

const HowToConnectPocketWifi = () => {
  const { idNull } = useUserLocationLanguage();
  return (
    <Fragment>
      <HowToConnect
        // link={{ to: "/product/pocket-wifi", text: "Buy Pocket Wifi" }}
      />
      {/* <ReturnDevice /> */}
      {!idNull && <ReturnDevice />}
      <TopUpPlan />
    </Fragment>
  );
};

export default HowToConnectPocketWifi;
