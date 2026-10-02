import React, { memo } from "react";
import { cn } from "@/lib/utils";
import { useTranslation, Trans } from "react-i18next";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";

const LegalNotice = ({ }) => {
    const { nameSpace } = useUserLocationLanguage();
    const { t } = useTranslation(["translation", "english", "local"])
    const productInfoRows = t(`${nameSpace}:productInfoRows`, { returnObjects: true }) || [];
    return (
        <div
            className={`container2X sec_common_60 xl:px-0 gap-4 md:gap-6 lg:gap-10`}
        >
            <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-black-800 !leading-[1.4] text-center pb-6">
               {t(`${nameSpace}:productInfotitle.producttitle`)}
            </h1>
            <div className="overflow-x-auto bg-white rounded-lg shadow-md mt-6">
                <table className="min-w-full table-auto border border-gray-200">
                    <tbody className="text-left text-sm text-gray-800">
                        {productInfoRows.map(({ label, value }, index) => (
                            <tr key={index} className="border-b last:border-b-0">
                                <th className="px-6 py-4 bg-gray-100 font-semibold w-1/3 align-top text-base md:text-[18px]">
                                    {label}
                                </th>
                                <td className="px-6 py-4 text-base md:text-[16px]">
                                    <Trans
                                        i18nKey={`productInfoRows.${index}.value`}
                                        components={{
                                            strong: <strong />,
                                            div: <div />,
                                            br: <br />,
                                            a: <a className="text-blue-600 underline" target="_blank" rel="noopener noreferrer" />,
                                        }}
                                    >
                                        {value}
                                    </Trans>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        </div>
    );
};

export default memo(LegalNotice);
