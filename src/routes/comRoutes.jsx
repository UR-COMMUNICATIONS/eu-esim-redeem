import React, { Suspense } from "react";
import { Navigate } from "react-router-dom";
import { commercialRoutes as routes } from "@/services";
// import CommercialLayout from "@/components/layout/CommercialLayout";
// import PocketWifiLayout from "@/components/layout/PocketWifiLayout";
// import RouterLayout from "@/components/layout/RouterLayout";
// import SimLayout from "@/components/layout/SimLayout";
// import AboutUs from "@/pages/commercial/AboutUs";
// import Affiliate from "@/pages/commercial/Affiliate";
// import Contact from "@/pages/commercial/Contact";
// import PrivacyPolicy from "@/pages/commercial/PrivacyPolicy";
// import CountryCoverage from "@/pages/commercial/countryCoverage/CountryCoverage";
// [PHASE1-HIDDEN] country coverage filter page
// import CountryCoverageFilter from "@/pages/commercial/countryCoverage/CountryCoverageFilter";
// import Home from "@/pages/commercial/Home";
// [PHASE1-HIDDEN] pocket wifi / sim setup / how-it-works content pages
// import HowItWorks from "@/pages/commercial/howItWorks/HowItWorks";
// import HowToConnectPocketWifi from "@/pages/commercial/HowToConnectPocketWifi";
// import HowToSetupSim from "@/pages/commercial/HowToSetupSim";
// import PackageDetails from "@/pages/commercial/PackageDetails";
// import PickDropLocation from "@/pages/commercial/PickDropLocation";
// import PocketWifiHome from "@/pages/commercial/pocketWifi/Home";
// import PocketWifiChinaHome from "@/pages/commercial/pocketWifiChina/Home";
// import ESimChinaHome from "@/pages/commercial/eSimChina/Home";
// import ESimThailandHome from "@/pages/commercial/eSimThailand/Home";
// import PocketWifiJapanHome from "@/pages/commercial/pocketWifiJapan/Home";
// import PocketWifiCartService from "@/pages/commercial/pocketWifi/PocketWifiCartService";
// import PocketWifiOrderSummery from "@/pages/commercial/pocketWifi/PocketWifiOrderSummery";
// import PocketWifiPlan from "@/pages/commercial/pocketWifi/PocketWifiPlan";
// import PocketWifiPlanSummery from "@/pages/commercial/pocketWifi/PocketWifiPlanSummery";
// import PocketWifiRegion from "@/pages/commercial/pocketWifi/PocketWifiRegion";
// import PocketWifiSelfPickup from "@/pages/commercial/pocketWifi/PocketWifiSelfPickup";
// import PocketWifiShippingOption from "@/pages/commercial/pocketWifi/PocketWifiShippingOption";
// import PocketWifiDetails from "@/pages/commercial/PocketWifiDetails";
// import SimEsimDetails from "@/pages/commercial/SimEsimDetails";
// import RouterHome from "@/pages/commercial/router/Home";
// import RouterCartService from "@/pages/commercial/router/RouterCartService";
// import RouterOrderSummery from "@/pages/commercial/router/RouterOrderSummery";
// import RouterPlan from "@/pages/commercial/router/RouterPlan";
// import RouterPlanSummery from "@/pages/commercial/router/RouterPlanSummery";
// import RouterRegion from "@/pages/commercial/router/RouterRegion";
// import RouterSelfPickup from "@/pages/commercial/router/RouterSelfPickup";
// import RouterShippingOption from "@/pages/commercial/router/RouterShippingOption";
// import SimHome from "@/pages/commercial/sim/Home";
// // import SimCartService from "@/pages/commercial/sim/SimCartService";
// import SimOrderSummery from "@/pages/commercial/sim/SimOrderSummery";
// import SimPlan from "@/pages/commercial/sim/SimPlan";
// import SimPlanSummery from "@/pages/commercial/sim/SimPlanSummery";
// import SimRegion from "@/pages/commercial/sim/SimRegion";
// import SimSelfPickup from "@/pages/commercial/sim/SimSelfPickup";
// import SimShippingOption from "@/pages/commercial/sim/SimShippingOption";
// import Faq from "@/pages/Faq";
// import TermsService from "@/pages/commercial/TermsService";
// import DeleteAccount from "@/components/commercial/DeleteAccount";
// import AnaxYoowifi from "@/components/commercial/AnaxYoowifi/home";
// import DeviceUpgrade from "@/components/commercial/DeviceUpgrade/home";
// import DownloadApp from "@/components/commercial/DownloadApp/home";
// import DeviceUpgradePH from "@/components/commercial/DeviceUpgradePH/home";
// import GoogleCaptcha from "@/components/shared/navigation/GoogleCaptcha";
// import EsimThailand from "@/components/commercial/EsimThailand";
// import EsimChina from "@/components/commercial/EsimChina";
// import LegalNotice from "@/components/commercial/LegalNotice";
// import ProductInternetPackage from "@/components/commercial/home/ProductInternetPackage";
// import QuickSignup from "@/components/commercial/SimpleSignup";
// import AirAsia from "@/components/commercial/FsimPartners/AirAsia";
// import Jtb from "@/components/commercial/FsimPartners/Jtb";
// import OrderConfirmation from "@/components/commercial/FsimRegister/OrderConfirmation";
// import JapanEsimKddi from "@/components/commercial/home/JapanEsimKddi";
// import AstindoInternetPackage from "@/components/commercial/home/AstindoInternetPackage";
// import AstindoCartService from "@/pages/commercial/sim/AstindoCartService";
// import FreeEsimWorld from "@/components/commercial/FreeEsimWorld";
// import FsimQr from "@/components/commercial/FsimRegister/FsimQr";
// import FsimRegister from "@/components/commercial/FsimRegister";
// import YoowifiNatas from "@/components/commercial/YoowifiNatas";

