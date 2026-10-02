import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "../Loader";
import { exportToCSV } from "./exportToCSV";
import Pagination from "./Pagination";

interface Column {
  text: string;
  dataField: string;
  isKey?: boolean;
  hidden?: boolean;
  width?: string;
  editable?: boolean;
  headerAlign?: "left" | "center" | "right";
  dataAlign?: "left" | "center" | "right";
  formatter?: (cell: any, row: any, rowIndex: number) => React.ReactNode;
  formatExtraData?: any;
  sort?: boolean;
}

interface CustomTableProps {
  data: any[];
  columns: Column[];
  exportcsv?: boolean;
  isDataLoading?: boolean;
  height?: string;
  searchPlaceholder?: string;
  noOfRowsPerPage?: number;
  renderFilterComponentLeft?: () => React.ReactNode;
  renderFilterComponentRight?: () => React.ReactNode;
  expandableRow?(row: any): boolean;
  expandComponent?: () => React.ReactNode;
}

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  columns,
  exportcsv = false,
  isDataLoading,
  height = "500px",
  searchPlaceholder = "Search...",
  noOfRowsPerPage = 25,
  renderFilterComponentLeft,
  renderFilterComponentRight,
  expandableRow,
  expandComponent,
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((row) =>
    columns.some((column) =>
      String(row[column.dataField])
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    ),
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * noOfRowsPerPage,
    currentPage * noOfRowsPerPage,
  );

  const handleExportCSV = () => {
    exportToCSV(filteredData, columns);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  return (
    <div>
      <div className="md:flex  justify-between items-center my-2">
        {renderFilterComponentLeft ? (
          <div className="flex flex-1">{renderFilterComponentLeft()}</div>
        ) : null}

        {/* <div className="relative md:w-[206px] lg:w-[306px] w-[166px] lg:mt-[0px] md:mt-[0px] mt-[10px] md:mb-[0px] mb-[10px]">
          <input
            type="text"
            placeholder={searchPlaceholder || "Search"}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-[47px] pl-[45px] pr-[20px] py-2 border rounded-[10px] focus:outline-none focus:shadow-outline border-[#E6E6E6] placeholder-black text-[15px]"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="black"
            className="w-5 h-5 absolute left-[15px] top-1/2 transform -translate-y-1/2 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M10.5 18.75a7.875 7.875 0 100-15.75 7.875 7.875 0 000 15.75z"
            />
          </svg>
        </div> */}

        {renderFilterComponentRight ? (
          <div className="md:flex flex-1 justify-end">
            {renderFilterComponentRight()}
          </div>
        ) : null}
        {exportcsv ? (
          <button
            disabled={!paginatedData.length}
            onClick={handleExportCSV}
            className="bg-[#7497E7] hover:bg-[#7497f6] border-[#C4C4C4] border-[1px] disabled:bg-gray-200 text-white md:px-4 px-10 text-[15px] rounded-lg h-[44px] md:ml-[12px] md:mb-[0px] mb-[20px] focus:outline-none focus:shadow-outline"
          >
            Export CSV
          </button>
        ) : null}
      </div>
      <div className="overflow-x-auto rounded-md" style={{ height }}>
        <table className="min-w-full rounded-md bg-[#F5F5F5] border border-t-1 ">
          <thead className="sticky top-0 z-10 bg-[#F5F5F5] border-t-0">
            <tr>
              {columns.map((column, index) =>
                column.hidden ? null : (
                  <th
                    scope="col"
                    key={"COL_HEADER_" + index}
                    className="border-t-0 border-b-1 border border-gray-300 px-2 py-3 text-left text-xs font-bold text-gray-900 tracking-wider whitespace-nowrap"
                  >
                    {column.text}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="overflow-y-auto">
            {isDataLoading ? (
              <tr>
                <td
                  scope="col"
                  colSpan={columns.length}
                  className="w-full mt-[300px] p-4"
                >
                  <div className="flex flex-col gap-6 items-center justify-center h-full w-full">
                    <Loader
                      type="Oval"
                      color="#f24144"
                      secondaryColor="#f24144"
                      height={"18vw"}
                      width={"18vw"}
                      className="max-h-[100px] max-w-[100px] min-h-[60px] min-w-[60px]"
                      wrapperStyle={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </div>
                </td>
              </tr>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, index) =>
                    column.hidden ? null : (
                      <td
                        scope="col"
                        className={`border-t-0 border border-gray-200 p-2 whitespace-nowrap overflow-hidden text-ellipsis text-sm text-gray-500 ${rowIndex % 2 ? "bg-[#F5F5F5]" : "bg-[#F5F5F5]"}`}
                        key={"COL_VAL_" + index}
                      >
                        {column.formatter
                          ? column.formatter(
                              row[column.dataField],
                              row,
                              column.formatExtraData,
                            )
                          : row[column.dataField]}
                      </td>
                    ),
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  scope="col"
                  colSpan={columns.length}
                  className="w-full mt-[300px] p-10 whitespace-nowrap text-center text-sm font-medium text-gray-500"
                >
                  {t("myAccount.noDataFound")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isDataLoading ? null : (
        <Pagination
          currentPage={currentPage}
          totalCount={filteredData.length}
          pageSize={noOfRowsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default CustomTable;
