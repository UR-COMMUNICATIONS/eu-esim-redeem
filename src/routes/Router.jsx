import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { comRoutes } from "./comRoutes";
// [PHASE1-HIDDEN] corporate + partner brand route trees
// import { corpRoutes } from "./corpRoutes";
// import { partnerRoutes } from "./brandRoutes";
import DynamicComponent from "@/components/shared/DynamicComponent";

const NotFound = React.lazy(() => import("@/pages/NotFound"));
// [PHASE1-HIDDEN] shared-elements style gallery
// const SharedElements = React.lazy(() => import("@/pages/SharedElements"));

// No country-prefix routing: campaign links such as /EU/esim-redeem arrive
// from another site and must open exactly as sent.
const router = createBrowserRouter([
  ...comRoutes,
  // [PHASE1-HIDDEN] corporate + partner brand routes
  // ...corpRoutes,
  // ...partnerRoutes,
  // [PHASE1-HIDDEN] shared-elements route
  // {
  //   path: "shared-elements",
  //   element: <DynamicComponent Comp={SharedElements} />,
  // },
  { path: "*", element: <DynamicComponent Comp={NotFound} /> },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
