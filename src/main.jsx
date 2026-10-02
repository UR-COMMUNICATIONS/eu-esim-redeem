import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { store } from "./store";

// 🧠 Critical base styles — load immediately (minimal layout + reset)
import "@/styles/app.css";
import "@/styles/index.css";

// ⚙️ Optional: lazy-load heavy or non-critical styles
const useAsyncStyles = () => {
  useEffect(() => {
    Promise.all([
      import("@/styles/fonts.css"),
      import("photoswipe/dist/photoswipe.css"),
      // import("@/components/shared/ReactDropdown/styles/country-state-city.css"),
    ]);
  }, []);
};

// ================================
// 🌐 Language setup (i18next)
// ================================
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import "./utils/setupAxiom.js";

const localPath =
  window.location.pathname.includes("/product") ||
  window.location.pathname.includes("/corporate") ||
  window.location.pathname.includes("/contact") ||
  window.location.pathname.includes("/about-us") ||
  window.location.pathname.includes("/pocket-wifi-details") ||
  window.location.pathname.includes("/package") ||
  window.location.pathname.includes("/router") ||
  window.location.pathname.includes("/sim") ||
  window.location.pathname.includes("/affiliate") ||
  window.location.pathname.includes("/how-it-works") ||
  window.location.pathname.includes("/country-coverage/filter") ||
  window.location.pathname.includes("/pocket-wifi");

const localPathThirdDepth =
  window.location.pathname.includes(
    "pocket-wifi/shipping-option/self-pickup",
  ) ||
  window.location.pathname.includes("router/shipping-option/self-pickup") ||
  window.location.pathname.includes("/package/details/") ||
  window.location.pathname.includes("sim/shipping-option/self-pickup");

const getCurrentLoadPath = (language) => {
  if (localPathThirdDepth) {
    return `../../assets/langs/${language}/translation.json`;
  } else if (localPath) {
    return `../assets/langs/${language}/translation.json`;
  } else {
    return `./assets/langs/${language}/translation.json`;
  }
};

const customLoadPath = (lng, ns) => {
  const currentCountry = JSON.parse(
    sessionStorage.getItem("user_country"),
  )?.country?.toLowerCase();
  if (ns[0] === "translation") return "/assets/langs/{{lng}}/{{ns}}.json";
  if (ns[0] === "english")
    return `/assets/langs/countries/${currentCountry}/${lng}/translation.json`;
  if (ns[0] === "local")
    return `/assets/langs/countries/${currentCountry}/${lng}/translation.json`;
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: [
      "en",
      "jp",
      "fr",
      "zhcn",
      "zhhk",
      "ms",
      "id",
      "es",
      "gm",
      "ph",
      "th",
      "vi",
      "ko",
    ],
    fallbackLng: "en",
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: { loadPath: customLoadPath },
    ns: ["translation", "english", "local"],
    defaultNS: "translation",
  });

// ================================
// 🚀 Mount React App
// ================================
const Root = () => {
  useAsyncStyles(); // load heavy CSS asynchronously
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);

// import "@/styles/app.css";
// import "@/styles/fonts.css";
// import "@/styles/index.css";
// import "photoswipe/dist/photoswipe.css";
// import React from "react";
// import "@/components/shared/ReactDropdown/styles/country-state-city.css";
// import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import App from "./App.jsx";
// import { store } from "./store";
// // language switcher
// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
// import HttpApi from "i18next-http-backend";
// // import useUserLocationLanguage from "./hooks/useUserLocationLanguage.js";
// // import { countriesBasedData } from "./lib/utils.js";
// import "./utils/setupAxiom.js";

// const localPath =
//   window.location.pathname.includes("/product") ||
//   window.location.pathname.includes("/corporate") ||
//   window.location.pathname.includes("/contact") ||
//   window.location.pathname.includes("/about-us") ||
//   window.location.pathname.includes("/pocket-wifi-details") ||
//   window.location.pathname.includes("/package") ||
//   window.location.pathname.includes("/router") ||
//   window.location.pathname.includes("/sim") ||
//   window.location.pathname.includes("/affiliate") ||
//   window.location.pathname.includes("/how-it-works") ||
//   window.location.pathname.includes("/country-coverage/filter") ||
//   window.location.pathname.includes("/pocket-wifi");

