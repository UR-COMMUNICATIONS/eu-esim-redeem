import SectionHeader from "@/components/shared/others/SectionHeader";
import { t } from "i18next";

function DeliveryOptions() {
  const data = [
    {
      title: "Daily rate",
      description:
        "Our Pocket WiFi Monster Daily Plan, starting from just S$2.50/day, offers a choice between 3GB or 10GB of daily data, with speeds of up to 300Mbps.",
    },
    {
      title: "Fair usage policy (FUP)",
      description:
        "Each plan includes a specified daily data allowance, and once this limit is reached, your connection speed will be reduced.",
    },
    {
      title: "Delivery & return process",
      description:
        "Yoowifi offers flexible delivery and return options to make your experience seamless. You can choose self-pickup from multiple locations or have your device delivered free within 5 business days before your trip. Returning your device is also easy. Simply drop it off at any of 20+ island-wide locations.",
    },
    {
      title: "Cancellation policy",
      description:
        "If you need to cancel your booking, simply contact our customer service team. The cancellations are subject to our terms and conditions.",
    },
  ];

  return (
    <section className="sec_common_60">
      <div className="containerX">
        <SectionHeader
          heading={t(`pocketWifiJapan.deliveryOptions.title`)}
          subHeading={t(`pocketWifiJapan.deliveryOptions.titlefollow`)}
          containerClassName="gap-4"
          headingClassName="text-4xl"
        />
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-10 md:mt-15">
          {data.map((_, index) => (
            <div className="p-4 sm:p-6 sm:pl-8 md:pl-10 rounded-xl sm:rounded-2xl border border-main-200 flex flex-col gap-2 sm:gap-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-main-600">
                {t(`pocketWifiJapan.deliveryOptions.plans.${index}.title`)}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-black-600 leading-[140%]">
                {t(`pocketWifiJapan.deliveryOptions.plans.${index}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DeliveryOptions;
