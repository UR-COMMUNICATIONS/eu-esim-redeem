import AppDownloadDialog from "@/components/shared/navigation/AppDownloadDialog";
import AuthDialog from "@/components/shared/navigation/AuthDialog";
import LoginRequiredDialog from "@/components/shared/navigation/LoginRequiredDialog";
import OtpDialog from "@/components/shared/navigation/OtpDialog";
import {
  setAuthModalStatus,
  setOtpModalStatus,
  setDownloadAppDialogOpen,
  setLoginModalStatus,
  setAuthInitialFlow,
} from "@/store/module/shared/sharedSlice";
import { useDispatch, useSelector } from "react-redux";

function useModal() {
  const {
    isAuthModalOpen,
    isOtpModalOpen,
    isLoginModalOpen,
    downloadAppDialogOpen,
    dialogStage,
    initialFlow,
  } = useSelector((state) => state.shared);
  const dispatch = useDispatch();

  const setIsAuthDialogOpen = (isOpen, initialFlow) => {
    dispatch(setAuthModalStatus(isOpen));
    dispatch(setAuthInitialFlow(initialFlow));
  };
  const setIsOtpDialogOpen = (isOpen) => {
    dispatch(setOtpModalStatus(isOpen));
  };
  const setLoginRequiredDialogOpen = (isOpen) => {
    dispatch(setLoginModalStatus(isOpen));
  };
  const setAppDownloadDialogOpen = (isOpen) => {
    dispatch(setDownloadAppDialogOpen(isOpen));
  };

  const authModal = (
    <AuthDialog
      isOpen={isAuthModalOpen}
      setIsOpen={setIsAuthDialogOpen}
      initialFlow={initialFlow}
    />
  );
  const otpModal = (
    <OtpDialog isOpen={isOtpModalOpen} setIsOpen={setIsOtpDialogOpen} />
  );
  const loginModal = (
    <LoginRequiredDialog
      isOpen={isLoginModalOpen}
      setIsOpen={setLoginRequiredDialogOpen}
      setIsAuthDialogOpen={setIsAuthDialogOpen}
    />
  );
  const appDownloadModal = (
    <AppDownloadDialog
      isOpen={downloadAppDialogOpen}
      setIsOpen={setAppDownloadDialogOpen}
    />
  );

  return {
    authModal,
    otpModal,
    loginModal,
    appDownloadModal,
    setIsAuthDialogOpen,
    setIsOtpDialogOpen,
    setLoginRequiredDialogOpen,
    setAppDownloadDialogOpen,
  };
}

export default useModal;
