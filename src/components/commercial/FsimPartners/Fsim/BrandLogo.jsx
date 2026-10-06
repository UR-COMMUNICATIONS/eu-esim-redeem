import useDynamicImages from "@/hooks/useDynamicImages";
import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";
import { fsimConfig } from "../fsimConfig";

// One hook call per logo, so it gets its own component rather than sitting in
// BrandLogo's .map(). Inline, the hook count depended on how many logos the
// brand had — and /:brand is a layout route, so switching brands re-renders
// this same instance with a different count (React error #300). Brands with no
// `logos` key bail out below having rendered none at all, which is the same bug
// from the other side.
const Logo = ({ logo }) => {
  const src = useDynamicImages("fsim-banner", logo.src);
  return (
    <div className={logo.className}>
      <img src={src} alt={logo.alt} className="w-full h-full object-contain" />
    </div>
  );
};

const BrandLogo = ({ className = "", brand: brandProp = null }) => {
  const { brand: brandParam } = useParams();
  const brand = brandProp || brandParam;
  const comp = brand?.toLowerCase();
  const config = fsimConfig[comp] || fsimConfig.default;
  const { logos } = config || { logos: [] };

  if (!logos || logos.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-wrap justify-center items-center gap-4 sm:gap-6 w-full",
        className,
      )}
    >
      {logos.map((logo, index) => (
        <Logo key={index} logo={logo} />
      ))}
    </div>
  );
};

export default BrandLogo;