const CommercialLayout = React.lazy(
  () => import("@/components/layout/CommercialLayout"),
);
// [PHASE1-HIDDEN] Home landing page - "/" now serves the EU campaign
// const Home = React.lazy(() => import("@/pages/commercial/Home"));
// [PHASE1-HIDDEN] FSIM partner landing pages
// const Kol = React.lazy(
  // () => import("@/components/commercial/FsimPartners/Kol"),
// );
// const Jtb = React.lazy(
  // () => import("@/components/commercial/FsimPartners/Jtb"),
// );
// const Cny = React.lazy(
  // () => import("@/components/commercial/FsimPartners/Cny"),
// );
// const Challenger = React.lazy(
  // () => import("@/components/commercial/FsimPartners/Challenger"),
// );
// const Sq = React.lazy(() => import("@/components/commercial/FsimPartners/Sq"));
// const AirAsia = React.lazy(
  // () => import("@/components/commercial/FsimPartners/AirAsia"),
// );
// const Astindo = React.lazy(
  // () => import("@/components/commercial/FsimPartners/Astindo"),
// );
// const FrwFana = React.lazy(
  // () => import("@/components/commercial/FsimPartners/FrwFana"),
// );
// const Idta = React.lazy(
  // () => import("@/components/commercial/FsimPartners/Idta"),
// );
// const Phta = React.lazy(
  // () => import("@/components/commercial/FsimPartners/Phta"),
// );
// const sindoFerry = React.lazy(() => import("@/components/commercial/FsimPartners/SindoFerry"));

// [PHASE1-HIDDEN] country-specific product landing pages
// const ESimChinaHome = React.lazy(
  // () => import("@/pages/commercial/eSimChina/Home"),
// );
// const ESimThailandHome = React.lazy(
  // () => import("@/pages/commercial/eSimThailand/Home"),
// );
// const PocketWifiChinaHome = React.lazy(
  // () => import("@/pages/commercial/pocketWifiChina/Home"),
// );
// const PocketWifiJapanHome = React.lazy(
  // () => import("@/pages/commercial/pocketWifiJapan/Home"),
// );

// [PHASE1-HIDDEN] how-to-use video pages
// const HowToUseID = React.lazy(
  // () => import("@/pages/commercial/videos/HowToUseID"),
// );
// const HowToUseVN = React.lazy(
  // () => import("@/pages/commercial/videos/HowToUseVN"),
// );
// const HowToUseTH = React.lazy(
  // () => import("@/pages/commercial/videos/HowToUseTH"),
// );
// const HowToUseHK = React.lazy(
  // () => import("@/pages/commercial/videos/HowToUseHK"),
// );
// const HowToUseTW = React.lazy(
  // () => import("@/pages/commercial/videos/HowToUseTW"),
// );
// const HowtoUseEN = React.lazy(
  // () => import("@/pages/commercial/videos/HowtoUseEN"),
// );

// [PHASE1-HIDDEN] product / pickup / marketing pages
// const InternetPackagesCountry = React.lazy(
  // () => import("@/pages/commercial/InternetPackagesCountry"),
// );
// const UmrahHajjPackages = React.lazy(
  // () => import("@/pages/commercial/UmrahHajjPackages"),
// );
// const ProductRouters = React.lazy(
  // () => import("@/pages/commercial/ProductRouters"),
// );
// const MarinPackages = React.lazy(
  // () => import("@/pages/commercial/MarinPackages"),
// );
// const PickupLocation = React.lazy(
  // () => import("@/pages/commercial/PickupLocation"),
// );
// const PickupRegus = React.lazy(() => import("@/pages/commercial/PickupRegus"));
// const PickupLuggagefree = React.lazy(
  // () => import("@/pages/commercial/PickupLuggagefree"),
// );
// const MoneyBackGuarantee = React.lazy(
  // () => import("@/pages/commercial/MoneyBackGuarantee"),
// );
// const DeviceReturnRebate = React.lazy(
  // () => import("@/pages/commercial/DeviceReturnRebate"),
// );
// const Ratings = React.lazy(() => import("@/pages/commercial/Ratings"));

// [PHASE1-HIDDEN] country coverage + anax pages
// const CountryCoverage = React.lazy(
  // () => import("@/pages/commercial/countryCoverage/CountryCoverage"),
// );
// const AnaxYoowifi = React.lazy(
  // () => import("@/components/commercial/AnaxYoowifi/home"),
// );

// [PHASE1-HIDDEN] FSIM register + QR screens
// const FsimRegister = React.lazy(
  // () => import("@/components/commercial/FsimRegister"),
// );
// const FsimQr = React.lazy(
  // () => import("@/components/commercial/FsimRegister/FsimQr"),
// );

// [PHASE1-HIDDEN] Japan KDDI + free eSIM world pages
// const JapanEsimKddi = React.lazy(
  // () => import("@/components/commercial/home/JapanEsimkddi"),
// );
// const FreeEsimWorld = React.lazy(
  // () => import("@/components/commercial/FreeEsimWorld"),
// );

// [PHASE1-HIDDEN] quick signup + natas pages
// const QuickSignup = React.lazy(
  // () => import("@/components/commercial/SimpleSignup"),
// );
// const YoowifiNatas = React.lazy(
  // () => import("@/components/commercial/YoowifiNatas"),
// );
const EsimRedeem = React.lazy(() => import("@/pages/commercial/esimRedeem"));

// [PHASE1-HIDDEN] device upgrade / delete account / download app / product packages
// const DeviceUpgrade = React.lazy(
  // () => import("@/components/commercial/DeviceUpgrade/home"),
