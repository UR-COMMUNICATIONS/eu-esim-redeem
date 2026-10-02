import HeroCommon from "@/components/shared/others/HeroCommon";
import CorporateAccountInfo from "./CorporateAccountInfo";
import CorporateAccountForm from "./CorporateAccountForm";
import { useTranslation } from "react-i18next";

const CorporateAccount = () => {
    const { t } = useTranslation();

    return (
        <div>
            <HeroCommon>
                <div className="containerX flex flex-col gap-3 relative z-[2]">
                    <h1 className="text-[28px] md:text-[60px] !leading-[1.1] text-white font-bold uppercase flex flex-col items-start">
                        {t("corporateAccount.title")}
                    </h1>
                    <div className="w-full md:w-1/2">
                        <p className="!leading-[1.4] text-[#D1D1D1] font-medium text-[17px]">
                            {t("corporateAccount.description")}
                        </p>
                    </div>
                </div>
            </HeroCommon>
            <div className="lg:px-0 px-4">
                <CorporateAccountInfo />
                <CorporateAccountForm />
            </div>
        </div>
    );
};

export default CorporateAccount;
