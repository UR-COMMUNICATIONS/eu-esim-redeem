import {
  CloudIcon,
  GlobeDataIcon,
  GlobMapIcon,
  images,
  LteSpeedIcon,
  ShareNetworkIcon,
} from "@/services";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {
    name: "Router",
    description:
      "",
    features: [
      "Stay Connected Anywhere",
      "Save BIG on International Roaming",
      "Unbeatable Pricing Guarantee",
    ],
    price: {
      currency: "SGD",
      amount: 50,
      starting: true,
    },
    buttons: [
      {
        text: "View Plans",
        action: "openPlans",
      },
    ],
    tabs: [
      {
        title: "Description",
        content:
          "It is easy to use and boasts a sleek, minimalist design. Simply turn it on, connect your devices, and you’re good to go! No more worrying about complicated setup processes or bulky equipment. But that’s not all – our Pocket WiFi devices also offer strong and reliable connectivity, ensuring that you stay connected no matter where you are. Whether you’re on a business trip or a family vacation, you can enjoy high-speed internet without any interruptions.",
      },
      {
        title: "Specifications",
        content:
          "CPU: SC8310LTE-FDD：Bands 1 / 2 / 3 / 4 / 5 / 7 / 8 / 12 / 13 / 17 / 18 / 20 / 25 / 26 /28 / 66\nLTE-TDD：Bands 34 / 38 / 39 / 40 / 41 (194M)\n WCDMA：Bands 1 / 2 / 4 / 5 / 8 \nTD-SCDMA：NO CDMA：NO\nEVDO：NO\nGSM：850 / 900 / 1800 / 1900 \nMax speed：Download 150Mbps  /  Upload 50Mbps \nWi-Fi：2.4GHz  802.11 b / g / n 1T1R \nMax WiFi Connection：8\nBattery：3000mAh \nPorts：Type-C  USB\nInput： 5V – 1A \nItem size：120mm x 64.6mm x 12mm\nItem weight：112g\nShell Material：Plastics",
      },
      {
        title: "What's Included",
        content: "1x Charging Cable\n1x Device Pouch"
        // "50GB global data is applicable to 90 countries.\nSpeed of service is dependent on the mobile network partner.\nFor order cancellation, a charge of 10% of the order will apply.\nGeneral terms and conditions apply.\nYoowifi reserved the rights to make changes anytime.",
      },
      // {
      //   title: "Terms & Conditions",
      //   content:
      //     "Albania, Andorra, Armenia, Australia, Austria, Bahrain, Bangladesh, Belgium, Bosnia and Herzegovina, Brunei, Bulgaria, Cambodia, Canada, China, Croatia, Cyprus, Czech Republic, Denmark, Egypt, Estonia, Finland, France, Georgia, Germany, Gibraltar, Greece, Guernsey, Hong Kong, Hungary, Iceland, India, Indonesia, Ireland, Isle of Man, Israel, Italy, Japan, Jersey, Jordan, Kazakhstan, Kuwait, Laos, Latvia, Liechtenstein Lithuania, Luxembourg, Macau, Macedonia, Malaysia, Malta, Mexico, Monaco, Montenegro, Myanmar, Netherlands, New Zealand, Norway, Oman, Pakistan, Philippines, Poland, Portugal, Qatar, Reunion, Romania, Russia, San Marino, Saudi Arabia, Serbia, Slovakia, Slovenia, South Korea, Spain, Sri Lanka, Sweden, Switzerland, Taiwan, Thailand, Turkey, UAE, Ukraine, United Kingdom, USA, Uzbekistan, Vatican, Vietnam",
      // },
    ],
    images: [
      {
        url: images.router1,
        alt: "Router Wifi device front view",
      }
    ],
  },
  recomandedPackages: [
    {
      id: 1,
      title: "Basic Package",
      features: [
        "Keep Yoowifi Device",
        "Top-up Plan only",
        "365 Days Validity",
        "Covers 90 Countries",
      ],
      image:
        "https://www.startech.com.bd/image/cache/catalog/router/tp-link/m7000/m7000-01-228x228.jpg",
      category: "daily",
      planCode: "plan_1",
      dataSize: 3,
      packPrice: 10,
      validity: 30,
      desc: "GB",
      coverage: [
        "Algeria",
        "Anguilla",
        "Antigua and Barbuda",
        "Argentina",
        "Aruba",
        "Azerbaijan",
        "Bolivia",
        "Brazil",
        "British Virgin Islands",
        "Chile",
        "Colombia",
        "Costa Rica",
      ],
      information:
        "",
    },
    {
      id: 2,

      title: "Traveler Package",
      features: [
        "Keep Yoowifi Device",
        "Top-up Plan only",
        "365 Days Validity",
        "Covers 90 Countries",
      ],

      image:
        "https://www.startech.com.bd/image/cache/catalog/router/tp-link/m7000/m7000-01-228x228.jpg",
      category: "daily",
      planCode: "plan_2",
      dataSize: 3,
      packPrice: 10,
      validity: 30,
      desc: "GB",
      coverage: [
        "Algeria",
        "Anguilla",
        "Antigua and Barbuda",
        "Argentina",
        "Aruba",
        "Azerbaijan",
        "Bolivia",
        "Brazil",
        "British Virgin Islands",
        "Chile",
        "Colombia",
        "Costa Rica",
      ],
      information:
        "",
    },
    {
      id: 3,

      title: "Extended Package",
      features: [
        "Keep Yoowifi Device",
        "Top-up Plan only",
        "365 Days Validity",
        "Covers 90 Countries",
      ],

      image:
        "https://www.startech.com.bd/image/cache/catalog/router/tp-link/m7000/m7000-01-228x228.jpg",
      category: "daily",
      planCode: "plan_3",
      dataSize: 3,
      packPrice: 10,
      validity: 30,
      desc: "GB",
      coverage: [
        "Algeria",
        "Anguilla",
        "Antigua and Barbuda",
        "Argentina",
        "Aruba",
        "Azerbaijan",
        "Bolivia",
        "Brazil",
        "British Virgin Islands",
        "Chile",
        "Colombia",
        "Costa Rica",
      ],
      information:
        "",
    },
    {
      id: 4,

      title: "Unlimited Package",
      features: [
        "Keep Yoowifi Device",
        "Top-up Plan only",
        "365 Days Validity",
        "Covers 90 Countries",
      ],

      image:
        "https://www.startech.com.bd/image/cache/catalog/router/tp-link/m7000/m7000-01-228x228.jpg",
      category: "daily",
      planCode: "plan_4",
      dataSize: 3,
      packPrice: 10,
      validity: 30,
      desc: "GB",
      coverage: [
        "Algeria",
        "Anguilla",
        "Antigua and Barbuda",
        "Argentina",
        "Aruba",
        "Azerbaijan",
        "Bolivia",
        "Brazil",
        "British Virgin Islands",
        "Chile",
        "Colombia",
        "Costa Rica",
      ],
      information:
        "",
    },
    {
      id: 5,

      title: "Lite Package",
      features: [
        "Keep Yoowifi Device",
        "Top-up Plan only",
        "180 Days Validity",
        "Covers 60 Countries",
      ],

      image:
        "https://www.startech.com.bd/image/cache/catalog/router/tp-link/m7000/m7000-01-228x228.jpg",
      category: "monthly",
      planCode: "plan_5",
      dataSize: 3,
      packPrice: 10,
      validity: 30,
      desc: "GB",
      coverage: [
        "Algeria",
        "Anguilla",
        "Antigua and Barbuda",
        "Argentina",
        "Aruba",
        "Azerbaijan",
        "Bolivia",
        "Brazil",
        "British Virgin Islands",
        "Chile",
        "Colombia",
        "Costa Rica",
      ],
      information:
        "",
    },
    {
      id: 6,

      title: "Business Package",
      features: [
        "Keep Yoowifi Device",
        "Top-up Plan only",
        "365 Days Validity",
        "Priority support",
        "Covers 100 Countries",
      ],

      image:
        "https://www.startech.com.bd/image/cache/catalog/router/tp-link/m7000/m7000-01-228x228.jpg",
      category: "multi-country",
      planCode: "plan_6",
      dataSize: 3,
      packPrice: 10,
      validity: 30,
      desc: "GB",
      coverage: [
        "Algeria",
        "Anguilla",
        "Antigua and Barbuda",
        "Argentina",
        "Aruba",
        "Azerbaijan",
        "Bolivia",
        "Brazil",
        "British Virgin Islands",
        "Chile",
        "Colombia",
        "Costa Rica",
      ],
      information:
        "",
    },
    {
      id: 7,

      title: "Premium Package",
      features: [
        "Keep Yoowifi Device",
        "Top-up Plan only",
        "365 Days Validity",
        "Unlimited data in selected countries",
        "Covers 90 Countries",
      ],

      image:
        "https://www.startech.com.bd/image/cache/catalog/router/tp-link/m7000/m7000-01-228x228.jpg",
      category: "daily",
      planCode: "plan_7",
      dataSize: 3,
      packPrice: 10,
      validity: 30,
      desc: "GB",
      coverage: [
        "Algeria",
        "Anguilla",
        "Antigua and Barbuda",
        "Argentina",
        "Aruba",
        "Azerbaijan",
        "Bolivia",
        "Brazil",
        "British Virgin Islands",
        "Chile",
        "Colombia",
        "Costa Rica",
      ],
      information:
        "",
    },
    {
      id: 8,

      title: "Family Package",
      features: [
        "Keep Yoowifi Device",
        "Top-up Plan only",
        "365 Days Validity",
        "Connect up to 10 devices",
        "Covers 90 Countries",
      ],

      image:
        "https://www.startech.com.bd/image/cache/catalog/router/tp-link/m7000/m7000-01-228x228.jpg",
      category: "multi-country",
      planCode: "plan_8",
      dataSize: 3,
      packPrice: 10,
      validity: 30,
      desc: "GB",
      coverage: [
        "Algeria",
        "Anguilla",
        "Antigua and Barbuda",
        "Argentina",
        "Aruba",
        "Azerbaijan",
        "Bolivia",
        "Brazil",
        "British Virgin Islands",
        "Chile",
        "Colombia",
        "Costa Rica",
      ],
      information:
        "",
    },
    {
      id: 9,

      title: "Traveler Plus Package",
      features: [
        "Keep Yoowifi Device",
        "Top-up Plan only",
        "180 Days Validity",
        "Extended data for heavy users",
        "Covers 80 Countries",
      ],

      image:
        "https://www.startech.com.bd/image/cache/catalog/router/tp-link/m7000/m7000-01-228x228.jpg",
      category: "monthly",
      planCode: "plan_9",
      dataSize: 3,
      packPrice: 10,
      validity: 30,
      desc: "GB",
      coverage: [
        "Algeria",
        "Anguilla",
        "Antigua and Barbuda",
        "Argentina",
        "Aruba",
        "Azerbaijan",
        "Bolivia",
        "Brazil",
        "British Virgin Islands",
        "Chile",
        "Colombia",
        "Costa Rica",
      ],
      information:
        "",
    },
    {
      id: 10,

      title: "Global Unlimited Package",
      features: [
        "Keep Yoowifi Device",
        "Top-up Plan only",
        "365 Days Validity",
        "Unlimited data globally",
        "Covers 100 Countries",
      ],
      image:
        "https://www.startech.com.bd/image/cache/catalog/router/tp-link/m7000/m7000-01-228x228.jpg",
      category: "daily",
      planCode: "plan_10",
      dataSize: 3,
      packPrice: 10,
      validity: 30,
      desc: "GB",
      coverage: [
        "Algeria",
        "Anguilla",
        "Antigua and Barbuda",
        "Argentina",
        "Aruba",
        "Azerbaijan",
        "Bolivia",
        "Brazil",
        "British Virgin Islands",
        "Chile",
        "Colombia",
        "Costa Rica",
      ],
      information:
        "",
    },
  ],
  features: [
    {
      icon: () => <LteSpeedIcon />,
      title: "Up To 4G \n LTE Speed",
    },
    {
      icon: () => <GlobeDataIcon />,
      title: "Flexible Data option",
    },
    {
      icon: () => <CloudIcon />,
      title: "Cloud SIM Technology",
    },
    {
      icon: () => <ShareNetworkIcon />,
      title: "Share across\n multiple devices",
    },
    {
      icon: () => <GlobMapIcon />,
      title: "Greater Coverage\n and Stability",
    },
  ],
  topupPlans: [
    {
      planCode: "plan_1",
      dataSize: 3,
      packPrice: 10,
      validity: 30,
      desc: "GB",
    },
    {
      planCode: "plan_2",
      dataSize: 10,
      price: 20,
      validity: 30,
      desc: "GB",
    },
  ],
  cart: {
    color: {},
    promoCode: null,
    memberId: null,
    productCountry: null,
    productCountrySecondary: null,
    package: {},
    topup: {},
    device: {},
    cartType: "rental",
    quantity: 1,
    startDate: null,
    endDate: null,
    startDateSecondary: null,
    endDateSecondary: null,
    shipping: {},
    shippingAddress: {},
    pickupCountry: null,
    pickupLocation: {},
    paymentCard: {},
  },
  pickupLocations: [
    {
      name: "Albert Village Court Hotel",
      location: {
        city: "Singapore",
        address: {
          street: "180 Albert St",
          postal_code: "189971",
        },
      },
      code: "SG-ALBERT-VILLAGE",
    },
    {
      name: "Marina Bay Grand",
      location: {
        city: "Singapore",
        address: {
          street: "10 Bayfront Ave",
          postal_code: "018956",
        },
      },
      code: "SG-MARINA-BAY",
    },
    {
      name: "The Orchard Palace",
      location: {
        city: "Singapore",
        address: {
          street: "442 Orchard Rd",
          postal_code: "238879",
        },
      },
      code: "SG-ORCHARD-PALACE",
    },
    {
      name: "Riverside Elegance Hotel",
      location: {
        city: "Singapore",
        address: {
          street: "1 Fullerton Rd",
          postal_code: "049213",
        },
      },
      code: "SG-RIVERSIDE-ELEGANCE",
    },
    {
      name: "Sentosa Seaside Resort",
      location: {
        city: "Singapore",
        address: {
          street: "101 Siloso Rd",
          postal_code: "098970",
        },
      },
      code: "SG-SENTOSA-SEASIDE",
    },
    {
      name: "Clarke Quay Luxury Suites",
      location: {
        city: "Singapore",
        address: {
          street: "3 River Valley Rd",
          postal_code: "179024",
        },
      },
      code: "SG-CLARKE-QUAY",
    },
  ],
};

const routerSlice = createSlice({
  name: "routerSlice",
  initialState,
  reducers: {
    setRouterCartData: (state, action) => {
      state.cart = { ...state.cart, ...action?.payload };
    },
    handleNextRouterCart: (state) => {
      localStorage.setItem("router_cart", JSON.stringify(state.cart));
    },
  },
});

export const { setRouterCartData, handleNextRouterCart } = routerSlice.actions;
export default routerSlice.reducer;
