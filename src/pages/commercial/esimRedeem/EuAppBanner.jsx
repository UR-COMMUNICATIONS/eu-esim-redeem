import phoneImage from "@/assets/images/esim-redeem/Phone.webp";
import qrImage from "@/assets/images/esim-redeem/EUApp-qr.webp";
import logoImage from "@/assets/images/esim-redeem/Logo.webp";
import googlePlayBadge from "@/assets/images/esim-redeem/Gplay.webp";
import appStoreBadge from "@/assets/images/esim-redeem/appstore.webp";

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=yoowifi.wifieu.com";
const APP_STORE_URL = "https://apps.apple.com/sg/app/id1632273383";

function StoreBadges({ className = "" }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download EU Wifi on Google Play"
        className="block transition-opacity hover:opacity-85 focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        <img
          src={googlePlayBadge}
          alt="Get it on Google Play"
          className="block h-auto w-full"
        />
      </a>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download EU Wifi on the App Store"
        className="block transition-opacity hover:opacity-85 focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        <img
          src={appStoreBadge}
          alt="Download on the App Store"
          className="block h-auto w-full"
        />
      </a>
    </div>
  );
}

/**
 * Download footer shared by both EU eSIM redemption screens.
 *
 * The desktop composition follows the supplied 4320 × 1500 artwork. On
 * smaller screens it becomes a stacked layout so the copy, QR code and store
 * links remain readable and usable.
 */
export default function EuAppBanner({ alt = "Download the EU Wifi App" }) {
  return (
    <footer
      aria-label={alt}
      className="relative isolate w-full overflow-hidden bg-[#0e3b79] text-white"
    >
      {/* Desktop: preserve the proportions and placements of the reference. */}
      <div className="relative hidden aspect-[72/25] w-full lg:block">
        <div className="absolute left-[4.9%] top-[6.3%] z-10 flex w-[56%] flex-col items-start">
          <p className="text-[1.75vw] font-normal leading-none text-[#f5a13b]">
            Download the
          </p>

          <img
            src={logoImage}
            alt="EU Wifi App"
            className="mt-[1.6vw] h-auto w-[29vw]"
          />

          <p className="mt-[1.65vw] text-[1.8vw] font-normal leading-[1.35] tracking-[0.005em] text-white">
            Advanced features for an effortless digital experience
            <br />
            anytime, anywhere!
          </p>

          <div className="mt-[2vw] flex items-start gap-[1.25vw]">
            <StoreBadges className="w-[14vw] gap-[0.7vw]" />
            <img
              src={qrImage}
              alt="QR code to download the EU Wifi App"
              className="h-[9.3vw] w-[9.3vw] bg-white object-contain"
            />
          </div>
        </div>

        <img
          src={phoneImage}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-[9%] -top-[7%] h-auto w-[60%] max-w-none select-none"
        />
      </div>

      {/* Mobile/tablet: the same content, reflowed instead of scaled down. */}
      <div className="relative flex flex-col items-center px-6 pt-10 text-center lg:hidden sm:px-10 sm:pt-12">
        <p className="text-2xl font-normal leading-none text-[#f5a13b] sm:text-3xl">
          Download the
        </p>

        <img
          src={logoImage}
          alt="EU Wifi App"
          className="mt-5 h-auto w-full max-w-[330px] sm:max-w-[390px]"
        />

        <p className="mt-7 max-w-2xl text-xl font-normal leading-snug text-white sm:text-2xl sm:leading-snug">
          Advanced features for an effortless digital experience anytime,
          anywhere!
        </p>

        <div className="mt-8 flex flex-col items-center gap-6 xs:flex-row xs:items-start sm:mt-10 sm:gap-8">
          <StoreBadges className="w-[210px] gap-3" />
          <img
            src={qrImage}
            alt="QR code to download the EU Wifi App"
            className="h-[132px] w-[132px] bg-white object-contain sm:h-[150px] sm:w-[150px]"
          />
        </div>

        <img
          src={phoneImage}
          alt=""
          aria-hidden="true"
          className="pointer-events-none -mb-16 -mt-4 h-auto w-[160%] max-w-[660px] select-none sm:-mb-20 sm:-mt-10"
        />
      </div>
    </footer>
  );
}
