import { encryptData } from "@/general/encryption";
import { hostServices } from "@/general/host.services";

// Fetches a bearer token for an ALREADY-EXISTING account, given the same
// identifier (email or phone) the rest of this API family accepts as
// `userId`. This proves nothing about who is asking — it is not a substitute
// for verifying identity, only a way to obtain a session token once an
// account is already known to exist (e.g. one this same request just
// created). Returns null on any failure rather than throwing, so callers can
// fall back to error UI instead of an unhandled rejection.
export async function fetchStateDataToken({ userId, source }) {
  const res = await fetch(`${hostServices.host}/user/getStateData`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: encryptData({ userId, source }),
      platform: "web",
      security: "",
    }),
  });
  const json = await res.json();
  if (!json?.status?.result || !json?.token) return null;
  return { token: json.token, appUserId: json.user?.appUserId ?? null };
}
