import { cn } from "@/lib/utils";
import { commercialRoutes, corporateRoutes } from "@/services";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// TODO: DEV ONLY *** PLEASE REMOVE BEFORE MOVING TO PRODUCTION***
const DevFAB = () => {
  const [isDevFabOpen, setIsDevFabOpen] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };

  const buttons = [
    {
      label: "s-components",
      path: "/shared-elements",
    },
    {
      label: "corporate",
      path: corporateRoutes.home.path,
    },
    {
      label: "commercial",
      path: commercialRoutes.home.path,
    },
  ];

  return (
    <div className="fixed z-50 bottom-5 right-5 h-10 w-10">
      <button
        className={cn(
          "w-10 h-10 border-2 rounded-full relative z-50 font-bold text-white bg-black-900 hover:scale-110 active:scale-90 transition_common"
        )}
        onClick={() => setIsDevFabOpen((prev) => !prev)}
      >
        {"</>"}
      </button>

      {isDevFabOpen &&
        buttons.map((button, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleNavigate(button.path)}
            className={cn(
              `fixed right-5 text-white bg-black-900 rounded-full px-6 py-2 cursor-pointer font-bold hover:opacity-80 transition_common`
            )}
            style={{ bottom: `${(index + 1.5) * 50}px` }}
          >
            {button.label}
          </button>
        ))}
    </div>
  );
};
// NOTE: DEV ONLY

export default DevFAB;
