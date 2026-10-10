import { Trans, useTranslation } from "react-i18next";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { TriangleAlert } from "lucide-react";
import { EU_HOLIDAYS_LEGAL_URLS } from "@/constants/urls";
import useDynamicImages from "@/hooks/useDynamicImages";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { countries as allCountries } from "@/general/Arrays";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import ProcessOrder from "@/components/commercial/FsimRegister/ProcessOrder";
import useClaimOrder from "./useClaimOrder";
import EuAppBanner from "./EuAppBanner";

/**
 * EU Wifi's single-page claim: hero, register form, activation steps and
 * terms on one screen, so the whole flow is "this page → your eSIM QR".
 *
 * Set as `form.Component` on the campaign, which is also what tells the shared
 * flow there is no separate landing step to start on (see ./index.jsx).
 *
 * Same data contract as NatasClaim — everything above the form is resolved
 * from the link rather than written as copy, so one link renders "South East
 * Asia eSIM / 3GB | 5 Days" and the next renders something else entirely —
 * but laid out to EU's own design: light hero on white, the plan's coverage
 * as a plain sentence rather than chips, and a single combined data/validity
 * pill. Kept as its own component rather than branching inside NatasClaim
 * because the two share no markup beyond the form fields.
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

// The design sets the trailing "eSIM" of the plan name in brand navy on its
// own line ("South East Asia" / "eSIM"). Every plan these links resolve to is
// named that way, but a name that isn't just renders whole and black rather
// than losing a word to the split.
const splitPlanName = (name) => {
  const match = /^(.*\S)\s+(esim)$/i.exec(name?.trim() || "");
  return match ? { lead: match[1], accent: match[2] } : { lead: name, accent: "" };
};

// The variation carries `dataSize` + `desc` ("3" + "GB") and `days`
// separately; the design shows them as one pill, "3GB | 5 Days". Mirrors
// PaymentLinkOrderSummary's handling of the same fields, 9999 = unlimited
// sentinel included.
const buildPlanSummary = (variation, t, ns) => {
  if (!variation) return "";
  const data =
    Number(variation.dataSize) >= 9999
      ? t(`${ns}.claim.unlimitedData`)
      : variation.dataSize
        ? `${variation.dataSize}${(variation.desc || "").trim()}`
        : "";
  const days = variation.days
    ? `${variation.days} ${t(`${ns}.claim.days`)}`
    : "";
  return [data, days].filter(Boolean).join(" | ");
};

function PlanSkeleton() {
  return (
    <div className="flex w-full animate-pulse flex-col items-center gap-4 md:items-start">
      <div className="h-11 w-72 rounded-xl bg-neutral-200 md:h-14" />
      <div className="h-11 w-40 rounded-xl bg-neutral-200 md:h-14" />
      <div className="h-4 w-full max-w-md rounded-full bg-neutral-200" />
      <div className="h-12 w-44 rounded-full bg-neutral-200" />
    </div>
  );
}

function StepCard({ index, title, description }) {
  return (
    <div className="flex h-full flex-col items-center gap-4 rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-card-secondary">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-eu-600 text-2xl font-bold text-white">
        {index}
      </div>
      <h3 className="text-xl font-bold text-black-900">{title}</h3>
      <p className="text-base leading-relaxed text-black-600">{description}</p>
    </div>
  );
}

// The label is a <Trans> rather than a plain string because the design breaks
// every feature across two lines and bolds the second, and where that break
// falls is per-language — so it belongs in the copy and not in a fixed-width
// container.
function FeatureItem({ folder, icon, i18nKey }) {
  const iconSrc = useDynamicImages(folder, icon);
  return (
    <div className="flex w-full max-w-[260px] min-w-0 items-center gap-4 sm:w-auto sm:max-w-none">
      <img
        src={iconSrc}
        alt=""
        className="h-12 w-12 shrink-0 object-contain md:h-16 md:w-16"
      />
      <p className="min-w-0 break-words text-left text-xl font-normal leading-tight text-black-900 md:text-2xl [&_strong]:font-bold">
        <Trans i18nKey={i18nKey} />
      </p>
    </div>
  );
}

export default function EuClaim({
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
  // which would otherwise flash a hero with no coverage line and no pill.
  const planResolving = !planFailed && planStatus !== "success";
  // getLocalPlan supplies the name; fall back to the package's own name, then
  // to a generic label, so the hero is never blank.
  const planName =
    planResult?.planName ||
    planResult?.variation?.packageName ||
    t(`${ns}.claim.planFallback`);
  const { lead, accent } = splitPlanName(planName);
  const coverage =
    planResult?.countries
      ?.map((country) => countryLabel(country, currentLanguage))
      .join(", ") || "";
  const planSummary = buildPlanSummary(planResult?.variation, t, ns);

  return (
    <main className="flex w-full flex-col bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-12 md:gap-24 md:py-16">
        {/* What this particular link is worth — all of it resolved, not copy. */}
        <section className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-center md:gap-14">
          <img
            src={heroImage}
            alt={t(`${ns}.landing.imageAlt`)}
            className="w-full max-w-[150px] shrink-0 object-contain md:max-w-[190px]"
          />

          <div className="flex w-full max-w-xl flex-col items-center gap-5 text-center md:items-start md:text-left">
            {planResolving ? (
              <PlanSkeleton />
            ) : planFailed ? (
              <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-3xl border border-neutral-200 bg-eu-50 p-8 text-center md:items-start md:text-left">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white">
                  <TriangleAlert
                    className="h-7 w-7 text-eu-600"
                    strokeWidth={2}
                  />
                </span>
                <p className="text-lg font-semibold leading-snug text-black-900 md:text-xl">
                  {planErrorText || t(`${ns}.form.invalidLink`)}
                </p>
              </div>
            ) : (
              <>
                <h1 className="text-4xl font-bold leading-[1.1] text-black-900 md:text-5xl lg:text-6xl">
                  {lead}
                  {accent && (
                    <>
                      <br />
                      <span className="text-eu-600">{accent}</span>
                    </>
                  )}
                </h1>

                {coverage && (
                  <p className="text-base leading-relaxed text-black-600">
                    {coverage}.
                  </p>
                )}

                {planSummary && (
                  <span className="rounded-full bg-eu-600 px-10 py-3.5 text-xl font-bold text-white md:text-2xl">
                    {planSummary}
                  </span>
                )}
              </>
            )}
          </div>
        </section>

        <section className="flex flex-col items-center gap-8">
          <div className="flex max-w-2xl flex-col gap-2.5 text-center">
            <h2 className="text-3xl font-bold leading-tight text-black-900 md:text-5xl md:leading-[1.15]">
              {t(`${ns}.form.heading`)}
            </h2>
            <p className="text-lg text-black-600">{t(`${ns}.form.dec`)}</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-2xl flex-col gap-4"
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

            <label className="flex items-center gap-4 pt-1">
              <Switch
                checked={fields.agree}
                onCheckedChange={fields.setAgree}
                className="data-[state=checked]:bg-eu-600"
              />
              <span className="text-sm text-black-600">
                <Trans
                  i18nKey={`${ns}.form.agree`}
                  components={{
                    terms: (
                      <a
                        href={EU_HOLIDAYS_LEGAL_URLS.terms}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-black-900 underline"
                      />
                    ),
                    privacy: (
                      <a
                        href={EU_HOLIDAYS_LEGAL_URLS.privacy}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-black-900 underline"
                      />
                    ),
                  }}
                />
              </span>
            </label>

            {error && <p className="text-center text-sm text-eu-600">{error}</p>}

            <div className="flex flex-col items-center gap-3 pt-4">
              <Button
                type="submit"
                disabled={!canSubmit}
                className="max-w-full whitespace-normal rounded-full bg-eu-600 px-10 py-4 text-lg font-semibold hover:bg-eu-500 disabled:opacity-50 md:px-20 md:py-5 md:text-xl"
              >
                {submitting
                  ? t(`${ns}.form.processing`)
                  : t(`${ns}.form.submit`)}
              </Button>
              <p className="text-center text-sm font-semibold text-eu-600">
                {t(`${ns}.form.claimWindow`)}
              </p>
            </div>
          </form>
        </section>

        <section className="flex flex-col gap-10">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-center text-3xl font-bold text-black-900 md:text-[2.75rem] md:leading-tight">
              {t(`${ns}.landing.steps.heading`)}
            </h2>
            <span className="rounded-full bg-neutral-100 px-5 py-2 text-center text-sm text-black-600">
              {t(`${ns}.landing.steps.badge`)}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
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

        <section className="flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-16 md:gap-24">
          {landing.features.map(({ key, folder, icon }) => (
            <FeatureItem
              key={key}
              folder={folder}
              icon={icon}
              i18nKey={`${ns}.landing.features.${key}`}
            />
          ))}
        </section>

        {landing.showTerms && (
          <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-black-600">
            <Trans i18nKey={`${ns}.landing.terms`} />
          </p>
        )}
      </div>

      <EuAppBanner alt={t(`${ns}.landing.appBannerAlt`)} />
    </main>
  );
}
