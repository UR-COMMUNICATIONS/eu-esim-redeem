import CustomTable from "@/components/shared/CustomTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { enumFormatter } from "@/general/common.funcitons";
import useUserOrders from "@/hooks/useUserOrders";
import { commercialRoutes, EyeIcon } from "@/services";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// const dummyOrders = [
//   {
//     orderId: "ORD-1001",
//     planName: "Pocket WiFi Unlimited",
//     productType: "WiFi",
//     noOfDevices: 1,
//     orderDate: "2025-01-10",
//     orderStatus: "Active",
//   },
//   {
//     orderId: "ORD-1002",
//     planName: "Japan eSIM 10GB",
//     productType: "eSIM",
//     noOfDevices: 2,
//     orderDate: "2025-01-08",
//     orderStatus: "Completed",
//   },
// ];

const UserOrder = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { t } = useTranslation();

  // Use the reusable hook for fetching user orders - hook manages state
  const { fetchUserOrders, orders, isLoading, error } = useUserOrders();

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
    console.log("View order:", row);
    // navigate(`/order-details`);
    // navigate(commercialRoutes.orderDetails.path, {
    //   state: row,
    // });

    navigate("/user-account/order-details", {
      state: row,
    });
    // navigate("order-details", {
    //   state: row,
    // });
  };

  const handleCancel = (row) => {
    setSelectedOrder(row);
    setIsCancelDialogOpen(true);
  };

  const confirmCancel = () => {
    console.log("Order cancelled:", selectedOrder);
    setIsCancelDialogOpen(false);
  };

  const columns = [
    {
      dataField: "orderId",
      text: "Order Id",
      isKey: true,
      // hidden: true,
    },
    {
      dataField: "planName",
      text: "Product Name",
    },
    {
      dataField: "productType",
      text: "Type",
      formatter: enumFormatter,
      formatExtraData: {
        D: "Pocket Wifi",
        S: "Sim",
        E: "Esim",
        R: "Router",
      },
    },
    {
      dataField: "noOfDevices",
      text: "Qty",
    },
    {
      dataField: "orderDate",
      text: "Order Date",
    },
    {
      dataField: "orderStatus",
      text: "Status",
    },
    {
      dataField: "action",
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

  // Fetch orders when user data is available
  useEffect(() => {
    if (user?.userId || user?.appUserId) {
      fetchUserOrders();
    }
  }, [user?.userId, user?.appUserId, user?.phoneNumber, fetchUserOrders]);

  // Log orders state for debugging
  useEffect(() => {
    if (orders?.length > 0) {
      console.log("Orders State Updated:", orders);
      console.log("Orders Count:", orders?.length || 0);
    }
  }, [orders]);

  // useEffect(() => {
  //   setOrders(dummyOrders);
  // }, []);

  return (
    <>
      {/* <MyAccount /> */}
      <div className="flex-1 bg-[#FAFAFA] rounded-[8px] pt-6 px-4 overflow-auto animate-fadeIn">
        <div className="flex items-center  justify-between gap-3 border-b border-[#E0E0E0] pb-4 mb-4">
          <h1 className="text-[24px] text-[#191919] font-bold">
            {t(`myAccount.myOrder`)}
          </h1>
          {/* [PHASE1-HIDDEN] add new order button (productInternetPackages is hidden)
          <Button
            onClick={() =>
              navigate(commercialRoutes.productInternetPackages.path)
            }
          >
            {t(`buttonText.addnewOrder`)}
          </Button>
          */}
        </div>
        <div className="mt-[17px] mb-6">
          {isLoading ? (
            // Skeleton loading state for table
            <div className="flex flex-col gap-4">
              {/* Table header skeleton */}
              <div className="flex gap-4 pb-3 border-b border-neutral-300">
                <div className="h-5 w-32 bg-neutral-200 rounded animate-pulse"></div>
                <div className="h-5 w-40 bg-neutral-200 rounded animate-pulse"></div>
                <div className="h-5 w-32 bg-neutral-200 rounded animate-pulse"></div>
                <div className="h-5 w-28 bg-neutral-200 rounded animate-pulse"></div>
                <div className="h-5 w-36 bg-neutral-200 rounded animate-pulse"></div>
                <div className="h-5 w-24 bg-neutral-200 rounded animate-pulse"></div>
              </div>
              {/* Table rows skeleton */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex gap-4 py-4 border-b border-neutral-200"
                >
                  <div className="h-4 w-32 bg-neutral-200 rounded animate-pulse"></div>
                  <div className="h-4 w-40 bg-neutral-200 rounded animate-pulse"></div>
                  <div className="h-4 w-32 bg-neutral-200 rounded animate-pulse"></div>
                  <div className="h-4 w-28 bg-neutral-200 rounded animate-pulse"></div>
                  <div className="h-4 w-36 bg-neutral-200 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-red-600 text-center mb-4">{error}</p>
              <Button
                onClick={() => {
                  console.log("=== RETRY GETUSERORDERS API ===");
                  fetchUserOrders();
                }}
                variant="outline"
              >
                {t("buttonText.retry") || "Retry"}
              </Button>
            </div>
          ) : orders?.length > 0 ? (
            <CustomTable title="View Orders" data={orders} columns={columns} />
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500 text-center">
                {t("myAccount.noOrdersFound") || "No orders found"}
              </p>
            </div>
          )}
        </div>
      </div>
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent className="max-w-md rounded-xl p-6 flex flex-col gap-6">
          <h2 className="text-xl font-bold">
            {" "}
            {t(`extraText.confirmCancel`)}{" "}
          </h2>
          <p>
            {" "}
            {t(`extraText.areYouSure`)} {selectedOrder?.orderId}?{" "}
          </p>
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => setIsCancelDialogOpen(false)}
            >
              {t(`extraText.no`)}
            </Button>
            <Button onClick={confirmCancel}>
              {" "}
              {t(`extraText.yesCancel`)}{" "}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserOrder;
