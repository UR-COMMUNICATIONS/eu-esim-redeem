import { images } from "@/services";
import { clsx } from "clsx";
import { format } from "date-fns";
import { enUS, ja } from "date-fns/locale";
import React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const languages = {
  global: [],
  jp: ["en", "jp"],
  my: ["en", "ms"],
  hk: ["en", "zhhk"],
  id: ["en", "id"],
  ph: ["en", "ph"],
  th: ["en", "th"],
};

export const targetCountries = ["jp", "my", "hk", "id", "ph", "th"];

export const allowedRoutePathCountries = ["jp", "my", "hk", "id", "ph", "th"];

/**
 * Enum to specify the type of dynamic import.
 */
export const dynamicImportType = {
  comp: "comp",
  data: "data",
};

/** Currency code to display symbol; used for plan/package pricing. Unknown codes fall back to the code itself. */
export const CURRENCY_SYMBOL = {
  SGD: "S$",
  SAR: "SR",
  JPY: "¥",
  USD: "$",
  MYR: "RM",
  EUR: "€",
  GBP: "£",
  AED: "AED",
  THB: "฿",
  IDR: "Rp",
  PHP: "₱",
  VND: "₫",
  KRW: "₩",
  CNY: "¥",
  HKD: "HK$",
  INR: "₹",
  AUD: "A$",
};

/** Returns the display symbol/label for a currency code, or the code if not in CURRENCY_SYMBOL. */
export const getCurrencyDisplay = (currencyCode) => {
  if (!currencyCode) return "";
  return CURRENCY_SYMBOL[currencyCode] ?? currencyCode;
};

export const countriesBasedData = {
  sg: {
    hideNavbarItems: [],
    hideProducts: [],
    hideProductFilter: [],
    defaultProduct: ["A"],
    supportEmail: "hello@yoowifi.com",
    supportPhone: "(+65) 8275 9998",
    getInTouch:
      "https://wa.me/6582759998?text=Hello,%20I%20would%20like%20to%20get%20in%20touch.",
    supportimage: images.whatsapp,
    supportQrcode: images.qrcode,
    supportQrcodeSm: images.qrcodeSm,
    get WhatsappLink() {
      return `https://wa.me/${this.supportPhone.replace(/[^0-9]/g, "")}`;
    },
    loadTranslation: {
      en: "translation",
    },
  },
  jp: {
    hideNavbarItems: ["router"],
    hideProducts: ["R"],
    hideProductFilter: ["A"],
    defaultProduct: ["D", "E"],
    supportEmail: "hellojp@yoowifi.com",
    supportPhone: "+81 70 1279 5414",
    getInTouch: "https://wa.me/818034292474",
    supportimage: images.lineLogo,
    supportQrcode: images.jpQr,
    supportQrcodeSm: images.jpQr,
    get WhatsappLink() {
      return `https://line.me/ti/p/Eh92yMemVT`;
    },
    loadTranslation: {
      en: "english",
      jp: "local",
    },
    HowToConnectNull: true,
  },
  my: {
    hideNavbarItems: [],
    hideProducts: [],
    hideProductFilter: [],
    defaultProduct: ["A"],
    supportEmail: "hello@yoowifi.com",
    supportPhone: "(+65) 6100 9998",
    getInTouch:
      "https://wa.me/6561009998?text=Hello,%20I%20would%20like%20to%20get%20in%20touch.",
    supportimage: images.whatsapp,
    supportQrcode: images.qrcode,
    supportQrcodeSm: images.qrcodeSm,
    get WhatsappLink() {
      return `https://wa.me/${this.supportPhone.replace(/[^0-9]/g, "")}`;
    },
    loadTranslation: {
      en: "english",
      my: "local",
    },
  },
  hk: {
    hideNavbarItems: [],
    hideProducts: [],
    hideProductFilter: [],
    defaultProduct: ["A"],
    supportEmail: "hello@yoowifi.com",
    supportPhone: "(+65) 6100 9998",
    getInTouch:
      "https://wa.me/6561009998?text=Hello,%20I%20would%20like%20to%20get%20in%20touch.",
    supportimage: images.whatsapp,
    supportQrcode: images.qrcode,
    supportQrcodeSm: images.qrcodeSm,
    get WhatsappLink() {
      return `https://wa.me/${this.supportPhone.replace(/[^0-9]/g, "")}`;
    },
    loadTranslation: {
      en: "english",
      hk: "local",
    },
  },
  id: {
    hideNavbarItems: ["router"],
    hideProducts: ["R"],
    hideProductFilter: [],
    defaultProduct: ["A"],
    supportEmail: "hello@yoowifi.com",
    supportPhone: "+6281114423850",
    getInTouch:
      "https://wa.me/6282260008662?text=Hello,%20I%20would%20like%20to%20get%20in%20touch.",
    supportimage: images.whatsapp,
    supportQrcode: images.qrcode,
    supportQrcodeSm: images.qrcodeSm,
    get WhatsappLink() {
      return `https://wa.me/${this.supportPhone.replace(/[^0-9]/g, "")}`;
    },
    loadTranslation: {
      en: "english",
      id: "local",
    },
    idNull: true,
  },
  ph: {
    hideNavbarItems: [],
    hideProducts: [],
    hideProductFilter: [],
    defaultProduct: ["A"],
    supportEmail: "hello@yoowifi.com",
    supportPhone: "+63 9995663318",
    getInTouch:
      "https://wa.me/639995663318?text=Hello,%20I%20would%20like%20to%20get%20in%20touch.",
    supportimage: images.whatsapp,
    supportQrcode: images.qrcode,
    get WhatsappLink() {
      return `https://wa.me/${this.supportPhone.replace(/[^0-9]/g, "")}`;
    },
    loadTranslation: {
      en: "translation",
      // ph: 'local'
    },
  },
  th: {
    hideNavbarItems: [],
    hideProducts: [],
    hideProductFilter: [],
    defaultProduct: ["A"],
    supportEmail: "hello@yoowifi.com",
    supportPhone: "(+65) 8275 9998",
    getInTouch:
      "https://wa.me/6582759998?text=Hello,%20I%20would%20like%20to%20get%20in%20touch.",
    supportimage: images.whatsapp,
    supportQrcode: images.qrcode,
    supportQrcodeSm: images.qrcodeSm,
    get WhatsappLink() {
      return `https://wa.me/${this.supportPhone.replace(/[^0-9]/g, "")}`;
    },
    loadTranslation: {
      en: "translation",
    },
  },
};

