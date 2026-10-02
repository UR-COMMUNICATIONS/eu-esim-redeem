import FsimLogo from "./FsimLogo";
import EasySteps from "./EasySteps";
import EsimFooter from "./EsimFooter";
import FreeSimBnr from "./FreeSimBnr";
import WhyFreeSim from "./WhyFreeSim";
function Fsim() {
    return (
        <div className="overflow-hidden w-full">
            <FsimLogo className="pt-10 xl:mb-5"/>
            <FreeSimBnr/>
            <WhyFreeSim />
            <EasySteps />
            <EsimFooter/>
        </div>
    );
}

export default Fsim;