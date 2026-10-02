import SectionHeader from "@/components/shared/others/SectionHeader";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

function PocketWiFiRental() {
  const { t } = useTranslation(["translation", "english", "local"]);

  const items = t("pocketWifi.pocketWifiRental.items", { returnObjects: true });

  return (
    <section className="sec_common_60">
      <div className="containerX">
        <SectionHeader
          heading={t("pocketWifi.pocketWifiRental.heading")}
          subHeading={t("pocketWifi.pocketWifiRental.subHeading")}
          containerClassName="gap-4"
        />

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 sm:mt-10 md:mt-15">
          {items.map((item, i) => (
            <li
              key={i}
              className="relative pl-6 bg-neutral-100 p-4 rounded-lg shadow-sm text-black-600 text-sm sm:text-base md:text-lg before:content-['•'] before:absolute before:left-2 before:text-black before:text-2xl"
            >
              <span className="font-bold text-black">{item.title}</span>{" "}
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default PocketWiFiRental;


