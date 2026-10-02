import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Globe, Headphones, TriangleAlert } from "lucide-react";
import useDynamicImages from "@/hooks/useDynamicImages";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { countries as allCountries } from "@/general/Arrays";
import { commercialRoutes } from "@/services";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import ProcessOrder from "@/components/commercial/FsimRegister/ProcessOrder";
import useClaimOrder from "./useClaimOrder";

/**
 * Natas's single-page claim: the landing and the register form on one screen,
 * so the whole flow is "this page → your eSIM QR".
 *
 * Set as `form.Component` on the campaign, which is also what tells the shared
 * flow there is no separate landing step to start on (see ../index.jsx).
 *
 * Everything above the form is resolved from the link rather than written as
 * copy: the plan name, the countries it covers and its data/validity all come
 * out of usePromoVariationPlan, so one link renders "South East Asia eSIM /
 * 3GB | 5 Days" and the next renders something else entirely. That puts three
 * API hops on the critical render path, hence the skeleton.
 */

const COUNTRY_BY_CODE = allCountries.reduce((acc, country) => {
  acc[country.countryCode] = country;
  return acc;
}, {});

// planCountriesList identifies a country by its code and an English name; the
// localised names live in the shared `countries` array, so resolve through
// that first and only fall back to what the API sent.
const countryLabel = ({ countryCode, countryName }, language) => {
  const known = COUNTRY_BY_CODE[countryCode];
  return (
    known?.translations?.[language] ||
    known?.countryName ||
    countryName ||
    countryCode
  );
};

// The variation carries `dataSize` + `desc` ("3" + "GB") and `days` separately;
// the hero shows them as their own tiles. Mirrors PaymentLinkOrderSummary's
// handling of the same fields, including its 9999 = unlimited sentinel.
const buildPlanStats = (variation, t, ns) => {
  if (!variation) return [];
  const data =
    Number(variation.dataSize) >= 9999
      ? t(`${ns}.claim.unlimitedData`)
      : variation.dataSize
        ? `${variation.dataSize}${(variation.desc || "").trim()}`
        : "";
  const days = variation.days
    ? `${variation.days} ${t(`${ns}.claim.days`)}`
    : "";
  return [data, days].filter(Boolean);
};

// Coverage reads as chips rather than one long sentence, so a plan covering
// forty countries still sits beside the card instead of pushing it off screen.
const COVERAGE_CHIP_LIMIT = 8;

// [DUMMY-BANNER] Stand-in plan rendered in place of the "link expired" card so
// the banner can be reviewed without a live promocode. Sized like a real
// result: same heading length, two stat tiles, a full chip row with overflow.
// To go back: delete this, delete the dummy block in the render, and uncomment
// the error card next to it.
const DUMMY_PLAN = {
  name: "Europe Travel eSIM",
  stats: ["3GB", "5 Days"],
  countries: [
    "France",
    "Germany",
    "Italy",
    "Spain",
    "Netherlands",
    "Belgium",
    "Austria",
    "Portugal",
  ],
  extraCountries: 12,
};

function PlanSkeleton() {
  return (
    <div className="flex w-full animate-pulse flex-col items-center gap-5 md:items-start">
      <div className="h-12 w-64 rounded-xl bg-white/20 md:h-16 md:w-80" />
      <div className="flex gap-3">
        <div className="h-14 w-32 rounded-2xl bg-white/20" />
        <div className="h-14 w-32 rounded-2xl bg-white/20" />
      </div>
      <div className="flex flex-wrap justify-center gap-2 md:justify-start">
        {[24, 20, 28, 18, 24].map((w, i) => (
          <div
            key={i}
            className="h-7 rounded-full bg-white/20"
            style={{ width: `${w * 4}px` }}
          />
        ))}
      </div>
    </div>
  );
}

function StepCard({ index, title, description }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-10 text-center shadow-card-primary">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-main-650 text-3xl font-bold text-white">
        {index}
      </div>
      <h3 className="text-xl font-bold text-black-700">{title}</h3>
      <p className="text-black-600">{description}</p>
    </div>
  );
}

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

