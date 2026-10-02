import { useState } from "react";
import CartDeviceCard from "@/components/shared/cards/CartDeviceCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { isSimEsim } from "@/constants/planTypes";
import { setCartData } from "@/store/module/cart/cartSlice";
import { setPocketWifiCartData } from "@/store/module/pocketWifi/slice";
import { data } from "autoprefixer";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

function WifiDevices({ fromCart, onDeviceChange, item }) {
  // D or S(SIM/ESIM both)
  const { cart } = useSelector((state) => state.cart);
  const { devices } = useSelector((state) => state?.device);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const translableText = isSimEsim.includes(fromCart)
    ? t("extraText.simEsim")
    : t("extraText.wifiDevices");
  const [openAccordion, setOpenAccordion] = useState("topup-device");

  // const dataFilter = obj => dis.includes(obj?.productType?.toUpperCase()) && !['T', 'B'].includes(obj?.serviceType);
  // && item.provider?.toLowerCase() === "cmi"
  const dataFilter = (item) =>
    isSimEsim.includes(fromCart)
      ? item.device_type !== "D"
      : // && Boolean(item.rechargeable)
        item.device_type?.toUpperCase() === "D";

  const handleDeviceSelect = (item) => {
    console.log("Selected Device:", item);
    dispatch(setCartData({ device: item }));
    onDeviceChange(item);
    setOpenAccordion(null);
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <span className="text-base font-semibold text-black-700">
          {t("extraText.selectDevice")}
        </span>
        <Accordion
          type="single"
          className="flex flex-col gap-4"
          defaultValue="topup-device"
          value={openAccordion}
          onValueChange={setOpenAccordion}
          collapsible
        >
          <AccordionItem
            className="border-none bg-transparent"
            value="topup-device"
          >
            <AccordionTrigger className="border rounded-xl text-base font-normal">
              {item?.device_id || t("extraText.selectDeviceToTopUp")}
            </AccordionTrigger>
            <AccordionContent className="px-0 pt-4">
              <div className="flex flex-col gap-2.5">
                {devices
                  ?.filter(dataFilter)
                  ?.sort(
                    (a, b) =>
                      new Date(b.activation_date) - new Date(a.activation_date),
                  )
                  .map((item, index) => (
                    <CartDeviceCard
                      onClick={() => handleDeviceSelect(item)}
                      key={index}
                      index={index}
                      translableName={translableText}
                      item={item}
                      isActive={cart?.device?.device_id == item?.device_id}
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
