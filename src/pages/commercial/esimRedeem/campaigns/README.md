# Adding an eSIM redeem campaign

Each campaign is its own URL, translation namespace and coverage list, running
on the shared flow in `../` (landing → register form → final screen). In the
common case you write no new components.

Natas is the exception: it sets `form.Component`, which both supplies a bespoke
form screen and drops the separate landing step, giving a two-screen flow
(claim page → eSIM QR).

## One URL, several campaigns

A campaign is normally picked by its route. Where several share a URL and are
told apart by the voucher, add the rule to `VARIANTS` in `index.js`:

```js
const VARIANTS = {
  esimpartner: [{ prefix: "MYB", campaign: "maybank" }],
};
```

A variant is a full campaign — its own copy, artwork and translation namespace
— and shares only the route and the promo param with its base. Keep
`promo.param` identical between them: the base's param is what reads the code
that then selects the variant.

## How the plan is resolved

Driven by `destination.from`, because the two are the same decision:

| `destination.from` | Destination                                     | Plan comes from                                                                                               |
| ------------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `"user"` (default) | dropdown in the form, limited to `countryCodes` | `fetchLocalPlans` in KolOrder, against that destination — it fills `cart.package` and `cart.variation` itself |
| `"planCountries"`  | none — first country the plan covers            | `getPromoDetail` → `getPlanVariations` up front, before the form                                              |

`"user"` is how the rest of the site works: once a destination is known, ask
localPlans what the promo gives for it. Such a campaign must **not** seed
`cart.package` / `cart.variation` — `fetchLocalPlans` would overwrite them —
and needs `isCallLocalPlans: true` in fsimConfig.

`"planCountries"` exists for Natas, which has no picker and so has no
destination to look plans up by.

## How the flow ends

`completion.mode` picks the last screen, and it also decides whether the eSIM
is activated here — the two always travel together:

| mode              | Activation                          | Final screen                                         |
| ----------------- | ----------------------------------- | ---------------------------------------------------- |
| `"esim"`          | `activateEsim` runs after the order | the eSIM's own QR + SM-DP+ / activation code / ICCID |
| `"app"` (default) | none — order only                   | app-download QR + store badges                       |

Both screens show a QR, but they are not the same thing: an `"app"` campaign
never has `cart.esimDetails`, and its QR installs the Yoowifi app, where the
user then activates.

## 1. Campaign definition

All campaigns live in `campaigns/index.js` — one `defineCampaign` call each,
above the registry:

```js
const <key> = defineCampaign({
  key: "<key>",
  image: { folder: "fsim-banner", name: "<key>-esim-landing" },
  destination: { countryCodes: PARTNER_DESTINATIONS },
  landing: {
    showTerms: true,
    notice: { position: "top", keys: ["redeemWindow"] },
  },
});
```

`defineCampaign` fills in the rest — read its JSDoc for the four knobs that
actually differ between campaigns (`promo`, `plan.variationBy`, `destination`,
`completion.mode`). Destination lists live in `destinations.js` so campaigns
sharing a plan share one list; they're ISO codes, so display names come from
the shared `countries` array already translated.

Set `landing.partnerLogo` for a co-branded "Yoowifi x <partner>" lockup.

Add it to the `campaigns` object in the same file.

## 2. Route

Add to `src/services/routes.jsx` and `src/routes/comRoutes.jsx`, reusing the
one lazy import:

```jsx
{ path: <key>EsimRedeem.path, element: <DynamicComponent Comp={EsimRedeem} campaign="<key>" /> }
```

## 3. fsimConfig entry

`src/components/commercial/FsimPartners/fsimConfig.js` needs a `<key>` entry.
Set `isCallLocalPlans` to match the table above: `true` for a campaign with a
destination dropdown (KolOrder does the lookup), `false` for one that resolved
its plan from the promo code alone (KolOrder would overwrite it).

## 4. Translations

`public/assets/langs/en/translation.json` needs a `<key>EsimRedeem` block. Copy
`natasEsimRedeem` and rewrite the copy — the shared components read every
string from this namespace, so the keys must match exactly, including the three
link-failure messages (`invalidLink`, `planUnavailable`, `missingDestination`).

For an `"app"` campaign the `ready` block drops the QR keys (`qrAlt`,
`saveQrCode`, `smdpAddress`, `activationCode`, `iccid`) and adds
`downloadLabel`. If you list `completion.stepKeys`, each key also needs
`ready.steps.<key>.title` and `.description`.

## 5. Artwork

Drop the landing/form/ready image into `src/assets/images/fsim-banner/` as
`.webp`, named to match the campaign file.

## If a design diverges

Set `landing.Component` for a bespoke landing, or `form.Component` for a
bespoke form screen, rather than adding flags to the shared components.
Setting `form.Component` also removes the separate landing step, so that one
component owns the whole pre-order page — this is how Natas runs on two
screens. Either way the claim itself (field state, createUser, the wait for
the link's plan, the hand-off to ProcessOrder) comes from `useClaimOrder`, so a
bespoke screen only writes markup. The ready screens are driven by the API flow
and shouldn't need this.
