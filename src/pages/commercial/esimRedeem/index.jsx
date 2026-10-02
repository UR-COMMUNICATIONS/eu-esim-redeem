import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Landing from "./Landing";
import RegisterForm from "./RegisterForm";
import EsimReadyPage from "./EsimReadyPage";
import AppReadyPage from "./AppReadyPage";
import usePromoVariationPlan from "./usePromoVariationPlan";
import { getCampaign } from "./campaigns";

// How the flow ends, per campaign.completion.mode: either the eSIM is
// activated here and its own QR shown, or the order is placed and activation
// is handed off to the Yoowifi app (whose QR is a download link, not an eSIM).
// Stable placeholder so the hook still runs when a route names a campaign that
// doesn't exist; React won't let us call it conditionally.
const NO_CAMPAIGN = { plan: {}, destination: {} };

const COMPLETION_SCREENS = {
  esim: EsimReadyPage,
  app: AppReadyPage,
};

/**
 * Shared voucher-driven eSIM claim flow, used by every campaign landing page.
 * The route picks the campaign:
 *
 *   <DynamicComponent Comp={EsimRedeem} campaign="maybank" />
 *
 * The link's promo code determines the plan and package; where the user is
 * travelling comes either from the form's dropdown or, for campaigns without
 * one, from the first country the plan covers.
 *
 * The screens are internal step state rather than separate routes, so the
 * final screen can't be opened directly without an order. A campaign that
 * carries its landing content on the form screen (`form.Component`) has two
 * screens rather than three and starts on the form.
 */
export default function EsimRedeem({ campaign: campaignKey }) {
  const [searchParams] = useSearchParams();

  // Two steps, because the promo code is both an input to the campaign lookup
  // and something only the campaign can tell us how to read: the base campaign
  // names the query param ("promocode", or "annex" for pages that pre-apply a
  // locked promo), then the code itself picks the variant. Variants always
  // share their base's param, so the first read is never wrong.
  const baseCampaign = getCampaign(campaignKey);
  const promoCode = baseCampaign
    ? searchParams.get(baseCampaign.promo.param) || baseCampaign.promo.fixedCode
    : null;
  const campaign = getCampaign(campaignKey, promoCode);
  const varid = searchParams.get("varid");

  // A campaign whose form screen also carries its landing content — Natas —
  // has no separate landing step to start on.
  const [step, setStep] = useState(() =>
    campaign?.form.Component ? "form" : "landing",
  );
  const {
    status: planStatus,
    errorCode: planErrorCode,
    result: planResult,
    resolve,
  } = usePromoVariationPlan(campaign || NO_CAMPAIGN);

  // Only campaigns without a destination picker resolve anything here: with a
  // destination the plan is looked up during the order step instead, against
  // the country the user chose. For the rest, resolving in the background as
  // the page loads surfaces a bad link before they've filled anything in.
  useEffect(() => {
    if (!campaign || campaign.plan.source !== "promoDetail") return;
    resolve(promoCode, varid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaign, promoCode, varid]);

  // Only reachable by adding a route without its campaign file.
  if (!campaign) {
    console.error(`Unknown eSIM redeem campaign: "${campaignKey}"`);
    return null;
  }

  if (step === "landing") {
    const LandingComponent = campaign.landing.Component || Landing;
    return (
      <LandingComponent
        campaign={campaign}
        onContinue={() => setStep("form")}
      />
    );
  }

  if (step === "ready") {
    const ReadyScreen = COMPLETION_SCREENS[campaign.completion.mode];
    return <ReadyScreen campaign={campaign} />;
  }

  const FormComponent = campaign.form.Component || RegisterForm;

  return (
    <FormComponent
      campaign={campaign}
      promoCode={promoCode}
      planStatus={planStatus}
      planErrorCode={planErrorCode}
      planResult={planResult}
      onReady={() => setStep("ready")}
    />
  );
}
