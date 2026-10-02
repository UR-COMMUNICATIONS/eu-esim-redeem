import React from "react";

const FooterSkeleton = () => {
  return (
    <footer className="bg-gray-200">
      <div className="container2X sec_common_80 xl:px-0 grid grid-cols-1 md:grid-cols-10 gap-10 md:gap-20">
        {/* CONTACT/LOGO */}
        <div className="col-span-1 md:col-span-5 min-[1320px]:col-span-4">
          {/* Logo placeholder */}
          <div className="h-[71px] w-[200px] bg-gray-300 rounded-md"></div>

          {/* Contact placeholders */}
          {[...Array(2)].map((_, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 mt-4 md:mt-6"
            >
              <div className="w-[34px] h-[34px] md:w-[64px] md:h-[64px] bg-gray-300 rounded-[8px]"></div>
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
            </div>
          ))}

          {/* Newsletter text */}
          <div className="h-6 w-48 bg-gray-300 rounded mt-5 md:mt-8"></div>

          {/* Newsletter input */}
          <div className="flex items-center bg-gray-300 rounded-[8px] md:rounded-[20px] p-2 shadow-md mt-3 md:mt-4 border border-gray-300 max-w-[348px]">
            <div className="h-8 md:h-[52px] flex-1 bg-gray-200 rounded-[8px]"></div>
            <div className="h-8 w-8 md:h-[52px] md:w-[52px] bg-gray-200 rounded-[8px] ml-2"></div>
          </div>
        </div>

        {/* Menu placeholders */}
        {[...Array(3)].map((_, menuIndex) => (
          <div
            key={menuIndex}
            className="col-span-1 md:col-span-5 min-[1320px]:col-span-2 shrink-0"
          >
            <div className="h-5 w-24 bg-gray-300 rounded"></div>
            <ul className="mt-4 md:mt-6 space-y-3 md:space-y-6 lg:space-y-8">
              {[...Array(5)].map((_, linkIndex) => (
                <li key={linkIndex} className="h-4 w-40 bg-gray-300 rounded"></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="container2X sec_common_40 lg:px-4 flex flex-col md:flex-row gap-2 justify-between md:items-center">
        <div className="h-4 w-64 bg-gray-300 rounded"></div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
          <div className="flex gap-4 md:gap-8">
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="h-4 w-24 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSkeleton;
