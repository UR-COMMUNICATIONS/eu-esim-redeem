import InfoCard from "@/components/shared/cards/InfoCard";
import SectionHeader from "@/components/shared/others/SectionHeader";

function HowToConnect() {
  return (
    <section className="sec_common_60">
      <div className="containerX">
        <SectionHeader
          heading="How to connect Router?"
          subHeading="Step-by-step guide to easily set up your eSIM"
          containerClassName="gap-4"
        />
        <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-10 md:mt-15">
          <InfoCard
            titleClass="font-normal"
            title="Connect the power adapter to the WiFi router and plug it into the power socket. Then, turn on the power socket."
          >
            <span className="text-5xl sm:text-6xl md:text-6xml font-bold text-main-600">
              1
            </span>
          </InfoCard>
          <InfoCard
            titleClass="font-normal"
            title="To connect to your WiFi network, locate the default WiFi name and password on the underside / back of the WiFi Router."
          >
            <span className="text-5xl sm:text-6xl md:text-6xml font-bold text-main-600">
              2
            </span>
          </InfoCard>
          <InfoCard
            titleClass="font-normal"
            title="Connect to the default WiFi name and enter the password when prompted, and you're all set!"
          >
            <span className="text-5xl sm:text-6xl md:text-6xml font-bold text-main-600">
              3
            </span>
          </InfoCard>
        </div>
      </div>
    </section>
  );
}

export default HowToConnect;
