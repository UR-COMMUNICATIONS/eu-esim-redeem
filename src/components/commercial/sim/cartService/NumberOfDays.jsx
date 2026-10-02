import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { addZeroToNumber } from "@/services";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslation } from "react-i18next";

function NumberOfDays({ data, selectedOption, onItemPress }) {
  const options = { align: "start" };
  const [emblaRef] = useEmblaCarousel(options);
  const { t } = useTranslation();

  // const handleTopupSelect = (item) => {
  //   dispatch(setSimCartData({ numberOfDays: item }));
  // };

  // console.log('data', data);
  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-base font-semibold text-black-700 md:text-[18px]">
        {t("extraText.chooseNoOfDays")}:
      </h2>
      <div className="w-full">
        <div ref={emblaRef} className="max-w-full overflow-hidden ">
          <div className="flex flex-wrap gap-4 ">
            {data?.map((item, index) => (
              <Button
                // key={"DATA_SIZE_DAYS_" + item.days}
                key={
                  "DATA_SIZE_DAYS_" +
                  item.dataSize +
                  item.productType +
                  item.days
                }
                type="button"
                className={cn(
                  "hover:bg-main-600 hover:text-white",
                  selectedOption?.days == item?.days
                    ? "text-white font-semibold"
                    : "",
                )}
                variant={
                  selectedOption?.days == item?.days ? "default" : "cancel"
                }
                onClick={() => onItemPress(item)}
                // style={{ flex: "0 0 calc(33.33% - 1rem)" }}
              >
                {addZeroToNumber(item.days)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NumberOfDays;
