import React from "react";

const RegisterFormSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full font-sans">
      {/* Left Section (Image Placeholder) */}
      <div className="w-full min-h-screen lg:w-[50%] hidden lg:flex">
        <div className="w-full h-full bg-gray-300 rounded" />
      </div>

      {/* Right Section (Form Placeholder) */}
      <div className="w-full min-h-screen lg:w-[50%] overflow-y-auto flex flex-col justify-center items-center">
        <div className="w-[80%] flex flex-col gap-6">
          {/* Heading */}
          <div className="h-8 bg-gray-300 rounded w-2/3 mx-auto" />
          <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-6" />

          {/* Form Inputs */}
          <div className="space-y-5">
            <div className="h-12 bg-gray-300 rounded w-full" />
            <div className="h-12 bg-gray-300 rounded w-full" />
            <div className="h-12 bg-gray-300 rounded w-full" />
            <div className="h-12 bg-gray-300 rounded w-full" />
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center gap-4 mt-8">
            <div className="h-5 w-10 bg-gray-300 rounded" />
            <div className="h-4 bg-gray-300 rounded w-3/4" />
          </div>

          {/* Button */}
          <div className="flex justify-center items-center mt-8">
            <div className="h-[50px] bg-gray-300 rounded w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterFormSkeleton;
