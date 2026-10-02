import WifiDevices from "@/components/commercial/pocketWifi/cartService/WifiDevices";
import PocketWifiCartFooter from "@/components/commercial/pocketWifi/PocketWifiCartFooter";
import DataSize from "@/components/commercial/sim/cartService/DataSize";
import NumberOfDays from "@/components/commercial/sim/cartService/NumberOfDays";
import ServiceDate from "@/components/commercial/sim/cartService/ServiceDate";
import SimAccounts from "@/components/commercial/sim/cartService/SimAccounts";
import SimInformation from "@/components/commercial/sim/cartService/SimInformation";
import SimCartFooter from "@/components/commercial/sim/SimCartFooter";
import CartQuantity from "@/components/shared/others/CartQuantity";
import { Button } from "@/components/ui/button";
import {
    PLAN_TYPES_FOR_SINGLE_DATE_PICKER,
    SERVICE_TYPE_REQUESTS_MAPPING,
} from "@/constants/planTypes";
import { dateExternal, dateformat, useDisApi } from "@/general";
import { sortByServiceType } from "@/general/common.funcitons";
import useModal from "@/hooks/useModal";
import { cn } from "@/lib/utils";
import { brandRoutes, commercialRoutes, PlusRoundedIcon } from "@/services";
import { setSavedPath } from "@/store/module/auth/slice";
import { setCartData } from "@/store/module/cart/cartSlice";
import { setDevices } from "@/store/module/device/deviceSlice";
import { handleNextSimCart, setSimCartData } from "@/store/module/sim/slice";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { planCoverage } from "@/general/common.funcitons";
import AstindoSimInformation from "@/components/commercial/sim/cartService/AstindoSimInformation";
import AstindoCartQuantity from "@/components/shared/others/AstindoCartQuantity";

