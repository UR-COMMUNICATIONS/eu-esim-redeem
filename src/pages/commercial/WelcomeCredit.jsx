import {
  BannerSection,
  HeroSection,
  StepsSection,
  TermsSection,
} from "@/components/commercial/welcomeCredit";
import useExternalPromo from "@/hooks/useExternalPromo";
import useModal from "@/hooks/useModal";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const SUPPORTED_MARKETS = ["sg", "my", "id", "ph", "jp", "hk"];

const CREDIT_MAP = {
  sg: { tag: "$5", amount: "$5", minSpend: "$10" },
  my: { tag: "RM15", amount: "RM15", minSpend: "RM30" },
  id: { tag: "Rp30,000", amount: "Rp30,000", minSpend: "Rp60,000" },
  ph: { tag: "PHP200", amount: "PHP200", minSpend: "PHP400" },
  jp: { tag: "JPY600", amount: "JPY600", minSpend: "JPY1,200" },
  hk: { tag: "HKD50", amount: "HKD50", minSpend: "HKD100" },
};

function WelcomeCredit() {
  const navigate = useNavigate();
  const { brand } = useParams();
  const { cart } = useSelector((state) => state.cart);
  const country = cart?.userCountry?.country?.toLowerCase();
  const market = SUPPORTED_MARKETS.includes(country) ? country : "sg";
  const credit = CREDIT_MAP[market];
  useExternalPromo();
  sessionStorage.setItem("source", "urwifi");

  const { setIsAuthDialogOpen } = useModal();

  const handleOrderToday = () => {
    // navigate(`/${brand}/register`);
    setIsAuthDialogOpen(true, "signUp");
    // onClick = {() => handleModalOpen("auth", true)}
  };

  return (
    <div className="overflow-hidden w-full">
      <BannerSection />
      <HeroSection credit={credit} onOrderToday={handleOrderToday} />
      <StepsSection credit={credit} />
      <TermsSection credit={credit} onOrderToday={handleOrderToday} />
    </div>
  );
}

export default WelcomeCredit;
