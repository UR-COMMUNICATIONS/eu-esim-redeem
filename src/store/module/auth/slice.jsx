import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedPath: "",
  user: null,
  userInfo: null,
  auth: {},
  addressCountry: null,
  wifiDevices: [
    {
      id: 1,
      name: "Wifi Device",
      deviceId: "55775254747523",
    },
    {
      id: 2,
      name: "Wifi Device",
      deviceId: "55775254222892",
    },
  ],
  sims: [
    {
      id: 1,
      name: "My Sim",
      deviceId: "55775254747523",
    },
    {
      id: 2,
      name: "My eSim",
      deviceId: "55775254222892",
    },
  ],
  userLocations: [
    {
      id: 1,
      name: "Thiago Silva",
      phoneNumber: "+1 (555) 123-6789",
      address: "1234 Elm Street, Springfield, IL 62704",
      appartment: "sdadsa",
      province: "asdasd",
      postCode: "sdasda",
      country: {
        id: 3,
        name: "Albania",
        iso3: "ALB",
        iso2: "AL",
        numeric_code: "008",
        phone_code: 355,
        capital: "Tirana",
        currency: "ALL",
        currency_name: "Albanian lek",
        currency_symbol: "Lek",
        tld: ".al",
        native: "Shqipëria",
        region: "Europe",
        subregion: "Southern Europe",
        latitude: "41.00000000",
        longitude: "20.00000000",
        emoji: "🇦🇱",
      },
      state: {
        id: 629,
        name: "Berat District",
        state_code: "BR",
      },
    },
  ],
  userPaymentCards: [
    {
      id: 1,
      username: "Jack Lewis",
      cardNumber: "1234567891011121",
      cvc: "123",
      expireDate: "06/21",
    },
  ],
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setSavedPath: (state, action) => {
      // console.log('action', action);
      state.savedPath = action.payload;
    },
    setUserInfo: (state, action) => {
      console.log("state, action", state, action);
      state.userInfo = { ...state.userInfo, ...action?.payload };
      localStorage.setItem("user_info", JSON.stringify(state.userInfo));
    },
    setUserData: (state, action) => {
      state.user = { ...state.user, ...action?.payload };
      localStorage.setItem("user_data", JSON.stringify(state.user));
    },
    setAddressData: (state, action) => {
      state.addressCountry = { ...state.addressCountry, ...action?.payload };
      localStorage.setItem(
        "address_country",
        JSON.stringify(state.addressCountry),
      );
    },
    saveAuthData: (state, action) => {
      state.auth = { ...state.auth, ...action?.payload };
      localStorage.setItem("yoowifi_admin", JSON.stringify(state.auth));
    },
    logout: (state) => {
      state.auth = {};
      localStorage.removeItem("yoowifi_admin");
      localStorage.removeItem("user_data");
      localStorage.removeItem("user_info");
    },
    setUserLocation: (state, action) => {
      state.userLocations = [...state.userLocations, action?.payload];
    },
    setUserPaymentCard: (state, action) => {
      state.userPaymentCards = [...state.userPaymentCards, action?.payload];
    },
    removeUserLocation: (state, action) => {
      const newLocations = [...state.userLocations];
      newLocations.splice(action?.payload, 1);
      state.userLocations = newLocations;
    },
    resetAuth: () => initialState,
  },
});

export const {
  setSavedPath,
  setUserInfo,
  setUserData,
  setAddressData,
  saveAuthData,
  logout,
  setUserLocation,
  removeUserLocation,
  setUserPaymentCard,
  resetAuth,
} = authSlice.actions;
export default authSlice.reducer;

/**
 * Clears the auth session (redux + every localStorage key auth-related code
 * writes: "yoowifi_admin" from saveAuthData, "user_data" from setUserData,
 * "user_info" from setUserInfo) without touching cart/plan state or
 * navigating anywhere. Call this from any getUser failure branch — a token
 * that's missing, stale, or rejected by the backend means the session is no
 * longer valid, regardless of which page triggered the check.
 *
 * Deliberately narrower than AuthDialog's logoutHandler(), which also resets
 * cart/plan state, local component state, and redirects home — appropriate
 * for an explicit "Logout" click, but too disruptive for a getUser call that
 * silently refreshes profile data on a page the user is already using (e.g.
 * mid-checkout) and happens to fail.
 */
export function clearInvalidSession(dispatch) {
  dispatch(resetAuth());
  localStorage.removeItem("yoowifi_admin");
  localStorage.removeItem("user_data");
  localStorage.removeItem("user_info");
}
