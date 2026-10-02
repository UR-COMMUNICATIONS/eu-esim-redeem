import LandingPageInternetPackages from "@/components/commercial/home/LandingPageInternetPackages";
import LandingHero from "@/components/shared/others/LandingHero";
import { Navigate, useParams } from "react-router-dom";

const SUPPORTED_COUNTRIES = {
  algeria: { name: "Algeria", code: "DZ", pageKey: "internetPackagesAlgeria" },
  albania: { name: "Albania", code: "AL", pageKey: "internetPackagesAlbania" },
  andorra: { name: "Andorra", code: "AD", pageKey: "internetPackagesAndorra" },
  armenia: { name: "Armenia", code: "AM", pageKey: "internetPackagesArmenia" },
  australia: {
    name: "Australia",
    code: "AU",
    pageKey: "internetPackagesAustralia",
  },
  austria: { name: "Austria", code: "AT", pageKey: "internetPackagesAustria" },
  azerbaijan: {
    name: "Azerbaijan",
    code: "AZ",
    pageKey: "internetPackagesAzerbaijan",
  },
  bahrain: { name: "Bahrain", code: "BH", pageKey: "internetPackagesBahrain" },
  bangladesh: {
    name: "Bangladesh",
    code: "BD",
    pageKey: "internetPackagesBangladesh",
  },
  belarus: { name: "Belarus", code: "BY", pageKey: "internetPackagesBelarus" },
  belgium: { name: "Belgium", code: "BE", pageKey: "internetPackagesBelgium" },
  bosniaandherzegovina: {
    name: "Bosnia and Herzegovina",
    code: "BA",
    pageKey: "internetPackagesBosniaAndHerzegovina",
  },
  bruneidarussalam: {
    name: "Brunei Darussalam",
    code: "BN",
    pageKey: "internetPackagesBruneiDarussalam",
  },
  bulgaria: {
    name: "Bulgaria",
    code: "BG",
    pageKey: "internetPackagesBulgaria",
  },
  canada: { name: "Canada", code: "CA", pageKey: "internetPackagesCanada" },
  china: { name: "China", code: "CN", pageKey: "internetPackagesChina" },
  croatia: { name: "Croatia", code: "HR", pageKey: "internetPackagesCroatia" },
  cyprus: { name: "Cyprus", code: "CY", pageKey: "internetPackagesCyprus" },
  czechia: { name: "Czechia", code: "CZ", pageKey: "internetPackagesCzechia" },
  egypt: { name: "Egypt", code: "EG", pageKey: "internetPackagesEgypt" },
  estonia: { name: "Estonia", code: "EE", pageKey: "internetPackagesEstonia" },
  faroeislands: {
    name: "Faroe Islands",
    code: "FO",
    pageKey: "internetPackagesFaroeIslands",
  },
  finland: { name: "Finland", code: "FI", pageKey: "internetPackagesFinland" },
  france: { name: "France", code: "FR", pageKey: "internetPackagesFrance" },
  frenchguiana: {
    name: "French Guiana",
    code: "GF",
    pageKey: "internetPackagesFrenchGuiana",
  },
  frenchwestindies: {
    name: "French West Indies",
    code: "WI",
    pageKey: "internetPackagesFrenchWestIndies",
  },
  georgia: { name: "Georgia", code: "GE", pageKey: "internetPackagesGeorgia" },
  germany: { name: "Germany", code: "DE", pageKey: "internetPackagesGermany" },
  gibraltar: {
    name: "Gibraltar",
    code: "GI",
    pageKey: "internetPackagesGibraltar",
  },
  greece: { name: "Greece", code: "GR", pageKey: "internetPackagesGreece" },
  guadeloupe: {
    name: "Guadeloupe",
    code: "GP",
    pageKey: "internetPackagesGuadeloupe",
  },
  guernsey: {
    name: "Guernsey",
    code: "GG",
    pageKey: "internetPackagesGuernsey",
  },
  guyana: { name: "Guyana", code: "GY", pageKey: "internetPackagesGuyana" },
  hawaii: { name: "Hawaii", code: "US", pageKey: "internetPackagesHawaii" },
  holysee: { name: "Holy See", code: "VA", pageKey: "internetPackagesHolySee" },
  hongkong: {
    name: "Hong Kong",
    code: "HK",
    pageKey: "internetPackagesHongkong",
  },
  hungary: { name: "Hungary", code: "HU", pageKey: "internetPackagesHungary" },
  iceland: { name: "Iceland", code: "IS", pageKey: "internetPackagesIceland" },
  india: { name: "India", code: "IN", pageKey: "internetPackagesIndia" },
  indonesia: {
    name: "Indonesia",
    code: "ID",
    pageKey: "internetPackagesIndonesia",
  },
  ireland: { name: "Ireland", code: "IE", pageKey: "internetPackagesIreland" },
  isleofman: {
    name: "Isle of Man",
    code: "IM",
    pageKey: "internetPackagesIsleOfMan",
  },
  israel: { name: "Israel", code: "IL", pageKey: "internetPackagesIsrael" },
  italy: { name: "Italy", code: "IT", pageKey: "internetPackagesItaly" },
  japan: { name: "Japan", code: "JP", pageKey: "internetPackagesJapan" },
  jersey: { name: "Jersey", code: "JE", pageKey: "internetPackagesJersey" },
  kazakhstan: {
    name: "Kazakhstan",
    code: "KZ",
    pageKey: "internetPackagesKazakhstan",
  },
  kuwait: { name: "Kuwait", code: "KW", pageKey: "internetPackagesKuwait" },
  kyrgyzstan: {
    name: "Kyrgyzstan",
    code: "KG",
    pageKey: "internetPackagesKyrgyzstan",
  },
  laos: {
    name: "Lao People's Democratic Republic",
    code: "LA",
    pageKey: "internetPackagesLaos",
  },
  latvia: { name: "Latvia", code: "LV", pageKey: "internetPackagesLatvia" },
  liechtenstein: {
    name: "Liechtenstein",
    code: "LI",
    pageKey: "internetPackagesLiechtenstein",
  },
  lithuania: {
    name: "Lithuania",
    code: "LT",
    pageKey: "internetPackagesLithuania",
  },
  luxembourg: {
    name: "Luxembourg",
    code: "LU",
    pageKey: "internetPackagesLuxembourg",
  },
  mayotte: { name: "Mayotte", code: "YT", pageKey: "internetPackagesMayotte" },
  macao: { name: "Macao", code: "MO", pageKey: "internetPackagesMacao" },
  malaysia: {
    name: "Malaysia",
    code: "MY",
    pageKey: "internetPackagesMalaysia",
  },
  malta: { name: "Malta", code: "MT", pageKey: "internetPackagesMalta" },
  martinique: {
    name: "Martinique",
    code: "MQ",
    pageKey: "internetPackagesMartinique",
  },
  mexico: { name: "Mexico", code: "MX", pageKey: "internetPackagesMexico" },
  moldova: { name: "Moldova", code: "MD", pageKey: "internetPackagesMoldova" },
  monaco: { name: "Monaco", code: "MC", pageKey: "internetPackagesMonaco" },
  montenegro: {
    name: "Montenegro",
    code: "ME",
    pageKey: "internetPackagesMontenegro",
  },
  morocco: { name: "Morocco", code: "MA", pageKey: "internetPackagesMorocco" },
  nepal: { name: "Nepal", code: "NP", pageKey: "internetPackagesNepal" },
  netherlands: {
    name: "Netherlands",
    code: "NL",
    pageKey: "internetPackagesNetherlands",
  },
  newzealand: {
    name: "New Zealand",
    code: "NZ",
    pageKey: "internetPackagesNewZealand",
  },
  northmacedonia: {
    name: "North Macedonia",
    code: "MK",
    pageKey: "internetPackagesNorthMacedonia",
  },
  norway: { name: "Norway", code: "NO", pageKey: "internetPackagesNorway" },
  pakistan: {
    name: "Pakistan",
    code: "PK",
    pageKey: "internetPackagesPakistan",
  },
  philippines: {
    name: "Philippines",
    code: "PH",
    pageKey: "internetPackagesPhilippines",
  },
  poland: { name: "Poland", code: "PL", pageKey: "internetPackagesPoland" },
  portugal: {
    name: "Portugal",
    code: "PT",
    pageKey: "internetPackagesPortugal",
  },
  qatar: { name: "Qatar", code: "QA", pageKey: "internetPackagesQatar" },
  reunion: { name: "Réunion", code: "RE", pageKey: "internetPackagesReunion" },
  russianfederation: {
    name: "Russian Federation",
    code: "RU",
    pageKey: "internetPackagesRussianFederation",
  },
  saintbarthelemy: {
    name: "Saint Barthélemy",
    code: "BL",
    pageKey: "internetPackagesSaintBarthelemy",
  },
  saintmartin: {
    name: "Saint Martin",
    code: "MF",
    pageKey: "internetPackagesSaintMartin",
  },
  sanmarino: {
    name: "San Marino",
    code: "SM",
    pageKey: "internetPackagesSanMarino",
  },
  saudiarabia: {
    name: "Saudi Arabia",
    code: "SA",
    pageKey: "internetPackagesSaudiArabia",
  },
  serbia: { name: "Serbia", code: "RS", pageKey: "internetPackagesSerbia" },
  singapore: {
    name: "Singapore",
    code: "SG",
    pageKey: "internetPackagesSingapore",
  },
  slovakia: {
    name: "Slovakia",
    code: "SK",
    pageKey: "internetPackagesSlovakia",
  },
  slovenia: {
    name: "Slovenia",
    code: "SI",
    pageKey: "internetPackagesSlovenia",
  },
  southafrica: {
    name: "South Africa",
    code: "ZA",
    pageKey: "internetPackagesSouthAfrica",
  },
  southkorea: {
    name: "South Korea",
    code: "KR",
    pageKey: "internetPackagesKorea",
  },
  spain: { name: "Spain", code: "ES", pageKey: "internetPackagesSpain" },
  srilanka: {
    name: "Sri Lanka",
    code: "LK",
    pageKey: "internetPackagesSriLanka",
  },
  sweden: { name: "Sweden", code: "SE", pageKey: "internetPackagesSweden" },
  switzerland: {
    name: "Switzerland",
    code: "CH",
    pageKey: "internetPackagesSwitzerland",
  },
  taiwan: { name: "Taiwan", code: "TW", pageKey: "internetPackagesTaiwan" },
  thailand: {
    name: "Thailand",
    code: "TH",
    pageKey: "internetPackagesThailand",
  },
  tunisia: { name: "Tunisia", code: "TN", pageKey: "internetPackagesTunisia" },
  turkey: { name: "Turkey", code: "TR", pageKey: "internetPackagesTurkey" },
  uae: { name: "UAE", code: "AE", pageKey: "internetPackagesUAE" },
  ukraine: { name: "Ukraine", code: "UA", pageKey: "internetPackagesUkraine" },
  unitedkingdom: {
    name: "United Kingdom",
    code: "GB",
    pageKey: "internetPackagesUnitedKingdom",
  },
  unitedstates: {
    name: "United States",
    code: "US",
    pageKey: "internetPackagesUnitedStates",
  },
  uzbekistan: {
    name: "Uzbekistan",
    code: "UZ",
    pageKey: "internetPackagesUzbekistan",
  },
  vietnam: { name: "Vietnam", code: "VN", pageKey: "internetPackagesVietnam" },
  virginislandsus: {
    name: "Virgin Islands U.S.",
    code: "VI",
    pageKey: "internetPackagesVirginIslandsUS",
  },
  denmark: { name: "Denmark", code: "DK", pageKey: "internetPackagesDenmark" },
};

function InternetPackagesCountry() {
  const { country } = useParams();
  const countryKey = country?.toLowerCase();
  const countryConfig = SUPPORTED_COUNTRIES[countryKey];

  if (!countryConfig) {
    return <Navigate to="/product/internet-packages" replace />;
  }

  return (
    <div className="overflow-hidden w-full">
      <LandingHero
        pageKey={countryConfig.pageKey}
        showText={true}
        showGradient={true}
        showSubtitle={true}
      />
      <LandingPageInternetPackages
        urlCountryCode={countryConfig.code}
        urlCountryName={countryConfig.name}
      />
    </div>
  );
}

export default InternetPackagesCountry;
