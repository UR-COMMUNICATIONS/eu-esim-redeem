import InfoCard from "@/components/shared/cards/InfoCard";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@/services";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const HowToConnect = ({ link }) => {
  const setupSteps = [
    {
      step: 1,
      title: "Turn On the Pocket WiFi",
      description:
        "Press the power button to turn it on and wait for it to connect to the network.",
    },
    {
      step: 2,
      title: "Find the WiFi Name",
      description:
        "Check the device's screen for the WiFi network name (SSID).",
    },
    {
      step: 3,
      title: "Connect to WiFi",
      description:
        "On your smartphone, tablet, or laptop, open WiFi settings, select the SSID, enter the password displayed on the device, and you will be connected to the internet.",
    },
  ];

  const { t } = useTranslation();

  return (
    <section className="sec_common_60">
      <div className="containerX">
        <SectionHeader
          heading={t("setupPocketWifi.heading")}
          subHeading={t("setupPocketWifi.subHeading")}
          containerClassName="gap-4"
        />
        <div className="w-full flex flex-col gap-6 mt-15">
          {setupSteps.map(({ step, title, description }, index) => (
            <InfoCard
              key={index}
              title={t(`setupPocketWifi.setupSteps.${index}.title`) || title}
              description={
                t(`setupPocketWifi.setupSteps.${index}.description`) ||
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

      {link && (
        <div className="flex_center mt-4 md:mt-8">
          <Link to={link.to}>
            <Button className={"w-full md:w-fit h-11 md:h-[52px]"}>
              <span>{t("buttonText.buyPocketWifi") || link.text}</span>
              <ArrowUpRightIcon className={"!h-6 !w-6 shrink-0"} />
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default HowToConnect;
