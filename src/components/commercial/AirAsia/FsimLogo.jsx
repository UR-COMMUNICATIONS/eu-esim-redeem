import { cn } from "@/lib/utils";
import { images } from "@/services";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useDynamicImages from "@/hooks/useDynamicImages";

const FsimLogo = ({ className = "" }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const airAsiaLogo = useDynamicImages("fsim-banner", "air-asia-logo");
    const close = useDynamicImages("fsim-banner", "close");
    const yoowifiHexagon = useDynamicImages("fsim-banner", "yoowifi-without-hexagon");

    const logos = [
        {
            src: airAsiaLogo,
            alt: "JTP",
            className: "sm:w-[50px] sm:h-[50px] w-[70px] h-[50px]",
        },
        {
            src: close,
            alt: "Close Icon",
            className: "w-[20px] h-[20px] sm:w-[40px] sm:h-[40px]",
        },
        {
            src: yoowifiHexagon,
            alt: "Yoowifi",
            className: "w-[112px] h-[40px] sm:w-[140px] sm:h-[50px]",
        },
    ];

    return (
        <div
            className={cn(
                "flex flex-wrap justify-center items-center gap-4 sm:gap-6 w-full",
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

export default FsimLogo;
