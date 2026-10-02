import useExternalPromo from "@/hooks/useExternalPromo";
import { Button } from "@/components/ui/button";
import { commercialRoutes } from "@/services";
import { Link, useNavigate, useParams } from "react-router-dom";
import BrandLogo from "./Fsim/BrandLogo";
import EuWifiBanner from "./Fsim/EuWifiBanner";
import EuWifiBenefits from "./Fsim/EuWifiBenefits";

const EuWifiFormCard = () => {
  const navigate = useNavigate();
  const { brand } = useParams();

  const handleGetFree = () => {
    navigate(`/${brand}/register`);
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col gap-5 cursor-pointer"
      onClick={handleGetFree}
    >
      <BrandLogo />

      <p className="text-center text-gray-600 text-sm md:text-base leading-relaxed">
        Travel smarter with seamless internet wherever you go. Sign up now and
        unlock your FREE 5GB Asia travel data.
      </p>

      {/* Visual form fields */}
      <div className="flex flex-col gap-3">
        {["Full Name", "Email Address", "Mobile Number"].map((placeholder) => (
          <div
            key={placeholder}
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-400 text-sm bg-gray-50"
          >
            {placeholder}
          </div>
        ))}
      </div>

      {/* CTA */}
      <Button
        className="w-full bg-[#1a2440] hover:bg-[#0f1a30] text-white text-base font-semibold py-6 rounded-xl"
        onClick={(e) => {
          e.stopPropagation();
          handleGetFree();
        }}
      >
        Get My Free 5GB
      </Button>

      {/* Terms */}
      <p className="text-center text-xs text-gray-400 leading-relaxed">
        By clicking "Continue", you agree to our{" "}
        <Link
          to={commercialRoutes.euTermsAndConditions.path}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#244C75] underline"
          onClick={(e) => e.stopPropagation()}
        >
          Terms &amp; Conditions
        </Link>{" "}
        &{" "}
        <Link
          to={commercialRoutes.euPrivacyPolicy.path}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#244C75] underline"
          onClick={(e) => e.stopPropagation()}
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

const EuWifi = () => {
  useExternalPromo();
  sessionStorage.setItem("source", "eu");
  return (
    <div className="overflow-hidden w-full">
      {/* Full-width banner section */}
      <div className="sec_common_80 xl:px-28 lg:py-10">
        <BrandLogo className="mb-8" />
        <EuWifiBanner />
      </div>

      {/* Benefits section */}
      <EuWifiBenefits />
    </div>
  );
};

export default EuWifi;
