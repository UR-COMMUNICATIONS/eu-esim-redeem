// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { cn } from "@/lib/utils";
// import { WifiSecondaryIcon } from "@/services";
// import { useTranslation } from "react-i18next";

// const DataPlanTable = ({ headers, dataPlans, plansTranslable, className }) => {
//   const { t } = useTranslation();

//   return (
//     <Table
//       className={cn(
//         "rounded-2xl overflow-hidden !ring-[1px] !ring-neutral-300 !mb-4",
//         className
//       )}
//     >
//       <TableHeader className="bg-main-600">
//         <TableRow>
//           {headers.map((header, index) => (
//             <TableHead
//               key={index}
//               className={`text-white ${
//                 index === 0
//                   ? "flex items-center gap-4 min-w-[512px]"
//                   : "text-center border-l border-l-white"
//                 } h-[60px] px-6 p_common`}
//             >
//               {index === 0 && (
//                 <WifiSecondaryIcon className="w-[22px] h-auto" color="white" />
//               )}
//               {header}
//             </TableHead>
//           ))}
//         </TableRow>
//       </TableHeader>
//       <TableBody className="!border !border-neutral-300">
//         {dataPlans.map((plan, planIndex) => (
//           <TableRow
//             key={plan.plan}
//             className={cn(
//               "h-[52px] md:h-[82px]",
//               dataPlans.length === 1 && "bg-neutral-200"
//             )}
//           >
//             <TableCell className="px-6 p_common text-black-700">
//               {(plansTranslable && plansTranslable[planIndex]) || plan.plan}
//             </TableCell>
//             {plan.data.map((dataLimit) => (
//               <TableCell
//                 key={dataLimit.limit}
//                 className="text-center p_common text-black-700"
//               >
//                 {dataLimit.price.split("\n").map((line, index) => (
//                   <span key={index}>
//                     {line}
//                     {index < dataLimit.price.split("\n").length - 1 && <br />}
//                   </span>
//                 ))}
//               </TableCell>
//             ))}
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

// export default DataPlanTable;




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

const DataPlanTable = ({ headers, dataPlans, className }) => {
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
                  ? "flex items-center gap-4 min-w-[512px]"
                  : "text-center border-l border-l-white"
              } h-[60px] px-6 p_common`}
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
              dataPlans.length === 1 && "bg-neutral-200"
            )}
          >
            <TableCell className="px-6 p_common text-black-700 whitespace-pre-line">
              {plan.plan}
            </TableCell>
            {plan.data.map((dataLimit, index) => (
              <TableCell
                key={index}
                className="text-center p_common text-black-700"
              >
                {dataLimit.price.split("\n").map((line, lineIndex) => (
                  <span key={lineIndex}>
                    {line}
                    {lineIndex < dataLimit.price.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataPlanTable;
