import CartDeviceCard from "@/components/shared/cards/CartDeviceCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { setSimCartData } from "@/store/module/sim/slice";
import { useDispatch, useSelector } from "react-redux";

function SimAccounts() {
  const { cart } = useSelector((state) => state.sim);
  const { sims } = useSelector((state) => state?.auth);

  const dispatch = useDispatch();

  const handleDeviceSelect = (item) => {
    dispatch(setSimCartData({ device: item }));
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
              <div className="flex flex-col gap-4">
                {sims?.map((item, index) => (
                  <CartDeviceCard
                    onClick={() => handleDeviceSelect(item)}
                    key={index}
                    item={item}
                    isActive={cart?.device?.deviceId == item?.deviceId}
                    id="ICCID:"
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

export default SimAccounts;
