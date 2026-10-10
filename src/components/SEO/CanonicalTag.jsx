import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const CanonicalTag = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const defaultMeta = {
    title: "Yoowifi: Global Portable WiFi & eSIM for Travel",
    description:
      "Buy the best eSIMs and portable WiFi routers for seamless international travel. Enjoy unlimited data, easy setup, and top service from global providers.",
    keywords: "",
    ogTitle:
      "Yoowifi: Best Portable WiFi Routers & Travel eSIM Solutions for Global Connectivity",
    ogImage: "https://yoowifi.com/yoowifi_thumbnail.png",
    ogUrl: null,
  };

  const metaData = {
    "/": {
      title: "",
      keywords: "",
      description:
        "Buy the best eSIMs and portable WiFi routers for seamless international travel. Enjoy unlimited data, easy setup, and top service from global providers.",
    },
    "/home": {
      title: "",
      keywords: "",
      description:
        "Buy the best eSIMs and portable WiFi routers for seamless international travel. Enjoy unlimited data, easy setup, and top service from global providers.",
    },
    "/product/pocket-wifi": {
      title:
        "Pocket WiFi Singapore: Best Rental Options for Hassle-Free Travel",
      keywords:
        "pocket wifi singapore, pocket wifi rental singapore, pocket wifi for international travel, pocket wifi for travel",
      description:
        "Rent pocket WiFi in Singapore for seamless international travel. Enjoy affordable, secure, and fast internet access on the go—perfect for tourists and business travelers.",
    },
    "/eu/esim-redeem": {
      title: "EUWiFi: Europe Travel eSIM & Portable WiFi",
      keywords: "EUWiFi, Europe eSIM, portable WiFi, travel connectivity",
      description:
        "Buy the best Europe eSIMs and portable WiFi for seamless travel. Enjoy reliable data, easy setup, and fast connectivity across Europe.",
      ogTitle: "EUWiFi: Europe Travel eSIM & Portable WiFi",
      ogImage: "https://euwifi.eu/euwifi_thumbnail.png",
      ogUrl: "https://euwifi.eu",
    },
  };

  const currentMeta = metaData[pathname.toLowerCase()] || defaultMeta;

  // If title is empty, fall back to default title
  const finalTitle = currentMeta.title || defaultMeta.title;
  const finalOgTitle = currentMeta.ogTitle || defaultMeta.ogTitle;
  const finalOgImage = currentMeta.ogImage || defaultMeta.ogImage;

  // Only add canonical tag for non-root paths
  const shouldAddCanonical = pathname !== "/";

  return (
    <Helmet>
      {/* Canonical tag only for non-root paths */}
      {shouldAddCanonical && (
        <link rel="canonical" href={window.location.href} />
      )}

      {/* Title - falls back to default if empty */}
      <title>{finalTitle}</title>

      {/* Description */}
      <meta name="description" content={currentMeta.description} />

      {/* Keywords */}
      {currentMeta.keywords && (
        <meta name="keywords" content={currentMeta.keywords} />
      )}

      {/* Open Graph Meta Tags for Social Media Preview */}
      <meta property="og:title" content={finalOgTitle} data-rh="true" />
      <meta
        property="og:description"
        content={currentMeta.description}
        data-rh="true"
      />
      <meta property="og:image" content={finalOgImage} data-rh="true" />
      <meta
        property="og:url"
        content={currentMeta.ogUrl || window.location.href}
        data-rh="true"
      />
      <meta property="og:type" content="website" data-rh="true" />

      {/* Twitter Card Meta Tags for Preview */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={currentMeta.description} />
      <meta name="twitter:image" content={finalOgImage} />
    </Helmet>
  );
};

export default CanonicalTag;
