import { cn } from "@/lib/utils";
import { memo } from "react";
import { euTourBookingTermsSections } from "./euTourBookingTermsContent";

const TermsTable = ({ table }) => (
  <div className="overflow-x-auto my-4 md:my-6">
    <table className="w-full min-w-[480px] border-collapse border border-gray-300 text-xs md:text-base">
      <thead>
        <tr className="text-left border-b border-gray-300 bg-gray-100">
          {table.headers.map((header, index) => (
            <th
              key={index}
              className="px-3 py-3 border-r border-gray-300 font-semibold text-[#1a2440] align-top last:border-r-0"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={`border-b border-gray-300 ${rowIndex % 2 === 1 ? "bg-gray-50" : ""}`}
          >
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className="px-3 py-3 border-r border-gray-300 text-gray-800 align-top last:border-r-0"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ClauseText = ({ number, text, uppercase, className }) => (
  <p
    className={cn(
      "text-xs md:text-lg !leading-[1.6] text-gray-800 mb-6 last:mb-0",
      uppercase && "uppercase tracking-wide",
      className,
    )}
    style={{ whiteSpace: "pre-line" }}
  >
    {number && (
      <span className="font-semibold text-[#1a2440] mr-1">{number}</span>
    )}
    {text}
  </p>
);

const renderItems = (items) =>
  items?.map((item, index) => (
    <div key={index}>
      <ClauseText
        number={item.number}
        text={item.text}
        uppercase={item.uppercase}
      />
      {item.table && <TermsTable table={item.table} />}
      {item.nested?.map((nested, nestedIndex) => (
        <ClauseText
          key={nestedIndex}
          number={nested.number}
          text={nested.text}
        />
      ))}
      {item.items && renderItems(item.items)}
    </div>
  ));

const renderSubsections = (subsections) =>
  subsections?.map((subsection, index) => (
    <div key={index} className="mb-6">
      {subsection.title && (
        <h3 className="text-base md:text-xl font-semibold text-[#1a2440] mb-4">
          {subsection.number && (
            <span className="mr-1">{subsection.number}</span>
          )}
          {subsection.title}
        </h3>
      )}
      {subsection.text && (
        <ClauseText
          number={subsection.title ? undefined : subsection.number}
          text={subsection.text}
          uppercase={subsection.uppercase}
        />
      )}
      {subsection.items && renderItems(subsection.items)}
    </div>
  ));

const EuTermsAndConditions = ({ containerClassName = "" }) => {
  return (
    <div
      className={cn(
        "container2X sec_common_60 xl:px-0 gap-4 md:gap-6 lg:gap-10",
        containerClassName,
      )}
    >
      <header className="space-y-4 md:space-y-6 mb-10 md:mb-14">
        <div className="text-lg md:text-2xl !leading-[1.2] md:!leading-[1.4] md:font-bold">
          <h1 className="text-[26px] md:text-[36px] font-bold text-[#1a2440] text-center">
            Terms &amp; Conditions
          </h1>
          <h2 className="text-[22px] md:text-[28px] mt-6 md:mt-8 font-bold text-[#1a2440] !leading-[1.3]">
            Tour Booking Terms &amp; Conditions
          </h2>
        </div>
        <ClauseText text='You and your travelling companions are deemed to have read, understood and accepted the following Terms and Conditions. EU Holidays Pte Ltd shall be referred to as "the Company" in the following:' />
      </header>

      {euTourBookingTermsSections.map((section) => (
        <section key={section.number} className="space-y-4 mb-10 md:mb-14">
          <h2 className="text-[22px] md:text-[28px] font-bold text-[#1a2440] !leading-[1.3] mb-4 md:mb-6">
            {section.number}. {section.title}
          </h2>

          {section.items && renderItems(section.items)}
          {section.subsections && renderSubsections(section.subsections)}
        </section>
      ))}
    </div>
  );
};

export default memo(EuTermsAndConditions);
