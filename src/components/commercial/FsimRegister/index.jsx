import useDynamicImages from "@/hooks/useDynamicImages";
import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";
import BrandLogo from "../FsimPartners/Fsim/BrandLogo";
import { fsimConfig } from "../FsimPartners/fsimConfig";
import RegisterForm from "./RegisterForm";

const FsimRegister = () => {
  const { brand } = useParams();
  const comp = brand?.toLowerCase();
  const isEuWifi = comp === "euwifi";

  const regImage =
    fsimConfig[comp]?.registerImage || fsimConfig["default"]?.registerImage;
  // Hoisted out of the comp !== "kol" branch below: /:brand is a layout route,
  // so the param can change without remounting this component, and a hook
  // inside that branch would appear and vanish between renders (React #300).
  const regImageSrc = useDynamicImages("fsim-banner", regImage);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full font-sans">
      {/* Left Section */}
      {comp !== "kol" && (
        <div className="w-full lg:w-[50%] hidden lg:block shrink-0">
          <img
            src={regImageSrc}
            alt={isEuWifi ? "EU Pocket WiFi" : "Registration"}
            className="block w-full h-auto"
          />
        </div>
      )}
      {/* Right Section */}
      <div
        className={`w-full min-h-screen overflow-y-auto lg:overflow-visible ${comp !== "kol" ? "lg:w-[50%]" : ""}`}
      >
        <div
          className={cn(
            "flex flex-col justify-between lg:h-full",
            isEuWifi
              ? "py-4 lg:py-6 px-4 lg:px-8"
              : "py-10 xl:py-20 lg:py-8 h-screen px-6 xl:px-0",
          )}
        >
          <div>
            <BrandLogo className={isEuWifi ? "mb-3 lg:mb-4" : undefined} />
            <div
              className={cn(
                "flex justify-center",
                isEuWifi ? "lg:items-start" : "h-full lg:items-center",
              )}
            >
              <div className="max-w-lg w-full mx-auto mb-0">
                <div className={cn(!isEuWifi && "xl:mt-5 lg:mt-0 mt-5")}>
                  <RegisterForm />
                  {/* <RegisterFormSkeleton/> */}
                </div>
                {/* <FsimQr/> */}
              </div>
            </div>
          </div>
          {/* <p className="text-[#888888] text-center text-sm lg:text-lg whitespace-pre-line xl:mt-0 lg:mt-10 md:mt-0 sm:mt-0 mt-8 sm:mb-0 mb-2">
                        <Trans
                            i18nKey="FsimRegister.condition"
                            components={{
                                a1: (
                                    <a
                                        href={commercialRoutes.termsService.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#244C75] font-semibold border-b-2 border-[#244C75]"
                                    />
                                ),
                                a2: (
                                    <a
                                        href={commercialRoutes.privacyPolicy.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#244C75] font-semibold border-b-2 border-[#244C75]"
                                    />
                                )
                            }}
                        />
                    </p> */}
        </div>
      </div>
    </div>
  );
};

export default FsimRegister;
