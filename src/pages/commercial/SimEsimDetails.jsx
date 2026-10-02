import Products from "@/components/commercial/home/Products";
import SimESim from "@/components/commercial/pocketWifiDetails/SimESim";
import CollaborateMarquee from "@/components/shared/CollaborateMarquee";
import CustomerTestimonial from "@/components/shared/others/CustomerTestimonial";
import { useSelector } from "react-redux";

const SimEsimDetails = () => {
  const {
    simDataPlan,
    pocketWifiDayPass,
    restOfTheWorldDayPass,
    regionalCountries,
  } = useSelector((state) => state.dataPlan);

  return (
    <div className="overflow-hidden w-full">
      <SimESim type="S" />
      {/* <SimDataPlan simDataPlan={simDataPlan} /> */}
      <Products type="S" showProductDeadline />
      <CustomerTestimonial />
      <CollaborateMarquee />
    </div>
  );
};

export default SimEsimDetails;
