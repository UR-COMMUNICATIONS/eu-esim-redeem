import { cn } from "@/lib/utils";
import React, { useEffect, useState } from 'react';
import { images, CheckIcon, CloseIcon, EmployeeIcon, PartnershipIcon, CustomSolutionIcon } from "@/services";
import { useTranslation } from "react-i18next";
import HeroCommon from "@/components/shared/others/HeroCommon";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { Trans } from 'react-i18next';
import InfoCard from "@/components/shared/cards/InfoCard";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const EsimChina = () => {
    const { t } = useTranslation(["translation", "english", "local"])
    const data = t("eSIMChina.ways", { returnObjects: true })
    const info = t('eSIMChina.info', { returnObjects: true });
    const setupSteps = t('eSIMChina.setupSteps', { returnObjects: true });
    const guide = t('eSIMChina.guide', { returnObjects: true });
    const beforeBuy = t('eSIMChina.beforeBuy', { returnObjects: true });
    const eSIMChina = t('eSIMChina.askedQuestions', { returnObjects: true });

    // 2) Split into two halves once
    const middleIndex = Math.ceil(eSIMChina.length / 2);
    const firstHalf = eSIMChina.slice(0, middleIndex);
    const secondHalf = eSIMChina.slice(middleIndex);

    // 3) State for which items are open
    const [openItems, setOpenItems] = useState(
        eSIMChina.map((_, i) => `item-${i + 1}`)
    );

    const aboutUs = [
        {
            _id: 1,
            icon: () => (
                <EmployeeIcon className="w-10 h-10 lg:w-[60px] lg:h-[60px]" />
            ),
        },
        {
            _id: 2,
            icon: () => (
                <PartnershipIcon className="w-10 h-10 lg:w-[60px] lg:h-[60px]" />
            ),
        },
        {
            _id: 3,
            icon: () => (
                <CustomSolutionIcon className="w-10 h-10 lg:w-[60px] lg:h-[60px]" />
            ),
        },
    ]
    return (
        <>
            <HeroCommon
                title={t(`eSIMChina.eSIMChina`)}
                titleClassName="normal-case"
            />
            <div className="xl:px-44 lg:px-12 md:px-8 pt-6 px-4">
                <p
                    className={cn(
                        "text-[16px] md:text-[18px] !leading-[1.1] text-[#888888] font-normal pt-8 md:pt-[57.5px] whitespace-pre-line")} >
                    {t(`eSIMChina.StayConnectedYour`)}
                </p>
                <h1
                    className={cn(
                        "text-[24px] md:text-[40px] !leading-[1.1] text-black font-bold pt-8 md:pt-[57.5px] whitespace-pre-line")}>
                    {t(`eSIMChina.YoowifiThailandPlans`)}
                </h1>
                <div className="w-full rounded-[12px] bg-cover bg-center md:pt-10 pt-5">
                    <img
                        src={images.anaBanner}
                        alt="anaBanner"
                        className="min-h-full min-w-full object-contain"
                    />
                </div>
                <p
                    className={cn(
                        "text-[16px] md:text-[18px] !leading-[1.1] text-[#888888] font-normal md:pt-10 pt-5 whitespace-pre-line")} >
                    {t(`eSIMChina.UnlockEffortlessConnectivity`)}
                </p>

                {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                <div className="md:py-16 py-8">
                    <SectionHeader
                        heading={t(`eSIMChina.heading`)}
                        subHeading={
                            <Trans
                                i18nKey="eSIMChina.subHeading"
                                components={{ strong: <strong className="underline font-normal" /> }}
                            />
                        }
                        containerClassName="gap-4"
                        headingClassName='text-[24px] md:text-[40px]'
                        subHeadingClassName='md:px-24 px-0 text-[16px] md:text-[18px]'
                    />
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-10 md:mt-15">
                        {data.map((dat, index) => (
                            <div className="p-4 sm:p-6 sm:pl-8 md:pl-10 rounded-xl sm:rounded-2xl border border-main-600 flex flex-col gap-2 sm:gap-4">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-main-600">
                                    {t(`eSIMChina.ways.${index}.title`)}
                                </h3>
                                <p className="text-sm sm:text-base md:text-lg text-black-600 leading-[140%]">
                                    {t(`eSIMChina.ways.${index}.description`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <div className="md:py-16 py-8 md:mx-6 mx-3 bg-[#F5F5F5] rounded-[24px]">
                <div className="ld:px-40 md:px-14 px-4">
                    <SectionHeader
                        heading={t(`eSIMChina.PhysicalHeading`)}
                        subHeading={
                            <Trans
                                i18nKey="eSIMChina.OptionsSubHeading"
                                components={{ strong: <strong className="underline font-normal" /> }}
                            />
                        }
                        containerClassName="gap-4"
                        headingClassName='text-[24px] md:text-[40px]'
                        subHeadingClassName='lg:px-44 md:px-16 px-0 text-[16px] md:text-[18px]'
                    />
                    {Array.isArray(info) && (
                        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-10 md:mt-15 xl:px-40 px-0">
                            {info.map((item, cardIdx) => (
                                <div
                                    key={cardIdx}
                                    className="rounded-xl sm:rounded-2xl border border-[#EEEEEE] flex flex-col gap-2 sm:gap-4 bg-[#FAFAFA]">
                                    <h3 className="text-center text-lg sm:text-xl md:text-2xl font-bold text-white bg-[#D81F22] rounded-tl-xl rounded-tr-xl sm:rounded-tl-2xl sm:rounded-tr-2xl md:py-4 py-3">
                                        {item.title}
                                    </h3>
                                    <div className="flex flex-col">
                                        {Array.isArray(item.descriptions) &&
                                            item.descriptions.map((line, i) => (
                                                <React.Fragment key={i}>
                                                    <div className="flex items-center gap-3 m-4 md:m-6 md:ml-12">
                                                        {i === item.descriptions.length - 1 ? (
                                                            <CloseIcon
                                                                className="w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0"
                                                                color="#E41F26"
                                                            />
                                                        ) : (

                                                            <CheckIcon
                                                                className="w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0"
                                                                color="#E41F26"
                                                            />
                                                        )}
                                                        <p className="text-base text-[#4F4F4F] leading-[1.4] mb-0 text-[16px] lg:text-[18px]">
                                                            {line}
                                                        </p>
                                                    </div>
                                                    {i !== item.descriptions.length - 1 && (
                                                        <hr className="border-t border-[#EEEEEE]" />
                                                    )}
                                                </React.Fragment>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <div className="containerX md:my-20 my-10">
                <SectionHeader
                    heading={t("eSIMChina.setupStepsheading")}
                    subHeading={t("eSIMChina.setupStepssubHeading")}
                    containerClassName="gap-4"
                    headingClassName='text-[24px] md:text-[40px]'
                    subHeadingClassName='lg:px-44 md:px-16 px-0 text-[16px] md:text-[18px]'
                />
                <div className="w-full flex flex-col gap-6 mt-15">
                    {setupSteps.map(({ step, title, description }, index) => (
                        <InfoCard
                            key={index}
                            title={t(`eSIMChina.setupSteps.${index}.title`) || title}
                            description={
                                t(`eSIMChina.setupSteps.${index}.description`) ||
                                description
                            }
                        >
                            <span className="text-5xl sm:text-6xl md:text-6xml font-bold text-main-600">
                                {step}
                            </span>
                        </InfoCard>
                    ))}
                </div>
            </div>

            {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <div className="containerX md:my-20 my-10">
                <SectionHeader
                    heading={t("eSIMChina.aboutUsHeading")}
                    subHeading={t("eSIMChina.aboutUsSubHeading")}
                    containerClassName="gap-4"
                    headingClassName='text-[24px] md:text-[40px]'
                    subHeadingClassName='lg:px-44 md:px-16 px-0 text-[16px] md:text-[18px]'
                />
                <div className="grid md:grid-cols-3 gap-3 lg:gap-10 mt-15">
                    {aboutUs.map((item, index) => (
                        <article
                            key={index}
                            className="lg:py-10 lg:px-6 p-3 border-2 border-neutral-200 rounded-xl lg:rounded-3xl bg-[#EEEEEE]"
                        >
                            <div className="p-3 lg:p-[10px] bg-[#FAFAFA] w-max rounded-[21.33px]">
                                {item.icon()}
                            </div>

                            <p className="mt-6 mb-2 md:mb-3 text-black-900 text-[18px] lg:text-[24px] font-semibold lg:font-bold leading-[140%] lg:leading-[110%]">
                                {t(`eSIMChina.aboutUs.${index}.title`)}
                            </p>

                            <p className="text-black-600 text-[16px] lg:text-[18px] leading-[140%]">
                                {t(`eSIMChina.aboutUs.${index}.content`)}
                            </p>
                        </article>
                    ))}
                </div>
            </div>

            {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <div className="md:py-16 py-8 md:mx-6 mx-3 bg-[#F5F5F5] rounded-[24px]">
                <div className="ld:px-40 md:px-14 px-4">
                    <SectionHeader
                        heading={t("eSIMChina.guideHeading")}
                        subHeading={t("eSIMChina.guideSubHeading")}
                        containerClassName="gap-4"
                        headingClassName='text-[24px] md:text-[40px]'
                        subHeadingClassName='lg:px-44 md:px-16 px-0 text-[16px] md:text-[18px]'
                    />
                    {Array.isArray(guide) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-10 md:mt-15">
                            {guide.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-xl sm:rounded-2xl border border-[#EEEEEE] bg-[#FAFAFA] p-6 flex flex-col gap-4"
                                >
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#D81F22]">
                                        {item.title}
                                    </h3>

                                    {Array.isArray(item.descriptions) &&
                                        item.descriptions.map((line, i) => (
                                            <p
                                                key={i}
                                                className="text-[16px] lg:text-[18px] text-[#4F4F4F] leading-[1.4] mb-0"
                                            >
                                                {line}
                                            </p>
                                        ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <div className="containerX md:my-20 my-10">
                <SectionHeader
                    heading={t("eSIMChina.beforeBuyheading")}
                    subHeading={t("eSIMChina.beforeBuysubHeading")}
                    containerClassName="gap-4"
                    headingClassName='text-[24px] md:text-[40px]'
                    subHeadingClassName='lg:px-44 md:px-16 px-0 text-[16px] md:text-[18px]'
                />
                <div className="w-full flex flex-col gap-6 mt-15">
                    {beforeBuy.map(({ step, title, description }, index) => (
                        <InfoCard
                            key={index}
                            title={t(`eSIMChina.beforeBuy.${index}.title`) || title}
                            description={
                                t(`eSIMChina.beforeBuy.${index}.description`) ||
                                description
                            }
                        >
                            <span className="text-5xl sm:text-6xl md:text-6xml font-bold text-main-600">
                                {step}
                            </span>
                        </InfoCard>
                    ))}
                </div>
            </div>

            {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <div className="md:py-16 py-8 md:mx-6 mx-3 bg-[#F5F5F5] rounded-[24px] md:my-20 my-10">
                <div className="ld:px-40 md:px-14 px-4">
                    <SectionHeader
                        heading={t("eSIMChina.askedQuestionsHeading")}
                        containerClassName="gap-4"
                        headingClassName='text-[24px] md:text-[40px] sm:whitespace-pre-line'
                        subHeadingClassName='lg:px-44 md:px-16 px-0 text-[16px] md:text-[18px]'
                    />
                    <div className="containerX xl:px-0 grid md:grid-cols-2 gap-y-3 md:gap-10 mt-4 md:mt-8 lg:mt-[60px]">
                        {/* left column */}
                        <Accordion
                            type="single"
                            collapsible
                            value={openItems}
                            onValueChange={setOpenItems}
                            className="space-y-3 md:space-y-6 rounded-xl"
                        >
                            {firstHalf.map((faq, i) => (
                                <AccordionItem
                                    key={i}
                                    value={`item-${i + 1}`}
                                    className="h-fit bg-white py-4"
                                >
                                    <AccordionTrigger className="text-start text-black-900 text-base md:text-lg font-semibold !leading-[1.2] md:!leading-[1.4] px-4 md:h-[60px]">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-xs md:text-lg font-normal !leading-[1.2] md:!leading-[1.4] text-black-600 px-4 md:px-6">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>

                        {/* right column */}
                        <Accordion
                            type="single"
                            collapsible
                            value={openItems}
                            onValueChange={setOpenItems}
                            className="space-y-3 md:space-y-6 rounded-xl"
                        >
                            {secondHalf.map((faq, i) => (
                                <AccordionItem
                                    key={i}
                                    value={`item-${i + 1 + middleIndex}`}
                                    className="h-fit bg-white py-4"
                                >
                                    <AccordionTrigger className="text-start text-black-900 text-base md:text-lg font-semibold !leading-[1.2] md:!leading-[1.4] px-4 md:h-[60px]">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-xs md:text-lg font-normal !leading-[1.2] md:!leading-[1.4] text-black-600 px-4 md:px-6">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EsimChina;
