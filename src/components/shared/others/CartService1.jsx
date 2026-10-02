// createCartServiceComponent.js - Factory for all cart service pages
import CartQuantity from "@/components/shared/others/CartQuantity";
import { Button } from "@/components/ui/button";
import {
  PLAN_TYPES_FOR_SINGLE_DATE_PICKER,
  SERVICE_TYPE_REQUESTS_MAPPING,
} from "@/constants/planTypes";
import { dateformat, useDisApi } from "@/general";
import { sortByServiceType, planCoverage } from "@/general/common.funcitons";
import useModal from "@/hooks/useModal";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { cn } from "@/lib/utils";
import { setSavedPath } from "@/store/module/auth/slice";
import { setCartData } from "@/store/module/cart/cartSlice";
import { setDevices } from "@/store/module/device/deviceSlice";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

// Helper to prioritize variations by product type
const prioritizeByProductType = (variations, preferredProductType) => {
  const map = new Map();

  variations.forEach((v) => {
    const key = `${v.dataSize}_${v.days || ""}`;
    const existing = map.get(key);

    if (!existing) {
      map.set(key, v);
    } else if (
      v.productType === preferredProductType &&
      existing.productType !== preferredProductType
    ) {
      map.set(key, v);
    }
  });

  return Array.from(map.values());
};

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
    const defaultServiceType = cart?.device?.device_id ? "T" : null;

    const [topupFlow, setTopupFlow] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState({
      serviceType: cart?.cartType || null,
      days: cart?.variation?.days || null,
      dataSize: cart?.variation?.dataSize || null,
      variation: cart?.variation || null,
    });

    const [groupVariations, setGroupVariations] = useState({});

    const [variations, setVariations] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(cart?.device || null);
    const [serviceTypes, setServiceTypes] = useState([]);
    const [filteredVariations, setFilteredVariations] = useState([]);
    const [dataSizes, setDataSizes] = useState(
      // cart.dataSizesList ||
      [],
    );
    const [daysList, setDaysList] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { setIsAuthDialogOpen } = useModal();
    const [emblaRef] = useEmblaCarousel({ align: "start" });

    const isTopUpFlow = selectedOptions?.serviceType === "T";
    const planType = cart?.package?.planType?.toUpperCase();
    const serviceType = cart?.package?.serviceType?.toUpperCase();

    const multiCountry = planType === "CN";
    const singleDatePicker =
      PLAN_TYPES_FOR_SINGLE_DATE_PICKER.includes(planType);

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

    // const getDefaultVariation = (serviceType, size) => {  // V1
    //   // console.log("serviceType", serviceType);

    //   console.log("size", size);

    //   let dataSize =
    //     size || Object.keys(groupVariations?.[serviceType])?.[0] || null;
    //   let dataSizes = groupVariations?.[serviceType]?.dataSizes || [];
    //   let defualtVariations = groupVariations?.[serviceType]?.[dataSize] || [];
    //   let defaultVariation = defualtVariations?.[0] || null;
    //   let days = defaultVariation?.days || null;

    //   console.log("serviceType", serviceType);
    //   console.log("dataSize", dataSize);
    //   console.log("dataSizes", dataSizes);
    //   console.log("variations", defualtVariations);

    //   return {
    //     dataSize,
    //     dataSizes,
    //     defualtVariations,
    //     defaultVariation,
    //     days,
    //   };
    // };

    // const getDefaultVariation = (dataSizesVariations, size) => {
    //   // V2
    //   const sizeKeys = Object.keys(dataSizesVariations); // (1GB,2GB,500MB)
    //   let dataSizes = sizeKeys.map((size, index) => ({
    //     label: dataSizesVariations[size]?.[0]?.desc,
    //     value: size,
    //   }));
    //   const [key, value] = Object.entries(dataSizesVariations)?.[0];
    //   let dataSize = size || key;
    //   let defualtVariations = value || [];
    //   let defaultVariation = defualtVariations?.[0] || null;
    //   let days = defaultVariation?.days || null;

    //   // console.log("serviceType", serviceType);
    //   console.log("size", size);
    //   console.log("key", key);
    //   console.log("value", value);
    //   console.log("dataSize", dataSize);
    //   console.log("dataSizes", dataSizes);
    //   console.log("variations", defualtVariations);

    //   return {
    //     dataSize,
    //     dataSizes,
    //     defualtVariations,
    //     defaultVariation,
    //     days,
    //   };
    // };

    const getDefaultVariation = (variationParams) => {
      // V3
      let dataSize = null;
      let updatedDataSizes = [];
      let defualtVariations = [];
      let defaultVariation = null;
      let days = null;

      let dataSizesVariations = null;
      let {
        serviceType,
        size,
        device_type,
        provider,
        groupedVariations,
        isDataSizes,
      } = variationParams;

      try {
        console.log("variationParams", variationParams);

        if (serviceType === "T") {
          dataSizesVariations =
            groupedVariations?.[serviceType]?.[device_type]?.[provider];
        } else {
          dataSizesVariations = groupedVariations?.[serviceType];
        }
        console.log("dataSizesVariations", dataSizesVariations);

        if (!isDataSizes) {
          console.log("isDataSizes");
          const sizeKeys = Object.keys(dataSizesVariations); // (1GB,2GB,500MB)
          updatedDataSizes = sizeKeys.map((size, index) => ({
            label: dataSizesVariations[size]?.[0]?.desc,
            value: size,
          }));
        }

        // const [key, value] = Object.entries(dataSizesVariations)?.[0];
        const key = size || Object.keys(dataSizesVariations)?.[0];
        const value = dataSizesVariations?.[key];
        dataSize = key;
        defualtVariations = value || [];
        defaultVariation = defualtVariations?.[0] || null;
        days = defaultVariation?.days || null;

        // console.log("serviceType", serviceType);
        console.log("size", size);
        console.log("key", key);
        console.log("value", value);
        console.log("dataSize", dataSize);
        console.log("dataSizes", dataSizes);
        console.log("variations", defualtVariations);
      } catch (error) {
        console.log("error", error);
      } finally {
        console.log("inside finally");

        return {
          dataSize,
          dataSizes: updatedDataSizes,
          defualtVariations,
          defaultVariation,
          days,
        };
      }
    };

    // const groupByProductType = (variations) => {  // Version 1
    //   // const serviceTypes = new Set();
    //   // const grouped = variations.reduce((acc, item) => {
    //   //   const key = item.productType;
    //   //   console.log("acc", acc);
    //   //   console.log("item", item);
    //   //   if (!acc[key]) acc[key] = [];  // create array if not exists
    //   //   acc[key].push(item);           // add the item to that array

    //   //   return acc;
    //   // }, {});

    //   // console.log("grouped", grouped);

    //   // const groupVariations = {
    //   //   S: {
    //   //     dataSizes: [],
    //   //     variations: []
    //   //   },
    //   //   E: {
    //   //     dataSizes: [],
    //   //     variations: []
    //   //   },
    //   //   T: {
    //   //     dataSizes: [],
    //   //     variations: []
    //   //   }
    //   // }

    //   const groupVariations = {};

    //   // const addToGroup = (key, item) => {   // 1st version
    //   //   if (!groupVariations[key]) {
    //   //     groupVariations[key] = { dataSizes: new Set(), variations: [] };
    //   //   }
    //   //   groupVariations[key].variations.push(item);
    //   //   groupVariations[key].dataSizes.add(item.dataSize);
    //   // };

    //   // const addToGroup = (key, item) => {   // 2nd Version
    //   //   if (!groupVariations[key]) {    // check if parent level attb (S,E,T) exists
    //   //     groupVariations[key] = { dataSizes: [] };
    //   //   }
    //   //   if (!groupVariations[key][item.dataSize]) { // check if child level attb data size (1,2,500) exists
    //   //     groupVariations[key][item.dataSize] = [];
    //   //   }
    //   //   groupVariations[key]["dataSizes"].push({
    //   //     label: item.desc,
    //   //     value: item.dataSize
    //   //   });
    //   //   groupVariations[key][item.dataSize].push(item); // push the varaition obj into its respective product and data size
    //   // };

    //   const addToTopupGroup = (key, item) => {
    //     const { productType, provider, dataSize } = item || {};
    //     if (!groupVariations[key]) {
    //       // check if parent level attb (T) exists
    //       groupVariations[key] = {};
    //     }
    //     if (!groupVariations[key][productType]) {
    //       // check if product typee attb (S,E) exists
    //       groupVariations[key][productType] = {};
    //     }
    //     if (!groupVariations[key][productType][provider]) {
    //       // check if product typee attb (S,E) exists
    //       groupVariations[key][productType][provider] = {};
    //     }
    //     if (!groupVariations[key][productType][provider][dataSize]) {
    //       // check if child level attb data size (1,2,500) exists
    //       groupVariations[key][productType][provider][dataSize] = [];
    //     }
    //     groupVariations[key][productType][provider][dataSize].push(item);
    //     // groupVariations[key][item.dataSize].push(item); // push the varaition obj into its respective product and data size
    //   };

    //   const addToGroup = (key, item) => {
    //     if (!groupVariations[key]) {
    //       // check if parent level attb (S,E,T) exists
    //       groupVariations[key] = {};
    //     }
    //     if (!groupVariations[key][item.dataSize]) {
    //       // check if child level attb data size (1,2,500) exists
    //       groupVariations[key][item.dataSize] = [];
    //     }
    //     groupVariations[key][item.dataSize].push(item); // push the varaition obj into its respective product and data size
    //   };

    //   console.log("variations", variations);

    //   variations.forEach((item, index) => {
    //     const productType = item?.productType?.toUpperCase();
    //     const serviceType = item?.serviceType?.toUpperCase();
    //     if (serviceType === "BV") {
    //       addToGroup(productType, item);
    //       // addToGroup("T", item);
    //       addToTopupGroup("T", item);
    //     } else if (serviceType === "R") {
    //       addToGroup(productType, item);
    //     } else if (serviceType === "T") {
    //       // addToGroup("T", item);
    //       addToTopupGroup("T", item);
    //     }
    //   });
    //   console.log("groupVariations", groupVariations);

    //   const productKeys = Object.keys(groupVariations); // (S,E,T)
    //   console.log("productKeys", productKeys);

    //   productKeys.map((key, index) => {
    //     const sizeKeys = Object.keys(groupVariations[key]); // (1GB,2GB,500MB)
    //     groupVariations[key]["dataSizes"] = [];
    //     sizeKeys.map((size, index) => {
    //       groupVariations[key]["dataSizes"].push({
    //         label: groupVariations[key][size]?.[0]?.desc,
    //         value: size,
    //       });
    //     });
    //   });

    //   // groupVariations[key]["dataSizes"].push({
    //   //   label: item.desc,
    //   //   value: item.dataSize
    //   // });

    //   // if (groupVariations["E"]?.dataSizes) {
    //   // const arr = [...(groupVariations["E"]?.dataSizes || [])];
    //   // console.log("arr", arr);
    //   // }
    //   // const arr = [...groupVariations["E"]?.dataSizes];
    //   //

    //   const sortedServiceTypes = Object.keys(groupVariations).sort((a, b) =>
    //     a.localeCompare(b),
    //   );

    //   const serviceType = sortedServiceTypes[0];
    //   const dataSize = Object.keys(groupVariations?.[serviceType])?.[0] || null;
    //   const dataSizes = groupVariations?.[serviceType]?.dataSizes || [];
    //   const defualtVariations =
    //     groupVariations?.[serviceType]?.[dataSize] || [];
    //   const defaultVariation = defualtVariations?.[0] || null;
    //   const days = defaultVariation?.days || null;

    //   console.log("serviceType", serviceType);
    //   console.log("dataSize", dataSize);
    //   console.log("dataSizes", dataSizes);
    //   console.log("variations", defualtVariations);

    //   setGroupVariations(groupVariations);
    //   setServiceTypes(sortedServiceTypes);
    //   setDataSizes(dataSizes);
    //   setVariations(defualtVariations);

    //   if (sortedServiceTypes.length > 0 && !selectedOptions.serviceType) {
    //     setSelectedOptions((prev) => ({
    //       ...prev,
    //       serviceType: serviceType,
    //       dataSize: dataSize,
    //       days: days,
    //       variation: defaultVariation,
    //     }));
    //   }
    // };

    // const groupByProductType = (variations) => {    // Version 2 with sub keys for topup
    //   // const serviceTypes = new Set();
    //   // const grouped = variations.reduce((acc, item) => {
    //   //   const key = item.productType;
    //   //   console.log("acc", acc);
    //   //   console.log("item", item);
    //   //   if (!acc[key]) acc[key] = [];  // create array if not exists
    //   //   acc[key].push(item);           // add the item to that array

    //   //   return acc;
    //   // }, {});

    //   // console.log("grouped", grouped);

    //   // const groupVariations = {
    //   //   S: {
    //   //     dataSizes: [],
    //   //     variations: []
    //   //   },
    //   //   E: {
    //   //     dataSizes: [],
    //   //     variations: []
    //   //   },
    //   //   T: {
    //   //     dataSizes: [],
    //   //     variations: []
    //   //   }
    //   // }

    //   const groupVariations = {};

    //   // const addToGroup = (key, item) => {   // 1st version
    //   //   if (!groupVariations[key]) {
    //   //     groupVariations[key] = { dataSizes: new Set(), variations: [] };
    //   //   }
    //   //   groupVariations[key].variations.push(item);
    //   //   groupVariations[key].dataSizes.add(item.dataSize);
    //   // };

    //   // const addToGroup = (key, item) => {   // 2nd Version
    //   //   if (!groupVariations[key]) {    // check if parent level attb (S,E,T) exists
    //   //     groupVariations[key] = { dataSizes: [] };
    //   //   }
    //   //   if (!groupVariations[key][item.dataSize]) { // check if child level attb data size (1,2,500) exists
    //   //     groupVariations[key][item.dataSize] = [];
    //   //   }
    //   //   groupVariations[key]["dataSizes"].push({
    //   //     label: item.desc,
    //   //     value: item.dataSize
    //   //   });
    //   //   groupVariations[key][item.dataSize].push(item); // push the varaition obj into its respective product and data size
    //   // };

    //   const addToTopupGroup = (key, item) => {
    //     const { productType, provider, dataSize } = item || {};
    //     if (!groupVariations[key]) {
    //       // check if parent level attb (T) exists
    //       groupVariations[key] = {};
    //     }
    //     if (!groupVariations[key][productType]) {
    //       // check if product typee attb (S,E) exists
    //       groupVariations[key][productType] = {};
    //     }
    //     if (!groupVariations[key][productType][provider]) {
    //       // check if product typee attb (S,E) exists
    //       groupVariations[key][productType][provider] = {};
    //     }
    //     if (!groupVariations[key][productType][provider][dataSize]) {
    //       // check if child level attb data size (1,2,500) exists
    //       groupVariations[key][productType][provider][dataSize] = [];
    //     }
    //     groupVariations[key][productType][provider][dataSize].push(item);
    //     // groupVariations[key][item.dataSize].push(item); // push the varaition obj into its respective product and data size
    //   };

    //   const addToGroup = (key, item) => {
    //     if (!groupVariations[key]) {
    //       // check if parent level attb (S,E,T) exists
    //       groupVariations[key] = {};
    //     }
    //     if (!groupVariations[key][item.dataSize]) {
    //       // check if child level attb data size (1,2,500) exists
    //       groupVariations[key][item.dataSize] = [];
    //     }
    //     groupVariations[key][item.dataSize].push(item); // push the varaition obj into its respective product and data size
    //   };

    //   console.log("variations", variations);

    //   variations.forEach((item, index) => {
    //     const productType = item?.productType?.toUpperCase();
    //     const serviceType = item?.serviceType?.toUpperCase();
    //     if (serviceType === "BV") {
    //       addToGroup(productType, item);
    //       // addToGroup("T", item);
    //       addToTopupGroup("T", item);
    //     } else if (serviceType === "R") {
    //       addToGroup(productType, item);
    //     } else if (serviceType === "T") {
    //       // addToGroup("T", item);
    //       addToTopupGroup("T", item);
    //     }
    //   });
    //   console.log("groupVariations", groupVariations);

    //   const productKeys = Object.keys(groupVariations); // (S,E,T)
    //   console.log("productKeys", productKeys);

    //   productKeys.map((key, index) => {
    //     if (key === "T") {
    //       const subProductKeys = Object.keys(groupVariations[key])
    //       subProductKeys.map((subKey, index) => {    // (S,E)

    //       })

    //       const sizeKeys = Object.keys(groupVariations[key]); // (1GB,2GB,500MB)
    //       groupVariations[key]["dataSizes"] = [];
    //       sizeKeys.map((size, index) => {
    //         groupVariations[key]["dataSizes"].push({
    //           label: groupVariations[key][size]?.[0]?.desc,
    //           value: size,
    //         });
    //       });
    //     }
    //     else {
    //       const sizeKeys = Object.keys(groupVariations[key]); // (1GB,2GB,500MB)
    //       groupVariations[key]["dataSizes"] = [];
    //       sizeKeys.map((size, index) => {
    //         groupVariations[key]["dataSizes"].push({
    //           label: groupVariations[key][size]?.[0]?.desc,
    //           value: size,
    //         });
    //       });
    //     }
    //   });

    //   // groupVariations[key]["dataSizes"].push({
    //   //   label: item.desc,
    //   //   value: item.dataSize
    //   // });

    //   // if (groupVariations["E"]?.dataSizes) {
    //   // const arr = [...(groupVariations["E"]?.dataSizes || [])];
    //   // console.log("arr", arr);
    //   // }
    //   // const arr = [...groupVariations["E"]?.dataSizes];
    //   //

    //   const sortedServiceTypes = Object.keys(groupVariations).sort((a, b) =>
    //     a.localeCompare(b),
    //   );

    //   const serviceType = sortedServiceTypes[0];
    //   const dataSize = Object.keys(groupVariations?.[serviceType])?.[0] || null;
    //   const dataSizes = groupVariations?.[serviceType]?.dataSizes || [];
    //   const defualtVariations =
    //     groupVariations?.[serviceType]?.[dataSize] || [];
    //   const defaultVariation = defualtVariations?.[0] || null;
    //   const days = defaultVariation?.days || null;

    //   console.log("serviceType", serviceType);
    //   console.log("dataSize", dataSize);
    //   console.log("dataSizes", dataSizes);
    //   console.log("variations", defualtVariations);

    //   setGroupVariations(groupVariations);
    //   setServiceTypes(sortedServiceTypes);
    //   setDataSizes(dataSizes);
    //   setVariations(defualtVariations);

    //   if (sortedServiceTypes.length > 0 && !selectedOptions.serviceType) {
    //     setSelectedOptions((prev) => ({
    //       ...prev,
    //       serviceType: serviceType,
    //       dataSize: dataSize,
    //       days: days,
    //       variation: defaultVariation,
    //     }));
    //   }
    // };

    const groupByProductType = (variations) => {
      // Version 3

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

      // console.log("variations", variations);

      variations.forEach((item, index) => {
        const productType = item?.productType?.toUpperCase();
        const serviceType = item?.serviceType?.toUpperCase();
        if (serviceType === "BV") {
          addToGroup(productType, item);
          // addToGroup("T", item);
          addToTopupGroup("T", item);
        } else if (serviceType === "R") {
          addToGroup(productType, item);
        } else if (serviceType === "T") {
          // addToGroup("T", item);
          addToTopupGroup("T", item);
        }
      });
      console.log("groupVariations", groupVariations);

      const sortedServiceTypes = Object.keys(groupVariations).sort((a, b) =>
        a.localeCompare(b),
      );

      const serviceType = sortedServiceTypes[0];
      let defaultDetail = getDefaultVariation({
        groupedVariations: groupVariations,
        serviceType,
      });
      let { defualtVariations, defaultVariation, days, dataSize, dataSizes } =
        defaultDetail;

      setGroupVariations(groupVariations);
      setServiceTypes(sortedServiceTypes);
      setDataSizes(dataSizes);
      setVariations(defualtVariations);

      if (sortedServiceTypes.length > 0 && !selectedOptions.serviceType) {
        setSelectedOptions((prev) => ({
          ...prev,
          serviceType: serviceType,
          dataSize: dataSize,
          days: days,
          variation: defaultVariation,
        }));
      }
    };

    const getPlanVariations = useDisApi({
      apiCall: "getPlanVariations",
      setCallBack: (res) => {
        // let variations = res?.plan?.sort(sortByServiceType) || [];
        let variations = res?.plan || [];

        // Filter by provider for SIM if device already selected
        if (config.type === "sim" && cart?.device?.provider) {
          // variations = variations.filter(
          //   (v) =>
          //     v.provider?.toLowerCase() === cart.device.provider?.toLowerCase(),
          // );
        }
        groupByProductType(variations);
        // setVariations(variations);
        // setSelectedOptions((prev) => ({
        //   ...prev,
        //   serviceType: defaultServiceType || prev.serviceType,
        // }));
      },
    });

    // Initialize
    useEffect(() => {
      console.log("inside plans");
      if (!planVariations.length) {
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
      console.log("inside user effect", user);
      if (user?.userId) {
        // if (topupFlow) {
        //   handleVariationDetails("T");
        //   // setSelectedOptions((prev) => ({
        //   //   ...prev,
        //   //   serviceType: "T",
        //   //   // dataSize: dataSize,
        //   //   // days: days,
        //   //   // variation: defaultVariation,
        //   // }));
        // }
        getDevices({ userId: user?.userId });
      }
    }, [user]);

    // useEffect(() => {
    //   console.log("inside devoice");
    //   setSelectedDevice(cart.device);
    //   // handleTopupVariations(selectedOptions.serviceType, cart.device)
    // }, [cart.device]);

    // Determine service types to display
    // useEffect(() => {
    //   if (cart?.device?.device_id && !user) {
    //     dispatch(setSavedPath(null));
    //     setIsAuthDialogOpen(true);
    //     return;
    //   }

    //   const serviceTypes = new Set();
    //   variations.forEach((variation) => {
    //     if (config.type === "sim" || isSimEsim) {
    //       // SIM/eSIM logic
    //       if (variation.productType === "S" || variation.productType === "E") {
    //         serviceTypes.add(variation.productType);
    //       }
    //       if (variation.serviceType === "BV") {
    //         serviceTypes.add("S");
    //         serviceTypes.add("E");
    //       }
    //       serviceTypes.add("T");
    //     } else {
    //       // PocketWifi/Router logic
    //       if (variation.serviceType === "B" || variation.serviceType === "T") {
    //         serviceTypes.add(variation.serviceType);
    //       } else if (variation.serviceType === "R" || !variation.serviceType) {
    //         serviceTypes.add("R");
    //         serviceTypes.add("T");
    //       }
    //     }
    //   });

    //   const sortedServiceTypes = [...serviceTypes].sort((a, b) =>
    //     a.localeCompare(b),
    //   );

    //   setServiceTypesToDisplay(sortedServiceTypes);

    //   if (sortedServiceTypes.length > 0 && !selectedOptions.serviceType) {
    //     setSelectedOptions((prev) => ({
    //       ...prev,
    //       serviceType: sortedServiceTypes[0],
    //       dataSize: null,
    //       days: null,
    //       variation: null,
    //     }));
    //   }
    // }, [variations, user]);

    // Update data sizes list
    // const updateDataSizesList = (variations) => {
    //   let uniqueDataSizes = [];

    //   if (config.type === "sim") {
    //     // SIM: Simple unique by dataSize
    //     const uniqueDataSizesMap = new Map();
    //     variations.forEach((v) => {
    //       if (!uniqueDataSizesMap.has(Number(v.dataSize))) {
    //         uniqueDataSizesMap.set(Number(v.dataSize), v);
    //       }
    //     });
    //     uniqueDataSizes = Array.from(uniqueDataSizesMap.values());
    //   } else {
    //     // PocketWifi/Router: Complex prioritization logic
    //     variations.forEach((variation) => {
    //       const existingIndex = uniqueDataSizes.findIndex(
    //         (v) => v.dataSize === variation.dataSize,
    //       );

    //       if (selectedOptions.serviceType === "S") {
    //         if (existingIndex === -1) {
    //           uniqueDataSizes.push(variation);
    //         } else if (
    //           uniqueDataSizes[existingIndex].productType !== "S" &&
    //           variation.productType === "S"
    //         ) {
    //           uniqueDataSizes[existingIndex] = variation;
    //         }
    //       } else if (selectedOptions.serviceType === "E") {
    //         if (existingIndex === -1) {
    //           uniqueDataSizes.push(variation);
    //         } else if (
    //           uniqueDataSizes[existingIndex].productType !== "E" &&
    //           variation.productType === "E"
    //         ) {
    //           uniqueDataSizes[existingIndex] = variation;
    //         }
    //       } else if (selectedOptions.serviceType === "B") {
    //         if (existingIndex === -1) {
    //           uniqueDataSizes.push(variation);
    //         } else if (uniqueDataSizes[existingIndex].serviceType === "K") {
    //           uniqueDataSizes[existingIndex] = variation;
    //         }
    //       } else if (selectedOptions.serviceType === "R") {
    //         if (existingIndex === -1) {
    //           uniqueDataSizes.push(variation);
    //         } else if (
    //           uniqueDataSizes[existingIndex].serviceType === "R" ||
    //           !uniqueDataSizes[existingIndex].serviceType
    //         ) {
    //           uniqueDataSizes[existingIndex] = variation;
    //         }
    //       } else if (selectedOptions.serviceType === "T" && selectedDevice) {
    //         if (isSimEsim) {
    //           if (existingIndex === -1) {
    //             uniqueDataSizes.push(variation);
    //           } else if (
    //             uniqueDataSizes[existingIndex].productType !==
    //             selectedDevice.device_type &&
    //             variation.productType === selectedDevice.device_type
    //           ) {
    //             uniqueDataSizes[existingIndex] = variation;
    //           }
    //         } else {
    //           if (existingIndex === -1) {
    //             uniqueDataSizes.push(variation);
    //           } else if (variation.serviceType === "T") {
    //             uniqueDataSizes[existingIndex] = variation;
    //           }
    //         }
    //       } else {
    //         if (existingIndex === -1) {
    //           uniqueDataSizes.push(variation);
    //         }
    //       }
    //     });
    //   }

    //   // Sort by dataSize
    //   uniqueDataSizes.sort((a, b) => Number(a.dataSize) - Number(b.dataSize));

    //   // Filter by provider for top-up
    //   if (selectedOptions.serviceType === "T" && selectedDevice?.provider) {
    //     uniqueDataSizes = uniqueDataSizes.filter(
    //       (v) =>
    //         v.provider?.toUpperCase() ===
    //         selectedDevice.provider?.toUpperCase(),
    //     );
    //   }

    //   setDataSizesList(uniqueDataSizes);

    //   // Set default for non-SIM (PocketWifi/Router)
    //   if (config.type !== "sim") {
    //     const defaultVariation = uniqueDataSizes?.[0] || null;
    //     setSelectedOptions((prev) => ({
    //       ...prev,
    //       dataSize: defaultVariation?.dataSize || null,
    //       days: defaultVariation?.days || null,
    //       variation: defaultVariation,
    //     }));
    //   } else {
    //     setSelectedOptions((prev) => ({
    //       ...prev,
    //       dataSize: null,
    //       days: null,
    //       variation: null,
    //     }));
    //   }
    // };

    // Filter variations based on service type
    // useEffect(() => {
    //   let variations = [...variations];

    //   // Filter by provider if device is selected (SIM)
    //   if (config.type === "sim" && selectedDevice?.provider) {
    //     variations = variations.filter(
    //       (v) =>
    //         v.provider?.toLowerCase() ===
    //         selectedDevice.provider?.toLowerCase(),
    //     );
    //   }

    //   // Filter by service type
    //   // if (selectedOptions.serviceType === "S") {
    //   //   variations = variations.filter(
    //   //     (v) => v.productType === "S" || v.serviceType === "BV",
    //   //   );
    //   //   if (config.type === "sim") {
    //   //     variations = prioritizeByProductType(variations, "S");
    //   //   }
    //   // } else if (selectedOptions.serviceType === "E") {
    //   //   variations = variations.filter(
    //   //     (v) => v.productType === "E" || v.serviceType === "BV",
    //   //   );
    //   //   if (config.type === "sim") {
    //   //     variations = prioritizeByProductType(variations, "E");
    //   //   }
    //   // } else if (selectedOptions.serviceType === "B") {
    //   //   variations = variations.filter((v) => v.serviceType === "B");
    //   // } else if (selectedOptions.serviceType === "R") {
    //   //   variations = variations.filter(
    //   //     (v) => v.serviceType === "R" || !v.serviceType,
    //   //   );
    //   // } else if (selectedOptions.serviceType === "T") {
    //   //   if (config.type === "sim" && selectedDevice) {
    //   //     variations = variations.filter(
    //   //       (v) =>
    //   //         v.productType === selectedDevice?.device_type ||
    //   //         v.serviceType === "BV",
    //   //     );
    //   //     variations = prioritizeByProductType(
    //   //       variations,
    //   //       selectedDevice?.device_type || "",
    //   //     );
    //   //   } else if (!isSimEsim) {
    //   //     variations = variations.filter((v) => v.serviceType !== "B");
    //   //   } else if (selectedDevice) {
    //   //     variations = variations.filter(
    //   //       (v) =>
    //   //         v.productType === selectedDevice.device_type ||
    //   //         v.serviceType === "BV",
    //   //     );
    //   //   }
    //   // }

    //   // setFilteredVariations(variations);
    //   // updateDataSizesList(variations);
    // }, [variations, selectedOptions.serviceType, selectedDevice]);

    // Update days list when data size changes (SIM only)
    // useEffect(() => {
    //   if (config.hasDaysSelection && selectedOptions.dataSize) {
    //     const daysOptions = filteredVariations
    //       .filter((v) => v.dataSize === selectedOptions.dataSize)
    //       .filter((v, i, arr) => arr.findIndex((d) => d.days === v.days) === i)
    //       .sort((a, b) => a.days - b.days);

    //     setDaysList(daysOptions);
    //     setSelectedOptions((prev) => ({
    //       ...prev,
    //       days: null,
    //       variation: null,
    //     }));
    //   } else {
    //     setDaysList([]);
    //   }
    // }, [selectedOptions.dataSize, filteredVariations]);

    // Update variation when days change (SIM only)
    // useEffect(() => {
    //   if (config.hasDaysSelection) {
    //     if (!selectedOptions.days) {
    //       setSelectedOptions((prev) => ({ ...prev, variation: null }));
    //     } else {
    //       const newVariation = daysList.find(
    //         (v) => v.days === selectedOptions.days,
    //       );
    //       setSelectedOptions((prev) => ({ ...prev, variation: newVariation }));
    //     }
    //   }
    // }, [selectedOptions.days, daysList]);

    // Update selected device in cart

    // useEffect(() => {
    //   console.log("inside selected devoice", selectedDevice);

    //   if (selectedDevice) {
    //     dispatch(setCartData({ selectedDevice: selectedDevice }));
    //   }
    // }, [selectedDevice]);

    useEffect(() => {
      // console.log("inside auth dialog", isAuthModalOpen);
      if (!isAuthModalOpen) {
        setTopupFlow(false);
      }
    }, [isAuthModalOpen]);

    const handleDeviceChange = (device) => {
      console.log("device", device);

      setSelectedDevice(device);
      dispatch(setCartData({ device }));
      handleTopupVariations(selectedOptions.serviceType, device);

      // setSelectedOptions((prev) => ({
      //   ...prev,
      //   dataSize: null,
      //   days: null,
      //   variation: null,
      // }));
    };

    const handleProductVariations = (serviceType) => {
      // console.log("serviceType", serviceType);

      let defaultDetail = getDefaultVariation({
        groupedVariations: groupVariations,
        serviceType,
      });
      let { defualtVariations, defaultVariation, days, dataSize, dataSizes } =
        defaultDetail;

      console.log("serviceType", serviceType);
      console.log("dataSize", dataSize);
      console.log("dataSizes", dataSizes);
      console.log("variations", defualtVariations);

      setDataSizes(dataSizes);
      setVariations(defualtVariations);
      setSelectedOptions((prev) => ({
        ...prev,
        serviceType: serviceType,
        dataSize: dataSize,
        days: days,
        variation: defaultVariation,
      }));
    };

    const handleTopupVariations = (serviceType, device) => {
      const { device_type, provider } = device || {};
      // console.log("serviceType", serviceType);
      // console.log("device type", device_type);
      // console.log("provider", provider);
      if (device_type && provider) {
        // const dataSizesVariations =
        //   groupVariations?.[serviceType]?.[device_type]?.[provider];
        // console.log("dataSizesVariations", dataSizesVariations);

        let defaultDetail = getDefaultVariation({
          groupedVariations: groupVariations,
          serviceType,
          device_type,
          provider,
        });
        let { defualtVariations, defaultVariation, days, dataSize, dataSizes } =
          defaultDetail;

        // defualtVariations = defualtVariations?.filter(
        //   (variation) =>
        //     variation?.productType?.toUpperCase() ===
        //     device_type?.toUpperCase() &&
        //     variation?.provider?.toUpperCase() === provider?.toUpperCase(),
        // );
        // if (defualtVariations.length === 0) {
        //   dataSizes = [];
        // }
        // defaultVariation = defualtVariations?.[0] || null;
        // days = defaultVariation?.days || null;

        // console.log("serviceType", serviceType);
        // console.log("dataSize", dataSize);
        // console.log("dataSizes", dataSizes);
        // console.log("variations", defualtVariations);

        setDataSizes(dataSizes);
        setVariations(defualtVariations);
        setSelectedOptions((prev) => ({
          ...prev,
          serviceType: serviceType,
          dataSize: dataSize,
          days: days,
          variation: defaultVariation,
        }));
      } else {
        setDataSizes([]);
        setSelectedOptions((prev) => ({
          ...prev,
          serviceType: "T",
          dataSize: null,
          days: null,
          variation: null,
        }));
      }
    };

    // const handleTopupVariations = (serviceType, device) => {
    //   console.log("serviceType", serviceType);
    //   const { device_type, provider } = device || {};

    //   console.log("dev", device_type, provider);

    //   let defaultDetail = getDefaultVariation(serviceType);
    //   let { defualtVariations, defaultVariation, days, dataSize, dataSizes } =
    //     defaultDetail;

    //   defualtVariations = defualtVariations?.filter(
    //     (variation) =>
    //       variation?.productType?.toUpperCase() ===
    //       device_type?.toUpperCase() &&
    //       variation?.provider?.toUpperCase() === provider?.toUpperCase(),
    //   );
    //   if (defualtVariations.length === 0) {
    //     dataSizes = [];
    //   }
    //   defaultVariation = defualtVariations?.[0] || null;
    //   days = defaultVariation?.days || null;

    //   console.log("serviceType", serviceType);
    //   console.log("dataSize", dataSize);
    //   console.log("dataSizes", dataSizes);
    //   console.log("variations", defualtVariations);

    //   setDataSizes(dataSizes);
    //   setVariations(defualtVariations);
    //   setSelectedOptions((prev) => ({
    //     ...prev,
    //     serviceType: serviceType,
    //     dataSize: dataSize,
    //     days: days,
    //     variation: defaultVariation,
    //   }));
    // };

    const handleServiceType = (serviceType) => {
      if (serviceType === "T") {
        if (Object.keys(user).length) {
          setSelectedDevice(cart?.device);
          handleTopupVariations(serviceType, cart.device);
        } else {
          setTopupFlow(true);
          dispatch(setSavedPath(null));
          setIsAuthDialogOpen(true);
        }
      } else {
        setSelectedDevice(null);
        handleProductVariations(serviceType);
      }

      // if (serviceType !== cart?.variation?.serviceType) {
      //   dispatch(setCartData({ variation: {} }));
      // }
    };

    const handleDataSize = (data) => {
      console.log("dddddddd", data);
      const { device_type, provider } = cart?.device || {};

      const serviceType = selectedOptions?.serviceType;
      let defaultDetail = getDefaultVariation({
        groupedVariations: groupVariations,
        size: data.value,
        serviceType,
        device_type,
        provider,
        isDataSizes: true,
      });
      let { defualtVariations, defaultVariation, days, dataSize, dataSizes } =
        defaultDetail;

      // if (serviceType === "T") {
      //   defualtVariations = defualtVariations?.filter(
      //     (variation) =>
      //       variation?.productType?.toUpperCase() ===
      //         device_type?.toUpperCase() &&
      //       variation?.provider?.toUpperCase() === provider?.toUpperCase(),
      //   );
      //   if (defualtVariations.length === 0) {
      //     dataSizes = [];
      //   }
      //   defaultVariation = defualtVariations?.[0] || null;
      //   days = defaultVariation?.days || null;
      // }

      console.log("serviceType", serviceType);
      console.log("dataSize", dataSize);
      console.log("variations", defualtVariations);

      setVariations(defualtVariations);
      console.log("config", config.type);

      if (config.type === "sim") {
        setSelectedOptions((prev) => ({
          ...prev,
          dataSize: dataSize,
          days: days,
          variation: defaultVariation,
        }));
      } else {
        setSelectedOptions((prev) => ({
          ...prev,
          dataSize: data.value,
          days: data?.days,
          variation: data,
        }));
      }
    };

    const handleDaysChange = (value) => {
      console.log("days", value);

      setSelectedOptions((prev) => ({
        ...prev,
        days: value.days,
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

      // PocketWifi/Router need travel details
      const locationWithMissingInfo = cart?.travelDetails?.find((i) => {
        if (singleDatePicker) {
          return !i.startDate || !i.locationCode;
        } else {
          return !i.startDate || !i.endDate || !i.locationCode;
        }
      });

      return !selectedOptions?.variation || Boolean(locationWithMissingInfo);
    };

    const handleNext = () => {
      if (!Object.keys(user).length) {
        dispatch(setSavedPath(window.location.pathname));
        setIsAuthDialogOpen(true);
        return;
      }

      const cartUpdate = {
        variation: selectedOptions.variation,
        dataSizes: dataSizes,
        planVariations: variations,
        cartType: selectedOptions.serviceType,
      };

      // SIM needs special handling for travel details
      if (config.type === "sim") {
        cartUpdate.travelDetails = [
          {
            locationCode: cart?.productCountry?.iso2,
            travelLocation: cart?.productCountry?.name,
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
      dispatch(setCartData({ variation: {}, device: {}, quantity: 1 }));
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
    // console.log("serviceTypesToDisplay", serviceTypesToDisplay);

    // console.log("topupflow", topupFlow);
    // console.log("user", Object.keys(user).length);
    // console.log("devices", devices);

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
              {serviceTypes.map((val) => (
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
                    val === selectedOptions?.serviceType ? "default" : "cancel"
                  }
                  onClick={() => handleServiceType(val)}
                >
                  {t(SERVICE_TYPE_REQUESTS_MAPPING[val]?.translationKey)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Device Selection for Top-up */}
        {isTopUpFlow && user && DeviceComponent && (
          <DeviceComponent
            fromCart={
              config.type === "sim"
                ? "S"
                : isSimEsim
                  ? cart?.package?.deviceType
                  : "D"
            }
            onDeviceChange={
              config.type === "sim" ? handleDeviceChange : undefined
            }
          />
        )}

        {/* Data Size Selection */}
        <div className="w-full flex flex-col gap-4 overflow-hidden">
          <h2 className="text-base font-semibold text-black-700 md:text-[18px]">
            {t("extraText.dataSize")}
          </h2>
          <div className="w-full max-w-full overflow-hidden">
            <div className="flex flex-wrap items-center gap-4">
              {dataSizes?.map((data) => (
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
                  {data.value + data.label}
                </Button>
              ))}
              {/* {groupVariations?.[selectedOptions?.serviceType]?.dataSizes?.map((val) => ( */}
              {/* {dataSizes?.map((val) => (
                <Button
                  // key={"DATA_SIZE_" + val.dataSize + val.desc}
                  key={"DATA_SIZE_" + val.dataSize + val.desc}
                  type="button"
                  className={cn(
                    "hover:bg-main-600 hover:text-white",
                    val.dataSize === selectedOptions?.dataSize
                      ? "text-white font-semibold"
                      : "",
                  )}
                  variant={
                    val.dataSize === selectedOptions?.dataSize
                      ? "default"
                      : "cancel"
                  }
                  onClick={() => handleDataSize(val)}
                >
                  {val.dataSize + val.desc}
                </Button>
              ))} */}
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
            data={variations}
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
