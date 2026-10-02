import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { BackArrowIconFilled } from "@/services";

function DataDetails() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { state } = useLocation();
  const order = state;
  console.log("user", user);

  console.log("state", order);

  return (
    <>
      {/* <MyAccount /> */}

      <div className="flex-1 flex flex-col gap-4 animate-fadeIn">
        {/* Top Card - Header with Arrow and Title */}
        {/* <div className="bg-white border-light rounded-[12px] shadow-sm"> */}
        <div
          className="cursor-pointer  rounded-t-[12px] pt-4"
          onClick={() => navigate(-1)}
        >
          <h1 className="flex items-center gap-3 text-[24px] text-[#191919] mb-4 font-bold px-3 border-b border-[#E0E0E0] pb-4">
            <BackArrowIconFilled className="w-6 h-6" color="black" />
            {t("myAccount.myData")}
          </h1>
          {/* </div> */}
        </div>

        {/* Details Card */}
        <div className="bg-white border-light rounded-[12px] shadow-sm p-4 sm:p-6">
          <div className="text-[#191919] text-[14px] sm:text-[16px] space-y-3">
            <div className="flex justify-between">
              <span>{t("myAccount.deviceId")}</span>
              <span className="sm:text-[18px] text-[16px]">
                {order?.device_id || "--"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>{t("orderSummary.planName")}</span>
              <span className="sm:text-[18px] text-[16px]">
                {order?.plan_name || "--"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>{t("myAccount.network")}</span>
              <span className="sm:text-[18px] text-[16px]">
                {order?.wifi_ssid || "--"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>{t("myAccount.password")}</span>
              <span className="sm:text-[18px] text-[16px]">
                {order?.wifi_pwd || "--"}
              </span>
            </div>

            {/* <div className="flex justify-between">
              <span>{t("order.travelStartDate")}</span>
              <span className="sm:text-[18px] text-[16px]">
                {order?.startDate || "--"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>{t("order.travelEndDate")}</span>
              <span className="sm:text-[18px] text-[16px]">{order?.endDate || "--"}</span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default DataDetails;
