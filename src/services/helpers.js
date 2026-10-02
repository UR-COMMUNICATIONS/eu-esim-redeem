// Add zero to number if it is less than 10
const addZeroToNumber = (number) => {
  return number < 10 ? `0${number}` : number;
};

function validateCardDetails({ cardNumber = "", cvc = "", expireDate = "" }) {
  const cardNumberRegex = /^\d{13,19}$/;
  const cvcRegex = /^\d{3,4}$/;
  const expireDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

  if (!cardNumberRegex.test(cardNumber)) {
    return { error: "Card number must be between 13 and 19 digits." };
  }

  if (!cvcRegex.test(cvc)) {
    return { error: "CVC must be 3 or 4 digits." };
  }

  if (!expireDateRegex.test(expireDate)) {
    return { error: "Expire date must be in the format MM/YY." };
  }

  return { error: null };
}

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleNumericInput = (e) => {
  const maxLength = 15;
  const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

  if (e.type === "keydown") {
    // Allow essential keys, but only permit number keys if under max length and block spaces
    if (
      !allowedKeys.includes(e.key) && // Allow essential keys
      (isNaN(e.key) || e.key === " " || e.target.value.length >= maxLength) // Block non-numeric, space, and enforce max length
    ) {
      e.preventDefault();
    }
  }

  if (e.type === "paste") {
    const pasteData = e.clipboardData.getData("Text");

    // Check if pasted data is numeric, has no whitespace, and is within max length
    if (
      !/^\d+$/.test(pasteData) ||
      e.target.value.length + pasteData.length > maxLength
    ) {
      e.preventDefault();
    }
  }
};

function getUniqueCountries(locations) {
  const uniqueCountries = new Map();

  locations.forEach(({ locationCountryCode, locationCountry }) => {
    if (!uniqueCountries.has(locationCountryCode)) {
      uniqueCountries.set(locationCountryCode, locationCountry);
    }
  });

  return Array.from(uniqueCountries.entries()).map(
    ([locationCountryCode, locationCountry]) => ({
      locationCountryCode,
      locationCountry,
    })
  );
}

export const debounce = (func, delay = 300) => {
  let timer;

  const debounced = (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };

  debounced.cancel = () => {
    clearTimeout(timer);
  };

  return debounced;
};

export {
  addZeroToNumber,
  getUniqueCountries,
  handleNumericInput,
  validateCardDetails,
  validateEmail,
};
