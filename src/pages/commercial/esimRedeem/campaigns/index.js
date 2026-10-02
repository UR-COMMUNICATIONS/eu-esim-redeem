import defineCampaign from "./defineCampaign";
import { PARTNER_DESTINATIONS, YW3GB_DESTINATIONS } from "./destinations";
import NatasClaim from "../NatasClaim";

/**
 * Every voucher-driven eSIM redeem campaign, defined in one place because a
 * campaign is only ever its identity, its artwork and its three or four knobs
 * — see ./defineCampaign.js for what those knobs mean and ./README.md for the
 * other four things a new campaign needs (route, fsimConfig, translations,
 * artwork).
 */

// /natas/esim-redeem?promocode=XXX&varid=N — the odd one out. It runs as two
// screens rather than three (the landing content sits on the form itself, see
// ../NatasClaim.jsx), the link's varid picks the tier, and the eSIM is
// activated here rather than in the app.
//
// It shows no coverage pills: what the plan covers is read off the link — the
// countries planCountriesList returns for the resolved plan — so a South East
// Asia voucher and a Europe voucher describe themselves correctly without a
// hardcoded region list. (The old static `regions` array, including the
// Indonesia-only Saudi Arabia and SMT boxes, is in git history if the pills
// are ever wanted back.)
const natas = defineCampaign({
  key: "natas",
  image: { folder: "fsim-banner", name: "natas-esim-landing" },
  plan: { variationBy: "varid" },
  destination: { from: "planCountries" },
  landing: { showTerms: true },
  form: { Component: NatasClaim },
  completion: { mode: "esim" },
});

// /EU/esim-redeem?promocode=XXX&varid=N — this app's campaign. Same two-screen
// flow and design as Natas for now (its artwork too, until EU's own is ready);
// its copy lives under `euEsimRedeem` in the language files.
const eu = defineCampaign({
  key: "eu",
  image: { folder: "fsim-banner", name: "natas-esim-landing" },
  plan: { variationBy: "varid" },
  destination: { from: "planCountries" },
  landing: { showTerms: true },
  form: { Component: NatasClaim },
  completion: { mode: "esim" },
});

// /yw3gb?annex=YW3GB — the promo never varies, so the param is really just the
// site's usual "locked promo" marker and the code is pinned here as well.
const yw3gb = defineCampaign({
  key: "yw3gb",
  image: { folder: "fsim-banner", name: "natas-esim-landing" },
  promo: { param: "annex", fixedCode: "YW3GB" },
  destination: { countryCodes: YW3GB_DESTINATIONS },
  landing: { heroReversed: true, showTerms: true },
});

// /natas/esimpartner-redeem?promocode=XXXXXX — the generic travel-agency page.
// The promo code varies per voucher, so nothing is pinned.
const esimpartner = defineCampaign({
  key: "esimpartner",
  image: { folder: "fsim-banner", name: "natas-esim-landing" },
  destination: { countryCodes: PARTNER_DESTINATIONS },
  landing: {
    showTerms: true,
    notice: { position: "top", keys: ["redeemWindow", "travelDates"] },
  },
});

// The Maybank variant of the travel-agency page: same URL, same plan, same
// flow as `esimpartner` — the MYB* promo code is what selects it (see VARIANTS
// below) — with the "Yoowifi x Maybank" lockup and its own copy.
const maybank = defineCampaign({
  key: "maybank",
  image: { folder: "fsim-banner", name: "natas-esim-landing" },
  destination: { countryCodes: PARTNER_DESTINATIONS },
  landing: {
    showTerms: true,
    notice: { position: "cta", keys: ["redeemWindow"] },
    partnerLogo: {
      folder: "fsim-banner",
      name: "maybank-logo",
      alt: "Maybank",
    },
  },
  form: { phoneDefaultCountry: "my" },
});

/**
 * Keyed by the `campaign` prop the route passes to the shared flow
 * (src/pages/commercial/esimRedeem/index.jsx).
 */
export const campaigns = {
  eu,
  natas,
  yw3gb,
  esimpartner,
  maybank,
};

/**
 * Campaigns that share a URL and are told apart by the voucher itself: all the
 * travel-agency codes hit /natas/esimpartner-redeem, and only the MYB* ones are
 * Maybank's. A variant is a full campaign — its own copy, artwork and
 * translation namespace — so the only thing it shares with its base is the
 * route and the promo param those links carry.
 */
const VARIANTS = {
  esimpartner: [{ prefix: "MYB", campaign: "maybank" }],
};

/**
 * `promoCode` is optional: pass it to get the variant a voucher belongs to,
 * omit it to get the base campaign (which is what tells you the promo param to
 * read in the first place — variants always share it with their base).
 */
export const getCampaign = (key, promoCode) => {
  const base = campaigns[key];
  if (!base) return null;
  const code = promoCode?.trim().toUpperCase();
  if (!code) return base;
  const variant = (VARIANTS[key] || []).find((v) =>
    code.startsWith(v.prefix.toUpperCase()),
  );
  return variant ? campaigns[variant.campaign] || base : base;
};
