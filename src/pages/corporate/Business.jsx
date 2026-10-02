import BusinessDetail from "@/components/commercial/Business/BusinessDetail";
import DarkUSPs from "@/components/commercial/Business/DarkUSPs";
import Hero from "@/components/commercial/Business/Hero";
import Industries from "@/components/commercial/Business/Industries";
import TwoRoutes from "@/components/commercial/Business/TwoRoutes";
import WhiteLabelDetail from "@/components/commercial/Business/WhiteLabelDetail";
import LetsTalk from "@/components/commercial/contact/LetsTalk";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { countriesBasedData } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import "./Business.css";

const isIdDomain = () =>
  typeof window !== "undefined" &&
  window.location?.hostname?.toLowerCase().includes("yoowifi.id");

export default () => {
  const { contact, socialLinks } = useSelector((state) => state.contact);
  const { supportPhone, WhatsappLink } = useUserLocationLanguage();
  const idContact = countriesBasedData.id;
  const useIdContact = isIdDomain();
  const displayPhone = useIdContact ? idContact.supportPhone : supportPhone;
  const displayWhatsappLink = useIdContact
    ? `https://wa.me/${idContact.supportPhone.replace(/[^0-9]/g, "")}`
    : WhatsappLink;
  const { t } = useTranslation();

  return (
    <body>
      <div className="bg-white overflow-hidden w-full">
        <main className="w-full min-h-screen bg-white">
          <Hero />
          <TwoRoutes />
          <DarkUSPs />
          <BusinessDetail />
          <WhiteLabelDetail />
          <Industries />
        </main>
        <LetsTalk
          data={contact}
          socialLinks={socialLinks}
          supportPhone={displayPhone}
          whatsappLink={displayWhatsappLink}
        />
      </div>
    </body>
  );
};
