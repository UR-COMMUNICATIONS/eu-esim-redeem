import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SupportedPaymentMethods = ({ onTypeChange, selectedPaymentMethod }) => {
  const { user } = useSelector((state) => state.auth);
  const [methodsList, setMethodsList] = useState([]);

  useEffect(() => {
    const methods = [];

    // Credit/Debit Card is available for everyone
    methods.push({ label: "Credit/Debit Card", code: "CC" });

    // Country-specific payment methods
    const originCountry = user?.originCountry?.toUpperCase();

    console.log("User Origin Country:", originCountry);

    if (originCountry === "PH") {
      methods.push({ label: "GCASH", code: "GCASH" });
    }

    if (originCountry === "ID") {
      methods.push({ label: "QRIS", code: "QRIS" });
      methods.push({ label: "Bank Transfer", code: "IMBANK" });
    }

    setMethodsList(methods);

    // Set initial payment method if not already set
    if (!selectedPaymentMethod && methods.length > 0) {
      onTypeChange(methods[0].code);
    }
  }, [user?.originCountry]);

  if (!methodsList.length) {
    return null;
  }

  const handleMethodClick = (methodCode) => {
    onTypeChange(methodCode);
  };

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {methodsList.map((method) => {
          const isSelected = selectedPaymentMethod === method.code;
          return (
            <button
              key={method.code}
              onClick={() => handleMethodClick(method.code)}
              className={`
                px-4 py-3 rounded-lg font-medium transition-all duration-200
                border-2 text-center
                ${
                  isSelected
                    ? "bg-main-600 text-white border-main-600 shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:border-main-400 hover:bg-main-50"
                }
              `}
            >
              {method.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SupportedPaymentMethods;
