import React from 'react';
import { useTranslation } from 'react-i18next';
import PolicyHeader from '@/components/commercial/Policys/PolicyHeader';

const PrivacyPolicy = () => {
    const { t } = useTranslation();

    return (
        <div className="overflow-hidden w-full">
            <PolicyHeader />
        </div>
    );
};

export default PrivacyPolicy;