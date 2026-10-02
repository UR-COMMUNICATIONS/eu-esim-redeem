import { PickupAddressList } from "@/components/commercial/pickup";
import { REGUS_ADDRESSES } from "@/components/commercial/pickup/pickupAddresses";
import LandingHero from "@/components/shared/others/LandingHero";

const PAGE_KEY = "pickupRegus";

function PickupRegus() {
  return (
    <div className="overflow-hidden w-full">
      <LandingHero showGradient={true} pageKey={PAGE_KEY} />
      <PickupAddressList
        addresses={REGUS_ADDRESSES}
        hideNavigateButton={true}
      />
    </div>
  );
}

export default PickupRegus;
