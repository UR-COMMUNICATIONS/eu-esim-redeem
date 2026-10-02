import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { planCoverage } from "@/general/common.funcitons";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function SimInformation({ item }) {
  const { cart } = useSelector((state) => state.cart);
  const { t } = useTranslation();

  return (
    <Accordion type="single" className="flex flex-col gap-4" collapsible style={{ whiteSpace: "pre-line" }}>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          {t(`simInformation.accordionData.items.0.title`)}
        </AccordionTrigger>
        <AccordionContent>
          {item?.[t(`simInformation.accordionData.items.0.content`)]}
        </AccordionContent>
      </AccordionItem>
      {/* <AccordionItem value="item-2">
        <AccordionTrigger>
          {t(`simInformation.accordionData.items.1.title`)}
        </AccordionTrigger>
        <AccordionContent>
          {planCoverage(cart?.[t(`simInformation.accordionData.items.1.content`)])}
          { }
        </AccordionContent>
      </AccordionItem> */}
      <AccordionItem value="item-3">
        <AccordionTrigger>
          {t(`simInformation.accordionData.items.2.title`)}
        </AccordionTrigger>
        <AccordionContent>
          {t(`simInformation.accordionData.items.2.content`)}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          {t(`simInformation.accordionData.items.3.title`)}
        </AccordionTrigger>
        <AccordionContent>
          {t(`simInformation.accordionData.items.3.content`)}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default SimInformation;
