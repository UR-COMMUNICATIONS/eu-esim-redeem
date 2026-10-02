import { useSelector } from "react-redux";
import shipSteeringDecor from "@/assets/images/landing-page/ship-steering.webp";
import LandingHeroV2 from "@/components/shared/others/LandingHeroV2";
import BuiltForAgencies from "@/components/commercial/travel-agency/BuiltForAgencies";
import MarinSmarterInternetSection from "@/components/commercial/marin/MarinSmarterInternetSection";
import LetsTalk from "@/components/commercial/contact/LetsTalk";

const MarinPackages = () => {
  const { contact, socialLinks } = useSelector((state) => state.contact);

  return (
    <div className="overflow-hidden w-full">
      {/* 1) Banner */}
      <LandingHeroV2
        pageKey="marin"
        splitHero
        splitHeroDecorSrc={shipSteeringDecor}
        backgroundColor="#54A5D5"
        showAppInstall
      />

      {/* 2) Section below banner (same structure as umrah-hajj via BuiltForAgencies) */}
      <BuiltForAgencies
        sectionKey="marin.maritimeSection"
        imageFolder="landing-page"
        imageKeys={["marine-table", "marine-ship", "marine-ship-men"]}
      />

      {/* 3) Left image + right maritime text */}
      <MarinSmarterInternetSection imageKey="marine-cont-ship" />

      {/* 4) Lets talk (left text + right form) */}
      <LetsTalk
        data={contact}
        socialLinks={socialLinks}
        socialLinksVariant="marine"
      />
    </div>
  );
};

export default MarinPackages;
