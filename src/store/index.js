import { configureStore } from "@reduxjs/toolkit";
import aboutSlice from "./module/about/aboutSlice";
import { apiSlice } from "./module/api/apiSlice";
import authSlice from "./module/auth/slice";
import contactSlice from "./module/contact/contactSlice";
import countrySlice from "./module/country/countrySlice";
import dataPlanSlice from "./module/dataPlan/dataPlanSlice";
import howItWorksReducer from "./module/howItWorks/HowItWorksSlice";
import pocketWifiSlice from "./module/pocketWifi/slice";
import routerSlice from "./module/router/slice";
import sharedSlice from "./module/shared/sharedSlice";
import simSlice from "./module/sim/slice";
import testimonialsSlice from "./module/testimonials/testimonialsSlice";
import planSlice from "./module/plan/planSlice";
import cartSlice from "./module/cart/cartSlice";
import deviceSlice from "./module/device/deviceSlice";

// When the payment gateway redirects back to yoowifi.com INSIDE the iframe
// (e.g. after 2C2P 3DS), the full React app boots inside that iframe and
// shares the same sessionStorage as the top window (same origin). Without this
// guard, the iframe's Redux store.subscribe writes back to sessionStorage on
// every dispatch — overwriting cart.package, cart.variation, etc. that the
// top window is actively using. This caused the paid-then-404 bug where
// cart.package was clobbered with localPlans[0] (wrong plan) mid-payment.
const isInIframe = (() => {
  try {
    return window.self !== window.top;
  } catch {
    return true; // cross-origin access blocked = definitely in an iframe
  }
})();

export const saveToLocalStorage = (state) => {
  if (isInIframe) return; // never let an iframe overwrite the top window's state
  try {
    const serializableState = {
      auth: state.auth,
      plan: state.plan,
      cart: state.cart,
      device: state.device,
    };
    const serializedState = JSON.stringify(serializableState);
    sessionStorage.setItem("state", serializedState);
  } catch (error) {
    console.error("Failed to save state:", error);
  }
};

export const loadFromLocalStorage = () => {
  if (isInIframe) return undefined; // iframe starts with a clean store
  try {
    const serializedState = sessionStorage.getItem("state");
    // console.log('loadFromLocalStorage',serializedState);

    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error("Failed to load state:", error);
    return undefined;
  }
};

//const loggerMiddleware = createLogger();
const persistedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    pocketWifi: pocketWifiSlice,
    router: routerSlice,
    sim: simSlice,
    shared: sharedSlice,
    testimonials: testimonialsSlice,
    howItWorks: howItWorksReducer,
    about: aboutSlice,
    contact: contactSlice,
    country: countrySlice,
    dataPlan: dataPlanSlice,
    plan: planSlice,
    cart: cartSlice,
    device: deviceSlice,
  },
  preloadedState: persistedState,
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [
          // "api/executeQuery/fulfilled",
        ],
        ignoredActionPaths: [
          "meta.baseQueryMeta.request",
          "meta.arg.originalArgs.data",
          "meta.baseQueryMeta.response",
          "payload",
        ],
        ignoredPaths: [
          "pocketWifi.features",
          "router.features",
          "sim.features",
          "router.cart.startDate",
          "sim.cart.startDate",
          "pocketWifi.aboutUs",
          "pocketWifi.services",
          "sim.setupInstructions",
          "about.features",
          "about.whatWeDo",
          "pocketWifi.benefitsData",
          "shared.products",
          "contact.socialLinks",
          "country.packages",
          "pocketWifi.cart.startDate",
          "howItWorks",
        ],
      },
    }).concat(apiSlice.middleware),
});

store.subscribe(() => saveToLocalStorage(store.getState()));
