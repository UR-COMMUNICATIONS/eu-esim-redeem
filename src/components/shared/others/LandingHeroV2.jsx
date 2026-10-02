import useDynamicImages from "@/hooks/useDynamicImages";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import AppInstallBadges from "./AppInstallBadges";

const LandingHeroV2 = ({
  pageKey,
  title,
  subtitle,
  image,
  className,
  backgroundColor,
  reverse = false,
  /** When true: image is full background, text stays on left over the image. Default: false (image on right). */
  imageAsBackground = false,
  /** When true (with imageAsBackground): show App Store / Google Play badges under the subtitle (same assets as DownloadYoowifi). */
  showAppInstall = false,
  /** Optional overlay on top of the background image (Tailwind classes). Default: bg-black/40 */
  imageOverlayClassName,
  /**
   * When true with imageAsBackground: title, subtitle, and app badges align to the right; overlay defaults to a
   * left-to-right fade so the photo stays visible on the left. Umrah/Hajj and other pages stay left-aligned by default.
   */
  imageBackgroundContentOnRight = false,
  /**
   * One full-width banner with solid `backgroundColor` on the whole section; layout is text left + contained image right (no separate panel colors).
   * Use with imageAsBackground={false}.
   */
  splitHero = false,
  /** Optional extra classes on the right column in splitHero (e.g. subtle tint). Default: none — same bg as the banner. */
  splitHeroRightClassName,
  /**
   * Optional image URL (e.g. static import) shown behind the splitHero main image, same scale and bottom-right alignment.
   */
  splitHeroDecorSrc,
  hideImage = false,
  textCenter = false,
  bottomSection,
}) => {
  const { t } = useTranslation();

  const heroTitle = title || t(`${pageKey}.heroTitle`) || "";
  const heroSubtitle = subtitle || t(`${pageKey}.heroSubtitle`) || "";
  const heroImageName = t(`${pageKey}.heroImage`);
  const imageName = heroImageName?.replace(/\.\w+$/, "");
  const imageExt = heroImageName?.split(".").pop() || "webp";
  const dynamicImage = useDynamicImages("landing-page", imageName, imageExt);
  const heroSrc = image || dynamicImage;

  const heroImageMobileName = t(`${pageKey}.heroImageMobile`, {
    defaultValue: "",
  });
  const mobileImageName = heroImageMobileName?.replace(/\.\w+$/, "");
  const mobileImageExt = heroImageMobileName?.split(".").pop() || "webp";
  const dynamicMobileImage = useDynamicImages(
    "landing-page",
    mobileImageName || "",
    mobileImageExt,
  );
  const heroMobileSrc = mobileImageName ? dynamicMobileImage : null;

  const heroAppInstallLabel = t(`${pageKey}.heroAppInstallLabel`, {
    defaultValue: t("downloadYooWifi.downloadText"),
  });

  const lowerBg = backgroundColor?.toLowerCase() || "";
  const isGradientBg = lowerBg.includes("gradient");
  const isDarkBg =
    isGradientBg ||
    lowerBg === "#000000" ||
    lowerBg === "#000" ||
    lowerBg === "#d81f22" ||
    lowerBg === "#ff4d4d" ||
    lowerBg === "#54a5d5" ||
    imageAsBackground;

  const splitLeftLightText = splitHero;
  const textClasses = splitLeftLightText
    ? "text-white"
    : isDarkBg
      ? "text-white"
      : "text-[#191919]";
  const subtitleClasses = splitLeftLightText
    ? "text-white/90"
    : isDarkBg
      ? "text-white/80"
      : "text-[#191919]/70";

  const textContainerClasses = cn(
    "z-10 flex flex-col justify-center text-left min-h-0",
    pageKey === "travelAgency" ? "max-w-2xl" : "max-w-xl",
    !imageBackgroundContentOnRight && "flex-1",
    textCenter && "items-center text-center",
  );

  const imageObjectPositionClass = imageBackgroundContentOnRight
    ? "object-left"
    : "object-center";

  const defaultImageOverlay = imageBackgroundContentOnRight
    ? "bg-gradient-to-l from-black/80 via-black/25 to-transparent"
    : "bg-black/40";

  const heroHeightClasses = bottomSection
    ? "min-h-[520px] sm:min-h-[560px] md:min-h-[620px] lg:min-h-[680px]"
    : showAppInstall
      ? "h-[420px] sm:h-[460px] md:h-[520px] lg:h-[580px]"
      : "h-[360px] sm:h-[400px] md:h-[460px] lg:h-[520px]";

  const splitHeroMainImgClass =
    "h-auto max-h-full w-auto max-w-[110%] object-contain object-bottom sm:max-w-[115%] lg:max-w-[min(118%,780px)] xl:max-w-[min(122%,860px)]";

  return (
    <section
      className={cn(
        "relative w-full flex flex-col lg:flex-row items-stretch",
        splitHero
          ? "overflow-x-clip overflow-y-visible gap-0 px-6 py-0 md:px-16 lg:px-24 lg:flex-row"
          : hideImage && !imageAsBackground
            ? bottomSection
              ? "overflow-hidden justify-center gap-x-6 gap-y-0 lg:gap-x-12"
              : "overflow-hidden justify-center gap-x-6 gap-y-0 lg:gap-x-12 px-6 md:px-16 lg:px-24"
            : bottomSection
              ? "overflow-hidden justify-between gap-x-6 gap-y-0 lg:gap-x-12"
              : "overflow-hidden justify-between gap-x-6 gap-y-0 lg:gap-x-12 px-6 md:px-16 lg:px-24",
        heroHeightClasses,
        reverse && !splitHero && "lg:flex-row-reverse",
        !splitHero && !backgroundColor && !imageAsBackground && "bg-[#FFD646]",
        !splitHero && imageAsBackground && "flex-row",
        className,
      )}
      style={
        splitHero
          ? backgroundColor
            ? isGradientBg
              ? { background: backgroundColor }
              : { backgroundColor }
            : { backgroundColor: "#54A5D5" }
          : backgroundColor
            ? isGradientBg
              ? { background: backgroundColor }
              : { backgroundColor }
            : undefined
      }
    >
      {splitHero ? (
        <div
          className={cn(
            "relative z-10 flex h-full min-h-0 w-full flex-1 flex-col justify-between gap-6 py-6 lg:flex-row lg:items-stretch lg:justify-between lg:gap-x-6 lg:gap-y-0 lg:py-0 xl:gap-x-10",
            reverse && "lg:flex-row-reverse",
          )}
        >
          <div
            className={cn(
              "flex h-full min-h-0 w-full shrink-0 flex-col justify-center self-stretch text-left lg:min-h-0 lg:flex-[0.92] lg:py-12 lg:pr-2 xl:pr-4",
              textCenter && "items-center text-center",
            )}
          >
            <div
              className={cn(
                "w-full max-w-xl",
                pageKey === "travelAgency" && "max-w-2xl",
              )}
            >
              {heroTitle && (
                <h1
                  className={cn(
                    "font-['SansPro'] text-4xl font-black uppercase leading-[1.1] tracking-tight md:text-5xl lg:text-[56px] xl:text-[64px]",
                    textClasses,
                  )}
                >
                  {heroTitle}
                </h1>
              )}
              {heroSubtitle && (
                <p
                  className={cn(
                    "font-['DMSans'] mt-4 max-w-md text-base font-medium leading-relaxed md:text-lg lg:text-xl",
                    subtitleClasses,
                  )}
                >
                  {heroSubtitle}
                </p>
              )}
              {showAppInstall && (
                <AppInstallBadges
                  label={heroAppInstallLabel}
                  labelClass={subtitleClasses}
                  className="mt-6 md:mt-8"
                />
              )}
            </div>
          </div>
          {!hideImage && (
            <div
              className={cn(
                "flex h-full min-h-0 w-full flex-1 flex-col self-stretch lg:min-h-0 lg:flex-[1.22] lg:pl-2 xl:pl-4",
                splitHeroRightClassName,
              )}
            >
              {/* Fills banner column so images can use full cell (same stretch as outer split hero row) */}
              <div className="flex h-full min-h-0 w-full flex-1 flex-col items-stretch justify-end lg:items-end">
                <div className="grid h-full w-full min-h-0 max-h-full grid-cols-1 grid-rows-1 items-end justify-items-end">
                  {splitHeroDecorSrc ? (
                    <img
                      src={splitHeroDecorSrc}
                      alt=""
                      aria-hidden
                      className={cn(
                        "pointer-events-none col-start-1 row-start-1 z-0 opacity-[0.2] -translate-x-5 sm:-translate-x-7 lg:-translate-x-10",
                        splitHeroMainImgClass,
                      )}
                    />
                  ) : null}
                  <picture className="relative z-10 col-start-1 row-start-1">
                    {heroMobileSrc && (
                      <source
                        media="(max-width: 767px)"
                        srcSet={heroMobileSrc}
                      />
                    )}
                    <img
                      src={heroSrc}
                      alt={heroTitle}
                      className={cn(
                        "transition-transform duration-500 hover:scale-[1.02]",
                        splitHeroMainImgClass,
                      )}
                    />
                  </picture>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : imageAsBackground ? (
        <>
          {!hideImage && (
            <>
              <picture>
                {heroMobileSrc && (
                  <source media="(max-width: 767px)" srcSet={heroMobileSrc} />
                )}
                <img
                  src={heroSrc}
                  alt=""
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover",
                    imageObjectPositionClass,
                  )}
                  aria-hidden
                />
              </picture>
              <div
                className={cn(
                  "absolute inset-0",
                  imageOverlayClassName || defaultImageOverlay,
                )}
                aria-hidden
              />
            </>
          )}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
          </div>
          <div
            className={cn(
              "relative z-10 flex w-full min-h-0",
              imageBackgroundContentOnRight
                ? "flex-1 items-center justify-end"
                : "flex-1 items-center justify-start",
            )}
          >
            <div
              className={cn(
                textContainerClasses,
                bottomSection &&
                  "px-6 md:px-16 lg:px-24 pb-[260px] md:pb-[300px] lg:pb-[340px]",
              )}
            >
              {heroTitle && (
                <h1
                  className={cn(
                    "font-['SansPro'] text-4xl md:text-5xl lg:text-[72px] leading-[1.1] font-black mb-6 uppercase tracking-tight",
                    textClasses,
                  )}
                >
                  {heroTitle}
                </h1>
              )}
              {heroSubtitle && (
                <p
                  className={cn(
                    "font-['DMSans'] text-base md:text-lg lg:text-xl font-medium leading-relaxed max-w-md",
                    subtitleClasses,
                  )}
                >
                  {heroSubtitle}
                </p>
              )}
              {showAppInstall && (
                <AppInstallBadges
                  label={heroAppInstallLabel}
                  labelClass={subtitleClasses}
                  className="mt-6 md:mt-8"
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
          </div>
          <div
            className={cn(
              textContainerClasses,
              bottomSection &&
                "px-6 md:px-16 lg:px-24 pb-[260px] md:pb-[300px] lg:pb-[340px]",
            )}
          >
            {heroTitle && (
              <h1
                className={cn(
                  "font-['SansPro'] text-4xl md:text-5xl lg:text-[72px] leading-[1.1] font-black mb-6 uppercase tracking-tight",
                  textClasses,
                )}
              >
                {heroTitle}
              </h1>
            )}
            {heroSubtitle && (
              <p
                className={cn(
                  "font-['DMSans'] text-base md:text-lg lg:text-xl font-medium leading-relaxed max-w-md",
                  subtitleClasses,
                )}
              >
                {heroSubtitle}
              </p>
            )}
            {showAppInstall && (
              <AppInstallBadges
                label={heroAppInstallLabel}
                labelClass={subtitleClasses}
                className="mt-6 md:mt-8"
              />
            )}
          </div>
          {!hideImage && (
            <div
              className={cn(
                "z-10 flex-1 lg:flex-initial w-full min-h-0 flex flex-col justify-end",
                pageKey === "moneyBackGuarantee" ? "lg:w-[60%]" : "lg:w-1/2",
              )}
            >
              <picture className="flex-1 min-h-0 flex flex-col justify-end">
                {heroMobileSrc && (
                  <source media="(max-width: 767px)" srcSet={heroMobileSrc} />
                )}
                <img
                  src={heroSrc}
                  alt={heroTitle}
                  className={cn(
                    "flex-1 min-h-0 w-auto max-w-full object-contain object-bottom transition-transform duration-500 hover:scale-105",
                    pageKey === "home" ? "translate-y-4" : "",
                    pageKey === "moneyBackGuarantee"
                      ? "scale-110 origin-bottom"
                      : "",
                  )}
                />
              </picture>
            </div>
          )}
        </>
      )}
      {bottomSection && (
        <div className="absolute bottom-0 left-0 w-full z-20">
          {bottomSection}
        </div>
      )}
    </section>
  );
};

export default LandingHeroV2;
