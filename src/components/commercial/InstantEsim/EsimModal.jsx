import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function EsimModal({
  processResponse,
  userName,
  countryCode,
  localNumber,
  email,
  orderId,
  isView = false,
  onClose,
}) {
  const { t } = useTranslation();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[1000] animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div className="flex items-start justify-center min-h-full py-8 px-4">
        <div
          className="bg-white rounded-2xl p-10 max-w-[420px] w-full text-center shadow-2xl animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-[22px] font-bold text-neutral-900 mb-2">
            {t("instantEsim.modal.title")}
          </h2>
          <p className="text-sm text-neutral-500 mb-6">
            {t("instantEsim.modal.subtitle")}
          </p>

          {processResponse.map((esim, idx) => (
            <div key={idx} className="mb-4">
              <div className="w-[200px] h-[200px] mx-auto mb-6 bg-neutral-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-neutral-200">
                <img
                  src={`https://coreapi.yoowifi.com/jane/esim/${esim.qrCode}`}
                  alt="eSIM QR Code"
                  className="w-[180px] h-[180px] object-contain rounded-lg"
                />
              </div>
              {(esim.planName ||
                esim.iccid ||
                esim.activationCode ||
                esim.smdp) && (
                <div className="text-left bg-red-50 rounded-xl p-4 mb-6">
                  {esim.planName && (
                    <div className="flex justify-between py-1.5 text-sm">
                      <span className="text-neutral-500 font-medium">
                        {t("instantEsim.modal.plan")}
                      </span>
                      <span className="text-neutral-900 font-semibold break-words text-right">
                        {esim.planName}
                      </span>
                    </div>
                  )}
                  {esim.iccid && (
                    <div className="flex justify-between py-1.5 text-sm">
                      <span className="text-neutral-500 font-medium">
                        {t("instantEsim.modal.iccid")}:
                      </span>
                      <span className="text-neutral-900 font-semibold">
                        {esim.iccid}
                      </span>
                    </div>
                  )}
                  {esim.activationCode && (
                    <div className="flex justify-between py-1.5 text-sm">
                      <span className="text-neutral-500 font-medium">
                        {t("instantEsim.modal.activationCode")}
                      </span>
                      <span className="text-neutral-900 font-semibold">
                        {esim.activationCode}
                      </span>
                    </div>
                  )}
                  {esim.smdp && (
                    <div className="flex justify-between py-1.5 text-sm">
                      <span className="text-neutral-500 font-medium">
                        {t("instantEsim.modal.smdp")}
                      </span>
                      <span className="text-neutral-900 font-semibold">
                        {esim.smdp}
                      </span>
                    </div>
                  )}
                </div>
              )}
              {idx < processResponse.length - 1 && (
                <hr className="border-neutral-200 my-5" />
              )}
            </div>
          ))}

          {!isView && (
            <>
              <div className="text-left bg-red-50 rounded-xl p-4 mb-6 mt-4">
                {userName && (
                  <div className="flex justify-between py-1.5 text-sm">
                    <span className="text-neutral-500 font-medium">
                      {t("instantEsim.modal.name")}
                    </span>
                    <span className="text-neutral-900 font-semibold">
                      {userName}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-1.5 text-sm">
                  <span className="text-neutral-500 font-medium">
                    {t("instantEsim.modal.phone")}
                  </span>
                  <span className="text-neutral-900 font-semibold">
                    {countryCode} {localNumber}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 text-sm">
                  <span className="text-neutral-500 font-medium">
                    {t("instantEsim.modal.email")}
                  </span>
                  <span className="text-neutral-900 font-semibold">
                    {email}
                  </span>
                </div>
              </div>

              <p className="text-[13px] text-neutral-500 mb-5">
                {t("instantEsim.modal.emailSent")}
              </p>
            </>
          )}
          <div className="flex gap-3 justify-center">
            <button
              className="bg-neutral-100 text-neutral-700 px-6 py-3 rounded-xl text-[15px] font-semibold hover:bg-neutral-200 transition-colors"
              onClick={onClose}
            >
              {t("instantEsim.modal.close")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EsimModal;
