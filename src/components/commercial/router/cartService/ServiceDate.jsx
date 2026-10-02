import DatePicker from "@/components/shared/others/DatePicker";
import { cn } from "@/lib/utils";
import { setRouterCartData } from "@/store/module/router/slice";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CloseIcon } from "@/services";
import CustomDropdown from "@/components/shared/CustomDropdown";

function ServiceDate({ className, multiCountry, servicedateAdded = false }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.router);
  const { t } = useTranslation();

  const handleCountrySelect = (value) => {
    dispatch(
      setRouterCartData(
        servicedateAdded
          ? { productCountrySecondary: value }
          : { productCountry: value }
      )
    );
  };

  const handleStartDate = (value) => {
    dispatch(
      setRouterCartData(
        servicedateAdded ? { startDateSecondary: value } : { startDate: value }
      )
    );
  };

  const handleEndDate = (value) => {
    dispatch(
      setRouterCartData(
        servicedateAdded ? { endDateSecondary: value } : { endDate: value }
      )
    );
  };

  return (
    <div className={cn("px-4 py-6 bg-neutral-100 rounded-xl", className)}>
      <div className="flex justify-end">
        <CloseIcon className="h-4 w-4 cursor-pointer" color="#000000" />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="label">{t("form.country")}</span>
          <CustomDropdown
            defaultValue={
              servicedateAdded
                ? cart?.productCountrySecondary
                : cart?.productCountry
            }
            onChange={(value) => handleCountrySelect(value)}
          />
        </div>
        <div className="md:flex items-center gap-4">
          <DatePicker
            date={servicedateAdded ? cart?.startDateSecondary : cart?.startDate}
            setDate={handleStartDate}
            wrapper="flex-col items-start gap-2"
            label={t("form.startDate")}
            placeholderColor="text-gray-400 font-medium"
          />
          {multiCountry && (
            <DatePicker
              date={servicedateAdded ? cart?.endDateSecondary : cart?.endDate}
              setDate={handleEndDate}
              wrapper="flex-col items-start gap-2 md:mt-0 lg:mt-0 mt-[10px]"
              label={t("form.endDate")}
              placeholderColor="text-gray-400 font-medium"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ServiceDate;
