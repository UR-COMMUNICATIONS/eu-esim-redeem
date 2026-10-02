import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import useDynamicImages from '@/hooks/useDynamicImages';

function SkyticketBanner() {
    const { cart } = useSelector((state) => state.cart);

    // useEffect(() => {
    //     console.log("annex", cart);
    //     setpromoCode(cart.promoCode)
    // }, [cart.annex]);
    console.log("cart annex", cart.annex);

    return (
        cart?.annex == "skyticket" ?
            <div className="w-full">
                <img
                     src={useDynamicImages("others", "skyticket" )}
                    alt="Promo Banner"
                    className="w-full h-auto object-cover"
                />
            </div>
            :
            <></>
    );
}

export default SkyticketBanner;
