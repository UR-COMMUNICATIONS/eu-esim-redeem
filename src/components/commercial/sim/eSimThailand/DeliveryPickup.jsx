import SectionHeader from "@/components/shared/others/SectionHeader";
import {
  BoxDelivery,
  CarDelivery,
  MotorDelivery,
} from "@/services";
import { useTranslation } from "react-i18next";

const DeliveryPickup = () => {
  const howItWorksData = [
    {
      icon: <MotorDelivery className={"h-10 w-10 md:h-[60px] md:w-[60px]"} />,
      title: "How To Rent",
    },
    {
      _id: 2,

      icon: <CarDelivery className={"h-10 w-10 md:h-[60px] md:w-[60px]"} />,
      title: "How To Return",
    },
    {
      _id: 3,
      icon: <BoxDelivery className={"h-10 w-10 md:h-[60px] md:w-[60px]"} />,
      title: "Pickup & Drop Off Locations",
    },
  ];
  const { t } = useTranslation();

  return (
    <section className="containerX sec_common_60 px-4 md:px-6 xl:px-0 flex flex-col items-center gap-6 md:gap-10 lg:gap-20">
      <SectionHeader
        heading={t("eSimThailand.deliveryPickup.title")}
        subHeading={t("eSimThailand.deliveryPickup.titlefollow")}
        headingClassName="text-4xl"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
        {howItWorksData.map((item, index) => (
          <div className="rounded-xl md:rounded-2xl bg-neutral-100 py-6 md:py-10 px-4 md:px-6 w-full flex flex-col justify-between">
            <div className="flex-1 flex flex-col justify-between">
              <div className="h-14 md:h-20 w-14 md:w-20 rounded-lg md:rounded-xl bg-neutral-50 flex_center">
                {item.icon}
              </div>
              <div className="">
                <h2
                  className="text-black-700 text-[18px] md:text-2xl !leading-[1.4] mt-6 md:mt-12 lg:mt-[60px] font-bold line-clamp-1"
                  title={item.title}
                >
                  {t(`eSimThailand.deliveryPickup.steps.${index}.title`)}
                </h2>

                <p className="text-sm md:text-[18px] text-black-600 !leading-[1.4] mt-2 md:mt-3">
                  {t(`eSimThailand.deliveryPickup.steps.${index}.description`)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DeliveryPickup;
