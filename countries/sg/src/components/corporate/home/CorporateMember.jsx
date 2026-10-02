import { Button } from "@/components/ui/button";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { corporateRoutes } from "@/services";

const CorporateMember = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <>
            <div className="md:mt-[40px] mt-[20px] ">
                <h2 className={`title md:mb-[16px]`}>
                    {t(`pocketWifi.product.corporateMember`)}
                </h2>
                <p
                    className={cn(
                        "text-xs md:text-lg !leading-[1.4] text-center text-black-600"
                    )}
                >
                    {t(`pocketWifi.product.signUpCorporater`)}
                </p>
            </div>
            <div className="mt-6 lg:mt-10 flex justify-center">
                <Button size="lg"
                    onClick={() => navigate(corporateRoutes.corporateAccount.path)}
                >
                    {t("buttonText.findOutMore")}
                </Button>
            </div>
        </>
    );
};

export default CorporateMember;
