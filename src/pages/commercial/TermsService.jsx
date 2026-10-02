import React from 'react';
import { useTranslation } from 'react-i18next';
import TermsHeader from '@/components/commercial/TermsService/TermsHeader';

const TermsService = () => {
    const { t } = useTranslation();

    return (
        <div className="overflow-hidden w-full">
            <TermsHeader />
        </div>
    );
};

export default TermsService;