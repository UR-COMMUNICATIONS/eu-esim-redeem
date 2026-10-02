import useDynamicImages from "@/hooks/useDynamicImages";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

export default function GlobalConnectivity() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleCtaClick = () => navigate("/contact");

  const IMAGE_SOURCE = useDynamicImages(
    "landing-page",
    "yoowifi-info-4",
    "webp",
  );
  const benefits = t("info.globalConnectivity.benefits", {
    returnObjects: true,
  });

  return (
    <section className="bg-neutral-50 px-6 py-16 md:py-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: Layout Image */}
        <div className="lg:col-span-6 w-full">
          <div className="w-full aspect-[2/2] overflow-hidden rounded-3xl shadow-md border border-neutral-100 bg-neutral-50">
            <img
              src={IMAGE_SOURCE}
              alt={t("info.globalConnectivity.image.alt")}
              width={1536}
              height={1024}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side: Copy Context & List Features */}
        <div className="lg:col-span-6 flex flex-col">
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-6">
            {t("info.globalConnectivity.headline")}
          </h2>
          <p className="text-base md:text-lg text-neutral-600 leading-relaxed mb-8">
            {t("info.globalConnectivity.subheading")}
          </p>

          <h3 className="text-lg font-bold text-neutral-900 mb-4">
            {t("info.globalConnectivity.benefitsLabel")}
          </h3>

          <ul
            className="space-y-4 mb-10"
            aria-label={t("info.globalConnectivity.benefitsLabel")}
          >
            {benefits.map((benefit, index) => {
              const isStructured =
                typeof benefit === "object" && benefit?.title;
              return (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm md:text-base text-neutral-700"
                >
                  <CheckIcon />
                  <span>
                    {isStructured ? (
                      <>
                        <span className="font-semibold">{benefit.title}</span>
                        {benefit.description && (
                          <span className="font-normal">
                            {", "}
                            {benefit.description}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="font-medium">
                        {typeof benefit === "string" ? benefit : benefit.text}
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>

          <div>
            <button
              onClick={handleCtaClick}
              type="button"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-full text-white bg-red-600 hover:bg-red-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-sm transition-all duration-200 cursor-pointer min-w-[160px]"
            >
              {t("info.globalConnectivity.ctaText")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
