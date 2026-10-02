import { cn } from "@/lib/utils";
import { images } from "@/services";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useDynamicImages from "@/hooks/useDynamicImages";

const AastindoLogo = ({ className = "" }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
     const yoowifiHexagon = useDynamicImages("fsim-banner", "yoowifi-without-hexagon");

    const logos = [
        {
            src: yoowifiHexagon,
            alt: "Yoowifi",
            className: "w-[112px] h-[40px] sm:w-[140px] sm:h-[50px]",
        },
    ];

    return (
        <div
            className={cn(
                "flex flex-wrap justify-center items-center gap-4 w-full",
                className
            )}
        >
            {logos.map((logo, index) => (
                <div key={index} className={logo.className}>
                    <img
                        src={logo.src}
                        alt={logo.alt}
                        className="w-full h-full object-contain"
                    />
                </div>
            ))}
        </div>
    );
};

export default AastindoLogo;
