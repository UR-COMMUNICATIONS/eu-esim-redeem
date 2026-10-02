import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Copy, Check, Mail } from "lucide-react";
import { hostServices } from "@/general/host.services";
import { Button } from "@/components/ui/button";
import { DownloadFillIcon } from "@/services";
import useDynamicImages from "@/hooks/useDynamicImages";

// Field ids match cart.esimDetails[0]'s shape (smdp / activationCode / iccid).
const DETAIL_FIELDS = [
  { key: "smdp", labelKey: "smdpAddress" },
  { key: "activationCode", labelKey: "activationCode" },
  { key: "iccid", labelKey: "iccid" },
];

function CopyableDetail({ label, value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-300 bg-neutral-100 px-6 py-5">
      <div className="flex flex-col gap-1.5 text-center sm:text-left">
        <span className="text-sm font-bold uppercase tracking-wide text-black-600">
          {label}
        </span>
        <span className="break-all text-xl font-black text-main-650">
          {value}
        </span>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-neutral-300 bg-white text-black-600 transition hover:text-black-900"
        aria-label={label}
      >
        {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
      </button>
    </div>
  );
}

/**
 * Shared QR-ready screen — reads the eSIM the order step put in the cart, so
 * it's identical across campaigns apart from copy, side image and the
 * downloaded file's name.
 *
 * Trimmed compared to Garuda's EsimReadyPage (show the QR, let them save/copy
 * it), without that page's install-guide/app-download embed, which isn't part
 * of this branch yet.
 */
export default function EsimReadyPage({ campaign }) {
  const { t } = useTranslation();
  const { ns, images, ready } = campaign;
  const { cart } = useSelector((state) => state.cart);
  const esimImage = useDynamicImages(images.ready.folder, images.ready.name);
  const esim = cart.esimDetails?.[0];
  const qrCodeUrl = esim?.qrCode
    ? `${hostServices.remote}/jane/esim/${esim.qrCode}`
    : null;

  const handleSaveQr = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = ready.qrFileName;
    link.click();
  };

  return (
    <main className="flex min-h-[calc(100vh-73px)] w-full flex-col lg:flex-row">
      <div className="hidden w-full shrink-0 lg:flex lg:w-1/2 lg:items-center lg:justify-center lg:bg-neutral-50">
        <img
          src={esimImage}
          alt={t(`${ns}.form.imageAlt`)}
          className="w-full max-w-[300px] object-contain"
        />
      </div>

      <div className="flex w-full flex-col items-center gap-10 px-6 py-16 text-center lg:w-1/2">
        <div className="flex max-w-2xl flex-col gap-2.5">
          <h1 className="text-3xl font-bold text-black-900 lg:text-5xl">
            {t(`${ns}.ready.heading`)}
          </h1>
          <p className="text-lg text-black-600 lg:text-xl">
            {t(`${ns}.ready.description`)}
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex aspect-square w-full max-w-[318px] items-center justify-center rounded-[50px] border border-neutral-300 bg-neutral-100">
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
            className="max-w-full whitespace-normal rounded-2xl bg-[#00264C] px-6 py-4 text-base font-medium hover:bg-[#00264C] md:px-8 md:text-lg"
          >
            <DownloadFillIcon className="!h-8 !w-8" />
            {t(`${ns}.ready.saveQrCode`)}
          </Button>
        </div>

        <div className="flex max-w-2xl flex-col items-center gap-2 text-sm text-black-600">
          <p>
            <span className="font-bold text-main-650">
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
    </main>
  );
}
