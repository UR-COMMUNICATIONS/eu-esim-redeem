import { countries } from "@/general/Arrays";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { cn } from "@/lib/utils";
import { SearchIcon } from "@/services";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const dropDownTypes = {
  country: "countryCode",
  phone: "dialCode",
};

const dropDownStyles = {
  white: {
    color: "",
    bgColor: "",
    textColor: "",
    listColor: "text-gray-400",
    iconColor: "#FFFFFF",
  },
  black: {
    color: "",
    bgColor: "",
    textColor: "",
    listColor: "text-gray-400",
    iconColor: "#000000",
  },
  grey: {
    color: "text-gray-400",
    bgColor: "#9CA3AF",
    textColor: "#9CA3AF",
    listColor: "text-gray-400",
    iconColor: "#9CA3AF",
  },
};

const CustomDropdown = ({
  disabled = false,
  defaultValue = null,
  defaultHeight = "h-[48px]",
  dropDownType = "country",
  dropDownStyle = "grey",
  placeHolder = "extraText.selectCountry",
  filteredCountries = [],
  onChange,
}) => {
  const { t } = useTranslation();

  const inputRef = useRef(null);
  const { currentLanguage } = useUserLocationLanguage();

  const type =
    dropDownTypes[dropDownType?.toLowerCase()] || dropDownTypes.country; //  setting type for drop down (country or phone )

  const style =
    dropDownStyles[dropDownStyle?.toLowerCase()] || dropDownStyles.grey; //  setting style for drop down default grey

  const countriesList =
    filteredCountries.length === 0
      ? countries
      : countries.filter((cou) => filteredCountries.includes(cou.countryCode));

  // const initialValue = {
  //     label: defaultValue?.countryName || defaultValue?.name || "",
  //     value: defaultValue?.countryCode || defaultValue?.iso2 || ""
  // }
  // console.log("countriesList", countriesList);

  const [isDropdown, setDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState({ label: "", value: "" });
  const [dropdownSuggestions, setDropdownSuggestions] = useState(countriesList);
  // const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // helper at top of your component
  const normalize = (str) => (str || "")?.toLowerCase()?.replace(/\s+/g, ""); // ?.replace(/[\s\.\-']/g, "");
  // searchTerm.label?.toLowerCase()?.replace(/\s+/g, "") || "";

  const handleSearch = (e) => {
    // console.log("e", e);
    // e.preventDefault();
    if (e.key === "Enter") {
      const trSearch = normalize(searchTerm.label);
      let countryObj = null;
      if (trSearch) {
        countryObj = countriesList.find((cou) =>
          [
            normalize(cou.translations?.[currentLanguage]),
            normalize(cou.countryName),
          ].some((attr) => attr.includes(trSearch)),
        );
      }
      if (countryObj) {
        setSearchTerm({
          ...searchTerm,
          label: countryObj.translations?.[currentLanguage] || countryObj.name,
          value: countryObj[type],
          // value: countryObj.countryCode,
        });

        onChange({
          ...countryObj,
          iso2: countryObj.countryCode,
          name: countryObj.countryName,
          isSearch: true, // directly call local plans api
        });
      }
      inputRef?.current?.blur();
      setDropdown(false);
    }
  };

  const handleDropdownSelect = (country) => {
    // const { countryCode } = country;
    // setHasUserInteracted(false); // Reset flag when selection is made
    setSearchTerm({
      label:
        country.translations?.[currentLanguage] ||
        country.countryName ||
        country.name,
      value: country[type],
      // value: countryCode,
    });
    onChange({
      ...country,
      iso2: country.countryCode,
      name: country.countryName,
      isSearch: false,
    });
    // inputRef?.current?.focus();
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    // setHasUserInteracted(true);
    setSearchTerm({ label: input, value: "" });

    if (input) {
      const suggestions = countriesList.filter((country) => {
        // Check translations if they exist
        if (country.translations) {
          const translationMatch = Object.values(country.translations).some(
            (translation) =>
              translation?.toLowerCase().includes(input?.toLowerCase()),
          );
          if (translationMatch) return true;
        }
        // Also check countryName and name as fallback
        return (
          country.countryName?.toLowerCase().includes(input?.toLowerCase()) ||
          country.name?.toLowerCase().includes(input?.toLowerCase())
        );
      });
      setDropdownSuggestions(suggestions);
    } else {
      setDropdownSuggestions(countriesList);
      onChange(null);
    }
  };

  const handleFocus = (e) => {
    setDropdownSuggestions(countriesList);
    setDropdown(true);
  };

  const handleBlur = (e) => {
    setDropdown(false);
  };

  useEffect(() => {
    // Only update from defaultValue if user hasn't started typing
    // if (!hasUserInteracted) {
      if (defaultValue) {
        setSearchTerm({
          // label: defaultValue?.countryName || defaultValue?.name || "",
          label:
            defaultValue.translations?.[currentLanguage] ||
            defaultValue?.countryName ||
            defaultValue?.name ||
            "",
          value: defaultValue?.countryCode || defaultValue?.iso2 || "",
        });
      } else {
        setSearchTerm({
          label: "",
          value: "",
        });
      }
    // }
  }, [defaultValue, currentLanguage]);

  return (
    <div className="flex-1 relative md:mt-0">
      {/* <form onSubmit={handleSearch} className="relative"> */}
      <div className="relative w-full">
        <SearchIcon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6"
          color={style.iconColor}
        />
        <input
          id="searchCountry"
          ref={inputRef}
          type="text"
          value={searchTerm.label}
          onKeyDown={handleSearch}
          // onKeyDown={(e) => {
          //     if (e.key === "Enter") {
          //         console.log("Enter pressed!");
          //         handleSearch(e);
          //     }
          // }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleInputChange}
          placeholder={t(placeHolder)}
          // className="h-[48px] w-full bg-neutral-50 border border-neutral-300 rounded-xl pl-10 pr-4 text-sm md:text-base outline-none placeholder-gray-400 text-gray-500"
          className={cn(
            defaultHeight,
            "w-full bg-neutral-50 border border-neutral-300 rounded-xl pl-10 pr-4 text-sm md:text-base font-medium outline-none placeholder-gray-400 text-gray-500",
          )}
          disabled={disabled}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        //bg-black
        //     className={`h-[48px] w-full bg-black border border-white rounded-xl pl-10 pr-4 text-sm md:text-base outline-none placeholder-white text-white"
        // ${searchTerm.value ? "text-white bg-black" : "text-black"}`}
        />
      </div>
      {isDropdown && (
        <div className="absolute w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto z-10">
          {dropdownSuggestions.map((suggestion, index) => (
            <div
              key={index}
              onMouseDown={() => handleDropdownSelect(suggestion)}
              className="flex items-center cursor-pointer px-4 py-0 hover:bg-gray-100"
            >
              <span className="flag-dropdown pr-2 w-8 h-8 text-2xl">
                {suggestion?.emoji || ""}
              </span>
              <span className="font-semibold text-[14px] text-gray-500">
                {suggestion.translations?.[currentLanguage] ||
                  suggestion.countryName ||
                  suggestion.name}
              </span>
              {type === "dialCode" && (
                <span className="font-semibold text-[14px] pl-2 text-gray-400">
                  {suggestion.dialCode}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
      {/* </form> */}
    </div>
  );
};

export default CustomDropdown;
