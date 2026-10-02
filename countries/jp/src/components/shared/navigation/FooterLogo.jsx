import useDynamicImages from "@/hooks/useDynamicImages";
import { LazyLoadImage } from "react-lazy-load-image-component";
function FooterLogo({}) {
  return (
    <>
      <LazyLoadImage
        src={useDynamicImages("others", "red-logo")}
        alt="logo"
        title="logo"
        className="h-[71px] w-auto"
      />
    </>
  );
}

export default FooterLogo;
