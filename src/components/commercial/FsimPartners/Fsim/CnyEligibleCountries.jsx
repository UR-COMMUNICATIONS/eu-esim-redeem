import SectionHeader from "@/components/shared/others/SectionHeader";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const CnyEligibleCountries = () => {
  const { t } = useTranslation(["translation", "english", "local"]);
  const { currentLanguage } = useUserLocationLanguage();
  const { cart } = useSelector((state) => state.cart);
  const { reactCountries } = cart;
  const cnyData = t("cny", { returnObjects: true });
  console.log("🌍 CnyEligibleCountries - cnyData:", cnyData);
  console.log("🌍 CnyEligibleCountries - typeof cnyData:", typeof cnyData);
  console.log(
    "🌍 CnyEligibleCountries - cnyData keys:",
    cnyData && typeof cnyData === "object" ? Object.keys(cnyData) : "N/A",
  );

  const eligibleCountriesData = cnyData?.eligibleCountries || {};
  console.log(
    "🌍 CnyEligibleCountries - eligibleCountriesData:",
    eligibleCountriesData,
  );
  console.log(
    "🌍 CnyEligibleCountries - eligibleCountriesData keys:",
    typeof eligibleCountriesData === "object"
      ? Object.keys(eligibleCountriesData)
      : "N/A",
  );

  const eligibleCountries = Array.isArray(eligibleCountriesData?.countries)
    ? eligibleCountriesData.countries
    : [];
  console.log(
    "🌍 CnyEligibleCountries - eligibleCountries:",
    eligibleCountries,
  );
  console.log(
    "🌍 CnyEligibleCountries - eligibleCountries length:",
    eligibleCountries.length,
  );

  const getCountryCode = (countryName) => {
    const countryCodeMap = {
      Austria: "AT",
      Australia: "AU",
      Belgium: "BE",
      Bulgaria: "BG",
      Cambodia: "KH",
      China: "CN",
      Croatia: "HR",
      Cyprus: "CY",
      "Czech Republic": "CZ",
      Denmark: "DK",
      Estonia: "EE",
      France: "FR",
      Finland: "FI",
      Germany: "DE",
      Greece: "GR",
      "Hong Kong": "HK",
      Hungary: "HU",
      Indonesia: "ID",
      India: "IN",
      Ireland: "IE",
      Italy: "IT",
      Japan: "JP",
      Latvia: "LV",
      Lithuania: "LT",
      Luxembourg: "LU",
      "Macao (China)": "MO",
      Malaysia: "MY",
      Malta: "MT",
      Netherlands: "NL",
      "New Zealand": "NZ",
      Philippines: "PH",
      Poland: "PL",
      Portugal: "PT",
      Slovenia: "SI",
      "South Korea": "KR",
      Spain: "ES",
      Sweden: "SE",
      Taiwan: "TW",
      Thailand: "TH",
      "United Kingdom": "GB",
      "United States": "US",
      Vietnam: "VN",
      Switzerland: "CH",
      Singapore: "SG",
      Slovakia: "SK",
      Turkey: "TR",
      Qatar: "QA",
      Canada: "CA",
    };
    return (
      countryCodeMap[countryName] || countryName.substring(0, 2).toUpperCase()
    );
  };

  return (
    <section className="containerX">
      <div className="sec_common_80 xl:!px-0">
        <SectionHeader
          heading={eligibleCountriesData?.heading || ""}
          subHeading={eligibleCountriesData?.subHeading || ""}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-5 mt-6 md:mt-10">
          {eligibleCountries.map((country, index) => {
            const countryCode = getCountryCode(country);
            // Find matching country in reactCountries by iso2
            const matchedCountry = reactCountries?.find(
              (rc) => rc.iso2 === countryCode,
            );
            // Use translated name if available, otherwise fallback to original country name
            const translatedCountryName =
              matchedCountry?.translations?.[currentLanguage] || country;
            return (
              <div
                key={index}
                className="p-3 bg-neutral-100 rounded-xl flex gap-2 items-center"
              >
                <img
                  src={`https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`}
                  alt={country}
                  className="w-12 h-8 md:w-20 md:h-14 object-contain"
                  loading="lazy"
                  title={translatedCountryName}
                />
                <p className="text-sm lg:text-[18px] font-semibold">
                  {translatedCountryName}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CnyEligibleCountries;
