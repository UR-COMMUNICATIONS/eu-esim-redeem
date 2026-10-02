import { chinajapanRoutes as routes } from "@/services";
import DynamicComponent from "@/components/shared/DynamicComponent";
import { lazy } from "react";
import ChinaJapanLayout from "@/components/layout/ChinaJapanLayout";

const components = {
    ESimChinaHome: lazy(() => import("@/pages/commercial/eSimChina/Home")),
    ESimThailandHome: lazy(() => import("@/pages/commercial/eSimThailand/Home")),
    PocketWifiChinaHome: lazy(() => import("@/pages/commercial/pocketWifiChina/Home")),
    PocketWifiJapanHome: lazy(() => import("@/pages/commercial/pocketWifiJapan/Home")),
};

const { chinaJapanLayout } = routes || {};

const children = Object.keys(routes).map((key) => {
    const { path, component, } = routes[key]
    return {
        path: path,
        element: <DynamicComponent Comp={components[component]} />,
    };
})

export const cnjpRoutes = [
    {
        path: chinaJapanLayout.path,
        element: <ChinaJapanLayout />,
        children: children
    },
];
