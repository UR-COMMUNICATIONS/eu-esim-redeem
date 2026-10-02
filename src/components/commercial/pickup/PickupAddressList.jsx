import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AddressCard from "./AddressCard";

function PickupAddressList({
  addresses: addressesProp,
  onNavigate,
  hideNavigateButton,
}) {
  const { t } = useTranslation();
  const addresses = addressesProp ?? [];

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16 space-y-4">
          <h1 className="font-['DMSans'] font-bold text-[40px] md:text-[64px] leading-[120%] text-[#191919]">
            {t("pickup.returnAddressTitle") || "Return Address"}
          </h1>
          <p className="font-['DMSans'] font-normal text-[18px] leading-[140%] text-gray-500 max-w-2xl mx-auto">
            {t("pickup.returnAddressSubtitle") ||
              "Choose Your Dream Destination and Perfect Package Now"}
          </p>
        </header>

        <div className="bg-[#F8F8F8] rounded-[40px] p-10">
          <div
            className={`grid gap-6 ${addresses.length === 1 ? "grid-cols-1 max-w-2xl mx-auto" : "grid-cols-1 md:grid-cols-2"}`}
          >
            {addresses.map((addr) => (
              <AddressCard
                key={addr.id}
                {...addr}
                onNavigate={onNavigate}
                hideNavigateButton={hideNavigateButton}
              />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              to="/product/internet-packages"
              className="inline-block bg-[#FFC400] hover:bg-[#e6b000] text-black font-['DMSans'] font-bold text-[16px] leading-[120%] px-10 py-4 rounded-2xl transition-colors duration-200"
            >
              Rent Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PickupAddressList;
