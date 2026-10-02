import { commercialRoutes, LocationMarkerIcon, RentIcon, ReturnIcon } from "@/services";
import { createSlice } from "@reduxjs/toolkit";

// Initial state with data

const initialState = [
  {
    _id: 1,
    icon: () => <RentIcon className={"h-10 w-10 md:h-[60px] md:w-[60px]"} />,
    title: "How To Rent",
    description:
      "Stay connected with Yoowifi in just 3 simple steps! Download the app, choose your destination, and select the package that fits your needs.",
    link: '/how-it-works'
  },
  {
    _id: 2,
    icon: () => <ReturnIcon className={"h-10 w-10 md:h-[60px] md:w-[60px]"} />,
    title: "How To Return",
    description:
      "Choose easy returns with Singpost drop-off or visit locations islandwide for hassle-free service.",
    // link: "/how-it-works/#self-return"
    link: "/how-it-works"

  },
  {
    _id: 3,
    icon: () => <LocationMarkerIcon className={"h-10 w-10 md:h-[60px] md:w-[60px]"} />,
    title: "Pickup & Drop Off Locations",
    description:
      "With 20+ pick-up and drop-off locations, we make it easy for you to get your pocket wifi and stay connected hassle-free.",
    link: "/pick-drop-location"
  },
];

// Create the slice
const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    // Define actions if you need to modify the services data
    addService: (state, action) => {
      state.push(action.payload);
    },
    removeService: (state, action) => {
      return state.filter((service) => service._id !== action.payload);
    },
  },
});

// Export the actions
export const { addService, removeService } = servicesSlice.actions;

// Export the reducer
export default servicesSlice.reducer;
