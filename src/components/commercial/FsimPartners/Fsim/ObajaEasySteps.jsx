import React from "react";
import { useTranslation } from "react-i18next";

const ObajaEasySteps = ({ color = "#ed3942", comp }) => {
  const { t } = useTranslation();

  const steps = [
    {
      number: "1",
      title: t("obajaStep.one"),
      icon: "📱",
    },
    {
      number: "2",
      title: t("obajaStep.two"),
      icon: "📝",
    },
    {
      number: "3",
      title: t("obajaStep.three"),
      icon: "📦",
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="containerX mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {t("obajaStep.heading")}
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          {t("obajaStep.sectionSubHeading")}
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold"
                style={{ backgroundColor: color, color: "white" }}
              >
                {step.icon}
              </div>
              <div className="bg-white p-6 pt-14 rounded-lg shadow-md text-center h-full flex flex-col items-center justify-center">
                <h3 className="text-lg font-medium">{step.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ObajaEasySteps;
