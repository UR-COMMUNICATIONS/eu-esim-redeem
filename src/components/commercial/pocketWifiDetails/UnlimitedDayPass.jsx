import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { commercialRoutes, PhoneIcon, WifiSecondaryIcon } from "@/services";
import DataPlanTable from "./DataPlanTable";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useModal from "@/hooks/useModal";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";

const UnlimitedDayPass = ({
  pocketWifiDayPass,
  restOfTheWorldDayPass,
  regionalCountries,
}) => {
  const { t } = useTranslation(["translation", "english", "local"]);
  const { setAppDownloadDialogOpen } = useModal();
  const { nameSpace } = useUserLocationLanguage();

  const headers = t(`${nameSpace}:pocketWifiDetails.pocketWifiDayPass.headers`, {
    returnObjects: true,
  });

  const rawPlans = t(`${nameSpace}:pocketWifiDetails.pocketWifiDayPass.plans`, {
    returnObjects: true,
  });

  const dataPlans = rawPlans.map((plan) => ({
    plan: plan.region,
    data: plan.prices.map((price) => ({
      limit: "", // unused
      price,
    })),
  }));

  return (
    <div className="containerX sec_common_80 xl:px-0">
      {/* <DataPlanTable
        headers={Array.from({ length: 3 }, (_, i) =>
          t(`${nameSpace}:pocketWifiDetails.pocketWifiDayPass.headers.${i}`)
        )}
        dataPlans={pocketWifiDayPass}
        plansTranslable={Array.from({ length: 3 }, (_, i) =>
          t(`${nameSpace}:pocketWifiDetails.pocketWifiDayPass.plans.${i}`, {
            returnObjects: true,
          })
        )}
      /> */}
      <DataPlanTable
        headers={headers}
        dataPlans={dataPlans} />


      {/* <DataPlanTable
        headers={Array.from({ length: 3 }, (_, i) =>
          t(`pocketWifiDetails.restOfTheWorldDayPass.headers.${i}`)
        )}
        dataPlans={restOfTheWorldDayPass}
        plansTranslable={Array.from({ length: 1 }, (_) =>
          t(`pocketWifiDetails.restOfTheWorldDayPass.plan`)
        )}
        className={"mt-12"}
      /> */}

      <p className="text-sm !leading-[1.4] font-normal text-black-700 mt-6 md:mt-5">
        {t("pocketWifiDetails.regionalCountries")}
      </p>

      <div className="flex items-center justify-center mt-6 md:mt-12 gap-4">
        <Link to={commercialRoutes.howItWorks.path} className="w-max">
          <Button
            className={
              "h-11 md:h-[51px] text-sm md:text-base font-semibold !leading-[1.2]"
            }
          >
            {t("buttonText.rentADeviceNow")}
          </Button>
        </Link>

        <Button
          className={
            "h-11 md:h-[51px] border border-main-600 text-main-600 text-sm md:text-base font-semibold !leading-[1.2] rounded-[10px]"
          }
          size="sm"
          variant="outlined"
          onClick={() => setAppDownloadDialogOpen(true)}
        >
          <PhoneIcon className="!w-5 !h-5" color="#D81F22" />
          <span>{t("buttonText.downloadApp")}</span>
        </Button>
      </div>
    </div>
  );
};

export default UnlimitedDayPass;
