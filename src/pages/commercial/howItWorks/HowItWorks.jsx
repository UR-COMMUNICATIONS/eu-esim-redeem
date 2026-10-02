import DeliverCharge from '@/components/commercial/howItWorks/DeliverCharge';
import RentServices from '@/components/commercial/howItWorks/RentServices';
import RentYooWifi from '@/components/commercial/howItWorks/RentYooWifi';
import SelfReturn from '@/components/commercial/howItWorks/SelfReturn';
import TopUp from '@/components/commercial/howItWorks/TopUp';
import CorporateBanner from '@/components/shared/others/CorporateBanner';
import useDynamicImports from '@/hooks/useDynamicImports';
import useUserLocationLanguage from '@/hooks/useUserLocationLanguage';
import React, { Fragment, Suspense } from 'react';
import { useTranslation } from "react-i18next";

const HowItWorks = () => {
    const { currentCountry, isTargetCountry, nameSpace } = useUserLocationLanguage();
    const { t } = useTranslation(["translation", "english", "local"])
    const path =
        "&/countries/{currentCountry}/src/components/commercial/howItWorks/SelfReturn.jsx";
    const SelfReturn_Dynamic = useDynamicImports(path);

    const rentYooWifiPath =
        "&/countries/{currentCountry}/src/components/commercial/howItWorks/RentYooWifi.jsx";
    const RentYooWifi_Dynamic = useDynamicImports(rentYooWifiPath);

    const TopUpPath =
        "&/countries/{currentCountry}/src/components/commercial/howItWorks/TopUp.jsx";
    const TopUp_Dynamic = useDynamicImports(TopUpPath);
    return (
        <Fragment>
            <CorporateBanner isShowBannerBottom={false} path='/view-more' />
            <Suspense fallback={<div>Loading...</div>}>
                {RentYooWifi_Dynamic ? <RentYooWifi_Dynamic /> : null}
            </Suspense>
            {/* <RentYooWifi /> */}
            {!isTargetCountry && <DeliverCharge />}
            {/* <RentServices /> */}
            {/* <SelfReturn /> */}
            <Suspense fallback={<div>Loading...</div>}>
                {SelfReturn_Dynamic ? <SelfReturn_Dynamic /> : null}
            </Suspense>
            {/* <TopUp /> */}
            <Suspense fallback={<div>Loading...</div>}>
                {TopUp_Dynamic ? <TopUp_Dynamic /> : null}
            </Suspense>
        </Fragment>
    );
};

export default HowItWorks;