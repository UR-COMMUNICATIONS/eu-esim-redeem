import { modulesURLPath } from "@/constants/urls";

const commercialRoutes = {
  commercialLayout: {
    path: "/",
    name: "Home",
    activePath: "home",
  },

  home: {
    path: "/",
    name: "Home",
    activePath: "home",
  },

  quickSignupAna: {
    path: "/ana/register",
    name: "QuickSignupAna",
    activePath: "quicksignupana",
    /** POST https://crm.yoowifi.com:8443/jane/getAnaStats (proxied as /crm-jane in dev) */
    getAnaStatsApi: modulesURLPath.Jane.getAnaStats,
  },

  quickSignupNatas: {
    path: "/natas/redeem",
    name: "QuickSignupNatas",
    activePath: "quicksignupnatas",
  },
  natasPrivacy: {
    path: "/natas/privacy-policy",
    name: "YoowifiNatas",
    activePath: "Yoowifinatas",
  },

  // Voucher-driven eSIM redemption for the NATAS travel fair. Plan, variation,
  // and destination are all resolved from the promocode/varid query params —
  // unrelated to quickSignupNatas above (that's the older lead-capture form).
  natasEsimRedeem: {
    path: "/natas/esim-redeem",
    name: "Natas eSIM Redeem",
    activePath: "natasEsimRedeem",
  },

  // This app's campaign page, reached from the partner site with
  // ?promocode=XXX&varid=N. Same flow as natasEsimRedeem.
  euEsimRedeem: {
    path: "/EU/esim-redeem",
    name: "EU eSIM Redeem",
    activePath: "euEsimRedeem",
  },

  // The voucher-driven claim pages that stop at "download the app to
  // activate" — same flow as natasEsimRedeem, no eSIM activation.
  yw3gbEsimRedeem: {
    path: "/yw3gb",
    name: "YW3GB Free eSIM",
    activePath: "yw3gbEsimRedeem",
  },
  // One URL for every travel-agency voucher. The promo code decides the
  // branding: MYB* renders the Maybank variant, anything else the plain one.
  esimPartnerRedeem: {
    path: "/natas/esimpartner-redeem",
    name: "Travel Agency eSIM Redeem",
    activePath: "esimPartnerRedeem",
  },
  productInternetPackages: {
    path: "/product/internet-packages",
    name: "Product Internet Packages",
    activePath: "internet-packages",
  },

  paymentLink: {
    path: "/payment-link/:orderId",
    name: "Payment Link",
    activePath: "payment-link",
  },

  // astindoInternetPackages: {
  //   path: "/astindo/internet-packages",
  //   name: "Product Internet Packages",
  //   activePath: "internet-packages",
  // },

  astindoCartService: {
    path: "/astindo/cart-service",
    name: "Astindo Cart Service",
    activePath: "cart-service",
  },

  pocketWifiHome: {
    path: "/product/pocket-wifi",
    name: "Pocket Wifi",
    activePath: "pocket-wifi",
  },

  routerHome: {
    path: "/product/router",
    name: "Router",
    activePath: "router",
  },

  simHome: {
    path: "/product/sim",
    name: "SIM/eSIM",
    activePath: "sim",
  },

  simEsimHome: {
    path: "/product/sim-esim",
    name: "SIM/eSIM",
    activePath: "sim",
  },

  // pocket wifi
  pocketWifiLayout: {
    path: "/pocket-wifi",
    name: "Pocket Wifi",
    activePath: "pocketWifi",
  },

  pocketWifiRegion: {
    path: "/pocket-wifi/region",
    name: "Pocket Wifi",
    activePath: "pocketWifi",
  },

  pocketWifiPlan: {
    path: "/pocket-wifi/wifi-plan",
    name: "Pocket Wifi",
    activePath: "pocketWifi",
  },

  pocketWifiCartService: {
    path: "/pocket-wifi/cart-service",
    name: "Pocket Wifi",
    activePath: "pocketWifi",
  },

  pocketWifiPlanSummery: {
    path: "/pocket-wifi/wifi-plan-summary",
    name: "Pocket Wifi",
    activePath: "pocketWifi",
  },

  pocketWifiShippingOption: {
    path: "/pocket-wifi/shipping-option",
    name: "Pocket Wifi",
    activePath: "pocketWifi",
  },

  pocketWifiSelfPickup: {
    path: "/pocket-wifi/shipping-option/self-pickup",
    name: "Pocket Wifi",
    activePath: "pocketWifi",
  },

  pocketWifiOrderSummery: {
    path: "/pocket-wifi/order-summary",
    name: "Pocket Wifi",
    activePath: "pocketWifi",
  },

  pocketWifiDetails: {
    path: "/pocket-wifi-details",
    name: "Pocket Wifi Details",
    activePath: "pocketWifi",
  },

  simEsimDetails: {
    //  need to check
    path: "/sim-esim-details",
    name: "Sim Esim Details",
    activePath: "simEsimDetails",
  },

  // router
  routerLayout: {
    path: "/router",
    name: "Router",
    activePath: "router",
  },

  routerRegion: {
    path: "/router/region",
    name: "Router Region",
    activePath: "router",
  },
  routerPlan: {
    path: "/router/router-plan",
    name: "Router Plan",
    activePath: "router",
  },
  routerCartService: {
    path: "/router/cart-service",
    name: "Router Cart Service",
    activePath: "router",
  },
  routerPlanSummery: {
    path: "/router/router-plan-summery",
    name: "Router Plan Summery",
    activePath: "router",
  },
  routerShippingOption: {
    path: "/router/shipping-option",
    name: "Router Shipping Option",
    activePath: "router",
  },
  routerSelfPickup: {
    path: "/router/shipping-option/self-pickup",
    name: "Router Self Pickup",
    activePath: "router",
  },
  routerOrderSummery: {
    path: "/router/order-summery",
    name: "Router Order Summery",
    activePath: "router",
  },

  // eSim
  simLayout: {
    path: "/sim",
    name: "Sim/eSim",
    activePath: "sim",
  },

  simRegion: {
    path: "/sim/region",
    name: "Router Region",
    activePath: "router",
  },
  simPlan: {
    path: "/sim/sim-plan",
    name: "Sim Plan",
    activePath: "sim",
  },
  simCartService: {
    path: "/sim/cart-service",
    name: "Sim Cart Service",
    activePath: "sim",
  },
  simPlanSummery: {
    path: "/sim/sim-plan-summery",
    name: "Sim Plan Summery",
    activePath: "sim",
  },
  simShippingOption: {
    path: "/sim/shipping-option",
    name: "Sim Shipping Option",
    activePath: "sim",
  },
  simSelfPickup: {
    path: "/sim/shipping-option/self-pickup",
    name: "Sim Self Pickup",
    activePath: "sim",
  },
  simOrderSummery: {
    path: "/sim/order-summery",
    name: "Sim Order Summery",
    activePath: "sim",
  },
  // about us
  aboutUs: {
    path: "/about-us",
    name: "About Us",
    activePath: "about-us",
  },

  //deleteAccount
  deleteAccountUpperCase: {
    path: "/DeleteAccount",
    name: "Delete Account",
    activePath: "DeleteAccount",
  },

  deleteAccount: {
    path: "/deleteAccount",
    name: "Delete Account",
    activePath: "DeleteAccount",
  },

  // contact
  contact: {
    path: "/contact",
    name: "Contact Us",
    activePath: "contact",
  },

  privacyPolicy: {
    path: "/privacy-policy",
    name: "Privacy Policy",
    activePath: "PrivacyPolicy",
  },

  euPrivacyPolicy: {
    path: "/euwifi/privacy-policy",
    name: "EU Privacy Policy",
    activePath: "EuPrivacyPolicy",
  },

  euTermsAndConditions: {
    path: "/euwifi/terms-and-conditions",
    name: "EU Terms and Conditions",
    activePath: "EuTermsAndConditions",
  },
  anaPrivacyPolicy: {
    path: "https://www.ana.co.jp/wws/privacy/e/ana.html",
    name: "ANA Privacy Policy",
    activePath: "ANA Privacy Policy",
  },

  termsService: {
    path: "/terms-services",
    name: "Terms Service",
    activePath: "TermsService",
  },

  privacyPolicyUpperCase: {
    path: "/PrivacyPolicy",
    name: "Privacy Policy",
    activePath: "PrivacyPolicy",
  },

  termsServiceUpperCase: {
    path: "/TermsService",
    name: "Terms Service",
    activePath: "TermsService",
  },

  legalNotice: {
    // need to check
    path: "/legal-notice",
    name: "Legal Notice",
    activePath: "LegalNotice",
  },

  // country coverage
  countryCoverage: {
    path: "/country-coverage",
    name: "Country Coverage",
    activePath: "countryCoverage",
  },

  countryCoverageFilter: {
    path: "/country-coverage/filter",
    name: "Country Coverage Filter",
    activePath: "countryCoverageFilter",
  },

  packageDetails: {
    path: "/package/details",
    name: "Package Details",
    activePath: "packageDetails",
  },

  howItWorks: {
    path: "/how-it-works",
    name: "How It Works",
    activePath: "howItWorks",
  },

  affiliate: {
    path: "/affiliate",
    name: "Affiliate",
    activePath: "affiliate",
  },

  // pick drop location
  pickDropLocation: {
    path: "/pick-drop-location",
    name: "Pick Drop Location",
    activePath: "pickDropLocation",
  },

  // how to
  howToSetupSim: {
    path: "/how-to-setup-sim",
    name: "How to Setup Sim",
    activePath: "howToSetupSim",
  },

  howToConnectPocketWifi: {
    path: "/how-to-connect-pocket-wifi",
    name: "How to Connect PocketWifi",
    activePath: "howToConnectPocketWifi",
  },

  faq: {
    path: "/faq",
    name: "FAQ",
    activePath: "faq",
  },

  anaxYoowifi: {
    // need to check
    path: "/ANAxYoowifi",
    name: "ANAx Yoowifi",
    activePath: "ANAxYoowifi",
  },

  downloadApp: {
    // need to check
    path: "/for-yoo/download-app",
    name: "DownloadApp",
    activePath: "DownloadApp",
  },

  deviceUpgrade: {
    path: "/DeviceUpgrade",
    name: "Device Upgrade",
    activePath: "DeviceUpgrade",
  },

  deviceUpgradePH: {
    // need to check
    path: "/ph/DeviceUpgradePH",
    name: "Device UpgradePH",
    activePath: "DeviceUpgradePH",
  },

  pocketWifiChina: {
    path: "/pocket-wifi-china",
    name: "Pocket wifi China",
    activePath: "pocketWifi",
  },

  pocketWifiJapan: {
    path: "/pocket-wifi-japan",
    name: "Pocket wifi Thailand",
    activePath: "pocketWifi",
  },

  esimChina: {
    path: "/esim-china",
    name: "eSIM China",
    activePath: "sim",
  },

  esimThailand: {
    path: "/esim-thailand",
    name: "eSIM Thailand",
    activePath: "sim",
  },

  // kol: {
  //   path: "/kol",
  //   name: "Kol",
  //   activePath: "Kol",
  // },

  // frwfana: {
  //   path: "/frwfana",
  //   name: "frwFana",
  //   activePath: "frwFana",
  // },

  // frwfanaRegister: {
  //   path: "/frwfana/register",
  //   name: "Frwfana Register",
  //   activePath: "FrwfanaRegister",
  // },

  // frwfanaOrderConfirmation: {
  //   path: "/frwfana/place-order",
  //   name: "Confirmation Message",
  //   activePath: "ConfirmationMessage",
  // },

  // frwfanaOrderSummary: {
  //   path: "/frwfana/order-summary",
  //   name: "Frwfana Order Summary",
  //   activePath: "FrwfanaOrderSummary",
  // },

  // frwfanaQr: {
  //   path: "/frwfana/qrcode",
  //   name: "FrwfanaQrCode",
  //   activePath: "FrwfanaQrCode",
  // },

  // kolRegister: {
  //   path: "/kol/register",
  //   name: "Kol Register",
  //   activePath: "KolRegister",
  // },

  // kolOrderConfirmation: {
  //   path: "/kol/place-order",
  //   name: "Confirmation Message",
  //   activePath: "ConfirmationMessage",
  // },

  // kolOrderSummary: {
  //   path: "/kol/order-summary",
  //   name: "Kol Order Summary",
  //   activePath: "kolOrderSummary",
  // },

  // kolQr: {
  //   path: "/kol/qrcode",
  //   name: "QrCode",
  //   activePath: "QrCode",
  // },

  // jtb: {
  //   path: "/fsim",
  //   name: "Fsim",
  //   activePath: "Fsim",
  // },

  // jtbRegister: {
  //   path: "/fsim/register",
  //   name: "Fsim Register",
  //   activePath: "FsimRegister",
  // },

  // jtbOrderConfirmation: {
  //   path: "/fsim/place-order",
  //   name: "Confirmation Message",
  //   activePath: "ConfirmationMessage",
  // },

  // jtbQr: {
  //   path: "/fsim/qrcode",
  //   name: "QrCode",
  //   activePath: "QrCode",
  // },

  // airAsia: {
  //   path: "/airasia",
  //   name: "AirAsia",
  //   activePath: "AirAsia",
  // },

  // airAsiaRegister: {
  //   path: "/airasia/register",
  //   name: "AirAsia Register",
  //   activePath: "AirAsiaRegister",
  // },

  // airAsiaOrderConfirmation: {
  //   path: "/airasia/place-order",
  //   name: "Confirmation Message",
  //   activePath: "ConfirmationMessage",
  // },

  // airAsiaQr: {
  //   path: "/airasia/qrcode",
  //   name: "QrCode",
  //   activePath: "QrCode",
  // },

  // astindo: {
  //   path: "/astindo",
  //   name: "Astindo",
  //   activePath: "Astindo",
  // },

  // astindoRegister: {
  //   path: "/astindo/register",
  //   name: "Aastindo Register",
  //   activePath: "AstindoRegister",
  // },

  // astindoOrderConfirmation: {
  //   path: "/astindo/place-order",
  //   name: "Confirmation Message",
  //   activePath: "ConfirmationMessage",
  // },

  // astindoQr: {
  //   path: "/astindo/qrcode",
  //   name: "QrCode",
  //   activePath: "QrCode",
  // },

  japanEsimKddi: {
    path: "/japan-esim-kddi",
    name: "Japan Esim Kddi",
    activePath: "JapanEsimKddi",
  },

  freeEsimWorld: {
    path: "/free-esim-world",
    name: "Free Esim World",
    activePath: "FreeEsimWorld",
  },

  blogListing: {
    path: "/blog",
    name: "Blog",
    activePath: "Blog",
  },
  blog: {
    path: "/blog/:slug",
    name: "Blog Post",
    activePath: "Blog",
  },
  stayConnected: {
    path: "/blog/stay-connected",
    name: "Stay Connected",
    activePath: "StayConnected",
  },
  travelGuide: {
    path: "/blog/travel-guide",
    name: "Travel Guide",
    activePath: "TravelGuide",
  },
  // GoogleCaptcha: {
  //   path: "/captcha",
  //   name: "captcha",
  //   activePath: "captcha",
  // },

  // userProfile: {
  //   path: "/my-profile",
  //   name: "User Profile",
  //   activePath: "UserProfile",
  // },
  // userHome: {
  //   path: "/my-home",
  //   name: "User Home",
  //   activePath: "UserHome",
  // },
  // userOrder: {
  //   path: "/my-order",
  //   name: "User Order",
  //   activePath: "UserOrder",
  // },
  // orderDetails: {
  //   path: "/order-details",
  //   name: "Order Details",
  //   activePath: "OrderDetails",
  // },
  // addNewOrder: {
  //   path: "/add-new-order",
  //   name: "Add New Order",
  //   activePath: "AddNewOrder",
  // },
  // addNewData: {
  //   path: "/add-new-data",
  //   name: "Add New Data",
  //   activePath: "AddNewData",
  // },
  // userAddress: {
  //   path: "/my-address",
  //   name: "User Address",
  //   activePath: "UserAddress",
  // },
  // userData: {
  //   path: "/my-data",
  //   name: "User Data",
  //   activePath: "UserData",
  // },
  // dataDetails: {
  //   path: "/data-details",
  //   name: "Data Details",
  //   activePath: "DataDetails",
  // },
  // userCards: {
  //   path: "/my-card",
  //   name: "User Cards",
  //   activePath: "UserCards",
  // },
  // addNewCards: {
  //   path: "/my-card/add-new-card",
  //   name: "Add New Cards",
  //   activePath: "AddNewCards",
  // },
  // addNewAddress: {
  //   path: "/my-address/add-new-ddress",
  //   name: "Add New Address",
  //   activePath: "AddNewAddress",
  // },

  userAccountLayout: {
    path: "/user-account",
    name: "User Account",
    activePath: "UserAccount",
  },
  userHome: {
    path: "/user-account/my-home",
    name: "User Home",
    activePath: "UserHome",
  },
  userOrder: {
    path: "/user-account/my-order",
    name: "User Order",
    activePath: "UserOrder",
  },
  userData: {
    path: "/user-account/my-data",
    name: "User Data",
    activePath: "UserData",
  },
  userCards: {
    path: "/user-account/my-card",
    name: "User Cards",
    activePath: "UserCards",
  },
  userProfile: {
    path: "/user-account/my-profile",
    name: "User Profile",
    activePath: "UserProfile",
  },
  orderDetails: {
    path: "/user-account/order-details",
    name: "Order Details",
    activePath: "OrderDetails",
  },
  dataDetails: {
    path: "/user-account/data-details",
    name: "Data Details",
    activePath: "DataDetails",
  },
  addNewOrder: {
    path: "/user-account/add-new-order",
    name: "Add New Order",
    activePath: "AddNewOrder",
  },
  addNewData: {
    path: "/user-account/add-new-data",
    name: "Add New Data",
    activePath: "AddNewData",
  },
  userAddress: {
    path: "/user-account/my-address",
    name: "User Address",
    activePath: "UserAddress",
  },
  addNewCards: {
    path: "/user-account/my-card/add-new-card",
    name: "Add New Cards",
    activePath: "AddNewCards",
  },
  addNewAddress: {
    path: "/user-account/my-address/add-new-ddress",
    name: "Add New Address",
    activePath: "AddNewAddress",
  },
  editAddress: {
    path: "/user-account/my-address/edit-address/:id",
    name: "Edit Address",
    activePath: "EditAddress",
  },
  howtoUseHK: {
    path: "/how-to-use-hk",
    name: "howtoUseHK",
    activePath: "howtoUseHK",
  },
  howtoUseID: {
    path: "/how-to-use-id",
    name: "howtoUseID",
    activePath: "howtoUseID",
  },
  howtoUseTH: {
    path: "/how-to-use-th",
    name: "howtoUseTH",
    activePath: "howtoUseTH",
  },
  howtoUseTW: {
    path: "/how-to-use-tw",
    name: "howtoUseHK",
    activePath: "howtoUseTW",
  },
  howtoUseVN: {
    path: "/how-to-use-vn",
    name: "howtoUseVN",
    activePath: "howtoUseVN",
  },
  howtoUseEN: {
    path: "/how-to-use-en",
    name: "howtoUseEN",
    activePath: "howtoUseEN",
  },

  internetPackagesCountry: {
    path: "/internet-packages/:country",
    name: "Internet Packages Country",
    activePath: "internet-packages",
  },

  umrahHajj: {
    path: "/umrah-hajj",
    name: "Umrah & Hajj",
    activePath: "umrah-hajj",
  },
  productRouters: {
    path: "/product/router",
    name: "Product Routers",
    activePath: "router",
  },

  marin: {
    path: "/marin",
    name: "Marin",
    activePath: "marin",
  },

  pickupLocation: {
    path: "/pickup/:location",
    name: "Pickup Location",
    activePath: "pickup",
  },
  pickupRegus: {
    path: "/pickup/IWG",
    name: "Regus Pickup",
    activePath: "pickup/IWG",
  },
  pickupLuggagefree: {
    path: "/pickup/luggagefree",
    name: "Luggage Free Pickup",
    activePath: "pickup/luggagefree",
  },

  moneyBackGuarantee: {
    path: "/money-back-guarantee",
    name: "Money Back Guarantee",
    activePath: "money-back-guarantee",
  },
  deviceReturnRebate: {
    path: "/device-return-rebate",
    name: "Device Return Rebate",
    activePath: "device-return-rebate",
  },

  ratings: {
    path: "/ratings",
    name: "Ratings",
    activePath: "ratings",
  },
  instantEsim: {
    path: "/instant-esim",
    name: "Instant eSIM",
    activePath: "instantEsim",
  },
  wesimInstantEsim: {
    path: "/instant-wesim",
    name: "WeSim Instant eSIM",
    activePath: "wesimInstantEsim",
  },
  mockInstantEsim: {
    path: "/instant-mock-esim",
    name: "Mock Instant eSIM",
    activePath: "mockInstantEsim",
  },
  raya: {
    path: "/raya",
    name: "Raya",
    activePath: "raya",
  },
  rayaMy: {
    path: "/my/raya",
    name: "Raya (MY)",
    activePath: "raya",
  },
};

