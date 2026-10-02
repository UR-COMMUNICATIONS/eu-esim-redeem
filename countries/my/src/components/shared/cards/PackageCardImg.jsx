import { LazyLoadImage } from "react-lazy-load-image-component";
import { images } from "@/services";
function PackageCardImg({image }) {
  return (
      <img
        src={image}
        alt="icon"
        className="w-full h-full object-contain rounded"
      />
  );
}

export default PackageCardImg;  