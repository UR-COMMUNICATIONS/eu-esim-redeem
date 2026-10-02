import LetsTalk from "@/components/commercial/contact/LetsTalk";
import Products from "@/components/commercial/home/Products";
import CollaborateMarquee from "@/components/shared/CollaborateMarquee";
import CorporateBanner from "@/components/shared/others/CorporateBanner";
import CustomerTestimonial from "@/components/shared/others/CustomerTestimonial";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Iot = () => {
  const { contact, socialLinks } = useSelector((state) => state.contact);
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden w-full">
      <CorporateBanner
        pageTitle={t("iot.pageTitle")}
        description={t("iot.description")}
        featureList={Array.from({ length: 4 }, (_, index) =>
          t(`iot.featureList.${index}`)
        )}
        path="/view-more"
      />
      <Products />
      <CustomerTestimonial />
      <CollaborateMarquee />
      <LetsTalk data={contact} socialLinks={socialLinks} />
    </div>
  );
};

export default Iot;
