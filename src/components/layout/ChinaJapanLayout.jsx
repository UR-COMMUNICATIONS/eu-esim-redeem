import useScrollToTop from "@/hooks/useScrollToTop";
import { Outlet } from "react-router-dom";
import Footer from "../shared/navigation/Footer";
import DownloadYoowifi from "../shared/others/DownloadYoowifi";
import useModal from "@/hooks/useModal";
import CanonicalTag from "../SEO/CanonicalTag";
import NavBar from "../shared/navigation/NavBar";
import NavBarSecondary from "../shared/navigation/NavBarSecondary";
import useResetSource from "@/hooks/useResetSource";

function ChinaJapanLayout() {
  useResetSource();
  useScrollToTop();
  const { authModal, otpModal, loginModal, appDownloadModal } = useModal();

  return (
    <main>
      <CanonicalTag />
      <NavBarSecondary />
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

export default ChinaJapanLayout;
