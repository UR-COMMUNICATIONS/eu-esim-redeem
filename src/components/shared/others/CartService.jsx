// createCartServiceComponent.js - Factory for all cart service pages
import CartQuantity from "@/components/shared/others/CartQuantity";
import { Button } from "@/components/ui/button";
import {
  PLAN_TYPES_FOR_SINGLE_DATE_PICKER,
  SERVICE_TYPE_REQUESTS_MAPPING,
  isSimEsim as isSimEsimArray,
} from "@/constants/planTypes";
import { dateformat, useDisApi } from "@/general";
import { planCoverage } from "@/general/common.funcitons";
import useModal from "@/hooks/useModal";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { cn } from "@/lib/utils";
import { setSavedPath } from "@/store/module/auth/slice";
import { setCartData } from "@/store/module/cart/cartSlice";
import { setDevices } from "@/store/module/device/deviceSlice";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartWarningMessage from "./CartWarningMessage";

/**
 * @typedef {Object} CartServiceConfig
 * @property {"sim"|"pocketWifi"|"router"} type
 * @property {React.ComponentType<any>} FooterComponent
 * @property {React.ComponentType<any>} [DeviceComponent] - Device selection component
 * @property {React.ComponentType<any>} [DateComponent] - Service date component
 * @property {React.ComponentType<any>} [DaysComponent] - Number of days component
 * @property {React.ComponentType<any>} [InfoComponent] - Additional info component
 * @property {() => { plan: string, planSummary: string, home: string }} getRoutes
 * @property {boolean} [hasDatePicker] - Shows date picker
 * @property {boolean} [hasDaysSelection] - Shows days selection
 * @property {boolean} [showRefurbishedWarning] - Shows refurbished device warning
 * @property {string} [deviceProductType] - Product type for device filtering (D, S, E)
 * @property {string} quantityLabel - Label for quantity section
 */

