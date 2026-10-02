import RegionCard from "@/components/shared/cards/RegionCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { cn } from "@/lib/utils";
import { regionsData } from "@/services/data";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const StayConnectedRegions = () => {
  const regions = useMemo(() => regionsData(), []);
  const { t } = useTranslation();

  return (
    <section className="px-4 2xl:px-0 sec_common_80">
      <div className="sec_common_60 container3X rounded-2xl md:rounded-3xl bg-[#ececec] pb-3 md:pb-10 lg:pb-20 px-3 md:px-6 min-[1320px]:px-0">
        <SectionHeader
          heading={t("stayConnectedRegions.sectionHeading")}
          subHeading={t("stayConnectedRegions.sectionSubHeading")}
        />

        <div className="containerX grid grid-cols-6 gap-2 md:gap-6 mt-6 md:mt-10 lg:mt-20">
          {regions.map((region, index) => (
            <RegionCard
              item={region}
              index={index}
              key={index}
              className={cn(
                index > 2 &&
                  "lg:col-span-3 last:col-span-full last:lg:col-span-3",
                index <= 2 &&
                  "lg:col-span-2 last:col-span-full last:lg:col-span-2",
                "col-span-3"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StayConnectedRegions;
