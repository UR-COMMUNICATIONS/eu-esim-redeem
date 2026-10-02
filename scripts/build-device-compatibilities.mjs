/**
 * Builds sim.deviceCompatibilities for en/translation.json and mirrors structure for Redux slice.
 * Run: node scripts/build-device-compatibilities.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const deviceCompatibilities = {
  heading: "Check Device Compatibility",
  subHeading:
    "If you are using eSIM for the first time, you may need to check if your device supports eSIM. Select your device brand and see if your models are listed. You can confirm further by checking the Settings page of your device.",
  compatibilities: [
    {
      title: "Apple",
      devices: [
        {
          name: "iPhone",
          versions: [
            "iPhone XR",
            "iPhone XS",
            "iPhone XS Max",
            "iPhone 11",
            "iPhone 11 Pro",
            "iPhone 11 Pro Max",
            "iPhone SE 2 (2020)",
            "iPhone 12",
            "iPhone 12 Mini",
            "iPhone 12 Pro",
            "iPhone 12 Pro Max",
            "iPhone 13",
            "iPhone 13 Mini",
            "iPhone 13 Pro",
            "iPhone 13 Pro Max",
            "iPhone SE 3 (2022)",
            "iPhone 14",
            "iPhone 14 Plus",
            "iPhone 14 Pro",
            "iPhone 14 Pro Max",
            "iPhone 15",
            "iPhone 15 Plus",
            "iPhone 15 Pro",
            "iPhone 15 Pro Max",
            "iPhone 16",
            "iPhone 16 Plus",
            "iPhone 16 Pro",
            "iPhone 16 Pro Max",
            "iPhone 16e",
            "iPhone 17",
            "iPhone 17 Pro",
            "iPhone 17 Pro Max",
            "iPhone 17e",
            "iPhone Air",
          ],
        },
        {
          name: "iPad (4G / cellular models)",
          versions: [
            'iPad Pro 11″ (model A2068, from 2020)',
            'iPad Pro 12.9″ (model A2069, from 2020)',
            "iPad Air (model A2123, from 2019)",
            "iPad (model A2198, from 2019)",
            "iPad Mini (model A2124, from 2019)",
            "iPad 10th generation (from 2022)",
          ],
        },
      ],
      note:
        "On iPhone 13 and newer models, you can have two eSIMs activated simultaneously. iPhones from mainland China and iPhone devices from Hong Kong and Macao (except for iPhone 13 mini, iPhone 12 mini, iPhone SE 2020, and iPhone XS) don’t have eSIM capability. eSIM iPhone 14, iPhone 14 Plus, iPhone 14 Pro, iPhone 14 Pro Max, iPhone 15, iPhone 15 Plus, iPhone 15 Pro, and iPhone 15 Pro Max are not compatible with physical SIM cards in the USA. eSIM iPhone 17, iPhone 17 Pro, and iPhone 17 Pro Max are SIM-only in Mainland China, and eSIM-only in: Bahrain, Canada, Guam, Japan, Kuwait, Mexico, Oman, Qatar, Saudi Arabia, UAE, and USA. iPhone Air is Apple’s first globally eSIM-only iPhone; it is eSIM-compatible in China. eSIM functionality can vary by model and region. Please contact your local carrier for confirmation.",
    },
    {
      title: "Samsung",
      devices: [
        {
          name: "Samsung Galaxy (eSIM-supported models)",
          versions: [
            "Samsung Galaxy S20",
            "Samsung Galaxy S20+",
            "Samsung Galaxy S20+ 5g",
            "Samsung Galaxy S20 Ultra",
            "Samsung Galaxy S20 Ultra 5G",
            "Samsung Galaxy S21",
            "Samsung Galaxy S21+ 5G",
            "Samsung Galaxy S21 Ultra 5G",
            "Samsung Galaxy S22",
            "Samsung Galaxy S22+",
            "Samsung Galaxy S22 Ultra",
            "Samsung Galaxy S23",
            "Samsung Galaxy S23+",
            "Samsung Galaxy S23 Ultra",
            "Samsung Galaxy S23 FE* (Models from China or from Hong Kong do not support eSIM)",
            "Samsung Galaxy S24",
            "Samsung Galaxy S24+",
            "Samsung Galaxy S24 Ultra",
            "Samsung Galaxy S24 FE",
            "Samsung Galaxy S25",
            "Samsung Galaxy S25+",
            "Samsung Galaxy S25 Ultra",
            "Samsung Galaxy S25 Edge",
            "Samsung Galaxy S25 FE",
            "Samsung Galaxy S26",
            "Samsung Galaxy S26+",
            "Samsung Galaxy S26 Ultra",
            "Samsung Galaxy Note 20",
            "Samsung Galaxy Note 20 Ultra 5G",
            "Samsung Galaxy Fold",
            "Samsung Galaxy Z Fold2 5G",
            "Samsung Galaxy Z Fold3 5G",
            "Samsung Galaxy Z Fold4",
            "Samsung Galaxy Z Fold5 5G",
            "Samsung Galaxy Z Fold6 5G",
            "Samsung Galaxy Z Fold7",
            "Samsung Galaxy Z Flip",
            "Samsung Galaxy Z Flip3 5G",
            "Samsung Galaxy Z Flip4",
            "Samsung Galaxy Z Flip5 5G",
            "Samsung Galaxy Z Flip6 5G",
            "Samsung Galaxy Z Flip7",
            "Samsung Galaxy Z Flip7 FE",
            "Samsung Galaxy A54 (SCG21, SC-53D, SM-A546B/DS, SM-A546S, SM-A546U1)",
            "Samsung Galaxy A55 5G",
            "Samsung Galaxy A35",
            "Samsung Galaxy A56",
            "Samsung Galaxy A36",
            "Samsung Galaxy Z TriFold",
          ],
        },
      ],
      note:
        "Not compatible: Samsung Galaxy S20 FE 4G/5G; Samsung S20/S21 (US versions); Galaxy Z Flip 5G (US versions); Samsung Note 20 Ultra (US and Hong Kong versions); Samsung Galaxy Z Fold 2 (US and Hong Kong versions); all Samsung phones sold in Hong Kong except Samsung Galaxy Z Flip (Model SM-F700F); and several models purchased in South Korea (S20 family through Z Flip3 5G). Depending on country of origin, your device may not support eSIM—verify for your region. eSIM functionality can vary by model and region.",
    },
    {
      title: "Google",
      devices: [
        {
          name: "Google Pixel",
          versions: [
            "Google Pixel 2 (only phones bought with Google Fi service)",
            "Google Pixel 2 XL",
            "Google Pixel 3 (excl. Australia, Taiwan, Japan; US/Canada carriers other than Sprint and Google Fi may not support eSIM)",
            "Google Pixel 3 XL",
            "Google Pixel 3a (excl. Japan or Verizon)",
            "Google Pixel 3a XL",
            "Google Pixel 4",
            "Google Pixel 4a",
            "Google Pixel 4 XL",
            "Google Pixel 5",
            "Google Pixel 5a",
            "Google Pixel 6",
            "Google Pixel 6a",
            "Google Pixel 6 Pro",
            "Google Pixel 7a",
            "Google Pixel 7",
            "Google Pixel 7 Pro",
            "Google Pixel 8a",
            "Google Pixel 8",
            "Google Pixel 8 Pro",
            "Google Pixel Fold",
            "Google Pixel 9",
            "Google Pixel 9 Pro",
            "Google Pixel 9 Pro XL",
            "Google Pixel 10",
            "Google Pixel 10 Pro",
            "Google Pixel 10 Pro XL",
            "Google Pixel 10a",
          ],
        },
      ],
      note:
        "Google Pixel 3 devices from Australia, Japan, and Taiwan are not compatible with eSIM. Google Pixel 3a from South East Asia is not compatible with eSIM. All Google Pixel phones sold in Hong Kong are incompatible with eSIM. eSIM functionality can vary by model and region.",
    },
    {
      title: "Huawei",
      devices: [
        {
          name: "Huawei",
          versions: [
            "Huawei P40",
            "Huawei P40 Pro",
            "Huawei Mate 40 Pro",
            "Huawei Pura 70 Pro",
          ],
        },
      ],
      note:
        "The Huawei P40 Pro+ and P50 Pro are not compatible with eSIM. eSIM functionality can vary by model and region.",
    },
    {
      title: "Oppo",
      devices: [
        {
          name: "Oppo",
          versions: [
            "Oppo Find X3",
            "Oppo Find X3 Pro",
            "Oppo Find N2 Flip",
            "Oppo Reno 5A",
            "Oppo Reno 6 Pro 5G",
            "Oppo Reno 9A",
            "Oppo Find X5",
            "Oppo Find X5 Pro",
            "Oppo A55s 5G",
            "Oppo Find N3",
            "Oppo Find N3 Flip",
            "Oppo Find X8",
            "Oppo Find X8 Pro",
            "Oppo Reno14",
            "Oppo Reno14 Pro",
            "Oppo Find X9",
            "Oppo Find X9 Pro",
            "Oppo Reno 15",
            "Oppo Reno 15 Pro",
          ],
        },
      ],
      note:
        "The OPPO Lite line does not support eSIM. eSIM functionality can vary by model and region.",
    },
    {
      title: "Sony",
      devices: [
        {
          name: "Sony Xperia",
          versions: [
            "Sony Xperia 10 III Lite",
            "Sony Xperia 10 IV",
            "Xperia 10V",
            "Xperia 1 IV",
            "Sony Xperia 5 IV",
            "Sony Xperia 1 V",
            "Sony Xperia Ace III",
            "Sony Xperia 5 V",
            "Sony Xperia 1 VI",
          ],
        },
      ],
      note: "eSIM functionality can vary by model and region. Please contact your local carrier for confirmation.",
    },
    {
      title: "Xiaomi",
      devices: [
        {
          name: "Xiaomi",
          versions: [
            "Xiaomi 12T Pro",
            "Xiaomi 13",
            "Xiaomi 13 Lite",
            "Xiaomi 13 Pro",
            "Xiaomi 13T",
            "Xiaomi 13T Pro",
            "Xiaomi 14",
            "Xiaomi 14 Pro",
            "Xiaomi 14T",
            "Xiaomi 14T Pro",
            "Xiaomi Redmi Note 13 Pro+",
            "Xiaomi Redmi Note 14 Pro",
            "Xiaomi Redmi Note 14 Pro+",
            "Xiaomi Poco X7",
            "Xiaomi 15",
            "Xiaomi 15 Ultra",
            "Xiaomi 15T",
            "Xiaomi 15T Pro",
            "Xiaomi Redmi Note 15 Pro",
            "Xiaomi Redmi Note 15 Pro+",
            "Xiaomi Poco X8 Pro Max",
            "Xiaomi 17",
            "Xiaomi 17 Ultra",
          ],
        },
      ],
      note: "eSIM functionality can vary by model and region. Please contact your local carrier for confirmation.",
    },
    {
      title: "Motorola",
      devices: [
        {
          name: "Motorola",
          versions: [
            "Motorola Razr 2019",
            "Motorola Razr 2022",
            "Motorola Razr 5G",
            "Motorola Razr 40",
            "Motorola Razr 40 Ultra",
            "Motorola Razr+",
            "Motorola Edge 2022",
            "Motorola Edge 2023",
            "Motorola Edge+ (2023)",
            "Motorola Edge 40",
            "Motorola Edge 40 Pro",
            "Motorola Edge 40 Neo",
            "Motorola Edge 50 Pro",
            "Motorola Edge 50 Ultra",
            "Motorola Edge 50 Fusion",
            "Motorola Moto G Power 5G (2024)",
            "Motorola G52J 5G",
            "Motorola G52J 5G II",
            "Motorola G53J 5G",
            "Moto G54 5G",
            "Motorola G84",
            "Motorola G34",
            "Motorola Moto G53",
            "Motorola Moto G54",
            "Motorola Razr+ 2024",
            "Motorola Razr 2024",
            "Motorola Moto G Stylus 5G 2024",
            "Motorola Moto G35",
            "Motorola Edge 60",
            "Motorola Edge 60 Pro",
            "Motorola Edge 60 Fusion",
            "Motorola Edge 60 Stylus",
            "Motorola Razr 60",
            "Motorola Razr 60 Ultra",
            "Motorola Edge 70",
            "Motorola Edge 70 Ultra",
            "Motorola Edge 70 Fusion",
            "Motorola Edge 70 Fusion+",
          ],
        },
      ],
      note: "eSIM functionality can vary by model and region. Please contact your local carrier for confirmation.",
    },
    {
      title: "Sharp",
      devices: [
        {
          name: "Sharp AQUOS",
          versions: [
            "Sharp AQUOS sense4 lite",
            "Sharp AQUOS Sense6s",
            "AQUOS sense 7",
            "AQUOS sense 7plus",
            "Sharp AQUOS Wish",
            "AQUOS wish 2 SHG08",
            "AQUOS wish3",
            "AQUOS zero 6",
            "Simple Sumaho6",
            "Sharp AQUOS R7",
            "Sharp AQUOS R8",
            "Sharp AQUOS R8 Pro",
            "Sharp Aquos sense8",
          ],
        },
      ],
      note: "eSIM functionality can vary by model and region. Please contact your local carrier for confirmation.",
    },
    {
      title: "Rakuten",
      devices: [
        {
          name: "Rakuten",
          versions: [
            "Rakuten Mini",
            "Rakuten Big-S",
            "Rakuten Big",
            "Rakuten Hand",
            "Rakuten Hand 5G",
          ],
        },
      ],
      note: "eSIM functionality can vary by model and region. Please contact your local carrier for confirmation.",
    },
    {
      title: "Honor",
      devices: [
        {
          name: "Honor",
          versions: [
            "Honor Magic 4 Pro",
            "Honor Magic 5 Pro",
            "Honor Magic 6 Pro",
            "Honor Magic 7 Pro",
            "Honor Magic 8 Pro",
            "Honor 90",
            "Honor X8",
            "Honor 200 Pro",
            "Honor Magic V2",
            "Honor Magic V3",
            "Honor 400 Lite",
            "Honor Magic V5",
            "Honor Magic V6",
          ],
        },
      ],
      note: "eSIM functionality can vary by model and region. Please contact your local carrier for confirmation.",
    },
    {
      title: "Vivo",
      devices: [
        {
          name: "Vivo",
          versions: [
            "Vivo X80 Pro",
            "Vivo X90 Pro",
            "Vivo X100 Pro",
            "Vivo V29",
            "Vivo V29 Lite",
            "Vivo V29 Lite 5G (eSIM supported only in Europe)",
            "Vivo V40",
            "Vivo V40 lite",
            "Vivo V40 SE",
            "Vivo X200",
            "Vivo X200s",
            "Vivo X200 Pro",
            "Vivo X200 FE",
            "Vivo X300",
            "Vivo X300 Pro",
          ],
        },
      ],
      note: "eSIM functionality can vary by model and region. Please contact your local carrier for confirmation.",
    },
    {
      title: "Other brands",
      devices: [
        {
          name: "Other eSIM-compatible devices",
          versions: [
            "Gemini PDA",
            "Fairphone 4",
            "Fairphone 5",
            "DOOGEE V30",
            "OnePlus Open",
            "OnePlus 11",
            "OnePlus 12",
            "OnePlus 13",
            "OnePlus 13R",
            "OnePlus 13T",
            "OnePlus 15",
            "HAMMER Blade 3",
            "HAMMER Explorer PRO",
            "HAMMER Blade 5G",
            "Nokia XR21",
            "Nokia X30",
            "Nokia G60 5G",
            "myPhone NOW eSIM",
            "OUKITEL WP30 Pro",
            "OUKITEL WP33 Pro",
            "Nuu X5",
            "ZTE Nubia Flip",
            "TCL 50 5G",
            "Asus ROG Phone 9",
            "Asus ROG Phone 9 Pro",
            "Asus Zenfone 12 Ultra",
            "Realme 14 Pro+",
            "Realme GT 7",
            "Realme GT 8 Pro",
            "Nothing Phone 3",
            "Nothing Phone 3a Pro",
            "Nothing Phone 4a Pro",
            "Infinix Note 60 Pro",
            "Infinix Note 60 Ultra",
            "TCL 50 Pro NxtPaper",
            "TCL 60 XE NxtPaper",
            "TCL NxtPaper 60 Ultra",
            "TCL NxtPaper 70 Pro",
            "Tecno Camon 50 Ultra",
          ],
        },
      ],
      note: "eSIM functionality can vary by model and region. Please contact your local carrier for confirmation.",
    },
  ],
};

function toReduxSlice(compatibilities) {
  return compatibilities.map((c) => ({
    title: c.title,
    devices: c.devices.map((d) => ({
      name: d.name,
      versions: [...d.versions],
    })),
    note: c.note,
  }));
}

// --- Patch en/translation.json ---
const enPath = path.join(root, "public/assets/langs/en/translation.json");
const enJson = JSON.parse(fs.readFileSync(enPath, "utf8"));
enJson.sim.deviceCompatibilities = deviceCompatibilities;
fs.writeFileSync(enPath, JSON.stringify(enJson, null, 2) + "\n", "utf8");
console.log("Updated:", enPath);

// --- Patch sim slice ---
const slicePath = path.join(root, "src/store/module/sim/slice.jsx");
let sliceSrc = fs.readFileSync(slicePath, "utf8");
const reduxData = toReduxSlice(deviceCompatibilities.compatibilities);
const inner = JSON.stringify(reduxData, null, 2);
const innerLines = inner.split("\n");
innerLines[0] = "  deviceCompatibilities: " + innerLines[0];
for (let i = 1; i < innerLines.length; i++) innerLines[i] = "  " + innerLines[i];
const injected = innerLines.join("\n") + ",";

const startMarker = "  deviceCompatibilities: [";
const startIdx = sliceSrc.indexOf(startMarker);
if (startIdx === -1) throw new Error("Could not find deviceCompatibilities in slice");
const endMarker = "\n  topupPlans:";
const endIdx = sliceSrc.indexOf(endMarker, startIdx);
if (endIdx === -1) throw new Error("Could not find end of deviceCompatibilities block");

const before = sliceSrc.slice(0, startIdx);
const after = sliceSrc.slice(endIdx);
sliceSrc = before + injected + after;
fs.writeFileSync(slicePath, sliceSrc, "utf8");
console.log("Updated:", slicePath);

console.log("Brands:", deviceCompatibilities.compatibilities.length);
