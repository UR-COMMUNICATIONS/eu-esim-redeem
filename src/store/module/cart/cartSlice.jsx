import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {
    cartType: "rental",
    compflowType: "LP", // LP localPlans , PP priorityPlans
    productType: "",
    deposit: 0,
    color: {},
    promoCode: null,
    memberId: null,
    userCountry: null,
    userLanguage: null,
    previousCountry: null,
    productCountry: null,
    productCountrySecondary: null,
    estimation: null,
    promoDetails: null,
    reactCountries: [],
    countriesList: [],
    travelDetails: [],
    groupVariations: {},
    variationData: {},
    planVariations: [],
    dataSizesList: [],
    package: {}, // plan information
    variation: {},
    orderInfo: null,
    shippingCurrency: "",
    topup: {},
    device: null,
    quantity: 1,
    startDate: null,
    endDate: null,
    startDateSecondary: null,
    endDateSecondary: null,
    shipping: null,
    shippingAddress: null,
    pickupCountry: null,
    pickupLocation: {},
    paymentCard: {},
    planCountries: [],
    planCountriesList: [],
    esimDetails: [],
    isNewCardAdded: false,
    isCallFreeEsim: false,
    comp: "",
    annex: null,
    annexCountryCode: null,
    fsimFlowType: "E",
  },
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCartData: (state, action) => {
      // console.log('state', state);
      // console.log('action', action);
      state.cart = { ...state.cart, ...action?.payload };

      // const { label, value } = action.payload
      // return {
      //     ...state,
      //     cart: { ...state.cart, [label]: value }
      // };

      // return { ...state.cart, ...action?.payload };
    },
    resetCart: () => initialState,
  },
});

export const { setCartData, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
