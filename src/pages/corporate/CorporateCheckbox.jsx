import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "react-i18next";
import { commercialRoutes } from "@/services";

const CorporateCheckbox = ({ handleSelectChange, formData }) => {
  const { t } = useTranslation();
  const checkboxData = [
    {
      name: "memberOfYoowifi",
      text: t("corporateAccount.memberofYoowifi"),
      checkedClass:
        "data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600",
    },
    {
      name: "agreedToTerms",
      text: (
        <>
          {t("corporateAccount.iAgreed")}{" "}
          <span className="font-semibold text-red-500">
            <a
              href={commercialRoutes.termsService.path}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("orderSummary.termsAndConditions")}.
            </a>
          </span>
        </>
      ),
      checkedClass:
        "data-[state=checked]:bg-gray-400 data-[state=checked]:border-gray-400 border-red-500 focus:outline-none",
    },
  ];

  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-1/2">
        {checkboxData.map((item, index) => (
          <div
            key={index}
            className={`flex items-center ${index === 0 ? "md:mt-[43px] mt-[23px]" : "md:mt-[23px] mt-[13px]"
              }`}
          >
            <Checkbox
              name={item.name}
              type="button"
              className={item.checkedClass}
              onCheckedChange={(e) => {
                // e.stopPropagation();
                handleSelectChange(item.name, e);
              }}
              checked={formData[item.name]}
            />
            <div className="ml-3">
              <p className="!leading-[1.4] text-[#4F4F4F] font-normal text-[14px]">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CorporateCheckbox;
