import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import useDynamicImages from "@/hooks/useDynamicImages";
import { commercialRoutes } from "@/services";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import ProcessOrder from "@/components/commercial/FsimRegister/ProcessOrder";
import DestinationSelect from "./DestinationSelect";
import useClaimOrder from "./useClaimOrder";

/**
 * Shared register step for every voucher-driven eSIM redeem campaign that
 * keeps the landing and the form on separate screens.
 *
 * The claim itself — field state, createUser, and the wait for the link's plan
 * — lives in useClaimOrder, shared with Natas's single-page claim. This
 * component is the split-image layout around it, and renders ProcessOrder
 * itself once submitted so a failed order doesn't unmount the form and lose
 * the "user already created" guard.
 *
 * `campaign.key` is used both as the createUser `source` and as the fsimConfig
 * key handed to ProcessOrder, so every campaign needs a matching fsimConfig
 * entry.
 */
export default function RegisterForm({
  campaign,
  promoCode,
  planStatus,
  planErrorCode,
  planResult,
  onReady,
}) {
  const { t } = useTranslation();
  const { ns, images, form: formConfig, destination } = campaign;
  const registerImage = useDynamicImages(images.form.folder, images.form.name);

  const {
    fields,
    picksDestination,
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

  return (
    <div className="flex min-h-[calc(100vh-73px)] w-full flex-col lg:flex-row">
      <div className="hidden w-full shrink-0 lg:flex lg:w-1/2 lg:items-center lg:justify-center lg:bg-neutral-50">
        <img
          src={registerImage}
          alt={t(`${ns}.form.imageAlt`)}
          className="w-full max-w-[300px] object-contain"
        />
      </div>

      <div className="flex w-full items-center justify-center px-6 py-16 lg:w-1/2">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col gap-8"
        >
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-bold text-black-900 lg:text-[42px] lg:leading-[1.1]">
              {t(`${ns}.form.heading`)}
            </h1>
            <p className="text-lg text-black-600">{t(`${ns}.form.dec`)}</p>
          </div>

          {planFailed && (
            <p className="rounded-xl bg-main-50 px-4 py-3 text-sm font-semibold text-main-650">
              {planErrorText || t(`${ns}.form.invalidLink`)}
            </p>
          )}

          <div className="flex flex-col gap-4">
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
            <PhoneInput
              defaultCountry={formConfig.phoneDefaultCountry}
              value={fields.phone}
              onChange={(value) => fields.setPhone(value)}
              className="[&_.react-international-phone-country-selector-button]:!h-[3.25rem] [&_.react-international-phone-country-selector-button]:!rounded-xl [&_.react-international-phone-country-selector-button]:!border-neutral-300 [&_.react-international-phone-country-selector-button]:!bg-neutral-50 [&_.react-international-phone-input]:!h-[3.25rem] [&_.react-international-phone-input]:!w-full [&_.react-international-phone-input]:!rounded-xl [&_.react-international-phone-input]:!border-neutral-300 [&_.react-international-phone-input]:!bg-neutral-50 [&_.react-international-phone-input]:!text-base"
            />
            {picksDestination && (
              <DestinationSelect
                countryCodes={destination.countryCodes}
                value={fields.destinationCode}
                onChange={fields.setDestinationCode}
                placeholder={t(`${ns}.form.destination`)}
              />
            )}
          </div>

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

          {error && <p className="text-sm text-main-650">{error}</p>}

          <div className="flex flex-col items-center gap-3">
            <Button
              type="submit"
              disabled={!canSubmit}
              className="w-full whitespace-normal rounded-full bg-main-650 px-6 py-4 text-lg font-semibold hover:bg-main-500 disabled:opacity-50 md:text-xl"
            >
              {submitting ? t(`${ns}.form.processing`) : t(`${ns}.form.submit`)}
            </Button>
            <p className="text-center text-sm font-medium text-black-600">
              {t(`${ns}.form.claimWindow`)}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
