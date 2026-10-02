import { PocketWifiIcon, RouterMiniIcon, SimMiniIcon } from "@/services";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activePath: "",
  packages: [{}],
  shippingOptions: [
    {
      shippingId: "001",
      title: "Self Pickup",
      subtitle: "Choose your location",
      description: "Device Collection: 5 days before travel",
      price: "Free",
    },
    {
      shippingId: "002",
      title: "Domestic",
      subtitle: "",
      description:
        "Within 5 business days before trip for Dec with return mailer bag. For advance orders, delivery will be within 3 days before trip",
      price: "SGD 0",
    },
    {
      shippingId: "003",
      title: "Domestic Express",
      subtitle: "",
      description:
        "Within 2 business days for orders before 2pm with return mailer bag",
      price: "SGD 10",
    },
    {
      shippingId: "004",
      title: "Domestic Super Express",
      subtitle: "",
      description: "Same business day before 2pm with return mailer bag",
      price: "SGD 20",
    },
  ],
  products: [
    {
      type: "D",
      name: "Pocket Wifi",
      path: "/product/internet-packages",
      icon: ({ pocketWifiColor = "", routerColor = "", simColor = "" }) => {
        return pocketWifiColor ? (
          <PocketWifiIcon color={pocketWifiColor} />
        ) : (
          <PocketWifiIcon />
        );
      },
    },

    {
      type: "R",
      name: "Router",
      path: "/product/internet-packages",
      icon: ({ pocketWifiColor = "", routerColor = "", simColor = "" }) => {
        return routerColor ? (
          <RouterMiniIcon color={routerColor} />
        ) : (
          <RouterMiniIcon />
        );
      },
    },
    {
      type: "S",
      name: "SIM/eSIM",
      path: "/product/internet-packages",
      icon: ({ pocketWifiColor = "", routerColor = "", simColor = "" }) => {
        return simColor ? <SimMiniIcon color={simColor} /> : <SimMiniIcon />;
      },
    },
  ],
  productTab: {
    activeTab: null,
  },
  selectedHeroIndex: 0,
  isAuthModalOpen: false,
  initialFlow: "signIn",
  isOtpModalOpen: false,
  dialogStage: 1,
  isLoginModalOpen: false,
  downloadAppDialogOpen: false,
};

const sharedSlice = createSlice({
  name: "shared",
  initialState,
  reducers: {
    setActivePath: (state, action) => {
      state.activePath = action.payload;
    },
    setHeroIndex: (state, action) => {
      state.selectedHeroIndex = action.payload;
    },
    setAuthInitialFlow: (state, action) => {
      state.initialFlow = action.payload;
    },
    setAuthModalStatus: (state, action) => {
      state.isAuthModalOpen = action.payload;
    },
    setOtpModalStatus: (state, action) => {
      state.isOtpModalOpen = action.payload;
    },
    setLoginModalStatus: (state, action) => {
      state.isLoginModalOpen = action.payload;
    },
    setDownloadAppDialogOpen: (state, action) => {
      state.downloadAppDialogOpen = action.payload;
    },
    setProductActiveTab: (state, action) => {
      state.productTab.activeTab = action.payload;
    },
  },
});

export const {
  setActivePath,
  setHeroIndex,
  setDownloadAppDialogOpen,
  setAuthModalStatus,
  setOtpModalStatus,
  setLoginModalStatus,
  setProductActiveTab,
  setAuthInitialFlow,
} = sharedSlice.actions;
export default sharedSlice.reducer;
