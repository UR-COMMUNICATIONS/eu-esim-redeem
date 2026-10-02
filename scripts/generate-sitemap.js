import fs from "fs";
import path from "path";
import { SitemapStream, streamToPromise } from "sitemap";
import { fileURLToPath, pathToFileURL } from "url";

const HOSTNAME = "https://yoowifi.com";
const OUTPUT_DIR = "public";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routesModuleUrl = pathToFileURL(
  path.resolve(__dirname, "./routes.js")
).href;

const { commercialRoutes, corporateRoutes } = await import(routesModuleUrl);

const allRoutes = {
  ...commercialRoutes,
  ...corporateRoutes,
};

const links = Object.values(allRoutes)
  .filter((route) => route.path && !route.path.includes(":"))
  .map((route) => ({
    url: route.path,
    changefreq: "weekly",
    priority: 0.7,
  }));

const sitemap = new SitemapStream({ hostname: HOSTNAME });

try {
  // Write all links to sitemap stream
  links.forEach((link) => sitemap.write(link));
  sitemap.end();

  // Wait for sitemap XML to be generated as a buffer
  const sitemapData = await streamToPromise(sitemap);

  // Write sitemap.xml file
  fs.writeFileSync(
    path.resolve(OUTPUT_DIR, "sitemap.xml"),
    sitemapData.toString()
  );
  

  // Generate robots.txt
  const disallowed = ["/DeleteAccount"]; // Add paths to disallow here
  const robotsContent = `
User-agent: *
Allow: /
${disallowed.map((p) => `Disallow: ${p}`).join("\n")}

Sitemap: ${HOSTNAME}/sitemap.xml
`.trim();

  fs.writeFileSync(path.resolve(OUTPUT_DIR, "robots.txt"), robotsContent);
} catch (err) {
}