export default function NatasClaim({
  campaign,
  promoCode,
  planStatus,
  planErrorCode,
  planResult,
  onReady,
}) {
  const { t } = useTranslation();
  const { currentLanguage } = useUserLocationLanguage();
  const { ns, images, form: formConfig, landing } = campaign;
  const heroImage = useDynamicImages(images.hero.folder, images.hero.name);

  const {
    fields,
    planFailed,
    planErrorText,
    canSubmit,
    submitting,
    ordering,
    error,
    handleSubmit,
    orderProps,
  } = useClaimOrder({
    campaign,
    promoCode,
    planStatus,
    planErrorCode,
    planResult,
    onReady,
  });

  if (ordering) {
    return <ProcessOrder {...orderProps} />;
  }

  // Keyed off the status, not off `planResult` being present: getLocalPlan
  // can land before the order chain finishes and populate the name alone,
  // which would otherwise flash a hero with no coverage chips and no stats.
  const planResolving = !planFailed && planStatus !== "success";
  // getLocalPlan supplies the name; fall back to the package's own name, then
  // to a generic label, so the hero is never blank.
  const planName =
    planResult?.planName ||
    planResult?.variation?.packageName ||
    t(`${ns}.claim.planFallback`);
  const countryNames =
    planResult?.countries?.map((country) =>
      countryLabel(country, currentLanguage),
    ) || [];
  const chipCountries = countryNames.slice(0, COVERAGE_CHIP_LIMIT);
  const extraCountries = countryNames.length - chipCountries.length;
  const planStats = buildPlanStats(planResult?.variation, t, ns);

  return (
    <main className="flex w-full flex-col">
      {/* Full-bleed banner. What this particular link is worth — all of it
          resolved, not copy. The staging around it is decoration only: no
          claim is made here that the resolved plan doesn't already carry. */}
      <section className="relative isolate w-full overflow-hidden bg-gradient-to-br from-main-650 via-main-700 to-main-900 px-6 py-16 md:py-24 lg:py-28">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-28 -top-28 h-80 w-80 rounded-full bg-main-400/50 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-secondary-500/25 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.18] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)] [background-image:radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]"
        />

        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-12 md:flex-row md:justify-between md:gap-20">
          <div className="relative shrink-0">
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary-500/25 blur-3xl md:h-80 md:w-80"
            />
            <img
              src={heroImage}
              alt={t(`${ns}.landing.imageAlt`)}
              className="relative w-full max-w-[200px] animate-float object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.35)] motion-reduce:animate-none md:max-w-[260px] lg:max-w-[300px]"
            />
          </div>

          <div className="flex w-full max-w-xl flex-col items-center gap-5 text-center md:items-start md:text-left">
            {planResolving ? (
              <PlanSkeleton />
            ) : planFailed ? (
              <>
                {/* [DUMMY-BANNER] the real "link expired" card — uncomment this
                    and delete the dummy block below to restore it.
                <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-3xl bg-white/95 p-8 text-center shadow-card-primary backdrop-blur-sm md:items-start md:text-left">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-main-50">
                    <TriangleAlert
                      className="h-7 w-7 text-main-650"
                      strokeWidth={2}
                    />
                  </span>
                  <p className="text-lg font-semibold leading-snug text-black-900 md:text-xl">
                    {planErrorText || t(`${ns}.form.invalidLink`)}
                  </p>
                </div>
                */}

                {/* [DUMMY-BANNER] preview content, same markup as the resolved
                    state below so the sizing matches exactly. */}
                <h1 className="text-4xl font-bold leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.18)] md:text-5xl lg:text-6xl">
                  {DUMMY_PLAN.name}
                </h1>

                <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                  {DUMMY_PLAN.stats.map((stat) => (
                    <span
                      key={stat}
                      className="rounded-2xl bg-white px-7 py-3 text-xl font-bold text-main-650 shadow-card-primary md:text-2xl"
                    >
                      {stat}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                  <Globe
                    className="h-4 w-4 shrink-0 text-secondary-400"
                    strokeWidth={2.25}
                  />
                  {DUMMY_PLAN.countries.map((name) => (
                    <span
                      key={name}
                      className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white ring-1 ring-white/30"
                    >
                      {name}
                    </span>
                  ))}
                  <span className="rounded-full bg-secondary-500 px-3 py-1 text-sm font-semibold text-black-900">
                    +{DUMMY_PLAN.extraCountries}
                  </span>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-4xl font-bold leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.18)] md:text-5xl lg:text-6xl">
                  {planName}
                </h1>

                {planStats.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                    {planStats.map((stat) => (
                      <span
                        key={stat}
                        className="rounded-2xl bg-white px-7 py-3 text-xl font-bold text-main-650 shadow-card-primary md:text-2xl"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                )}

                {chipCountries.length > 0 && (
                  <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                    <Globe
                      className="h-4 w-4 shrink-0 text-secondary-400"
                      strokeWidth={2.25}
                    />
                    {chipCountries.map((name) => (
                      <span
                        key={name}
                        className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white ring-1 ring-white/30"
                      >
                        {name}
                      </span>
                    ))}
                    {extraCountries > 0 && (
                      <span className="rounded-full bg-secondary-500 px-3 py-1 text-sm font-semibold text-black-900">
                        +{extraCountries}
                      </span>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Everything below the banner returns to the page container. */}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 py-16 md:gap-20">
        <section className="flex flex-col items-center gap-8">
          <div className="flex max-w-2xl flex-col gap-2.5 text-center">
            <h2 className="text-3xl font-bold text-black-900 md:text-5xl md:leading-[1.15]">
              {t(`${ns}.form.heading`)}
            </h2>
            <p className="text-lg text-black-600 md:text-xl">
              {t(`${ns}.form.dec`)}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-3xl flex-col gap-6"
          >
            <Input
              placeholder={t("signup.firstName")}
              value={fields.firstName}
              onChange={(e) => fields.setFirstName(e.target.value)}
              required
            />
            <Input
              placeholder={t("signup.lastName")}
              value={fields.lastName}
              onChange={(e) => fields.setLastName(e.target.value)}
              required
            />
            <Input
              placeholder={t(`${ns}.form.email`)}
              type="email"
              value={fields.email}
              onChange={(e) =>
                fields.setEmail(e.target.value.replace(/\s/g, "").toLowerCase())
              }
              required
            />
            {/* The country selector sits in its own box beside the number, so the
                two parts of the control are spaced like the fields above them. */}
            <PhoneInput
              defaultCountry={formConfig.phoneDefaultCountry}
              value={fields.phone}
              onChange={(value) => fields.setPhone(value)}
              className="!flex !gap-3 [&_.react-international-phone-country-selector-button]:!h-[3.25rem] [&_.react-international-phone-country-selector-button]:!rounded-xl [&_.react-international-phone-country-selector-button]:!border-neutral-300 [&_.react-international-phone-country-selector-button]:!bg-neutral-50 [&_.react-international-phone-country-selector-button]:!px-4 [&_.react-international-phone-input]:!h-[3.25rem] [&_.react-international-phone-input]:!w-full [&_.react-international-phone-input]:!rounded-xl [&_.react-international-phone-input]:!border-neutral-300 [&_.react-international-phone-input]:!bg-neutral-50 [&_.react-international-phone-input]:!text-base"
            />

            <label className="flex items-center gap-4">
              <Switch checked={fields.agree} onCheckedChange={fields.setAgree} />
              <span className="text-sm text-black-600">
                <Trans
                  i18nKey={`${ns}.form.agree`}
                  components={{
                    terms: (
                      <Link
                        to={commercialRoutes.termsService.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-black-900 underline"
                      />
                    ),
                    privacy: (
                      <Link
                        to={commercialRoutes.privacyPolicy.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-black-900 underline"
                      />
                    ),
                  }}
                />
              </span>
            </label>

            {error && (
              <p className="text-center text-sm text-main-650">{error}</p>
            )}

            <div className="flex flex-col items-center gap-3 pt-2">
              <Button
                type="submit"
                disabled={!canSubmit}
                className="max-w-full whitespace-normal rounded-full bg-main-650 px-10 py-4 text-lg font-semibold hover:bg-main-500 disabled:opacity-50 md:px-16 md:text-2xl"
              >
                {submitting ? t(`${ns}.form.processing`) : t(`${ns}.form.submit`)}
              </Button>
              <p className="text-center text-sm font-medium text-black-600">
                {t(`${ns}.form.claimWindow`)}
              </p>
            </div>
          </form>
        </section>

        <section className="flex flex-col gap-12">
          <h2 className="text-center text-3xl font-black text-black-900 md:text-5xl">
            {t(`${ns}.landing.steps.heading`)}
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {landing.stepKeys.map((key, idx) => (
              <StepCard
                key={key}
                index={idx + 1}
                title={t(`${ns}.landing.steps.items.${key}.title`)}
                description={t(`${ns}.landing.steps.items.${key}.description`)}
              />
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

        <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-black-600">
          <Trans i18nKey={`${ns}.landing.terms`} />
        </p>
      </div>
    </main>
  );
}
