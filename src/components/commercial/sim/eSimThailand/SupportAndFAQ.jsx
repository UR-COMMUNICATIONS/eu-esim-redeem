import SectionHeader from "@/components/shared/others/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const SupportAndFAQ = () => {
  const [openItem, setOpenItem] = useState(null);
  const firstHalf = [0, 1, 2];
  const secondHalf = [5, 6];
  const fulldata = [0, 1, 2, 3, 4];

  const { t } = useTranslation();

  const middleIndex = Math.ceil(fulldata?.length / 2);

  const handleOpenChange = (value) => {
    setOpenItem(value === openItem ? null : value);
  };

  return (
    <div className="px-4 2xl:px-0 sec_common_80">
      <div className="sec_common_60 pb-3 md:pb-10 lg:pb-20 container3X rounded-2xl md:rounded-3xl bg-neutral-100 px-3 md:px-6 min-[1320px]:px-0">
        <SectionHeader
          heading={t("eSimThailand.faqs.title")}
          headingClassName="text-4xl"
          containerClassName={"gap-4 md:gap-[18px]"}
        />

        <div className="containerX xl:px-0 grid md:grid-cols-2 gap-y-3 md:gap-10 mt-4 md:mt-8 lg:mt-[60px]">
          <Accordion
            type="single"
            collapsible
            value={openItem}
            onValueChange={handleOpenChange}
            className={cn("space-y-3 md:space-y-6 rounded-xl")}
          >
            {firstHalf.map((faq, index) => (
              <AccordionItem
                value={`item-${index + 1}`}
                className="h-fit bg-white py-4"
                key={index}
              >
                <AccordionTrigger className="text-start text-black-900 text-base md:text-lg font-semibold !leading-[1.2] md:!leading-[1.4] px-4 md:px-6">
                  {t(`eSimThailand.faqs.faqs.${index}.question`)}
                </AccordionTrigger>
                <AccordionContent
                  className={
                    "text-xs md:text-lg font-normal !leading-[1.2] md:!leading-[1.4] text-black-600 px-4 md:px-6"
                  }
                >
                  {t(`eSimThailand.faqs.faqs.${index}.answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Accordion
            type="single"
            collapsible
            value={openItem}
            onValueChange={handleOpenChange}
            className={cn("space-y-3 md:space-y-6 rounded-xl")}
          >
            {secondHalf.map((faq, index) => (
              <AccordionItem
                value={`item-${index + 1 + firstHalf.length}`}
                className="h-fit bg-white py-4"
                key={index}
              >
                <AccordionTrigger className="text-start text-black-900 text-base md:text-lg font-semibold !leading-[1.2] md:!leading-[1.4] px-4 md:px-6">
                  {t(
                    `eSimThailand.faqs.faqs.${index + middleIndex}.question`
                  )}
                </AccordionTrigger>
                <AccordionContent
                  className={
                    "text-xs md:text-lg font-normal !leading-[1.2] md:!leading-[1.4] text-black-600 px-4 md:px-6"
                  }
                >
                  {t(`eSimThailand.faqs.faqs.${index + middleIndex}.answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default SupportAndFAQ;
