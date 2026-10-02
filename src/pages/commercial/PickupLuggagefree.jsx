import { PickupAddressList } from "@/components/commercial/pickup";
import { LUGGAGEFREE_ADDRESSES } from "@/components/commercial/pickup/pickupAddresses";
import LandingHero from "@/components/shared/others/LandingHero";

const PAGE_KEY = "pickupLuggagefree";

function PickupLuggagefree() {
  return (
    <div className="overflow-hidden w-full">
      <LandingHero showGradient={true} pageKey={PAGE_KEY} />
      <PickupAddressList
        addresses={LUGGAGEFREE_ADDRESSES}
        hideNavigateButton={true}
      />
    </div>
  );
}

export default PickupLuggagefree;
