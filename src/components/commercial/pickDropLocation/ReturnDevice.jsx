import GeneralCard from "@/components/shared/cards/GeneralCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
// import { cardData } from "@/constants/staticData";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ReturnDevice = () => {
  const { navigate } = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { nameSpace, isTargetCountry } = useUserLocationLanguage();
  const { t } = useTranslation(["translation", "english", "local"]);

  const currentLanguage = sessionStorage.getItem("i18next")?.toUpperCase();
  const currentCountry = cart.userCountry?.country?.toUpperCase();
  const isJapanCountry =
    currentCountry === "JP" &&
    (currentLanguage === "EN" || currentLanguage === "JP");

  const pocketWifi = t(`${nameSpace}:pocketWifi`, { returnObjects: true });

  return (
    <section className="sec_common_60">
      <div className="containerX">
        <SectionHeader
          heading={pocketWifi?.howToReturn?.heading}
          subHeading={
            isJapanCountry
              ? pocketWifi?.howToReturn?.subHeadingJp
              : pocketWifi?.howToReturn?.subHeading
          }
          containerClassName="gap-4"
        />
        <div
          className={`mt-6 sm:mt-10 md:mt-15 ${isJapanCountry
            ? "flex justify-center"
            : "grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6"
            }`}
        >
          {pocketWifi?.howToReturn?.cardData
            ?.filter((card) =>
              isJapanCountry
                ? card.value?.toUpperCase() === "JP"
                : card.value?.toUpperCase() !== "JP"
            )
            .map((card, index) => (
              <div
                key={index}
                className={` ${isJapanCountry ? "max-w-[620px] w-full" : ""}`}
              >
                <GeneralCard
                  value={card.value}
                  link={card.link}
                  title={card.title}
                  description={card.description}
                  buttonText={t("buttonText.viewLocations") || card.buttonText}
                  // onClick={() => handleCardClick(card.link)}
                />
              </div>
            ))}
        </div>
        {!isJapanCountry && (
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-black-800 !leading-[1.4] text-center md:mt-[100px] mt-[20px] -mb-[50px]">
            {pocketWifi?.howToReturn?.headertittle}
          </h1>
        )}
      </div>
    </section>
  );
};

export default ReturnDevice;
