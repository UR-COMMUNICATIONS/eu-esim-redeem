import useModal from "@/hooks/useModal";
import { cn, countriesBasedData } from "@/lib/utils";
// [PHASE1-HIDDEN] corporateRoutes (CORPORATE footer column)
// import { commercialRoutes, corporateRoutes, validateEmail } from "@/services";
import { commercialRoutes, validateEmail } from "@/services";
import { ChevronRight } from "lucide-react";
import { Suspense, memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useDynamicImages from "@/hooks/useDynamicImages";
import useDynamicImports from "@/hooks/useDynamicImports";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";

const Footer = () => {
  const { setAppDownloadDialogOpen } = useModal();
  const { cart } = useSelector((state) => state.cart);
  const {
    currentCountry,
    isTargetCountry,
    supportEmail,
    supportPhone,
    WhatsappLink,
    supportimage,
    nameSpace,
  } = useUserLocationLanguage();
  const path =
    "&/countries/{currentCountry}/src/components/shared/navigation/FooterLogo.jsx";
  const { t } = useTranslation(["translation", "english", "local"]);
  const FooterLogo_Dynamic = useDynamicImports(path);

  const emailImage = useDynamicImages("others", "email");
  const targetCountry = isTargetCountry ? currentCountry : "sg";
  const { hideNavbarItems } = countriesBasedData[targetCountry];

  const footerData = {
    contact: [
      {
        type: "Call",
        value: supportPhone,
        image: supportimage,
      },
      {
        image: emailImage,
        type: "Mail",
        value: supportEmail,
      },
    ],
    legals: [
      { title: "Terms of use", path: commercialRoutes.termsService.path },
      { title: "Privacy policy", path: commercialRoutes.privacyPolicy.path },
      // [PHASE1-HIDDEN] money back guarantee page
      // {
      //   title: "Money Back Guarantee",
      //   path: commercialRoutes.moneyBackGuarantee.path,
      // },
    ],
    menuData: [
      {
        title: "YOOWIFI",
        links: [
          // [PHASE1-HIDDEN] About Us + FAQ pages
          // { label: "About Us", path: commercialRoutes.aboutUs.path },
          // { label: "FAQ", path: commercialRoutes.faq.path },
          {
            tIndex: 2,
            label: "Download the app",
            path: () => setAppDownloadDialogOpen(true),
          },
          // [PHASE1-HIDDEN] Contact Us page
          // { label: "Contact Us", path: commercialRoutes.contact.path },
          {
            tIndex: 4,
            label: "Terms of service",
            path: commercialRoutes.termsService.path,
          },
          {
            tIndex: 5,
            label: "Privacy Policy",
            path: commercialRoutes.privacyPolicy.path,
          },
          // [PHASE1-HIDDEN] money back guarantee page
          // {
          //   label: "Money Back Guarantee",
          //   path: commercialRoutes.moneyBackGuarantee.path,
          // },
        ],
      },
      // [PHASE1-HIDDEN] FOR YOO column (travel data, country coverage, pickup/drop off, products, how it works) + CORPORATE column (corpRoutes are hidden)
      // {
        // title: "FOR YOO",
        // links: [
          // {
            // label: "Travel Data",
            // path: commercialRoutes.pocketWifiDetails.path,
          // },
          // {
            // label: "Country Coverage",
            // path: commercialRoutes.countryCoverage.path,
          // },
          // // { label: "Local Data", path: "https://yoowifi.com/for-yoo/local-data/" },
          // {
            // label: "Pickup /drop off locations",
            // path: commercialRoutes.pickDropLocation.path,
          // },
          // { label: "Products", path: commercialRoutes.countryCoverage.path },
          // { label: "How it works", path: commercialRoutes.howItWorks.path },
        // ],
      // },
      // {
        // title: "CORPORATE",
        // links: [
          // {
            // label: "Business & White label",
            // path: corporateRoutes.business.path,
          // },
          // { label: "Hotel", path: corporateRoutes.hotel.path },
          // { label: "Travel Agency", path: corporateRoutes.travelAgency.path },
          // {
            // label: "Maritime Internet",
            // path: corporateRoutes.maritimeInternet.path,
          // },
          // {
            // label: "Offices/Roadshow & Events",
            // path: corporateRoutes.events.path,
          // },
        // ],
      // },
    ],
  };

  const [userEmail, setUserEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // console.log('cookies', Cookies.get("i18next"));
  // console.log('countryOptions', countryOptions[cart.userCountry?.country]);

  // const currentLanguage = countryOptions[cart.userCountry?.country] || Cookies.get("i18next");
  // const currentLanguage = Cookies.get("i18next");
  // const currentLanguage = sessionStorage.getItem('i18next')?.toUpperCase();
  // const currentCountry = cart.userCountry?.country?.toUpperCase();
  // const isJapanCountry = (currentCountry === 'JP' && (currentLanguage === 'EN' || currentLanguage === 'JP'))
  // console.log('currentLanguage', currentLanguage);

  // const [lang, setLang] = useState(currentLanguage);

  // const handleLanguageChange = (language) => {
  //   sessionStorage.setItem('i18next', language)
  //   setLang(language);
  //   i18next.changeLanguage(language);
  // };

  // useEffect(() => {
  //   console.log('inside footer useefect', cart.userCountry?.country);
  //   if (cart.userCountry?.country) {
  //     console.log('inside footer language', cart.userCountry?.country);
  //     setLang(countryOptions[cart.userCountry?.country]);
  //     i18next.changeLanguage(countryOptions[cart.userCountry?.country]);
  //   }
  // }, [cart.userCountry?.country]);

  // useEffect(() => {
  //   setLang(currentLanguage);
  //   i18next.changeLanguage(currentLanguage);
  // }, [cart.userCountry?.country]);

  useEffect(() => {
    setIsButtonDisabled(!validateEmail(userEmail));
  }, [userEmail]);

  return (
    <footer className="bg-black">
      <div className="container2X sec_common_80 xl:px-0 grid grid-cols-1 md:grid-cols-10 gap-10 md:gap-20">
        {/* CONTACT/LOGO */}
        <div className="col-span-1 md:col-span-5 min-[1320px]:col-span-4">
          {/* {isTargetCountry ?
            <LazyLoadImage
              src={images.footerLogoJp}
              alt="logo"
              title="logo"
              className="md:h-[95px] w-auto"
            />
            :
            <LazyLoadImage
              src={useDynamicImages("others", "red-logo")}
              title="logo"
              alt="logo"
              className="h-[71px] w-auto"
            />
          } */}
          <Suspense fallback={<div>Loading...</div>}>
            {FooterLogo_Dynamic ? <FooterLogo_Dynamic /> : null}
          </Suspense>
          {/* <footer>
            {footerData.contact.map(({ value, image }, index) => (
              <p
                key={index}
                className="flex items-center gap-2 mt-4 md:mt-6 text-base md:text-lg !leading-[1.4]"
              >
                <img
                  src={image}
                  alt={`Contact icon`}
                  className="w-[34px] h-[34px] md:w-[64px] md:h-[64px] object-contain"
                />
                <span className="text-white font-semibold">{value}</span>
              </p>
            ))}
          </footer> */}
          <footer>
            {footerData.contact.map(({ value, image, type }, index) => (
              <p
                key={index}
                className="flex items-center gap-2 mt-4 md:mt-6 text-base md:text-lg !leading-[1.4]"
              >
                {type === "Call" ? (
                  <a
                    href={WhatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <img
                      src={image}
                      alt={`${type} icon`}
                      title={`${type} icon`}
                      className="w-[34px] h-[34px] md:w-[64px] md:h-[64px] object-contain"
                    />
                    <span className="text-white font-semibold">{value}</span>
                  </a>
                ) : type === "Mail" ? (
                  <a
                    href={`mailto:${value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <img
                      src={image}
                      alt={`${type} icon`}
                      title={`${type} icon`}
                      className="w-[34px] h-[34px] md:w-[64px] md:h-[64px] object-contain"
                    />
                    <span className="text-white font-semibold">{value}</span>
                  </a>
                ) : (
                  <span className="text-white font-semibold">{value}</span>
                )}
              </p>
            ))}
          </footer>

          <p className="text-lg md:text-2xl text-secondary-500 font-semibold !leading-[1.4] mt-5 md:mt-8">
            {t("footer.subscribeNewsLetter")}
          </p>

          <div className="flex items-center bg-neutral-900 rounded-[8px] md:rounded-[20px] p-2 shadow-md mt-3 md:mt-4 border border-neutral-800 max-w-[348px]">
            <input
              type="email"
              placeholder="Eg: email@address.com"
              className="text-sm md:text-base bg-transparent text-white placeholder-black-600 focus:outline-none w-full px-4 font-semibold"
              onChange={(e) => setUserEmail(e.target.value)}
              value={userEmail}
              required
            />
            <button
              type="button"
              className={cn(
                "h-8 w-8 md:h-[52px] md:w-[52px] shrink-0 bg-main-600 text-white rounded-[8px] md:rounded-2xl p-2 flex items-center justify-center ml-2",
                isButtonDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-red-500",
              )}
              onClick={() => setUserEmail("")}
              disabled={isButtonDisabled}
              aria-label="Setuser"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* ESSENTIAL LINKS */}
        {footerData.menuData
          .filter(
            ({ title }) =>
              !(hideNavbarItems.includes("corporate") && title === "CORPORATE"),
          )
          .map(({ title, links }, menuIndex) => (
            <div
              key={menuIndex}
              className="col-span-1 md:col-span-5 min-[1320px]:col-span-2 shrink-0"
            >
              <h3 className="text-base md:text-lg text-main-600 font-bold uppercase !leading-[1.4]">
                {t(`footer.menuData.${menuIndex}.title`)}
              </h3>
              <ul className="mt-4 md:mt-6">
                {links.map(({ path, label, tIndex }, index) => {
                  // [PHASE1-HIDDEN] tIndex keeps a kept link pointing at its
                  // original footer.menuData[].links[] translation slot.
                  const labelIndex = tIndex ?? index;
                  const translatedLabel =
                    t(
                      `${nameSpace}:footer.menuData.${menuIndex}.links.${labelIndex}.label`,
                    ) ||
                    t(
                      `footer.menuData.${menuIndex}.links.${labelIndex}.label`,
                    ) ||
                    label;
                  if (!translatedLabel) return null;
                  return (
                    <li
                      key={index}
                      className="text-sm md:text-base text-black-100 font-semibold !leading-[1.2] hover:opacity-70 mt-3 md:mt-6 lg:mt-8 whitespace-normal"
                    >
                      {typeof path === "string" ? (
                        <Link to={path}>{translatedLabel}</Link>
                      ) : (
                        <button
                          className="text-left text-sm md:text-base text-black-100 font-semibold"
                          onClick={() => path()}
                        >
                          {translatedLabel}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
      </div>

      <div className="container2X sec_common_40 lg:px-4 flex flex-col md:flex-row gap-2 justify-between md:items-center">
        <p className="text-sm md:text-base text-white !leading-[1.4]">
          ©2024 <span className="font-semibold">Yoowifi</span>.{" "}
          {t("footer.copyRightText")}
        </p>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
          {/* <Select value={lang} onValueChange={handleLanguageChange} defaultValue={lang}>
            <SelectTrigger className="w-[180px] bg-main-20">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map(({ _id, label, value, flag }) => (
                <SelectItem
                  key={_id}
                  value={value}
                  className={"flex flex-row gap-1 items-center"}
                >
                  <img
                    src={flag()}
                    alt={label}
                    className="w-8 h-auto inline-block"
                  />{" "}
                  <span>{label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}

          <div className="flex flex-wrap gap-4 md:gap-8">
            {footerData.legals.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-sm md:text-base text-white !leading-[1.4] hover:opacity-70"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
