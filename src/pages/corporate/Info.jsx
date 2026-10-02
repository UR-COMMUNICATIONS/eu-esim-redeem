import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import LetsTalk from "@/components/commercial/contact/LetsTalk";
import BusinessFeatures from "@/components/commercial/Info/BusinessFeatures";
import GlobalConnectivity from "@/components/commercial/Info/GlobalConnectivity";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { countriesBasedData } from "@/lib/utils";

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
    <div className="bg-white overflow-hidden w-full">
      <article className="w-full min-h-screen bg-white">
        <BusinessFeatures />
        <GlobalConnectivity />
      </article>
      <LetsTalk
        data={contact}
        socialLinks={socialLinks}
        supportPhone={displayPhone}
        whatsappLink={displayWhatsappLink}
      />
    </div>
  );
};
