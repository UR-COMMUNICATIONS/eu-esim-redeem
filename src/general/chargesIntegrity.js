import forge from "node-forge";

const CERTIFICATE_PEM = `-----BEGIN CERTIFICATE-----
MIIEdTCCAt2gAwIBAgIIa4KPApLDSg8wDQYJKoZIhvcNAQELBQAwaTELMAkGA1UE
BhMCc2cxEjAQBgNVBAgTCXNpbmdhcG9yZTESMBAGA1UEBxMJc2luZ2Fwb3JlMQ8w
DQYDVQQKEwZ1cndpZmkxDzANBgNVBAsTBnVyd2lmaTEQMA4GA1UEAxMHeW9vd2lm
aTAeFw0yNjA4MTgwNzEwMjZaFw0zNjA4MTUwNzEwMjZaMGkxCzAJBgNVBAYTAnNn
MRIwEAYDVQQIEwlzaW5nYXBvcmUxEjAQBgNVBAcTCXNpbmdhcG9yZTEPMA0GA1UE
ChMGdXJ3aWZpMQ8wDQYDVQQLEwZ1cndpZmkxEDAOBgNVBAMTB3lvb3dpZmkwggGi
MA0GCSqGSIb3DQEBAQUAA4IBjwAwggGKAoIBgQC4PYgEqCP+Hw/p2xZItVIscblW
uj14cqc2KH3rxy4XYWp69Ok00V4tiSplgbCsVa9vQfFuOf7+5GuWs29ZyE38eQJb
Eyu3tyV/BNBgm6DwWDechBYqKjh8Paz+kCEFD9FSwqGNTryGgtfLZK/bP7Um7bAR
+dddOhzG9+7K4wYsrvuAKOEKJ1/3OV2aMntJqfFUf6QdIU6BIex+H3tepyze2q5o
Wqo0DHvtyCmGDK9lBAiBNykZ4/ZKYYz49DDHkf/izvc7RzbrLCgo+TiG0Vvp4Xdq
qnY9VLywd9NXcOMEHDjYjaf9FPfjyKRnoQaLpHhYjTwBqiNKUNkiV4nn/D8Srir4
TLJXZKheQVLkuhVqVO7u28zYxZynEaPsOC5ZBcGjDYzNyX8MhNefkn2x+DaknvpC
rAv/Sg2ia8q6rWLgL19TDff4R6m2669gnuccPNmXxOFyrK7TUWP3bgRFDiex3Cte
ISdlcl9PR701XgD1YjyvMeDFl4XYTTFjZOETzOECAwEAAaMhMB8wHQYDVR0OBBYE
FNiKeISGmHlPnQE07mcTsPZeug5dMA0GCSqGSIb3DQEBCwUAA4IBgQArBsn6zAw1
mpAF9AFAfFVTcucaqcT9WACxuorrF+CBdogVKs36d724pYQ91ayP72CtFiktPw1V
l8xT2TQj7Y87E2UXbyaWy8GGljzldXIqzdHlty7RO9834KhWQRpRI/ei8mE1L8OI
+DpyrRywIku3J4MoLrXLNaD7LJEWLRbeQgcdBmqQEZKPrFUCOVEwcXskAufE/8TK
cT5BR5z33cMXUEqqbG+Bev85al8EWg3UzLnIgjo5+syBNXb+avXXckMonX6cngzP
uZisfduRltru9foc4HJ8aqLiirQ46XVDM7LrPfEjReayktrWxkSk9T7j/WY/c0Ey
CRO++lXc0gz1TFb8gp6tO2JrE93w3wSp6eFxYVOb0KoBRFAgAOlnK+wr4N+0Mz7O
18Or3155DD1ZmLbxtz4NL2XsmUcByTyChNK3fUCpD8TtcJNghf0q0A1LhzCHDDHj
k259w5bQACe/S4oQZujDpyOt8Tay7tQJr+bmlACx/xZ6LzS4IqpT7A8=
-----END CERTIFICATE-----`;

// Parse the certificate once at module load — not per-call.
const _cert = forge.pki.certificateFromPem(CERTIFICATE_PEM);
const _publicKey = forge.pki.publicKeyFromPem(
  forge.pki.publicKeyToPem(_cert.publicKey),
);

