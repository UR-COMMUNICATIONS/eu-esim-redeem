import { images } from "@/services";
import { LazyLoadImage } from "react-lazy-load-image-component";
function FooterLogo({}) {
  return (
    <>
      <LazyLoadImage
        src={images.yoowifiRedId}
        alt="logo"
        title="logo"
        // className="md:h-[95px] w-auto"
        className="h-12 md:h-14 w-auto aspect-auto"
      />
    </>
  );
}

export default FooterLogo;
