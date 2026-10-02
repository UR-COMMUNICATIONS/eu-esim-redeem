// import { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { SuccessIcon, ErrorIcon } from "@/services";
// import Loader from "@/components/shared/Loader";

// const ConfirmationMessage = ({ handleContinue }) => {
//     const { t } = useTranslation();

//     const [process, setProcess] = useState({});

//     useEffect(() => {
//         setProcess(prev => ({ ...prev, isProcessing: true }));
//         const timer = setTimeout(() => {
//             setProcess({
//                 isProcessing: false,
//                 alertType: "success",
//                 title: "Payment Successful",
//                 alertMessage: "Your order has been confirmed.",
//                 //  isProcessing: false,
//                 // alertType: "error", // change to "success" to test success
//                 // title: "Payment Failed",
//                 // alertMessage: "We couldn’t process your payment. Please try again.",
//             });
//         }, 3000);

//         return () => clearTimeout(timer);
//     }, []);
//     return (
//         <div className="w-[calc(100vw-32px)] max-w-[540px] h-auto min-h-[286px] sm:min-h-[438px] rounded-xl md:rounded-3xl flex flex-col items-center px-4 md:px-8 lg:px-[60px] pt-10 md:pt-[60px] pb-6 md:pb-[60px] gap-6 md:gap-12 bg-main-50 relative mx-auto m-10">
//             {process.isProcessing ? (
//                 <div className="flex flex-col gap-6 items-center justify-center flex-1 min-h-[200px]">
//                     <Loader
//                         type="Oval"
//                         color="white"
//                         height={100}
//                         width={100}
//                     />
//                     <div className="text-center flex flex-col gap-3 sm:gap-4">
//                         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-700">
//                             {t("process.processRates", "Processing Rates")}
//                         </h2>
//                         <p className="text-base text-black-700">
//                             {t("process.processMessage", "Please wait while we process your request.")}
//                         </p>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="flex flex-col gap-6 items-center">
//                     <div className="flex items-center justify-center">
//                         {process.alertType === "success" ? (
//                             <SuccessIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />
//                         ) : (
//                             <ErrorIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />
//                         )}
//                     </div>
//                     <div className="text-center flex flex-col gap-3 sm:gap-4">
//                         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-700">
//                             {process.title}
//                         </h2>
//                         <p className="text-base text-black-700">
//                             {process.alertMessage}
//                         </p>
//                     </div>
//                     <button
//                         onClick={handleContinue}
//                         className={`px-10 py-4 text-white rounded-xl max-w-max mx-auto outline-none border-none ${process.alertType === "success"
//                             ? "bg-green-500 hover:bg-green-600"
//                             : "bg-red-500 hover:bg-red-600"
//                             }`}
//                     >
//                         {t("orderSummary.continue", "Continue")}
//                     </button>
//                 </div>
//             )}
//         </div>

//     );
// };

// export default ConfirmationMessage;

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SuccessIcon, ErrorIcon } from "@/services";
import Loader from "@/components/shared/Loader";

const ConfirmationMessage = ({ handleContinue }) => {
  const { t } = useTranslation();
  const [process, setProcess] = useState({});

  useEffect(() => {
    setProcess({ isProcessing: true });
    const timer = setTimeout(() => {
      setProcess({
        isProcessing: false,
        alertType: "success",
        title: "Payment Successful",
        alertMessage: "Your order has been confirmed.",
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="w-[calc(100vw-32px)] max-w-[540px] min-h-[286px] sm:min-h-[438px] 
      rounded-2xl shadow-xl border border-gray-100 
      bg-gradient-to-b from-white to-gray-50
      flex flex-col items-center justify-center 
      p-8 md:p-12 gap-8 mx-auto m-10 transition-all duration-300 ease-in-out"
    >
      {process.isProcessing ? (
        <div className="flex flex-col gap-6 items-center justify-center flex-1 min-h-[200px] animate-fadeIn">
          <div className="p-4 bg-main-500 rounded-full shadow-lg">
            <Loader
              type="Oval"
              color="white"
              height={"18vw"}
              width={"18vw"}
              className="max-h-[100px] max-w-[100px] min-h-[60px] min-w-[60px]"
            />
          </div>
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {t("process.processRates", "Processing Rates")}
            </h2>
            <p className="text-gray-600">
              {t(
                "process.processMessage",
                "Please wait while we process your request.",
              )}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 items-center animate-fadeIn">
          <div className="p-4 rounded-full shadow-lg bg-gray-100 transform scale-110 transition-transform">
            {process.alertType === "success" ? (
              <SuccessIcon className="w-24 h-24 text-green-500" />
            ) : (
              <ErrorIcon className="w-24 h-24 text-red-500" />
            )}
          </div>
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {process.title}
            </h2>
            <p className="text-gray-600">{process.alertMessage}</p>
          </div>
          <button
            onClick={handleContinue}
            className={`px-10 py-4 rounded-xl font-medium shadow-md transition-all duration-300 
              ${
                process.alertType === "success"
                  ? "bg-green-500 hover:bg-green-600 hover:shadow-green-200"
                  : "bg-red-500 hover:bg-red-600 hover:shadow-red-200"
              } text-white`}
          >
            {t("orderSummary.continue", "Continue")}
          </button>
        </div>
      )}
    </div>
  );
};

export default ConfirmationMessage;
