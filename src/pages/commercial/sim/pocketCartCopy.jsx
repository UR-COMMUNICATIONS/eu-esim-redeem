import DataSize from "@/components/commercial/pocketWifi/cartService/DataSize";
import ServiceDate from "@/components/commercial/pocketWifi/cartService/ServiceDate";
import WifiDevices from "@/components/commercial/pocketWifi/cartService/WifiDevices";
import PocketWifiCartFooter from "@/components/commercial/pocketWifi/PocketWifiCartFooter";
import CartQuantity from "@/components/shared/others/CartQuantity";
import { Button } from "@/components/ui/button";
import { SERVICE_TYPE_REQUESTS_MAPPING } from "@/constants/planTypes";
// import { PRODUCT_TYPES_MAPPING } from "@/constants/device";
import { dateExternal, dateformat, useDisApi } from "@/general";
import { sortByServiceType } from "@/general/common.funcitons";
import { cn } from "@/lib/utils";
import { commercialRoutes, PlusRoundedIcon } from "@/services";
import { setCartData } from "@/store/module/cart/cartSlice";
import { setDevices } from "@/store/module/device/deviceSlice";
import {
    handleNextPocketWifiCart,
    setPocketWifiCartData,
} from "@/store/module/pocketWifi/slice";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const flow_reqs = {
    'rental': 'rentDevice',
    'keep': 'buyDevice',
    'topup': 'addPlan'
}
const variation_filter = {
    'rental': ['R', null],
    'keep': ['B'],
    'topup': 'T',
}

const PLAN_TYPES_FOR_SINGLE_DATE_PICKER = ["W", "M", "MS", "VS", "VE", "V"]

