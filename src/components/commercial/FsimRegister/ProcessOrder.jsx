import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PocketWifiOrder from "./PocketWifiOrder";
import EsimOrder from "./EsimOrder";

const ProcessOrder = ({
  comp: compProp,
  skipActivation,
  onSuccess,
  onFailure,
}) => {
  const { cart } = useSelector((state) => state.cart);
  const { brand } = useParams();
  const comp = compProp || brand?.toLowerCase();

  return (
    <>
      {cart.fsimFlowType == "D" ? (
        <PocketWifiOrder comp={comp} />
      ) : (
        <EsimOrder
          comp={comp}
          skipActivation={skipActivation}
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      )}
    </>
  );
};

export default ProcessOrder;
