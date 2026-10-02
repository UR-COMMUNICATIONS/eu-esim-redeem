import {
  AddWalletIcon,
  commercialRoutes,
  Communications2Icon,
  ConnectionsIcon,
  corporateRoutes,
  DollarLabelIcon,
  DownloadFillIcon,
  EarthIcon,
  GlobalElipseIcon,
  GlobalRawIcon,
  GlobeIcon,
  images,
  MailerBugIcon,
  MapLocatedIcon,
  MobileWifiIcon,
  NetworkSignalIcon,
  SignalIcon,
  YoutubeThumbnailIcon,
  HandThumbUp,
  FreeDeliveryIcon,
} from ".";

import useDynamicImages from "@/hooks/useDynamicImages";

// c

// h

// n

export const navBarData = () => ({
  commercialNavItems: [
    {
      _id: 1,
      label: commercialRoutes.home.name,
      path: commercialRoutes.home.path,
    },
    {
      _id: 2,
      label: commercialRoutes.pocketWifiHome.name,
      path: commercialRoutes.pocketWifiHome.path,
    },
    {
      _id: 3,
      label: commercialRoutes.routerHome.name,
      path: commercialRoutes.routerHome.path,
    },
    {
      _id: 4,
      label: commercialRoutes.simHome.name,
      path: commercialRoutes.simHome.path,
    },
    { _id: 5, label: "Contact Us", path: "/contact" },
    {
      _id: 6,
      label: commercialRoutes.aboutUs.name,
      path: commercialRoutes.aboutUs.path,
    },
    {
      _id: 7,
      label: corporateRoutes.home.name,
      path: corporateRoutes.home.path,
    },
  ],
});

// languages in array for translating data
// ["en", "es", "fr", "gm", "id", "jp", "ko","ms", "ph", "th", "vi", "zhcn", "zhhk"]

export const languageOptions = [
  {
    _id: 1,
    label: "English",
    value: "en",
    flag: () => useDynamicImages("country-coverage", "uk"),
  },
  {
    _id: 2,
    label: "Chinese (Simplified)",
    value: "zhcn",
    flag: () => useDynamicImages("country-coverage", "China"),
  },
  {
    _id: 3,
    label: "Chinese (Traditional)",
    value: "zhhk",
    flag: () => useDynamicImages("country-coverage", "China"),
  },
  {
    _id: 4,
    label: "Malay",
    value: "ms",
    flag: () => useDynamicImages("country-coverage", "Malaysia"),
  },
  {
    _id: 5,
    label: "Indonesian",
    value: "id",
    flag: () => useDynamicImages("country-coverage", "Indonesia"),
  },
  {
    _id: 6,
    label: "Japanese",
    value: "jp",
    flag: () => useDynamicImages("country-coverage", "Japan"),
  },
  {
    _id: 7,
    label: "Thai",
    value: "th",
    flag: () => useDynamicImages("country-coverage", "Thailand"),
  },
  {
    _id: 8,
    label: "Vietnamese",
    value: "vi",
    flag: () => useDynamicImages("country-coverage", "Vietnam"),
  },
  {
    _id: 9,
    label: "Tagalog",
    value: "ph",
    flag: () => useDynamicImages("country-coverage", "Philippines"),
  },
  {
    _id: 10,
    label: "Spanish",
    value: "es",
    flag: () => useDynamicImages("country-coverage", "Spain"),
  },
  {
    _id: 11,
    label: "German",
    value: "gm",
    flag: () => useDynamicImages("country-coverage", "Germany"),
  },
  {
    _id: 12,
    label: "French",
    value: "fr",
    flag: () => useDynamicImages("country-coverage", "France"),
  },
  {
    _id: 13,
    label: "Korean",
    value: "ko",
    flag: () => useDynamicImages("country-coverage", "korea"),
  },
];

// p

export const productsData = (isTargetCountry) => ({
  productImages: [
    isTargetCountry ? images.japanDeviceBlue : images.japanDeviceGrey,
    images.routerWhite,
    images.pocketWifiSimRed2,
  ],
  cardData: [
    {
      index: 0,
      type: "D",
      title: "Pocket WIFI",
      description:
        "Perfect for Families & Travelers: Connect up to 8 devices with reliable coverage in 90+ countries for stress-free adventures.",
      offer: "50% OFF",
      link: commercialRoutes.productInternetPackages.path,
      deadline: Math.floor(Date.now() / 1000) + 3 * 24 * 60 * 60,
    },
    {
      index: 1,
      type: "R",
      title: "Router",
      description:
        "Built for Events & Businesses: High-speed internet with unlimited data, perfect for organizers and seamless large gatherings",
      offer: "30% OFF",
      link: commercialRoutes.productInternetPackages.path,
      deadline: Math.floor(Date.now() / 1000) + 3 * 24 * 60 * 60,
    },
    {
      index: 2,
      type: "S",
      title: "SIM/eSIM",
      description:
        "Perfect for Personalised Data: Enjoy 1-to-1 data in 160+ countries with flexible plans, easy setup, and instant connection.",
      offer: "20% OFF",
      link: commercialRoutes.productInternetPackages.path,
      deadline: Math.floor(Date.now() / 1000) + 3 * 24 * 60 * 60,
    },
  ],
});

