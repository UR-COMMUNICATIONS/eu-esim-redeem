import { setCartData } from "@/store/module/cart/cartSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";

const useExternalPromo = () => {
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [disabledPromo, setDisabledPromo] = useState(false)
    const [searchParams] = useSearchParams();
    const annex = searchParams.get('annex') || cart?.annex;
    const annexSession = sessionStorage.getItem("annex");

    let defaultCountry = {
        SKYTICKET: "SG",
        ASESIM: "SG",
        DEFAULT: "SG"
    }

    useEffect(() => {
        // console.log('external annex', annex);
        // console.log('extrenal cart', annexSession);
        const annexCountryCode = defaultCountry[annex?.toUpperCase()] || defaultCountry["DEFAULT"]
        if (annexSession == 'skyticket' || annex == 'skyticket') {
            sessionStorage.setItem("annex", "skyticket");
            dispatch(setCartData({ annex: "skyticket", promoCode: "SKYTICKET", annexCountryCode: "" }));

            // dispatch(setCartData({ annex: annex, promoCode: annex == 'skyticket' ? "SKYTICKET" : "" }));
            // const disabledPromo = annex == 'skyticket' ? true : false
            console.log('annex', annex);
            setDisabledPromo(annex == 'skyticket' ? true : false)
        }
        else {
            sessionStorage.setItem("annex", annex);
            dispatch(setCartData({ annex: annex, promoCode: annex?.trim(), annexCountryCode: annexCountryCode }));
        }

        // if (cart.promoCode !== "SKYTICKET") {
        //     dispatch(setCartData({ annex: annex, promoCode: annex == 'skyticket' ? "SKYTICKET" : "" }));
        //     // const disabledPromo = annex == 'skyticket' ? true : false
        //     console.log('annex', annex);
        //     setDisabledPromo(annex == 'skyticket' ? true : false)
        // }
    }, []);

    useEffect(() => {
        if (cart.reactCountries && annex?.toLowerCase() !== "skyticket") {
            let countryObj = null
            const countryCode = defaultCountry[annex?.toUpperCase()] || defaultCountry["DEFAULT"]
            // console.log("countryCode", countryCode);
            countryObj = cart?.reactCountries.find(
                (cou) => cou.iso2 === countryCode
            );
            // console.log("countryObj", countryObj);
            dispatch(setCartData({ productCountry: countryObj, countriesList: [countryObj] }));
        }
    }, [cart?.reactCountries]);

    // const node = document.getElementById("promoCode")
    // if (annex == 'skyticket') {
    //     dispatch(setCartData({ promoCode: "SKYTICKET" }));
    //     node.disabled = true
    // }
    // else {
    //     dispatch(setCartData({ promoCode: "" }));
    //     node.disabled = false
    // }
    // return disabledPromo
    return { disabledPromo }
};

export default useExternalPromo;
