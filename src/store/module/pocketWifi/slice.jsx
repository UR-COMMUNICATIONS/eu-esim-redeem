import {
  AppCustomizationIcon,
  BatteryIcon,
  CloudIcon,
  CustomSolutionIcon,
  EmployeeIcon,
  GlobeDataIcon,
  GlobePhoneIcon,
  HandPhoneIcon,
  images,
  InternetCoverageIcon,
  LteSpeedIcon,
  MoneyIcon,
  MultihomingNetwrokIcon,
  OrganizationIcon,
  PartnershipIcon,
  ProjectIcon,
  ShareGroupIcon,
} from "@/services";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {
    name: "Pocket Wifi",
    descriptionHighlight: "Perfect for Travelers:",
    description:
      "Secure, reliable internet across multiple countries without roaming fees. Ideal for remote workers, travelers, families, and social media enthusiasts, connecting multiple devices seamlessly.",
    features: [
      "Connect up to 10 devices at once",
      "Coverage in 90+ countries",
      "Stay connected with ease during family adventures",
    ],
    colors: [
      { name: "Red", hex: "#7d0907" },
      { name: "Purple", hex: "#541553" },
      { name: "Blue", hex: "#34547d" },
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
        content: "1x Charging Cable\n1x Device Pouch",
        // "50GB global data is applicable to 90 countries.\nSpeed of service is dependent on the mobile network partner.\nFor order cancellation, a charge of 10% of the order will apply.\nGeneral terms and conditions apply.\nYoowifi reserved the rights to make changes anytime.",
      },
      // {
      //   title: "Terms & Conditions",
      //   content:
      //     "Albania, Andorra, Armenia, Australia, Austria, Bahrain, Bangladesh, Belgium, Bosnia and Herzegovina, Brunei, Bulgaria, Cambodia, Canada, China, Croatia, Cyprus, Czech Republic, Denmark, Egypt, Estonia, Finland, France, Georgia, Germany, Gibraltar, Greece, Guernsey, Hong Kong, Hungary, Iceland, India, Indonesia, Ireland, Isle of Man, Israel, Italy, Japan, Jersey, Jordan, Kazakhstan, Kuwait, Laos, Latvia, Liechtenstein Lithuania, Luxembourg, Macau, Macedonia, Malaysia, Malta, Mexico, Monaco, Montenegro, Myanmar, Netherlands, New Zealand, Norway, Oman, Pakistan, Philippines, Poland, Portugal, Qatar, Reunion, Romania, Russia, San Marino, Saudi Arabia, Serbia, Slovakia, Slovenia, South Korea, Spain, Sri Lanka, Sweden, Switzerland, Taiwan, Thailand, Turkey, UAE, Ukraine, United Kingdom, USA, Uzbekistan, Vatican, Vietnam",
      // },
    ],
    jpImages: [
      // {
      //   url: images.japanDeviceGrey,
      //   alt: "Pocket Wifi device blue device view",
      //   note: "*Devices are subject to availability and allocated based on stock at the time of rental*",
      // },
      // {
      //   url: images.japanDeviceGrey,
      //   alt: "Pocket Wifi device left view",
      //   note: "*Devices are subject to availability and allocated based on stock at the time of rental*",
      // },
      // {
      //   url: images.japanDeviceYellow,
      //   alt: "Pocket Wifi device left view",
      //   note: "*Devices are subject to availability and allocated based on stock at the time of rental*",
      // },
      {
        url: images.japanDeviceBlue,
        alt: "Pocket Wifi device red device view",
        note: "*Devices are subject to availability and allocated based on stock at the time of rental*",
      },
      // {
      //   url: images.blackpocketwifienblue,
      //   alt: "Pocket Wifi device blue device view",
      //   note: "*Devices are subject to availability and allocated based on stock at the time of rental*",
      // },
      // {
      //   url: images.blackpocketwifienleft,
      //   alt: "Pocket Wifi device left view",
      //   note: "*Devices are subject to availability and allocated based on stock at the time of rental*",
      // },
      // {
      //   url: images.yoowifideviceold,
      //   alt: "Pocket Wifi device left view",
      //   note: "*Devices are subject to availability and allocated based on stock at the time of rental*",
      // },
      // {
      //   url: images.devicesiideold,
      //   alt: "Pocket Wifi device left view",
      //   note: "*Devices are subject to availability and allocated based on stock at the time of rental*",
      // },
      // {
      //   url: images.devicebottomold,
      //   alt: "Pocket Wifi device left view",
      //   note: "*Devices are subject to availability and allocated based on stock at the time of rental*",
      // },
    ],
    // images: [
    //   {
    //     url: images.blackpocketwifienfront,
    //     alt: "Pocket Wifi device left view",
    //     note: "*Devices are subject to availability and allocated based on stock at the time of rental*",
    //   },
    //   {
    //     url: images.blackpocketwifienfront,
    //     alt: "Pocket Wifi device left view",
    //     note: "*Devices are subject to availability and allocated based on stock at the time of rental*",
    //   },
    //   {
    //     url: images.blackpocketwifienred,
    //     alt: "Pocket Wifi device red device view",
    //     note: "*Devices are subject to availability and allocated based on stock at the time of rental*",
    //   },
    //   {
    //     url: images.blackpocketwifienblue,
    //     alt: "Pocket Wifi device blue device view",
    //     note: "*Devices are subject to availability and allocated based on stock at the time of rental*",
    //   },
    //   {
    //     url: images.blackpocketwifienleft,
    //     alt: "Pocket Wifi device left view",
    //     note: "*Devices are subject to availability and allocated based on stock at the time of rental*",
    //   },
    //   {
    //     url: images.yoowifideviceold,
    //     alt: "Pocket Wifi device left view",
    //     note: "*Devices are subject to availability and allocated based on stock at the time of rental*",
    //   },
    //   {
    //     url: images.devicesiideold,
    //     alt: "Pocket Wifi device left view",
    //     note: "*Devices are subject to availability and allocated based on stock at the time of rental*",
    //   },
    //   {
    //     url: images.devicebottomold,
    //     alt: "Pocket Wifi device left view",
    //     note: "*Devices are subject to availability and allocated based on stock at the time of rental*",
    //   },
    // ],
       images: [
      {
        url: images.japanDeviceGrey,
        alt: "Pocket Wifi device left view",
        note: "*Devices are subject to availability and allocated based on stock at the time of rental*",
      },
      {
        url: images.japanDeviceGrey,
        alt: "Pocket Wifi device left view",
        note: "*Devices are subject to availability and allocated based on stock at the time of rental*",
      },
      {
        url: images.japanDeviceYellow,
        alt: "Pocket Wifi device left view",
        note: "*Devices are subject to availability and allocated based on stock at the time of rental*",
      },
      {
        url: images.japanDeviceBlue,
        alt: "Pocket Wifi device red device view",
        note: "*Devices are subject to availability and allocated based on stock at the time of rental*",
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
      information: "",
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
      information: "",
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
      category: "multi-country",
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
      information: "",
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
      information: "",
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
      information: "",
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
      category: "volumn",
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
      information: "",
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
      information: "",
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
      category: "volumn",
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
      information: "",
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
      information: "",
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
      information: "",
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
      icon: () => <ShareGroupIcon />,
      title: "Share up to \n 8 devices",
    },
    {
      icon: () => <BatteryIcon />,
      title: "12 Hour Battery Life",
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
  aboutUs: [
    {
      _id: 1,
      title: "Enterprise Solutions",
      icon: () => (
        <EmployeeIcon className="w-10 h-10 lg:w-[60px] lg:h-[60px]" />
      ),
      content:
        "Reliable, secure internet connectivity for businesses on-the-go, with scalable, efficient solutions that ensure seamless integration and smooth operations anywhere",
    },
    {
      _id: 2,
      title: "Partnerships",
      icon: () => (
        <PartnershipIcon className="w-10 h-10 lg:w-[60px] lg:h-[60px]" />
      ),
      content:
        "Our partnerships are built on trust and collaboration, working together to drive innovation, expand opportunities, and create mutual success",
    },
    {
      _id: 3,
      title: "Custom Solutions",
      icon: () => (
        <CustomSolutionIcon className="w-10 h-10 lg:w-[60px] lg:h-[60px]" />
      ),
      content:
        "Discover our custom solutions tailored to meet your unique needs. We work closely with you to design innovative, flexible services that drive success and enhance your business outcomes",
    },
  ],
  services: [
    {
      _id: 1,
      icon: () => (
        <InternetCoverageIcon className="w-10 h-10 lg:w-[60px] lg:h-[60px]" />
      ),
      title: "Global Coverage",
      content:
        "Stay connected across 160 countries, no matter where your journey takes you with Yoowifi's travel wifi services.",
    },
    {
      _id: 2,
      icon: () => (
        <MultihomingNetwrokIcon className="w-10 h-10 lg:w-[60px] lg:h-[60px]" />
      ),
      title: "Multihoming Network",
      content:
        "Ensure uninterrupted connectivity with our multi-homing network, offering multiple connections for enhanced reliability and performance",
    },
    {
      _id: 3,
      icon: () => (
        <OrganizationIcon className="w-10 h-10 lg:w-[60px] lg:h-[60px]" />
      ),
      title: "Zero Touch on Demand",
      content:
        "Our cloud-based portal preconfigures and deploys services for zero-touch on-demand connectivity, technical expertise required on-site.",
    },
    {
      _id: 4,
      icon: () => <MoneyIcon className="w-10 h-10 lg:w-[60px] lg:h-[60px]" />,
      title: "Cost Efficient Service",
      content:
        "Enjoy high-quality services at competitive prices, designed to deliver maximum value while staying cost-effective",
    },
    {
      _id: 5,
      icon: () => <ProjectIcon className="w-10 h-10 lg:w-[60px] lg:h-[60px]" />,
      title: "Management Portal",
      content:
        "Our management portal provides a user-friendly platform for seamless control and monitoring, empowering you to manage services efficiently",
    },
    {
      _id: 6,
      icon: () => (
        <AppCustomizationIcon className="w-10 h-10 lg:w-[60px] lg:h-[60px]" />
      ),
      title: "App Customization",
      content:
        "Customize your app for a personalized experience, tailored to your brand and goals",
    },
  ],
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
  whatWeDo: [
    {
      _id: 1,
      title: "Business Continuity Plan",
      content:
        "Yoowifi offer a technological solution that provides a robust and highly redundant platform to keep your business connected and continue operating despite uncertainties.",
    },
    {
      _id: 2,
      title: "In-vehicle Connectivity",
      content:
        "Yoowifi supply the necessary bandwidth for secure transmission and receipt of data, whether it is being transmitted in-state or across different countries.",
    },
    {
      _id: 3,
      title: "Remote Working",
      content:
        "Our remote working solutions ensure uninterrupted connectivity, allowing teams to collaborate efficiently and stay productive, regardless of location.",
    },
    {
      _id: 4,
      title: "Connectivity for Events",
      content:
        "Ensure flawless event experiences with our reliable connectivity solutions, offering fast, secure internet that keeps your event running smoothly from start to finish",
    },
    {
      _id: 5,
      title: "Travel Agency Solutions",
      content:
        "We partner with travel agencies to provide the best internet solutions, ensuring seamless connectivity for travelers and enhancing the overall travel experience",
    },
    {
      _id: 6,
      title: "Hotels",
      content:
        "We offer customized internet solutions for hotels, ensuring fast, reliable connectivity that enhances guest satisfaction and supports efficient hotel operations",
    },
  ],
  benefitsData: [
    {
      _id: 1,
      title: "Dedicated Application",
      content:
        "Take charge of your connectivity needs with our online management portal, empowering you with control for a smooth and effortless experience.",
      icon: () => (
        <HandPhoneIcon className="w-[48px] h-[48px] lg:w-[80px] lg:h-[80px]" />
      ),
    },
    {
      _id: 2,
      title: "Cost Efficient",
      content:
        "Experience affordable and hassle-free connectivity with Yoowifi's vSIM technology, eliminating costly roaming charges for budget-friendly data services.",
      icon: () => (
        <MoneyIcon className="w-[48px] h-[48px] lg:w-[80px] lg:h-[80px]" />
      ),
    },
    {
      _id: 3,
      title: "Customisable Data Plans",
      content:
        "Tailor your data package to meet your specific needs and scale as your business grows.",
      icon: () => (
        <GlobePhoneIcon className="w-[48px] h-[48px] lg:w-[80px] lg:h-[80px]" />
      ),
    },
  ],
};

const pocketWifiSlice = createSlice({
  name: "pocketWifiSlice",
  initialState,
  reducers: {
    setPocketWifiCartData: (state, action) => {
      state.cart = { ...state.cart, ...action?.payload };
    },
    handleNextPocketWifiCart: (state) => {
      localStorage.setItem("pocket_wifi_cart", JSON.stringify(state.cart));
    },
  },
});

export const { setPocketWifiCartData, handleNextPocketWifiCart } =
  pocketWifiSlice.actions;

export default pocketWifiSlice.reducer;
