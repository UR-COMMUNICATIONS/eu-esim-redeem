import { useTranslation, Trans } from "react-i18next";

const CorporateAccountInfo = () => {
  const { t } = useTranslation();

  const sections = [
    "corporateAccount.whySignUp",
    "corporateAccount.startedSimple",
    "corporateAccount.exclusiveBenefits",
  ];

  return (
    <div>
      {sections.map((key, index) => (
        <div
          key={key}
          className={`text-center ${
            index === 0 ? "md:mt-[80px]" : "md:mt-[160px]"
          } mt-[30px]`}
        >
          <h1 className="text-[28px] md:text-[60px] !leading-[1.1] text-black font-bold whitespace-pre-line md:px-10">
            {t(`${key}.heading`)}
          </h1>
          <p
            className="!leading-[1.4] text-black text-base md:text-[24px] whitespace-pre-line md:mt-[16px] mt-[8px] md:px-10">
            <Trans
              i18nKey={`${key}.subHeading`}
              components={{ strong: <strong /> }}
            />
          </p>
        </div>
      ))}
      <p className="!leading-[1.4] text-black font-bold text-base md:text-[24px] whitespace-pre-line md:mt-[120px] mt-[30px] text-center">
        {t("corporateAccount.signUpToday")}
      </p>
    </div>
  );
};

export default CorporateAccountInfo;
