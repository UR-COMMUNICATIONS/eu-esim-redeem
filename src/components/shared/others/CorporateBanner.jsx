import { Button } from "@/components/ui/button";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { cn } from "@/lib/utils";
import { CheckIcon, commercialRoutes, YooWifiLogoIcon } from "@/services";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const CorporateBanner = ({
  pageTitle = "IOT",
  description = "",
  featureList = [],
  path = "#",
  isShowBannerBottom = true,
  isShowTopPricing = true,
  bannerStyle = 1,
  bannerStyle2ColumnBased = false,
}) => {
  const { nameSpace, isTargetCountry, idNull } = useUserLocationLanguage();
  const navigate = useNavigate();
  const { t } = useTranslation(["translation", "english", "local"]);
  // const items = Array.from({ length: 3 }, (_, index) =>
  //   t(`${nameSpace}:corporateSharedHero.items.${index}`)
  // );
  const items = t(`${nameSpace}:corporateSharedHero.items`, {
    returnObjects: true,
  });

  return (
    <>
      {/* banner main part */}
      <div
        className={cn(
          " bg-main-600  text-white cursor-default relative overflow-hidden",
          bannerStyle === 1
            ? "pt-[16.5px] pb-[30px] lg:pt-20 lg:pb-[56px]"
            : "py-6 lg:py-[60.5px]",
        )}
      >
        <div
          className={cn(
            bannerStyle === 1 ? "containerHeader" : "containerX",
            "px-4 xl:px-0",
          )}
        >
          {bannerStyle === 1 ? (
            <div className="relative z-10 flex flex-col xl:flex-row gap-y-[16.5px] xl:gap-y-0 gap-x-[88.5px]">
              <div>
                <h1 className="text-[28px] xl:text-6xl font-bold leading-[110%] xl:leading-[140%] font-dmsans xl:font-sansPro break-all">
                  {t("corporateSharedHero.heading")}
                </h1>

                <ul className="flex gap-x-1 xl:gap-x-4 items-center text-xs xl:text-2xl leading-[120%]">
                  {items.map((item, index) => (
                    <React.Fragment key={index}>
                      <li>{item}</li>
                      {index < items.length - 1 && (
                        <li className="w-2 h-2 rounded-full bg-white"></li>
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              </div>

              <div className="flex-1 flex justify-between items-center xl:gap-6">
                {!idNull && isShowTopPricing && (
                  <div>
                    <h3 className="text-base xl:text-[32px] font-bold leading-[140%] xl:leading-[120%] font-sansPro">
                      {t(`${nameSpace}:extraText.unlimitedData`)}
                    </h3>
                    <h2 className="text-[18px] xl:text-[40px] font-black text-secondary-400 leading-[120%] font-sansPro">
                      {t(`${nameSpace}:extraText.from`)}
                      <span className="text-[32px] xl:text-[76px] leading-[120%]">
                        {" "}
                        {t(`${nameSpace}:extraText.amountTotal`)}
                        {t(`${nameSpace}:extraText.day`)}
                      </span>
                    </h2>
                  </div>
                )}
                {/* <Button
                  variant="secondary"
                  size="lg"
                  className="text-sm xl:text-xl font-normal hover:!bg-secondary-400 rounded-[30px] px-[14.52px] py-[8.47px]"
                  onClick={() => navigate(path)}
                >
                  {t("buttonText.viewMore")}
                </Button> */}
              </div>
            </div>
          ) : (
            <div
              className={cn(
                "relative z-10 flex items-start px-4",
                bannerStyle2ColumnBased
                  ? "flex-col"
                  : "flex-col lg:flex-row lg:items-center gap-2 lg:gap-6",
              )}
            >
              <h1
                className={cn(
                  "text-[28px] xl:text-6xl font-bold font-dmsans xl:font-sansPro break-all uppercase flex-1",
                  bannerStyle2ColumnBased
                    ? "leading-[104%]"
                    : "leading-[110%] xl:leading-[140%]",
                )}
              >
                {pageTitle}
              </h1>
              {bannerStyle2ColumnBased ? (
                <div>
                  <DescriptionButton
                    descriptionCls="lg:text-2xl mt-2 md:mt-4 w-full md:max-w-[408px] lg:max-w-[608px]"
                    buttonCls="mt-3 md:mt-10 !w-[135px] !h-11 md:!w-[167px] md:!h-[51px]"
                    description={description}
                  />
                </div>
              ) : (
                <div className="space-y-3 lg:space-y-6 flex-1">
                  <DescriptionButton
                    descriptionCls="lg:text-[18px]"
                    buttonCls="!w-[135px] !h-11 md:!w-[262px] md:!h-[52px]"
                    description={description}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="absolute right-0 top-0 z-0">
          <YooWifiLogoIcon className="relative -right-20 -top-4 md:-right-36 lg:-top-20 lg:-right-44 w-[245px] h-[223px] md:w-[500px] lg:w-full lg:h-full" />
          {/* <BreadcrumbIcon className='hidden lg:block h-full' />
                    <BreadcrumbSmallIcon className='block lg:hidden' /> */}
        </div>
      </div>

      {/* bottom part */}
      {isShowBannerBottom && (
        <div className="containerX ">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 sec_common_80 xl:!px-0">
            <h2 className="text-[28px] lg:text-6xl font-bold leading-[110%] lg:leading-[120%] text-black-900 w-full md:w-[392px]">
              {pageTitle}
            </h2>

            <div className="flex-1">
              <p className="text-sm lg:text-[18px] leading-[140%] text-black-600">
                {description}
              </p>

              <ul className="mt-2 lg:mt-6 mb-6 lg:mb-10 space-y-2 lg:space-y-4">
                {featureList.map((item, index) => (
                  <li className="flex gap-2" key={index}>
                    <CheckIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                    <span className="lg:text-black-700 text-black-600 leading-[140%] text-sm lg:text-[18px]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-center lg:justify-start">
                <Button
                  onClick={() => navigate(commercialRoutes.contact.path)}
                  className="rounded-lg lg:rounded-xl lg:px-[82.5px] lg:py-[16px] px-[33px] py-[7.5px] font-semibold !text-sm lg:!text-base"
                >
                  {t("buttonText.enquireNow")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(CorporateBanner);

// reusable components
const DescriptionButton = ({ descriptionCls, buttonCls, description }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <p className={cn("text-sm leading-[140%] text-white", descriptionCls)}>
        {description}
      </p>

      <Button
        variant="secondary"
        className={`"!text-base hover:!bg-secondary-400 rounded-xl !font-semibold" ${buttonCls}`}
        onClick={() => navigate("/contact")}
      >
        {t("buttonText.contactUs")}
      </Button>
    </>
  );
};
