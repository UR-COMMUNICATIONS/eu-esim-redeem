import CartDeviceCard from "@/components/shared/cards/CartDeviceCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { setRouterCartData } from "@/store/module/router/slice";
import { useDispatch, useSelector } from "react-redux";

function WifiDevices() {
  const { cart } = useSelector((state) => state.router);
  const { wifiDevices } = useSelector((state) => state?.auth);

  const dispatch = useDispatch();

  const handleDeviceSelect = (item) => {
    dispatch(setRouterCartData({ device: item }));
  };
  return (
    <div>
      <div className="flex flex-col gap-2">
        <span className="text-base font-semibold text-black-700">
          Select Device
        </span>
        <Accordion type="single" className="flex flex-col gap-4" collapsible>
          <AccordionItem
            className="border-none bg-transparent"
            value="topup-device"
          >
            <AccordionTrigger className="border rounded-xl text-base font-normal">
              Select Device to Top Up
            </AccordionTrigger>
            <AccordionContent className="px-0 pt-4">
              <div className="flex flex-col gap-2.5">
                {wifiDevices?.map((item, index) => (
                  <CartDeviceCard
                    onClick={() => handleDeviceSelect(item)}
                    key={index}
                    item={item}
                    isActive={cart?.device?.deviceId == item?.deviceId}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default WifiDevices;
