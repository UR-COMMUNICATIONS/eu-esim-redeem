import { brandRoutes as routes } from "@/services";
import DynamicComponent from "@/components/shared/DynamicComponent";
import { lazy } from "react";

const BrandLayout = lazy(() => import("@/components/layout/BrandLayout"));

const components = {
  FsimRegister: lazy(() => import("@/components/commercial/FsimRegister")),
  // OrderConfirmation: lazy(() => import("@/components/commercial/FsimRegister/OrderConfirmation")),
  ProcessOrder: lazy(
    () => import("@/components/commercial/FsimRegister/ProcessOrder"),
  ),
  FsimOrderSummary: lazy(
    () => import("@/components/commercial/FsimRegister/FsimOrderSummary"),
  ),
  FsimQr: lazy(() => import("@/components/commercial/FsimRegister/FsimQr")),
  AstindoInternetPackage: lazy(
    () => import("@/components/commercial/home/AstindoInternetPackage"),
  ),
  AstindoCartService: lazy(
    () => import("@/pages/commercial/sim/AstindoCartService"),
  ),
  EuPrivacyPolicy: lazy(() => import("@/pages/commercial/EuPrivacyPolicy")),
  EuTermsAndConditions: lazy(
    () => import("@/pages/commercial/EuTermsAndConditions"),
  ),
};

const { brandLayout } = routes || {};

const children = Object.keys(routes).map((key) => {
  const { path, component } = routes[key];
  // const resolvedPath = path.startsWith("/:brand") ? path : `/${brand}${path.startsWith("/") ? path : `/${path}`}`;
  // console.log("reolvedPth", resolvedPath);
  // console.log("path", path);

  return {
    path: path,
    // path: resolvedPath,
    element: <DynamicComponent Comp={components[component]} />,
  };
});

export const partnerRoutes = [
  {
    path: brandLayout.path,
    element: <DynamicComponent Comp={BrandLayout} />,
    children: children,
  },
];
