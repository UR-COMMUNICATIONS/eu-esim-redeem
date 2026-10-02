import EasySteps from "./EasySteps";
import EsimFooter from "./EsimFooter";
import FreeSimBnr from "./FreeSimBnr";
import WhyFreeSim from "./WhyFreeSim";
function Fsim() {
    return (
        <div className="overflow-hidden w-full">
            <FreeSimBnr/>
            <WhyFreeSim />
            <EasySteps />
            <EsimFooter/>
        </div>
    );
}

export default Fsim;