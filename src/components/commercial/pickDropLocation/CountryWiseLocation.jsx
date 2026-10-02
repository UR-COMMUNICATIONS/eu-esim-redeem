import { useDispatch, useSelector } from "react-redux";
import CartLocationCard from "@/components/shared/cards/CartLocationCard";
import { getUniqueCountries } from "@/services";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDisApi } from "@/general";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { setCartData } from "@/store/module/cart/cartSlice";
import { hostServices } from "@/general/host.services";
import CustomDropdown from "@/components/shared/CustomDropdown";

const CountryWiseLocation = () => {
  const { user } = useSelector((state) => state.auth);
  // const { pickupLocations, cart } = useSelector((state) => state.pocketWifi);
  const { cart } = useSelector((state) => state.cart);
  const [countriesList, setCountriesList] = useState([]);
  const [locationsList, setLocationsList] = useState([]);
  const [openItem, setOpenItem] = useState(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // const handleLocationSelect = (item) => {
  //   dispatch(setPocketWifiCartData({ pickupLocation: item }));
  // };

  // const handleCountrySelect = (item) => {
  //   dispatch(setPocketWifiCartData({ pickupCountry: item }));
  // };

  const handleLocationSelect = (item) => {
    dispatch(setCartData({ pickupLocation: item }));
    setOpenItem(null);
  };

  const handleCountrySelect = (item) => {
    dispatch(setCartData({ pickupCountry: item }));
    let newLocation = locationsList.find(i => i.locationCountryCode === item.countryCode)
    dispatch(setCartData({ pickupLocation: newLocation }));
    // getPickupLocations({
    //   userId: user?.userId,
    //   countryCode: item.iso2,
    //   cityId: 0,
    //   simEnabled: false
    // })
  };

  const getPickupLocations = useDisApi({
    apiCall: 'getPickupLocations',
    setCallBack: (res) => {
      if (Array.isArray(res.locations)) {
        let activeLocationsList = res.locations.filter(i => i.active === "1")
        let uniqueCountries = getUniqueCountries(activeLocationsList)
        setCountriesList(uniqueCountries.map(cou => cou.locationCountryCode))
        setLocationsList(activeLocationsList)
        // let selectedCountry = uniqueCountries.find(i => {
        //   return i.locationCountryCode.toUpperCase() === cart.userCountry?.country?.toUpperCase() || 'SG'
        // }) || uniqueCountries[0];
        let selectedCountry = uniqueCountries.find(i => i.locationCountryCode.toUpperCase() === cart.userCountry?.country);
        let newLocation = activeLocationsList.find(i => i.locationCountryCode === selectedCountry.locationCountryCode)
        dispatch(setCartData({ pickupCountry: cart.reactCountries.find(cou => cou.iso2 === selectedCountry.locationCountryCode) }));
        dispatch(setCartData({ pickupLocation: newLocation }));
      }
      else {
        // showCustomDialog({
        //   type: 'error',
        //   title: appTranslate('error'),
        //   description: res.status.message
        // })
      }
    }
  });


  useEffect(() => {
    // console.log('pickupCountry', cart);
    // if (cart?.pickupCountry?.iso2) {
    getPickupLocations({
      // userId: user?.userId,
      // countryCode: cart?.pickupCountry?.iso2 || cart?.productCountry?.iso2,
      // countryCode: cart?.userCountry?.country || cart?.productCountry?.iso2,
      cityId: 0,
      simEnabled: false,
    })
    // }
  }, []);


  return (
    <div className="w-full containerX sec_common_60 xl:px-0" id="view-location">
      <span className="label">{t("extraText.country")}</span>
      <div className="w-full flex flex-col md:flex-row md:justify-between md:gap-4">
        <div className="w-full md:w-[35%]">
          <CustomDropdown
            defaultValue={cart?.pickupCountry}
            filteredCountries={countriesList}
            onChange={handleCountrySelect}
          />
        </div>
        <div className="w-full md:w-[35%] mt-4 md:mt-0 z-10">
          <Accordion
            type="single"
            className="flex flex-col gap-4 h-14"
            collapsible
            value={openItem}
            onValueChange={setOpenItem}
          >
            <AccordionItem className="border-none bg-white" value="location-list">
              <AccordionTrigger className="border px-4 py-3 bg-neutral-50 text-black-600 rounded-xl text-base font-normal whitespace-nowrap overflow-hidden text-ellipsis">
                {cart?.pickupLocation?.locationName
                  ? cart?.pickupLocation?.locationName
                  : t("extraText.selectLocation")}
              </AccordionTrigger>
              <AccordionContent className="px-0 pt-4">
                <div className="flex flex-col h-full border border-neutral-200 max-h-[520px] divide-y divide-neutral-200 overflow-auto">
                  {locationsList?.filter(i => i.locationCountryCode === cart.pickupCountry?.iso2).map((item, index) => (
                    <CartLocationCard
                      wrapperClass={
                        cart?.pickupLocation?.locationCode === item?.locationCode
                          ? "bg-neutral-100"
                          : ""
                      }
                      key={index}
                      onClick={() => handleLocationSelect(item)}
                      item={item}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="w-full h-[350px] rounded-2xl overflow-hidden mt-10">
        <img
          // src={images.locationMap}
          src={hostServices.pickup + cart?.pickupLocation?.locationCode + '.png'}
          alt=""
          className="w-full h-full object-cover bg-right-top"
        />
        {/* <MapLocator /> */}

      </div>

      {/* {cart?.pickupCountry && (
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 mt-4 md:mt-6">
          <div className="w-full md:w-[317px] shrink-0 flex flex-col h-full border border-neutral-200 max-h-[520px] divide-y divide-neutral-200 overflow-auto md:rounded-l-3xl">
            {pickupLocations?.map((item, index) => (
              <CartLocationCard
                wrapperClass={
                  cart?.pickupLocation?.code == item?.code
                    ? "bg-neutral-100"
                    : ""
                }
                key={index}
                onClick={() => handleLocationSelect(item)}
                item={item}
              />
            ))}
          </div>
          <div className="w-full md:w-full flex-grow min-h-[180px] sm:min-h-[240px] md:min-h-full relative mt-4 md:mt-0 overflow-hidden rounded-s-xl rounded-e-xl md:rounded-s-none md:rounded-e-3xl border border-neutral-300">
            <img
              src={images.locationMap}
              alt=""
              className="absolute_center min-w-full min-h-full object-cover"
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default CountryWiseLocation;
