import LetsTalk from "@/components/commercial/contact/LetsTalk";
import Products from "@/components/commercial/home/Products";
import Benefits from "@/components/corporate/commercial/Benefits";
import CollaborateMarquee from "@/components/shared/CollaborateMarquee";
import CorporateBanner from "@/components/shared/others/CorporateBanner";
import CustomerTestimonial from "@/components/shared/others/CustomerTestimonial";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Commercial = () => {
  const { contact, socialLinks } = useSelector((state) => state.contact);
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden w-full">
      <CorporateBanner
        isShowBannerBottom={false}
        pageTitle={t("commercial.pageTitle")}
        description={t("commercial.description")}
        bannerStyle={2}
      />
      <Benefits />
      <Products />
      <CustomerTestimonial />
      <CollaborateMarquee />
      <LetsTalk data={contact} socialLinks={socialLinks} />
    </div>
  );
};

export default Commercial;