// Factory function to create cart service component
function createCartServiceComponent(config) {
  return function CartService({ className = "" }) {
    const { cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const { isAuthModalOpen } = useSelector((state) => state.shared);
    const { devices: reduxDevices } = useSelector((state) => state.device);
    const { currentCountry } = useUserLocationLanguage();
    const { planVariations } = cart;

    const isSimEsim = ["S", "E"].includes(
      cart?.package?.deviceType?.toUpperCase(),
    );

    const [topupFlow, setTopupFlow] = useState(false);

    const normalizeVariationData = (data = {}) => ({
      serviceType: data.serviceType || null,
      dataSize: data.dataSize || null,
      days: data.days || null,
      variation: data.variation || null,
    });

    const variationData = useMemo(
      () => normalizeVariationData(cart?.variationData),
      [cart?.variationData],
    );
    const [selectedOptions, setSelectedOptions] = useState(variationData);
    const [groupVariations, setGroupVariations] = useState(
      cart?.groupVariations || {},
    );
    const [variations, setVariations] = useState([]);
    const defaultDevice =
      cart?.device === null || Object.keys(cart?.device)?.length === 0
        ? null
        : cart.device;

    const [selectedDevice, setSelectedDevice] = useState(defaultDevice);
    const [serviceTypes, setServiceTypes] = useState([]);
    const [dataSizes, setDataSizes] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { setIsAuthDialogOpen } = useModal();
    const [emblaRef] = useEmblaCarousel({ align: "start" });

    const isTopUpFlow = selectedOptions?.serviceType === "T";
    const planType = cart?.package?.planType?.toUpperCase();
    // const serviceType = cart?.package?.serviceType?.toUpperCase();

    const multiCountry = planType === "CN";
    const singleDatePicker =
      PLAN_TYPES_FOR_SINGLE_DATE_PICKER.includes(planType);

    const shouldScrollDevices = reduxDevices?.length > 5;

    // Get routes
    const routes = config.getRoutes();

    // Filter devices based on config
    const devices = reduxDevices.filter((dev) => {
      if (cart?.device?.device_id) {
        return dev.device_id === cart.device.device_id;
      }
      if (config.type === "sim") {
        return ["S", "E"].includes(dev.device_type?.toUpperCase());
      }
      return true; // PocketWifi/Router show all devices
    });

    // Get devices API
    const getDevices = useDisApi({
      apiCall: "getDevices",
      setCallBack: (res) => {
        dispatch(setDevices(res?.devices || []));
      },
    });

    const getDefaultVariation = (variationParams) => {
      // V4
      let dataSize = null;
      let updatedDataSizes = [...dataSizes];
      let defualtVariations = [];
      let defaultVariation = null;
      let days = null;

      let dataSizesVariations = null;
      let {
        serviceType,
        size,
        variation,
        device_type,
        provider,
        groupedVariations,
        isDataSizes,
      } = variationParams;

      console.log("variationParams", variationParams);
      console.log("config", config.type);
      console.log("serviceType", serviceType);

      try {
        //   if (
        //   config.type === "sim" &&
        //   selectedOptions.serviceType === "T" &&
        //   selectedDevice?.provider
        // )
        if (serviceType === "T") {
          if (config.type === "sim") {
            dataSizesVariations =
              groupedVariations?.[serviceType]?.[device_type]?.[provider];
          } else {
            dataSizesVariations = groupedVariations?.[serviceType];
            // groupedVariations?.[serviceType]?.[device_type];
          }
        } else {
          dataSizesVariations = groupedVariations?.[serviceType];
        }
        console.log("dataSizesVariations", dataSizesVariations);
        if (dataSizesVariations) {
          if (!isDataSizes) {
            console.log("isDataSizes");
            const sizeKeys = Object.keys(dataSizesVariations); // (1GB,2GB,500MB)
            updatedDataSizes = sizeKeys.map((size, index) => ({
              label: dataSizesVariations[size]?.[0]?.desc,
              value: size,
            }));
          }
          const key = size || Object.keys(dataSizesVariations)?.[0];
          const value = dataSizesVariations?.[key];
          console.log("key", key);
          console.log("value", value);
          dataSize = key;
          defualtVariations = value || [];
          defaultVariation = variation || defualtVariations?.[0] || null;
          days = defaultVariation?.days || null;
        } else {
          dataSize = null;
          updatedDataSizes = [];
          defualtVariations = [];
          defaultVariation = null;
          days = null;
          dataSizesVariations = null;
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        console.log("inside finally");

        console.log("serviceType", serviceType);
        console.log("size", size);
        console.log("dataSize", dataSize);
        console.log("days", days);
        console.log("dataSizes", updatedDataSizes);
        console.log("variations", defualtVariations);
        console.log("variation", defaultVariation);

        setDataSizes(updatedDataSizes);
        setVariations(defualtVariations);

        setSelectedOptions((prev) => ({
          ...prev,
          serviceType: serviceType,
          dataSize: dataSize,
          days: days,
          variation: defaultVariation,
        }));
      }
    };

    const groupByProductType = (variations) => {
      // V3
      const groupVariations = {};
      const addToTopupGroup = (key, item) => {
        let { productType, provider, dataSize } = item || {};
        provider = provider?.toUpperCase();
        if (!groupVariations[key]) {
          // check if parent level attb (T) exists
          groupVariations[key] = {};
        }
        if (!groupVariations[key][productType]) {
          // check if product type attb (S,E) exists
          groupVariations[key][productType] = {};
        }
        if (!groupVariations[key][productType][provider]) {
          // check if provider attb (cmi,tsim) exists
          groupVariations[key][productType][provider] = {};
        }
        if (!groupVariations[key][productType][provider][dataSize]) {
          // check if child level attb data size (1,2,500) exists
          groupVariations[key][productType][provider][dataSize] = [];
        }
        groupVariations[key][productType][provider][dataSize].push(item);
      };

      const addToGroup = (key, item) => {
        if (!groupVariations[key]) {
          // check if parent level attb (S,E,T) exists
          groupVariations[key] = {};
        }
        if (!groupVariations[key][item.dataSize]) {
          // check if child level attb data size (1,2,500) exists
          groupVariations[key][item.dataSize] = [];
        }
        groupVariations[key][item.dataSize].push(item); // push the varaition obj into its respective product and data size
      };

      const simEsimVariations = (variations) => {
        variations.forEach((item, index) => {
          const productType = item?.productType?.toUpperCase();
          const serviceType = item?.serviceType?.toUpperCase();
          if (serviceType === "BV") {
            addToGroup(productType, item);
            addToTopupGroup("T", item);
          } else if (serviceType === "T") {
            addToTopupGroup("T", item);
          } else {
            addToGroup(productType, item);
          }
        });
      };

      const pocketwifiVariations = (variations) => {
        variations.forEach((item, index) => {
          const productType = item?.productType?.toUpperCase();
          const serviceType = item?.serviceType?.toUpperCase();

          if (serviceType === "BV") {
            addToGroup("R", item);
            addToGroup("T", item);
          } else if (serviceType === "T") {
            addToGroup("T", item);
          } else if (serviceType === "B") {
            addToGroup("B", item);
          } else {
            addToGroup("R", item);
          }
        });
      };

      if (isSimEsim) {
        simEsimVariations(variations);
      } else {
        pocketwifiVariations(variations);
      }

      console.log("groupVariations", groupVariations);
      const sortedServiceTypes = Object.keys(groupVariations).sort((a, b) =>
        a.localeCompare(b),
      );

      setGroupVariations(groupVariations);
      setServiceTypes(sortedServiceTypes);
      const serviceType = sortedServiceTypes[0];
      getDefaultVariation({
        groupedVariations: groupVariations,
        serviceType,
      });
    };

    const getPlanVariations = useDisApi({
      apiCall: "getPlanVariations",
      setCallBack: (res) => {
        // let variations = res?.plan?.sort(sortByServiceType) || [];
        let variations = res?.plan || [];
        groupByProductType(variations);
      },
    });

    useEffect(() => {
      console.log("inside use effect", groupVariations);
      const isGroupVariationsExists = Object.keys(groupVariations);
      if (isGroupVariationsExists?.length) {
        console.log("selectedOptions", selectedOptions);

        const { serviceType, dataSize, variation } = selectedOptions;
        const { device_type, provider } = cart?.device || {};
        const sortedServiceTypes = isGroupVariationsExists.sort((a, b) =>
          a.localeCompare(b),
        );
        setServiceTypes(sortedServiceTypes);
        getDefaultVariation({
          groupedVariations: groupVariations,
          size: dataSize,
          variation: variation,
          serviceType,
          device_type,
          provider,
        });
      } else {
        const params = {
          planCode: cart.package.planCode,
        };
        // Add productType only for non-SIM devices
        if (config.deviceProductType) {
          params.productType = config.deviceProductType;
        }
        getPlanVariations(params);
      }
    }, []);

    useEffect(() => {
      if (user?.userId) {
        getDevices({ userId: user?.userId });
      }
    }, [user]);

    useEffect(() => {
      if (!isAuthModalOpen) {
        setTopupFlow(false);
      }
    }, [isAuthModalOpen]);

    const handleDeviceChange = (device) => {
      const { device_type, provider } = device || {};
      const { serviceType } = selectedOptions;
      setSelectedDevice(device);
      dispatch(setCartData({ device }));
      getDefaultVariation({
        groupedVariations: groupVariations,
        serviceType,
        device_type,
        provider,
      });
    };

    const handleServiceType = (serviceType) => {
      if (serviceType === "T") {
        if (Object.keys(user).length) {
          const { device_type, provider } = selectedDevice || {};
          setSelectedDevice(selectedDevice);
          getDefaultVariation({
            groupedVariations: groupVariations,
            serviceType,
            device_type,
            provider,
          });
        } else {
          setTopupFlow(true);
          dispatch(setSavedPath(null));
          setIsAuthDialogOpen(true);
        }
      } else {
        // setSelectedDevice(null);
        getDefaultVariation({
          groupedVariations: groupVariations,
          serviceType,
        });
      }
    };

    const handleDataSize = (data) => {
      const { device_type, provider } = selectedDevice || {};
      const serviceType = selectedOptions?.serviceType;
      getDefaultVariation({
        groupedVariations: groupVariations,
        size: data.value,
        serviceType,
        device_type,
        provider,
        isDataSizes: true,
      });
    };

    const handleDaysChange = (value) => {
      console.log("days", value);
      setSelectedOptions((prev) => ({
        ...prev,
        days: value.days,
        variation: value,
      }));
    };

    const handleCartQuantity = (value) => {
      dispatch(setCartData({ quantity: value }));
    };

    const handleDisable = () => {
      if (isTopUpFlow && !selectedDevice?.device_id) {
        return true;
      }

      // SIM doesn't need travel details validation
      if (config.type === "sim") {
        return !selectedOptions?.variation;
      }

      // For PocketWifi / Router:
      const travel = cart?.travelDetails;

      const hasValidTravelDetails =
        Array.isArray(travel) &&
        travel.length > 0 &&
        travel.every((i) => {
          const hasLoc = Boolean(i.locationCode);
          const hasStart = Boolean(i.startDate);
          if (singleDatePicker) {
            return hasLoc && hasStart;
          } else {
            const hasEnd = Boolean(i.endDate);
            return hasLoc && hasStart && hasEnd;
          }
        });

      return !selectedOptions?.variation || !hasValidTravelDetails;
    };
    const handleNext = () => {
      if (!Object.keys(user).length) {
        dispatch(setSavedPath(window.location.pathname));
        setIsAuthDialogOpen(true);
        return;
      }

      const cartUpdate = {
        groupVariations: groupVariations,
        variationData: selectedOptions,
        variation: selectedOptions.variation,
        dataSizes: dataSizes,
        planVariations: variations,
        cartType: selectedOptions.serviceType,
      };

      // SIM needs special handling for travel details. SIM ignores the
      // PocketWifi date picker and always builds a single travel row from the
      // selected country, so any leftover multi-row PocketWifi travelDetails
      // are fully replaced here and never reach the SIM order.
      if (config.type === "sim") {
        const planCountries = cart?.planCountriesList || [];

        // Use productCountry only if the SIM plan actually covers it,
        // otherwise fall back to the SIM plan's first supported country.
        let travelCountry = cart?.productCountry;
        const isCovered =
          travelCountry?.iso2 &&
          (planCountries.length === 0 ||
            planCountries.some((c) => c.countryCode === travelCountry.iso2));

        if (!isCovered) {
          travelCountry = planCountries[0]
            ? {
                iso2: planCountries[0].countryCode,
                name: planCountries[0].country,
              }
            : travelCountry;
        }

        cartUpdate.travelDetails = [
          {
            locationCode: travelCountry?.iso2,
            travelLocation: travelCountry?.name,
            startDate: dateformat(null),
            endDate: dateformat(null),
          },
        ];
        cartUpdate.device = selectedDevice;
      }

      dispatch(setCartData(cartUpdate));
      navigate(routes.planSummary);
    };

    const handlePrev = () => {
      // Preserve travelDetails (country + dates) so the user doesn't have to
      // re-enter them when they come back. Only reset the plan-variation
      // selection, which they'll re-pick on the plan page.
      dispatch(
        setCartData({
          variation: {},
          device: {},
          quantity: 1,
        }),
      );
      if (cart.compflowType) {
        navigate(routes.home);
      } else {
        navigate(routes.plan);
      }
    };

    // Get plan attributes
    const planAttbs = {
      planName:
        cart.userLanguage !== "en"
          ? cart.package?.trPlanName || cart.package?.planName
          : cart.package?.planName,
      nameAttributes:
        cart.userLanguage !== "en"
          ? cart.package?.trNameAttributes || cart.package?.nameAttributes
          : cart.package?.nameAttributes,
      description:
        cart.userLanguage !== "en"
          ? cart.package?.trDescription || cart.package?.description
          : cart.package?.description,
    };

    const {
      FooterComponent,
      DeviceComponent,
      DateComponent,
      DaysComponent,
      InfoComponent,
    } = config;

    // console.log("SERVICE_TYPE_REQUESTS_MAPPING", SERVICE_TYPE_REQUESTS_MAPPING);
    console.log("serviceTypesToDisplay", serviceTypes);
    console.log("groupVariations", groupVariations);
    // console.log("topupflow", topupFlow);

    return (
      <div
        className={cn("w-full flex flex-col gap-6 overflow-hidden", className)}
      >
        {/* Plan Header */}
        <div className="w-full flex flex-col gap-4">
          <h1
            className="text-base md:text-[26px] font-bold text-black-800"
            style={{ whiteSpace: "pre-line" }}
          >
            {planAttbs.planName || ""}
          </h1>
          <p
            className="text-base md:text-[16px] font-normal text-gray-400"
            style={{ whiteSpace: "pre-line" }}
          >
            {planAttbs.nameAttributes || t("extraText.connectsSeamlessly")}
          </p>

          {/* Country Coverage */}
          {((config.type === "sim" &&
            cart?.[t("simInformation.accordionData.items.1.content")]) ||
            (config.type !== "sim" && cart?.planCountriesList?.length > 0)) && (
            <p
              className="text-base md:text-[16px] font-normal text-black-800 border rounded-[12px] p-3 bg-[#FBFBFB]"
              style={{ whiteSpace: "pre-line" }}
            >
              <span className="font-bold">
                {t("extraText.countryCoverage")} <br />
              </span>
              {planCoverage(
                config.type === "sim"
                  ? cart?.[t("simInformation.accordionData.items.1.content")]
                  : cart?.planCountriesList || [],
              )}
            </p>
          )}
        </div>

        {/* Service Type Selection */}
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-base font-semibold text-black-700 md:text-[18px]">
            {config.type === "sim"
              ? t("extraText.simType")
              : t("extraText.service")}
          </h2>
          <div ref={emblaRef} className="w-full max-w-full overflow-hidden">
            <div className="flex items-center gap-4">
              {serviceTypes.length > 0 ? (
                serviceTypes.map((val) => (
                  <Button
                    key={"SERVICE_TYPE_" + val}
                    type="button"
                    className={cn(
                      "hover:bg-main-600 hover:text-white",
                      val === selectedOptions?.serviceType
                        ? "text-white font-semibold"
                        : "",
                    )}
                    variant={
                      val === selectedOptions?.serviceType
                        ? "default"
                        : "cancel"
                    }
                    onClick={() => handleServiceType(val)}
                  >
                    {t(SERVICE_TYPE_REQUESTS_MAPPING[val]?.translationKey)}
                  </Button>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  {serviceTypes.length === 0
                    ? t("extraText.loadingServiceTypes") ||
                      "Loading service types..."
                    : t("extraText.noServiceTypesAvailable") ||
                      "No service types available for this plan"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Device Selection for Top-up */}
        {(() => {
          // Calculate fromCart value (same logic as passed to DeviceComponent)
          const fromCartValue =
            config.type === "sim"
              ? "S"
              : isSimEsim
                ? cart?.package?.deviceType
                : "D";

          // Apply same filter as WifiDevices component (dataFilter logic)
          const filteredDevicesForDisplay = devices?.filter((dev) => {
            if (isSimEsimArray.includes(fromCartValue)) {
              // For SIM/eSIM: show devices where device_type !== "D"
              return dev.device_type !== "D";
            } else {
              // For Pocket WiFi: show devices where device_type === "D"
              return dev.device_type?.toUpperCase() === "D";
            }
          });

          // Debug: Check if selected device matches the filter
          const selectedDeviceMatchesFilter = cart?.device?.device_id
            ? filteredDevicesForDisplay?.some(
                (dev) => dev.device_id === cart.device.device_id,
              )
            : false;

          // Show "no devices" if filtered array is empty (matching WifiDevices component behavior)
          // BUT: Don't show if there's a selected device that matches the filter
          const shouldShowNoDevices =
            filteredDevicesForDisplay?.length === 0 &&
            !selectedDeviceMatchesFilter;

          return isTopUpFlow && DeviceComponent && user ? (
            <div className="space-y-3 pr-2 transition-all">
              {/* Always show device selection dropdown */}
              <div
                className={cn(
                  shouldScrollDevices
                    ? "max-h-[320px] overflow-y-auto"
                    : "overflow-visible",
                )}
              >
                <DeviceComponent
                  fromCart={fromCartValue}
                  item={cart.device}
                  onDeviceChange={handleDeviceChange}
                />
              </div>
              {/* Show warning message if no devices available */}
              {shouldShowNoDevices && <CartWarningMessage type="noDevices" />}
            </div>
          ) : null;
        })()}
        {/* Data Size Selection */}
        <div className="w-full flex flex-col gap-4 overflow-hidden">
          <h2 className="text-base font-semibold text-black-700 md:text-[18px]">
            {t("extraText.dataSize")}
          </h2>
          <div className="w-full max-w-full overflow-hidden">
            <div className="flex flex-wrap items-center gap-4">
              {dataSizes?.length > 0 ? (
                dataSizes?.map((data) => (
                  <Button
                    key={"DATA_SIZE_" + data.value + data.label}
                    type="button"
                    className={cn(
                      "hover:bg-main-600 hover:text-white",
                      data.value == selectedOptions?.dataSize
                        ? "text-white font-semibold"
                        : "",
                    )}
                    variant={
                      data.value === selectedOptions?.dataSize
                        ? "default"
                        : "cancel"
                    }
                    onClick={() => handleDataSize(data)}
                  >
                    {Number(data.value) >= 9999
                      ? t("extraText.unlimited") || "True Unlimited"
                      : data.value + data.label}
                  </Button>
                ))
              ) : selectedDevice == null ? (
                <div className="w-full flex flex-col gap-4">
                  {/* <div className="h-5 w-40 md:h-6 md:w-48 rounded bg-gray-300 " /> */}
                  <div className="w-full max-w-full overflow-hidden">
                    <div className="flex items-center gap-4">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div
                          key={index}
                          className="h-10 w-24 rounded-lg bg-gray-300 animate-pulse"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <CartWarningMessage type="noDataSize" />
              )}
            </div>
          </div>

          {/* Refurbished Device Warning */}
          {/* {config.showRefurbishedWarning &&
            currentCountry !== "jp" &&
            (serviceType === "BY" || selectedOptions?.serviceType === "B") && (
              <p className="text-[14px] font-bold text-red-500">
                {t("pocketwifiDeviceInfo.refurbishedDevice")}
              </p>
            )} */}
        </div>

        {/* Number of Days (SIM only) */}
        {DaysComponent && variations.length > 0 && (
          <DaysComponent
            data={variations.filter(
              (v, i, arr) => arr.findIndex((x) => x.days === v.days) === i,
            )}
            selectedOption={selectedOptions}
            onItemPress={handleDaysChange}
          />
        )}

        {/* Service Date Selection (PocketWifi/Router) */}
        {DateComponent && (
          <DateComponent
            singleDatePicker={singleDatePicker}
            multiCountry={multiCountry}
          />
        )}

        {/* Quantity Selection */}
        {!isTopUpFlow && (
          <CartQuantity
            max={10}
            defaultValue={cart?.quantity}
            setter={handleCartQuantity}
            label={config.quantityLabel}
            labelClass={config.type === "sim" ? "font-semibold" : undefined}
          />
        )}

        {/* Additional Info Component (SIM only) */}
        {InfoComponent && <InfoComponent item={cart.package} />}

        {/* Footer Navigation */}
        <FooterComponent
          prevHandler={handlePrev}
          nextHandler={handleNext}
          disableHandler={handleDisable}
        />
      </div>
    );
  };
}

export { createCartServiceComponent };
