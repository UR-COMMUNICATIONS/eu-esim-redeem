import LetsTalk from "@/components/commercial/contact/LetsTalk";
import SupportAndFAQ from "@/components/commercial/contact/SupportAndFAQ";
import HeroCommon from "@/components/shared/others/HeroCommon";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Contact = () => {
  const { contact, faqs } = useSelector((state) => state.contact);
  const { t } = useTranslation();

  return (
    <div>
      <HeroCommon
        title={t("contact.title")}
        description={t("contact.description")}
      />
      <LetsTalk data={contact} />
      <SupportAndFAQ data={faqs} />
    </div>
  );
};

export default Contact;
