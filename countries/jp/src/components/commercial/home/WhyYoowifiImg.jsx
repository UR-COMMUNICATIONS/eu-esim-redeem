import { LazyLoadImage } from "react-lazy-load-image-component";
import { images } from "@/services";
function WhyYoowifiImg({}) {
  return (
    <div className="w-full md:w-1/2 overflow-visible">
      <LazyLoadImage
        src={images.pocketWifiSimJapan}
        height={2000}
        width={2000}
        alt="why choose us"
        title="why choose us"
        className="w-full h-[290px] object-contain md:h-[450px]"
      />
    </div>
  );
}

export default WhyYoowifiImg;
