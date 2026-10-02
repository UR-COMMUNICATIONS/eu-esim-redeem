/**
 * Validates if a string is a valid US zip code
 * @param {string} zipCode - Zip code to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidUSZipCode = (zipCode) => {
  if (!zipCode) return false;

  // Remove spaces and dashes
  const cleaned = zipCode.replace(/[\s-]/g, "");

  // Check if it's 5 digits or 9 digits (ZIP+4 format)
  const zipRegex = /^\d{5}(\d{4})?$/;

  if (!zipRegex.test(cleaned)) return false;

  // Additional check: ensure the 5-digit portion is within valid range
  const zip = parseInt(cleaned.substring(0, 5));
  return zip >= 501 && zip <= 99999;
};

/**
 * Get US state code from zip code
 * Uses zip code ranges to determine the state
 * @param {string} zipCode - 5-digit US zip code
 * @returns {string|null} - Two-letter state code or null if not found
 */
export const getStateFromZipCode = (zipCode) => {
  if (!zipCode) return null;

  // Validate zip code first
  if (!isValidUSZipCode(zipCode)) return null;

  // Remove any non-numeric characters and get first 5 digits
  const zip = parseInt(zipCode.replace(/\D/g, "").substring(0, 5));

  if (isNaN(zip)) return null;

  // Zip code ranges mapped to states
  // Based on USPS zip code allocation
  if (zip >= 35000 && zip <= 36999) return "AL"; // Alabama
  if (zip >= 99500 && zip <= 99999) return "AK"; // Alaska
  if (zip >= 85000 && zip <= 86999) return "AZ"; // Arizona
  if (zip >= 71600 && zip <= 72999) return "AR"; // Arkansas
  if (zip >= 90000 && zip <= 96699) return "CA"; // California
  if (zip >= 80000 && zip <= 81999) return "CO"; // Colorado
  if (zip >= 6000 && zip <= 6999) return "CT"; // Connecticut
  if (zip >= 19700 && zip <= 19999) return "DE"; // Delaware
  if (zip >= 32000 && zip <= 34999) return "FL"; // Florida
  if (zip >= 30000 && zip <= 31999) return "GA"; // Georgia
  if (zip >= 96700 && zip <= 96999) return "HI"; // Hawaii
  if (zip >= 83200 && zip <= 83999) return "ID"; // Idaho
  if (zip >= 60000 && zip <= 62999) return "IL"; // Illinois
  if (zip >= 46000 && zip <= 47999) return "IN"; // Indiana
  if (zip >= 50000 && zip <= 52999) return "IA"; // Iowa
  if (zip >= 66000 && zip <= 67999) return "KS"; // Kansas
  if (zip >= 40000 && zip <= 42999) return "KY"; // Kentucky
  if (zip >= 70000 && zip <= 71599) return "LA"; // Louisiana
  if (zip >= 3900 && zip <= 4999) return "ME"; // Maine
  if (zip >= 20600 && zip <= 21999) return "MD"; // Maryland
  if (zip >= 1000 && zip <= 2799) return "MA"; // Massachusetts
  if (zip >= 48000 && zip <= 49999) return "MI"; // Michigan
  if (zip >= 55000 && zip <= 56999) return "MN"; // Minnesota
  if (zip >= 38600 && zip <= 39999) return "MS"; // Mississippi
  if (zip >= 63000 && zip <= 65999) return "MO"; // Missouri
  if (zip >= 59000 && zip <= 59999) return "MT"; // Montana
  if (zip >= 68000 && zip <= 69999) return "NE"; // Nebraska
  if (zip >= 88900 && zip <= 89999) return "NV"; // Nevada
  if (zip >= 3000 && zip <= 3899) return "NH"; // New Hampshire
  if (zip >= 7000 && zip <= 8999) return "NJ"; // New Jersey
  if (zip >= 87000 && zip <= 88499) return "NM"; // New Mexico
  if (zip >= 10000 && zip <= 14999) return "NY"; // New York
  if (zip >= 27000 && zip <= 28999) return "NC"; // North Carolina
  if (zip >= 58000 && zip <= 58999) return "ND"; // North Dakota
  if (zip >= 43000 && zip <= 45999) return "OH"; // Ohio
  if (zip >= 73000 && zip <= 74999) return "OK"; // Oklahoma
  if (zip >= 97000 && zip <= 97999) return "OR"; // Oregon
  if (zip >= 15000 && zip <= 19699) return "PA"; // Pennsylvania
  if (zip >= 2800 && zip <= 2999) return "RI"; // Rhode Island
  if (zip >= 29000 && zip <= 29999) return "SC"; // South Carolina
  if (zip >= 57000 && zip <= 57999) return "SD"; // South Dakota
  if (zip >= 37000 && zip <= 38599) return "TN"; // Tennessee
  if (
    (zip >= 75000 && zip <= 79999) ||
    (zip >= 88500 && zip <= 88599) ||
    (zip >= 73301 && zip <= 73399)
  )
    return "TX"; // Texas
  if (zip >= 84000 && zip <= 84999) return "UT"; // Utah
  if (zip >= 5000 && zip <= 5999) return "VT"; // Vermont
  if (zip >= 20100 && zip <= 20199) return "VA"; // Virginia (DC area)
  if (zip >= 22000 && zip <= 24699) return "VA"; // Virginia
  if (zip >= 20000 && zip <= 20099) return "DC"; // Washington DC
  if (zip >= 20200 && zip <= 20599) return "DC"; // Washington DC
  if (zip >= 98000 && zip <= 99499) return "WA"; // Washington
  if (zip >= 24700 && zip <= 26999) return "WV"; // West Virginia
  if (zip >= 53000 && zip <= 54999) return "WI"; // Wisconsin
  if (zip >= 82000 && zip <= 83199) return "WY"; // Wyoming

  // US Territories
  if (zip >= 600 && zip <= 799) return "PR"; // Puerto Rico
  if (zip >= 800 && zip <= 999) return "VI"; // US Virgin Islands
  if (zip >= 96910 && zip <= 96932) return "GU"; // Guam
  if (zip >= 96940 && zip <= 96944) return "MP"; // Northern Mariana Islands
  if (zip >= 96799 && zip <= 96799) return "AS"; // American Samoa

  return null;
};
