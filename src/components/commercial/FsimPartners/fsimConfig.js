import { brandRoutes } from "@/services";

// name: display text (coverage section + register-form dropdown).
// code: ISO country code used for plan lookup (travel.locationCode).
// Coverage of the paid 15-day unlimited upgrade, grouped the way the plan
// regions are sold. Saudi Arabia and Singapore are their own regions, so they
// are single-country groups rather than a mistake. Country names render as
// written; only the region labels are translated.
export const ana1GbUpgradeRegions = [
  {
    labelKey: "asia",
    countries: [
      "Cambodia",
      "China",
      "Hong Kong",
      "Indonesia",
      "Japan",
      "Laos",
      "Macao",
      "Malaysia",
      "Philippines",
      "South Korea",
      "Taiwan",
      "Thailand",
      "Vietnam",
    ],
  },
  { labelKey: "saudiArabia", countries: ["Saudi Arabia"] },
  { labelKey: "singapore", countries: ["Singapore"] },
  { labelKey: "australiaNewZealand", countries: ["Australia", "New Zealand"] },
  { labelKey: "northAmerica", countries: ["USA", "Canada", "Mexico"] },
  {
    labelKey: "europe",
    countries: [
      "Finland",
      "Austria",
      "Belgium",
      "Bulgaria",
      "Croatia",
      "Cyprus",
      "Czech Republic",
      "Denmark",
      "Estonia",
      "Faroe Islands",
      "France",
      "Germany",
      "Holy See (Vatican City State)",
      "Hungary",
      "Iceland",
      "Ireland",
      "Italy",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Malta",
      "Moldova",
      "Greece",
      "Poland",
      "Portugal",
      "Romania",
      "Russian Federation",
      "Saint Barthelemy",
      "Saint Martin",
      "San Marino",
      "Serbia",
      "Slovenia",
      "Sweden",
      "Switzerland",
      "Turkey",
      "Ukraine",
      "Latvia",
      "Netherlands",
      "Norway",
      "Slovakia",
      "Spain",
      "United Kingdom",
    ],
  },
];

