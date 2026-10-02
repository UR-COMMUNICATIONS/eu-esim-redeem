import SectionHeader from "@/components/shared/others/SectionHeader";
import { useDisApi } from "@/general";
import { setCartData } from "@/store/module/cart/cartSlice";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const DeliverCharge = () => {
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const [shippingOptions, setShippingOptions] = useState([]);
  const { t } = useTranslation();
  const dispatch = useDispatch();

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

  useEffect(() => {
    getShippingRate({ userId: user?.userId, countryCode: cart.userCountry?.country || user?.originCountry || 'SG' })
  }, [cart.userLanguage])

  return (
    <section className="containerX">
      <div className="sec_common_60 xl:!px-0">
        <SectionHeader
          heading={t(
            "howItWorksPage.deliveryChargesSection.sectionHeader.heading"
          )}
          subHeading={t(
            "howItWorksPage.deliveryChargesSection.sectionHeader.subHeading"
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-4 md:mt-10">
          {shippingOptions.map((item, index) => {
            const dispType = item.type == 'self' ? t(`shippingOptions.${0}.title`) : item?.type
            const dispRate = item.type == 'self' ? 'Free' : cart.shippingCurrency + ' ' + item?.rate
            return (
              <article key={index} className="md:p-6 p-4 border border-neutral-300 rounded-xl md:rounded-3xl md:min-h-[200px] md:flex justify-between flex-row md:flex-col items-end md:items-start">
                <div>
                  <h2 className="text-base md:text-[18px] font-semibold leading-[140%] text-black-900">
                    {dispType}
                  </h2>
                  <p className="text-sm md:text-[18px] leading-[140%] text-black-600 mt-2" style={{ whiteSpace: 'pre-line' }}>
                    {item.description?.replace(/\\n/g, "\n")}
                  </p>
                </div>
                <h2 className="text-2xl md:text-4xl text-main-600 font-bold leading-[140%]">
                  {dispRate}
                </h2>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default DeliverCharge;