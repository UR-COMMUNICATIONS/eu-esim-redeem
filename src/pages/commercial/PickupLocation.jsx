import { PickupAddressList } from "@/components/commercial/pickup";
import { Furama_ADDRESSES } from "@/components/commercial/pickup/pickupAddresses";
import LandingHero from "@/components/shared/others/LandingHero";

const PAGE_KEY = "pickupFurama";

function PickupLocation() {
  return (
    <div className="overflow-hidden w-full">
      <LandingHero showGradient={true} pageKey={PAGE_KEY} />
      <PickupAddressList addresses={Furama_ADDRESSES} hideNavigateButton />
    </div>
  );
}

export default PickupLocation;
