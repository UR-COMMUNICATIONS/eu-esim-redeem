import { useDisApi } from "@/general";
import { planCoverage } from "@/general/common.funcitons";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";
import { useEffect, useState, Suspense } from "react";
import { useSelector } from "react-redux";
import useDynamicImports from "@/hooks/useDynamicImports";

function PackageCard({ item = {}, index, hideDetails, wrapperClass = "", ...props }) {
  const { cart } = useSelector((state) => state.cart);
  // const [planCountries, setPlanCountries] = useState([]);

  const { t } = useTranslation();
  let rate = item?.rate
  let fromRate = item?.rates?.[0]?.rate?.toFixed(2) || item.rate

  // const isJapanCountry = cardData.length === 1;
  const currentLanguage = sessionStorage.getItem('i18next')?.toUpperCase();
  const currentCountry = cart.userCountry?.country?.toUpperCase();
  const isJapanCountry = (currentCountry === 'JP' && (currentLanguage === 'EN' || currentLanguage === 'JP'))

  let planAttbs = {
    planName: item.planName,
    nameAttributes: item.nameAttributes,
    description: item.description
  }

  if (currentLanguage !== 'EN') {
    planAttbs["planName"] = item?.trPlanName || item.planName
    planAttbs["nameAttributes"] = item?.trNameAttributes || item.nameAttributes
    planAttbs["description"] = item?.trDescription || item.description
  }

  useEffect(() => {
    // console.log('inside alskaslksalsak', cart);

    // getPlanCountries({ planCode: item.planCode })
  }, [cart.userLanguage]);

  // const getPlanCountries = useDisApi({
  //   apiCall: 'planCountries',
  //   setCallBack: (res) => setPlanCountries(res?.countries || [])
  // });

  // useEffect(() => {
  //   getPlanCountries({ planCode: item.planCode })
  // }, []);
  const path = "&/countries/{currentCountry}/src/components/shared/cards/PackageCardImg.jsx";
  const LazyLoadImage_Dynamic = useDynamicImports(path);
  return (
    <>
      <div
        className={cn(
          "px-4 py-5 rounded-xl border border-neutral-400 gap-4 sm:gap-5",
          wrapperClass
        )}
        {...props}
      >
        <div className='flex flex-col md:flex-row items-start'>
          <div className="w-14 aspect-square bg-main-50 p-1 rounded-lg flex items-center  justify-center mr-4">
            {/* <img
              src={item?.image}
              alt="icon"
              className="w-full h-full object-contain rounded"
            /> */}
            {/* <Suspense fallback={<div>Loading...</div>}> */}
            <Suspense fallback={<div className="text-center text-xl">Loading...</div>}>
              {LazyLoadImage_Dynamic ? <LazyLoadImage_Dynamic image={item?.image} deviceType={item.deviceType} /> : null}
            </Suspense>
          </div>
          <div className="w-full flex items-end gap-2">
            <div className="w-full">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black-700" style={{ whiteSpace: 'pre-line' }}>
                {planAttbs.planName}
              </h3>

              <p className="text-sm sm:text-base text-black-700" style={{ whiteSpace: 'pre-line' }}>
                {planAttbs.nameAttributes}
              </p>
            </div>
            <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-black-700 whitespace-nowrap">
              {item?.rate <= 0 || item?.planType?.toUpperCase() === 'CN' ? null :
                // item.currency + ' ' + item.rate
                `${item.currency} ${item.rate}`
              }
            </h4>
            {/* <div>
              {item?.planType == 'CN' || item?.deviceType == 'E' ?
                <p style={{ color: 'black' }} className='text-[15px] font-normal'>From</p> : null}
              < h4 className="text-lg sm:text-xl md:text-2xl font-bold text-black-700 whitespace-nowrap">
                {item.currency} {item?.planType != 'CN' || ['S', 'E'].includes(item?.deviceType) ? rate : fromRate}
              </h4>
            </div> */}
          </div>
        </div>
        {!hideDetails && item.planCode == cart?.package?.planCode &&
          <div className="flex flex-col gap-1 sm:gap-2 md:gap-4 mt-6 sm:mt-8 md:mt-8 w-full" >
            <Accordion type="single" collapsible="true" defaultValue={null}>
              <AccordionItem value={`item-1`} className="">
                <AccordionTrigger className="!text-sm md:!text-base !font-bold text-black-700">
                  {t("extraText.countryCoverage")}
                </AccordionTrigger>
                <AccordionContent className="!text-xs md:!text-base !leading-[120%] md:!leading-[150%] text-black-700">
                  {cart?.planCountries?.length ? (
                    <span>
                      {/* {planCoverage(props.planCountries)} */}
                      {planCoverage(cart.planCountries)}
                    </span>
                  ) : (
                    <span>{t("extraText.selectPackage")}</span>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible="true" defaultValue={null}>
              <AccordionItem value={`item-1`} className="">
                <AccordionTrigger className="!text-sm md:!text-base !font-bold text-black-700">
                  {t("extraText.information")}
                </AccordionTrigger>
                <AccordionContent className="!text-xs md:!text-base !leading-[120%] md:!leading-[150%] text-black-700" style={{ whiteSpace: 'pre-line' }}>
                  {planAttbs.description ? (
                    <span>{planAttbs.description}</span>
                  ) : (
                    <span>{t("extraText.selectPackage")}</span>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        }

      </div >
    </>
  );
}

export default PackageCard;
