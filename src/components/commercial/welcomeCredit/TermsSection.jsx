import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const PAGE_KEY = "welcomeCredit";

function TermsCard({ title, content }) {
  return (
    <div className="bg-white p-8 rounded-[32px] shadow-sm flex flex-col h-full border border-gray-50">
      <h3 className="font-['DMSans'] font-bold text-[24px] leading-[140%] text-[#D32F2F] mb-4">
        {title}
      </h3>
      <p className="font-['DMSans'] font-normal text-[18px] leading-[140%] text-[#4B5563]">
        {content}
      </p>
    </div>
  );
}

function TermsSection({ credit, onOrderToday }) {
  const { t } = useTranslation();
  const creditAmount = credit?.amount ?? "$5";
  const minSpend = credit?.minSpend ?? "$10";
  const rawSections =
    t(`${PAGE_KEY}.termsSections`, { returnObjects: true }) || [];
  const sections = Array.isArray(rawSections)
    ? rawSections.map((s) => ({
        ...s,
        content: s.content
          .replace(/\{\{credit\}\}/g, creditAmount)
          .replace(/\{\{minSpend\}\}/g, minSpend),
      }))
    : rawSections;

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-[#FFF2F2] py-12 px-2 md:px-6 my-8 rounded-md flex flex-col gap-8">
      <div className="max-w-full mx-auto w-full">
        <h1 className="font-['DMSans'] font-bold text-[36px] leading-[140%] text-center text-[#191919] mb-12">
          {t(`${PAGE_KEY}.termsTitle`)}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {Array.isArray(sections) &&
            sections.map((section, i) => (
              <TermsCard
                key={i}
                title={section.title}
                content={section.content}
              />
            ))}
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => onOrderToday?.()}
            className="bg-[#C63D2F] text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-[#A32F24] transition-colors shadow-lg"
          >
            {t(`${PAGE_KEY}.orderToday`)} <ArrowUpRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TermsSection;
