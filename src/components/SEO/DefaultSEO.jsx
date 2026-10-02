import { Helmet } from 'react-helmet-async';

const DefaultSEO = () => {
    return (
        <Helmet>
            <title>Yoowifi: Global Portable WiFi & eSIM for Travel</title>
            {/* Open Graph Meta Tags for Social Media */}
            <meta
                property="og:title"
                content="Yoowifi: Best Portable WiFi Routers & Travel eSIM Solutions for Global Connectivity"
                data-rh="true"
            />
            {/* <meta
                property="og:description"
                content="Buy the best eSIMs and portable WiFi routers for seamless international travel. Enjoy unlimited data, easy setup, and top service from global providers."
                data-rh="true"
            /> */}
            <meta
                property="og:image"
                // content="https://yoowifi.com/thumbnail.png"
                content="https://yoowifi.com/yoowifi_thumbnail.png"
                data-rh="true"
            />
            <meta
                property="og:url"
                content="https://yoowifi.com"
                data-rh="true"
            />
            <meta
                property="og:type"
                content="website"
                data-rh="true"
            />

            {/* Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta
                name="twitter:title"
                content="Yoowifi: Best Portable WiFi Routers & Travel eSIM Solutions for Global Connectivity"
            />
            <meta
                name="twitter:description"
                content="portable router wifi, best portable wifi router, portable wifi router for travel, mini portable wifi router, yoowifi router, yoowifi pocket wifi, mini wifi router portable, portable wifi router 5g, best portable wifi router for travel, best portable wifi router for international travel, where to buy esim, best travel esim providers, esim vs sim, international esim providers, europe travel sim, best europe esim, best esim for usa"
            />
        </Helmet>
    );
};

export default DefaultSEO;