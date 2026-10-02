import useModal from "@/hooks/useModal";
import {
  // [PHASE1-HIDDEN] icons for the hidden My Home / My Address / My Cards items
  // AddressIcon,
  // CardIcon,
  // HomeIcon,
  LogOutIcon,
  OrderIcon,
  PersonIconSolid,
  WorldIcon,
  commercialRoutes,
} from "@/services";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

function MyAccount() {
  const navigate = useNavigate();
  const location = useLocation(); // get current path
  const { t } = useTranslation();
  const { setIsAuthDialogOpen, setAppDownloadDialogOpen } = useModal();

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

  // Helper function to find selected menu item
  const findSelectedMenuItem = (pathname, items) => {
    // First try to find exact match
    let current = items.find((item) => item.path && pathname === item.path);

    // If no exact match, try startsWith (for nested routes)
    if (!current) {
      current = items.find(
        (item) => item.path && pathname.startsWith(item.path),
      );
    }

    return current?.key || "";
  };

  // Initialize selected state based on current path
  const [selected, setSelected] = useState(() =>
    findSelectedMenuItem(location.pathname, menuItems),
  );

  // Set selected based on current path
  useEffect(() => {
    const selectedKey = findSelectedMenuItem(location.pathname, menuItems);
    setSelected(selectedKey);
  }, [location.pathname, t]);

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
    if (item.path) navigate(item.path);
    if (item.key === "logout") {
      handleModalOpen("auth", true);
    }
    if (item.key === "delete") console.log("Delete account clicked");
    setSelected(item.key);
  };

  const MenuItem = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = item.icon;
    const color =
      selected === item.key
        ? "#f24144"
        : isHovered
          ? "#f24144"
          : item.color || "#616161";

    return (
      <div
        onClick={() => handleClick(item)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex items-center gap-4 px-3 py-4 cursor-pointer rounded-md 
          ${
            selected === item.key
              ? "bg-[#EDEEFF] text-[#f24144] font-medium "
              : "hover:bg-[#EDEEFF] hover:text-[#f24144] hover:font-medium"
          }`}
      >
        <Icon className="w-6 h-6" color={color} />
        <span>{item.label}</span>
      </div>
    );
  };

  return (
    <div className="hidden lg:block w-full lg:w-64 p-5 text-[#4F4F4F] font-sansPro text-[16px]">
      <h1 className="text-[24px] text-[#191919] mb-4 font-bold px-3">
        {t("myAccount.myAccount")}
      </h1>
      {menuItems.map((item) => (
        <MenuItem key={item.key} item={item} />
      ))}
    </div>
  );
}

export default MyAccount;
