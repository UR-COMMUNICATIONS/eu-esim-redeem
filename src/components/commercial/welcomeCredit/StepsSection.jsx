import promoEnterImg from "@/assets/images/welcome-credit/promo-enter.webp";
import { CheckCircle, Download, Gift, ShoppingCart, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";

const PAGE_KEY = "welcomeCredit";

const STEP_ICONS = [CheckCircle, Tag, ShoppingCart, Download];

const STEP_COLORS = [
  {
    bg: "bg-main-50",
    ring: "ring-main-100",
    icon: "text-main-500",
    number: "bg-main-500",
  },
  {
    bg: "bg-secondary-50",
    ring: "ring-secondary-100",
    icon: "text-secondary-600",
    number: "bg-secondary-500",
  },
  {
    bg: "bg-main-50",
    ring: "ring-main-100",
    icon: "text-main-500",
    number: "bg-main-500",
  },
  {
    bg: "bg-secondary-50",
    ring: "ring-secondary-100",
    icon: "text-secondary-600",
    number: "bg-secondary-500",
  },
];

function StepCard({ index, text, image }) {
  const Icon = STEP_ICONS[index] || Gift;
  const colors = STEP_COLORS[index] || STEP_COLORS[0];
  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`group relative flex flex-col gap-5 rounded-2xl border border-neutral-100 bg-white p-6 shadow-card-secondary transition-all duration-300 hover:-translate-y-1 hover:shadow-card-primary`}
    >
      {/* Step number badge */}
      <div className="flex items-center justify-between">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-full font-['SansPro'] text-lg font-black text-white ${colors.number}`}
        >
          {stepNumber}
        </span>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ring-2 ${colors.ring} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon size={22} className={colors.icon} />
        </div>
      </div>

      {/* Step text */}
      <p className="font-['DMSans'] text-base font-medium leading-relaxed text-black-500">
        {text}
      </p>

      {/* Optional step image — partial screenshot reference */}
      {image && (
        <div className="overflow-hidden rounded-xl ring-2 ring-red-200">
          <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
            <span className="font-['DMSans'] text-xs font-semibold uppercase tracking-wide text-red-400">
              Reference
            </span>
          </div>
          <img
            src={image}
            alt={`step-${stepNumber}-reference`}
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      {/* Bottom accent line */}
      <div
        className={`absolute bottom-0 left-6 right-6 h-0.5 rounded-full ${colors.number} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />
    </div>
  );
}

function StepsSection({ credit }) {
  const { t } = useTranslation();
  const creditAmount = credit?.amount ?? "$5";
  const rawSteps = t(`${PAGE_KEY}.steps`, { returnObjects: true }) || [];
  const steps = Array.isArray(rawSteps)
    ? rawSteps.map((s) => s.replace(/\{\{credit\}\}/g, creditAmount))
    : rawSteps;

  return (
    <section className="sec_common_60 bg-white">
      <div className="containerX">
        <div className="mb-10 text-center">
          <h2 className="title">{t(`${PAGE_KEY}.stepsTitle`)}</h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-main-500" />
        </div>

        <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {Array.isArray(steps) &&
            steps.map((text, i) => (
              <StepCard
                key={i}
                index={i}
                text={text}
                image={i === 1 ? promoEnterImg : undefined}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

export default StepsSection;
