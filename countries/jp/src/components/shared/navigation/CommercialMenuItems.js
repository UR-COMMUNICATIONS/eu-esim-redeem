import { commercialRoutes } from "@/services";

const commercialMenuItems = [
    {
        name: "Home",
        value: "home",
        path: commercialRoutes.home.path,
        activePath: commercialRoutes.home.activePath,
    },
    {
        name: "Pocket WIFI",
        value: "pocketwifi",
        path: commercialRoutes.pocketWifiHome.path,
        activePath: commercialRoutes.pocketWifiHome.activePath,
        // path: commercialRoutes.pocketWifiHome.path,
        // activePath: commercialRoutes.pocketWifiHome.activePath,
    },
    // {
    //     name: "Router",
    //     value: "router",
    //     path: commercialRoutes.routerHome.path,
    //     activePath: commercialRoutes.routerHome.activePath,
    // },
    // {
    //     name: "SIM/eSIM",
    //     value: "simesim",
    //     path: commercialRoutes.simHome.path,
    //     activePath: commercialRoutes.simHome.activePath,
    // },
    {
        name: "Contact Us",
        value: "contact",
        path: commercialRoutes.contact.path,
        activePath: commercialRoutes.contact.activePath,
    },
    {
        name: "About Us",
        value: "about",
        path: commercialRoutes.aboutUs.path,
        activePath: commercialRoutes.aboutUs.activePath,
    },
];
export default commercialMenuItems;