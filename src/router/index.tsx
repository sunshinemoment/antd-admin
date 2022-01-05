import { RouteObject, Navigate } from "react-router-dom";
import AppLayout from "@/layouts/app-layout";
import appRoutes from "./routes";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={appRoutes[0].path as string} replace={true} />,
      },
      ...appRoutes,
    ],
  },
];

export default routes;
