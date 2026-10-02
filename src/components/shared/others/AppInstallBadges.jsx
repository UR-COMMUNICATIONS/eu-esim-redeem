import useDynamicImages from "@/hooks/useDynamicImages";
import { cn } from "@/lib/utils";

/**
 * AppInstallBadges
 *
 * Renders the "Download Yoowifi app" label + two pill-shaped store buttons.
 *
 * Props:
 *  label        – string shown above the buttons (optional)
 *  labelClass   – extra Tailwind classes for the label
 *  className    – extra Tailwind classes for the wrapper
 */
const AppInstallBadges = ({ label, labelClass, className }) => {
  const appleLogo = useDynamicImages("landing-page", "apple-logo", "webp");
  const googlePlayLogo = useDynamicImages(
    "landing-page",
    "google-play-logo",
    "webp",
  );

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {label && (
        <p
          className={cn(
            "font-['DMSans'] text-sm md:text-base font-semibold text-white/80",
            labelClass,
          )}
        >
          {label}
        </p>
      )}

      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        {/* App Store */}
        <a
          href="https://apps.apple.com/sg/app/id1632273383"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-3 rounded-full bg-white",
            "px-5 py-3 w-[176px] h-[64px]",
            "hover:opacity-90 transition-opacity",
          )}
        >
          <img
            src={appleLogo}
            alt=""
            aria-hidden
            className="w-7 h-7 object-contain flex-shrink-0"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-['DMSans'] text-[10px] text-[#191919]/70 font-medium">
              Download on the
            </span>
            <span className="font-['DMSans'] text-[15px] text-[#191919] font-bold">
              App Store
            </span>
          </div>
        </a>

        {/* Google Play */}
        <a
          href="https://play.google.com/store/apps/details?id=com.urwifi.com"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-3 rounded-full bg-white",
            "px-5 py-3 w-[176px] h-[64px]",
            "hover:opacity-90 transition-opacity",
          )}
        >
          <img
            src={googlePlayLogo}
            alt=""
            aria-hidden
            className="w-7 h-7 object-contain flex-shrink-0"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-['DMSans'] text-[10px] text-[#191919]/70 font-medium">
              Get it On
            </span>
            <span className="font-['DMSans'] text-[15px] text-[#191919] font-bold">
              Google Play
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default AppInstallBadges;
