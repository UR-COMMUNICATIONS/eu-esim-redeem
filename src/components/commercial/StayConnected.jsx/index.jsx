import React from "react";
import { useTranslation, Trans } from "react-i18next";

const StayConnected = () => {
  const { t } = useTranslation();

  const introParagraphs = t("stayConnected.introParagraphs", {
    returnObjects: true,
  });
  const whyPoints = t("stayConnected.whyPoints", { returnObjects: true });
  const rentPocketSteps = t("stayConnected.rentPocketSteps", { returnObjects: true });
  const rentRouterSteps = t("stayConnected.rentRouterSteps", { returnObjects: true });
  const rentSimSteps = t("stayConnected.rentSimSteps", { returnObjects: true });
  const tipsList = t("stayConnected.tipsList", { returnObjects: true });
  const outroParagraphs = t("stayConnected.outroParagraphs", { returnObjects: true });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        {t("stayConnected.title")}
      </h1>

      {/* Intro Paragraphs */}
      {introParagraphs.map((text, idx) => (
        <p key={idx} className="text-lg leading-relaxed mb-5">
          <Trans
            i18nKey={`stayConnected.introParagraphs.${idx}`}
            components={{
              span: <span className="text-blue-600 underline" />,
            }}
          />
        </p>
      ))}

      {/* Why Section */}
      <h2 className="text-2xl font-bold mt-10 mb-2">{t("stayConnected.whyTitle")}</h2>
      <p className="mb-4 text-gray-700">{t("stayConnected.whyDescription")}</p>
      <div className="space-y-4">
        {whyPoints.map((item, i) => (
          <div key={i}>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Pocket WiFi Section */}
      <h2 className="text-2xl font-bold mt-10 mb-2">
        {t("stayConnected.rentPocketTitle")}
      </h2>
      <p className="mb-4 text-gray-700">
        <Trans
          i18nKey="stayConnected.rentPocketDec"
          components={{
            span: <span className="text-blue-600 underline" />,
          }}
        />
      </p>
      <p className="font-semibold mb-3">{t("stayConnected.stepBystep")}</p>
      <ul className="list-disc list-inside space-y-1">
        {rentPocketSteps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>

      {/* Router Section */}
      <h2 className="text-2xl font-bold mt-10 mb-2">
        {t("stayConnected.rentRouterTitle")}
      </h2>
      <p className="mb-4 text-gray-700">
        {t("stayConnected.rentRouterDec")}
      </p>
      <p className="font-semibold mb-3">{t("stayConnected.rentRouter")}</p>
      <ul className="list-disc list-inside space-y-1">
        {rentRouterSteps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>

      {/* SIM / eSIM Section */}
      <h2 className="text-2xl font-bold mt-10 mb-2">
        {t("stayConnected.rentSimTitle")}
      </h2>
      <p className="mb-4 text-gray-700">
        {t("stayConnected.rentSimDec")}
      </p>
      <p className="font-semibold mb-3">{t("stayConnected.rentSim")}</p>
      <ul className="list-disc list-inside space-y-1">
        {rentSimSteps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>

      {/* Tips Section */}
      <h2 className="text-2xl font-bold mt-10 mb-2">{t("stayConnected.tipsTitle")}</h2>
      <p className="mb-4 text-gray-700">{t("stayConnected.tipsDec")}</p>
      <div className="space-y-4">
        {tipsList.map((tip, i) => (
          <div key={i}>
            <h3 className="font-semibold text-lg">{tip.title}</h3>
            <p className="text-gray-700">{tip.desc}</p>
          </div>
        ))}
      </div>

      {/* Outro Paragraphs */}
      <div className="mt-10">
        {outroParagraphs.map((text, idx) => (
          <p key={idx} className="text-lg leading-relaxed mb-4">
            <Trans
              i18nKey={`stayConnected.outroParagraphs.${idx}`}
              components={{
                span: <span className="text-blue-600 underline" />,
              }}
            />
          </p>
        ))}
      </div>
    </div>
  );
};

export default StayConnected;
