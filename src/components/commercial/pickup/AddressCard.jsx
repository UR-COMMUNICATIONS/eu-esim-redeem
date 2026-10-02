import { useTranslation } from "react-i18next";

const AddressCard = ({
  title,
  country,
  code,
  street,
  postal,
  isHighlighted = false,
  onNavigate,
  hideNavigateButton = false,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`
      relative p-6 rounded-3xl border transition-all duration-300
      ${isHighlighted ? "bg-[#FFC400] border-transparent shadow-md" : "bg-white border-gray-100 hover:border-gray-200"}
    `}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h4 className="font-['DMSans'] font-semibold text-[18px] leading-[120%] text-[#191919]">
            {title}
          </h4>

          <div
            className={`
            inline-block px-2 py-0.5 rounded text-[14px] font-bold uppercase tracking-wider
            ${isHighlighted ? "bg-black text-white" : "bg-gray-100 text-gray-500"}
          `}
          >
            {country}
          </div>

          <div className="mt-4 space-y-1 font-['DMSans'] text-gray-500 text-md">
            <p className="font-bold text-gray-700">{code}</p>
            <p>{street}</p>
            <p>{postal}</p>
          </div>
        </div>

        {!hideNavigateButton && (
          <button
            type="button"
            onClick={() => onNavigate?.({ title, street, code, postal })}
            className={`
            mt-auto px-4 py-2 rounded-lg border text-sm font-bold transition-colors
            ${isHighlighted ? "border-black bg-transparent text-black hover:bg-black/5" : "border-[#D32F2F] text-[#D32F2F] hover:bg-red-50"}
          `}
          >
            {t("pickup.navigate") || "Navigate"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
