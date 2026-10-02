// Default landing sections, matching the design all campaigns share.
const DEFAULT_LANDING = {
  stepKeys: ["one", "two", "three"],
  features: [
    { key: "fastStable", folder: "fsim-banner", icon: "fast-stable" },
    { key: "supporting5g", folder: "fsim-banner", icon: "5G" },
    { key: "coveringCountries", folder: "fsim-banner", icon: "country-cover" },
  ],
  showSupportFeature: true,
  showTerms: false,
  // "Yoowifi x <partner>" lockup above the hero: { folder, name, alt }.
  partnerLogo: null,
  // Redemption / travel-date note. `position` is "top" for the note above the
  // hero or "cta" for the single line under the button; `keys` are read from
  // `<ns>.landing.<key>`, one line each.
  notice: null,
  // Hero with the artwork on the right instead of the left.
  heroReversed: false,
  // Set to render a bespoke landing instead of the shared one.
  Component: null,
};

/**
 * Fills in everything a campaign doesn't need to state explicitly, so each
 * campaign file is just its identity, its artwork and its destinations.
 *
 * Required from the caller:
 *   key   — unique campaign id. Doubles as the createUser `source` and the
 *           fsimConfig key, so every campaign also needs an fsimConfig entry.
 *           Set its isCallLocalPlans to match `destination` below: true when
 *           the user picks a destination (KolOrder does the lookup), false
 *           when the plan was resolved from the promo code alone.
 *   image — { folder, name } for useDynamicImages, used on all three screens
 *           unless `images` overrides a specific one.
 *
 * Derived unless overridden:
 *   ns                 → `${key}EsimRedeem`, the campaign's translation root.
 *   ready.qrFileName   → `${key}-esim-qr-code.png`.
 *
 * The three knobs that actually differ between campaigns:
 *
 * `promo` — where the voucher code comes from. `param` is the query key
 *   ("promocode", or "annex" for pages that pre-apply a locked promo the way
 *   the rest of the site uses that param). `fixedCode` pins a campaign whose
 *   code never varies, so the link works even without the param.
 *
 * `destination` — where placeOrder's locationCode comes from, and with it how
 *   the plan is resolved at all. The two go together: once we know where the
 *   user is going we ask the localPlans API what that promo gives for that
 *   destination, which is how the rest of the site does it.
 *   "user"          — a country dropdown in the form, limited to
 *                     `countryCodes`. KolOrder then calls fetchLocalPlans,
 *                     which fills cart.package and cart.variation itself, so
 *                     this flow resolves nothing up front.
 *   "planCountries" — no picker, so there is no destination to look plans up
 *                     by. The promo code is resolved to a plan directly
 *                     (getPromoDetail → getPlanVariations) and the first
 *                     covered country stands in as locationCode.
 *
 * `plan.variationBy` — only used by "planCountries" campaigns, which pick a
 *   tier themselves. "varid" matches the link's varid exactly and fails if it's
 *   absent; "first" takes the only tier these single-package promos return.
 *   Pin `plan.variationId` to be explicit.
 *
 * `completion.mode` — how the flow ends, and whether the eSIM is activated
 *   here at all; the two always travel together:
 *   "esim" — activate, then show the eSIM QR and manual install details.
 *   "app"  — place the order only, then show the app-download QR and send the
 *            user to the Yoowifi app to activate.
 */
export default function defineCampaign({
  key,
  ns,
  image,
  images,
  promo,
  plan,
  destination,
  coverage = null,
  landing,
  form,
  ready,
  completion,
}) {
  return {
    key,
    ns: ns || `${key}EsimRedeem`,
    images: {
      hero: image,
      form: image,
      ready: image,
      ...images,
    },
    promo: {
      param: "promocode",
      fixedCode: null,
      ...promo,
    },
    plan: {
      variationBy: "first",
      variationId: null,
      ...plan,
      // Derived, never set by hand: a campaign that asks for a destination
      // resolves its plan through localPlans; one that can't ask resolves it
      // from the promo code alone.
      source:
        (destination?.from ?? "user") === "user" ? "localPlans" : "promoDetail",
    },
    destination: {
      from: "user",
      countryCodes: [],
      ...destination,
    },
    // Only the campaigns whose landing shows coverage pills set this.
    coverage: coverage && { variant: "pills", ...coverage },
    landing: {
      ...DEFAULT_LANDING,
      ...landing,
    },
    form: {
      phoneDefaultCountry: "sg",
      // A bespoke form screen. Setting it also drops the separate landing
      // step — the component is expected to carry that content itself, which
      // is how Natas runs as a two-screen flow (see ../index.jsx).
      Component: null,
      ...form,
    },
    ready: {
      qrFileName: `${key}-esim-qr-code.png`,
      ...ready,
    },
    completion: {
      mode: "app",
      // The app-download QR on an "app" campaign's final screen. Not an eSIM
      // QR — scanning it installs the Yoowifi app, where activation happens.
      // Which listing it points at is per storefront, so `qrImage` is the
      // default and `qrImageByCountry` overrides it for the storefronts with
      // their own app QR, keyed by the same country code the /id URL uses.
      qrImage: { folder: "fsim-banner", name: "Sg-app-QR" },
      qrImageByCountry: {
        id: { folder: "fsim-banner", name: "Yoowifi-ID-App-QR" },
      },
      // Optional numbered "activate in the app" steps on an "app" campaign's
      // final screen; keys must exist under `<ns>.ready.steps`.
      stepKeys: [],
      ...completion,
    },
  };
}
