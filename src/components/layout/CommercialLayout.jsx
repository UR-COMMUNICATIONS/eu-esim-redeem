import useModal from "@/hooks/useModal";
import useSetLocalData from "@/hooks/useSetLocalData";
import { Outlet } from "react-router-dom";
import NavBarSecondary from "@/components/shared/navigation/NavBarSecondary";
import useResetSource from "@/hooks/useResetSource";
import useScrollToTop from "@/hooks/useScrollToTop";
import CanonicalTag from "../SEO/CanonicalTag";

function CommercialLayout() {
  useSetLocalData("commercialLayout");
  useResetSource();
  useScrollToTop();
  const { authModal, loginModal, appDownloadModal } = useModal();

  return (
    <main>
      <CanonicalTag />
      <NavBarSecondary />
      <Outlet />
      {/* No site-wide footer: the EU screens end with their own app-download
          banner (pages/commercial/esimRedeem/EuAppBanner). */}
      {authModal}
      {loginModal}
      {appDownloadModal}
    </main>
  );
}

export default CommercialLayout;
