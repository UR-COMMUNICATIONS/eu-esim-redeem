import Products from "@/components/commercial/home/Products";
import Description from "@/components/commercial/router/home/Description";
import Hero from "@/components/commercial/router/home/Hero";
import HowToConnect from "@/components/commercial/router/home/HowToConnect";
import Included from "@/components/commercial/router/home/Included";
import KeyFeatures from "@/components/commercial/router/home/KeyFeatures";
// import OtherProducts from "@/components/commercial/router/home/OtherProducts";
import RecomendedPackage from "@/components/shared/others/RecomendedPackage";

function Home() {
  return (
    <section className="overflow-x-hidden">
      <Hero />
      <Description />
      <RecomendedPackage devType="R" imgType="R" />
      <KeyFeatures />
      <Included />
      <HowToConnect />
      {/* <OtherProducts /> */}
      <Products type="R" />
    </section>
  );
}

export default Home;
