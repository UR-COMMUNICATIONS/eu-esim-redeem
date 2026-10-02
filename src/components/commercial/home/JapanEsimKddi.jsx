import React, { Suspense } from 'react';
import JapanEsimPackage from "./JapanEsimPackage";
import useDynamicImages from "@/hooks/useDynamicImages";

function JapanEsimKddi() {
    const image = useDynamicImages("others", "japan-esim-kddi")
    return (
        <div className="overflow-hidden w-full">
            <div className="w-full h-full">
                <img
                    src={image}
                    alt="Esim kddi"
                    className="w-full h-auto bg-contain"
                    loading="lazy"
                />
            </div>
            <JapanEsimPackage />
        </div>
    );
}

export default JapanEsimKddi;


