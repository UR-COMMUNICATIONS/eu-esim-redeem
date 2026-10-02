import InternetPackageCard from "@/components/shared/cards/InternetPackageCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { Button } from "@/components/ui/button";
import { dateExternal, dateformat, orignalFormat, useDisApi } from "@/general";
import useLocalPlan from "@/hooks/useLocalPlan";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { images, RefreshIcon } from "@/services";
import { setUserData } from "@/store/module/auth/slice";
import { Suspense } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { InternetPackageCardSkeleton } from "@/skeletons/home/InternetPackageSkeleton";
import AstindoPackageCard from "@/components/shared/cards/AstindoPackageCard";


function AstindoInternetPackage() {
    // useExternalPromo();
    const { user } = useSelector((state) => state.auth);
    const { packages } = useSelector((state) => state.plan);
    const { cart } = useSelector((state) => state.cart);
    // console.log({ cart });
    const [isDropdown, setDropdown] = useState(false);
    const [promoCode, setpromoCode] = useState(cart?.promoCode);
    const [searchTerm, setSearchTerm] = useState({ label: "", value: "" });
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [dropdownSuggestions, setDropdownSuggestions] = useState([]);

    const [currentIndex, setCurrentIndex] = useState(8);
    const [filteredPackages, setFilteredPackages] = useState(
        packages.slice(0, currentIndex)
    );
    const { currentCountry, currentLanguage, isTargetCountry, hideProductFilter, defaultProduct } = useUserLocationLanguage();
    const { process, fetchLocalPlans, fetchPriorityPlans } = useLocalPlan();

    const [selected, setSelected] = useState(defaultProduct);
    // const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { t } = useTranslation(["translation", "english", "local"])
    const inputRef = useRef(null);
    const [travel, setTravel] = useState({
        startDate: null, // new Date(),
        endDate: null  // new Date(),
    });


    const handleLoadMore = () => {
        if (currentIndex < packages?.length) {
            setIsLoadMore(true);
            const newIndex = currentIndex + 4;
            setCurrentIndex(newIndex);
            setTimeout(() => {
                setFilteredPackages(packages?.slice(0, newIndex) || []);
                setIsLoadMore(false);
            }, 300);
        }
    };

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
    }, [packages, cart.userLanguage]);

    useEffect(() => {
        // setpromoCode(cart.promoCode)
        fetchLocalPlans("SIMAST25", "JP")
    }, []);

    return (
        <div className="sec_common_80 px-4 min-[1176px]:px-0 bg-neutral-50">
            <SectionHeader
                heading={t("internetPackages.sectionHeading")}
                subHeading={t("internetPackages.sectionSubHeading")}
            />
            <div className="containerX flex_center flex-col">
                <div className="bg-white border-[#EEEEEE] px-4 w-full max-w-[800px] mt-10 mb-5 rounded-[16px]">
                </div>

                {process.isProcessing ? (
                    <InternetPackageCardSkeleton />
                ) : filteredPackages.length > 0 ? (
                    <>
                        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-8">
                            {filteredPackages.map((data, index) => (
                                <AstindoPackageCard key={index} data={data} flow="PP" />
                            ))}
                        </div>
                        <div className="mt-8 flex justify-center">
                            <Button
                                onClick={handleLoadMore}
                                disabled={currentIndex < packages.length ? false : true}
                                variant="alert"
                                type="button"
                            >
                                <span>{t("buttonText.loadMore")}</span>
                                <RefreshIcon className={isLoadMore ? "animate-spin" : ""} />
                            </Button>
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

export default AstindoInternetPackage;