// );
// const DeviceUpgradePH = React.lazy(
  // () => import("@/components/commercial/DeviceUpgradePH/home"),
// );
//
// const DeleteAccount = React.lazy(
  // () => import("@/components/commercial/DeleteAccount"),
// );
// const DownloadApp = React.lazy(
  // () => import("@/components/commercial/DownloadApp/home"),
// );
//
// const ProductInternetPackage = React.lazy(
  // () => import("@/components/commercial/home/ProductInternetPackage"),
// );
// const AstindoInternetPackage = React.lazy(() => import("@/components/commercial/home/AstindoInternetPackage"));

const PrivacyPolicy = React.lazy(
  () => import("@/pages/commercial/PrivacyPolicy"),
);
// [PHASE1-HIDDEN] legal notice page
// const LegalNotice = React.lazy(
  // () => import("@/components/commercial/LegalNotice"),
// );

const TermsService = React.lazy(
  () => import("@/pages/commercial/TermsService"),
);
// [PHASE1-HIDDEN] FAQ page
// const Faq = React.lazy(() => import("@/pages/Faq"));

// [PHASE1-HIDDEN] pocket wifi / sim detail pages
// const PocketWifiDetails = React.lazy(
  // () => import("@/pages/commercial/PocketWifiDetails"),
// );
// const SimEsimDetails = React.lazy(
  // () => import("@/pages/commercial/SimEsimDetails"),
// );

// const AstindoCartService = React.lazy(() => import("@/pages/commercial/sim/AstindoCartService"));

// [PHASE1-HIDDEN] pocket wifi / router / sim layouts and their order-flow pages
// const PocketWifiLayout = React.lazy(
  // () => import("@/components/layout/PocketWifiLayout"),
// );
// const RouterLayout = React.lazy(
  // () => import("@/components/layout/RouterLayout"),
// );
// const SimLayout = React.lazy(() => import("@/components/layout/SimLayout"));
//
// const PocketWifiRegion = React.lazy(
  // () => import("@/pages/commercial/pocketWifi/PocketWifiRegion"),
// );
// const SimRegion = React.lazy(() => import("@/pages/commercial/sim/SimRegion"));
// const RouterRegion = React.lazy(
  // () => import("@/pages/commercial/router/RouterRegion"),
// );
//
// const PocketWifiPlan = React.lazy(
  // () => import("@/pages/commercial/pocketWifi/PocketWifiPlan"),
// );
// const SimPlan = React.lazy(() => import("@/pages/commercial/sim/SimPlan"));
// const RouterPlan = React.lazy(
  // () => import("@/pages/commercial/router/RouterPlan"),
// );
//
// const PocketWifiCartService = React.lazy(
  // () => import("@/pages/commercial/pocketWifi/PocketWifiCartService"),
// );
// const SimCartService = React.lazy(
  // () => import("@/pages/commercial/sim/SimCartService"),
// );
// const RouterCartService = React.lazy(
  // () => import("@/pages/commercial/router/RouterCartService"),
// );
//
// const PocketWifiPlanSummery = React.lazy(
  // () => import("@/pages/commercial/pocketWifi/PocketWifiPlanSummery"),
// );
// const SimPlanSummery = React.lazy(
  // () => import("@/pages/commercial/sim/SimPlanSummery"),
// );
// const RouterPlanSummery = React.lazy(
  // () => import("@/pages/commercial/router/RouterPlanSummery"),
// );
//
// const PocketWifiShippingOption = React.lazy(
  // () => import("@/pages/commercial/pocketWifi/PocketWifiShippingOption"),
// );
// const SimShippingOption = React.lazy(
  // () => import("@/pages/commercial/sim/SimShippingOption"),
// );
// const RouterShippingOption = React.lazy(
  // () => import("@/pages/commercial/router/RouterShippingOption"),
// );
//
// const PocketWifiSelfPickup = React.lazy(
  // () => import("@/pages/commercial/pocketWifi/PocketWifiSelfPickup"),
// );
// const SimSelfPickup = React.lazy(
  // () => import("@/pages/commercial/sim/SimSelfPickup"),
// );
// const RouterSelfPickup = React.lazy(
  // () => import("@/pages/commercial/router/RouterSelfPickup"),
// );
//
// const PocketWifiOrderSummery = React.lazy(
  // () => import("@/pages/commercial/pocketWifi/PocketWifiOrderSummery"),
// );
// const SimOrderSummery = React.lazy(
  // () => import("@/pages/commercial/sim/SimOrderSummery"),
// );
// const RouterOrderSummery = React.lazy(
  // () => import("@/pages/commercial/router/RouterOrderSummery"),
// );
//
// const PocketWifiHome = React.lazy(
  // () => import("@/pages/commercial/pocketWifi/Home"),
// );
// const SimHome = React.lazy(() => import("@/pages/commercial/sim/Home"));
// const RouterHome = React.lazy(() => import("@/pages/commercial/router/Home"));

// [PHASE1-HIDDEN] instant eSIM / wesim / raya / about / affiliate / contact pages
// const InstantEsim = React.lazy(
  // () => import("@/components/commercial/InstantEsim"),
// );
// const WesimInstantEsim = React.lazy(
  // () => import("@/components/commercial/WesimInstantEsim"),
// );
// const MockInstantEsim = React.lazy(
  // () => import("@/components/commercial/MockInstantEsim"),
// );
// const Raya = React.lazy(() => import("@/pages/commercial/Raya"));
// const AboutUs = React.lazy(() => import("@/pages/commercial/AboutUs"));
// const Affiliate = React.lazy(() => import("@/pages/commercial/Affiliate"));
// const Contact = React.lazy(() => import("@/pages/commercial/Contact"));

