import InternetPackageCard from "@/components/shared/cards/InternetPackageCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PLAN_TYPES_MAPPING } from "@/constants/planTypes";
import { useDisApi, orignalFormat, dateExternal } from "@/general";
import { filterPlans } from "@/general/common.funcitons";
import { cn } from "@/lib/utils";
import { CloseIcon, FilterIcon, HorizontalLineIcon } from "@/services";
import { setCartData } from "@/store/module/cart/cartSlice";
import { setLocalPlans } from "@/store/module/plan/planSlice";
import { t } from "i18next";
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/shared/others/DatePicker";
import { countries } from "@/general/Arrays";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import useLocalPlan from "@/hooks/useLocalPlan";
import Loader from "@/components/shared/Loader";
import SearchPlans from "../home/SearchPlans";
import CustomDropdown from "@/components/shared/CustomDropdown";

const PackageFilterList = ({ params }) => {
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const { currentCountry, isTargetCountry, hideProductFilter, defaultProduct } =
    useUserLocationLanguage();

  const { localPlans } = useSelector((state) => state.plan);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(defaultProduct);
  const [selectedPlan, setSelectedPlan] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [plans, setPlans] = useState(filterPlans(localPlans));
  const [promoCode, setpromoCode] = useState(cart?.promoCode);
  const { currentLanguage } = useUserLocationLanguage();

  const [isSearchDisabled, setSearchDisable] = useState(true);
  const [callOnce, setOnce] = useState(true);

  const countryRef = useRef(null);
  const inputRef = useRef(null);
  const [travel, setTravel] = useState({
    startDate: null, // new Date(),
    endDate: null, // new Date(),
  });
  // const [process, setProcess] = useState({
  //   title: "",
  //   alertMessage: "",
  //   alertType: "",
  //   isProcessing: false,
  //   isSuccess: false,
  // });
  const [selected, setSelected] = useState(["A"]);
  const datas = [
    { _id: 0, name: "All", value: "A" },
    { _id: 1, name: "Pocket Wifi", value: "D" },
    { _id: 2, name: "Sim", value: "S" },
    { _id: 3, name: "eSim", value: "E" },
  ];

  const { process, fetchLocalPlans } = useLocalPlan();

  const toggleButton = (paramName, setSelected) => {
    setSelectedProduct((prevSelected) =>
      prevSelected.includes(paramName) ? [] : [paramName],
    );
  };

  const dispatch = useDispatch();

  const { t } = useTranslation();

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
      (cou) => cou.iso2 === countryCode,
    );
    dispatch(
      setCartData({ productCountry: countryObj, countriesList: [countryObj] }),
    );
    setDropdownSuggestions([]);
    inputRef?.current?.focus();
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
      // console.log("EXCEPTION", e);
    }
  };

  useEffect(() => {
    // console.log("DATES", travel);
  }, [travel]);

  // Set the selected regions and countries based on the query parameters
  useEffect(() => {
    if (params.regionQuery) {
      setSelectedRegions([params.regionQuery]);
    }
    if (params.countryQuery) {
      setSelectedCountries([params.countryQuery]);
    }
  }, [params.regionQuery, params.countryQuery]);

  // Reset the current page whenever the filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedRegions,
    selectedCountries,
    selectedProduct,
    selectedPlan,
    searchText,
  ]);

  useEffect(() => {
    setPlans(filterPlans(localPlans));
  }, [localPlans]);

  useEffect(() => {
    setSearchDisable(false);

    // if (cart?.productCountry?.countryCode && callOnce) {
    if (
      cart?.productCountry?.countryCode &&
      cart?.productCountry?.isCallPlans
    ) {
      handleSearch(cart?.productCountry);
      // setOnce(false);
      // fetchLocalPlans(promoCode, cart?.productCountry?.countryCode)
    }
  }, [cart.userCountry, cart.productCountry]);

  // Filter plans based on searchText, selectedRegions, selectedCountries, selectedProduct, and selectedPlan
  const filteredPackages = plans.filter((pkg) => {
    // Check if any filter is active
    const isAnyFilterActive =
      selectedRegions.length > 0 ||
      selectedCountries.length > 0 ||
      selectedProduct.length > 0 ||
      selectedPlan.length > 0 ||
      searchText !== "";
    if (!isAnyFilterActive) return true;

    // At least one filter is active, apply all filters

    // const filteredData = data.filter(row =>
    //   columns.some(column =>
    //     String(row[column.dataField]).toLowerCase().includes(searchTerm.toLowerCase())
    //   )
    // );
    let planTypesArray = [];
    selectedPlan.map((val) => {
      planTypesArray = planTypesArray.concat(PLAN_TYPES_MAPPING[val]);
    });
    const matchesSearchText =
      searchText === "" ||
      pkg?.planNameText?.toLowerCase()?.includes(searchText.toLowerCase());
    const matchesRegion =
      selectedRegions.length === 0 || selectedRegions.includes(pkg?.region);
    const matchesCountry =
      selectedCountries.length === 0 ||
      selectedCountries.includes(pkg?.country);
    const matchesProduct =
      selectedProduct.length === 0 ||
        selectedProduct.includes(pkg?.deviceType) ||
        selectedProduct[0] === "A"
        ? pkg
        : null;
    const matchesPlan =
      selectedPlan.length === 0 || planTypesArray.includes(pkg?.planType);

    // Return true only if all active filter conditions are met
    return (
      matchesSearchText &&
      matchesRegion &&
      matchesCountry &&
      matchesProduct &&
      matchesPlan
    );
  });

  // Paginate the plans
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const paginatedPackages = filteredPackages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const toggleFilterDrawer = () => setIsFilterOpen(!isFilterOpen);

  const handleSearch = (e) => {
    let countryObj = null;
    if (e?.target) {
      e.preventDefault();
      countryObj = countryRef?.current || cart?.productCountry;
    } else {
      countryObj = e;
    }
    const travelCountry = countryObj?.countryCode;
    fetchLocalPlans(promoCode, travelCountry);
    dispatch(
      setCartData({
        promoCode: promoCode,
        travelDetails: [
          {
            locationCode: countryObj?.countryCode,
            travelLocation: countryObj?.countryName,
            startDate: travel.startDate,
            endDate: travel.endDate,
          },
        ],
      }),
    );
  };

  const handleCountryChange = (countryObj) => {
    countryRef.current = countryObj;
    if (countryObj) {
      const { isSearch } = countryObj;
      countryObj.isCallPlans = false;
      dispatch(
        setCartData({
          productCountry: countryObj,
          countriesList: [countryObj],
        }),
      );
      if (isSearch) {
        handleSearch(countryObj);
      }
      setSearchDisable(false);
    } else {
      setSearchDisable(true);
    }
  };

  return (
    <section className="containerX">
      <div className="sec_common_80 xl:!px-0">
        <SectionHeader
          heading={t("internetPackages.sectionHeading")}
          subHeading={t("countryCoverage.sectionHeader.subHeading")}
        />
        <div className="bg-[#EEEEEE] border-[#EEEEEE] md:px-20 px-4 py-2 w-full mt-10 mb-5 rounded-[16px]">
          <div className="md:flex flex-wrap items-center gap-4 w-full  mt-6 lg:mt-10 mb-2 ">
            <div className="flex-1 relative md:mt-0 mt-2">
              {/* <form onSubmit={handleSearch} className="relative">
                <input
                  id="searchCountry"
                  ref={inputRef}
                  type="text"
                  value={searchTerm.label}
                  onChange={handleInputChange}
                  placeholder={t("internetPackages.searchPlaceholder")}
                  className="h-[48px] w-full bg-white border border-neutral-300 rounded-xl px-4 text-sm md:text-base outline-none !placeholder-gray-400"
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
                      </div>
                    ))}
                  </div>
                )}
              </form> */}
              <CustomDropdown
                defaultValue={cart?.productCountry}
                onChange={handleCountryChange}
              />
            </div>
            <div className="flex-1 md:mt-0 mt-2">
              <Input
                name="promoCode"
                placeholder={t("pocketWifiRegion.form.fields.1.placeholder")}
                required
                onChange={handlePromoCode}
                defaultValue={promoCode}
                className="bg-neutral-50 border border-neutral-300 h-[48px] !placeholder-gray-400"
                // disabled={promoCode == 'SKYTICKET' ? true : false}
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
                radius="md:!rounded-tr-none md:!rounded-br-none"
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
                radius="md:!rounded-tl-none md:!rounded-bl-none"
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
                // disabled={searchTerm?.value ? false : true}
                disabled={isSearchDisabled}
              >
                {" "}
                {t("buttonText.searchPlans")}
              </Button>
            </div>
          </div>
        </div>
        {/* <div className="containerX flex_center flex-col">
          <SearchPlans
            filterPackages={true}
          />
        </div> */}
        {!isTargetCountry && (
          <div className="flex gap-2 mb-8 justify-center">
            {t("datas", { returnObjects: true })
              .filter((item) => !hideProductFilter.includes(item.value))
              .map((data, index) => (
                <button
                  key={data._id}
                  className={`px-4 py-2 md:px-[42px] md:py-[10px] rounded-lg text-sm ${selectedProduct.includes(data.value)
                    ? "bg-[#FFC400] text-white"
                    : "bg-gray-200 text-black"
                    }`}
                  onClick={() => toggleButton(data.value)}
                >
                  {data.name}
                  {/* {t(`datas.${index}.name`)} */}
                </button>
              ))}
          </div>
        )}
        {/* mobile searbox & filter active menu */}
        <div className="my-4 flex gap-2 lg:hidden">
          <SearchBox searchText={searchText} setSearchText={setSearchText} />

          <button
            className="shrink-0 w-11 h-11 flex justify-center items-center border boder-[#E0E0E0] rounded-lg"
            onClick={toggleFilterDrawer}
          >
            <FilterIcon />
          </button>
        </div>
        <div
          className={cn(
            isFilterOpen ? "translate-x-0" : "translate-x-full",
            "fixed top-0 right-0 w-full max-w-[250px] lg:max-w-[350px] bg-white shadow z-50 transform transition-transform duration-500 ease-in-out h-full overflow-y-auto lg:hidden",
          )}
        >
          <FilterSidebar
            selectedRegions={selectedRegions}
            setSelectedRegions={setSelectedRegions}
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <button
            onClick={toggleFilterDrawer}
            className="absolute top-4 right-4 text-black"
          >
            <CloseIcon color="#191919" className="w-5 h-5" />
          </button>
        </div>

        {/* end mobile sidebar */}

        {/* main part */}

        {process.isProcessing ? (
          <div className="flex flex-col gap-6">
            <Loader
              type="Oval"
              color="white"
              height={"18vw"}
              width={"18vw"}
              className="max-h-[100px] max-w-[100px] min-h-[60px] min-w-[60px]"
              wrapperStyle={{
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </div>
        ) : paginatedPackages.length > 0 ? (
          <div className="flex lg:gap-4 xl:gap-8 lg:mt-10">
            <FilterSidebar
              className="hidden lg:block w-[260px] xl:w-[304px]"
              selectedRegions={selectedRegions}
              setSelectedRegions={setSelectedRegions}
              selectedCountries={selectedCountries}
              setSelectedCountries={setSelectedCountries}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
              searchText={searchText}
              setSearchText={setSearchText}
            />

            <div className="flex-1 ">
              <div className="grid grid-cols-2 gap-2 md:gap-3 xl:gap-x-5 xl:gap-y-4 h-max">
                {paginatedPackages.map((data, index) => (
                  <InternetPackageCard
                    key={index}
                    data={data}
                    type={2}
                    flow="LP"
                  />
                ))}
              </div>

              {plans.length > itemsPerPage && totalPages > 1 && (
                <div className="mt-8 w-full">
                  <Pagination className="flex justify-end">
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="mx-2"
                      disabled={currentPage === 1}
                    />
                    <PaginationContent>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            isActive={currentPage === i + 1}
                            onClick={() => handlePageChange(i + 1)}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                    </PaginationContent>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="mx-2"
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="p_common text-center w-full">
            {t("notFound.noPackage")}
          </p>
        )}
      </div>
    </section>
  );
};

export default PackageFilterList;

// filter sidebar component
const FilterSidebar = ({
  className,
  selectedRegions,
  setSelectedRegions,
  selectedCountries,
  setSelectedCountries,
  selectedProduct,
  setSelectedProduct,
  selectedPlan,
  setSelectedPlan,
  searchText,
  setSearchText,
}) => {
  const { regionList, countries } = useSelector((state) => state.country);

  const [isRegionListOpen, setIsRegionListOpen] = useState(true);
  const [isCountryListOpen, setIsCountryListOpen] = useState(true);
  const [isProductListOpen, setIsProductListOpen] = useState(true);
  const [isPlanTypeListOpen, setIsPlanTypeListOpen] = useState(true);

  const [totalCountryShow, setTotalCountryShow] = useState(5);

  const handleClear = () => {
    setSelectedRegions([]);
    setSelectedCountries([]);
    setSelectedProduct([]);
    setSelectedPlan([]);
    setSearchText("");
  };

  return (
    <div
      className={cn(
        "p-3 lg:p-6 border border-neutral-200 lg:rounded-2xl h-max",
        className,
      )}
    >
      {/* <h4 className="text-black-900 text-xl lg:text-[28px] font-extrabold leading-[120%]">
        {t("extraText.filters")}
      </h4>

      <div className="my-4 xl:my-8">
        <SearchBox searchText={searchText} setSearchText={setSearchText} />
      </div> */}

      <div className="flex flex-col gap-6 md:gap-8 lg:gap-12 h-max overflow-y-auto">
        {/* <FilterList
          title="Region"
          isOpen={isRegionListOpen}
          setIsOpen={setIsRegionListOpen}
          datas={regionList}
          selected={selectedRegions}
          setSelected={setSelectedRegions}
        /> */}

        {/* <FilterList
          title="Country"
          isOpen={isCountryListOpen}
          setIsOpen={setIsCountryListOpen}
          datas={countries}
          selected={selectedCountries}
          setSelected={setSelectedCountries}
          activeIsMoreButton={true}
          totalDataShow={totalCountryShow}
          setTotalDataShow={setTotalCountryShow}
        /> */}

        {/* <FilterList
          title="Products"
          isOpen={isProductListOpen}
          setIsOpen={setIsProductListOpen}
          datas={[
            { _id: 1, name: "Pocket Wifi", value: "D" },
            { _id: 2, name: "Sim", value: "S" },
            { _id: 3, name: "eSim", value: "E" },
          ]}
          selected={selectedProduct}
          setSelected={setSelectedProduct}
        /> */}

        <FilterList
          title="Plan Type"
          isOpen={isPlanTypeListOpen}
          setIsOpen={setIsPlanTypeListOpen}
          datas={[
            // { _id: 1, name: "All", value: "all" },
            { _id: 2, name: t("FilterList.daily"), value: "daily" },
            { _id: 3, name: t("FilterList.monthly"), value: "monthly" },
            {
              _id: 4,
              name: t("FilterList.multiCountry"),
              value: "multi-country",
            },
          ]}
          selected={selectedPlan}
          setSelected={setSelectedPlan}
        />
      </div>

      <div className="mt-4 lg:mt-5">
        <Button
          variant="secondary"
          className="!text-sm lg:!text-base !py-2 lg:!py-4 w-full !font-semibold rounded lg:rounded-xl"
          onClick={handleClear}
        >
          {t(`FilterList.clear`)}
        </Button>
      </div>
    </div>
  );
};

// FilterList component for re-using
const FilterList = ({
  isOpen,
  setIsOpen,
  datas,
  title,
  selected,
  setSelected,
  key = "value",
  activeIsMoreButton = false,
  totalDataShow,
  setTotalDataShow,
}) => {
  // Toggle list
  const toggle = (paramName, setSelected) => {
    setSelected((prevSelected) =>
      prevSelected.includes(paramName)
        ? prevSelected.filter((name) => name !== paramName)
        : [...prevSelected, paramName],
    );
  };

  return (
    <div className="flex flex-col gap-2 lg:gap-4">
      <div className="flex justify-between gap-x-4">
        <p className="text-black-900 text-sm lg:text-[18px] font-semibold">
          {title}:
        </p>

        <button onClick={() => setIsOpen(!isOpen)}>
          <HorizontalLineIcon />
        </button>
      </div>

      <div className="border-b border-[#EEE]"></div>

      <ul
        className={cn(
          "space-y-2 lg:space-y-4 transition-all duration-300 ",
          isOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden",
        )}
      >
        {datas.slice(0, totalDataShow).map((data, index) => (
          <li
            key={index}
            className="text-black-700 flex gap-2 items-center text-xs lg:text-base"
          >
            <Checkbox
              type="checkbox"
              checked={selected.includes(data[key])}
              onCheckedChange={() => toggle(data[key], setSelected)}
            />
            <span
              onClick={() => toggle(data[key], setSelected)}
              className="cursor-pointer "
            >
              {data.name}
            </span>
          </li>
        ))}
      </ul>

      {/* more button */}
      {activeIsMoreButton && datas.length > totalDataShow && isOpen && (
        <button
          className={cn(
            "px-4 lg:px-6 py-2 lg:py-3 border border-black-900 rounded lg:rounded-xl w-max text-xs lg:text-sm font-medium",
            isOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setTotalDataShow((prev) => prev + 5)}
        >
          More
        </button>
      )}
    </div>
  );
};

const SearchBox = ({ searchText, setSearchText }) => {
  return (
    <input
      type="text"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      placeholder={t(`extraText.searchPlanName`)}
      className="w-full h-11 lg:h-[52px] px-4 rounded-xl border border-neutral-300 outline-none bg-neutral-100 placeholder:text-black-600 text-black-900"
    />
  );
};
