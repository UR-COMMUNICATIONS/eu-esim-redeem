import { LazyLoadImage } from "react-lazy-load-image-component";
import { images } from "@/services";
function SimESimImg({ type }) {
    const src = type === "S" ? images.pocketWifiSimRed2 : images.japanDeviceBlue;
    return (
        <LazyLoadImage
            src={src}
            height={1000}
            width={1000}
            className="absolute_center object-contain max-w-[260px] max-h-[260px] sm:max-w-[320px] sm:max-h-[320px] md:max-w-[460px] md:max-h-[460px]"
            alt={type === "S" ? "Pocket Wifi SIM" : "Device Image"}
        />

    );
}

export default SimESimImg;