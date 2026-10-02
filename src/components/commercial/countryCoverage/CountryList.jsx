import AutoResizeText from "@/components/shared/AutoResizeText ";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { countries } from "@/general/Arrays";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { cn } from "@/lib/utils";
import { setCartData } from "@/store/module/cart/cartSlice";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const COUNTRY_SLUG_OVERRIDES = {
  KR: "southkorea",
  GB: "unitedkingdom",
  US: "unitedstates",
  AE: "uae",
  VA: "holysee",
  LA: "laos",
  MK: "northmacedonia",
  MO: "macao",
  CZ: "czechia",
};

const buildCountrySlug = (country) => {
  const iso2 = country?.iso2?.toUpperCase();
  if (iso2 && COUNTRY_SLUG_OVERRIDES[iso2]) {
    return COUNTRY_SLUG_OVERRIDES[iso2];
  }
  return (country?.name || country?.countryName || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
};

const CountryList = ({ query }) => {
  const { regionList } = useSelector((state) => state.country);
  const { cart } = useSelector((state) => state.cart);
  const { reactCountries } = cart;
  const [currentRegion, setCurrentRegion] = useState(regionList[0]);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentLanguage } = useUserLocationLanguage();

  const handleCountryChange = (country) => {
    dispatch(
      setCartData({ productCountry: country, countriesList: [country] }),
    );
  };

  // Set current region based on query
  useEffect(() => {
    if (query) {
      const region = regionList.find(
        (region) => region.value.toLowerCase() === query.toLowerCase(),
      );
      if (region) {
        setCurrentRegion(region);
      }
    }
  }, [query]);

  useEffect(() => {
    if (cart.reactCountries?.length === 0) {
      // dispatch(setCartData({ reactCountries: trasnlatedCountries }));
      const reactCountries = countries.map((cou) => ({
        ...cou,
        iso2: cou.countryCode,
        name: cou.countryName,
      }));
      dispatch(setCartData({ reactCountries: reactCountries }));

      // GetCountries()
      //   .then((res) => {
      //     dispatch(setCartData({ reactCountries: res }));
      //   })
      //   .catch((err) => console.log(err));
    }
  }, []);

  const coveredCountries = [
    "AL",
    "AD",
    "AM",
    "AU",
    "AT",
    "BH",
    "BD",
    "BE",
    "BA",
    "BN",
    "BG",
    "KH",
    "CA",
    "CN",
    "HR",
    "CY",
    "CZ",
    "DK",
    "EG",
    "EE",
    "FI",
    "FR",
    "GE",
    "DE",
    "GI",
    "GR",
    "GG",
    "HK",
    "HU",
    "IS",
    "IN",
    "ID",
    "IE",
    "IM",
    "IL",
    "IT",
    "JP",
    "JE",
    "JO",
    "KZ",
    "KW",
    "KG",
    "LA",
    "LV",
    "LI",
    "LT",
    "LU",
    "MO",
    "MK",
    "MY",
    "MT",
    "MX",
    "MC",
    "ME",
    "MA",
    "NP",
    "NL",
    "NZ",
    "NO",
    "OM",
    "PK",
    "PH",
    "PL",
    "PT",
    "QA",
    "RE",
    "RO",
    "SM",
    "SA",
    "RS",
    "SG",
    "SK",
    "SI",
    "ZA",
    "KR",
    "ES",
    "LK",
    "SE",
    "CH",
    "TW",
    "TJ",
    "TH",
    "TN",
    "TR",
    "AE",
    "UA",
    "GB",
    "US",
    "UZ",
    "VA",
    "VN",
    "AZ",
    "BY",
    "CW",
    "FO",
    "GF",
    "GP",
    "GY",
    "MQ",
    "MD",
    "MN",
    "YE",
  ];

  // useEffect(() => {
  //   console.log('reactCountries', reactCountries);
  //   console.log('newArray', newArray);
  //   console.log('iso', ISO.length);
  //   let array = []
  //   ISO.map(val => {
  //     if (!array.includes(val.toUpperCase())) {
  //       array.push(val)
  //     }
  //   })
  //   console.log('array', array);
  // }, []);

  // Filter countries by region
  // console.log("reactCountries", reactCountries);

  // Safety check: ensure reactCountries is an array before filtering
  const filteredCountries = (reactCountries || []).filter(
    (country) =>
      coveredCountries.includes(country.iso2) &&
      country.region.toLowerCase() === currentRegion.name.toLowerCase(),
  );

  return (
    <section className="containerX">
      <div className="sec_common_80 xl:!px-0">
        <SectionHeader
          heading={t("countryCoverage.sectionHeader.heading")}
          subHeading={t("countryCoverage.sectionHeader.subHeading")}
        />

        <div className="my-4 lg:my-15 flex bg-neutral-200 rounded-[14px] py-2 px-2 overflow-x-auto">
          {regionList.map((region, index) => (
            <button
              key={index}
              className={cn(
                "flex-1 transition-all duration-300 ease-in-out py-3 md:py-4 px-4 md:px-0 text-base",
                region.name === currentRegion.name
                  ? " text-white bg-main-600 rounded-[8px] font-semibold"
                  : "bg-neutral-200 text-neutral-700 font-normal",
              )}
              onClick={() => {
                setCurrentRegion(region);
              }}
            >
              <AutoResizeText maxLines={1}>
                {t(`countryCoverage.regionList.${region.index}.name`) ||
                  region.name}
              </AutoResizeText>
            </button>
          ))}
        </div>

        {filteredCountries.length < 1 ? (
          <p className="text-center text-neutral-700 text-sm lg:text-base">
            {t("extraText.noCountriesFoundInThisRegion")}
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-5">
            {filteredCountries.map((country, index) => (
              <Link
                to={`/internet-packages/${buildCountrySlug(country)}`}
                onClick={() => handleCountryChange(country)}
                key={index}
                className="p-3 bg-neutral-100 rounded-xl flex items-center justify-center cursor-pointer min-h-[68px]"
              >
                <p
                  className="text-sm lg:text-[18px] font-semibold text-center"
                  title={country?.translations?.[currentLanguage]}
                >
                  {/* {country.name} */}
                  {country?.translations?.[currentLanguage]}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CountryList;
