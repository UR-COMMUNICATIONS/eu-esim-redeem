import { images } from "@/services";
import { useSelector } from "react-redux";

function PackageCardImg({ image, deviceType }) {
  const { cart } = useSelector((state) => state.cart);

  const currentLanguage = sessionStorage.getItem("i18next")?.toUpperCase();
  const currentCountry = cart?.userCountry?.country?.toUpperCase();

  const isJapanCountry =
    currentCountry === "JP" && (currentLanguage === "EN" || currentLanguage === "JP");

  // Only override the image for devices (D) when country is Japan
  const finalImage = deviceType === "D" && isJapanCountry ? images.japanDeviceBlue : image;

  return (
    <img
      src={finalImage}
      alt="icon"
      className="w-full h-full object-contain rounded"
    />
  );
}

export default PackageCardImg;
