import useDynamicImages from "@/hooks/useDynamicImages";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { useTranslation } from "react-i18next";

const IMAGE_FOLDER = "TravelAgency";

const ORIGIN_COUNTRIES = ["ph", "id"];
const AGENCY_ORIGIN_COUNTRIES = ["ph", "id", "my"];

function QrImage({
  imageKey,
  countryOrigin,
  originCountries = ORIGIN_COUNTRIES,
}) {
  const baseKey = imageKey || "";
  const imageKeyWithOrigin =
    baseKey && originCountries.includes(countryOrigin)
      ? `${baseKey}-${countryOrigin}`
      : baseKey;
  const src = useDynamicImages(IMAGE_FOLDER, imageKeyWithOrigin);
  return <img src={src} alt="" className="w-full h-full object-contain" />;
}

const PhoneQrCard = ({
  title,
  qrImageKey,
  scanToJoin,
  joinWhatsApp,
  countryOrigin,
  originCountries,
}) => {
  return (
    <div className="flex flex-col items-center w-full max-w-[340px]">
      {/* Phone Wrapper & Bottom Line */}
      <div className="relative flex flex-col items-center w-full mb-4">
        {/* Phone Outline */}
        {/* <div className="border-[1.5px] border-[#D93833] rounded-t-[2.5rem] border-b-0 w-[240px] pt-10 pb-6 flex flex-col items-center relative z-10 bg-white"> */}
        {/* Dynamic Island / Notch */}
        {/* <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[70px] h-[22px] bg-[#2A2A2A] rounded-full" /> */}

        {/* Top Text */}
        <span className="text-xs text-gray-500 mb-6 font-medium">
          {scanToJoin}
        </span>

        {/* QR Code Container with Scanning Corners */}
        <div className="relative p-3 w-[150px] h-[150px]">
          {/* Top Left Corner */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t-[3px] border-l-[3px] border-[#D93833]" />
          {/* Top Right Corner */}
          <div className="absolute top-0 right-0 w-5 h-5 border-t-[3px] border-r-[3px] border-[#D93833]" />
          {/* Bottom Left Corner */}
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-[3px] border-l-[3px] border-[#D93833]" />
          {/* Bottom Right Corner */}
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-[3px] border-r-[3px] border-[#D93833]" />

          <QrImage
            imageKey={qrImageKey}
            countryOrigin={countryOrigin}
            originCountries={originCountries}
          />
        </div>
        {/* </div> */}

        {/* Extended Horizontal Red Line */}
        {/* <div className="w-full h-[1.5px] bg-[#D93833] absolute bottom-0 z-0" /> */}
      </div>

      {/* Bottom Labels */}
      <span className="text-gray-500 text-sm mb-1">{joinWhatsApp}</span>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    </div>
  );
};

const FreeEsimPromo = () => {
  const { t } = useTranslation();
  const { currentCountry } = useUserLocationLanguage();
  const allPromoData =
    t("travelAgency.freeEsimPromo.items", { returnObjects: true }) || [];
  const promoData =
    currentCountry === "my"
      ? allPromoData.filter((item) => item.qrImage === "qr-code-agency")
      : allPromoData;

  const heading = t("travelAgency.freeEsimPromo.heading");
  const subtitle = t("travelAgency.freeEsimPromo.subtitle");
  const scanToJoin = t("travelAgency.freeEsimPromo.scanToJoin");
  const joinWhatsApp = t("travelAgency.freeEsimPromo.joinWhatsApp");
  return (
    <section className="bg-white py-16 md:py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-[56px] font-bold text-gray-900 mb-4 tracking-tight">
            {heading}
          </h2>
          <p className="text-gray-500 text-base md:text-lg">{subtitle}</p>
        </div>

        {/* QR Cards Flex Container */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-24 lg:gap-32">
          {promoData.map((item, index) => (
            <PhoneQrCard
              key={item.title || index}
              title={item.title}
              qrImageKey={item.qrImage}
              countryOrigin={currentCountry}
              originCountries={
                item.qrImage === "qr-code-agency"
                  ? AGENCY_ORIGIN_COUNTRIES
                  : ORIGIN_COUNTRIES
              }
              scanToJoin={scanToJoin}
              joinWhatsApp={joinWhatsApp}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreeEsimPromo;