export const ana1GbCountries = [
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Belgium", code: "BE" },
  { name: "Bulgaria", code: "BG" },
  { name: "Cambodia", code: "KH" },
  { name: "Canada", code: "CA" },
  { name: "China", code: "CN" },
  { name: "Croatia", code: "HR" },
  { name: "Cyprus", code: "CY" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Estonia", code: "EE" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "French Guiana", code: "GF" },
  { name: "Germany", code: "DE" },
  { name: "Greece", code: "GR" },
  { name: "Guadeloupe", code: "GP" },
  { name: "Hong Kong", code: "HK" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "Indonesia", code: "ID" },
  { name: "Ireland", code: "IE" },
  { name: "Italy", code: "IT" },
  { name: "Japan", code: "JP" },
  { name: "Laos", code: "LA" },
  { name: "Latvia", code: "LV" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Macau", code: "MO" },
  { name: "Malaysia", code: "MY" },
  { name: "Malta", code: "MT" },
  { name: "Martinique", code: "MQ" },
  { name: "Mexico", code: "MX" },
  { name: "Netherlands", code: "NL" },
  { name: "New Zealand", code: "NZ" },
  { name: "Norway", code: "NO" },
  { name: "Philippines", code: "PH" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Romania", code: "RO" },
  { name: "Saint Barthélemy", code: "BL" },
  { name: "Saint Martin (French Part)", code: "MF" },
  { name: "San Marino", code: "SM" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Slovakia", code: "SK" },
  { name: "Slovenia", code: "SI" },
  { name: "South Korea", code: "KR" },
  { name: "Spain", code: "ES" },
  { name: "Sweden", code: "SE" },
  { name: "Taiwan", code: "TW" },
  { name: "Thailand", code: "TH" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "Vatican City", code: "VA" },
  { name: "Vietnam", code: "VN" },
];

export const fsimConfig = {
  fsim: {
    logos: [
      {
        src: "jtp-logo",
        alt: "JTB",
        className: "w-[90px] h-[50px] sm:w-[110px] sm:h-[60px]",
      },
      {
        src: "close",
        alt: "Close Icon",
        className: "w-[40px] h-[50px] sm:w-[55px] sm:h-[65px]",
      },
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[140px] h-[55px] sm:w-[170px] sm:h-[70px]",
      },
    ],
  },
  jtb: {
    logos: [
      {
        src: "jtp-logo",
        alt: "JTB",
        className: "w-[90px] h-[50px] sm:w-[110px] sm:h-[60px]",
      },
      {
        src: "close",
        alt: "Close Icon",
        className: "w-[40px] h-[50px] sm:w-[55px] sm:h-[65px]",
      },
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[140px] h-[55px] sm:w-[170px] sm:h-[70px]",
      },
    ],
  },
  cny2026: {
    logos: [
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[140px] h-[55px] sm:w-[170px] sm:h-[70px]",
      },
    ],
  },
  sq: {
    logos: [
      {
        src: "sq-kris-logo",
        alt: "Kris",
        className: "w-[100px] h-[50px] sm:w-[120px] sm:h-[60px]",
      },
      {
        src: "close",
        alt: "Close Icon",
        className: "w-[40px] h-[50px] sm:w-[55px] sm:h-[65px]",
      },
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[140px] h-[55px] sm:w-[170px] sm:h-[70px]",
      },
    ],
  },
  // SQ Fair promo (yoowifi.com/sqfairpromo): two products, own promo codes
  // (Pocket WiFi = SQFPW, eSIM = SQFES). Single combined KrisFlyer x Yoowifi
  // lockup (one image holds all three marks).
  sqfairpromo: {
    logos: [
      {
        src: "sqfair-logo",
        alt: "KrisFlyer x Yoowifi",
        className:
          "w-[260px] h-[44px] sm:w-[340px] sm:h-[56px] md:w-[400px] md:h-[66px]",
      },
    ],
  },
  sqfairid: {
    logos: [
      {
        src: "sq-kris-logo",
        alt: "Kris",
        className: "w-[100px] h-[50px] sm:w-[120px] sm:h-[60px]",
      },
      {
        src: "close",
        alt: "Close Icon",
        className: "w-[40px] h-[50px] sm:w-[55px] sm:h-[65px]",
      },
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[140px] h-[55px] sm:w-[170px] sm:h-[70px]",
      },
    ],
  },
  avia2026: {
    logos: [
      {
        src: "avia-logo",
        alt: "Avia",
        className: "w-[100px] h-[50px] sm:w-[120px] sm:h-[60px]",
      },
      {
        src: "close",
        alt: "Close Icon",
        className: "w-[40px] h-[50px] sm:w-[55px] sm:h-[65px]",
      },
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[140px] h-[55px] sm:w-[170px] sm:h-[70px]",
      },
    ],
  },
  obaja: {
    logos: [
      {
        src: "obaja-logo",
        alt: "Obaja",
        className: "w-[100px] h-[50px] sm:w-[120px] sm:h-[60px]",
      },
      {
        src: "close",
        alt: "Close Icon",
        className: "w-[40px] h-[50px] sm:w-[55px] sm:h-[65px]",
      },
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[140px] h-[55px] sm:w-[170px] sm:h-[70px]",
      },
    ],
  },
  obaja2026: {
    logos: [
      {
        src: "obaja-logo",
        alt: "Obaja",
        className: "w-[100px] h-[50px] sm:w-[120px] sm:h-[60px]",
      },
      {
        src: "close",
        alt: "Close Icon",
        className: "w-[40px] h-[50px] sm:w-[55px] sm:h-[65px]",
      },
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[140px] h-[55px] sm:w-[170px] sm:h-[70px]",
      },
    ],
  },
  wita: {
    logos: [
      {
        src: "wita-logo",
        alt: "Wita",
        className:
          "w-[200px] h-[30px] sm:w-[280px] sm:h-[40px] md:w-[350px] md:h-[50px]",
      },
      {
        src: "close",
        alt: "Close Icon",
        className: "w-[40px] h-[50px] sm:w-[55px] sm:h-[65px]",
      },
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[140px] h-[55px] sm:w-[170px] sm:h-[70px]",
      },
    ],
  },
  wita2026: {
    logos: [
      {
        src: "wita-logo",
        alt: "Wita",
        className:
          "w-[200px] h-[30px] sm:w-[280px] sm:h-[40px] md:w-[350px] md:h-[50px]",
      },
      {
        src: "close",
        alt: "Close Icon",
        className: "w-[40px] h-[50px] sm:w-[55px] sm:h-[65px]",
      },
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[140px] h-[55px] sm:w-[170px] sm:h-[70px]",
      },
    ],
  },
  panorama26: {
    logos: [
      {
        src: "panorama-logo",
        alt: "Panorama",
        className:
          "w-[200px] h-[30px] sm:w-[280px] sm:h-[40px] md:w-[200px] md:h-[50px]",
      },
      {
        src: "close",
        alt: "Close Icon",
        className: "w-[40px] h-[50px] sm:w-[55px] sm:h-[65px]",
      },
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[140px] h-[55px] sm:w-[170px] sm:h-[70px]",
      },
    ],
  },
  gdrama26: {
    logos: [
      {
        src: "sq-kris-logo",
        alt: "Gdrama",
        className: "w-[100px] h-[50px] sm:w-[120px] sm:h-[60px]",
      },
      {
        src: "close",
        alt: "Close Icon",
        className: "w-[40px] h-[50px] sm:w-[55px] sm:h-[65px]",
      },
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[140px] h-[55px] sm:w-[170px] sm:h-[70px]",
      },
    ],
  },
  airasia: {
    logos: [
      {
        src: "air-asia-logo",
        alt: "AirAsia",
        className: "sm:w-[50px] sm:h-[50px] w-[42px] h-[42px]",
      },
      {
        src: "close",
        alt: "Close Icon",
        className: "w-[25px] h-[25px] sm:w-[40px] sm:h-[40px]",
      },

      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[112px] h-[40px] sm:w-[140px] sm:h-[50px]",
      },
    ],
  },
  astindo: {
    registerNext: brandRoutes.astindoInternetPackages.path,
    isCallLocalPlans: false,
    logos: [
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[112px] h-[40px] sm:w-[140px] sm:h-[50px]",
      },
    ],
  },
  // Natas eSIM redeem (/natas/esim-redeem): plan + variation + country are all
  // resolved from the promocode/varid link params, so KolOrder must skip its
  // own fetchLocalPlans/getShippingRate lookup entirely.
  natas: {
    isCallLocalPlans: false,
  },
  // /EU/esim-redeem — same link-resolved flow as natas.
  eu: {
    isCallLocalPlans: false,
  },
  // The app-activation campaigns on the same shared flow. Unlike natas these
  // ask the user where they're going, so KolOrder resolves the plan the usual
  // way — fetchLocalPlans against that destination — and fills the cart itself.
  yw3gb: {
    isCallLocalPlans: true,
  },
  esimpartner: {
    isCallLocalPlans: true,
  },
  maybank: {
    isCallLocalPlans: true,
  },
  kol: {
    logos: [
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[112px] h-[40px] sm:w-[140px] sm:h-[50px]",
      },
    ],
  },
  frwfana: {
    registerImage: "fsim-register-ana",
    logos: [
      {
        src: "corporate-symbol",
        alt: "anax",
        className: "w-[90px] h-[50px] sm:w-[110px] sm:h-[60px]",
      },
      {
        src: "close",
        alt: "Close Icon",
        className: "w-[25px] h-[25px] sm:w-[40px] sm:h-[40px]",
      },
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[112px] h-[40px] sm:w-[140px] sm:h-[50px]",
      },
    ],
  },
  sindoferry: {
    country: {
      countryCode: "MY",
      countryName: "Malaysia",
    },
    logos: [
      {
        src: "sindo-ferry-logo",
        alt: "Sindo Ferry",
        className: "w-[105px] h-[70px] md:w-[240px] md:h-[120px]",
      },
      {
        src: "close",
        alt: "Close Icon",
        className: "w-[40px] h-[50px] sm:w-[55px] sm:h-[65px]",
      },
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[140px] h-[55px] sm:w-[170px] sm:h-[70px]",
      },
    ],
  },
  euwifi: {
    country: {
      countryCode: "MY",
      countryName: "Malaysia",
    },
    logos: [
      {
        src: "eu-wifi-logo",
        alt: "EU Wifi",
        className: "w-[90px] h-[100px] sm:w-[110px] sm:h-[100px]",
      },
      {
        src: "close",
        alt: "×",
        className: "w-[25px] h-[25px] sm:w-[30px] sm:h-[30px]",
      },
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[112px] h-[40px] sm:w-[140px] sm:h-[50px]",
      },
    ],
  },
  challenger: {
    logos: [
      {
        src: "challenger-logo",
        alt: "Challenger",
        className: "w-[140px] h-[55px] sm:w-[170px] sm:h-[70px]",
      },
      {
        src: "close",
        alt: "Close Icon",
        className: "w-[40px] h-[50px] sm:w-[55px] sm:h-[65px]",
      },
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[140px] h-[55px] sm:w-[170px] sm:h-[70px]",
      },
    ],
  },
  idta: {
    country: {
      countryCode: "ID",
      countryName: "Indonesia",
    },
    logos: [
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[112px] h-[40px] sm:w-[140px] sm:h-[50px]",
      },
    ],
  },
  joyparadise: {
    logos: [
      {
        src: "joy-paradise-logo",
        alt: "Joy Paradise",
        className: "w-[140px] h-[55px] sm:w-[170px] sm:h-[70px] rounded-sm",
      },
      {
        src: "close",
        alt: "Close Icon",
        className: "w-[40px] h-[50px] sm:w-[55px] sm:h-[65px]",
      },
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[140px] h-[55px] sm:w-[170px] sm:h-[70px]",
      },
    ],
  },
  mattatl26: {
    country: {
      countryCode: "JP",
      countryName: "Japan",
    },
    logos: [
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[140px] h-[55px] sm:w-[170px] sm:h-[70px]",
      },
    ],
  },
  phta: {
    country: {
      countryCode: "PH",
      countryName: "Philippines",
    },
    logos: [
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[112px] h-[40px] sm:w-[140px] sm:h-[50px]",
      },
    ],
  },
  ana1gb: {
    registerImage: "fsim-register-ana",
    countries: ana1GbCountries,
    logos: [
      {
        src: "corporate-symbol",
        alt: "anax",
        className: "w-[90px] h-[50px] sm:w-[110px] sm:h-[60px]",
      },
      {
        src: "close",
        alt: "Close Icon",
        className: "w-[25px] h-[25px] sm:w-[40px] sm:h-[40px]",
      },
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[112px] h-[40px] sm:w-[140px] sm:h-[50px]",
      },
    ],
  },
  "welcome-credit": {
    logos: [
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[112px] h-[40px] sm:w-[140px] sm:h-[50px]",
      },
    ],
  },
  default: {
    bnrNext: brandRoutes.brandRegister.path,
    registerNext: brandRoutes.brandOrderConfirmation.path,
    isCallLocalPlans: true,
    registerImage: "fsim-register",
    country: {
      countryCode: "SG",
      countryName: "Singapore",
    },
    logos: [
      {
        src: "yoowifi-without-hexagon",
        alt: "Yoowifi",
        className: "w-[112px] h-[40px] sm:w-[140px] sm:h-[50px]",
      },
    ],
  },
};
