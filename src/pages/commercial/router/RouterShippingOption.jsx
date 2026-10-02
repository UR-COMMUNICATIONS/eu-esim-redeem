import PocketWifiCartFooter from "@/components/commercial/pocketWifi/PocketWifiCartFooter";
import RouterCartFooter from "@/components/commercial/router/RouterCartFooter";
import CartShippingCard from "@/components/shared/cards/CartShippingCard";
import DeliveryAddress from "@/components/shared/others/DeliveryAddress";
import { useDisApi } from "@/general";
import { commercialRoutes } from "@/services";
import { setCartData } from "@/store/module/cart/cartSlice";
import {
  handleNextPocketWifiCart,
  setPocketWifiCartData,
} from "@/store/module/pocketWifi/slice";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function RouterShippingOption() {
  // const { shippingOptions } = useSelector((state) => state.shared);
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const [shippingOptions, setShippingOptions] = useState([]);
  const dispatch = useDispatch();
  const isActive =
    cart?.shipping &&
    (cart?.shipping?.title == "Self Pickup" || cart?.shippingAddress?.id);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSelectCard = (item) => {
    dispatch(setCartData({ shipping: item }));
  };

  const handleAddressSelect = (item) => {
    dispatch(setCartData({ shippingAddress: item }));
  };

  const handleDisable = () => {
    let isActive = false
    const { shipping, shippingAddress } = cart
    if (shipping) {
      // isActive = shipping.type !== 'self' && shippingAddress ? true : false
      if (shipping.type == 'self') {
        isActive = true
      }
      else {
        isActive = shippingAddress ? true : false
      }
    }
    else {
      isActive = false
    }
    return !isActive
  }

  const handleNext = () => {
    dispatch(setCartData({ paymentCard: {} }))
    if (cart?.shipping?.type == "self") {
      navigate(commercialRoutes.routerSelfPickup.path);
    } else {
      navigate(commercialRoutes.routerOrderSummery.path);
    }
    dispatch(handleNextPocketWifiCart());
  };

  const handlePrev = () => {
    navigate(commercialRoutes.routerPlanSummery.path);
  };

  const getShippingRate = useDisApi({
    apiCall: 'getShippingRate',
    setCallBack: (res) => {
      if (res?.status?.result) {
        const { shipping, currency } = res;
        dispatch(setCartData({ shippingCurrency: currency?.currencyCode || '' }))
        const selfPickupOption = shipping.find(s => s.type === 'self');
        let sortedArray = selfPickupOption ? [selfPickupOption] : [];

        const getFilteredShippingOptions = (allowedType) => {
          return shipping.filter(s => s.type.toLowerCase() === allowedType.toLowerCase());
        };

        if (cart?.orderInfo?.source === 'marketplace') {
          const userPreferredType = this.props.data.orderInfo?.shippingType || '';
          let shippingOptionsList = getFilteredShippingOptions(userPreferredType);

          if (!shippingOptionsList.length) {
            shippingOptionsList = getFilteredShippingOptions('domestic');
          }
          sortedArray = [...sortedArray, ...shippingOptionsList];
        }
        else {
          sortedArray = [...sortedArray, ...shipping.filter(s => s.type !== 'self')];
        }
        setShippingOptions(sortedArray)
      }
    }
  });

  //   setShipObj({
  //     ...shipObj,
  //     shippingCharges: res.shipping[0]?.rate,
  //     shippingType: res.shipping[0]?.type,
  //     gst: res.shipping[0]?.gst || 0
  //   })

  // console.log('shippingOoption', shippingOptions);
  // console.log('user', user);


  useEffect(() => {
    getShippingRate({ userId: user?.userId, countryCode: cart.userCountry?.country || user?.originCountry || 'SG' })
  }, [cart.userLanguage])

  return (
    <div action="#" className="w-full">
      <h2 className="text-base sm:text-lg md:text-2xl font-semibold sm:font-bold text-black-900">
        {t("extraText.selectShippingOption")}
      </h2>
      <div className="flex flex-col gap-6 mt-4 sm:mt-5 md:mt-6">
        {shippingOptions?.filter(item => item?.type?.toLowerCase() !== 'self')?.map((item, index) => (
          <CartShippingCard
            key={index}
            index={index}
            item={item}
            onClick={() => handleSelectCard(item)}
            isActive={cart?.shipping?.type == item?.type}
          />
        ))}
        {/* {cart?.shipping?.title && cart?.shipping?.title !== "Self Pickup" && ( */}
        {cart?.shipping && cart?.shipping?.type?.toLowerCase() !== "self" && (
          <DeliveryAddress
            selectedItem={cart?.shippingAddress}
            handleSelect={handleAddressSelect}
          />
        )}
      </div>
      <RouterCartFooter
        prevHandler={handlePrev}
        nextHandler={handleNext}
        disableHandler={handleDisable}
      />
    </div>
  );
}

export default RouterShippingOption;
