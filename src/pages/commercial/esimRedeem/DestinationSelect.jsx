import { useMemo } from "react";
import { countries } from "@/general/Arrays";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Destination picker for campaigns whose plan covers many countries but whose
 * link carries none — the order needs a `locationCode`, so the user supplies
 * it here instead of the flow guessing at the first covered country.
 *
 * Options are ISO codes from the campaign; names (and translations) come from
 * the shared `countries` array, sorted by what the user actually sees.
 */
export default function DestinationSelect({
  countryCodes,
  value,
  onChange,
  placeholder,
}) {
  const { currentLanguage } = useUserLocationLanguage();

  const options = useMemo(() => {
    const byCode = countries.reduce((acc, country) => {
      acc[country.countryCode] = country;
      return acc;
    }, {});
    return countryCodes
      .map((code) => {
        const country = byCode[code];
        return {
          code,
          name:
            country?.translations?.[currentLanguage] ||
            country?.countryName ||
            code,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [countryCodes, currentLanguage]);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-[3.25rem] w-full rounded-xl border-neutral-300 bg-neutral-50 px-4 text-base data-[placeholder]:text-neutral-500">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        {options.map(({ code, name }) => (
          <SelectItem key={code} value={code}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
