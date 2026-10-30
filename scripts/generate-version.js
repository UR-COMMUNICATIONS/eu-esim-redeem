
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

console.log("GENERATE VERSION SCRIPT STARTED");
// Current script directory. package.json is "type": "module", so this runs
// as an ES module and has no require/__dirname.
const scriptDir = path.dirname(fileURLToPath(import.meta.url));

// dist folder is a sibling of scripts
const distPath = path.resolve(scriptDir, "../dist");
const versionFilePath = path.join(distPath, "version.json");

console.log("Script directory:", scriptDir);
console.log("Dist directory:", distPath);

try {
  if (!fs.existsSync(distPath)) {
    throw new Error(`dist folder not found: ${distPath}`);
  }

  const versionInfo = {
    version: Date.now().toString(),
    buildTime: new Date().toISOString(),
  };

  fs.writeFileSync(
    versionFilePath,
    JSON.stringify(versionInfo, null, 2),
    "utf8"
  );

  console.log("Version file created:", versionFilePath);
} catch (error) {
  console.error("Failed to generate version.json:", error);
  process.exitCode = 1;
}
console.log("GENERATE VERSION SCRIPT FINISHED");
