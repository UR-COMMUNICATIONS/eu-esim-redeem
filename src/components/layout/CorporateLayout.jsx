import useScrollToTop from "@/hooks/useScrollToTop";
import { Outlet } from "react-router-dom";
import CorporateNavbar from "../shared/navigation/CorporateNavbar";
import Footer from "../shared/navigation/Footer";
import DevFAB from "../shared/others/DevFAB";
import DownloadYoowifi from "../shared/others/DownloadYoowifi";
import useModal from "@/hooks/useModal";
import AppDownloadDialog from "../shared/navigation/AppDownloadDialog";
import CanonicalTag from "../SEO/CanonicalTag";
import useResetSource from "@/hooks/useResetSource";

function CorporateLayout() {
  useScrollToTop();
  useResetSource();
  const { authModal, otpModal, loginModal, appDownloadModal } = useModal();

  return (
    <main>
      <CanonicalTag />
      <CorporateNavbar />
      <Outlet />
      <DownloadYoowifi />
      <Footer />
      {authModal}
      {/* {otpModal} */}
      {loginModal}
      {appDownloadModal}
    </main>
  );
}

export default CorporateLayout;
