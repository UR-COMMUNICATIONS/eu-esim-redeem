import { useTranslation } from "react-i18next";
import { ErrorIcon, SuccessIcon, PlusIcon, commercialRoutes } from "@/services";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserLocationCard from "@/components/shared/cards/UserLocationCard";
import { useEffect, useState, useRef } from "react";
import { useDisApi } from "@/general";
import { setUserData } from "@/store/module/auth/slice";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import Loader from "@/components/shared/Loader";

const UserAddress = () => {
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addressListRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [process, setProcess] = useState({
    title: "",
    alertMessage: "",
    alertType: "",
    isProcessing: false,
    isSuccess: false,
  });

  const handleContinue = () => {
    setProcess({
      ...process,
      isProcessing: false,
      isSuccess: false,
      title: "",
      alertType: "",
      alertMessage: "",
    });
  };

  const getUser = useDisApi({
    apiCall: "getUser",
    setCallBack: (res) => {
      if (res?.user) {
        dispatch(setUserData(res?.user));
      }
    },
  });

  const deleteAddress = useDisApi({
    apiCall: "deleteAddress",
    setCallBack: (res) => {
      if (res?.status?.result) {
        getUser({ userId: user.userId });
        setProcess({
          ...process,
          isProcessing: false,
          isSuccess: true,
          title: t("process.success"),
          alertType: "success",
          alertMessage: t("process.deletedAddress"),
        });
      } else {
        setProcess({
          ...process,
          isProcessing: false,
          isSuccess: true,
          title: t("process.failed"),
          alertType: "error",
          alertMessage: res?.status?.message,
        });
      }
    },
  });

  const handleSelect = (event, selectedItem, action) => {
    event.stopPropagation();
    if (action === "remove") {
      setProcess({ ...process, isProcessing: true, isSuccess: true });
      deleteAddress({ userId: user.userId, id: selectedItem.id });
    } else if (action === "edit") {
      navigate(
        commercialRoutes.editAddress.path.replace(":id", selectedItem.id),
      );
    }
  };

  useEffect(() => {
    if (user?.userId) {
      getUser({ userId: user.userId });
    }
  }, []);

  // Check if address list is scrollable and scroll position
  useEffect(() => {
    const checkScrollable = () => {
      if (addressListRef.current) {
        const { scrollHeight, clientHeight, scrollTop } =
          addressListRef.current;
        const isScrollable = scrollHeight > clientHeight;
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 10; // 10px threshold

        setShowScrollIndicator(isScrollable && !isAtBottom);
        setIsScrolledToBottom(isAtBottom);
      }
    };

    checkScrollable();

    // Add scroll listener to update indicator when scrolling
    const listElement = addressListRef.current;
    if (listElement) {
      listElement.addEventListener("scroll", checkScrollable);
    }

    window.addEventListener("resize", checkScrollable);

    return () => {
      if (listElement) {
        listElement.removeEventListener("scroll", checkScrollable);
      }
      window.removeEventListener("resize", checkScrollable);
    };
  }, [user?.address]);

  return (
    <div className="flex-1 bg-[#FAFAFA] rounded-[8px] pt-6 px-4 animate-fadeIn">
      <h1 className="text-[24px] text-[#191919] mb-4 font-bold px-3 border-b border-[#E0E0E0] pb-4">
        {t(`myAccount.myAddress`)}
      </h1>

      {/* Add New Address Button - Moved to Top */}
      <button
        type="button"
        className="flex items-center gap-2 text-base font-semibold text-[#f24144] mt-6 mb-6 px-3 pb-6 border-b border-[#E0E0E0]"
        onClick={() => navigate(commercialRoutes.addNewAddress.path)}
      >
        <PlusIcon color="#f24144" />
        <span>{t("extraText.addNewAddress")}</span>
      </button>

      {/* Address List with Scroll Indicator */}
      <div className="relative">
        <div
          ref={addressListRef}
          className="flex flex-col gap-6 max-h-[600px] overflow-y-auto pr-4 pb-6 scroll-smooth"
        >
          {user?.address && user.address.length > 0 ? (
            user.address.map((item, index) => (
              <UserLocationCard
                wrapperClass="bg-white border-2 border-neutral-400 hover:border-[#f24144] transition-colors"
                handleSelect={handleSelect}
                key={index}
                item={item}
                hideSelectButton={true}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                {t("myAccount.noAddressFound") || "No addresses found"}
              </p>
              <p className="text-gray-400">
                {t("myAccount.addFirstAddress") ||
                  "Add your first address to get started"}
              </p>
            </div>
          )}
        </div>

        {/* Scroll Indicator */}
        {showScrollIndicator && user?.address && user.address.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent pointer-events-none flex items-end justify-center pb-2">
            <div className="flex flex-col items-center gap-1 text-[#f24144] animate-bounce">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <span className="text-xs font-medium">
                {t("extraText.scrollForMore") || "Scroll for more"}
              </span>
            </div>
          </div>
        )}
      </div>

      <Dialog open={process.isSuccess} onOpenChange={handleContinue}>
        <DialogContent
          showCloseIcon={true}
          className="w-[calc(100vw-32px)] max-w-[540px] h-auto min-h-[286px] sm:min-h-[438px] rounded-xl md:rounded-3xl flex flex_center flex-col px-4 md:px-8 lg:px-[60px] pt-10 md:pt-[60px] pb-6 md:pb-[60px] gap-6 md:gap-12 bg-main-50"
        >
          {process.isProcessing ? (
            <div className="flex flex-col gap-6 items-center justify-center h-full w-full">
              <Loader
                type="Oval"
                color="#f24144"
                height={"18vw"}
                width={"18vw"}
                className="max-h-[100px] max-w-[100px] min-h-[60px] min-w-[60px]"
                wrapperStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
              <div className="text-center flex flex-col gap-3 sm:gap-4">
                <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-700">
                  {t("process.processing")}
                </DialogTitle>
                <p className="text-base text-black-700">
                  {t("process.processMessage")}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-center">
                {process.alertType === "success" ? (
                  <SuccessIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />
                ) : (
                  <ErrorIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />
                )}
              </div>
              <div className="text-center flex flex-col gap-3 sm:gap-4">
                <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-700">
                  {process.title}
                </DialogTitle>
                <p className="text-base text-black-700">
                  {process.alertMessage}
                </p>
              </div>
              <DialogClose
                onClick={handleContinue}
                className="px-10 py-4 bg-[#f24144] text-white rounded-xl max-w-max mx-auto outline-none border-none"
              >
                {t("orderSummary.continue")}
              </DialogClose>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserAddress;
