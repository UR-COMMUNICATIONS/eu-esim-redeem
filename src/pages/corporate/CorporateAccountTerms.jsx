import { useTranslation } from "react-i18next";
const CorporateAccountTerms = () => {
  const { t } = useTranslation();

  return (
    <div className="md:my-[70px] my-[30px]">
      <p className="!leading-[1.4] text-[#4F4F4F] font-bold text-[20px] whitespace-pre-line">
        {t(`orderSummary.termsAndConditions`)}
      </p>
      <p className="!leading-[1.4] text-[#4F4F4F] font-bold text-[14px] whitespace-pre-line md:mt-[20px] mt-[10px]">
        {t(`corporateAccount.termsConditions`)}
      </p>
    </div>
  );
};

export default CorporateAccountTerms;