export const formatDate = (date, language) => {
  // Select the locale dynamically based on the input language
  const locale = language === "jp" ? ja : enUS;

  // Format string with month names (MMMM)
  const formatString = "yyyy MMMM dd";

  return format(date, formatString, { locale });
};

/**
 * Formats text by highlighting numbers and key phrases in red
 * @param {string} text - The text to format
 * @param {string} highlightColor - The color class for highlights (default: text-[#ed3942])
 * @returns {React.ReactNode} - Formatted text with highlighted parts
 */
export const formatOfferTextWithHighlights = (
  text,
  highlightColor = "text-[#ed3942]",
) => {
  if (!text) return text;

  // Pattern to match: numbers followed by units (e.g., "150Mbps", "10GB/day", "14 days", "6 devices")
  // This pattern matches:
  // - \d+[A-Za-z]+\s+[A-Za-z]+ (e.g., "150Mbps speed")
  // - \d+[A-Za-z]+\/[A-Za-z]+ (e.g., "10GB/day")
  // - \d+\s+[A-Za-z]+ (e.g., "14 days", "6 devices")
  // - \d+[A-Za-z]+ (e.g., "150Mbps" standalone)
  const pattern =
    /(\d+[A-Za-z]+\s+[A-Za-z]+|\d+[A-Za-z]+\/[A-Za-z]+|\d+\s+[A-Za-z]+|\d+[A-Za-z]+)/g;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push({
        text: text.substring(lastIndex, match.index),
        highlight: false,
      });
    }
    // Add the highlighted match
    parts.push({ text: match[0], highlight: true });
    lastIndex = pattern.lastIndex;
  }

  // Add remaining text after last match
  if (lastIndex < text.length) {
    parts.push({ text: text.substring(lastIndex), highlight: false });
  }

  // If no matches found, return original text
  if (parts.length === 0) {
    return text;
  }

  // Render parts with highlights using React.createElement to avoid JSX in .js file
  return parts.map((part, index) => {
    if (part.highlight) {
      return React.createElement(
        "span",
        { key: index, className: `font-bold ${highlightColor}` },
        part.text,
      );
    }
    return React.createElement("span", { key: index }, part.text);
  });
};
// export const loadTranslation = {

//   en: 'english',
//   jp: 'local'
// }
