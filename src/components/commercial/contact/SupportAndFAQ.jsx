import SectionHeader from "@/components/shared/others/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "@/services";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";

const SupportAndFAQ = ({ data }) => {
  const [firstHalf, setFirstHalf] = useState([]);
  const [secondHalf, setSecondHalf] = useState([]);
  const [openItems, setOpenItems] = useState([]);
  const { getInTouch } = useUserLocationLanguage()

  const { t } = useTranslation();
  const middleIndex = Math.ceil(data?.length / 2);

  useEffect(() => {
    setFirstHalf(data?.slice(0, middleIndex));
    setSecondHalf(data?.slice(middleIndex));

    const allItems = data?.map((_, index) => `item-${index + 1}`) || [];
    setOpenItems(allItems);
  }, [data]);

  const handleOpenChange = (newOpenItems) => {
    setOpenItems(newOpenItems);
  };

  return (
    <div className="px-4 2xl:px-0 sec_common_80">
      <div className="sec_common_60 pb-3 md:pb-10 lg:pb-20 container3X rounded-2xl md:rounded-3xl bg-[#ececec] px-3 md:px-6 min-[1320px]:px-0">
        <SectionHeader
          heading={t("faqs.heading")}
          subHeading={t("faqs.subHeading")}
          containerClassName={"gap-4 md:gap-[18px]"}
        />

        <div className="containerX xl:px-0 grid md:grid-cols-2 gap-y-3 md:gap-10 mt-4 md:mt-8 lg:mt-[60px]">
          <Accordion
            type="multiple"
            value={openItems}
            onValueChange={handleOpenChange}
            className={cn("space-y-3 md:space-y-6 rounded-xl")}
          >
            {firstHalf?.map((faq, index) => (
              <AccordionItem
                value={`item-${index + 1}`}
                className="h-fit bg-white py-4"
                key={index}
              >
                <AccordionTrigger className="text-start text-black-900 text-base md:text-lg font-semibold !leading-[1.2] md:!leading-[1.4] px-4 md:h-[60px]">
                  {t(`faqs.content.${index}.question`)}
                </AccordionTrigger>
                <AccordionContent
                  className={
                    "text-xs md:text-lg font-normal !leading-[1.2] md:!leading-[1.4] text-black-600 px-4 md:px-6"
                  }
                >
                  {t(`faqs.content.${index}.answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Accordion
            type="multiple"
            value={openItems}
            onValueChange={handleOpenChange}
            className={cn("space-y-3 md:space-y-6 rounded-xl")}
          >
            {secondHalf?.map((faq, index) => (
              <AccordionItem
                value={`item-${index + 1 + middleIndex}`}
                className="h-fit bg-white py-4"
                key={index}
              >
                <AccordionTrigger className="text-start text-black-900 text-base md:text-lg font-semibold !leading-[1.2] md:!leading-[1.4] px-4 md:h-[60px]">
                  {t(`faqs.content.${index + middleIndex}.question`)}
                </AccordionTrigger>
                <AccordionContent
                  className={
                    "text-xs md:text-lg font-normal !leading-[1.2] md:!leading-[1.4] text-black-600 px-4 md:px-6"
                  }
                >
                  {t(`faqs.content.${index + middleIndex}.answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <a
          href="https://yoowifipteltd.freshdesk.com/support/solutions"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          <p className="md:mt-12 mt-8 text-center text-[20px] font-bold">
            {t("faqs.footer.viewmore")}
          </p>
        </a>
        <div className="flex flex-col items-center mt-4 md:mt-8 lg:mt-[40px]">
          <h2 className="text-main-600 text-2xl md:text-5xl font-bold !leading-[1.4] md:!leading-[1.1] text-center">
            {t("faqs.footer.heading")}
          </h2>
          <p className="p_common mt-[18px] text-center">
            {t("faqs.footer.description")}
          </p>

          <div className="flex gap-3 mt-6">
            <a
              href={getInTouch}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="secondary"
                className={
                  "!text-base font-semibold !leading-[1.2] w-[177px] h-[52px]"
                }
              >
                {t("buttonText.getInTouch")}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportAndFAQ;
