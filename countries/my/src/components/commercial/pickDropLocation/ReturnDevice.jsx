import GeneralCard from "@/components/shared/cards/GeneralCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { useTranslation } from "react-i18next";

const ReturnDevice = () => {

  const { nameSpace, } = useUserLocationLanguage()
  const { t } = useTranslation(["translation", "english", "local"])

  const CardData = t(`${nameSpace}:pocketWifi.howToReturn.cardData`, { returnObjects: true })
  const heading = t(`${nameSpace}:pocketWifi.howToReturn.heading`)
  const subHeading = t(`${nameSpace}:pocketWifi.howToReturn.subHeading`)
  const headerTittle = t(`${nameSpace}:pocketWifi.howToReturn.headertittle`)

  return (
    <section className="sec_common_60">
      <div className="containerX">
        <SectionHeader
          heading={heading}
          subHeading={subHeading}
          containerClassName="gap-4"
        />
        <div className="mt-6 sm:mt-10 md:mt-15 grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {CardData
            .map((card, index) => (
              <div key={index}>
                <GeneralCard
                  value={card.value}
                  link={card.link}
                  title={card.title}
                  description={card.description}
                  buttonText={card.buttonText}
                  isShowButton={card.isShowButton}
                />
              </div>
            ))}
        </div>
        {/* <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-black-800 !leading-[1.4] text-center md:mt-[100px] mt-[20px] -mb-[50px]">
          {headerTittle}
        </h1> */}
      </div>
    </section>
  );
};

export default ReturnDevice;
