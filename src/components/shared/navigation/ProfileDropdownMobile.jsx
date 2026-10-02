import { useState, useRef, useEffect } from "react";
import {
  PersonIcon,
  PersonIconSolid,
  LogOutIcon,
  OrderIcon,
  // [PHASE1-HIDDEN] icons for the hidden My Home / My Address / My Cards items
  // AddressIcon,
  // CardIcon,
  // HomeIcon,
  WorldIcon,
  AlertIconSolid,
  commercialRoutes,
  ArrowDownIcon,
} from "@/services";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useModal from "@/hooks/useModal";

function ProfileDropdownMobile({ setIsShowMenu = () => {} }) {
  const { setIsAuthDialogOpen, setAppDownloadDialogOpen } = useModal();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
    // {
    //   key: "delete",
    //   label: t("myAccount.deleteMyAccount"),
    //   icon: AlertIconSolid,
    // },
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
    setOpen(false); // close dropdown
    setIsShowMenu(false); // close parent mobile menu
    if (item.path) navigate(item.path); // navigate if path exists
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

  const DropdownItem = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = item.icon;
    const color = isHovered ? "#f24144" : item.color || "white";

    return (
      <div
        className={`flex items-center gap-3 px-4 py-3 cursor-pointer rounded-md hover:bg-[#FEF2F2] hover:font-medium
                  ${item.color === "#f24144" ? "text-[#f24144]" : ""}`}
        onClick={() => handleClick(item)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Icon className="w-6 h-6" color={color} />
        <span className={isHovered ? "text-[#f24144]" : ""}>{item.label}</span>
      </div>
    );
  };

  return (
    <div className="relative xl:hidden" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-3 rounded-[10px] w-full max-w-[320px] flex justify-between items-center bg-[#f24144] border-[#f24144] hover:bg-[#f24144] text-white font-bold"
      >
        <div className="flex items-center gap-2">
          <PersonIcon className="!h-6 !w-6" color="white" />
          <span>{t("myAccount.myProfile")}</span>
        </div>
        <ArrowDownIcon
          className={`w-6 h-6 transform transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
          pathClass="fill-white"
        />
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-full bg-black shadow-lg rounded-md py-2 z-50 font-sansPro text-[16px] px-2 text-white font-bold">
          {menuItems.map((item) => (
            <DropdownItem key={item.key} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileDropdownMobile;