// const localPathThirdDepth =
//   window.location.pathname.includes(
//     "pocket-wifi/shipping-option/self-pickup"
//   ) ||
//   window.location.pathname.includes("router/shipping-option/self-pickup") ||
//   window.location.pathname.includes("/package/details/") ||
//   window.location.pathname.includes("sim/shipping-option/self-pickup");

// const getCurrentLoadPath = (language) => {
//   if (localPathThirdDepth) {
//     return `../../assets/langs/${language}/translation.json`;
//   } else if (localPath) {
//     return `../assets/langs/${language}/translation.json`;
//   } else {
//     return `./assets/langs/${language}/translation.json`;
//   }
// };

// const customLoadPath = (lng, ns) => {
//   let originCountry = "jp";
//   const currentLanguage = sessionStorage.getItem("i18next")?.toLowerCase();
//   const countryObject = JSON.parse(sessionStorage.getItem("user_country"));
//   const currentCountry = countryObject?.country?.toLowerCase();

//   if (ns[0] === "translation") {
//     return "/assets/langs/{{lng}}/{{ns}}.json";
//   }
//   if (ns[0] === "english") {

//     return `/assets/langs/countries/${currentCountry}/${lng}/translation.json`;
//     // return `/countries/jp/src/assets/langs/en/translation.json`
//     // return `/countries/${currentCountry}/src/assets/langs/${currentLanguage}/translation.json`
//   }
//   if (ns[0] === "local") {
//     return `/assets/langs/countries/${currentCountry}/${lng}/translation.json`;
//     // return `/countries/jp/src/assets/langs/jp/translation.json`
//     // return `/countries/${currentCountry}/src/assets/langs/${currentLanguage}/translation.json`
//     // return "/countries/jp/src/assets/langs/jp/translation.json"
//     // return "/assets/langs/{{lng}}/{{ns}}.json";
//   }
//   // const { currentLanguage, currentCountry, isTargetCountry } = useUserLocationLanguage();
//   // const targetCountry = isTargetCountry ? currentCountry : "sg"
//   // const { loadTranslation } = countriesBasedData[targetCountry]
//   // If the origin is Japan, use different files for English and Japanese languages
//   // if (originCountry === "jp") {
//   //   // If user language is English and we have a dedicated English file:
//   //   if (lng === "en" && ns === "translation") {
//   //     return `/assets/langs/en/english.json`;
//   //   }
//   //   // If user language is Japanese and we have a dedicated Japanese local file:
//   //   if (lng === "jp" && ns === "translation") {
//   //     return `/assets/langs/jp/local.json`;
//   //   }
//   // }
//   // Otherwise, load the default file
//   // return `/assets/langs/${lng}/${ns}.json`;
//   // return "/assets/langs/{{lng}}/translation.json";
//   // return "/assets/langs/{{lng}}/{{ns}}.json";
// };

// i18n
//   .use(initReactI18next)
//   .use(LanguageDetector)
//   .use(HttpApi)
//   .init({
//     supportedLngs: [
//       "en",
//       "jp",
//       "fr",
//       "zhcn",
//       "zhhk",
//       "ms",
//       "id",
//       "es",
//       "gm",
//       "ph",
//       "th",
//       "vi",
//     ],
//     fallbackLng: "en",
//     detection: {
//       order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
//       caches: ["cookie"],
//     },
//     backend: {
//       // loadPath: getCurrentLoadPath("{{lng}}"),
//       // loadPath: "/assets/langs/{{lng}}/translation.json",
//       // loadPath: "/assets/langs/{{lng}}/{{ns}}.json", // Load different namespace files
//       // loadPath: `/assets/langs/${lng}/${ns}.json`
//       // loadPath: [
//       //   "/assets/langs/{{lng}}/{{ns}}.json",
//       //   "/assets/langs/jp/{{ns}}.json",
//       // ],

//       loadPath: customLoadPath,
//     },
//     ns: ["translation", "english", "local"], // Define available namespaces
//     defaultNS: "translation", // Default namespace
//   });

// ReactDOM.createRoot(document.getElementById("root")).render(
//   // <React.StrictMode>
//   <Provider store={store}>
//     <App />
//   </Provider>
//   // </React.StrictMode>
// );
