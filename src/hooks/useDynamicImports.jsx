import React, { lazy, useEffect, useMemo, useState } from "react";
import useUserLocationLanguage from "./useUserLocationLanguage";
import { dynamicImportType } from "@/lib/utils";

/**
 * Glob all potential modules from the /countries folder and subdirectories.
 * This will return an object mapping file paths to functions that perform dynamic imports.
 */
const modules = import.meta.glob("/countries/**/*.{js,jsx,ts,tsx}");

/**
 * Custom hook for dynamically importing a React component based on a computed path.
 *
 * The provided `path` should contain a placeholder `{currentCountry}` (or similar)
 * which is replaced by the current country code. Additionally, if the path starts with
 * an ampersand (&), it will be stripped out to create the final path.
 *
 * This hook uses React.lazy to create a lazy-loaded component and caches the result using useMemo.
 *
 * @param {string} path - The import path template, e.g. "&/countries/{currentCountry}/src/components/shared/navigation/NavBarLogo.jsx"
 * @param {string} importType - Type of import. Use dynamicImportType.comp or DynamicImportType.data 
 * @returns {React.LazyExoticComponent<React.ComponentType<any>> | { data: any, error: Error|null } | null}
 *   - For COMPONENT: A lazy-loaded component (or null if not found).
 *   - For DATA: An object containing { data, error }.

*/

const useDynamicImports = (path, importType = "comp", targetCountries = ["jp", "my", "hk","id"]) => {
  const { currentCountry, } = useUserLocationLanguage();
  const isTargetCountry = targetCountries?.length !== 0 && targetCountries.includes(currentCountry)

  // Replace placeholder with the correct country code.
  // If the current country is not targeted, default to "sg".
  const importPath = path.replace(
    /\{(\w+)\}/g,
    isTargetCountry ? currentCountry : "sg"
  );

  // Remove the '&' alias if present. This maps the alias to the project root.
  const computedPath = importPath.startsWith("&")
    ? importPath.replace(/^&/, "")
    : importPath;

  /**
   * Memoize the lazy component so it is only recreated when the computedPath changes.
   * This helps prevent unnecessary re-renders and jitter.
   */

  // if (importType === dynamicImportType.comp) {

  const LazyComponent = useMemo(() => {
    const importer = modules[computedPath];
    if (!importer) {
      console.warn(`Module ${computedPath} not found.`);
      return null;
    }
    // Wrap the dynamic import in React.lazy. Note that React.lazy expects the promise to
    // resolve with a module that has a default export. We use mod.default || mod as a fallback.
    try {
      return lazy(() =>
        importer()
          .then((mod) => ({ default: mod.default || mod }))
          .catch((err) => {
            console.error(`Error while loading module ${computedPath}:`, err);
            // Re-throw error so React.lazy can handle it.
            throw err;
          })
      );
    } catch (error) {
      console.error(
        `Unexpected error creating lazy component for ${computedPath}:`,
        error
      );
      return null;
    }
  }, [computedPath]);

  return LazyComponent;
  // }
  // else if (importType === dynamicImportType.data) {
  //   // console.log('importType', importType);
  //   // Dynamically import data using useEffect
  //   const [data, setData] = useState(null);
  //   const [error, setError] = useState(null);

  //   useEffect(() => {
  //     const importer = modules[computedPath];
  //     // console.log('ldskdslk', importer);
  //     // console.log('computedPath', computedPath);
  //     if (!importer) {
  //       const err = new Error(`Module ${computedPath} not found.`);
  //       console.error(err);
  //       setError(err);
  //       return;
  //     }

  //     importer()
  //       .then((mod) => {
  //         // console.log('mod', mod);
  //         setData(mod.default || mod);
  //       })
  //       .catch((err) => {
  //         console.error(`Error while loading module ${computedPath}:`, err);
  //         setError(err);
  //       });
  //   }, [computedPath]);

  //   return { data, error };
  // }
  // else {
  //   console.error(`Unknown importType: ${importType}`);
  //   return null;
  // }
};

export default useDynamicImports;
