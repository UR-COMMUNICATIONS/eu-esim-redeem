import { corporateRoutes as routes } from "@/services";
import DynamicComponent from "@/components/shared/DynamicComponent";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
const CorporateLayout = lazy(
  () => import("@/components/layout/CorporateLayout"),
);

const components = {
  CorporateHome: lazy(() => import("@/pages/corporate/Home")),
  Iot: lazy(() => import("@/pages/corporate/Iot")),
  Hotel: lazy(() => import("@/pages/corporate/Hotel")),
  TravelAgency: lazy(() => import("@/pages/corporate/TravelAgency")),
  MaritimeInternet: lazy(() => import("@/pages/commercial/MarinPackages")),
  Office: lazy(() => import("@/pages/corporate/Office")),
  Events: lazy(() => import("@/pages/corporate/Events")),
  AboutCorporate: lazy(() => import("@/pages/corporate/AboutCorporate")),
  Commercial: lazy(() => import("@/pages/corporate/Commercial")),
  CorporateAccount: lazy(() => import("@/pages/corporate/CorporateAccount")),
  Info: lazy(() => import("@/pages/corporate/Info")),
  Business: lazy(() => import("@/pages/corporate/Business")),
};

const { home } = routes || {};

const children = [
  ...Object.keys(routes)
    .filter((key) => key !== "office")
    .map((key) => {
      const { path, component } = routes[key];
      return {
        path: path,
        element: <DynamicComponent Comp={components[component]} />,
      };
    }),
  {
    path: "/corporate/office",
    element: <Navigate to="/corporate/events" replace />,
  },
];

export const corpRoutes = [
  {
    path: home.path,
    element: <DynamicComponent Comp={CorporateLayout} />,
    children: children,
  },
];

// import { lazy, Suspense } from "react";
// import HomeSkeleton from "@/components/skeletons/HomeSkeleton";

// const modules = import.meta.glob("@/pages/corporate/*.jsx");

// const components = Object.fromEntries(
//   Object.entries(modules).map(([path, loader]) => {
//     const name = path.split("/").pop().replace(".jsx", "");
//     return [name, lazy(loader)];
//   })
// );

// export function DynamicComponent({ name }) {
//   const Comp = components[name];
//   if (!Comp) return <div>Component not found: {name}</div>;

//   return (
//     <Suspense fallback={<HomeSkeleton />}>
//       <Comp />
//     </Suspense>
//   );
// }
