import { images } from "@/services";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const EsimFooter = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const twitter = useDynamicImages("others", "twitter");
    const facebook = useDynamicImages("others", "facebook");
    const instagram = useDynamicImages("others", "instagram");
    const youtube = useDynamicImages("others", "youtube");

    const socialIcons = [
        { src: facebook, alt: "Facebook" },
        { src: twitter, alt: "Twitter" },
        { src: instagram, alt: "Instagram" },
        { src: youtube, alt: "YouTube" },
    ];

    return (
        <div className="bg-[#244C75] text-center py-16">
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 mb-6">
                {socialIcons.map((icon, index) => (
                    <div key={index} className="w-8 h-8 sm:w-7 sm:h-7">
                        <img
                            src={icon.src}
                            alt={icon.alt}
                            className="w-full h-full object-contain"
                        />
                    </div>
                ))}
            </div>

            <p className="text-white mt-4 text-base sm:text-lg px-2 max-w-4xl mx-auto">
                {t(`airasia.footerText`)}
            </p>
        </div>
    );
};

export default EsimFooter;
