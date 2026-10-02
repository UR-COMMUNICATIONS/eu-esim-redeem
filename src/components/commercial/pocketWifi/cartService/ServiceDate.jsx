import DatePicker from "@/components/shared/others/DatePicker";
import { dateExternal, dateformat, orignalFormat } from "@/general";
import { cn } from "@/lib/utils";
import { ErrorIcon, PlusRoundedIcon, SuccessIcon } from "@/services";
import { setCartData } from "@/store/module/cart/cartSlice";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CloseIcon } from "@/services";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomDropdown from "@/components/shared/CustomDropdown";

function ServiceDate({
  singleDatePicker,
  multiCountry,
  className,
  servicedateAdded = false,
}) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { countriesList, planCountriesList, productCountry } = cart;
  const [filteredCodes, setFilteredCodes] = useState(
    planCountriesList.map((cou) => cou.countryCode),
  );
  const [process, setProcess] = useState({
    title: "",
    alertMessage: "",
    alertType: "",
    isProcessing: false,
    isSuccess: false,
  });
  const [travelDetails, setTravelDetails] = useState(
    cart.travelDetails.length
      ? cart.travelDetails
      : [
          {
            locationCode: cart?.productCountry?.countryCode,
            travelLocation: cart?.productCountry?.countryName,
            startDate: null,
            endDate: null,
          },
        ],
  );

  // const [countriesList, setCountriesList] = useState([cart.countriesList])
  const { t } = useTranslation();

  const handleContinue = () => {
    setProcess({
      ...process,
      isProcessing: false,
      isSuccess: false,
      title: "",
      alertType: "",
      alertMessage: "",
    });
  };

  const handleCountrySelect = (countryObj, index) => {
    // if (countryObj) {
    // if (index > 0) {
    let newCountriesList = [...countriesList];
    let newTravelDetails = [...travelDetails];
    newTravelDetails[index] = {
      ...newTravelDetails[index],
      locationCode: countryObj?.countryCode,
      travelLocation: countryObj?.countryName,
      // rate: value.rate
    };
    newCountriesList[index] = countryObj;
    // setCountriesList(newCountriesList)

    dispatch(
      setCartData({
        countriesList: newCountriesList,
        productCountry: newCountriesList?.[0] || cart.productCountry,
      }),
    );
    setTravelDetails(newTravelDetails);
    // }
    // }
    // else {
    //   dispatch(
    //     setCartData({
    //       countriesList: [],
    //       productCountry: null,
    //     }),
    //   );
    // }
  };

  const handleDates = (date, idx, type) => {
    try {
      if (date) {
        let formattedDate = dateExternal(date);
        let newTravelDetails = travelDetails.map((t) => ({ ...t }));

        if (type === "end") {
          // End date picker clicked — only set end date
          let startDate = newTravelDetails[idx]["startDate"];
          if (formattedDate >= startDate) {
            newTravelDetails[idx] = {
              ...newTravelDetails[idx],
              endDate: formattedDate,
            };
            // Auto-set next country's start date
            if (newTravelDetails[idx + 1]) {
              newTravelDetails[idx + 1] = {
                ...newTravelDetails[idx + 1],
                startDate: formattedDate,
              };
            }
          } else {
            // Clicked before start date — reset: use clicked date as new start
            newTravelDetails[idx] = {
              ...newTravelDetails[idx],
              startDate: formattedDate,
              endDate: null,
            };
          }
        } else {
          // Start date picker clicked
          newTravelDetails[idx] = {
            ...newTravelDetails[idx],
            startDate: formattedDate,
            endDate: null,
          };

          // Auto-set previous country's end date
          if (newTravelDetails[idx - 1]) {
            newTravelDetails[idx - 1] = {
              ...newTravelDetails[idx - 1],
              endDate: formattedDate,
            };
          }

          // Calculate end date for single date picker with business logic
          if (singleDatePicker) {
            const planType = cart?.package?.planType?.toUpperCase();
            const planDays = cart?.package?.days || cart?.variation?.days;

            if (planType && planType !== "CN" && planDays) {
              const startDateObj = new Date(formattedDate);
              const monthDays = new Date(
                startDateObj.getFullYear(),
                startDateObj.getMonth() + 1,
                0,
              ).getDate();

              let calculatedEndDate;

              switch (planType) {
                case "V":
                case "M":
                case "W":
                case "Y":
                  if ((planDays >= 1 && planDays < 28) || planDays > 31) {
                    calculatedEndDate = new Date(startDateObj);
                    calculatedEndDate.setDate(
                      calculatedEndDate.getDate() + planDays - 1,
                    );
                  } else {
                    calculatedEndDate = new Date(startDateObj);
                    calculatedEndDate.setDate(
                      calculatedEndDate.getDate() + monthDays - 1,
                    );
                  }
                  break;
                default:
                  break;
              }

              if (calculatedEndDate) {
                newTravelDetails[idx] = {
                  ...newTravelDetails[idx],
                  endDate: dateExternal(calculatedEndDate),
                };
              }
            }
          }
        }
        setTravelDetails(newTravelDetails);
      }
    } catch (e) {}
  };
  // console.log('cart', cart);

  const handleAddCountryRow = () => {
    const travelDetail = travelDetails[travelDetails.length - 1];
    if (
      travelDetail.locationCode &&
      travelDetail.startDate &&
      travelDetail.endDate
    ) {
      let newTravelDetails = [...travelDetails];
      newTravelDetails.push({
        locationCode: "",
        travelLocation: "Select country",
        startDate: travelDetails[travelDetails.length - 1]?.endDate,
        endDate: null,
      });
      setTravelDetails(newTravelDetails);
      dispatch(setCartData({ travelDetails: newTravelDetails }));
    } else {
      setProcess({
        ...process,
        isProcessing: false,
        isSuccess: true,
        title: t("process.error"),
        alertType: "error",
        alertMessage: t("process.datesError"),
      });
    }
  };

  const handleRemoveCountryRow = (e) => {
    let newTravelDetails = [...travelDetails];
    let newCountriesList = [...countriesList];
    let indexToRemove = e.currentTarget.id;
    newTravelDetails.splice(indexToRemove, 1);
    newCountriesList.splice(indexToRemove, 1);
    setTravelDetails(newTravelDetails);
    dispatch(setCartData({ countriesList: newCountriesList }));
  };

  useEffect(() => {
    let newTravelDetails = JSON.parse(JSON.stringify([...travelDetails]));
    dispatch(setCartData({ travelDetails: newTravelDetails }));
  }, [travelDetails]);

  useEffect(() => {
    setFilteredCodes(planCountriesList.map((cou) => cou.countryCode));
  }, [planCountriesList]);

  // Recalculate endDate for subscription plans on mount or when plan changes
  useEffect(() => {
    if (singleDatePicker) {
      const planType = cart?.package?.planType?.toUpperCase();
      const planDays = cart?.package?.days || cart?.variation?.days;

      if (planType && planType !== "CN" && planDays) {
        const updatedTravelDetails = travelDetails.map((travel) => {
          // Only recalculate if startDate exists but endDate is null
          if (travel.startDate && !travel.endDate) {
            const startDateObj = new Date(travel.startDate);
            const monthDays = new Date(
              startDateObj.getFullYear(),
              startDateObj.getMonth() + 1,
              0,
            ).getDate();

            let calculatedEndDate;

            switch (planType) {
              case "V":
              case "M":
              case "W":
              case "Y":
                if ((planDays >= 1 && planDays < 28) || planDays > 31) {
                  // Add planDays - 1 to start date
                  calculatedEndDate = new Date(startDateObj);
                  calculatedEndDate.setDate(
                    calculatedEndDate.getDate() + planDays - 1,
                  );
                } else {
                  // Add monthDays - 1 to start date (for days between 28-31)
                  calculatedEndDate = new Date(startDateObj);
                  calculatedEndDate.setDate(
                    calculatedEndDate.getDate() + monthDays - 1,
                  );
                }
                break;
              default:
                return travel;
            }

            return {
              ...travel,
              endDate: dateExternal(calculatedEndDate),
            };
          }
          return travel;
        });

        // Only update if there were changes
        if (
          JSON.stringify(updatedTravelDetails) !== JSON.stringify(travelDetails)
        ) {
          setTravelDetails(updatedTravelDetails);
        }
      }
    }
  }, [
    singleDatePicker,
    cart?.package?.planType,
    cart?.package?.days,
    cart?.variation?.days,
  ]);

  return (
    <>
      {travelDetails.map((travel, index, arr) => {
        // let minDate = dateformat(null)
        // let maxDate = null
        // if ((index - 1) >= 0) {
        //   const prevEndDate = arr[index - 1].endDate
        //   if (prevEndDate) {
        //     minDate = dateExternal(prevEndDate, 1)
        //   }
        // }
        // if ((index + 1) < arr.length) {
        //   const nextStartDate = arr[index + 1].startDate
        //   if (nextStartDate) {
        //     maxDate = dateExternal(nextStartDate, -1) //.clone()
        //   }
        // }

        return (
          <div
            key={"TRAVEL_LOC_" + index}
            className={cn("px-4 py-6 bg-neutral-100 rounded-xl", className)}
          >
            {index > 0 && index === travelDetails.length - 1 && (
              <div
                id={index}
                onClick={handleRemoveCountryRow}
                className="flex justify-end"
              >
                <CloseIcon className="h-4 w-4 cursor-pointer" color="#000000" />
              </div>
            )}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="label">{t("form.country")}</span>
                <CustomDropdown
                  defaultValue={
                    countriesList[index] ||
                    (travel.locationCode
                      ? {
                          countryCode: travel.locationCode,
                          iso2: travel.locationCode,
                          countryName: travel.travelLocation,
                          name: travel.travelLocation,
                        }
                      : null)
                  }
                  filteredCountries={filteredCodes}
                  onChange={(value) => handleCountrySelect(value, index)}
                />
              </div>
              <div className="md:flex items-center gap-4 ">
                <DatePicker
                  index={index}
                  date={{
                    from: orignalFormat(travel.startDate),
                    to: orignalFormat(travel.endDate),
                  }}
                  value={travel.startDate}
                  setDate={(date) => handleDates(date, index, "start")}
                  wrapper="flex-col items-start gap-2"
                  label={t("form.startDate")}
                  placeholderColor="text-gray-400 font-medium"
                  closeOnSingleSelect={singleDatePicker}
                  disabled={index > 0}
                />
                {!singleDatePicker && (
                  <DatePicker
                    index={index}
                    date={{
                      from: orignalFormat(travel.startDate),
                      to: orignalFormat(travel.endDate),
                    }}
                    value={travel.endDate}
                    setDate={(date) => handleDates(date, index, "end")}
                    wrapper="flex-col items-start gap-2 md:mt-0 lg:mt-0 mt-[10px]"
                    label={t("form.endDate")}
                    placeholderColor="text-gray-400 font-medium"
                    disabled={
                      travel.startDate
                        ? { before: orignalFormat(travel.startDate) }
                        : undefined
                    }
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
      {multiCountry && (
        <div className="flex_center flex-col">
          <button
            className="text-sm md:text-base !leading-normal font-medium flex items-center justify-center gap-3 md:gap-[14px] hover:opacity-75"
            onClick={handleAddCountryRow}
          >
            <PlusRoundedIcon className="h-6 w-6 md:h-8 md:w-8" />
            <span>{t("buttonText.addACountry")}</span>
          </button>
        </div>
      )}

      <Dialog open={process.isSuccess} onOpenChange={handleContinue}>
        <DialogContent
          showCloseIcon={true}
          className="w-[calc(100vw-32px)] max-w-[540px] h-auto min-h-[286px] sm:min-h-[438px] rounded-xl md:rounded-3xl flex flex_center flex-col px-4 md:px-8 lg:px-[60px] pt-10 md:pt-[60px] pb-6 md:pb-[60px] gap-6 md:gap-12 bg-main-50"
        >
          {process.isProcessing ? (
            <div className="flex flex-col gap-6">
              <Loader
                type="Oval"
                color="white"
                height={"18vw"}
                width={"18vw"}
                className="max-h-[100px] max-w-[100px] min-h-[60px] min-w-[60px]"
                wrapperStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
              <div className="text-center flex flex-col gap-3 sm:gap-4">
                <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-700">
                  {t("process.processing")}
                </DialogTitle>
                <p className="text-base text-black-700">
                  {t("process.processMessage")}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-center">
                {process.alertType === "success" ? (
                  <SuccessIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />
                ) : (
                  <ErrorIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />
                )}
              </div>
              <div className="text-center flex flex-col gap-3 sm:gap-4">
                <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-700">
                  {process.title}
                </DialogTitle>
                <p className="text-base text-black-700">
                  {process.alertMessage}
                </p>
              </div>
              <DialogClose
                onClick={handleContinue}
                className="px-10 py-4 bg-main-600 text-white rounded-xl max-w-max mx-auto outline-none border-none"
              >
                {t("orderSummary.continue")}
              </DialogClose>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ServiceDate;