const UserProfile = React.lazy(
  () => import("@/components/commercial/UserProfile"),
);
// [PHASE1-HIDDEN] My Home
// const UserHome = React.lazy(() => import("@/components/commercial/UserHome"));
const UserOrder = React.lazy(() => import("@/components/commercial/UserOrder"));
// [PHASE1-HIDDEN] add new order
// const AddNewOrder = React.lazy(
  // () => import("@/components/commercial/UserOrder/AddNewOrder"),
// );
const OrderDetails = React.lazy(
  () => import("@/components/commercial/UserOrder/OrderDetails"),
);

const DataDetails = React.lazy(
  () => import("@/components/commercial/UserData/DataDetails"),
);

// [PHASE1-HIDDEN] my address
// const UserAddress = React.lazy(
  // () => import("@/components/commercial/UserAddress"),
// );
const UserData = React.lazy(() => import("@/components/commercial/UserData"));
// [PHASE1-HIDDEN] add new data
// const AddNewData = React.lazy(
  // () => import("@/components/commercial/UserData/AddNewData"),
// );
// [PHASE1-HIDDEN] my cards + add new address
// const UserCards = React.lazy(() => import("@/components/commercial/UserCards"));
// const AddNewCards = React.lazy(
  // () => import("@/components/commercial/UserCards/AddNewCards"),
// );
// const AddNewAddress = React.lazy(
  // () => import("@/components/commercial/UserAddress/AddNewAddress"),
// );
// [PHASE1-HIDDEN] edit address
// const EditAddress = React.lazy(
  // () => import("@/components/commercial/UserAddress/EditAddress"),
// );
const UserAccountLayout = React.lazy(
  () => import("@/components/layout/UserAccountLayout"),
);

// const OrderConfirmation = React.lazy(() => import("@/components/commercial/FsimRegister/OrderConfirmation"));
// const FsimOrderSummary = React.lazy(() => import("@/components/commercial/FsimRegister/FsimOrderSummary"));

// [PHASE1-HIDDEN] blogs + payment link order summary
// const Blog = React.lazy(() => import("@/components/commercial/blogs/Blogs"));
// const BlogLisitng = React.lazy(
  // () => import("@/components/commercial/BlogListing/index"),
// );
//
// const PaymentLinkOrderSummary = React.lazy(
  // () => import("@/pages/commercial/PaymentLinkOrderSummary"),
// );

import JtbSkeleton from "@/skeletons/jtb";
// import HomeSkeleton from "@/skeletons/home";
// import CountryListSkeleton from "@/skeletons/home/CountryListSkeleton";
// import BannerSkeleton from "@/skeletons/home/BannerSkeleton";
import RegisterFormSkeleton from "@/components/commercial/FsimRegister/RegisterFormSkeleton";
import DynamicComponent from "@/components/shared/DynamicComponent";

const {
  aboutUs,
  commercialLayout,
  contact,
  privacyPolicy,
  termsService,
  privacyPolicyUpperCase,
  termsServiceUpperCase,
  home,
  howToSetupSim,
  pocketWifiLayout,
  productInternetPackages,
  // astindoInternetPackages,
  // astindoCartService,
  pocketWifiHome,
  pocketWifiRegion,
  pocketWifiPlan,
  pocketWifiCartService,
  pocketWifiPlanSummery,
  pocketWifiOrderSummery,
  pocketWifiSelfPickup,
  pocketWifiShippingOption,
  pocketWifiDetails,
  simEsimDetails,
  routerLayout,
  routerRegion,
  routerPlan,
  routerCartService,
  routerPlanSummery,
  routerShippingOption,
  routerSelfPickup,
  routerOrderSummery,
  simHome,
  simEsimHome,
  simLayout,
  simRegion,
  simPlan,
  simCartService,
  simPlanSummery,
  simShippingOption,
  simSelfPickup,
  simOrderSummery,
  countryCoverage,
  countryCoverageFilter,
  howToConnectPocketWifi,
  packageDetails,
  howItWorks,
  affiliate,
  pickDropLocation,
  faq,
  deleteAccount,
  deleteAccountUpperCase,
  anaxYoowifi,
  deviceUpgrade,
  deviceUpgradePH,
  downloadApp,
  esimChina,
  esimThailand,
  pocketWifiChina,
  pocketWifiJapan,
  legalNotice,
  quickSignupAna,
  quickSignupNatas,

  // GoogleCaptcha,

  //////////////////////  KOL  ///////////////////////
  kol,
  kolRegister,
  kolOrderConfirmation,
  kolOrderSummary,
  kolQr,
  frwfana,
  frwfanaRegister,
  frwfanaOrderConfirmation,
  frwfanaOrderSummary,
  frwfanaQr,
  // sindoferry,
  //////////////////////  JTB  ///////////////////////
  jtb,
  jtbRegister,
  jtbOrderConfirmation,
  jtbQr,
  //////////////////////  CNY  ///////////////////////
  cny,
  cnyRegister,
  cnyOrderConfirmation,
  cnyQr,
  //////////////////////  AIRASIA  ///////////////////////
  airAsia,
  airAsiaRegister,
  airAsiaOrderConfirmation,
  airAsiaQr,
  //////////////////////  ASTINDO  ///////////////////////
  astindo,
  astindoRegister,
  astindoOrderConfirmation,
  astindoQr,
  //////////////////////  Japan Esim Kddi  ///////////////////////
  japanEsimKddi,
  //////////////////////  Free Esim World  ///////////////////////
  freeEsimWorld,
  natasPrivacy,
  natasEsimRedeem,
  euEsimRedeem,
  yw3gbEsimRedeem,
  esimPartnerRedeem,
  blog,
  blogListing,

  userProfile,
  userOrder,
  userHome,
  orderDetails,
  dataDetails,
  addNewOrder,
  addNewData,
  userAddress,
  userData,
  userCards,
  addNewCards,
  addNewAddress,
  editAddress,
  userAccountLayout,
  howtoUseHK,
  howtoUseID,
  howtoUseTH,
  howtoUseTW,
  howtoUseVN,
  howtoUseEN,
  internetPackagesCountry,
  umrahHajj,
  productRouters,
  marin,
  pickupLocation,
  pickupRegus,
  pickupLuggagefree,
  moneyBackGuarantee,
  deviceReturnRebate,
  ratings,
  instantEsim,
  wesimInstantEsim,
  mockInstantEsim,
  raya,
  rayaMy,
  paymentLink,
  // OrderConfirmation
  // GoogleCaptcha
} = routes || {};

