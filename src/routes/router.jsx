import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../features/public/components/PublicLayout";
import publicRoute from "./publicRoute";
import authRoute from "./authRoute";
import NotFound from "../components/NotFound";
import dashboardRoute from "./dashboardRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <NotFound />,
    children: [...publicRoute],//to call these nested routes , we need Outlet
  },
  ...authRoute,
  ...dashboardRoute,
]);

export default router;
