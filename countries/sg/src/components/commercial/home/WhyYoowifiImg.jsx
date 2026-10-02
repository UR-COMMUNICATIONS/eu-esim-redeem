import useDynamicImages from "@/hooks/useDynamicImages";
import { LazyLoadImage } from "react-lazy-load-image-component";
function WhyYoowifiImg({}) {
  return (
    <div className="w-full md:w-1/2 min-[950px]:w-2/5 overflow-visible">
      <LazyLoadImage
        src={useDynamicImages("others", "pocket-wifi-sim-japan")}
        height={2000}
        width={2000}
        alt="why choose us"
        title="why choose us"
        className="min-w-full min-h-full object-contain"
      />
    </div>
  );
}

export default WhyYoowifiImg;
