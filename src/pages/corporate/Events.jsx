import { useSelector } from "react-redux";
import LandingHeroV2 from "@/components/shared/others/LandingHeroV2";
import ImageSlider from "@/components/shared/others/ImageSlider";
import BuiltForAgencies from "@/components/commercial/travel-agency/BuiltForAgencies";
import MarinSmarterInternetSection from "@/components/commercial/marin/MarinSmarterInternetSection";
import LetsTalk from "@/components/commercial/contact/LetsTalk";

const Events = () => {
  const { contact, socialLinks } = useSelector((state) => state.contact);

  return (
    <div className="overflow-hidden w-full">
      <LandingHeroV2
        pageKey="events"
        backgroundColor="#F7D259"
        showAppInstall
        hideImage
        textCenter
        className="pt-6 md:pt-10 lg:pt-14"
        title={
          <>
            <span className="whitespace-nowrap">Events Connectivity</span>
            <br />
            <span className="text-[#4A7C59]">with Router Solutions</span>
          </>
        }
        bottomSection={
          <div className="px-4 md:px-8 lg:px-12 pb-6 md:pb-8">
            <ImageSlider
              images={[
                "banner-slider-1",
                "banner-slider-2",
                "banner-slider-3",
                "banner-slider-1",
                "banner-slider-2",
              ]}
              imageFolder="landing-page"
              slidesPerView={4}
              slideGap="px-2 md:px-3"
              imageClassName="h-[140px] md:h-[180px] object-cover rounded-lg"
              autoplayDelay={5000}
              showDots
            />
          </div>
        }
      />

      <BuiltForAgencies
        sectionKey="events.eventsSection"
        imageFolder="landing-page"
        imageKeys={["event-setup", "event-network"]}
        columns={2}
      />

      <MarinSmarterInternetSection
        imageFolder="product-routers"
        imageKey="router"
        sectionKey="events.smarterInternet"
      />

      <LetsTalk data={contact} socialLinks={socialLinks} />
    </div>
  );
};

export default Events;
