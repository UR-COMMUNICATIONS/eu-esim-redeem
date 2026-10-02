import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const PAGE_KEY = "welcomeCredit";

function tagFontSize(tag = "") {
  const len = tag.length;
  if (len <= 3) return "text-6xl md:text-7xl";
  if (len <= 5) return "text-4xl md:text-5xl";
  if (len <= 7) return "text-3xl md:text-4xl";
  return "text-2xl md:text-3xl";
}

function HeroSection({ credit, onOrderToday }) {
  const { t } = useTranslation();
  const vars = { credit: credit?.amount ?? "$5" };

  const para1 = t(`${PAGE_KEY}.heroParagraph1`, vars);
  const para2 = t(`${PAGE_KEY}.heroParagraph2`, vars);
  const para3 = t(`${PAGE_KEY}.heroParagraph3`, vars);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #BC191C 0%, #D81F22 50%, #E83538 100%)",
      }}
    >
      {/* Decorative background circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-black/10 blur-3xl" />
        <div className="absolute right-1/4 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />
      </div>

      <div className="containerX relative z-10 py-16 md:py-20 lg:py-24 ">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-16">
          {/* Price tag badge */}
          {/* <div className="flex shrink-0 flex-col items-center lg:items-start">
            <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-4 border-white/30 bg-white/10 shadow-2xl backdrop-blur-sm transition-transform duration-500 hover:scale-105 md:h-56 md:w-56">
              <div className="absolute inset-2 rounded-full border border-white/20" />
              <div className="text-center px-3">
                <span
                  className={`block font-['SansPro'] font-black leading-none text-white ${tagFontSize(credit?.tag)}`}
                  style={{ textShadow: "0 4px 24px rgba(0,0,0,0.25)" }}
                >
                  {credit?.tag ?? "$5"}
                </span>
                <span className="mt-1 block font-['DMSans'] text-sm font-semibold uppercase tracking-widest text-white/80">
                  Travel Credit
                </span>
              </div>
            </div>
          </div> */}

          {/* Text content */}
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <h1
              className="whitespace-pre-line font-['SansPro'] text-3xl font-black uppercase leading-tight tracking-tight text-white md:text-4xl lg:text-5xl xl:text-[56px]"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.2)" }}
            >
              {t(`${PAGE_KEY}.heroTitle`, vars)}
            </h1>

            <div className="flex flex-col gap-4">
              {[para1, para2, para3].map((para, i) => (
                <p
                  key={i}
                  className="font-['DMSans'] max-w-4xl text-base leading-relaxed text-white/90 md:text-lg"
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-2 flex justify-center lg:justify-start">
              <button
                type="button"
                onClick={() => onOrderToday?.()}
                className="group flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-['DMSans'] text-base font-bold text-[#D81F22] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary-500 hover:text-white hover:shadow-xl active:scale-95"
              >
                {t(`${PAGE_KEY}.orderToday`)}
                <ArrowUpRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
