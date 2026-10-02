import { cn } from "@/lib/utils";
import useDynamicImages from "@/hooks/useDynamicImages";
import { fsimConfig } from "@/components/commercial/FsimPartners/fsimConfig";

const PhtaLogo = ({ className = "" }) => {
  const { logos } = fsimConfig["phta"] || { logos: [] };

  return (
    <div
      className={cn(
        "flex flex-wrap justify-center items-center gap-4 w-full lg:mb-0 md:mb-6 mb-4",
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

export default PhtaLogo;
