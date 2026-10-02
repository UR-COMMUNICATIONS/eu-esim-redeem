/**
 * One-off script: rename banner .webp files to landing-page-banner-{code}.webp
 * Run from project root: node scripts/rename-banner-images.cjs
 */
const fs = require("fs");
const path = require("path");

const BANNER_DIR = path.join(__dirname, "../src/assets/images/landing-page");

// name (as in filename) -> lowercase code
const NAME_TO_CODE = {
  Algeria: "dz", "ALGERIA": "dz",
  Albania: "al",
  Andorra: "ad",
  Armenia: "am",
  Australia: "au",
  Austria: "at",
  Azerbaijan: "az",
  Bahrain: "bh",
  Bangladesh: "bd",
  Belarus: "by",
  Belgium: "be",
  "Bosnia and Herzegovina": "ba",
  "Brunei Darussalam": "bn",
  Bulgaria: "bg",
  Canada: "ca",
  China: "cn",
  Croatia: "hr",
  Cyprus: "cy",
  Czechia: "cz",
  Denmark: "dk", "denmark": "dk",
  Egypt: "eg", "EGYPT": "eg",
  Estonia: "ee",
  "Faroe Islands": "fo",
  Finland: "fi",
  France: "fr",
  "French Guiana": "gf",
  "French West Indies": "wi",
  Georgia: "ge",
  Germany: "de",
  Gibraltar: "gi",
  Greece: "gr",
  Guadeloupe: "gp",
  Guernsey: "gg",
  Guyana: "gy",
  Hawaii: "us",
  "Holy See": "va",
  "Hong Kong": "hk",
  Hungary: "hu",
  Iceland: "is",
  India: "in",
  Indonesia: "id",
  Ireland: "ie",
  "Isle of Man": "im",
  Israel: "il",
  Italy: "it",
  Japan: "jp",
  Jersey: "je",
  Kazakhstan: "kz",
  Kuwait: "kw",
  Kyrgyzstan: "kg",
  "Lao People's Democratic Republic": "la",
  Latvia: "lv",
  Liechtenstein: "li",
  Lithuania: "lt",
  Luxembourg: "lu",
  Macao: "mo",
  Malaysia: "my",
  Malta: "mt",
  Martinique: "mq",
  Mayotte: "yt", "MAYOTTE": "yt",
  Mexico: "mx",
  Moldova: "md",
  Monaco: "mc",
  Montenegro: "me",
  Morocco: "ma",
  Nepal: "np",
  Netherlands: "nl",
  "New Zealand": "nz",
  "North Macedonia": "mk",
  Norway: "no",
  Pakistan: "pk",
  Philippines: "ph", "Philipines": "ph",
  Poland: "pl",
  Portugal: "pt",
  Qatar: "qa",
  "Réunion": "re", "Reunion": "re",
  Romania: "ro",
  "Russian Federation": "ru",
  "Saint Barthélemy": "bl",
  "Saint Martin": "mf",
  "San Marino": "sm",
  "Saudi Arabia": "sa",
  Serbia: "rs",
  Singapore: "sg",
  Slovakia: "sk",
  Slovenia: "si",
  "South Africa": "za",
  "South Korea": "kr",
  Spain: "es",
  "Sri Lanka": "lk",
  Sweden: "se",
  Switzerland: "ch",
  Taiwan: "tw",
  Thailand: "th",
  Tunisia: "tn",
  Turkey: "tr",
  UAE: "ae",
  Ukraine: "ua",
  "United Kingdom": "gb",
  "United States": "us",
  Uzbekistan: "uz",
  Vietnam: "vn",
  "Virgin Islands U.S.": "vi",
};

function main() {
  if (!fs.existsSync(BANNER_DIR)) {
    console.error("Banner dir not found:", BANNER_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(BANNER_DIR).filter((f) => f.endsWith(".webp"));
  let renamed = 0;
  let skipped = 0;

  for (const file of files) {
    const base = file.slice(0, -5); // remove .webp
    const code = NAME_TO_CODE[base];
    const target = `landing-page-banner-${code}.webp`;

    if (!code) {
      if (base.startsWith("landing-page-banner-") && base.length <= 30) {
        skipped++;
        continue; // already renamed
      }
      console.warn("No code for:", file);
      skipped++;
      continue;
    }

    const srcPath = path.join(BANNER_DIR, file);
    const destPath = path.join(BANNER_DIR, target);

    if (srcPath === destPath) {
      skipped++;
      continue;
    }
    if (fs.existsSync(destPath) && path.resolve(srcPath) !== path.resolve(destPath)) {
      console.warn("Target exists, skip:", file, "->", target);
      skipped++;
      continue;
    }

    fs.renameSync(srcPath, destPath);
    console.log(file, "->", target);
    renamed++;
  }

  console.log("\nRenamed:", renamed, "Skipped:", skipped);
}

main();
