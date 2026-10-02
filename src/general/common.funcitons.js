import { PRODUCT_IMAGES } from "@/constants/planTypes";
import { countries } from "@/general/Arrays";
import { images } from "@/services";

export function enumFormatter(cell, row, enumObject) {
  return enumObject[cell];
}

// export function editFormatter(cell, row, enumObject, index) {
//     return (<a onClick={() => editmappedPlans(cell, row, enumObject, index)}><i className="glyph-icon icon-edit btn-sm btn-warning pointer" /></a>)
// }

export const filterPlans = (plans, devType, imgType) =>
  plans
    .filter((plan) =>
      devType ? devType.includes(plan.deviceType?.toUpperCase()) : plan
    )
    .map((plan, index) => ({
        ...plan,
        _id: index + 1,
        planNameText: plan.planName?.replace(/\n/g, ' '),
        // image: images['country' + (index + 1)],
        // image: `/src/assets/images/country-coverage/${plan.planCode}.png`,
        // image: plan.deviceType == 'D' ? images['japanDeviceGrey'] : images['pocketWifiSimRed2'],
        image: plan.deviceType == 'D' ? images[PRODUCT_IMAGES[imgType || devType]] : images[PRODUCT_IMAGES[plan.deviceType]],
        rate: Number(plan.rate?.toString())?.toFixed(2),
        deviceType: plan?.deviceType?.toUpperCase(),
        planType: plan.days >= 365 ? 'Y' : plan.planType?.toUpperCase()
    }))


// export const planCoverage = (planCountries) =>
//     planCountries?.filter(obj => obj.country != null)?.map(obj => obj.country).join(', ')

export const planCoverage = (planCountriesList) => {
  const currentLanguage = sessionStorage.getItem("i18next")?.toLowerCase();
  const uniqueCountries = Array.from(
    new Map(
      planCountriesList
        ?.filter((item) => item.country != null)
        ?.map((item) => [item.countryCode, item])
    ).values()
  );
  // return uniqueCountries?.map(obj => obj.country).join(', ')

  // For each unique country, find the translation in the master countries array.
  return uniqueCountries
    .map((countryObj) => {
      // Look up the country in the master list by matching countryCode
      const translatedCountry = countries.find(
        (country) => country.countryCode === countryObj.countryCode
      );
      // If master entry exists, return the translated name for the selected language.
      if (translatedCountry) {
        // Try to get the translation. If not available, fallback to the english name.
        return (
          translatedCountry.translations?.[currentLanguage] ||
          translatedCountry.countryName
        );
      }
      // Fallback: if no master entry, use the country name from the API.
      return countryObj.country;
    })
    .join(", ");
};

export const sortByServiceType = (a, b) => {
  const varA = a.serviceType?.toLowerCase?.();
  const varB = b.serviceType?.toLowerCase?.();

  if (varA < varB) return -1;
  if (varA > varB) return 1;
  return 0;
};
