import { countriesBasedData, languages, targetCountries } from "@/lib/utils";
import { useSelector } from "react-redux";

const useUserLocationLanguage = () => {
    const { cart } = useSelector((state: any) => state.cart);
    const currentLanguage = sessionStorage.getItem("i18next")?.toLowerCase();
    const currentCountry = cart.userCountry?.country?.toLowerCase();
    const allowedLanguages = languages[currentCountry]
    const isTargetCountry =
        (targetCountries?.length !== 0 && targetCountries.includes(currentCountry)) &&
        (allowedLanguages?.length !== 0 || allowedLanguages.includes(currentLanguage));
    // console.log("isTargetCountry", isTargetCountry)
    const targetCountry = isTargetCountry ? currentCountry : "sg"
    const { loadTranslation, hideNavbarItems, hideProducts, hideProductFilter, supportimage,
        defaultProduct, supportEmail, supportPhone, getInTouch, WhatsappLink, supportQrcode,idNull,HowToConnectNull
    } = countriesBasedData[targetCountry]
    const nameSpace = loadTranslation[currentLanguage] || loadTranslation['en']

    return {
        currentCountry, currentLanguage, isTargetCountry,
        nameSpace, hideNavbarItems, hideProducts, hideProductFilter, supportQrcode,
        defaultProduct, supportEmail, supportPhone, getInTouch, WhatsappLink, supportimage,idNull,HowToConnectNull
    };
};

export default useUserLocationLanguage;
