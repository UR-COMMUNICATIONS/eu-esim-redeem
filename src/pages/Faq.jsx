import SupportAndFAQ from "@/components/commercial/contact/SupportAndFAQ";
import { useSelector } from "react-redux";

function Faq() {
  const { faqs } = useSelector((state) => state.contact);

  return (
    <div>
      <SupportAndFAQ data={faqs} />
    </div>
  );
}

export default Faq;
