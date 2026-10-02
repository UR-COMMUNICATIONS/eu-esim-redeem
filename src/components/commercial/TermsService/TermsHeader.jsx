import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { useLocation } from "react-router-dom";
import TermsContentText from "./TermsContentText";

const TermsHeader = ({ containerClassName = "", subHeadingClassName = "" }) => {
  const { isTargetCountry, currentCountry } = useUserLocationLanguage();
  const { pathname } = useLocation();
  const { t } = useTranslation(["translation", "english", "local"]);

  const isMyContext =
    pathname?.toLowerCase?.().startsWith("/my/") || currentCountry === "my";
  const isIdContext = currentCountry === "id";
  const myTerms = t("translation:TermsDetailsMY", { returnObjects: true });
  const defaultTerms = t("translation:TermsDetails", { returnObjects: true });
  const idTerms = t("local:TermsDetails", { returnObjects: true });

  let TermsDetails;
  if (isMyContext && Array.isArray(myTerms)) {
    TermsDetails = myTerms;
  } else if (isIdContext && Array.isArray(idTerms)) {
    TermsDetails = idTerms;
  } else {
    TermsDetails = defaultTerms;
  }

  return (
    <div
      className={`container2X sec_common_60 xl:px-0 gap-4 md:gap-6 lg:gap-10 ${containerClassName}`}
    >
      {TermsDetails?.map((section, index) => (
        <div key={index} className="space-y-6">
          <div className="text-lg md:text-2xl !leading-[1.2] md:!leading-[1.4] md:font-bold text-[40px]">
            <h1 className="text-[30px]">{t(section.heading)}</h1>
          </div>
          <div className="text-xs md:text-lg !leading-[1.4] mb-8">
            {Array.isArray(section.content) ? (
              section.content.map((item, i) =>
                typeof item === "string" ? (
                  <TermsContentText key={i} content={item} />
                ) : (
                  (!isTargetCountry || isIdContext) && (
                    <React.Fragment key={i}>
                      <table className="w-full border-collapse border border-gray-300 mb-2">
                        <thead>
                          <tr className="text-left border-b border-gray-300 bg-gray-100">
                            {item.headers.map((header, hIndex) => (
                              <th
                                key={hIndex}
                                className="px-2 py-2 border-r border-gray-300 pl-[20px] font-medium"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {item.rows.map((row, rIndex) => (
                            <tr
                              key={rIndex}
                              className={`border-b border-gray-300 ${rIndex === 1 ? "bg-gray-100" : ""}`}
                            >
                              {row.map((cell, cIndex) => (
                                <td
                                  key={cIndex}
                                  className="px-2 py-3 border-r border-gray-300 pl-[20px]"
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {item.note && (
                        <p className="text-sm text-gray-600 mb-8 italic">
                          {item.note}
                        </p>
                      )}
                    </React.Fragment>
                  )
                ),
              )
            ) : (
              <TermsContentText content={section.content} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(TermsHeader);
