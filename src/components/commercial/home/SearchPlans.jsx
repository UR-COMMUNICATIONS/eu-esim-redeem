import DatePicker from "@/components/shared/others/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dateExternal, orignalFormat } from "@/general";
import { countries } from "@/general/Arrays";
import useDynamicImports from "@/hooks/useDynamicImports";
import useLocalPlan from "@/hooks/useLocalPlan";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { setCartData } from "@/store/module/cart/cartSlice";
import { Suspense } from "react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import CountryNote from "./CountryNote";
import { useEffect } from "react";


function SearchPlans({ filterPackages }) {
    const { cart } = useSelector((state) => state.cart);
    // const [isDropdown, setDropdown] = useState(false);
    const [promoCode, setpromoCode] = useState(cart?.promoCode);
    const [searchTerm, setSearchTerm] = useState({ label: "", value: "" });
    const [dropdownSuggestions, setDropdownSuggestions] = useState([]);

    const { currentLanguage, defaultProduct } = useUserLocationLanguage();
    const { fetchLocalPlans, process } = useLocalPlan();

    const datas = [
        { _id: 0, name: "All", value: "A" },
        { _id: 1, name: "Pocket Wifi", value: "D" },
        { _id: 2, name: "Sim", value: "S" },
        { _id: 3, name: "eSim", value: "E" },
    ];
    const [selected, setSelected] = useState(defaultProduct);
    // const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { t } = useTranslation(["translation", "english", "local"]);
    const inputRef = useRef(null);
    const [travel, setTravel] = useState({
        startDate: null, // new Date(),
        endDate: null, // new Date(),
    });

    const handleInputChange = (e) => {
        const input = e.target.value;
        setSearchTerm({ ...searchTerm, label: input, value: '' });
        if (input) {
            // const suggestions = countries.filter((cou) =>
            //   [cou.countryName, cou.trCountryName]
            //     .some(attr => attr?.toLowerCase()?.includes(input?.toLowerCase()))
            // );
            const suggestions = countries.filter((country) =>
                // Get an array of all translation strings from the "translations" object
                Object.values(country.translations).some((translation) =>
                    translation?.toLowerCase().includes(input?.toLowerCase())
                )
            );

            setDropdownSuggestions(suggestions);
        } else {
            setDropdownSuggestions([]);
        }
    };

    const handlePromoCode = (e) => {
        // console.log("e.target.value", e.target.value);
        setpromoCode(e.target.value);
    };

    const handleDropdownSelect = (country) => {
        // Set searchTerm to selected country and clear dropdown suggestions
        setDropdown(true);
        const { countryName, countryCode } = country;
        // setSearchTerm({ label: countryName, value: countryCode });
        setSearchTerm({
            label: country.translations[currentLanguage],
            value: countryCode,
        });
        const countryObj = cart?.reactCountries.find(
            (cou) => cou.iso2 === countryCode
        );
        dispatch(
            setCartData({ productCountry: countryObj, countriesList: [countryObj] })
        );
        setDropdownSuggestions([]);
        inputRef?.current?.focus();
    };

    // helper at top of your component
    const normalize = (str) => (str || "")?.toLowerCase()?.replace(/\s+/g, "") // ?.replace(/[\s\.\-']/g, "");

    // searchTerm.label?.toLowerCase()?.replace(/\s+/g, "") || "";


    const handleSearch = (e) => {
        e.preventDefault();
        // Filter packages based on search term
        let travelCountry = cart.productCountry?.iso2;
        const trSearch = normalize(searchTerm.label);
        // console.log("trSearch", trSearch);
        let trCountry = null;
        if (trSearch) {
            trCountry = countries.find((cou) =>
                [
                    normalize(cou.translations[currentLanguage]),
                    normalize(cou.countryName)
                ].some((attr) => attr.includes(trSearch))
            );
        }
        // console.log("trCountry", trCountry);
        const countryObj = cart?.reactCountries.find(
            // (cou) => normalize(cou.name) === normalize(trCountry?.countryName)
            (cou) => normalize(cou.iso2) === normalize(trCountry?.countryCode)
        );
        // console.log("countryObj", countryObj);
        if (countryObj) {
            travelCountry = countryObj.iso2;
            setSearchTerm({
                ...searchTerm,
                label: countryObj.translations[currentLanguage] || countryObj.name,
                value: countryObj.iso2,
            });
            dispatch(
                setCartData({
                    productCountry: countryObj,
                    countriesList: [countryObj],
                })
            );
            fetchLocalPlans(promoCode, travelCountry);
        } else {
            travelCountry = "";
        }

        dispatch(
            setCartData({
                promoCode: promoCode,
                travelDetails: [{
                    locationCode: cart?.productCountry?.iso2,
                    travelLocation: cart?.productCountry?.name,
                    startDate: travel.startDate,
                    endDate: travel.endDate
                }],
            })
        );

        // const results = packages.filter((pkg) => pkg.country.toLowerCase().includes(searchTerm.toLowerCase()));
        // setFilteredPackages(results);
        setDropdown(false);
        setDropdownSuggestions([]);
    };

    const handleDates = (date, idx) => {
        try {
            if (date) {
                let formattedDate = dateExternal(date);
                let newTravel = { ...travel };
                let startDate = newTravel["startDate"];
                let endDate = newTravel["endDate"];
                if (!startDate || (startDate && endDate)) {
                    if (formattedDate <= endDate || !endDate) {
                        newTravel = {
                            ...newTravel,
                            startDate: formattedDate,
                            endDate: null,
                        };
                    } else {
                        newTravel = {
                            ...newTravel,
                            startDate: formattedDate,
                            endDate: null,
                        };
                    }
                } else if (startDate && !endDate) {
                    if (formattedDate >= startDate || !startDate) {
                        newTravel["endDate"] = formattedDate;
                    } else {
                        newTravel = {
                            ...newTravel,
                            startDate: formattedDate,
                            endDate: null,
                        };
                    }
                }
                setTravel(newTravel);
            }
        } catch (e) {
            console.log("EXCEPTION", e);
        }
    };

    const path =
        "&/countries/{currentCountry}/src/components/commercial/home/AnnexCountryNote.jsx";
    const AnnexCountryNote_Dynamic = useDynamicImports(path);


    useEffect(() => {
        // setProcess({ isProcessing: true });
        // const timer = setTimeout(() => {
        console.log("processss", process);
        // setProcess({
        //   isProcessing: process.isProcessing,
        //   isSuccess: process.isSuccess,
        //   alertType: process.alertType,
        //   title: process.title,
        //   alertMessage: process.alertMessage,
        // });
        // }, 3000);
        // return () => clearTimeout(timer);
    }, [process]);

    return (
        <div
            className={`px-4 mt-10 mb-5 rounded-[16px] 
            ${filterPackages ? "w-full bg-[#EEEEEE] border-[#EEEEEE] md:px-20 " : "max-w-[800px] w-full bg-white border-[#EEEEEE]"}`}
        >
            <div className="md:flex flex-wrap items-center gap-4 w-full  mt-6 lg:mt-10 mb-2 ">
                <div className="flex-1 relative md:mt-0 mt-2">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            id="searchCountry"
                            ref={inputRef}
                            type="text"
                            value={searchTerm.label}
                            onChange={handleInputChange}
                            placeholder={t("internetPackages.searchPlaceholder")}
                            className={`h-[48px] w-full bg-neutral-100 border border-neutral-300 rounded-xl px-4 text-sm md:text-base outline-none !placeholder-gray-400
                            ${filterPackages ? "bg-white" : "bg-neutral-100"}`}
                        />
                        {dropdownSuggestions.length > 0 && (
                            <div className="absolute w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto z-10">
                                {dropdownSuggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleDropdownSelect(suggestion)}
                                        className="flex items-center cursor-pointer px-4 py-2 hover:bg-gray-100"
                                    >
                                        <span>{suggestion.translations[currentLanguage]}</span>
                                        {/* <span>{suggestion.countryName}</span> */}
                                    </div>
                                ))}
                            </div>
                        )}
                    </form>
                </div>
                <div className="flex-1 md:mt-0 mt-2">
                    <Input
                        name="promoCode"
                        placeholder={t("pocketWifiRegion.form.fields.1.placeholder")}
                        required
                        onChange={handlePromoCode}
                        defaultValue={promoCode}
                        className={`bg-neutral-100 border border-neutral-300 h-[48px] !placeholder-gray-400
                        ${filterPackages ? "bg-white" : "bg-neutral-100"}`}
                        // disabled={promoCode == 'SKYTICKET' ? true : false}
                        // disabled={promoCode === "SKYTICKET" || cart.annex}
                        disabled={cart.annex ? true : false}
                    />
                </div>
            </div>
            <div className="md:flex items-center w-full gap-2 mb-8">
                <div className="md:flex w-full relative">
                    <DatePicker
                        date={{
                            from: orignalFormat(travel.startDate),
                            to: orignalFormat(travel.endDate),
                        }}
                        value={travel.startDate}
                        setDate={(date) => handleDates(date, "startDate")}
                        wrapper="flex flex-1 items-start gap-2 md:mt-0 mt-2"
                        radius={`md:!rounded-tr-none md:!rounded-br-none
                        ${filterPackages ? "bg-white" : "bg-neutral-100"}`}
                        isHideLabel={true}
                        label={t("form.startDate")}
                        placeholderColor="text-gray-400 font-medium"
                    // disabled={{ before: new Date() }}
                    />
                    <DatePicker
                        date={{
                            from: orignalFormat(travel.startDate),
                            to: orignalFormat(travel.endDate),
                        }}
                        value={travel.endDate}
                        setDate={(date) => handleDates(date, "endDate")}
                        wrapper="flex flex-1 items-start gap-2 md:mt-0 mt-2"
                        radius={`md:!rounded-tl-none md:!rounded-bl-none
                        ${filterPackages ? "bg-white" : "bg-neutral-100"}`}
                        isHideLabel={true}
                        label={t("form.endDate")}
                        placeholderColor="text-gray-400 font-medium"
                    // placeholderColor="text-gray-300"
                    // disabled={{ before: new Date() }}
                    />
                </div>

                <div className="w-full flex-1">
                    <Button
                        onClick={handleSearch}
                        className={"font-medium text-sm h-[48px] w-full md:mt-0 mt-2"}
                        size={"sm"}
                        type="submit"
                        // disabled={handleDisable}
                        disabled={searchTerm?.value ? false : true}
                    >
                        {" "}
                        {t("buttonText.searchPlans")}
                    </Button>
                </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                {AnnexCountryNote_Dynamic ? <AnnexCountryNote_Dynamic /> : <CountryNote />}
            </Suspense>
        </div>
    );
}

export default SearchPlans;
