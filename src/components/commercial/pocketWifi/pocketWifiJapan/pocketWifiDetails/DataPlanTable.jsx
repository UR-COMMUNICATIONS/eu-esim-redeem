import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { WifiSecondaryIcon } from "@/services";
import { useTranslation } from "react-i18next";

const DataPlanTable = ({
  headers,
  dataPlans,
  columnWidths = ["40%", "30%", "30%"],
  className,
}) => {
  const { t } = useTranslation();

  return (
    <Table
      className={cn(
        "rounded-2xl overflow-hidden !ring-[1px] !ring-neutral-300 !mb-4",
        className
      )}
    >
      <TableHeader className="bg-main-600">
        <TableRow>
          {headers.map((header, index) => (
            <TableHead
              key={index}
              className={`text-white ${
                index === 0
                  ? "flex items-center gap-4"
                  : "text-center border-l border-l-white"
              } h-[60px] px-6 p_common`}
              style={{ width: columnWidths[index] }}
            >
              {index === 0 && (
                <WifiSecondaryIcon className="w-[22px] h-auto" color="white" />
              )}
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="!border !border-neutral-300">
        {dataPlans.map((plan, planIndex) => (
          <TableRow
            key={plan.plan}
            className={cn(
              "h-[52px] md:h-[82px]",
              planIndex % 2 === 0 ? "bg-white" : "bg-neutral-100"
            )}
          >
            <TableCell
              className="px-6 p_common text-black-700 font-medium"
              style={{ width: columnWidths[0] }}
            >
              {plan.plan}
            </TableCell>
            {plan.data.map((data, dataIndex) => (
              <TableCell
                key={dataIndex}
                className="p_common px-2 lg:px-6 text-black-700"
                style={{ width: columnWidths[dataIndex + 1] }}
              >
                {data.limit}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataPlanTable;
