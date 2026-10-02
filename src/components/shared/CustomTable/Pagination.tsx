import React from "react";
import { usePagination, DOTS } from "./hooks";

type PaginationProps = {
  onPageChange: (pageNumber: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
};

const Pagination = (props: PaginationProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className="flex justify-end items-center w-full bg-white py-2 mb-0 px-2">
      <button
        className={`px-3 text-sm border h-[40px] ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-black"}`}
        onClick={currentPage !== 1 ? onPrevious : undefined}
      >
        Prev
      </button>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <div key={index} className="px-2">
              <span className="text-sm">…</span>
            </div>
          );
        }

        return (
          <button
            key={index}
            className={`px-3 border h-[40px] ${pageNumber === currentPage ? "font-bold text-white bg-gray-600" : "text-sm"}`}
            onClick={() => {
              if (typeof pageNumber === "number") {
                onPageChange(pageNumber);
              }
            }}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        className={`px-3 text-sm border h-[40px] ${currentPage === lastPage ? "text-gray-400 cursor-not-allowed" : "text-black"}`}
        onClick={currentPage !== lastPage ? onNext : undefined}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