function PocketWifiCartService({ className = "", multiCountry = false }) {
    const { cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const isTopup = cart?.package?.serviceType?.toUpperCase() == 'TP'
    const [flowBtns, setFlowBtns] = useState((!isTopup && !cart?.device?.device_id) ? ['rental', 'topup'] : ['topup']);
    const [selectedFlow, setSelectedFlow] = useState((!isTopup && !cart?.device?.device_id) ? 'rental' : 'topup');
    const [variation, setVariation] = useState({
        size: '',
        days: '0',
        obj: {}
    });

    const navigation = useNavigate();

    // const routeData = route.params?.data;
    // const orderInfo = routeData.orderInfo;
    // const currency = routeData?.currency || 'SGD';
    // const { planInfo, estimation } = routeData;

    // let travelDetailsObj = null;
    // if (orderInfo?.startDate) {
    //   let endDate = orderInfo?.endDate;
    //   if (!PLAN_TYPES_FOR_SINGLE_DATE_PICKER.includes(cart?.package?.planType.toUpperCase())) {//only start date is required
    //     if (!endDate && orderInfo.noOfDays) {
    //       endDate = new Date(orderInfo?.startDate);
    //       endDate.setDate(endDate.getDate() + orderInfo.noOfDays)
    //       endDate = dateToMonDDYYYY(endDate)
    //     }
    //   }
    //   let countryName = orderInfo?.travelingTo?.[0]?.replace(/\s/g, '')?.toUpperCase()
    //   let countryObj = countryCodes.find(cou => cou.name.replace(/\s/g, '').toUpperCase() == countryName || cou.code.replace(/\s/g, '').toUpperCase() == countryName)
    //   travelDetailsObj = [{
    //     locationCode: countryObj?.code,
    //     travelLocation: countryObj?.name || orderInfo?.travelingTo?.[0],
    //     startDate: orderInfo?.startDate,
    //     endDate: endDate
    //   }]
    // }

    const isSimEsim = ['S', 'E'].includes(cart?.package?.deviceType?.toUpperCase())

    const defaultServiceType = cart?.device?.device_id ? 'T' : null

    const [selectedOptions, setSelectedOptions] = useState({
        serviceType: null,
        variation: null,
        days: null,
        dataSize: null
    });
    const [isLoading, setLoading] = useState(false)
    // const [travelDetails, setTravelDetails] = useState(travelDetailsObj || routeData?.travelDetails || [])
    const [travelDetails, setTravelDetails] = useState([])
    const [noOfDevices, setNoOfDevices] = useState(1);
    const [allVariations, setAllVariations] = useState([]);
    // const [selectedDevice, setSelectedDevice] = useState(routeData?.deviceData);
    const [selectedDevice, setSelectedDevice] = useState(cart?.device);
    const [planCountries, setPlanCountries] = useState([]);
    const [commaSeperatedCountries, setCommaSeperatedCountries] = useState('')
    const [serviceTypesToDisplay, setServiceTypesToDisplay] = useState([]);
    const [filteredVariations, setFilteredVariations] = useState([]);
    const [dataSizesList, setDataSizesList] = useState([]);
    const [daysList, setDaysList] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const options = { align: "start" };
    const [emblaRef] = useEmblaCarousel(options);

    multiCountry = cart?.package?.planType?.toUpperCase() == 'CN' ? true : false

    const [addNewCountry, setAddNewCountry] = useState(false);
    const { t } = useTranslation();

    const handleDisable = () => {
        if (isTopUpFlow && !cart?.device?.device_id) {
            return true
        }
        else {
            let locationWithMissingInfo = cart.travelDetails.find(i => {
                if (PLAN_TYPES_FOR_SINGLE_DATE_PICKER.includes(cart.package?.planType.toUpperCase())) {
                    return (!i.startDate || !i.locationCode)
                }
                else {
                    return (!i.startDate || !i.endDate || !i.locationCode)
                }
            })
            return !selectedOptions?.variation || Boolean(locationWithMissingInfo)
        }
    }

    const handleNext = () => {
        navigate(commercialRoutes.pocketWifiPlanSummery.path);
        // dispatch(handleNextPocketWifiCart());
    };

    const handlePrev = () => {
        dispatch(setCartData({ variation: {}, device: {}, quantity: 1 }));
        // if (productTab.activeTab === "Pocket WIFI") {
        navigate(commercialRoutes.pocketWifiPlan.path);
        // dispatch(handleNextPocketWifiCart());
        // } 
        // }
    };

    const groupByDataSize = array => array.reduce((objectsByKeyValue, obj) => {
        const value = obj['dataSize'];
        if (objectsByKeyValue[value]) {
            objectsByKeyValue[value] = obj
        }
        else {
            objectsByKeyValue[value] = Object.assign({}, obj)
        }
        return objectsByKeyValue;
    }, {});

    const handleTabSelect = (value) => {
        dispatch(setPocketWifiCartData({ cartType: value }));
    };

    const handleCartQuantity = (value) => {
        dispatch(setCartData({ quantity: value }));
    };

    const getPlanCountries = useDisApi({
        apiCall: 'planCountries',
        // setCallBack: (res) => setPlanCountries(res?.countries || [])
    });

    // const reduxDevices = useAppSelector((state) => state.devices.devicesList);
    // const devices = reduxDevices.filter((dev) => {
    //   return cart?.device?.device_id ? dev.device_id === cart?.device?.device_id : !checkIfIsSimOrEsim(dev.device_type?.toUpperCase())
    // })

    const isTopUpFlow = selectedOptions?.serviceType === 'T';

    const onSetMultiCountry = (item, index) => {
        let newTravelDetails = [...travelDetails]
        newTravelDetails[index].locationCode = item.countryCode
        newTravelDetails[index].travelLocation = item.country
        setTravelDetails(newTravelDetails)
    }

    const onRemoveMultiCountry = (index) => {
        let newTravelDetails = [...travelDetails]
        newTravelDetails.splice(index, 1);
        setTravelDetails(newTravelDetails)
    }

    const onSingleDateChanged = async (value = '', idx) => {
        let newTravelDetails = [...travelDetails]
        newTravelDetails[idx].startDate = dateToYYYYMMDD(new Date(value))
        setTravelDetails(newTravelDetails)
    }

    const onDateRangeChanged = (idx) => ({ selectedStartDate, selectedEndDate }) => {
        let newTravelDetails = [...travelDetails]
        try {

            newTravelDetails[idx].startDate = dateToYYYYMMDD(selectedStartDate)
            newTravelDetails[idx].endDate = dateToYYYYMMDD(selectedEndDate)
            if (newTravelDetails[idx - 1]) {
                newTravelDetails[idx - 1].endDate = dateToYYYYMMDD(selectedStartDate)
            }
            if (newTravelDetails[idx + 1]) {
                newTravelDetails[idx + 1].startDate = dateToYYYYMMDD(selectedEndDate)
            }
            setTravelDetails(newTravelDetails)
        }
        catch (e) {
        }
    }
    const addMultiCountry = () => {
        let newTravelDetails = [...travelDetails]
        if (newTravelDetails[newTravelDetails.length - 1]?.endDate && newTravelDetails[newTravelDetails.length - 1]?.travelLocation) {
            newTravelDetails.push({
                locationCode: '',
                travelLocation: '',
                startDate: newTravelDetails[newTravelDetails.length - 1]?.endDate,
                endDate: null,
            })
            setTravelDetails(newTravelDetails)
        }
        else {
            // handleShowError(appTranslate('select_valid_country_date'))
        }
    }

    const incrementItem = () => {
        if (noOfDevices < 99) {
            setNoOfDevices(noOfDevices + 1)
        }
    }

    const decrementItem = () => {
        if (noOfDevices > 1) {
            setNoOfDevices(noOfDevices - 1)
        }
    }

    const getDevices = useDisApi({
        apiCall: 'getDevices',
        setCallBack: (res) => {
            dispatch(setDevices(res?.devices || []))
        }
    });


    const getAllVariations = useDisApi({
        apiCall: 'getPlanVariations',
        setCallBack: (res) => {
            setAllVariations(res?.plan?.sort(sortByServiceType) || [])
            setSelectedOptions(prev => ({ ...prev, serviceType: defaultServiceType }))
        }
    });

    useEffect(() => {
        // let productType = isSimEsim ? (selectedDevice?.device_type === 'S' ? 'S' : 'E') : 'D';
        // let productType = 'D';
        // getPlanCountries({ planCode: cart.package.planCode })
        getAllVariations({ planCode: cart.package.planCode, productType: 'D' })
        getDevices({ userId: user?.userId })

    }, [])

    const gotoSummary = () => {
        if (!isSimEsim) {
            goToSummaryWithDevice()
            return
        }
        // let travelDetails = routeData?.travelDetails || [];
        let travelDetails = [];
        travelDetails[0].startDate = moment(new Date()).format("YYYY-MM-DD")
        travelDetails[0].endDate = moment(new Date()).format("YYYY-MM-DD")
        let data = {
            // ...routeData,
            estimation: {
                // ...routeData?.estimation,
                requestType: SERVICE_TYPE_REQUESTS_MAPPING[selectedOptions?.serviceType].requestType,
                noOfDevices,
            },
            variation: selectedOptions?.variation,
            travelDetails: travelDetails,
            planInfo: cart?.package,
            deviceData: selectedDevice
        }
        navigation.navigate(screenNames.OrderPlanSummary, { data })
    }

    const goToSummaryWithDevice = () => {
        let newTravelDetails = [
            ...travelDetails,
        ];
        let selectedCountriesList = []

        let isRatesListValid = true;
        //@ts-ignore
        let newPlanInfo = {
            ...planInfo,
            rates: []
        };
        if (newPlanInfo.planType?.toUpperCase() == 'CN') {
            //@ts-ignore
            newTravelDetails = travelDetails.map((countryObj, index) => {
                if (!selectedCountriesList.includes(countryObj.locationCode)) {
                    selectedCountriesList.push(countryObj.locationCode)
                }
                let planCountry = planCountries.find((planCountry) => {
                    // MULTI_COUNTRY
                    // Select rate based on variation from planCountriesList
                    return (
                        (
                            planCountry.countryCode?.toLowerCase?.() == countryObj.locationCode?.toLowerCase?.()
                            ||
                            planCountry.country?.toLowerCase?.() == countryObj.travelLocation?.toLowerCase?.()//marketplace order doesn't have country code
                        )
                        &&
                        (selectedOptions.variation.variationId == planCountry.variationId)
                    )
                })
                // MULTI_COUNTRY
                // If variationId is not found, select first object of that country and use its rate
                // if first object has 0 rate should we use other object with some rate?
                if (!planCountry) {
                    // find where countryCode matches and rate > 0
                    planCountry = planCountries.find((planCountry) => {
                        return (
                            (
                                planCountry.countryCode?.toLowerCase?.() == countryObj.locationCode?.toLowerCase?.()
                                ||
                                planCountry.country?.toLowerCase?.() == countryObj.travelLocation?.toLowerCase?.()//marketplace order doesn't have country code
                            )
                            &&
                            planCountry.rate > 0
                        )
                    })
                }

                if (planCountry) {
                    newPlanInfo.rates.push({
                        countryCode: planCountry.countryCode,
                        rate: planCountry.rate
                    })
                }
                else if (!planCountry) {
                    isRatesListValid = false;
                }
                return {
                    locationCode: countryObj.locationCode,
                    countryCode: countryObj.locationCode,
                    countryName: countryObj.travelLocation,
                    startDate: countryObj.startDate,
                    endDate: countryObj.endDate,
                    rate: planCountry?.rate,
                }
            })
        }
        const isStartDateValid = travelDetails[travelDetails.length - 1]?.startDate;
        const isEndDateValid = newPlanInfo.planType === 'CN' ? travelDetails[travelDetails.length - 1]?.endDate : true;
        let isTravelLocationValid = travelDetails[travelDetails.length - 1]?.travelLocation !== 'Search country';
        if (newPlanInfo.planType?.toUpperCase() == 'CN' && (!isRatesListValid || !newPlanInfo.rates.length)) {
            // handleShowError(appTranslate('country_rates_not_found'))
            return
        }

        if (isStartDateValid && isEndDateValid && isTravelLocationValid) {
            let data = {
                // ...routeData,
                estimation: {
                    // ...routeData?.estimation,
                    requestType: SERVICE_TYPE_REQUESTS_MAPPING[selectedOptions.serviceType].requestType,
                    noOfDevices,
                },
                travelDetails: newTravelDetails,
                planInfo: newPlanInfo,
                selectedCountriesList,
                orderInfo,
                deviceData: selectedDevice,
                variation: selectedOptions.variation,
            }
            navigation.navigate(screenNames.OrderPlanSummary, { data })
        }
        else {
            // handleShowError(appTranslate('select_valid_country_date'))
        }
    }

    useEffect(() => {
        // Determine available service types to display
        if (cart?.device?.device_id) {
            setServiceTypesToDisplay(['T']);
            return;
        }
        const serviceTypes = new Set();
        allVariations.forEach((variation) => {
            if (isSimEsim) {
                if (variation.productType === 'S' || variation.productType === 'E') {
                    serviceTypes.add(variation.productType);
                }
                if (variation.serviceType === 'BV') {
                    serviceTypes.add('S');
                    serviceTypes.add('E');
                }
                serviceTypes.add('T'); // Topup option available in all cases
            }
            else {
                if (variation.serviceType === 'B' || variation.serviceType === 'T') {
                    serviceTypes.add(variation.serviceType);
                }
                else if (variation.serviceType === 'R' || !variation.serviceType) {
                    serviceTypes.add('R');
                    serviceTypes.add('T');
                }
            }
        });
        let sortedserviceTypes = [...serviceTypes].sort((a, b) => a.localeCompare(b))
        // console.log('sortedserviceTypes', sortedserviceTypes);

        setServiceTypesToDisplay(sortedserviceTypes);
    }, [allVariations]);

    const updateDataSizesList = (variations) => {
        let uniqueDataSizes = [];

        variations.forEach(variation => {
            const existingIndex = uniqueDataSizes.findIndex(v => v.dataSize === variation.dataSize);

            if (selectedOptions.serviceType === 'S') {
                // Rule for serviceType "S": prefer productType "S" over serviceType "BV"
                if (existingIndex === -1) {
                    // No variation with this dataSize yet, add it
                    uniqueDataSizes.push(variation);
                } else if (uniqueDataSizes[existingIndex].productType !== 'S' && variation.productType === 'S') {
                    // Replace existing "BV" variation if "S" variation is found
                    uniqueDataSizes[existingIndex] = variation;
                }
            }
            else if (selectedOptions.serviceType === 'E') {
                // Rule for serviceType "E": prefer productType "E" over serviceType "BV"
                if (existingIndex === -1) {
                    uniqueDataSizes.push(variation);
                } else if (uniqueDataSizes[existingIndex].productType !== 'E' && variation.productType === 'E') {
                    uniqueDataSizes[existingIndex] = variation;
                }
            }
            else if (selectedOptions.serviceType === 'B') {
                // Rule for serviceType "K": prefer serviceType "K"
                if (existingIndex === -1) {
                    uniqueDataSizes.push(variation);
                } else if (uniqueDataSizes[existingIndex].serviceType === 'K') {
                    uniqueDataSizes[existingIndex] = variation;
                }
            }
            else if (selectedOptions.serviceType === 'R') {
                // Rule for serviceType "E": prefer serviceType "R" ||null
                if (existingIndex === -1) {
                    uniqueDataSizes.push(variation);
                } else if (uniqueDataSizes[existingIndex].serviceType === 'R' || !uniqueDataSizes[existingIndex].serviceType) {
                    uniqueDataSizes[existingIndex] = variation;
                }
            }
            else if (selectedOptions.serviceType === 'T' && selectedDevice) {
                // Rule for selectedOptions.serviceType === 'T'": prefer productType == selectedDevice.device_type over "BV"
                if (isSimEsim) {
                    if (existingIndex === -1) {
                        uniqueDataSizes.push(variation);
                    } else if (
                        uniqueDataSizes[existingIndex].productType !== selectedDevice.device_type &&
                        variation.productType === selectedDevice.device_type
                    ) {
                        uniqueDataSizes[existingIndex] = variation;
                    }
                }
                else {
                    // Rule for selectedOptions.serviceType === 'T': prefer serviceType "T" over "R"
                    if (existingIndex === -1) {
                        uniqueDataSizes.push(variation);
                    } else if (
                        variation.serviceType === 'T'
                    ) {
                        uniqueDataSizes[existingIndex] = variation;
                    }
                }
            }
        });

        // Sort unique data sizes in ascending order by dataSize
        uniqueDataSizes.sort((a, b) => a.dataSize - b.dataSize);

        // filter the dataSizesList based on the provider of selectedDevice
        if (isSimEsim && selectedOptions.serviceType === 'T' && selectedDevice) {
            uniqueDataSizes = uniqueDataSizes.filter((v) => v.provider?.toUpperCase() == selectedDevice?.provider?.toUpperCase())
        }
        setDataSizesList(uniqueDataSizes);
        setSelectedOptions(prev => ({ ...prev, dataSize: null, days: null }));
    };

    useEffect(() => {
        // Filter variations based on selected serviceType
        let variations = allVariations;
        if (selectedOptions.serviceType === 'B') {
            variations = variations.filter(v => v.serviceType === 'B');
        }
        else if (selectedOptions.serviceType === 'R') {
            variations = variations.filter(v => v.serviceType === 'R' || !v.serviceType);
        }
        else if (selectedOptions.serviceType === 'T' && !isSimEsim) {
            variations = variations.filter(v => v.serviceType !== 'B');
        }
        else if (selectedOptions.serviceType === 'T' && selectedDevice) {
            variations = variations.filter(
                v =>
                    v.productType === selectedDevice.device_type ||
                    v.serviceType === 'BV'
            );
        }
        setFilteredVariations(variations);
        updateDataSizesList(variations);
    }, [selectedOptions.serviceType, selectedDevice?.device_type]);


    const handleServiceTypeChange = (value) => {
        if (value === 'T') {
            setSelectedDevice(cart?.device)
        }
        else {
            setSelectedDevice(null)
        }
        setSelectedOptions(prev => ({
            ...prev,
            serviceType: value,
            dataSize: null,
            days: null,
        }));
    };

    const handleDeviceChange = (value) => {
        setSelectedDevice(value);
        setSelectedOptions(prev => ({
            ...prev,
            dataSize: null,
            days: null
        }));
    };

    const handleDataSizeChange = (value) => {

        if (isSimEsim) {
            setSelectedOptions(prev => ({
                ...prev,
                dataSize: value.dataSize,
                days: null,
            }));
        }
        else {
            setSelectedOptions(prev => ({
                ...prev,
                dataSize: value.dataSize,
                days: value.days,
                variation: value
            }));
            dispatch(setCartData({ variation: value }))
        }
    };

    const handleDaysChange = (value) => {
        setSelectedOptions(prev => ({
            ...prev,
            days: value,
        }));
    };
    // const productMappingObject = PRODUCT_TYPES_MAPPING[isTopUpFlow ? selectedDevice?.device_type?.toUpperCase() : selectedOptions.serviceType] || (isSimEsim ? PRODUCT_TYPES_MAPPING.E : PRODUCT_TYPES_MAPPING.D);

    const isSubmitDisabled = () => {
        if (isTopUpFlow && !selectedDevice?.device_id) {
            return true
        }
        if (isSimEsim) {
            return !selectedOptions?.variation
        }
        else {
            let locationWithMissingInfo = travelDetails.find(i => {
                if (PLAN_TYPES_FOR_SINGLE_DATE_PICKER.includes(cart?.package?.planType.toUpperCase())) {
                    return (!i.startDate || !i.locationCode)
                }
                else {
                    return (!i.startDate || !i.endDate || !i.locationCode)
                }
            })

            return !selectedOptions?.variation || Boolean(locationWithMissingInfo)
        }
    }

    // console.log('dataSizes', dataSizesList);
    // console.log('serviceTypesToDisplay', serviceTypesToDisplay);
    // console.log('selectedOptions', selectedOptions);


    return (
        <div className={cn("w-full flex flex-col gap-6", className)}>
            <div className="w-full flex flex-col gap-4">
                <h2 className="text-base font-semibold text-black-700">
                    {t("extraText.service")}
                </h2>
                <div ref={emblaRef} className="w-full max-w-full overflow-hidden">
                    <div className="flex items-center gap-4">
                        {
                            serviceTypesToDisplay.map(val => {
                                return (
                                    <Button
                                        type="button"
                                        className={cn("hover:bg-main-600 hover:text-white", cart?.cartType == "rental" ? "text-white font-semibold" : ""
                                        )}
                                        variant={val === selectedOptions?.serviceType ? "default" : "cancel"}
                                        onClick={() => handleServiceTypeChange(val)}
                                    >
                                        {t(SERVICE_TYPE_REQUESTS_MAPPING[val].translationKey)}
                                    </Button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {isTopUpFlow && <WifiDevices />}
            <div className="w-full flex flex-col gap-4">
                <h2 className="text-base font-semibold text-black-700">
                    {t(`extraText.dataSize`)}
                </h2>
                <div className="w-full max-w-full overflow-hidden">
                    <div className="flex items-center gap-4">
                        {
                            dataSizesList?.map((val) =>
                                <Button
                                    key={'DATA_SIZE_' + val.dataSize + '' + val.desc}
                                    type="button"
                                    className={cn("hover:bg-main-600 hover:text-white text-white font-semibold")}
                                    variant={val.dataSize === selectedOptions?.dataSize ? "default" : "cancel"}
                                    onClick={() => handleDataSizeChange(val)}
                                >
                                    {val.dataSize + '' + val.desc}
                                </Button>
                            )
                        }
                    </div>
                </div>
            </div>
            {/* <DataSize dataSizesList={dataSizesList} handleDataSize={handleDataSizeChange} /> */}

            <ServiceDate multiCountry={multiCountry} />
            {/* {multiCountry && (
        <div className="flex_center flex-col">
          {addNewCountry ? (
            <ServiceDate
              multiCountry={multiCountry}
              className={"w-full my-4 md:my-6"}
              servicedateAdded
            />
          ) : (
            <button
              className="text-sm md:text-base !leading-normal font-medium flex items-center justify-center gap-3 md:gap-[14px] hover:opacity-75"
              onClick={() => setAddNewCountry(true)}
            >
              <PlusRoundedIcon className="h-6 w-6 md:h-8 md:w-8" />
              <span>{t("buttonText.addACountry")}</span>
            </button>
          )}
        </div>
      )} */}

            <div>
                <span className="label mb-2 md:mb-4">
                    {t("extraText.noOfRentalDevices")}
                </span>
                <CartQuantity
                    max={10}
                    defaultValue={cart?.quantity}
                    setter={handleCartQuantity}
                />
            </div>

            <PocketWifiCartFooter
                prevHandler={handlePrev}
                nextHandler={handleNext}
                disableHandler={handleDisable}
            />
        </div>
    );
}

export default PocketWifiCartService;
