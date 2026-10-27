import { useState } from "react";
import { useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { Copy, Check, Mail, Smartphone } from "lucide-react";
import { hostServices } from "@/general/host.services";
import { Button } from "@/components/ui/button";
import { DownloadFillIcon } from "@/services";
import useDynamicImages from "@/hooks/useDynamicImages";
import EuAppBanner from "./EuAppBanner";

// Field ids match cart.esimDetails[0]'s shape (smdp / activationCode / iccid).
const DETAIL_FIELDS = [
  { key: "smdp", labelKey: "smdpAddress" },
  { key: "activationCode", labelKey: "activationCode" },
  { key: "iccid", labelKey: "iccid" },
];

const buildEsimQrPayload = (esim) => {
  const activationCode = esim?.activationCode?.trim();
  if (!activationCode) return null;

  return /^LPA:1\$/i.test(activationCode)
    ? activationCode
    : esim?.smdp?.trim()
      ? `LPA:1$${esim.smdp.trim()}$${activationCode}`
      : null;
};

const buildEsimInstallUrls = (esim) => {
  const qrPayload = buildEsimQrPayload(esim);
  if (!qrPayload) return { android: null, apple: null };

  const cardData = encodeURIComponent(qrPayload);

  return {
    android: `https://esimsetup.android.com/esim_qrcode_provisioning?carddata=${cardData}`,
    apple: `https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=${cardData}`,
  };
};

const getMobilePlatform = () => {
  if (typeof navigator === "undefined") return null;

  const { userAgent = "", platform = "", maxTouchPoints = 0 } = navigator;
  const isAppleMobile =
    /iPhone|iPad|iPod/i.test(userAgent) ||
    ((platform === "MacIntel" || /Macintosh/i.test(userAgent)) &&
      maxTouchPoints > 1);

  if (isAppleMobile) return "apple";
  if (/Android/i.test(userAgent)) return "android";
  return null;
};

function CopyableDetail({ label, value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-eu-100 bg-eu-50 px-6 py-5 text-left">
      <div className="flex min-w-0 flex-col gap-1.5">
        <span className="text-sm font-semibold uppercase tracking-wide text-black-600">
          {label}
        </span>
        <span className="break-all text-lg font-bold text-eu-600 md:text-xl">
          {value}
        </span>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-eu-100 bg-white text-eu-600 transition hover:bg-eu-100"
        aria-label={label}
      >
        {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
      </button>
    </div>
  );
}

/**
 * EU Wifi's QR-ready screen — reads the eSIM the order step put in the cart,
 * so the data is identical to the shared EsimReadyPage; only the styling is
 * EU's own (navy accents, the tinted detail cards, and the app banner that
 * closes every EU screen).
 *
 * Selected by `completion.Component` on the campaign rather than by
 * `completion.mode`, which still decides whether an eSIM is activated at all.
 */
export default function EuEsimReadyPage({ campaign }) {
  const { t } = useTranslation();
  const { ns, images, ready } = campaign;
  const { cart } = useSelector((state) => state.cart);
  const esimImage = useDynamicImages(images.ready.folder, images.ready.name);
  const esim = cart.esimDetails?.[0];
  const qrCodeUrl = esim?.qrCode
    ? `${hostServices.remote}/jane/esim/${esim.qrCode}`
    : null;
  const installUrls = buildEsimInstallUrls(esim);
  const mobilePlatform = getMobilePlatform();
  const installUrl = mobilePlatform ? installUrls[mobilePlatform] : null;

  const handleSaveQr = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = ready.qrFileName;
    link.click();
  };

  return (
    <main className="flex w-full flex-col bg-white">
      <div className="flex w-full flex-col lg:flex-row lg:items-center">
        <div className="flex w-full shrink-0 items-center justify-center px-6 pt-12 lg:w-2/5 lg:px-10 lg:py-16">
          <img
            src={esimImage}
            alt={t(`${ns}.form.imageAlt`)}
            className="w-full max-w-[180px] object-contain lg:max-w-[300px]"
          />
        </div>

        <div className="flex w-full flex-col items-center gap-10 px-6 py-12 text-center lg:w-3/5 lg:py-16 lg:pr-16">
          <div className="flex max-w-2xl flex-col gap-2.5">
            <h1 className="text-3xl font-bold leading-tight text-black-900 lg:text-5xl lg:leading-[1.15]">
              <Trans
                i18nKey={`${ns}.ready.heading`}
                components={{ accent: <span className="text-eu-600" /> }}
              />
            </h1>
            <p className="text-lg text-black-600">
              {t(`${ns}.ready.description`)}
            </p>
          </div>

          <div className="flex flex-col items-center gap-6">
            {installUrl && (
              <div className="flex flex-col items-center gap-2">
                <Button
                  asChild
                  className="max-w-full whitespace-normal rounded-2xl bg-eu-600 px-8 py-5 text-base font-semibold hover:bg-eu-500 md:px-10 md:text-lg"
                >
                  <a href={installUrl} rel="noopener noreferrer">
                    <Smartphone className="!h-6 !w-6" />
                    {t(`${ns}.ready.installEsim`)}
                  </a>
                </Button>
                <p className="text-sm text-black-600">
                  {t(`${ns}.ready.installEsimHelp`)}
                </p>
              </div>
            )}

            <div className="flex aspect-square w-full max-w-[300px] items-center justify-center rounded-[2.5rem] border border-eu-100 bg-eu-50">
              {qrCodeUrl && (
                <img
                  src={qrCodeUrl}
                  alt={t(`${ns}.ready.qrAlt`)}
                  className="h-[80%] w-[80%] rounded-2xl bg-white object-contain"
                />
              )}
            </div>
            <Button
              onClick={handleSaveQr}
              className="max-w-full whitespace-normal rounded-2xl bg-eu-600 px-8 py-5 text-base font-semibold hover:bg-eu-500 md:px-10 md:text-lg"
            >
              <DownloadFillIcon className="!h-7 !w-7" />
              {t(`${ns}.ready.saveQrCode`)}
            </Button>
          </div>

          <div className="flex max-w-2xl flex-col items-center gap-2 text-sm text-black-600">
            <p>
              <span className="font-bold text-eu-600">
                {t(`${ns}.ready.reminderLabel`)}
              </span>{" "}
              {t(`${ns}.ready.reminderText`)}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              {t(`${ns}.ready.emailedCopy`)}
            </p>
          </div>

          <div className="flex w-full max-w-2xl flex-col gap-4">
            {DETAIL_FIELDS.map(
              ({ key, labelKey }) =>
                esim?.[key] && (
                  <CopyableDetail
                    key={key}
                    label={t(`${ns}.ready.${labelKey}`)}
                    value={esim[key]}
                  />
                ),
            )}
          </div>
        </div>
      </div>

      <EuAppBanner alt={t(`${ns}.landing.appBannerAlt`)} />
    </main>
  );
}
