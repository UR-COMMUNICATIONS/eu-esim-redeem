// import { useState, useRef, useEffect } from "react";
// import { PersonIcon, CellphoneIcon } from "@/services";
// import { useNavigate } from "react-router-dom";

// function ProfileDropdown({ handleModalOpen }) {
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   const handleClick = (action) => {
//     if (action === "login") handleModalOpen("auth", true);
//     if (action === "download") handleModalOpen("download", true);
//     if (action === "profile") navigate("/profile");
//     setOpen(false); // ✅ Close after click
//   };

//   // ✅ Close when clicking outside
//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleOutsideClick);
//     return () => document.removeEventListener("mousedown", handleOutsideClick);
//   }, []);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={() => setOpen(!open)}
//         className="min-w-10 min-h-10 p-0 rounded-[10px] hidden xl:flex justify-center items-center bg-secondary-500 border-secondary-500"
//       >
//         <PersonIcon className="!h-6 !w-6 shrink-0" />
//       </button>

//       {open && (
//         <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-50 text-[#888888]">
//           <div
//             className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
//             onClick={() => handleClick("login")}
//           >
//             <PersonIcon className="w-4 h-4" />
//             <span>My Order</span>
//           </div>
//           <div
//             className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
//             onClick={() => handleClick("download")}
//           >
//             <CellphoneIcon className="w-4 h-4" />
//             <span>My Address</span>
//           </div>
//           <div
//             className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
//             onClick={() => handleClick("profile")}
//           >
//             <PersonIcon className="w-4 h-4" />
//             <span>My Data</span>
//           </div>
//           <div
//             className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
//             onClick={() => handleClick("profile")}
//           >
//             <PersonIcon className="w-4 h-4" />
//             <span>My Cards</span>
//           </div>
//            <div
//             className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
//             onClick={() => handleClick("profile")}
//           >
//             <PersonIcon className="w-4 h-4" />
//             <span>Profile</span>
//           </div>
//           <div
//             className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 text-[#DE3737]"
//             onClick={() => handleClick("profile")}
//           >
//             <PersonIcon className="w-4 h-4" />
//             <span>Logout</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProfileDropdown;

import { useState, useRef, useEffect } from "react";
import {
  PersonIconSolid,
  LogOutIcon,
  OrderIcon,
  // [PHASE1-HIDDEN] icons for the hidden My Home / My Address / My Cards items
  // AddressIcon,
  // CardIcon,
  // HomeIcon,
  WorldIcon,
  PersonIcon,
  commercialRoutes,
} from "@/services";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useModal from "@/hooks/useModal";

function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setIsAuthDialogOpen, setAppDownloadDialogOpen, setIsShowMenu } =
    useModal();

  const menuItems = [
    // [PHASE1-HIDDEN] My Home
    // {
      // key: "myHome",
      // label: t("myAccount.myHome"),
      // icon: HomeIcon,
      // path: commercialRoutes.userHome.path,
    // },
    {
      key: "myorders",
      label: t("myAccount.myOrder"),
      icon: OrderIcon,
      path: commercialRoutes.userOrder.path,
    },
    // [PHASE1-HIDDEN] My Address
    // {
      // key: "myaddress",
      // label: t("myAccount.myAddress"),
      // icon: AddressIcon,
      // path: commercialRoutes.userAddress.path,
    // },
    {
      key: "mydata",
      label: t("myAccount.myData"),
      icon: WorldIcon,
      path: commercialRoutes.userData.path,
    },
    // [PHASE1-HIDDEN] My Cards
    // {
      // key: "mycards",
      // label: t("myAccount.myCards"),
      // icon: CardIcon,
      // path: commercialRoutes.userCards.path,
    // },
    {
      key: "profile",
      label: t("myAccount.profile"),
      icon: PersonIconSolid,
      path: commercialRoutes.userProfile.path,
    },
    {
      key: "logout",
      label: t("myAccount.logout"),
      icon: LogOutIcon,
      color: "#DE3737",
    },
  ];

  const handleModalOpen = (name = "auth", value) => {
    if (name == "auth") {
      setIsAuthDialogOpen(value);
    } else if (name == "download") {
      setAppDownloadDialogOpen(value);
    } else {
      setIsAuthDialogOpen(value);
    }
    setIsShowMenu(false);
  };

  const handleClick = (item) => {
    setOpen(false);
    if (item.path) {
      navigate(item.path);
    }
    if (item.key === "logout") {
      handleModalOpen("auth", true);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const DropdownItem = ({ item, isLast }) => {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = item.icon;
    const isDestructive = item.key === "logout";
    const color = isHovered
      ? isDestructive
        ? "#DE3737"
        : "#223870"
      : item.color || "#888888";

    return (
      <div
        className={`flex cursor-pointer items-center gap-3 rounded-md px-4 py-3 hover:font-medium ${
          isDestructive
            ? "hover:bg-red-50"
            : "hover:bg-eu-50"
        } ${!isLast ? "border-b border-[#EEEEEE]" : ""}`}
        onClick={() => handleClick(item)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Icon className="w-5 h-5" color={color} />
        <span
          className={
            isHovered
              ? isDestructive
                ? "text-[#DE3737]"
                : "text-eu-600"
              : ""
          }
        >
          {item.label}
        </span>
      </div>
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="min-w-10 min-h-10 p-0 rounded-[10px] hidden xl:flex justify-center items-center bg-goldGradient border-gold-600 hover:opacity-90"
      >
        <PersonIcon className="!h-6 !w-6 shrink-0" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50 text-[#888888] font-sansPro font-normal text-[14px] px-2">
          {menuItems.map((item, index) => (
            <DropdownItem
              key={item.key}
              item={item}
              isLast={index === menuItems.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
