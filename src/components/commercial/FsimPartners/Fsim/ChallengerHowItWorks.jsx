import SectionHeader from "@/components/shared/others/SectionHeader";
import { useTranslation } from "react-i18next";

const CHALLENGER_STORE_LOCATIONS = [
  {
    name: "Ang Mo Kio Hub (Level 2)",
    address: "53 Ang Mo Kio Avenue 3 #02-09 to 14, Ang Mo Kio Hub",
  },
  {
    name: "Bugis Junction (Flagship)",
    address: "200 Victoria Street #B1-26, Bugis Junction",
  },
  {
    name: "Causeway Point",
    address: "1 Woodlands Square #04-06/07, Causeway Point",
  },
  {
    name: "Changi Jewel",
    address: "78 Airport Boulevard #B2-214/215/216, Jewel Changi Airport",
  },
  { name: "JEM", address: "50 Jurong Gateway Road #04-01, JEM" },
  {
    name: "Jurong Point",
    address:
      "63 Jurong West Central 3 JP2#B1-94/95/96, Jurong Point Shopping Centre",
  },
  { name: "NEX", address: "23 Serangoon Central #04-33/34, NEX" },
  {
    name: "Tampines 1",
    address: "10 Tampines Central 1 #04-24/25, Tampines 1",
  },
  { name: "VivoCity", address: "1 HarbourFront Walk, #02-34/35, VivoCity" },
  {
    name: "Waterway Point",
    address: "83 Punggol Central #B1-26, Waterway Point",
  },
];

const ChallengerHowItWorks = () => {
  const { t } = useTranslation();
  const challengerData = t("challenger", { returnObjects: true });
  const howItWorks = challengerData?.howItWorks || {};

  const items =
    howItWorks?.items && Array.isArray(howItWorks.items)
      ? howItWorks.items
      : [t("challenger.howItWorks.item1"), t("challenger.howItWorks.item2")];

  return (
    <section className="sec_common_60 md:!py-12 !py-6 bg-gradient-to-b from-white to-gray-50">
      <div className="containerX mx-auto px-4">
        <SectionHeader
          heading={howItWorks?.heading || t("challenger.howItWorks.heading")}
          containerClassName="gap-4 mb-8 md:mb-12"
        />

        <div className="max-w-4xl mx-auto">
          {/* Data Offer Cards */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8">
            {items.map((item, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-gray-100 hover:border-[#E41F26] hover:shadow-xl transition-all duration-300"
              >
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#E41F26]/10 to-transparent rounded-bl-full"></div>

                <div className="relative">
                  {/* Icon/Emoji */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E41F26] to-[#FF6B6B] flex items-center justify-center text-white text-xl font-bold shadow-md">
                      {index + 1}
                    </div>
                  </div>

                  {/* Item text with emphasis */}
                  <div className="space-y-2">
                    <p className="text-lg md:text-xl font-bold text-gray-900 leading-tight">
                      {item.split("→").map((part, i) => {
                        if (i === 0) {
                          return (
                            <span key={i} className="text-gray-700">
                              {part.trim()}
                            </span>
                          );
                        }
                        return (
                          <span key={i}>
                            <span className="mx-2 text-[#E41F26]">→</span>
                            <span className="text-[#E41F26] font-extrabold">
                              {part.trim()}
                            </span>
                          </span>
                        );
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Description Card */}
          {howItWorks?.description && (
            <div className="bg-gradient-to-r from-[#E41F26]/5 to-[#FF6B6B]/5 rounded-xl p-6 md:p-8 border-l-4 border-[#E41F26] mb-6">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {howItWorks.description}
              </p>
            </div>
          )}

          {/* Note */}
          {howItWorks?.note && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-sm md:text-base text-gray-600 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <span className="text-xl">
                  {howItWorks.note.includes("📍") ? "📍" : "ℹ️"}
                </span>
                <p>{howItWorks.note.replace("📍", "").trim()}</p>
              </div>
              {/* Store locations list */}
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-gray-700 bg-white rounded-lg p-5 md:p-6 shadow-sm border border-gray-200">
                {CHALLENGER_STORE_LOCATIONS.map((store, index) => (
                  <li key={index} className="leading-snug">
                    <span className="font-semibold text-gray-900">
                      {store.name}
                    </span>
                    <span className="block pl-5 text-gray-600 text-sm md:text-base mt-0.5">
                      {store.address}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ChallengerHowItWorks;
