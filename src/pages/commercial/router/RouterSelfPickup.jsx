import RouterCartFooter from "@/components/commercial/router/RouterCartFooter";
import CartLocationCard from "@/components/shared/cards/CartLocationCard";
import CustomDropdown from "@/components/shared/CustomDropdown";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDisApi } from "@/general";
import { hostServices } from "@/general/host.services";
import { commercialRoutes, getUniqueCountries, images } from "@/services";
import { setCartData } from "@/store/module/cart/cartSlice";
import {
  handleNextPocketWifiCart,
  setPocketWifiCartData,
} from "@/store/module/pocketWifi/slice";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function RouterSelfPickup() {
  const { user } = useSelector((state) => state.auth);
  // const { pickupLocations, cart } = useSelector((state) => state.pocketWifi);
  const { cart } = useSelector((state) => state.cart);
  const [countriesList, setCountriesList] = useState([]);
  const [locationsList, setLocationsList] = useState([]);
  const [openItem, setOpenItem] = useState(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDisable = () => {
    let isActive = (cart?.pickupCountry?.iso2 || cart?.pickupCountry?.countryCode) && cart?.pickupLocation?.locationCode ? true : false;
    return !isActive
  }


  const handleNext = () => {
    navigate(commercialRoutes.routerOrderSummery.path);
    dispatch(handleNextPocketWifiCart());
  };

  const handlePrev = () => {
    navigate(commercialRoutes.routerShippingOption.path);
  };

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

  // useEffect(() => {
  //   GetCountries().then((result) => {
  //     setCountriesList(result.filter(res => ['SG', 'PH', 'MY', 'TH', 'ID', 'VN'].includes(res.iso2)));
  //   });
  // }, []);

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="label">{t("extraText.country")}</span>
          <CustomDropdown
            onChange={handleCountrySelect}
            filteredCountries={countriesList}
          />
        </div>
        <Accordion
          type="single"
          className="flex flex-col gap-4"
          collapsible
          value={openItem}
          onValueChange={setOpenItem}
        >
          <AccordionItem
            className="border-none bg-transparent"
            value="location-list"
          >
            <AccordionTrigger className="border px-4 py-3 bg-neutral-50 text-black-600 rounded-xl text-base font-normal whitespace-nowrap overflow-hidden text-ellipsis">
              {cart?.pickupLocation?.locationName
                ? cart?.pickupLocation?.locationName
                : t("extraText.selectLocation")}
            </AccordionTrigger>
            <AccordionContent className="px-0 pt-4">
              <div className="flex flex-col h-full border border-neutral-200 max-h-[520px] divide-y divide-neutral-200 overflow-auto">
                {locationsList?.filter(i => i.locationCountryCode === cart.pickupCountry?.iso2).map((item, index) => (
                  <CartLocationCard
                    wrapperClass={cart?.pickupLocation?.locationCode == item?.locationCode ? "bg-neutral-100" : ""}
                    key={index}
                    onClick={() => handleLocationSelect(item)}
                    item={item}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="w-full h-[350px] rounded-2xl overflow-hidden">
          <img
            // src={images.locationMap}
            src={hostServices.pickup + cart?.pickupLocation?.locationCode + '.png'}
            alt=""
            className="w-full h-full object-cover bg-right-top"
          />
          {/* <MapLocator /> */}
        </div>
      </div>
      <RouterCartFooter
        prevHandler={handlePrev}
        nextHandler={handleNext}
        disableHandler={handleDisable}
      />
    </div>
  );
}

export default RouterSelfPickup;
