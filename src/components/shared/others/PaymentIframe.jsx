import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";

/**
 * Reusable Payment Iframe Component for handling 3DS payment flows
 * @param {string} paymentUrl - The redirect URL from payment gateway
 * @param {function} onSuccess - Callback when payment is confirmed successful (after redirect/completion)
 * @param {function} onClose - Callback when iframe is closed without completion
 * @param {string} returnUrl - The return URL that payment gateway redirects to after payment
 * @param {string} title - Dialog title (optional)
 */
function PaymentIframe({
  paymentUrl,
  onSuccess,
  onClose,
  returnUrl = "https://yoowifi.com",
  title = "Complete Payment",
  // For off-domain channels (QRIS / IMBANK / Alipay) the gateway never returns
  // to us, so we cannot auto-detect success. When orderOnExit is true, ANY way
  // the user finishes/leaves the payment window places the order (via onClose),
  // and we drop the discouraging "Cancel Payment?" confirmation — instead the
  // user explicitly confirms they have paid.
  orderOnExit = false,
  paymentMethod = "",
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const iframeRef = useRef(null);
  const redirectDetectedRef = useRef(false);

  // Mark the order as placed once and route to the right callback. For
  // off-domain channels (QRIS/IMBANK/Alipay) success means "place the order"
  // via onClose (2C2P never returns to us to confirm); for card it's onSuccess.
  const completeOnce = (reason) => {
    if (redirectDetectedRef.current) return;
    redirectDetectedRef.current = true;
    console.log("PaymentIframe complete:", reason);
    if (orderOnExit) {
      onClose?.();
    } else {
      onSuccess?.();
    }
  };

  useEffect(() => {
    // Listen for postMessage from the payment gateway.
    //
    // 2C2P's official iframe integration posts a structured message with
    // `paymentResult.respCode`:
    //   "2000" = payment approved
    //   "1001" = an external redirect (3DS / FPX / wallet) is required, with the
    //            target URL in respData — FPX/PayNet forbid iframes, so we must
    //            break OUT of the iframe and load that URL at the top level.
    // (See 2C2P "Using iFrame" + PayNet browser-redirection docs.) We also keep
    // our own loose success checks for the server.js /payment-return page.
    const handleMessage = (event) => {
      const data = event.data;

      // --- 2C2P official format ---
      const paymentResult = data?.paymentResult || data;
      const respCode = paymentResult?.respCode;
      const respData = paymentResult?.respData;

      if (respCode === "2000") {
        completeOnce("2c2p respCode 2000");
        return;
      }
      // Mandated external redirect (FPX/wallet). Only redirect inside the
      // iframe for off-domain channels (QRIS/IMBANK/Alipay). We must NOT
      // break out to the top-level window — that navigates the user away from
      // our site and we lose all control. Instead, load the redirect URL inside
      // the iframe so the user completes payment there, then taps
      // "I've Paid — Complete Order" to place the order.
      if (orderOnExit && respCode === "1001" && respData) {
        console.log(
          "2c2p respCode 1001 (non-card) - loading inside iframe:",
          respData,
        );
        if (iframeRef.current) {
          iframeRef.current.src = respData;
        }
        return;
      }

      // --- our loose / server.js success indicators ---
      const isSuccess =
        data === "paymentCompleted" ||
        data === "success" ||
        data?.status === "success" ||
        data?.result === "success" ||
        (data?.type === "yoowifi-payment" && data?.status === "success") ||
        (typeof data === "string" && data.toLowerCase().includes("success"));

      if (isSuccess) {
        completeOnce("postMessage success");
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [onSuccess, onClose, orderOnExit]);

  // For QRIS/Alipay: poll pgw.dp.alipay.com/transactionStatus directly from the
  // parent window using the paymentToken extracted from the redirectURL hash.
  // The Alipay iframe does the same polling internally — when payment completes,
  // the response includes paymentResultDetails.frontendReturnData (base64 JSON)
  // with respCode "2000". We decode it here and fire completeOnce immediately,
  // before the iframe even POSTs to fpx.org. This auto-closes the dialog without
  // requiring the manual "I've Paid" button.
  useEffect(() => {
    if (!orderOnExit || !paymentUrl) return;

    // Extract token from URLs like:
    //   https://pgw-ui.dp.alipay.com/payment/4.3/#/token/<TOKEN>
    const tokenMatch = paymentUrl.match(/#\/token\/(.+)$/);
    if (!tokenMatch) return;

    const paymentToken = decodeURIComponent(tokenMatch[1]);
    const clientID = `yoowifi-${Date.now()}`;

    const poll = async () => {
      if (redirectDetectedRef.current) return;
      try {
        const res = await fetch(
          "https://pgw.dp.alipay.com/payment/4.3/transactionStatus",
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "content-type": "application/json",
              "access-control-allow-origin": "*",
              "x-pgw-api-type": "UI",
              "x-pgw-client-type": "WEB",
              "x-pgw-client-version": "4.3",
              "x-pgw-client-os": `chrome-web`,
              "x-pgw-client-additional-info": JSON.stringify({
                browserLanguage: navigator.language,
                browserScreenWidth: window.screen.width,
                browserScreenHeight: window.screen.height,
                browserColorDepth: window.screen.colorDepth,
                browserTZ: new Date().getTimezoneOffset(),
                browserJavaEnabled: false,
                browserJavaScriptEnabled: true,
              }),
            },
            body: JSON.stringify({
              paymentToken,
              additionalInfo: true,
              clientID,
            }),
          },
        );
        const json = await res.json();
        const returnData =
          json?.additionalInfo?.paymentResultDetails?.frontendReturnData;
        if (returnData) {
          const decoded = JSON.parse(atob(returnData));
          if (decoded?.respCode === "2000") {
            completeOnce("alipay transactionStatus respCode 2000");
          }
        }
      } catch (_) {
        // Network error — keep polling
      }
    };

    const interval = setInterval(poll, 3000);
    return () => clearInterval(interval);
  }, [orderOnExit, paymentUrl]);

  // Poll the iframe URL to detect the gateway returning to our origin.
  //
  // IMPORTANT (the real mechanism): after payment, 2C2P/Alipay does a cross-site
  // POST to our returnUrl (/payment-return). Behind CloudFront that POST is
  // rejected with 405 ("Method Not Allowed") because the edge only allows
  // GET/HEAD — so the iframe ends up showing a 405 page, BUT that page is at
  // OUR origin (https://<origin>/payment-return). Once the iframe is same-origin
  // we CAN read its location.href (no CORS), even though the page is a 405.
  //
  // So we don't need the POST body or a server handler: detecting that the
  // iframe URL became /payment-return is itself the "payment finished" signal,
  // and the parent already holds the invoiceNo it created the session with. We
  // fire onSuccess and let the parent place the order.
  useEffect(() => {
    if (!paymentUrl) return;

    const currentOrigin = window.location.origin;

    const fireIfReturned = (source) => {
      let iframeUrl = null;
      try {
        iframeUrl = iframeRef.current?.contentWindow?.location?.href || null;
      } catch (e) {
        // Still on the gateway's domain (cross-origin) — can't read URL. This is
        // expected while on 2C2P / alipay / fpx.
        return false;
      }

      const isOurReturn =
        iframeUrl &&
        (iframeUrl.includes("/payment-return") ||
          iframeUrl.includes(currentOrigin) ||
          iframeUrl.includes("yoowifi.com") ||
          (returnUrl && iframeUrl.includes(returnUrl)));

      if (isOurReturn && !redirectDetectedRef.current) {
        completeOnce(`returned to our origin (${source}): ${iframeUrl}`);
        return true;
      }
      return false;
    };

    const checkIframeUrl = setInterval(() => {
      if (fireIfReturned("poll")) clearInterval(checkIframeUrl);
    }, 300);

    return () => clearInterval(checkIframeUrl);
  }, [paymentUrl, returnUrl, onSuccess]);

  const loadCountRef = useRef(0);

  const handleIframeLoad = () => {
    setIsLoading(false);
    loadCountRef.current += 1;

    try {
      const iframeUrl = iframeRef.current?.contentWindow?.location?.href;
      const currentOrigin = window.location.origin;

      const isOurDomain =
        iframeUrl &&
        (iframeUrl.includes("/payment-return") ||
          iframeUrl.includes(currentOrigin) ||
          iframeUrl.includes("yoowifi.com") ||
          (returnUrl && iframeUrl.includes(returnUrl)));

      if (isOurDomain && !redirectDetectedRef.current) {
        completeOnce("already on our domain (load)");
        return;
      }
    } catch (e) {
      // Cross-origin — can't read URL, expected while on payment gateway domain
    }

    // QRIS only: after the user pays (or cancels), Alipay POSTs to fpx.org
    // which triggers a second iframe load. That second load is the signal the
    // user is done — we place the order. This does NOT apply to IMBT because
    // IMBT has multiple intermediate page loads (bank selection, details, OTP)
    // before the final redirect, so load count is not a reliable signal there.
    if (
      orderOnExit &&
      paymentMethod === "QRIS" &&
      loadCountRef.current >= 2 &&
      !redirectDetectedRef.current
    ) {
      completeOnce("second iframe load — QRIS payment flow complete (fpx.org)");
    }
  };

  const handleCloseAttempt = () => {
    // For off-domain channels, closing the window means the user is done paying
    // (the gateway won't tell us). Place the order directly instead of showing
    // a cancel confirmation that would discard it.
    if (orderOnExit) {
      completeOnce("off-domain window closed");
      return;
    }
    // Card flow: confirm before closing without completion.
    setShowCancelConfirmation(true);
  };

  const confirmCancel = () => {
    setShowCancelConfirmation(false);
    // If the payment already completed (order placed), a cancel is a no-op —
    // don't run onClose again (which would re-trigger close handling).
    if (redirectDetectedRef.current) return;
    onClose?.();
  };

  const cancelClose = () => {
    setShowCancelConfirmation(false);
  };

  // Manual "I've paid" button — the PRIMARY way the order gets placed for
  // off-domain channels when we can't auto-detect success.
  const handleManualComplete = () => {
    completeOnce("manual confirm");
  };

  return (
    <>
      <Dialog
        open={!!paymentUrl}
        onOpenChange={(next) => {
          // Only react to a close request (X / overlay click). Keep the payment
          // dialog mounted so the iframe is NOT destroyed+reloaded (which would
          // start a brand-new payment session). We just overlay the cancel
          // confirmation on top.
          if (!next) handleCloseAttempt();
        }}
      >
        <DialogContent
          showCloseIcon={true}
          className="w-[calc(100vw-32px)] max-w-[900px] h-[calc(100vh-32px)] max-h-[700px] flex flex-col p-0 bg-white"
        >
          <div className="p-4 md:p-6 border-b flex items-center justify-between">
            <DialogTitle className="text-lg md:text-xl font-bold text-black-900">
              {title}
            </DialogTitle>
          </div>

          <div className="flex-1 relative overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                <Loader
                  type="Oval"
                  color="#FFC117"
                  height={"18vw"}
                  width={"18vw"}
                  className="max-h-[100px] max-w-[100px] min-h-[60px] min-w-[60px]"
                />
              </div>
            )}

            <iframe
              ref={iframeRef}
              src={paymentUrl}
              className="w-full h-full border-0"
              title="Payment Gateway"
              onLoad={handleIframeLoad}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
          </div>

          {/* Footer with manual completion button */}
          <div className="p-4 md:p-6 border-t bg-gray-50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-sm text-gray-600">
                {orderOnExit
                  ? "After you finish paying in the window above, tap the button to confirm and complete your order."
                  : "Complete your payment in the window above. The page will automatically proceed once payment is confirmed."}
              </p>
              <Button
                onClick={handleManualComplete}
                className="bg-[#FFC117] hover:bg-[#e6ad15] text-black-900 font-semibold px-6 py-2 rounded-lg whitespace-nowrap"
              >
                {orderOnExit
                  ? "I've Paid — Complete Order"
                  : "I've Completed Payment"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Cancellation */}
      <Dialog open={showCancelConfirmation} onOpenChange={cancelClose}>
        <DialogContent className="w-[calc(100vw-32px)] max-w-[400px]">
          <DialogTitle className="text-lg font-bold text-black-900">
            Cancel Payment?
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            Are you sure you want to close the payment window? Your payment may
            not be processed if you haven't completed it.
          </p>
          <div className="flex gap-3 mt-6 justify-end">
            <Button
              onClick={cancelClose}
              variant="outline"
              className="px-4 py-2"
            >
              Continue Payment
            </Button>
            <Button
              onClick={confirmCancel}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2"
            >
              Cancel Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PaymentIframe;
