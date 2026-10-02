import { useTranslation } from "react-i18next";
import DataPlanTable from "./DataPlanTable";

const SimDataPlan = ({ simDataPlan }) => {
  const { t } = useTranslation();

  return (
    <div className="containerX sec_common_80 xl:px-0">
      <DataPlanTable
        headers={Array.from({ length: 4 }, (_, i) =>
          t(`pocketWifiDetails.simDataPlan.headers.${i}`)
        )}
        dataPlans={simDataPlan}
        plansTranslable={Array.from({ length: 6 }, (_, i) =>
          t(`pocketWifiDetails.simDataPlan.plans.${i}`)
        )}
      />
    </div>
  );
};

export default SimDataPlan;
