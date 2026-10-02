import React from "react";
import useExternalPromo from "@/hooks/useExternalPromo";
import BrandLogo from "./Fsim/BrandLogo";
import ChallengerBanner from "./Fsim/ChallengerBanner";
import ChallengerPromoText from "./Fsim/ChallengerPromoText";
import ChallengerHowItWorks from "./Fsim/ChallengerHowItWorks";
import ChallengerHowToRedeem from "./Fsim/ChallengerHowToRedeem";

const Challenger = () => {
  useExternalPromo();
  sessionStorage.setItem("source", "urwifi");
  return (
    <div className="overflow-hidden w-full">
      <BrandLogo className="pt-10" brand="challenger" />
      <ChallengerBanner />
      <ChallengerPromoText />
      <ChallengerHowItWorks />
      <ChallengerHowToRedeem />
    </div>
  );
};

export default Challenger;
