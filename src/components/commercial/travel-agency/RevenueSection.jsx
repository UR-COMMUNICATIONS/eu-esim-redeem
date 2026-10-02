import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import useDynamicImages from "@/hooks/useDynamicImages";

const IMAGE_FOLDER = "TravelAgency";

const RevenueSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const imageKey = t("travelAgency.revenueSection.image");
  const imageSrc = useDynamicImages(IMAGE_FOLDER, imageKey || "");
  const checkListItems =
    t("travelAgency.revenueSection.items", { returnObjects: true }) || [];

  return (
    <section className="bg-[#F8F9FA] py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left Side: Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={imageSrc}
            alt="Travelers using devices in airport lounge"
            className="w-full h-auto object-cover rounded-[2rem] shadow-md"
          />
        </div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl md:text-[40px] font-bold text-gray-900 leading-tight mb-4">
            {t("travelAgency.revenueSection.headingLine1")}
            <br />
            {t("travelAgency.revenueSection.headingLine2")}
          </h2>
          <p className="text-gray-500 text-base mb-8 leading-relaxed">
            {t("travelAgency.revenueSection.body")}
          </p>

          {/* Features List */}
          <ul className="space-y-4 mb-10">
            {checkListItems.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-green-500 mt-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700 text-sm md:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* Action Button */}
          <Button
            className="bg-[#D93833] hover:bg-red-700 text-white rounded-full px-8 py-6 font-semibold text-base transition-colors"
            onClick={() => navigate("/contact")}
          >
            {t("travelAgency.revenueSection.ctaLabel")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RevenueSection;