function AstindoCartService({ className = "", multiCountry = false }) {
    const { cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const { planVariations } = cart;
    const isSimEsim = ["S", "E"].includes(
        cart?.package?.deviceType?.toUpperCase()
    );
    const defaultServiceType = cart?.device?.device_id ? "T" : null;
    const [selectedOptions, setSelectedOptions] = useState({
        serviceType: cart?.cartType || null,
        days: cart?.variation?.days || null,
        dataSize: cart?.variation?.dataSize || null,
        variation: cart?.variation || null,
    });
    // const [selectedOptions, setSelectedOptions] = useState(handleVariation(cart.variation));
    const [isLoading, setLoading] = useState(false);
    // const [travelDetails, setTravelDetails] = useState(travelDetailsObj || routeData?.travelDetails || [])
    const [allVariations, setAllVariations] = useState(planVariations);
    const [selectedDevice, setSelectedDevice] = useState(cart?.device || null);
    const [serviceTypesToDisplay, setServiceTypesToDisplay] = useState([]);
    const [filteredVariations, setFilteredVariations] = useState([]);
    const [dataSizesList, setDataSizesList] = useState(cart.dataSizesList);
    const [daysList, setDaysList] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const options = { align: "start" };
    const [emblaRef] = useEmblaCarousel(options);
    const { setIsAuthDialogOpen } = useModal();
    const isTopUpFlow = selectedOptions?.serviceType === "T";
    multiCountry = cart?.package?.planType?.toUpperCase() == "CN" ? true : false;

    const { t } = useTranslation();

    const { brand } = useParams();
    const comp = brand?.toLowerCase();
    // function handleVariation(object) {
    //   return {
    //     serviceType: object?.serviceType || null,
    //     days: object?.days || null,
    //     dataSize: object?.dataSize || null,
    //     variation: object || null,
    //   }
    // }

    const handleDisable = () => {
        // console.log('isTopUpFlow', isTopUpFlow);
        // console.log('cart.device.device_id', cart?.device?.device_id);
        // console.log('selectedOop', selectedOptions);
        if (isTopUpFlow && !cart?.device?.device_id) {
            return true;
        }
        if (isSimEsim) {
            return !selectedOptions?.variation;
        } else {
            let locationWithMissingInfo = cart?.travelDetails?.find((i) => {
                if (
                    PLAN_TYPES_FOR_SINGLE_DATE_PICKER.includes(
                        cart.package?.planType?.toUpperCase()
                    )
                ) {
                    return !i.startDate || !i.locationCode;
                } else {
                    return !i.startDate || !i.endDate || !i.locationCode;
                }
            });
            return !selectedOptions?.variation || Boolean(locationWithMissingInfo);
        }
    };

    const handleNext = () => {
        dispatch(
            setCartData({
                travelDetails: [
                    {
                        locationCode: cart?.productCountry?.iso2,
                        travelLocation: cart?.productCountry?.name,
                        startDate: dateformat(null),
                        endDate: null,
                    },
                ],
                variation: selectedOptions.variation,
                dataSizesList: dataSizesList,
                planVariations: allVariations,
                cartType: selectedOptions.serviceType,
            })
        );
        navigate(`/${comp}/${brandRoutes.brandOrderConfirmation.path}`);

    };

    const handlePrev = () => {
        dispatch(setCartData({ variation: {}, device: {}, quantity: 1 }));
        navigate(`/${comp}`);

        // navigate(commercialRoutes.astindo.path);
    };

    const handleTabSelect = (value) => {
        dispatch(setPocketWifiCartData({ cartType: value }));
    };

    const handleCartQuantity = (value) => {
        dispatch(setCartData({ quantity: value }));
    };

    const getDevices = useDisApi({
        apiCall: "getDevices",
        setCallBack: (res) => {
            dispatch(setDevices(res?.devices || []));
        },
    });

    const getAllVariations = useDisApi({
        apiCall: "getPlanVariations",
        setCallBack: (res) => {
            setAllVariations(res?.plan?.sort(sortByServiceType) || []);
            setSelectedOptions((prev) => ({
                ...prev,
                serviceType: defaultServiceType,
            }));
        },
    });

    useEffect(() => {
        setSelectedDevice(cart.device);
    }, [cart.device]);

    useEffect(() => {
        if (!planVariations.length) {
            console.log("inside varaitions check");
            getAllVariations({ planCode: cart.package.planCode });
        }
    }, []);

    useEffect(() => {
        if (user) {
            getDevices({ userId: user?.userId });
        }
    }, [user]);

    useEffect(() => {
        // Determine available service types to display
        // commented becasue on web initially there is no device listing
        // if (cart?.device?.device_id) {
        //   setServiceTypesToDisplay(['T']);
        //   return;
        // }
        const serviceTypes = new Set();
        allVariations.forEach((variation) => {
            if (isSimEsim) {
                if (variation.productType === "S" || variation.productType === "E") {
                    serviceTypes.add(variation.productType);
                }
                if (variation.serviceType === "BV") {
                    serviceTypes.add("S");
                    serviceTypes.add("E");
                }
                // serviceTypes.add("T"); // Topup option available in all cases
            } else {
                if (variation.serviceType === "B" || variation.serviceType === "T") {
                    serviceTypes.add(variation.serviceType);
                } else if (variation.serviceType === "R" || !variation.serviceType) {
                    serviceTypes.add("R");
                    // serviceTypes.add("T");
                }
            }
        });
        let sortedserviceTypes = [...serviceTypes].sort((a, b) =>
            a.localeCompare(b)
        );
        // console.log("sortedserviceTypes", sortedserviceTypes);

        setServiceTypesToDisplay(sortedserviceTypes);
        setSelectedOptions((prev) => ({
            ...prev,
            serviceType: sortedserviceTypes?.[0] || null,
            dataSize: null,
            days: null,
            variation: null,
        }));
    }, [allVariations]);

    const updateDataSizesList = (variations) => {
        let uniqueDataSizes = [];

        variations.forEach((variation) => {
            const existingIndex = uniqueDataSizes.findIndex(
                (v) => v.dataSize === variation.dataSize
            );

            if (selectedOptions.serviceType === "S") {
                // Rule for serviceType "S": prefer productType "S" over serviceType "BV"
                if (existingIndex === -1) {
                    // No variation with this dataSize yet, add it
                    uniqueDataSizes.push(variation);
                } else if (
                    uniqueDataSizes[existingIndex].productType !== "S" &&
                    variation.productType === "S"
                ) {
                    // Replace existing "BV" variation if "S" variation is found
                    uniqueDataSizes[existingIndex] = variation;
                }
            } else if (selectedOptions.serviceType === "E") {
                // Rule for serviceType "E": prefer productType "E" over serviceType "BV"
                if (existingIndex === -1) {
                    uniqueDataSizes.push(variation);
                } else if (
                    uniqueDataSizes[existingIndex].productType !== "E" &&
                    variation.productType === "E"
                ) {
                    uniqueDataSizes[existingIndex] = variation;
                }
            } else if (selectedOptions.serviceType === "B") {
                // Rule for serviceType "K": prefer serviceType "K"
                if (existingIndex === -1) {
                    uniqueDataSizes.push(variation);
                } else if (uniqueDataSizes[existingIndex].serviceType === "K") {
                    uniqueDataSizes[existingIndex] = variation;
                }
            } else if (selectedOptions.serviceType === "R") {
                // Rule for serviceType "E": prefer serviceType "R" ||null
                if (existingIndex === -1) {
                    uniqueDataSizes.push(variation);
                } else if (
                    uniqueDataSizes[existingIndex].serviceType === "R" ||
                    !uniqueDataSizes[existingIndex].serviceType
                ) {
                    uniqueDataSizes[existingIndex] = variation;
                }
            } else if (selectedOptions.serviceType === "T" && selectedDevice) {
                // Rule for selectedOptions.serviceType === 'T'": prefer productType == selectedDevice?.device_type over "BV"
                if (isSimEsim) {
                    if (existingIndex === -1) {
                        uniqueDataSizes.push(variation);
                    } else if (
                        uniqueDataSizes[existingIndex].productType !==
                        selectedDevice?.device_type &&
                        variation.productType === selectedDevice?.device_type
                    ) {
                        uniqueDataSizes[existingIndex] = variation;
                    }
                } else {
                    // Rule for selectedOptions.serviceType === 'T': prefer serviceType "T" over "R"
                    if (existingIndex === -1) {
                        uniqueDataSizes.push(variation);
                    } else if (variation.serviceType === "T") {
                        uniqueDataSizes[existingIndex] = variation;
                    }
                }
            }
        });

        // Sort unique data sizes in ascending order by dataSize
        uniqueDataSizes.sort((a, b) => a.dataSize - b.dataSize);
        console.log("uniqueDataSizes before", uniqueDataSizes);
        // filter the dataSizesList based on the provider of selectedDevice
        if (isSimEsim && selectedOptions.serviceType === "T" && selectedDevice) {
            uniqueDataSizes = uniqueDataSizes.filter(
                (v) =>
                    v.provider?.toUpperCase() == selectedDevice?.provider?.toUpperCase()
            );
        }
        console.log("uniqueDataSizes after", uniqueDataSizes);

        setDataSizesList(uniqueDataSizes);
        console.log("uniqueDataSizes", uniqueDataSizes);

        let defaulVariation = uniqueDataSizes?.[0] || null
        console.log("defaulVariation", defaulVariation);

        setSelectedOptions((prev) => ({
            ...prev,
            dataSize: defaulVariation?.dataSize || null,
            days: defaulVariation?.days || null,
            variation: defaulVariation,
        }));
    };

    useEffect(() => {
        // Filter variations based on selected serviceType
        // if (!cart.variation?.variationId) {
        console.log("use efffec 2");

        let variations = allVariations;
        if (selectedOptions.serviceType === "S") {
            variations = variations.filter(
                (v) => v.productType === "S" || v.serviceType === "BV"
            );
        } else if (selectedOptions.serviceType === "E") {
            variations = variations.filter(
                (v) => v.productType === "E" || v.serviceType === "BV"
            );
        } else if (selectedOptions.serviceType === "B") {
            variations = variations.filter((v) => v.serviceType === "B");
        } else if (selectedOptions.serviceType === "R") {
            variations = variations.filter(
                (v) => v.serviceType === "R" || !v.serviceType
            );
        } else if (selectedOptions.serviceType === "T" && !isSimEsim) {
            console.log("inside ttt");

            variations = variations.filter((v) => v.serviceType !== "B");
        } else if (selectedOptions.serviceType === "T" && selectedDevice) {
            console.log("inside bbb");
            variations = variations.filter(
                (v) =>
                    v.productType === selectedDevice?.device_type ||
                    v.serviceType === "BV"
            );
        }
        setFilteredVariations(variations);
        updateDataSizesList(variations);
        // }
    }, [selectedOptions.serviceType, selectedDevice]);

    useEffect(() => {
        // Update days list based on selected dataSize
        console.log("use effect 3", selectedOptions);

        if (selectedOptions.dataSize) {

            const daysOptions = filteredVariations
                .filter((v) => v.dataSize === selectedOptions.dataSize)
                .filter((v, i, arr) => arr.findIndex((d) => d.days === v.days) === i)
                .sort((a, b) => a.days - b.days);
            setDaysList(daysOptions);
            setSelectedOptions((prev) => ({ ...prev, days: daysOptions?.[0]?.days }));
        } else {
            setDaysList([]);
        }
    }, [selectedOptions.dataSize, filteredVariations]);

    // useEffect(() => {
    //     // find the final selected variation based on selectedOptions
    //     console.log("selectedOptions.days", selectedOptions);

    //     if (!selectedOptions.days) {
    //         setSelectedOptions((prev) => ({ ...prev, variation: selectedOptions?.variation }));
    //     } else {
    //         const newVariation = daysList.find(
    //             (variation) => variation.days === selectedOptions.days
    //         );
    //         setSelectedOptions((prev) => ({ ...prev, variation: newVariation }));
    //     }
    // }, [selectedOptions.days]);

    const handleServiceTypeChange = (value) => {
        if (value === "T") {
            if (user) {
                setSelectedDevice(cart?.device);
            } else {
                dispatch(setSavedPath(null));
                setIsAuthDialogOpen(true);
            }
        } else {
            setSelectedDevice(null);
        }
        if (value !== cart?.variation?.serviceType) {
            dispatch(setCartData({ variation: {} }));
        }
        setSelectedOptions((prev) => ({
            ...prev,
            serviceType: value,
            dataSize: null,
            days: null,
            variation: null,
        }));
    };

    const handleDataSizeChange = (value) => {
        if (isSimEsim) {
            setSelectedOptions((prev) => ({
                ...prev,
                dataSize: value.dataSize,
                days: null,
            }));
        } else {
            setSelectedOptions((prev) => ({
                ...prev,
                dataSize: value.dataSize,
                days: value.days,
                variation: value,
            }));
            // dispatch(setCartData({ variation: value }))
        }
    };

    const handleDaysChange = (value) => {
        setSelectedOptions((prev) => ({
            ...prev,
            days: value.days,
            variation: value,
        }));
    };

    // console.log('serviceTypesToDisplay', serviceTypesToDisplay);
    // console.log('selectedOptions', selectedOptions);
    // console.log('cart', cart.package);


    let planAttbs = {
        planName: cart.package?.planName,
        nameAttributes: cart.package?.nameAttributes,
        description: cart.package?.description
    };

    if (cart.userLanguage !== "en") {
        planAttbs["planName"] = cart.package?.trPlanName || cart.package?.planName;
        planAttbs["nameAttributes"] = cart.package?.trNameAttributes || cart.package?.nameAttributes;
        planAttbs["description"] = cart.package?.trDescription || cart.package?.description;
    }

    return (
        <div className="w-full flex justify-center px-4 py-10 md:py-16">
            <div
                className={cn("w-full flex flex-col gap-6 overflow-hidden max-w-xl", className)}
            >
                <div className="w-full flex flex-col gap-4 ">
                    <h1
                        className="text-base md:text-[26px] font-bold text-black-800"
                        style={{ whiteSpace: "pre-line" }}
                    >
                        {cart.package?.trPlanName || cart.package?.planName || ""}
                    </h1>
                    <p
                        className="text-base md:text-[16px] font-normal text-gray-400"
                        style={{ whiteSpace: "pre-line" }}
                    >
                        {cart?.package?.trNameAttributes || cart?.package?.nameAttributes || t("extraText.connectsSeamlessly")}
                    </p>
                    <p
                        className="text-base md:text-[16px] font-normal text-black-800 border rounded-[12px] p-3 bg-[#FBFBFB]"
                        style={{ whiteSpace: "pre-line" }}
                    >
                        <span className="font-bold">{t(`extraText.countryCoverage`)} <br /></span>
                        {planCoverage(
                            cart?.[t(`simInformation.accordionData.items.1.content`)]
                        )}
                    </p>
                    <h2 className="text-base font-semibold text-black-700 md:text-[18px]">
                        {t("extraText.simType")}
                    </h2>
                    <div ref={emblaRef} className="w-full max-w-full overflow-hidden">
                        <div className="flex items-center gap-4">
                            {serviceTypesToDisplay.map((val) => {
                                return (
                                    <Button
                                        type="button"
                                        className={cn(
                                            "hover:bg-main-600 hover:text-white",
                                            val === selectedOptions?.serviceType
                                                ? "text-white font-semibold"
                                                : ""
                                        )}
                                        key={"SERVICE_TYPE_" + val}
                                        variant={
                                            val === selectedOptions?.serviceType ? "default" : "cancel"
                                        }
                                        onClick={() => handleServiceTypeChange(val)}
                                    >
                                        {t(SERVICE_TYPE_REQUESTS_MAPPING[val].translationKey)}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {isTopUpFlow && user && <WifiDevices fromCart="S" />}
                {/* {cart?.cartType == "topup" && <SimAccounts />} */}

                <div className="w-full flex flex-col gap-4 overflow-hidden">
                    <h2 className="text-base font-semibold text-black-700 md:text-[18px]">
                        {t("extraText.dataSize")}
                    </h2>
                    <div className="w-full max-w-full overflow-hidden">
                        <div className="flex flex-wrap items-center gap-4">
                            {dataSizesList?.map((val) => (
                                <Button
                                    key={"DATA_SIZE_" + val.dataSize + "" + val.desc}
                                    type="button"
                                    className={cn(
                                        "hover:bg-main-600 hover:text-white",
                                        val.dataSize === selectedOptions?.dataSize
                                            ? "text-white font-semibold"
                                            : ""
                                    )}
                                    variant={
                                        val.dataSize === selectedOptions?.dataSize
                                            ? "default"
                                            : "cancel"
                                    }
                                    onClick={() => handleDataSizeChange(val)}
                                >
                                    {val.dataSize + "" + val.desc}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
                {/* <DataSize /> */}
                <NumberOfDays
                    data={daysList}
                    selectedOption={selectedOptions}
                    onItemPress={(item) => handleDaysChange(item)}
                />
                {/* <ServiceDate multiCountry={multiCountry} /> */}
                <AstindoCartQuantity
                    max={10}
                    defaultValue={cart?.quantity}
                    setter={handleCartQuantity}
                    label={t("extraText.noOfSimESim") + ":"}
                    labelClass="font-semibold"
                />
                <AstindoSimInformation item={cart.package} />
                <SimCartFooter
                    prevHandler={handlePrev}
                    nextHandler={handleNext}
                    disableHandler={handleDisable}
                />
            </div>
        </div>
    );
}

export default AstindoCartService;
