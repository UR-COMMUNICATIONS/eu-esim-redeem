import { useSelector } from "react-redux";

// Existing Components
import LetsTalk from "@/components/commercial/contact/LetsTalk";
import LandingHeroV2 from "@/components/shared/others/LandingHeroV2";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { countriesBasedData } from "@/lib/utils";

// New Components
import BuiltForAgencies from "@/components/commercial/travel-agency/BuiltForAgencies";
import FreeEsimPromo from "@/components/commercial/travel-agency/FreeEsimPromo";
import RevenueSection from "@/components/commercial/travel-agency/RevenueSection";

const isIdDomain = () =>
  typeof window !== "undefined" &&
  window.location?.hostname?.toLowerCase().includes("yoowifi.id");

const TravelAgency = () => {
  const { contact, socialLinks } = useSelector((state) => state.contact);
  const { supportPhone, WhatsappLink, currentCountry } =
    useUserLocationLanguage();
  const showFreeEsimPromo =
    currentCountry === "id" ||
    currentCountry === "ph" ||
    currentCountry === "my";
  const idContact = countriesBasedData.id;
  const useIdContact = isIdDomain();
  const displayPhone = useIdContact ? idContact.supportPhone : supportPhone;
  const displayWhatsappLink = useIdContact
    ? `https://wa.me/${idContact.supportPhone.replace(/[^0-9]/g, "")}`
    : WhatsappLink;

  return (
    <div className="overflow-hidden w-full">
      {/* 1. Top Banner Section (LandingHeroV2 using translations under travelAgency) */}
      <LandingHeroV2
        pageKey="travelAgency"
        backgroundColor="linear-gradient(245.97deg, #E8383B 26.32%, #D81F22 95.94%)"
      />
      {/* 2. Free 5GB eSIM / WhatsApp QR Section - only for ID and PH origin */}

      {showFreeEsimPromo && <FreeEsimPromo />}

      {/* 3. One Side Image, One Side Text Section */}
      <RevenueSection />

      {/* 4. Three Column Image & Text Section */}
      <BuiltForAgencies />

      {/* 5. Contact/Let's Talk - on yoowifi.id always ID number; else by origin country */}
      <LetsTalk
        data={contact}
        socialLinks={socialLinks}
        supportPhone={displayPhone}
        whatsappLink={displayWhatsappLink}
      />
    </div>
  );
};

export default TravelAgency;
