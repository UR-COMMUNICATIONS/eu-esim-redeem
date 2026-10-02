import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";

const commercialRoutesPaths = [
  "/",
  "/product/pocket-wifi",
  "/product/router",
  "/product/sim",
  "/pocket-wifi",
  "/pocket-wifi/region",
  "/pocket-wifi/wifi-plan",
  "/pocket-wifi/cart-service",
  "/pocket-wifi/wifi-plan-summery",
  "/pocket-wifi/shipping-option",
  "/pocket-wifi/shipping-option/self-pickup",
  "/pocket-wifi/order-summery",
  "/pocket-wifi-details",
  "/pocket-wifi-china",
  "/pocket-wifi-japan",
  "/router",
  "/router/region",
  "/router/router-plan",
  "/router/cart-service",
  "/router/router-plan-summery",
  "/router/shipping-option",
  "/router/shipping-option/self-pickup",
  "/router/order-summery",
  "/sim",
  "/sim/region",
  "/sim/sim-plan",
  "/sim/cart-service",
  "/sim/sim-plan-summery",
  "/sim/shipping-option",
  "/sim/shipping-option/self-pickup",
  "/sim/order-summery",
  "/esim-china",
  "/esim-thailand",
  "/about-us",
  "/contact",
  "/country-coverage",
  "/country-coverage/filter",
  "/package/details/:packageId",
  "/how-it-works",
  "/affiliate",
  "/pick-drop-location",
  "/how-to-setup-sim",
  "/how-to-connect-pocket-wifi",
  "/faq",
];

const corporateRoutesPaths = [
  "/corporate",
  "/corporate/iot",
  "/corporate/hotel",
  "/corporate/travel-agency",
  "/corporate/maritime-internet",
  "/corporate/events",
  "/corporate/about-us",
  "/corporate/commercial",
];

async function generateSitemap() {
  const hostname = "https://yoowifi.com/"; // your website URL
  const sitemap = new SitemapStream({ hostname });
  const writeStream = createWriteStream("./public/sitemap.xml");
  sitemap.pipe(writeStream);

  const allRoutes = [...commercialRoutesPaths, ...corporateRoutesPaths];
  allRoutes.forEach((path) => {
    sitemap.write({ url: path, changefreq: "weekly", priority: 0.8 });
  });

  sitemap.end();
  await streamToPromise(sitemap);
  console.log("✅ Sitemap generated at public/sitemap.xml");
}

generateSitemap();
