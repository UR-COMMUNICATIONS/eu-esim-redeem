import { commercialRoutes } from "@/services";

export const signupConfigs = {
  ana: {
    logo: "ana-logo",
    referralCode: undefined,
    source: "urwifi",
    defaultCountry: "my",
  },
  natas: {
    logo: null,
    referralCode: undefined,
    source: "urwifi",
    defaultCountry: "sg",
    privacyPath: commercialRoutes.privacyPolicy.path,
  },
};

export const defaultSignupConfig = {
  logo: null,
  referralCode: undefined,
  source: "urwifi",
  defaultCountry: "my",
  privacyPath: commercialRoutes.privacyPolicy.path,
};
