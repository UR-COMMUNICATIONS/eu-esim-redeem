import { Trans, useTranslation } from "react-i18next";
import useDynamicImages from "@/hooks/useDynamicImages";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";

/**
 * Final screen for campaigns that don't activate the eSIM here
 * (completion.mode === "app").
 *
 * The order is placed but no activateEsim call is made, so `cart.esimDetails`
 * is empty and there is no eSIM QR to show. The QR on this screen is the
 * app-download QR — scanning it installs the Yoowifi app, which is where the
 * user actually activates.
 */
export default function AppReadyPage({ campaign }) {
  const { t } = useTranslation();
  const { currentCountry } = useUserLocationLanguage();
  const { ns, images: campaignImages, completion } = campaign;
  // The QR is per storefront: Indonesia has its own app listing, everywhere
  // else falls back to the Singapore one.
  const qrImage =
    completion.qrImageByCountry?.[currentCountry] || completion.qrImage;
  const readyImage = useDynamicImages(
    campaignImages.ready.folder,
    campaignImages.ready.name,
  );
  const appQrCode = useDynamicImages(qrImage.folder, qrImage.name);
  const googlePlay = useDynamicImages("others", "google-play");
  const appleStore = useDynamicImages("others", "apple-store");

  return (
    <main className="flex min-h-[calc(100vh-73px)] w-full flex-col lg:flex-row">
      <div className="hidden w-full shrink-0 lg:flex lg:w-1/2 lg:items-center lg:justify-center">
        <img
          src={readyImage}
          alt={t(`${ns}.form.imageAlt`)}
          className="w-full max-w-[380px] object-contain"
        />
      </div>

      <div className="flex w-full flex-col items-center gap-8 px-6 py-16 text-center lg:w-1/2 lg:justify-center">
        <div className="flex max-w-xl flex-col gap-4">
          <h1 className="text-3xl font-bold text-black-900 lg:text-5xl lg:leading-[1.15]">
            {t(`${ns}.ready.heading`)}
          </h1>
          <p className="text-lg text-black-600">
            {/* Bolds "download the Yoowifi App to Activate your Free eSIM". */}
            <Trans i18nKey={`${ns}.ready.description`} />
          </p>
        </div>

        <div className="flex aspect-square w-full max-w-[280px] items-center justify-center rounded-[32px] border border-neutral-300 bg-white p-5">
          <img
            src={appQrCode}
            alt={t(`${ns}.ready.qrAlt`)}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://play.google.com/store/apps/details?id=com.urwifi.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={googlePlay}
              alt="Get it on Google Play"
              className="h-[48px] w-auto"
            />
          </a>
          <a
            href="https://apps.apple.com/sg/app/id1632273383"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={appleStore}
              alt="Download on the App Store"
              className="h-[48px] w-auto"
            />
          </a>
        </div>
      </div>
    </main>
  );
}
