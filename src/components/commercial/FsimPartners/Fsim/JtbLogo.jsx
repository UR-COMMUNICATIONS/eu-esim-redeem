import { cn } from "@/lib/utils";
import { images } from "@/services";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useDynamicImages from "@/hooks/useDynamicImages";

const JtbLogo = ({ className = "" }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const jtpLogo = useDynamicImages("fsim-banner", "jtp-logo");
    const close = useDynamicImages("fsim-banner", "close");
    const yoowifiHexagon = useDynamicImages("fsim-banner", "yoowifi-without-hexagon");

    const logos = [
        {
            src: jtpLogo,
            alt: "JTP",
            className: "w-[90px] h-[50px] sm:w-[110px] sm:h-[60px]",
        },
        {
            src: close,
            alt: "Close Icon",
            className: "w-[40px] h-[50px] sm:w-[55px] sm:h-[65px]",
        },
        {
            src: yoowifiHexagon,
            alt: "Yoowifi",
            className: "w-[140px] h-[55px] sm:w-[170px] sm:h-[70px]",
        },
    ];

    return (
        <div
            className={cn(
                "flex flex-wrap justify-center items-center gap-6 w-full",
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

export default JtbLogo;
