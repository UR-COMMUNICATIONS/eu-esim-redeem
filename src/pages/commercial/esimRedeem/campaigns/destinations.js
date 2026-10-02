// Destination lists for the dropdown in the register form, as ISO codes so the
// display names (and their translations) resolve from the shared `countries`
// array rather than being duplicated here as literals.

// The plan behind the travel-agency links. Also what Maybank's voucher covers.
export const PARTNER_DESTINATIONS = [
  // Europe
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FO",
  "FI",
  "FR",
  "GF",
  "DE",
  "GR",
  "GP",
  "VA",
  "HU",
  "IS",
  "IE",
  "IT",
  "LV",
  "LI",
  "LT",
  "LU",
  "MT",
  "MQ",
  "NL",
  "NO",
  "PL",
  "PT",
  "RO",
  "BL",
  "MF",
  "SM",
  "SK",
  "SI",
  "ES",
  "SE",
  "CH",
  "TR",
  "GB",
  // Asia
  "KH",
  "CN",
  "HK",
  "ID",
  "JP",
  "LA",
  "MO",
  "MY",
  "PH",
  "KR",
  "TW",
  "TH",
  "VN",
  // Americas
  "US",
  "CA",
  "MX",
  // Oceania
  "AU",
  "NZ",
  // Middle East
  "SA",
];

// YW3GB covers the same list plus Singapore.
export const YW3GB_DESTINATIONS = [...PARTNER_DESTINATIONS, "SG"];
