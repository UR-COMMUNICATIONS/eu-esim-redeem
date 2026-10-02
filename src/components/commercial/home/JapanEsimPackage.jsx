import InternetPackageCard from "@/components/shared/cards/InternetPackageCard";
import Loader from "@/components/shared/Loader";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { useDisApi } from "@/general";
import useLocalPlan from "@/hooks/useLocalPlan";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { setUserData } from "@/store/module/auth/slice";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const DeviceTypeEnum = {
    Esim: "E",
    Sim: "S",
    PocketDevice: "D",
};

const computeFilteredPackages = (packagesList, selected) => {
    // Default to Pocket Device ("D") if selected is null, undefined, or empty.
    const defaultFilter = DeviceTypeEnum.PocketDevice;
    const filterValue =
        Array.isArray(selected) && selected.length > 0
            ? selected[0]
            : defaultFilter;

    // If "All" is selected, return every package.
    if (filterValue === "A") {
        return packagesList;
    }

    return packagesList.filter(({ deviceType }) => {
        // When "Sim" is selected, include both Sim and Esim packages.
        if (filterValue === DeviceTypeEnum.Sim) {
            return (
                deviceType === DeviceTypeEnum.Sim || deviceType === DeviceTypeEnum.Esim
            );
        }
        // Otherwise, return only packages matching the filterValue.
        return deviceType === filterValue;
    });
};

function JapanEsimPackage() {
    // useExternalPromo();
    const { user } = useSelector((state) => state.auth);
    // const { packages } = useSelector((state) => state.plan);
    const packages = [
        {
            "currency": "SGD",
            "partnerType": "NORMAL",
            "partnerId": "admin@yourwifi.co",
            "days": 30,
            "rate": 15,
            "minCharges": 0.0,
            "active": 1,
            "limit": 10240,
            "planCode": "KDDIUNLESIM",
            "planName": "eSIM Japan Unlimited Data",
            "planType": "V",
            "serviceType": "RT",
            "deviceType": "E",
            "priority": 1,
            "description": "We offer the best and easiest way for you to purchase and install your eSIM\n\nThis is a data-only eSIM\n\neSIM\nQR code and instructions to install eSIM will be shared upon purchasing.\n\nData Validity\nStarts upon first use in travel country.\n\nLocal Telco Company\nConnection speed will depends on the reception coverage and the local telco company.\n\nCalls and texts are not possible and will incur extra charges.",
            "paymentMode": "PR",
            "suppressRent": 0,
            "planTerms": "The expiry date would be 30 days after purchase.\nDo not delete or remove your eSIM from your device after successful installation.\nNo refunds or cancellations can be made due to eSIM compatibility issues.\n\nGeneral Terms and Conditions of Yoowifi apply.\nFor more information, visit Yoowifi.com",
            "descUrl": "",
            "nameAttributes": "eSIM Unlimited Data\nUpgrade your Japan Trip\nActivate within 30 days of your trip",
            "productImage": "KDDIUNLESIM.png",
            "provider": "tsim",
            "trPlanName": null,
            "trNameAttributes": null,
            "trDescription": null,
            "trPlanTerms": null,
            "planTypeLabel": "Volume plans",
            "defaultPlan": "F",
            "rates": []
        }
    ]

    const { cart } = useSelector((state) => state.cart);


    const [currentIndex, setCurrentIndex] = useState(8);
    const [filteredPackages, setFilteredPackages] = useState(
        packages.slice(0, currentIndex)
    );
    // const [selectedFilter, setSelectedFilter] = useState("");
    // const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

    const { defaultProduct } = useUserLocationLanguage();
    const { process, } = useLocalPlan();


    const datas = [
        { _id: 0, name: "All", value: "A" },
        { _id: 1, name: "Pocket Wifi", value: "D" },
        { _id: 2, name: "Sim", value: "S" },
        { _id: 3, name: "eSim", value: "E" },
    ];
    const [selected, setSelected] = useState(defaultProduct);
    // const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { t } = useTranslation(["translation", "english", "local"])
    const inputRef = useRef(null);
    const [travel, setTravel] = useState({
        startDate: null, // new Date(),
        endDate: null  // new Date(),
    });

    const getUser = useDisApi({
        apiCall: "getUser",
        setCallBack: (res) => {
            dispatch(setUserData(res?.user || null));
        },
    });

    useEffect(() => {
        if (cart.userCountry?.country) {
            if (user?.userId) {
                getUser({ userId: user.userId });
            }
        }
    }, [cart?.userCountry?.country]);

    useEffect(() => {
        setCurrentIndex(8);
        setFilteredPackages(packages.slice(0, 8));
    }, []);

    const computedPackages = useMemo(
        () => computeFilteredPackages(filteredPackages, selected),
        [filteredPackages, selected]
    );

    return (
        <div className="sec_common_80 px-4 min-[1176px]:px-0 bg-neutral-50">
            <SectionHeader
                heading={t("JapanPackage.sectionHeading")}
                subHeading={t("JapanPackage.sectionSubHeading")}
                headingClassName='whitespace-pre-line'
                subHeadingClassName='whitespace-pre-line'
            />
            <div className="containerX flex_center flex-col mt-10">
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
                ) : filteredPackages.length > 0 ? (
                    <>
                        {/* <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-8">
                            {computedPackages.map((data, index) => (
                                <InternetPackageCard key={index} data={data} flow="PP" />
                            ))}
                        </div> */}

                        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-8">
                            {computedPackages.map((data, index) => (
                                <div
                                    key={index}
                                    className={`${computedPackages.length === 1 ? "col-span-full flex justify-center" : ""
                                        }`}
                                >
                                    <InternetPackageCard data={data} flow="PP" />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="p_common text-center w-full">
                        {t("notFound.noPackage")}
                    </p>
                )}
            </div>
        </div>
    );
}

export default JapanEsimPackage;
