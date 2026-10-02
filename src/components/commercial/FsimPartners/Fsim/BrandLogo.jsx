import useDynamicImages from "@/hooks/useDynamicImages";
import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";
import { fsimConfig } from "../fsimConfig";

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
        <div key={index} className={logo.className}>
          <img
            src={useDynamicImages("fsim-banner", logo.src)}
            alt={logo.alt}
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default BrandLogo;
