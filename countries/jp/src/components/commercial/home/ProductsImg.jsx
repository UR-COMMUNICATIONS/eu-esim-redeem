import { LazyLoadImage } from "react-lazy-load-image-component";
import { images } from "@/services";
function ProductsImg({ productImages, selectedCard }) {
  const src = productImages[selectedCard];

  return (
    <div className="w-full md:w-1/2 min-[950px]:w-[45%] overflow-visible relative h-[328px] md:h-auto bottom-5">
      <LazyLoadImage
        src={images.japanDeviceBlue}
        height={250}
        width={250}
        alt="why choose us"
        title="why choose us"
        className="absolute_center w-auto h-full md:h-[400px] max-h-[431px] "
      />
    </div>
  );
}

export default ProductsImg;
