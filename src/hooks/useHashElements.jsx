// ScrollToHashElement.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useHashElement() {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            console.log("hash", hash);

            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }, [hash]);

    // const location = useLocation();
    // useEffect(() => {
    //     if (location.hash) {
    //         const id = location.hash.replace("#", "");
    //         const element = document.getElementById(id);
    //         if (element) {
    //             // Use smooth scroll or instant
    //             element.scrollIntoView({ behavior: "smooth", block: "start" });
    //         }
    //     }
    // }, [location]);

    return null;
}
