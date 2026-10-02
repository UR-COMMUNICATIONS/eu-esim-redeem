import DatePicker from "@/components/shared/others/DatePicker";
import { dateExternal, dateformat } from "@/general";
import { cn } from "@/lib/utils";
import { PlusRoundedIcon } from "@/services";
import { setCartData } from "@/store/module/cart/cartSlice";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

function ServiceDate({ multiCountry, className, servicedateAdded = false }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const [travelDetails, setTravelDetails] = useState(cart.travelDetails.length ? cart.travelDetails : [
    {
      locationCode: cart?.productCountry?.iso2,
      travelLocation: cart?.productCountry?.name,
      startDate: null,
      endDate: null
    }
  ])
  const [countriesList, setCountriesList] = useState([cart.productCountry])
  const { t } = useTranslation();

  const handleCountrySelect = (value, index) => {
    if (index > 0) {
      let newCountriesList = countriesList
      newCountriesList[index] = value
      setCountriesList(newCountriesList)
    }
    // dispatch(setCartData(servicedateAdded ? { productCountrySecondary: value } : { productCountry: value }));
  };

  const handleDates = (name, value, idx) => {
    // console.log('name, value, idx', name, value, idx);
    try {
      let formattedDate = dateExternal(value)
      let newTravelDetails = [...travelDetails];
      newTravelDetails[idx][name] = formattedDate;
      if (name == 'startDate' && newTravelDetails[idx - 1]) {
        newTravelDetails[idx - 1].endDate = formattedDate
      }
      if (name == 'endDate' && newTravelDetails[idx + 1]) {
        newTravelDetails[idx + 1].startDate = formattedDate
      }
      setTravelDetails(newTravelDetails)
    }
    catch (e) {
    }
  }


  const handleStartDate = (value) => {
    dispatch(setCartData({ startDate: value }));
  };

  const handleEndDate = (value) => {
    dispatch(setCartData({ endDate: value })
    );
  };


  // console.log('servicedateAdded', servicedateAdded);
  // console.log('cart', cart);
  const handleSetDate = (name, value) => {
    dispatch(setCartData({ [name]: value }));
    // dispatch(setCartData(servicedateAdded ? { endDateSecondary: value } : { endDate: value }));
  };
  // console.log('servicedateAdded', servicedateAdded);
  // console.log('cart', cart);

  const handleAddCountryRow = () => {
    const travelDetail = travelDetails[travelDetails.length - 1]
    if (travelDetail.locationCode && travelDetail.startDate && travelDetail.endDate) {
      let newTravelDetails = [...travelDetails];
      newTravelDetails.push({
        locationCode: '',
        travelLocation: 'Select country',
        startDate: travelDetails[travelDetails.length - 1]?.endDate,
        endDate: null
      })
      setTravelDetails(newTravelDetails)
      // dispatch(setCartData({ travelDetails: newTravelDetails }));
    }
    else {

    }
  }

  useEffect(() => {
    let newTravelDetails = JSON.parse(JSON.stringify([...travelDetails]))
    dispatch(setCartData({ travelDetails: newTravelDetails }));
  }, [travelDetails]);

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
          <div key={'TRAVEL_LOC_' + travel?.locationCode} className={cn("px-4 py-6 bg-neutral-100 rounded-xl", className)} >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="label">{t("form.country")}</span>
                <CustomDropdown
                  defaultValue={countriesList[index]}
                  filteredCountries={filteredCodes}
                  onChange={(value) => handleCountrySelect(value, index)}
                />
              </div>
              <div className="md:flex items-center gap-4">
                <DatePicker
                  // date={servicedateAdded ? cart?.startDateSecondary : cart?.startDate}
                  // date={travel?.startDate || cart?.startDate}
                  date={travel?.startDate}
                  // setDate={handleStartDate}
                  setDate={(value) => handleDates('startDate', value, index)}
                  wrapper="flex-col items-start gap-2"
                  label={t("form.startDate")}
                  placeholderColor="text-gray-400 font-medium"
                />
                {multiCountry && (
                  <DatePicker
                    // date={servicedateAdded ? cart?.endDateSecondary : cart?.endDate}
                    // date={travel?.endDate || cart?.endDate}
                    date={travel?.endDate}
                    // setDate={handleEndDate}
                    setDate={(value) => handleDates('endDate', value, index)}
                    wrapper="flex-col items-start gap-2 md:mt-0 lg:mt-0 mt-[10px]"
                    label={t("form.endDate")}
                    placeholderColor="text-gray-400 font-medium"
                  />
                )}
              </div>
            </div>
          </div >
        )

      })
      }
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
    </>
  )
}

export default ServiceDate;




{/* // < div className = { cn("px-4 py-6 bg-neutral-100 rounded-xl", className) } >
//   <div className="flex flex-col gap-6">
//     <div className="flex flex-col gap-2">
//       <span className="label">{t("form.country")}</span>
          // Custom Dropdown
//     </div>
//     <div className="flex items-center gap-4">
//       <DatePicker
//         // date={servicedateAdded ? cart?.startDateSecondary : cart?.startDate}
//         date={travel?.startDate || cart?.startDate}
//         // setDate={handleStartDate}
//         setDate={(value) => handleSetDate('startDate', value)}
//         wrapper="flex-col items-start gap-2"
//         label={t("form.startDate")}
//       />
//       {multiCountry && (
//         <DatePicker
//           // date={servicedateAdded ? cart?.endDateSecondary : cart?.endDate}
//           date={travel?.endDate || cart?.endDate}
//           // setDate={handleEndDate}
//           setDate={(value) => handleSetDate('endDate', value)}
//           wrapper="flex-col items-start gap-2"
//           label={t("form.endDate")}
//         />
//       )}
//     </div>
//   </div>
// </div >

 */}