import { useTranslation } from "react-i18next";
import DataPlanTable from "./DataPlanTable";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { Trans } from "react-i18next";

const Comparison = ({ chinaDataPlan }) => {
  const { t } = useTranslation();

  // Transform the dataPlans to match the comparison table structure
  const transformedDataPlans = [
    {
      plan: "Ideal For",
      data: [
        { limit: t("pocketWifiChina.conparision.comparisionTable.tr.0.2") },
        { limit: t("pocketWifiChina.conparision.comparisionTable.tr.0.3") },
      ],
    },
    {
      plan: "Country Coverage",
      data: [
        { limit: t("pocketWifiChina.conparision.comparisionTable.tr.1.2") },
        { limit: t("pocketWifiChina.conparision.comparisionTable.tr.1.3") },
      ],
    },
    {
      plan: "Speed",
      data: [
        { limit: t("pocketWifiChina.conparision.comparisionTable.tr.2.2") },
        { limit: t("pocketWifiChina.conparision.comparisionTable.tr.2.3") },
      ],
    },
    {
      plan: "Data Options",
      data: [
        { limit: t("pocketWifiChina.conparision.comparisionTable.tr.3.2") },
        { limit: t("pocketWifiChina.conparision.comparisionTable.tr.3.3") },
      ],
    },
    {
      plan: "Setup",
      data: [
        { limit: t("pocketWifiChina.conparision.comparisionTable.tr.4.2") },
        { limit: t("pocketWifiChina.conparision.comparisionTable.tr.4.3") },
      ],
    },
    {
      plan: "Sharing",
      data: [
        { limit: t("pocketWifiChina.conparision.comparisionTable.tr.5.2") },
        { limit: t("pocketWifiChina.conparision.comparisionTable.tr.5.3") },
      ],
    },
    {
      plan: "Plans",
      data: [
        { limit: t("pocketWifiChina.conparision.comparisionTable.tr.6.2") },
        { limit: t("pocketWifiChina.conparision.comparisionTable.tr.6.3") },
      ],
    },
    {
      plan: "Battery Life",
      data: [
        { limit: t("pocketWifiChina.conparision.comparisionTable.tr.7.2") },
        { limit: t("pocketWifiChina.conparision.comparisionTable.tr.7.3") },
      ],
    },
    {
      plan: "Activation Process",
      data: [
        { limit: t("pocketWifiChina.conparision.comparisionTable.tr.8.2") },
        { limit: t("pocketWifiChina.conparision.comparisionTable.tr.8.3") },
      ],
    },
    {
      plan: "Costs",
      data: [
        { limit: t("pocketWifiChina.conparision.comparisionTable.tr.9.2") },
        { limit: t("pocketWifiChina.conparision.comparisionTable.tr.9.3") },
      ],
    },
    {
      plan: "Flexibility",
      data: [
        { limit: t("pocketWifiChina.conparision.comparisionTable.tr.10.2") },
        { limit: t("pocketWifiChina.conparision.comparisionTable.tr.10.3") },
      ],
    },
  ];

  return (
    <div className="containerX sec_common_80 xl:px-0">
      <SectionHeader
        heading={t("pocketWifiChina.conparision.title")}
        subHeading={
          <Trans
            i18nKey="pocketWifiChina.conparision.titlefollow"
            components={{
              1: (
                <a
                  href="https://yoowifi.com/esim-china"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b-2 border-b-blue-400 text-blue-400"
                />
              )
            }}
          />
        }
        containerClassName="gap-4"
        headingClassName="text-4xl"

      />
      <DataPlanTable
        className="mt-15"
        headers={[
          t("pocketWifiChina.conparision.comparisionTable.th.1"), // "Feature"
          t("pocketWifiChina.conparision.comparisionTable.th.2"), // "Pocket WiFi"
          t("pocketWifiChina.conparision.comparisionTable.th.3"), // "SIM/eSIM"
        ]}
        dataPlans={transformedDataPlans}
        columnWidths={["20%", "40%", "40%"]} // Add this prop
      />
    </div>
  );
};

export default Comparison;
