import GeneralCard from "@/components/shared/cards/GeneralCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { useTranslation } from "react-i18next";

const ReturnDevice = () => {
    const { nameSpace } = useUserLocationLanguage()
    const { t } = useTranslation(["translation", "english", "local"])

    const CardData = t(`${nameSpace}:pocketWifi.howToReturn.cardData`, { returnObjects: true })
    const heading = t(`${nameSpace}:pocketWifi.howToReturn.heading`)
    const subHeading = t(`${nameSpace}:pocketWifi.howToReturn.subHeading`)

    return (
        <section className="sec_common_60">
            <div className="containerX">
                <SectionHeader
                    heading={heading}
                    subHeading={subHeading}
                    containerClassName="gap-4"
                />
                <div className="mt-6 sm:mt-10 md:mt-15 flex justify-center">
                    {CardData
                        .map((card, index) => (
                            <div key={index} className="max-w-[620px] w-full">
                                <GeneralCard
                                    value={card.value}
                                    link={card.link}
                                    title={card.title}
                                    description={card.description}
                                    buttonText={card.buttonText}
                                    isShowButton={card.isShowButton}
                                    bullet
                                />
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default ReturnDevice;
