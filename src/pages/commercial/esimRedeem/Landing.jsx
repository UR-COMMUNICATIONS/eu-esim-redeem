import { Trans, useTranslation } from "react-i18next";
import { Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import useDynamicImages from "@/hooks/useDynamicImages";
import { cn } from "@/lib/utils";
import CountryCoverage from "./CountryCoverage";

// The label is a <Trans> rather than a plain string because the design breaks
// every feature across two lines, and where the break falls is per-language —
// so it belongs in the copy (as <br />) and not in a fixed-width container.
function FeatureItem({ folder, icon, i18nKey }) {
  const iconSrc = useDynamicImages(folder, icon);
  return (
    <div className="flex min-w-0 items-center justify-center gap-2 md:gap-3">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-neutral-100 md:h-[4.25rem] md:w-[4.25rem]">
        <img
          src={iconSrc}
          alt=""
          className="h-8 w-8 object-contain md:h-11 md:w-11"
        />
      </span>
      <p className="min-w-0 break-words text-left text-sm font-semibold leading-snug text-black-900 md:text-xl">
        <Trans i18nKey={i18nKey} />
      </p>
    </div>
  );
}

/**
 * Shared landing screen for every voucher-driven eSIM redeem campaign.
 *
 * Everything that differs between campaigns — copy, hero image, coverage
 * regions, which step/feature rows to show — arrives through `campaign`
 * (see ./campaigns/README or any campaign file for the shape). A campaign
 * whose design diverges too far from this layout can set its own `Landing`
 * component in its config instead of bending this one out of shape.
 */
export default function Landing({ campaign, onContinue }) {
  const { t } = useTranslation();
  const { ns, images, coverage, landing } = campaign;
  const heroImage = useDynamicImages(images.hero.folder, images.hero.name);
  // Same lockup pieces the other partner pages use (FsimLogo.jsx): the Yoowifi
  // wordmark, the "x" separator, then the partner's mark.
  const partnerLogo = useDynamicImages(
    landing.partnerLogo?.folder,
    landing.partnerLogo?.name,
  );
  const yoowifiLogo = useDynamicImages(
    "fsim-banner",
    "yoowifi-without-hexagon",
  );
  const separator = useDynamicImages("fsim-banner", "close");

  return (
    <main className="flex flex-col gap-14 px-6 py-16 text-center md:gap-20 md:px-16">
      {landing.notice?.position === "top" && (
        <section className="mx-auto max-w-3xl">
          {landing.notice.keys.map((key) => (
            <p key={key} className="text-sm text-black-600 md:text-base">
              {t(`${ns}.landing.${key}`)}
            </p>
          ))}
        </section>
      )}

      {landing.partnerLogo && (
        <section className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <img
            src={yoowifiLogo}
            alt="Yoowifi"
            className="h-10 w-auto object-contain md:h-14"
          />
          <img
            src={separator}
            alt=""
            aria-hidden
            className="h-4 w-4 object-contain md:h-6 md:w-6"
          />
          <img
            src={partnerLogo}
            alt={landing.partnerLogo.alt}
            className="h-16 w-auto object-contain md:h-24"
          />
        </section>
      )}

      {coverage && (
        <CountryCoverage
          regions={coverage.regions}
          variant={coverage.variant}
          labelKey={`${ns}.landing.coverage`}
        />
      )}

      {/* Two rows: artwork beside the copy, then the CTA centred beneath both. */}
      <section className="flex flex-col items-center gap-14 md:gap-20">
        <div
          className={cn(
            "flex flex-col items-center gap-14 md:justify-center md:gap-24 md:text-left",
            landing.heroReversed ? "md:flex-row-reverse" : "md:flex-row",
          )}
        >
          <img
            src={heroImage}
            alt={t(`${ns}.landing.imageAlt`)}
            className="w-full max-w-[172px] object-contain md:max-w-[210px]"
          />
          <div className="flex max-w-xl flex-col gap-2.5">
            <h1 className="text-4xl font-bold text-black-900 md:text-5xl lg:text-[70px] lg:leading-[1]">
              {/* <hl> marks the plan name, which the designs set in theme red. */}
              <Trans
                i18nKey={`${ns}.landing.heading`}
                components={{ hl: <span className="text-main-650" /> }}
              />
            </h1>
            <p className="text-lg text-black-600 md:text-xl lg:text-2xl">
              {t(`${ns}.landing.description`)}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <Button
            onClick={onContinue}
            className="max-w-full whitespace-normal rounded-full bg-main-650 px-8 py-4 text-lg font-semibold hover:bg-main-500 md:px-10 md:text-2xl"
          >
            {t(`${ns}.landing.button`)}
          </Button>
          {landing.notice?.position === "cta" &&
            landing.notice.keys.map((key) => (
              <p key={key} className="text-sm text-black-600">
                {t(`${ns}.landing.${key}`)}
              </p>
            ))}
        </div>
      </section>

      <section className="flex flex-col gap-12">
        <h2 className="text-center text-3xl font-black text-black-900 md:text-5xl">
          {t(`${ns}.landing.steps.heading`)}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {landing.stepKeys.map((key, idx) => (
            <div
              key={key}
              className="flex flex-col items-center gap-4 rounded-3xl bg-white p-10 shadow-card-primary"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-main-650 text-3xl font-bold text-white">
                {idx + 1}
              </div>
              <h3 className="text-xl font-bold text-black-700">
                {t(`${ns}.landing.steps.items.${key}.title`)}
              </h3>
              <p className="text-black-600">
                {t(`${ns}.landing.steps.items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Spans the same width as the step cards above, on the same 3/4-up
          rhythm, rather than clustering in the middle of the row. */}
      <section className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-8">
        {landing.features.map(({ key, folder, icon }) => (
          <FeatureItem
            key={key}
            folder={folder}
            icon={icon}
            i18nKey={`${ns}.landing.features.${key}`}
          />
        ))}
        {landing.showSupportFeature && (
          <div className="flex min-w-0 items-center justify-center gap-2 md:gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-neutral-100 md:h-[4.25rem] md:w-[4.25rem]">
              <Headphones
                className="h-8 w-8 text-main-650 md:h-11 md:w-11"
                strokeWidth={1.75}
              />
            </span>
            <p className="min-w-0 break-words text-left text-sm font-semibold leading-snug text-black-900 md:text-xl">
              <Trans i18nKey={`${ns}.landing.features.support`} />
            </p>
          </div>
        )}
      </section>

      {landing.showTerms && (
        <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-black-600">
          <Trans i18nKey={`${ns}.landing.terms`} />
        </p>
      )}
    </main>
  );
}
