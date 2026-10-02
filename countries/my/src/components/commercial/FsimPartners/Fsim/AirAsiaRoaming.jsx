import { commercialRoutes } from "@/services";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useDynamicImages from "@/hooks/useDynamicImages";

function AirAsiaRoaming() {
  return (
    <div className="md:pt-20 pt-14">
      <a
        href={commercialRoutes.productInternetPackages.path}
        // href="https://yoowifi.com/my/pocket-wifi/cart-service"
        // target="_blank"
        rel="noopener noreferrer"
        title="AirAsia Roaming"
      >
        <img
          src={useDynamicImages("fsim-banner", "air-asia-tag-on")}
          alt="anaBanner"
          className="w-full h-full bg-contain md:rounded-[24px] rounded-[12px]"
        />
      </a>
    </div>
  );
}

export default AirAsiaRoaming;
