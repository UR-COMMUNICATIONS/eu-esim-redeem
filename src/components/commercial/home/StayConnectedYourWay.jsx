import SectionHeader from "@/components/shared/others/SectionHeader";
import useDynamicImages from "@/hooks/useDynamicImages";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { cn } from "@/lib/utils";
import { images } from "@/services";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const useHowIthowItConnectedTranslations = (namespace, t, tSafe) => ({
  heading: tSafe(`howItConnected.sectionHeading`),
  subHeading: tSafe(`howItConnected.sectionSubHeading`),
});

const StayConnectedYourWay = () => {
  const { currentCountry, nameSpace } = useUserLocationLanguage();
  const isTargetCountry = currentCountry?.toLowerCase() === "jp";
  const { t } = useTranslation(["translation", "english", "local"]);
  const navigate = useNavigate();
  const tSafe = (key) =>
    t(`${nameSpace}:${key}`, {
      defaultValue: t(key),
    });
  const { heading, subHeading } = useHowIthowItConnectedTranslations(
    nameSpace,
    t,
    tSafe,
  );

  const cardData = [
    {
      img: isTargetCountry ? images.japanDeviceBlue : images.japanDeviceGrey,
      title: tSafe(`howItConnected.cards.pocketWifi.title`),
      desc: tSafe(`howItConnected.cards.pocketWifi.desc`),
      features: [
        {
          text: tSafe(`howItConnected.cards.pocketWifi.features.0`),
          img: "earth-grey",
          altAttr: "pocket wifi feature earth",
          titleAttr: "pocket wifi feature earth",
        },
        {
          text: tSafe(`howItConnected.cards.pocketWifi.features.1`),
          img: "mobile-hotspot",
          altAttr: "pocket wifi feature mobile hotspot",
          titleAttr: "pocket wifi feature mobile hotspot",
        },
        {
          text: tSafe(`howItConnected.cards.pocketWifi.features.2`),
          img: "speedo-meter-grey",
          altAttr: "pocket wifi feature speedo meter",
          titleAttr: "pocket wifi feature speedo meter",
        },
        {
          text: tSafe(`howItConnected.cards.pocketWifi.features.3`),
          img: "add-payment",
          altAttr: "pocket wifi feature add payment",
          titleAttr: "pocket wifi feature add payment",
        },
        {
          text: tSafe(`howItConnected.cards.pocketWifi.features.4`),
          img: "group",
          altAttr: "pocket wifi feature group",
          titleAttr: "pocket wifi feature group",
        },
      ],
      button: tSafe(`howItConnected.cards.pocketWifi.button`),
      link: "product/pocket-wifi",
      altAttr: "Pocket WiFi Rental for Indonesia Day Pass",
      titleAttr: "Pocket WiFi Rental for Indonesia Day Pass",
    },
    !isTargetCountry && {
      img: images.sim,
      title: tSafe(`howItConnected.cards.simCard.title`),
      desc: tSafe(`howItConnected.cards.simCard.desc`),
      features: [
        {
          text: tSafe(`howItConnected.cards.simCard.features.0`),
          img: "dashboard-grey",
          altAttr: "sim card feature dashboard",
          titleAttr: "sim card feature dashboard",
        },
        {
          text: tSafe(`howItConnected.cards.simCard.features.1`),
          img: "search-grey",
          altAttr: "sim card feature search",
          titleAttr: "sim card feature search",
        },
        {
          text: tSafe(`howItConnected.cards.simCard.features.2`),
          img: "thunder-grey",
          altAttr: "sim card feature thunder",
          titleAttr: "sim card feature thunder",
        },
        {
          text: tSafe(`howItConnected.cards.simCard.features.3`),
          img: "shield-grey",
          altAttr: "sim card feature shield",
          titleAttr: "sim card feature shield",
        },
        {
          text: tSafe(`howItConnected.cards.simCard.features.4`),
          img: "earth-grey",
          altAttr: "sim card feature earth",
          titleAttr: "sim card feature earth",
        },
      ],
      button: tSafe(`howItConnected.cards.simCard.button`),
      link: "/product/sim",
      altAttr: "eSIM Data Plan for Europe 42 Countries",
      titleAttr: "eSIM Data Plan for Europe 42 Countries",
    },
    {
      img: images.esim,
      title: tSafe(`howItConnected.cards.eSIM.title`),
      desc: tSafe(`howItConnected.cards.eSIM.desc`),
      features: [
        {
          text: tSafe(`howItConnected.cards.eSIM.features.0`),
          img: "thunder-grey",
          altAttr: "eSIM feature thunder",
          titleAttr: "eSIM feature thunder",
        },
        {
          text: tSafe(`howItConnected.cards.eSIM.features.1`),
          img: "earth-grey",
          altAttr: "eSIM feature earth",
          titleAttr: "eSIM feature earth",
        },
        {
          text: tSafe(`howItConnected.cards.eSIM.features.2`),
          img: "signal-status",
          altAttr: "eSIM feature signal status",
          titleAttr: "eSIM feature signal status",
        },
        {
          text: tSafe(`howItConnected.cards.eSIM.features.3`),
          img: "leaf-grey",
          altAttr: "eSIM feature leaf",
          titleAttr: "eSIM feature leaf",
        },
        {
          text: tSafe(`howItConnected.cards.eSIM.features.4`),
          img: "setting-grey",
          altAttr: "eSIM feature setting",
          titleAttr: "eSIM feature setting",
        },
      ],
      button: tSafe(`howItConnected.cards.eSIM.button`),
      link: "/product/sim",
      altAttr: "eSIM Data Plan for Europe 42 Countries",
      titleAttr: "eSIM Data Plan for Europe 42 Countries",
    },
  ].filter(Boolean);

  return (
    <section className="containerX sec_common_60 px-4 md:px-6 xl:px-0 flex flex-col items-center gap-10 md:gap-16">
      <SectionHeader heading={heading} subHeading={subHeading} />

      <div
        className={cn(
          "grid gap-6 w-full items-stretch",
          isTargetCountry
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 justify-center place-items-center"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {cardData.map((card, index) => (
          <div
            key={index}
            className={cn(
              "rounded-2xl md:rounded-3xl bg-white py-6 px-5 shadow-card-secondary w-full border border-neutral-200 flex flex-col justify-between h-full",
            )}
          >
            <div>
              <div className="rounded-xl md:rounded-[22px] bg-[#F5F5F5] flex_center overflow-hidden h-44 md:h-52 lg:h-60 py-4">
                <img
                  src={card.img}
                  alt={card.altAttr}
                  title={card.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <h2 className="text-black-700 text-[18px] md:text-[20px] font-bold leading-[1.4] mt-6 md:mt-10">
                {card.title}
              </h2>
              <p className="text-sm md:text-[14px] text-black-600 leading-[1.4] mt-2 md:mt-3">
                {card.desc}
              </p>

              <div className="flex flex-col space-y-2 mt-6">
                {card.features.map(({ text, img, altAttr, titleAttr }, i) => (
                  <div key={i} className="flex items-center">
                    <img
                      src={useDynamicImages("others", img)}
                      className={cn(
                        "w-auto h-[16px]",
                        img === "group" && "w-[16px] h-auto",
                      )}
                      alt={altAttr}
                      title={titleAttr}
                    />
                    <p className="text-sm md:text-[14px] text-black-600 leading-[1.4] ml-2">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate(card.link)}
              className="mt-8 w-full bg-[#D81F22] text-white hover:bg-[#b4171a] text-sm md:text-[14px] font-medium py-2 md:py-3 rounded-xl flex items-center justify-center gap-2 transition"
            >
              {card.button}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default memo(StayConnectedYourWay);