// r

export const regionsData = () => [
  {
    _id: 1,
    image: "asia-region-black",
    title: "Asia",
    value: "asia",
    link: "/country-coverage?region=asia",
  },
  {
    _id: 2,
    image: "america-region-black",
    title: "America",
    value: "americas",
    link: "/country-coverage?region=americas",
  },
  {
    _id: 3,
    image: "africa-region-black",
    title: "Africa",
    value: "africa",
    link: "/country-coverage?region=africa",
  },
  {
    _id: 4,
    image: "australia-region-black",
    title: "Oceania",
    value: "oceania",
    link: "/country-coverage?region=oceania",
  },
  {
    _id: 5,
    image: "europe-region-black",
    title: "Europe",
    value: "europe",
    link: "/country-coverage?region=europe",
  },
];

export const servicesData = () => [
  {
    _id: 1,
    // icon:  <VisaIcon className={"h-4 w-4 md:h-6 md:w-6"} />,
    image: "award_icon", //images.awardicon,
    title: "Top travel data provider with multiple awards",
  },
  {
    _id: 2,
    icon: <EarthIcon className={"h-4 w-4 md:h-6 md:w-6"} />,
    title: "More than 160+ Countries Covered",
  },
  {
    _id: 3,
    icon: <HandThumbUp className={"h-4 w-4 md:h-6 md:w-6"} />,
    title: "Easy Setup without expertise required",
  },
  {
    _id: 4,
    icon: <SignalIcon className={"h-4 w-4 md:h-6 md:w-6"} />,
    title: "Tailored and Flexible Plans",
  },
  {
    _id: 5,
    icon: <DollarLabelIcon className={"h-4 w-4 md:h-6 md:w-6"} />,
    title: "Unbeatable Pricing Guarantee",
  },
];

// f

export const footerData = {
  contact: [
    {
      type: "Call",
      value: "111 222 3456",
    },
    {
      type: "Mail",
      value: "info@demo.com",
    },
  ],
  legals: [
    { title: "Terms of use", path: "#" },
    { title: "Privacy policy", path: "#" },
  ],
  menuData: [
    {
      title: "YOOWIFI",
      links: [
        { label: "About Us", path: "/about-us" },
        { label: "FAQ", path: "/faq" },
        { label: "Download the app", path: "/download" },
        { label: "Contact Us", path: "/contact" },
        { label: "Terms of service", path: "/terms-of-service" },
        { label: "Privacy Policy", path: "/privacy-policy" },
      ],
    },
    {
      title: "FOR YOO",
      links: [
        { label: "Travel Data", path: "/pocket-wifi-details" },
        { label: "Country Coverage", path: "/country-coverage" },
        // { label: "Local Data", path: "/local-data" },
        { label: "Pickup /drop off locations", path: "/pick-drop-location" },
        { label: "Products", path: "/products" },
        { label: "How it works", path: "/how-it-works" },
      ],
    },
    {
      title: "CORPORATE",
      links: [
        { label: "Iot", path: "/iot" },
        { label: "Travel", path: "/corporate-travel" },
        { label: "Travel Agency", path: "/travel-agency" },
        { label: "Maritime Internet", path: "/maritime-internet" },
        { label: "Offices/Roadshow&Event", path: "/offices-roadshow-event" },
      ],
    },
  ],
};

export const howItWorksData = [
  {
    _id: 1,
    type: "Self pickup",
    typeSuffix: "",
    duration: "5 days before travel",
    price: "",
  },

  {
    _id: 2,
    type: "Domestic",
    typeSuffix: "",
    duration: "Within 5 business days",
    price: "",
  },
  {
    _id: 3,
    type: "Domestic express",
    typeSuffix: "",
    duration: "Within 2 business days",
    price: "",
  },
  {
    _id: 4,
    type: "Domestic super express",
    typeSuffix: "",
    duration: "Same business day before 2PM",
    price: "",
  },
];

export const rentWifiData = [
  {
    step: "Step-1",
    title: "Get Yoowifi App",
    description: "Download Yoowifi App (First time only)",
    buttonText: "Download Yoowifi",
    icon: () => <DownloadFillIcon className="w-4 h-4 md:w-6 md:h-6" />,
  },
  {
    step: "Step-2",
    title: "Select Your Plan",
    description:
      "On the app, search for your destination country, choose the data size, and set your start and end dates.",
  },
  {
    step: "Step-3",
    title: "Complete Your Booking",
    description:
      "Select your preferred shipping method and proceed to checkout.",
  },
];

export const rentServicesData = [
  {
    _id: 1,
    title: "Local return mailer bag",
    description:
      "Simply pack the device and accessories with the prepaid mailer bag and drop it into any SingPost mail box.",
    icon: () => <MailerBugIcon className="w-12 h-12 md:w-15 md:h-15" />,
  },
  {
    _id: 2,
    title: "Self-Return",
    description:
      "Simply pack the device and accessories and return it at any Pickup & Return Location.",
    icon: () => <MapLocatedIcon className="w-12 h-12 md:w-15 md:h-15" />,
  },
  {
    _id: 3,
    title: "International Courier",
    description:
      "Contact your local DHL or other courier to pick up device and accessories.",
    icon: () => <GlobalRawIcon className="w-12 h-12 md:w-15 md:h-15" />,
  },
];

