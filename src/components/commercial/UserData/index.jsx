import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import MyAccount from "@/components/shared/others/MyAccount";
import CustomTable from "@/components/shared/CustomTable";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDisApi } from "@/general";
import { useNavigate } from "react-router-dom";
import { japanDeviceGrey, sim } from "@/services/images";
import { EyeIcon, Close, commercialRoutes } from "@/services";

const UserData = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const imageFormatter = (cell, row) => {
    if (cell) {
      // console.log("CELL :", cell);
      const devImage = ["s", "e"].includes(cell?.toLowerCase())
        ? sim
        : japanDeviceGrey;
      return (
        <img
          src={devImage}
          alt="device"
          className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
        />
      );
    }
  };

  const actionFormatter = (cell, row) => {
    return (
      <div className="flex items-center gap-3">
        <div onClick={() => handleViewDetails(row)}>
          <EyeIcon className="w-5 h-5 cursor-pointer" />
        </div>
        {/* <div onClick={() => handleCancel(row)}>
            <Close className="w-5 h-5 cursor-pointer" />
          </div> */}
      </div>
    );
  };

  const handleViewDetails = (row) => {
    console.log("View Data:", row);
    // navigate(`/order-details`);
    navigate("/user-account/data-details", {
      state: row,
    });
  };

  const columns = [
    {
      dataField: "order_id",
      text: "Order Id",
      isKey: true,
      // hidden: true,
    },
    {
      dataField: "device_id",
      text: "Device Id",
    },
    {
      dataField: "plan_name",
      text: "Plan Name",
    },
    {
      dataField: "device_type",
      text: "Image",
      formatter: imageFormatter,
    },
    // {
    //   dataField: "wifi_ssid",
    //   text: "Network",
    // },
    // {
    //   dataField: "wifi_pwd",
    //   text: "Password",
    // },
    {
      dataField: "orderStatus",
      text: "Action",
      formatter: actionFormatter,
    },

    // {
    //   dataField: 'planType',
    //   text: 'Plan Type',
    //   formatter: enumFormatter,
    //   formatExtraData: {
    //     "V": "Volume",
    //     "M": "Monthly",
    //     "W": "Weekly",
    //     "D": "Daily",
    //     "CN": "Country Based",
    //     "VS": "Volume Subscription",
    //     "MS": "Monthly Subscription",
    //     "VE": "Volume (excess usage)"
    //   }
    // },

    // {
    //   dataField: 'amount',
    //   text: 'Status'
    // }
  ];

  const getDevices = useDisApi({
    apiCall: "getDevices",
    setCallBack: (res) => {
      setDevices(res?.devices || []);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    console.log("user", user);
    getDevices({ userId: user?.userId });
  }, []);

  return (
    <>
      {/* <MyAccount /> */}
      <div className="flex-1 bg-[#FAFAFA] rounded-[8px] pt-6 px-4 animate-fadeIn">
        <div className="flex items-center  justify-between gap-3 border-b border-[#E0E0E0] pb-4 mb-4">
          <h1 className="text-[24px] text-[#191919] font-bold">
            {t(`myAccount.myData`)}
          </h1>
          {/* <Button onClick={() => navigate(commercialRoutes.addNewData.path)}>
            {t(`buttonText.addNew`)}
          </Button> */}
        </div>
        <div className="mt-[17px] mb-6">
          {isLoading ? (
            // Skeleton loading state for table
            <div className="flex flex-col gap-4">
              {/* Table header skeleton */}
              <div className="flex gap-4 pb-3 border-b border-neutral-300">
                <div className="h-5 w-24 bg-neutral-200 rounded animate-pulse"></div>
                <div className="h-5 w-32 bg-neutral-200 rounded animate-pulse"></div>
                <div className="h-5 w-40 bg-neutral-200 rounded animate-pulse"></div>
                <div className="h-5 w-20 bg-neutral-200 rounded animate-pulse"></div>
                <div className="h-5 w-24 bg-neutral-200 rounded animate-pulse"></div>
              </div>
              {/* Table rows skeleton */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex gap-4 py-4 border-b border-neutral-200"
                >
                  <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse"></div>
                  <div className="h-4 w-32 bg-neutral-200 rounded animate-pulse"></div>
                  <div className="h-4 w-40 bg-neutral-200 rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-neutral-200 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          ) : (
            <CustomTable
              title="View Devices"
              data={devices}
              columns={columns}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UserData;
