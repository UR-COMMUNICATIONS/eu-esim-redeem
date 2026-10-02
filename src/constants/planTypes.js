export const PLAN_TYPES = [
  "all",
  "daily",
  "monthly",
  "volume",
  "multi-country",
];

export const PLAN_TYPES_FOR_SINGLE_DATE_PICKER = [
  "W",
  "M",
  "MS",
  "VS",
  "VE",
  "V",
  "Y",
];

export const isSimEsim = ["S", "E"];

export const SUBSCIPTION_PLANS_List = ["Y", "M", "MS", "V", "W", "VS", "VE"];

export const PLAN_TYPES_MAPPING = {
  daily: ["D", "CN"],
  monthly: ["M", "MS", "W"],
  volume: ["V", "VS"],
  "multi-country": ["CN"],
};

export const SERVICE_TYPE_REQUESTS_MAPPING = {
  S: {
    translationKey: "buttonText.sim",
    requestType: "buy-sim",
  },
  E: {
    translationKey: "buttonText.eSim",
    requestType: "buy-esim",
  },
  T: {
    translationKey: "buttonText.topUp",
    requestType: "add-plan",
  },
  B: {
    translationKey: "buttonText.keep",
    requestType: "buy",
  },
  R: {
    translationKey: "buttonText.rental",
    requestType: "rent",
  },
};

export const DEFAULT_VARIATION_OBJECT = { size: 0, days: "0", obj: {} };

export const PRODUCT_IMAGES = {
  D: "japanDeviceGrey",
  S: "pocketWifiSimRed2",
  E: "pocketWifiSimRed2",
  R: "routerWhite",
};

// export const countryOptions = ['TH', 'PH', 'MY', 'ID', 'VN']
export const countryOptions = {
  TH: "th",
  PH: "ph",
  MY: "en",
  ID: "id",
  VN: "vi",
  SG: "en",
  DE: "gm",
  FR: "fr",
  ES: "es",
  JP: "jp",
  TW: "zhhk",
  HK: "zhhk",
};

export const planImageMapping = {
  YWSEAUCMIDP: "YWSEAUCMIDP", // Sim/Esim Australia
  YWSEKHCMIDP: "YWSEKHCMIDP", // SIM/eSIM Cambodia
  YWSEKRCMIDP: "YWSEKRCMIDP", //SIM/eSIM South Korea
  YWSEMOCMIDP: "YWSEMOCMIDP", //SIM/eSIM Macao
  YWSESGMYTHCMIDP: "", //SIM/eSIM Malaysia Thailand
  YWSETHCMIDP: "YWSETHCMIDP", //SIM/eSIM Thailand
  YWSETWCMIDP: "YWSETWCMIDP", //SIM/eSIM Taiwan
  YWSEUAECMIDP: "YWSEUAECMIDP", //SIM/eSIM United Arab Emirates
  YWSEUSCACMIDP: "YWSEUSCACMIDP", //SIM/eSIM USA & Canada
  YWSEUSCMIDP: "YWSEUSCMIDP", //SIM/eSIM United States of America
  YWSEVNCMIDP: "YWSEVNCMIDP", //SIM/eSIM Vietnam
  YWSEASIA14CMIDP: "", //SIM/eSIM Asia 14 Destinations
  YWSEAUCMIDP: "YWSEAUCMIDP", //SIM/eSIM Australia
  YWSEAUNZCMIDP: "", //SIM/eSIM Australia New Zealand
  YWSECNCMIDP: "YWSECNCMIDP", //SIM/eSIM China
  YWSEEUCMIDP: "YWSEEUCMIDP", //SIM/eSIM Europe 42 Countries
  YWSEGASFCMIDP: "YWSEGASFCMIDP", //SIM/eSIM 4 Arab States
  YWSEGLexCNCMIDP: "", //SIM/eSIM Global 145 Countries
  YWSEHKCMIDP: "YWSEHKCMIDP", //SIM/eSIM Hong Kong
  YWSEHKMOCMIDP: "", //SIM/eSIM HongKong & Macao
  YWSEIDCMIDP: "YWSEIDCMIDP", //SIM/eSIM Indonesia
  YWSEJPCMIDP: "YWSEJPCMIDP", //SIM/eSIM Japan
  YWSID3HKVP: "YWSID3HKVP", //eSIM Indonesia
  YWSTW3HKVP: "YWSTW3HKVP", //eSIM Taiwan
};
