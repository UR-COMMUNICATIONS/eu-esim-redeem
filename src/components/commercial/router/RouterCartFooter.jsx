import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function RouterCartFooter({
  prevHandler = () => { },
  nextHandler = () => { },
  disableHandler = () => { },
  ...props
}) {
  const { product, cart } = useSelector((state) => state.router);
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        "w-full py-4 px-4 sm:px-8 lg:px-16 bg-white shadow-mid fixed bottom-0 left-0 z-20"
      )}
      {...props}
    >
      <div className="w-full max-w-[1312px] mx-auto flex flex-col md:flex-row gap-5 lg:gap-16 xl:gap-28 items-center">
        <div className="w-full flex items-center">
          <h2 className="hidden  lg:block flex-1 sm:text-base md:text-2xml text-black-900 font-bold">
            {t(`router.product.name`)}
          </h2>

          {cart?.package?.packPrice && (
            <h3 className="text-black-900 text-base sm:text-lg md:text-2xml font-bold whitespace-nowrap">
              {cart?.package?.currency} {cart?.package?.packPrice || "0.00"}
            </h3>
          )}
        </div>
        <div className="w-full md:max-w-max">
          <div className="flex justify-between items-center gap-3 sm:gap-4 md:gap-5">
            <Button
              type="button"
              variant="outline"
              className={"w-full min-w-[140px] font-semibold"}
              onClick={prevHandler}
            >
              {t("buttonText.previous")}
            </Button>
            <Button
              type="button"
              className={cn("w-full min-w-[140px] font-semibold")}
              disabled={disableHandler()}
              onClick={nextHandler}
            >
              {props?.label ? props.label : t("buttonText.next")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RouterCartFooter;