const corporateRoutes = {
  home: {
    path: "/corporate",
    name: "Corporate",
    activePath: "home",
    component: "CorporateHome",
  },
  iot: {
    path: "/corporate/iot",
    name: "IOT",
    activePath: "iot",
    component: "Iot",
  },
  hotel: {
    path: "/corporate/hotel",
    name: "Hotel",
    activePath: "hotel",
    component: "Hotel",
  },
  travelAgency: {
    path: "/corporate/travel-agency",
    name: "Travel Agency",
    activePath: "travel-agency",
    component: "TravelAgency",
  },
  maritimeInternet: {
    path: "/corporate/maritime-internet",
    name: "MARITIME INTERNET",
    activePath: "maritime-internet",
    component: "MaritimeInternet",
  },
  office: {
    path: "/corporate/office",
    name: "Office",
    activePath: "office",
    component: "Office",
  },
  events: {
    path: "/corporate/events",
    name: "Events",
    activePath: "events",
    component: "Events",
  },
  partnership: {
    path: "/corporate/partnership",
    name: "Partnership",
    activePath: "partnership",
    component: "Partnership",
  },
  aboutUs: {
    path: "/corporate/about-us",
    name: "About Us",
    activePath: "about-us",
    component: "AboutCorporate",
  },
  commercial: {
    path: "/corporate/commercial",
    name: "Commercial",
    activePath: "commercial",
    component: "Commercial",
  },
  corporateAccount: {
    path: "/corporate/CorporateAccount",
    name: "CorporateAccount",
    activePath: "CorporateAccount",
    component: "CorporateAccount",
  },
  info: {
    path: "/corporate/info",
    name: "Info",
    activePath: "Info",
    component: "Info",
  },
  business: {
    path: "/corporate/business",
    name: "Business",
    activePath: "Business",
    component: "Business",
  },
};