export const selfReturnData = [
  {
    _id: 1,
    title: "Login to Yoowifi App",
    description:
      "Start by visiting any of our 20+ pickup and return locations. On the app, go to 'My Data', select the device you wish to return, and tap on 'Return Device'.",
  },
  {
    _id: 2,
    title: "Scan Location QR Code",
    description: "Next, scan the location QR code provided by the staff.",
  },
  {
    _id: 3,
    title: "Scan Device QR Code",
    description:
      "Scan the QR code located at the back of the device to complete the return.",
  },
];

export const topUpData = [
  {
    _id: 1,
    title: "Select Your Device",
    description:
      "Open the Yoowifi app, go to My Data, and select the device you want to top up.",
  },
  {
    _id: 2,
    title: "Choose Your Plan",
    description:
      "Click on Add Data, select your desired country and plan, then set the start and end dates.",
  },
  {
    _id: 3,
    title: "Proceed to Checkout",
    description: "Confirm your selections and proceed to checkout.",
  },
];

export const affiliateServiceData = [
  {
    _id: 1,
    title: "Select Your Device",
    description:
      "Open the Yoowifi app, go to My Data, and select the device you want to top up.",
    icon: () => <GlobalElipseIcon className="w-12 h-12 md:w-10 md:h-10" />,
  },
  {
    _id: 2,
    title: "Choose Your Plan",
    description:
      "Click on Add Data, select your desired country and plan, then set the start and end dates.",
    icon: () => <MobileWifiIcon className="w-12 h-12 md:w-10 md:h-10" />,
  },
  {
    _id: 3,
    title: "Proceed to Checkout",
    description: "Confirm your selections and proceed to checkout.",
    icon: () => <YoutubeThumbnailIcon className="w-12 h-12 md:w-10 md:h-10" />,
  },
];

// g
export const getYourOwnData = () => ({
  title: "Grab Your Own Brand New Pocket Wifi Today!",
  features: [
    {
      icon: <GlobeIcon className={"h-4 w-4 md:h-6 md:w-6"} />,
      text: "Annual coverage in over 90 countries",
    },
    {
      icon: <Communications2Icon className={"h-4 w-4 md:h-6 md:w-6"} />,
      text: "Share up to 8 devices",
    },
    {
      icon: <NetworkSignalIcon className={"h-4 w-4 md:h-6 md:w-6"} />,
      text: "Up to 5G connectivity",
    },
    {
      icon: <AddWalletIcon className={"h-4 w-4 md:h-6 md:w-6"} />,
      text: "Data top up available",
    },
    {
      icon: <DollarLabelIcon className={"h-4 w-4 md:h-6 md:w-6"} />,
      text: "Choose from 50GB, 100GB, or 200GB data plans",
    },
    // {
    //   icon: <FreeDeliveryIcon className={"h-4 w-4 md:h-7 md:w-7"} color="#E41F26" />,
    //   text: "Free Delivery",
    // },
  ],
  button: {
    text: "Buy Now",
  },
});

export const countryOptions = [
  {
    _id: 1,
    label: "America",
    value: "america",
    region: "america",
    flag: () => useDynamicImages("country-coverage", "uk"),
  },
  {
    _id: 2,
    label: "China",
    value: "china",
    region: "asia",
    flag: () => useDynamicImages("country-coverage", "China"),
  },
  {
    _id: 3,
    label: "Malaysia",
    value: "malaysia",
    region: "asia",
    flag: () => useDynamicImages("country-coverage", "Malaysia"),
  },
  {
    _id: 4,
    label: "Indonesia",
    value: "indonesia",
    region: "asia",
    flag: () => useDynamicImages("country-coverage", "Indonesia"),
  },
  {
    _id: 5,
    label: "Japan",
    value: "japan",
    region: "asia",
    flag: () => useDynamicImages("country-coverage", "japan"),
  },
  {
    _id: 6,
    label: "Thailand",
    value: "thailand",
    region: "asia",
    flag: () => useDynamicImages("country-coverage", "Thailand"),
  },
  {
    _id: 7,
    label: "Vietnam",
    value: "vietnam",
    region: "asia",
    flag: () => useDynamicImages("country-coverage", "Vietnam"),
  },
  {
    _id: 8,
    label: "Phillipine",
    value: "phillipine",
    region: "asia",
    flag: () => useDynamicImages("country-coverage", "Philippines"),
  },
  {
    _id: 9,
    label: "Spain",
    value: "spain",
    region: "europe",
    flag: () => useDynamicImages("country-coverage", "Spain"),
  },
  {
    _id: 10,
    label: "Germany",
    value: "germany",
    region: "europe",
    flag: () => useDynamicImages("country-coverage", "Germany"),
  },
  {
    _id: 11,
    label: "France",
    value: "france",
    region: "europe",
    flag: () => useDynamicImages("country-coverage", "France"),
  },
];
