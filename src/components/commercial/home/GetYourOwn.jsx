import { Button } from "@/components/ui/button";
import { commercialRoutes, getYourOwnData, images } from "@/services";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useDynamicImports from "@/hooks/useDynamicImports";
import { Suspense } from "react";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import useDynamicImages from "@/hooks/useDynamicImages";

const GetYourOwn = ({ className, ...props }) => {
  const navigate = useNavigate();
  const { t } = useTranslation(["translation", "english", "local"]);
  const path =
    "&/countries/{currentCountry}/src/components/commercial/home/GetYourOwn.jsx";
  const LazyLoadImage_Dynamic = useDynamicImports(path);
  const { currentCountry, nameSpace } = useUserLocationLanguage();
  //  current country is Japan
  const isTargetCountry = currentCountry === "jp";

  const items = t(`${nameSpace}:getYourOwn.features`, { returnObjects: true });
  return (
    <section
      className="sec_common_60 bg-white px-4 min-[1176px]:px-0"
      {...props}
    >
      <div className="containerX flex flex-col-reverse md:flex-row gap-6 md:gap-10 lg:gap-[60px]">
        {/* <div className="w-full md:w-1/2 min-[950px]:w-2/5 overflow-visible"> */}
        {/* <LazyLoadImage
           src={useDynamicImages("pocket-wifi", "black-pocket-wifi-en" )}
            alt="why choose us"
                title="why choose us"
            className="min-w-full min-h-full object-cover"
          /> */}
        <Suspense fallback={<div>Loading...</div>}>
          {LazyLoadImage_Dynamic ? <LazyLoadImage_Dynamic /> : null}
        </Suspense>
        {/* </div> */}

        <div className="w-full md:w-1/2 min-[950px]:w-3/5 flex flex-col justify-center items-start gap-4 md:gap-9">
          <h2 className="title text-center md:text-start w-full">
            {t(`${nameSpace}:getYourOwn.title`)}
          </h2>

          <div className="flex flex-col gap-2 md:gap-4">
            {getYourOwnData().features.map((feature, index, arr) => {
              // Hide the last item if not Japan
              // if (index === arr.length - 1 && !isTargetCountry) return null;
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex_center bg-[#FFF1F1] rounded-full h-8 w-8 md:h-11 md:w-11">
                    {feature.icon}
                  </div>
                  <p className="text-sm md:text-lg !leading-[1.4] text-black-700">
                    {t(`${nameSpace}:getYourOwn.features.${index}`)}
                  </p>
                </div>
              );
            })}
          </div>

          <Button
            variant="secondary"
            size="lg"
            className="h-11 md:h-[52px] !text-base"
            onClick={() =>
              isTargetCountry
                ? navigate(commercialRoutes.productInternetPackages.path)
                : navigate(commercialRoutes.pocketWifiHome.path)
            }
          >
            {t(`${nameSpace}:buttonText.buyNow`)}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GetYourOwn;