// [PHASE1-HIDDEN] garuda embed page
// const GarudaEmbed = React.lazy(() => import("@/pages/commercial/GarudaEmbed"));

export const comRoutes = [
  // [PHASE1-HIDDEN] /garuda/* route
  // {
    // path: "/garuda/*",
    // element: <DynamicComponent Comp={GarudaEmbed} />,
  // },
  {
    path: commercialLayout.path,
    element: <DynamicComponent Comp={CommercialLayout} />,

    children: [
      // [PHASE1-HIDDEN] payment link + partner landing routes
      // {
        // path: paymentLink.path,
        // element: <DynamicComponent Comp={PaymentLinkOrderSummary} />,
      // },
      // {
        // path: "idta",
        // element: <DynamicComponent Comp={Idta} />,
      // },
      // {
        // path: "phta",
        // element: <DynamicComponent Comp={Phta} />,
      // },
      // {
        // path: "cny",
        // element: <DynamicComponent Comp={Cny} />,
      // },
      // {
        // path: "challenger",
        // element: <DynamicComponent Comp={Challenger} />,
      // },
      {
        path: home.path,
        // Canonical landing page is the EU campaign URL; redirect the root path
        // so the public homepage resolves at /EU/esim-redeem.
        element: <Navigate to={euEsimRedeem.path} replace />,
      },
      // [PHASE1-HIDDEN] quick signup / natas campaign routes
      // {
        // path: quickSignupAna.path,
        // element: <DynamicComponent Comp={QuickSignup} type="ana" />,
      // },
      // {
        // path: quickSignupNatas.path,
        // element: <DynamicComponent Comp={QuickSignup} type="natas" />,
      // },
      // {
        // path: natasPrivacy.path,
        // element: <DynamicComponent Comp={YoowifiNatas} />,
      // },
      // {
        // path: natasEsimRedeem.path,
        // element: <DynamicComponent Comp={EsimRedeem} campaign="natas" />,
      // },
      {
        path: euEsimRedeem.path,
        element: <DynamicComponent Comp={EsimRedeem} campaign="eu" />,
      },
      // [PHASE1-HIDDEN] yw3gb + esimpartner campaigns, product internet packages
      // {
        // path: yw3gbEsimRedeem.path,
        // element: <DynamicComponent Comp={EsimRedeem} campaign="yw3gb" />,
      // },
      // {
        // path: esimPartnerRedeem.path,
        // element: <DynamicComponent Comp={EsimRedeem} campaign="esimpartner" />,
      // },
      // {
        // path: productInternetPackages.path,
        // element: (
          // <DynamicComponent
            // Comp={ProductInternetPackage}
            // Fallback="InternetPackageSkeleton"
          // />
        // ),
      // },
      // {
      //   path: astindoInternetPackages.path,
      //   element: <DynamicComponent Comp={AstindoInternetPackage} Fallback="InternetPackageSkeleton" />,
      // },
      // {
      //   path: astindoCartService.path,
      //   element: <DynamicComponent Comp={AstindoCartService} />,

      // },
      // [PHASE1-HIDDEN] pocket wifi / sim home, about us, contact routes
      // {
        // path: pocketWifiHome.path,
        // element: <DynamicComponent Comp={PocketWifiHome} />,
      // },
      //
      // {
        // path: simHome.path,
        // element: <DynamicComponent Comp={SimHome} />,
      // },
      // {
        // path: simEsimHome.path,
        // element: <DynamicComponent Comp={SimHome} />,
      // },
      // {
        // path: aboutUs.path,
        // element: <DynamicComponent Comp={AboutUs} />,
      // },
      // {
        // path: contact.path,
        // element: <DynamicComponent Comp={Contact} />,
      // },
      {
        path: privacyPolicy.path,
        element: <DynamicComponent Comp={PrivacyPolicy} />,
      },
      {
        path: termsService.path,
        element: <DynamicComponent Comp={TermsService} />,
      },
      {
        path: privacyPolicyUpperCase.path,
        element: <DynamicComponent Comp={PrivacyPolicy} />,
      },
      // [PHASE1-HIDDEN] legal notice route
      // {
        // path: legalNotice.path,
        // element: <DynamicComponent Comp={LegalNotice} />,
      // },
      {
        path: termsServiceUpperCase.path,
        element: <DynamicComponent Comp={TermsService} />,
      },
      // [PHASE1-HIDDEN] product detail, coverage, how-to and FAQ routes
      // {
        // path: pocketWifiDetails.path,
        // element: <DynamicComponent Comp={PocketWifiDetails} />,
      // },
      // {
        // path: simEsimDetails.path, //  need to check
        // element: <DynamicComponent Comp={SimEsimDetails} />,
      // },
      // {
        // path: countryCoverage.path,
        // element: (
          // <DynamicComponent
            // Comp={CountryCoverage}
            // Fallback="CountryListSkeleton"
          // />
        // ),
      // },
      // {
        // path: countryCoverageFilter.path,
        // element: <CountryCoverageFilter />,
      // },
      // {
        // path: packageDetails.path,
        // element: <PackageDetails />,
      // },
      // {
        // path: howItWorks.path,
        // element: <HowItWorks />,
      // },
      // {
        // path: affiliate.path,
        // element: <DynamicComponent Comp={Affiliate} />,
      // },
      // {
        // path: deleteAccount.path,
        // element: <DynamicComponent Comp={DeleteAccount} />,
      // },
      // {
        // path: deleteAccountUpperCase.path,
        // element: <DynamicComponent Comp={DeleteAccount} />,
      // },
      // {
        // path: pickDropLocation.path,
        // element: <PickDropLocation />,
      // },
      // {
        // path: howToSetupSim.path,
        // element: <HowToSetupSim />,
      // },
      // {
        // path: howToConnectPocketWifi.path,
        // element: <HowToConnectPocketWifi />,
      // },
      // {
        // path: faq.path,
        // element: <DynamicComponent Comp={Faq} />,
      // },
      // [PHASE1-HIDDEN] marketing, video, product, instant eSIM and raya routes
      // {
        // path: anaxYoowifi.path,
        // element: (
          // <DynamicComponent Comp={AnaxYoowifi} Fallback="BannerSkeleton" />
        // ),
      // },
      // {
        // path: downloadApp.path,
        // element: (
          // <DynamicComponent
            // Comp={DownloadApp}
            // Fallback="DownloadYoowifiSkeleton"
          // />
        // ),
      // },
      // {
        // path: deviceUpgrade.path,
        // element: <DynamicComponent Comp={DeviceUpgrade} />,
      // },
      // {
        // path: deviceUpgradePH.path,
        // element: <DynamicComponent Comp={DeviceUpgradePH} />,
      // },
      // {
        // path: pocketWifiChina.path,
        // element: <DynamicComponent Comp={PocketWifiChinaHome} />,
      // },
      // {
        // path: pocketWifiJapan.path,
        // element: <DynamicComponent Comp={PocketWifiJapanHome} />,
      // },
      // {
        // path: esimChina.path,
        // element: <DynamicComponent Comp={ESimChinaHome} />,
      // },
      // {
        // path: esimThailand.path,
        // element: <DynamicComponent Comp={ESimThailandHome} />,
      // },
      // {
        // path: howtoUseHK.path,
        // element: <DynamicComponent Comp={HowToUseHK} />,
      // },
      // {
        // path: howtoUseID.path,
        // element: <DynamicComponent Comp={HowToUseID} />,
      // },
      // {
        // path: howtoUseTH.path,
        // element: <DynamicComponent Comp={HowToUseTH} />,
      // },
      // {
        // path: howtoUseTW.path,
        // element: <DynamicComponent Comp={HowToUseTW} />,
      // },
      // {
        // path: howtoUseVN.path,
        // element: <DynamicComponent Comp={HowToUseVN} />,
      // },
      // {
        // path: howtoUseEN.path,
        // element: <DynamicComponent Comp={HowtoUseEN} />,
      // },
      // {
        // path: internetPackagesCountry.path,
        // element: <DynamicComponent Comp={InternetPackagesCountry} />,
      // },
      // {
        // path: umrahHajj.path,
        // element: <DynamicComponent Comp={UmrahHajjPackages} />,
      // },
      // {
        // path: productRouters.path,
        // element: <DynamicComponent Comp={ProductRouters} />,
      // },
      // {
        // path: marin.path,
        // element: <DynamicComponent Comp={MarinPackages} />,
      // },
      // {
        // path: pickupRegus.path,
        // element: <DynamicComponent Comp={PickupRegus} />,
      // },
      // {
        // path: pickupLuggagefree.path,
        // element: <DynamicComponent Comp={PickupLuggagefree} />,
      // },
      // {
        // path: pickupLocation.path,
        // element: <DynamicComponent Comp={PickupLocation} />,
      // },
      // {
        // path: moneyBackGuarantee.path,
        // element: <DynamicComponent Comp={MoneyBackGuarantee} />,
      // },
      // {
        // path: deviceReturnRebate.path,
        // element: <DynamicComponent Comp={DeviceReturnRebate} />,
      // },
      // {
        // path: ratings.path,
        // element: <DynamicComponent Comp={Ratings} />,
      // },
      // {
        // path: instantEsim.path,
        // element: <DynamicComponent Comp={InstantEsim} />,
      // },
      // {
        // path: wesimInstantEsim.path,
        // element: <DynamicComponent Comp={WesimInstantEsim} />,
      // },
      // {
        // path: mockInstantEsim.path,
        // element: <DynamicComponent Comp={MockInstantEsim} />,
      // },
      // {
        // path: raya.path,
        // element: <DynamicComponent Comp={Raya} />,
      // },
      // {
        // path: rayaMy.path,
        // element: <DynamicComponent Comp={Raya} />,
      // },
      // {
      //   path: frwfana.path,
      //   element: <DynamicComponent Comp={FrwFana} Fallback="JtbSkeleton" />,
      // },
      // {
      //   path: frwfanaRegister.path,
      //   element: (
      //     <Suspense
      //       fallback={<RegisterFormSkeleton />}>
      //       {<FsimRegister comp="frwfana" />}
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: frwfanaOrderConfirmation.path,
      //   element: (
      //     <Suspense
      //       fallback={<JtbSkeleton />}>
      //       {<OrderConfirmation comp="frwfana" />}
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: frwfanaOrderSummary.path,
      //   element: (
      //     <Suspense
      //       fallback={<JtbSkeleton />}>
      //       {<FsimOrderSummary comp="frwfana" />}
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: frwfanaQr.path,
      //   element: (
      //     <Suspense
      //       fallback={<JtbSkeleton />}>
      //       {<FsimQr comp="frwfana" />}
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: kol.path,
      //   element: <DynamicComponent Comp={Kol} Fallback="JtbSkeleton" />,
      // },
      // {
      //   path: kolRegister.path,
      //   element: (
      //     <Suspense
      //       fallback={<RegisterFormSkeleton />}>
      //       {<FsimRegister comp="kol" />}
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: kolOrderConfirmation.path,
      //   element: (
      //     <Suspense
      //       fallback={<JtbSkeleton />}>
      //       {<OrderConfirmation comp="kol" />}
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: kolOrderSummary.path,
      //   element: (
      //     <Suspense
      //       fallback={<JtbSkeleton />}>
      //       {<FsimOrderSummary comp="kol" />}
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: kolQr.path,
      //   element: (
      //     <Suspense
      //       fallback={<JtbSkeleton />}>
      //       {<FsimQr comp="kol" />}
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: jtb.path,
      //   element: <DynamicComponent Comp={Jtb} Fallback="JtbSkeleton" />,
      // },
      // {
      //   path: jtbRegister.path,
      //   element: (
      //     <Suspense
      //       fallback={<RegisterFormSkeleton />}>
      //       {<FsimRegister comp="jtb" />}
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: jtbOrderConfirmation.path,
      //   element: (
      //     <Suspense
      //       fallback={<JtbSkeleton />}>
      //       {<OrderConfirmation comp="jtb" />}
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: jtbQr.path,
      //   element: (
      //     <Suspense
      //       fallback={<JtbSkeleton />}>
      //       {<FsimQr comp="jtb" />}
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: airAsia.path,
      //   element: (
      //     <Suspense
      //       fallback={<JtbSkeleton />}>
      //       {<AirAsia />}
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: airAsiaRegister.path,
      //   element: (
      //     <Suspense
      //       fallback={<RegisterFormSkeleton />}>
      //       {<FsimRegister comp="airasia" />}
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: airAsiaOrderConfirmation.path,
      //   element: (
      //     <Suspense
      //       fallback={<JtbSkeleton />}>
      //       {<OrderConfirmation comp="airasia" />}
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: airAsiaQr.path,
      //   element: (
      //     <Suspense
      //       fallback={<JtbSkeleton />}>
      //       {<FsimQr comp="airasia" />}
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: astindo.path,
      //   element: (
      //     <Suspense
      //       fallback={<JtbSkeleton />}>
      //       {<Astindo />}
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: astindoRegister.path,
      //   element: (
      //     <Suspense
      //       fallback={<RegisterFormSkeleton />}>
      //       {<FsimRegister comp="astindo" />}
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: astindoOrderConfirmation.path,
      //   element: (
      //     <Suspense
      //       fallback={<JtbSkeleton />}>
      //       {<OrderConfirmation comp="astindo" />}
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: astindoQr.path,
      //   element: (
      //     <Suspense
      //       fallback={<JtbSkeleton />}>
      //       {<FsimQr comp="astindo" />}
      //     </Suspense>
      //   ),
      // },
      // [PHASE1-HIDDEN] Japan KDDI + free eSIM world routes
      // {
        // path: japanEsimKddi.path,
        // element: <DynamicComponent Comp={JapanEsimKddi} />,
      // },
      // {
        // path: freeEsimWorld.path,
        // element: (
          // <DynamicComponent Comp={FreeEsimWorld} Fallback="BannerSkeleton" />
        // ),
      // },
      // {
      //   path: blog.path,
      //   element: <DynamicComponent Comp={PocketWifiJapanHome} />,
      // },
      // [PHASE1-HIDDEN] blog routes
      // {
        // path: blogListing.path,
        // element: <DynamicComponent Comp={BlogLisitng} />,
      // },
      //
      // {
        // path: blog.path,
        // element: <DynamicComponent Comp={Blog} />,
      // },
      // {
      //   path: userProfile.path,
      //   element: <DynamicComponent Comp={UserProfile} Fallback="Loader" />,
      // },
      // {
      //   path: userHome.path,
      //   element: <DynamicComponent Comp={UserHome} Fallback="Loader" />,
      // },
      // {
      //   path: userOrder.path,
      //   element: <DynamicComponent Comp={UserOrder} Fallback="Loader" />,
      // },
      // {
      //   path: addNewOrder.path,
      //   element: <DynamicComponent Comp={AddNewOrder} Fallback="Loader" />,
      // },
      // {
      //   path: orderDetails.path,
      //   element: <DynamicComponent Comp={OrderDetails} Fallback="Loader" />,
      // },
      // {
      //   path: addNewData.path,
      //   element: <DynamicComponent Comp={AddNewData} Fallback="Loader" />,
      // },
      // {
      //   path: userAddress.path,
      //   element: <DynamicComponent Comp={UserAddress} Fallback="Loader" />,
      // },
      // {
      //   path: userData.path,
      //   element: <DynamicComponent Comp={UserData} Fallback="Loader" />,
      // },
      // {
      //   path: dataDetails.path,
      //   element: <DynamicComponent Comp={DataDetails} Fallback="Loader" />,
      // },
      // {
      //   path: userCards.path,
      //   element: <DynamicComponent Comp={UserCards} Fallback="Loader" />,
      // },
      // {
      //   path: addNewCards.path,
      //   element: <DynamicComponent Comp={AddNewCards} Fallback="Loader" />,
      // },
      // {
      //   path: addNewAddress.path,
      //   element: <DynamicComponent Comp={AddNewAddress} Fallback="Loader" />,
      // },
    ],
  },
  // [PHASE1-HIDDEN] pocket wifi, router and sim layout route objects
  // {
    // path: pocketWifiLayout.path,
    // element: <DynamicComponent Comp={PocketWifiLayout} />,
    // children: [
      // {
        // path: pocketWifiRegion.path,
        // element: <DynamicComponent Comp={PocketWifiRegion} />,
      // },
      // {
        // path: pocketWifiPlan.path,
        // element: <DynamicComponent Comp={PocketWifiPlan} />,
      // },
      // {
        // path: pocketWifiCartService.path,
        // element: (
          // <DynamicComponent Comp={PocketWifiCartService} Fallback="Loader" />
        // ),
      // },
      // {
        // path: pocketWifiPlanSummery.path,
        // element: (
          // <DynamicComponent Comp={PocketWifiPlanSummery} Fallback="Loader" />
        // ),
      // },
      // {
        // path: pocketWifiShippingOption.path,
        // element: (
          // <DynamicComponent Comp={PocketWifiShippingOption} Fallback="Loader" />
        // ),
      // },
      // {
        // path: pocketWifiSelfPickup.path,
        // element: (
          // <DynamicComponent Comp={PocketWifiSelfPickup} Fallback="Loader" />
        // ),
      // },
      // {
        // path: pocketWifiOrderSummery.path,
        // element: (
          // <DynamicComponent Comp={PocketWifiOrderSummery} Fallback="Loader" />
        // ),
      // },
    // ],
  // },
  // {
    // path: routerLayout.path,
    // element: <DynamicComponent Comp={RouterLayout} />,
    // children: [
      // {
        // path: routerRegion.path,
        // element: <DynamicComponent Comp={RouterRegion} />,
      // },
      // {
        // path: routerPlan.path,
        // element: <DynamicComponent Comp={RouterPlan} />,
      // },
      // {
        // path: routerCartService.path,
        // element: (
          // <DynamicComponent Comp={RouterCartService} Fallback="Loader" />
        // ),
      // },
      // {
        // path: routerPlanSummery.path,
        // element: (
          // <DynamicComponent Comp={RouterPlanSummery} Fallback="Loader" />
        // ),
      // },
      // {
        // path: routerShippingOption.path,
        // element: (
          // <DynamicComponent Comp={RouterShippingOption} Fallback="Loader" />
        // ),
      // },
      // {
        // path: routerSelfPickup.path,
        // element: <DynamicComponent Comp={RouterSelfPickup} Fallback="Loader" />,
      // },
      // {
        // path: routerOrderSummery.path,
        // element: (
          // <DynamicComponent Comp={RouterOrderSummery} Fallback="Loader" />
        // ),
      // },
    // ],
  // },
  // {
    // path: simLayout.path,
    // element: <DynamicComponent Comp={SimLayout} />,
    // children: [
      // {
        // path: simRegion.path,
        // element: <DynamicComponent Comp={SimRegion} />,
      // },
      // {
        // path: simPlan.path,
        // element: <DynamicComponent Comp={SimPlan} />,
      // },
      // {
        // path: simCartService.path,
        // element: <DynamicComponent Comp={SimCartService} Fallback="Loader" />,
      // },
      // {
        // path: simPlanSummery.path,
        // element: <DynamicComponent Comp={SimPlanSummery} Fallback="Loader" />,
      // },
      // {
        // path: simShippingOption.path,
        // element: (
          // <DynamicComponent Comp={SimShippingOption} Fallback="Loader" />
        // ),
      // },
      // {
        // path: simSelfPickup.path,
        // element: <DynamicComponent Comp={SimSelfPickup} Fallback="Loader" />,
      // },
      // {
        // path: simOrderSummery.path,
        // element: <DynamicComponent Comp={SimOrderSummery} Fallback="Loader" />,
      // },
    // ],
  // },
  {
    path: userAccountLayout.path,
    element: <DynamicComponent Comp={UserAccountLayout} />,
    children: [
      // [PHASE1-HIDDEN] My Home
      // {
        // path: userHome.path,
        // element: <DynamicComponent Comp={UserHome} Fallback="Loader" />,
      // },
      {
        path: userProfile.path,
        element: <DynamicComponent Comp={UserProfile} Fallback="Loader" />,
      },
      {
        path: userOrder.path,
        element: <DynamicComponent Comp={UserOrder} Fallback="Loader" />,
      },
      // [PHASE1-HIDDEN] add new order
      // {
        // path: addNewOrder.path,
        // element: <DynamicComponent Comp={AddNewOrder} Fallback="Loader" />,
      // },
      {
        path: orderDetails.path,
        element: <DynamicComponent Comp={OrderDetails} Fallback="Loader" />,
      },
      // [PHASE1-HIDDEN] add new data + my address
      // {
        // path: addNewData.path,
        // element: <DynamicComponent Comp={AddNewData} Fallback="Loader" />,
      // },
      // {
        // path: userAddress.path,
        // element: <DynamicComponent Comp={UserAddress} Fallback="Loader" />,
      // },
      {
        path: userData.path,
        element: <DynamicComponent Comp={UserData} Fallback="Loader" />,
      },
      {
        path: dataDetails.path,
        element: <DynamicComponent Comp={DataDetails} Fallback="Loader" />,
      },
      // [PHASE1-HIDDEN] my cards, add new card, add new address, edit address
      // {
        // path: userCards.path,
        // element: <DynamicComponent Comp={UserCards} Fallback="Loader" />,
      // },
      // {
        // path: addNewCards.path,
        // element: <DynamicComponent Comp={AddNewCards} Fallback="Loader" />,
      // },
      // {
        // path: addNewAddress.path,
        // element: <DynamicComponent Comp={AddNewAddress} Fallback="Loader" />,
      // },
      // {
        // path: editAddress.path,
        // element: <DynamicComponent Comp={EditAddress} Fallback="Loader" />,
      // },
    ],
  },
];
