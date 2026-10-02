import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { setSimCartData } from "@/store/module/sim/slice";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

function DataSize({}) {
  const options = { align: "start" };
  const [emblaRef] = useEmblaCarousel(options);
  const { cart, recomandedPackages } = useSelector((state) => state.sim);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handlePackSelect = (item) => {
    dispatch(setSimCartData({ package: item }));
  };

  const filterByTab = (item) => {
    return item?.tags?.includes(cart?.cartType);
  };

  return (
    <div className="w-full flex flex-col gap-4 overflow-hidden">
      <h2 className="text-base font-semibold text-black-700">
        {t("extraText.dataSize")}
      </h2>
      <div className="w-full">
        <div ref={emblaRef} className="max-w-full overflow-hidden ">
          <div className="flex flex-wrap gap-4 ">
            {recomandedPackages?.filter(filterByTab)?.map((item, index) => (
              <Button
                type="button"
                className={cn(
                  "hover:bg-main-600 hover:text-white",
                  cart?.package?.planCode == item?.planCode
                    ? "text-white font-semibold"
                    : ""
                )}
                variant={
                  cart?.package?.planCode == item?.planCode
                    ? "default"
                    : "cancel"
                }
                onClick={() => handlePackSelect(item)}
                key={index}
              >
                {item?.dataSize} {item?.desc}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataSize;