// In-memory registry of pending charges requests.
// Key: requestId (string)   Value: { variationId, startDate, endDate, quantity }
// Lives only in JS heap — the network layer cannot read or modify this.
// Entries are deleted immediately after verification (single-use).
const _pendingRequests = new Map();

/**
 * Register a charges request before it fires.
 * Must be called with the same requestId that is sent in the request body.
 * The registry is the only trusted source for requestId during verification —
 * anything the response claims about requestId is ignored.
 *
 * @param {string} requestId
 * @param {{ variationId: number, startDate: string, endDate: string, quantity: number }} request
 */
export function registerChargesRequest(requestId, request) {
  _pendingRequests.set(requestId, {
    variationId: request.variationId,
    startDate: request.startDate,
    endDate: request.endDate,
    quantity: request.quantity,
  });
}

function canonicalMessage(
  requestId,
  chargesStr,
  variationId,
  startDate,
  endDate,
  quantity,
) {
  return `${requestId}|${chargesStr}|${variationId}|${startDate}|${endDate}|${quantity}`;
}

/**
 * Verify the RSA-SHA256 signature on a charges response.
 *
 * @param {string} requestId
 * @param {{ variationId: number, startDate: string, endDate: string, quantity: number }} request
 * @param {object} response  - Raw API response (chargesStr, signature)
 * @returns {{ ok: boolean, error?: string }}
 */
export function verifyChargesSignature(requestId, request, response) {
  try {
    const message = canonicalMessage(
      requestId,
      response.chargesStr,
      request.variationId,
      request.startDate,
      request.endDate,
      request.quantity,
    );

    console.log("[ChargesIntegrity] verifying canonical message:", message);

    const md = forge.md.sha256.create();
    md.update(message, "utf8");

    const ok = _publicKey.verify(
      md.digest().getBytes(),
      forge.util.decode64(response.signature),
    );

    return ok ? { ok: true } : { ok: false, error: "signature_mismatch" };
  } catch (error) {
    console.error("[ChargesIntegrity] verify_error:", error);
    return { ok: false, error: "verify_error" };
  }
}

/**
 * Intercept a raw ORDER_CHARGES API response and verify its signature.
 *
 * The requestId and request params are read exclusively from the in-memory
 * registry — never from the response. This means an attacker who tampers with
 * the response (including any requestId field it echoes back) cannot influence
 * what we verify against. The registry entry is deleted after use so the same
 * requestId cannot be replayed.
 *
 * @param {object} response    Raw API response
 * @param {string} requestId   The requestId that was passed to registerChargesRequest
 * @returns {{ response: object, verified: boolean, integrityError?: string }}
 */
export function interceptChargesResponse(response, requestId) {
  if (!response?.result || !response?.charges) {
    return { response, verified: true };
  }

  if (!response.signature) {
    _pendingRequests.delete(requestId);
    console.error("[ChargesIntegrity] FAILED — missing_signature", {
      requestId,
    });
    return { response, verified: false, integrityError: "missing_signature" };
  }

  const request = _pendingRequests.get(requestId);
  // Always delete — one use only, regardless of outcome.
  _pendingRequests.delete(requestId);

  if (!request) {
    console.error("[ChargesIntegrity] FAILED — unregistered_request", {
      requestId,
      hint: "No matching registerChargesRequest call found. Possible replay or forged response.",
    });
    return {
      response,
      verified: false,
      integrityError: "unregistered_request",
    };
  }

  const { ok, error } = verifyChargesSignature(requestId, request, response);

  if (ok) {
    console.log("[ChargesIntegrity] OK", {
      requestId,
      chargesStr: response.chargesStr,
    });
  } else {
    const builtMessage = `${requestId}|${"0.1" || response.chargesStr}|${request.variationId}|${request.startDate}|${request.endDate}|${request.quantity}`;
    console.error("[ChargesIntegrity] FAILED —", error, {
      builtMessage,
      requestId,
      chargesStr: response.chargesStr,
      variationId: request.variationId,
      startDate: request.startDate,
      endDate: request.endDate,
      quantity: request.quantity,
      signature: response.signature,
    });
  }

  return { response, verified: ok, integrityError: ok ? undefined : error };
}
