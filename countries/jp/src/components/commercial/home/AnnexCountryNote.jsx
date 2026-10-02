import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

function AnnexCountryNote() {
    const { cart } = useSelector((state) => state.cart);
    const { t } = useTranslation(["translation", "english", "local"]);

    return (
        cart?.annex == 'skyticket' &&
        (
            <div className="w-full mt-4 mb-4 bg-neutral-100 p-3 rounded-md">
                <p className="text-sm text-gray-700 text-center font-medium">
                    {t("extraText.annexCountryNote")}
                </p>
            </div>
        )

    );
}

export default AnnexCountryNote;


