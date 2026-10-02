import useDynamicImages from "@/hooks/useDynamicImages";
import { RightIcon, WifiIcon } from "@/services";
import { esim, japanDeviceGrey, sim } from "@/services/images";
import { useTranslation } from "react-i18next";

const Guidelines = () => {
  const { t } = useTranslation();

  const leftItems = [
    {
      key: "device",
      image: japanDeviceGrey,
      imgClass: "w-[32px] h-[48px]",
      title: t("myAccount.device"),
    },
    {
      key: "sim",
      image: sim,
      imgClass: "w-[36px] h-[44px]",
      title: t("myAccount.sim"),
    },
    {
      key: "esim",
      image: esim,
      imgClass: "w-[36px] h-[44px]",
      title: t("myAccount.eSim"),
    },
  ];

  const rightTop = {
    title: t("myAccount.wiFiDataPlans"),
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="flex flex-col gap-6">
        {leftItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between border border-[#E0E0E0] rounded-[16px] py-4 px-4"
          >
            <div className="flex items-center gap-6 sm:gap-10">
              <div className="bg-[#EDEEFF] rounded-[8px] p-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`${item.imgClass} object-contain`}
                />
              </div>
              <h1 className="text-[#191919] sm:text-[24px] text-[18px] font-bold">
                {item.title}
              </h1>
            </div>
            <RightIcon className="h-3 w-4" color="#757575" />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between border border-[#E0E0E0] rounded-[16px] py-4 px-4">
          <div className="flex items-center gap-6 sm:gap-10">
            <div className="bg-[#EDEEFF] rounded-[8px] flex items-center justify-center w-[64px] h-[64px] p-1">
              <WifiIcon
                className=" text-center flex items-center justify-center"
                color="#E41F26"
              />
            </div>
            <h1 className="text-[#191919] sm:text-[24px] text-[18px] font-bold">
              {rightTop.title}
            </h1>
          </div>
          <RightIcon className="h-3 w-4" color="#757575" />
        </div>

        <div className="border border-[#E0E0E0] rounded-[16px] py-8 px-4 flex flex-col gap-6">
          <div className="flex items-center gap-6 sm:gap-10">
            <div className="bg-[#EDEEFF] rounded-[8px] p-2">
              <img
                src={useDynamicImages("others", "rounded-icon")}
                alt={t("myAccount.learnMoreAbout")}
                className="w-[64px] h-[64px] object-contain"
              />
            </div>
            <p className="text-[#191919] sm:text-[16px] text-[14px] font-normal">
              {t("myAccount.learnMoreAbout")}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <h1 className="text-[#191919] sm:text-[24px] text-[18px] font-bold">
              {t("myAccount.guidelines")}
            </h1>
            <RightIcon className="h-3 w-4" color="#757575" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
