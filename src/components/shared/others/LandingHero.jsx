import useDynamicImages from "@/hooks/useDynamicImages";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const LandingHero = ({
  pageKey,
  title,
  subtitle,
  image,
  className,
  backgroundColor,
  backgroundOpacity = 0.5,
  showText = true,
  showGradient = true,
  showSubtitle = false,
}) => {
  const { t } = useTranslation();

  const heroTitle = title || t(`${pageKey}.heroTitle`) || "";
  const heroSubtitle = subtitle || t(`${pageKey}.heroSubtitle`) || "";
  const heroImageName = t(`${pageKey}.heroImage`);
  const imageName = heroImageName?.replace(/\.\w+$/, "");
  const imageExt = heroImageName?.split(".").pop() || "webp";
  const dynamicImage = useDynamicImages("landing-page", imageName, imageExt);
  const heroSrc = image || dynamicImage;

  return (
    <section
      className={cn(
        "relative w-full h-[360px] sm:h-[400px] md:h-[460px] lg:h-[520px] flex items-center justify-center overflow-hidden",
        className,
      )}
    >
      <img
        src={heroSrc}
        alt=""
        className="absolute left-1/2 top-1/2 w-[100%] h-[100%] -translate-x-1/2 -translate-y-1/2 object-cover"
      />
      {showGradient && (
        <div
          className="absolute inset-0"
          style={
            backgroundColor
              ? { backgroundColor, opacity: backgroundOpacity }
              : {
                  background:
                    "linear-gradient(0deg, rgba(0, 0, 0, 0.35) 20.06%, rgba(0, 0, 0, 0.6) 113.18%)",
                }
          }
        />
      )}

      {showText && (
        <div className="relative z-10 text-center px-4 py-12 md:py-20 max-w-5xl mx-auto">
          {heroTitle && (
            <h1 className="font-['SansPro'] text-3xl md:text-6xl lg:text-[80px] lg:leading-[90px] font-black text-white mb-4 uppercase tracking-[-0.03em] drop-shadow-lg text-center">
              {heroTitle.split("\n").map((line, i) => (
                <span
                  key={i}
                  className={cn("block", i === 1 && "whitespace-nowrap")}
                >
                  {line}
                </span>
              ))}
            </h1>
          )}
          {showSubtitle && heroSubtitle && (
            <p className="font-['DMSans'] text-base md:text-lg text-white/90 font-normal max-w-2xl mx-auto leading-[140%] drop-shadow">
              {heroSubtitle}
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default LandingHero;
