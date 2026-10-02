import Products from "@/components/commercial/home/Products";
import SimDataPlan from "@/components/commercial/pocketWifiDetails/SimDataPlan";
import SimESim from "@/components/commercial/pocketWifiDetails/SimESim";
import UnlimitedDayPass from "@/components/commercial/pocketWifiDetails/UnlimitedDayPass";
import CollaborateMarquee from "@/components/shared/CollaborateMarquee";
import CustomerTestimonial from "@/components/shared/others/CustomerTestimonial";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { useSelector } from "react-redux";

const PocketWifiDetails = () => {
  const {
    simDataPlan,
    pocketWifiDayPass,
    restOfTheWorldDayPass,
    regionalCountries,
  } = useSelector((state) => state.dataPlan);

  const { currentCountry, isTargetCountry } = useUserLocationLanguage();

  return (
    <div className="overflow-hidden w-full">
      <SimESim type="D" />
      <UnlimitedDayPass
        pocketWifiDayPass={pocketWifiDayPass}
        restOfTheWorldDayPass={restOfTheWorldDayPass}
        regionalCountries={regionalCountries}
      />
      {!isTargetCountry && <Products type='D' showProductDeadline />}
      <CustomerTestimonial />
      {/* <SimDataPlan simDataPlan={simDataPlan} /> */}
      <CollaborateMarquee />
    </div>
  );
};

export default PocketWifiDetails;
