import { images } from "@/services";
import { LazyLoadImage } from "react-lazy-load-image-component";
function GetYourOwn({}) {
  return (
    <>
      <div className="w-full md:w-1/2 min-[950px]:w-2/5 overflow-visible">
        <LazyLoadImage
          src={images.japanDeviceBlue}
          height={2000}
          width={2000}
          alt="why choose us"
          title="why choose us"
          // className="min-w-full min-h-full object-cover"
          className="w-full h-[290px] object-contain md:min-h-full"
        />
      </div>
    </>
  );
}

export default GetYourOwn;