const brandRoutes = {
  brandLayout: {
    path: "/:brand",
    name: "brand",
    activePath: "brand",
  },

  brandRegister: {
    path: "register",
    name: "Brand Register",
    activePath: "BrandRegister",
    component: "FsimRegister",
  },

  brandOrderConfirmation: {
    path: "place-order",
    name: "Confirmation Message",
    activePath: "ConfirmationMessage",
    component: "ProcessOrder",
    // component: "OrderConfirmation",
  },

  brandOrderSummary: {
    path: "order-summary",
    name: "Brand Order Summary",
    activePath: "BrandOrderSummary",
    component: "FsimOrderSummary",
  },

  brandQr: {
    path: "qrcode",
    name: "BrandQrCode",
    activePath: "BrandQrCode",
    component: "FsimQr",
  },

  astindoInternetPackages: {
    path: "internet-packages",
    name: "Product Internet Packages",
    activePath: "internet-packages",
    component: "AstindoInternetPackage",
  },

  astindoCartService: {
    path: "cart-service",
    name: "Astindo Cart Service",
    activePath: "cart-service",
    component: "AstindoCartService",
  },

  brandPrivacyPolicy: {
    path: "privacy-policy",
    name: "Brand Privacy Policy",
    activePath: "EuPrivacyPolicy",
    component: "EuPrivacyPolicy",
  },

  euTermsAndConditions: {
    path: "terms-and-conditions",
    name: "EU Terms and Conditions",
    activePath: "EuTermsAndConditions",
    component: "EuTermsAndConditions",
  },
};

// const chinajapanRoutes = {
//   chinaJapanLayout: {
//     path: "/",
//     name: "Home",
//     activePath: "home",
//     component: "Home"
//   },
//   pocketWifiChina: {
//     path: "/pocket-wifi-china",
//     name: "Pocket wifi China",
//     activePath: "pocketWifi",
//     component: "PocketWifiChinaHome"
//   },

//   pocketWifiJapan: {
//     path: "/pocket-wifi-japan",
//     name: "Pocket wifi Thailand",
//     activePath: "pocketWifi",
//     component: "PocketWifiJapanHome"
//   },

//   esimChina: {
//     path: "/esim-china",
//     name: "eSIM China",
//     activePath: "sim",
//     component: "ESimChinaHome"
//   },

//   esimThailand: {
//     path: "/esim-thailand",
//     name: "eSIM Thailand",
//     activePath: "sim",
//     component: "ESimThailandHome"
//   },
// }

export { brandRoutes, commercialRoutes, corporateRoutes };
