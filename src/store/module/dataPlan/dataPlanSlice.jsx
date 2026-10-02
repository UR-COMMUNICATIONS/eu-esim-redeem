import { createSlice } from "@reduxjs/toolkit";

// Initial state with data
const initialState = {
  pocketWifiDayPass: [
    {
      plan: "Brunei, Cambodia, Thailand, Vietnam, Hong Kong, Indonesia, Japan, Laos, Macau, Malaysia, Philippines, Singapore, South Korea, and Taiwan",
      data: [
        // { limit: "1GB/day", price: "From\nS$1.50" },
        { limit: "3GB/day", price: "From\nS$2.50" },
        { limit: "10GB/day", price: "From\nS$2.50" },
      ],
    },
    {
      plan: "Albania, Andorra, Australia, Austria, Belgium, Bosnia and Herzegovina, Brunei, Bulgaria, Cambodia, Canada, China, Croatia, Czech Republic, Denmark, Estonia, Finland, France, Germany, Gibraltar, Greece, Guernsey, Hungary, Iceland, Ireland, Isle of Man, Italy, Jersey, Laos, Latvia, Liechtenstein, Lithuania, Luxembourg, Macedonia, Malta, Mexico, Monaco, Montenegro, Netherlands, New Zealand, Norway, Poland, Portugal, Romania, Russia, San Marino, Serbia, Slovakia, Slovenia, Spain, Sweden, Switzerland, Turkey, Ukraine, United Kingdom, USA, Vatican",
      data: [
        // { limit: "1GB/day", price: "From\nS$2.90" },
        { limit: "3GB/day", price: "From\nS$2.90" },
        { limit: "10GB/day", price: "From\nS$4.90" },
      ],
    },
    {
      plan: "Armenia, Bahrain, Bangladesh, Cyprus, Egypt, Georgia, India, Israel, Jordan, Kazakhstan, Kuwait, Morocco, Nepal, Oman, Pakistan, Qatar, Reunion, Saudi Arabia, South Africa, Sri Lanka, UAE, Uzbekistan, (Kyrgyzstan, Tajikistan, Tunisia - Only available for 3GB/day & 10GB/day)",
      data: [
        // { limit: "1GB/day", price: "From\nS$3.90" },
        { limit: "3GB/day", price: "From\nS$3.90" },
        { limit: "3GB/day", price: "From\n$S6.90" },
      ],
    },
  ],
  restOfTheWorldDayPass: [
    {
      plan: "Algeria, Anguilla, Antigua and Barbuda, Argentina, Aruba, Azerbaijan, Bolivia, Brazil, British Virgin Islands, Chile, Colombia, Costa Rica, Dominican Republic, Ecuador, El Salvador, Fiji, French Antilles(Martinique), French Sint Maarten, Grenada, Guadeloupe, Guatemala, Guyana, Haiti, Jamaica, Kyrgyzstan, Maldives, Mongolia, Myanmar, Netherlands Antilles(Curacao), Nicaragua, Panama, Paraguay, Peru, Puerto Rico, Saint Vincent and the Grenadines, Suriname, Tahiti, Tajikistan, the CaymanIslands, Trinidad and Tobago Turks and Caicos Islands, Uruguay, Venezuela",
      data: [
        { limit: "1GB/day", price: "From\nS$1.50" },
        { limit: "5GB/day", price: "From\nS$2.50" },
      ],
    },
  ],
  simDataPlan: [
    {
      plan: "Malaysia/ Thailand 1 day",
      data: [
        { limit: "500MB/day", price: "From\nS$1.00" },
        { limit: "1GB/day", price: "From\nS$2.00" },
        { limit: "2GB/day", price: "From\nS$3.00" },
      ],
    },

  ],
  chinaDataPlan: [
    {
      plan: "Malaysia/ Thailand 1 day",
      data: [
        { limit: "500MB/day", price: "S$ 1.20" },
        { limit: "1GB/day", price: "S$ 1.80" },
      ],
    },
    {
      plan: "China 1 Day",
      data: [
        { limit: "500MB/day", price: "S$ 4.00" },
        { limit: "1GB/day", price: "S$ 5.90" },
      ],
    },
    {
      plan: "South Korea 3 Days",
      data: [
        { limit: "500MB/day", price: "S$ 5.60" },
        { limit: "1GB/day", price: "S$ 8.40" },
      ],
    },
    {
      plan: "Japan 3 Days",
      data: [
        { limit: "500MB/day", price: "S$ 5.80" },
        { limit: "1GB/day", price: "S$ 8.70" },
      ],
    },
    {
      plan: "Europe 5 Days",
      data: [
        { limit: "500MB/day", price: "S$ 8.30" },
        { limit: "1GB/day", price: "S$ 12.50" },
      ],
    },
    {
      plan: "Australia 5 Days",
      data: [
        { limit: "500MB/day", price: "S$ 11.00" },
        { limit: "1GB/day", price: "S$ 12.50" },
      ],
    },
  ],
  regionalCountries:
    "*Europe: Albania, Armenia, Andorra, Austria, Belgium, Bosnia and Herzegovina, Bulgaria, Croatia, Cyprus, Czech Republic, Denmark, Estonia, Finland, France, Germany, Georgia, Gibraltar, Greece, Guernsey, Hungary, Iceland, Ireland, Isle of Man, Italy, Jersey, Latvia, Liechtenstein, Lithuania, Luxembourg, Macedonia, Malta, Monaco, Montenegro, Netherlands, Norway, Poland, Portugal, Romania, San Marino, Serbia, Slovakia, Slovenia, Spain, Sweden, Switzerland, Ukraine, United Kingdom, Vatican",
};

// Create the slice
const dataPlanSlice = createSlice({
  name: "dataPlan",
  initialState,
  reducers: {
    // Define actions if you need to modify the dataPlan data
  },
});

// Export the actions
export const { } = dataPlanSlice.actions;

// Export the reducer
export default dataPlanSlice.reducer;
