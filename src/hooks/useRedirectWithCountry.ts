// useRedirectWithCountry.tsx
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { allowedRoutePathCountries } from "@/lib/utils"; // e.g., ['us', 'ca', 'gb']

const useRedirectWithCountry = () => {
    // Get the user's country from Redux
    const { cart: { userCountry } } = useSelector((state: any) => state.cart);
    const navigate = useNavigate();
    const location = useLocation();

    // Extract the country ISO code (if available)
    const countryISO = userCountry?.country?.toLowerCase();
    // Determine if this country is allowed for prefixed routes
    const isAllowed = countryISO && allowedRoutePathCountries.includes(countryISO);



    useEffect(() => {
        // Split the pathname into segments (ignoring empty strings)
        const pathSegments = location.pathname.split("/").filter(Boolean);
        // Check if the first segment is one of our allowed country codes
        const urlHasCountry = pathSegments.length > 0 && allowedRoutePathCountries.includes(pathSegments[0]);

        if (isAllowed) {
            // If the user’s country is allowed but the URL isn’t prefixed, redirect to the prefixed version.
            if (!urlHasCountry) {
                navigate(`/${countryISO}${location.pathname}`, { replace: true });
            }
        } else {
            // If the user's country is not allowed but the URL contains a country prefix, remove it.
            if (urlHasCountry) {
                const newPath = "/" + pathSegments.slice(1).join("/");
                navigate(newPath, { replace: true });
            }
        }
    }, [countryISO, isAllowed, location, navigate]);
};

export default useRedirectWithCountry;
