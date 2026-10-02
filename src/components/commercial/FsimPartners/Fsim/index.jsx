import EasySteps from "./EasySteps";
import EsimFooter from "./EsimFooter";
import FreeSimBnr from "./FreeSimBnr";
import WhyFreeSim from "./WhyFreeSim";
function Fsim({ fsimLogo, fsimBanner }) {
    return (
        <div className="overflow-hidden w-full">
            <FreeSimBnr logo={fsimLogo} banner={fsimBanner} />
            <WhyFreeSim />
            <EasySteps />
            <EsimFooter />
        </div>
    );
}

export default Fsim;