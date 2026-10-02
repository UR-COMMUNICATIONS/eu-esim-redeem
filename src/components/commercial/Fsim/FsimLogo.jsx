import { cn } from "@/lib/utils";
import { images } from "@/services";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useDynamicImages from "@/hooks/useDynamicImages";

const FsimLogo = ({ className = "" }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const jtpLogo = useDynamicImages("fsim-banner", "jtp-logo");
    const close = useDynamicImages("fsim-banner", "close");
    const yoowifiHexagon = useDynamicImages("fsim-banner", "yoowifi-without-hexagon");

    const logos = [
        {
            src: jtpLogo,
            alt: "JTP",
            className: "w-[70px] h-[40px] sm:w-[85px] sm:h-[48px]",
        },
        {
            src: close,
            alt: "Close Icon",
            className: "w-[30px] h-[40px] sm:w-[40px] sm:h-[50px]",
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
                "flex flex-wrap justify-center items-center gap-4 w-full lg:mb-0 md:mb-6 mb-4",
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
