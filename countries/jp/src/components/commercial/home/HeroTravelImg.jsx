import { LazyLoadImage } from "react-lazy-load-image-component";
import { images } from "@/services";
import japanBnr from '@assets/images/banner/hero-travel/japan-bnr.webp'

function HeroTravelImg({ }) {
    return (
        <img
            src={japanBnr}
            alt=""
            className="w-full bg-center duration-300 xl:h-[500px]"
        />
    );
}

export default HeroTravelImg;