import { useLocation } from "react-router-dom";

const useActiveMenuItem = (menuItems) => {
  const location = useLocation();

  return menuItems.map((item) => {
    const isActive =
      item?.path == "/"
        ? location.pathname == item?.path
        : location.pathname.includes(item.activePath);
    return {
      ...item,
      isActive: isActive,
    };
  });
};

export default useActiveMenuItem;
