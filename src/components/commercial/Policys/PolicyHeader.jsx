import React, { memo } from "react";
import { cn } from "@/lib/utils";
import { useTranslation, Trans } from "react-i18next";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { useLocation } from "react-router-dom";

const PolicyHeader = ({
  containerClassName = "",
  subHeadingClassName = "",
}) => {
  const { currentCountry } = useUserLocationLanguage();
  const { pathname } = useLocation();
  const { t } = useTranslation(["translation", "english", "local"]);

  const isMyContext =
    pathname?.toLowerCase?.().startsWith("/my/") || currentCountry === "my";
  const isIdContext = currentCountry === "id";
  const myPolicySections = t("translation:policyDetailsMY", {
    returnObjects: true,
  });
  const defaultPolicySections = t("translation:policyDetails", {
    returnObjects: true,
  });
  const idPolicySections = t("local:policyDetails", { returnObjects: true });

  let policySections;
  if (isMyContext && Array.isArray(myPolicySections)) {
    policySections = myPolicySections;
  } else if (isIdContext && Array.isArray(idPolicySections)) {
    policySections = idPolicySections;
  } else {
    policySections = defaultPolicySections;
  }

  return (
    <div
      className={`container2X sec_common_60 xl:px-0 gap-4 md:gap-6 lg:gap-10 ${containerClassName}`}
    >
      {policySections.map((section, index) => (
        <div key={index} className="space-y-6">
          <div className="text-lg md:text-2xl !leading-[1.2] md:!leading-[1.4] md:font-bold text-[40px]">
            <h1 className="text-[30px]">{section.heading}</h1>
            {section.subheading && (
              <h2 className="text-[30px] mt-[30px]">{section.subheading}</h2>
            )}
          </div>
          <div
            className={cn(
              subHeadingClassName,
              "text-xs md:text-lg !leading-[1.4] mb-8",
            )}
          >
            <p className="mb-[40px]" style={{ whiteSpace: "pre-line" }}>
              {typeof section.content === "string" &&
              section.content.includes(".") ? (
                <Trans
                  i18nKey={section.content}
                  ns={isIdContext ? "local" : "translation"}
                  components={{
                    strong: <strong />,
                    span: <span className="text-red-400" />,
                  }}
                />
              ) : (
                section.content
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(PolicyHeader);
