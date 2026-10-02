import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import AutoResizeText from "@/components/shared/AutoResizeText ";
import { countries } from "@/general/Arrays";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { cn } from "@/lib/utils";

/**
 * Clickable coverage regions with that region's countries listed underneath.
 *
 * Two UI variants:
 *  - "pills" (default) — outlined pill buttons over a single comma-separated
 *    line of countries.
 *  - "tabs" — the segmented control + country tile grid used by the shared
 *    CountryList component on the home page.
 *
 * `regions` is always supplied by the caller ([{ key, countryCodes }]) so each
 * campaign owns its own coverage list; only the display names/translations are
 * resolved from the shared `countries` array. `labelKey` points at the i18n
 * namespace holding `label` and `regions.<key>` — campaign-specific, so it has
 * no default here.
 */
export default function CountryCoverage({
  regions,
  variant = "pills",
  labelKey,
}) {
  const { t } = useTranslation();
  const { currentLanguage, currentCountry } = useUserLocationLanguage();
  const [currentRegion, setCurrentRegion] = useState(regions[0]?.key);

  // A region may be limited to certain storefronts with `onlyIn: ["id"]`, which
  // matches the same country code the router uses for the /id URL prefix.
  const visibleRegions = useMemo(
    () =>
      regions.filter(
        (region) => !region.onlyIn || region.onlyIn.includes(currentCountry),
      ),
    [regions, currentCountry],
  );

  // Never leave a hidden region selected.
  const activeRegion = visibleRegions.some((r) => r.key === currentRegion)
    ? currentRegion
    : visibleRegions[0]?.key;

  const countryByCode = useMemo(
    () =>
      countries.reduce((acc, country) => {
        acc[country.countryCode] = country;
        return acc;
      }, {}),
    [],
  );

  const regionCountries = useMemo(() => {
    const region = visibleRegions.find((item) => item.key === activeRegion);
    return (region?.countryCodes || []).map((code) => {
      const country = countryByCode[code];
      return (
        country?.translations?.[currentLanguage] || country?.countryName || code
      );
    });
  }, [visibleRegions, activeRegion, countryByCode, currentLanguage]);

  const isTabs = variant === "tabs";

  return (
    <section className="flex flex-col gap-5">
      <p className="text-sm font-semibold text-black-600">
        {t(`${labelKey}.label`)}
      </p>

      {isTabs ? (
        <div className="flex overflow-x-auto rounded-[14px] bg-neutral-200 px-2 py-2">
          {visibleRegions.map(({ key }) => (
            <button
              key={key}
              type="button"
              onClick={() => setCurrentRegion(key)}
              className={cn(
                "flex-1 whitespace-nowrap px-4 py-3 text-base transition-all duration-300 ease-in-out md:px-0 md:py-4",
                key === activeRegion
                  ? "rounded-[8px] bg-main-600 font-semibold text-white"
                  : "bg-neutral-200 font-normal text-neutral-700",
              )}
            >
              <AutoResizeText maxLines={1}>
                {t(`${labelKey}.regions.${key}`)}
              </AutoResizeText>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {visibleRegions.map(({ key }) => (
            <button
              key={key}
              type="button"
              onClick={() => setCurrentRegion(key)}
              className={cn(
                "rounded-xl px-6 py-4 text-base font-semibold transition-colors duration-300 md:px-10",
                key === activeRegion
                  ? "bg-main-650 text-white"
                  : "border border-black-900 text-black-900 hover:bg-neutral-100",
              )}
            >
              {t(`${labelKey}.regions.${key}`)}
            </button>
          ))}
        </div>
      )}

      {isTabs ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {regionCountries.map((name) => (
            <div
              key={name}
              className="flex min-h-[68px] items-center justify-center rounded-xl bg-neutral-100 p-3"
            >
              <p
                className="text-center text-sm font-semibold lg:text-[18px]"
                title={name}
              >
                {name}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mx-auto max-w-4xl text-base font-semibold leading-relaxed text-black-600 md:text-lg">
          {regionCountries.join(", ")}.
        </p>
      )}
    </section>
  );
}
