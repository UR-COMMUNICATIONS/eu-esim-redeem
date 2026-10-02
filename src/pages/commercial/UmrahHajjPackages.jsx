import LandingPageInternetPackages from "@/components/commercial/home/LandingPageInternetPackages";
import BuiltForAgencies from "@/components/commercial/travel-agency/BuiltForAgencies";
import LandingHeroV2 from "@/components/shared/others/LandingHeroV2";

const UMRAH_HAJJ_CONFIG = {
  name: "Saudi Arabia",
  code: "SA",
  pageKey: "umrahHajj",
};

function UmrahHajjPackages() {
  return (
    <div className="overflow-hidden w-full">
      <LandingHeroV2
        pageKey={UMRAH_HAJJ_CONFIG.pageKey}
        imageAsBackground
        showAppInstall
      />
      <BuiltForAgencies
        sectionKey="umrahHajj.pilgrimageSection"
        imageFolder="landing-page"
      />
      <LandingPageInternetPackages
        urlCountryCode={UMRAH_HAJJ_CONFIG.code}
        urlCountryName={UMRAH_HAJJ_CONFIG.name}
      />
    </div>
  );
}

export default UmrahHajjPackages;
