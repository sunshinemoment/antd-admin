import { lazy } from "react";
import { lazyload, RouteConfig, generateRoutes } from "./helper";
const BasicList = lazy(() => import("@/pages/list/basic-list"));
const TableList = lazy(() => import("@/pages/list/table-list"));

export const routes: RouteConfig[] = [
  {
    path: "list",
    name: "列表页",
    children: [
      {
        path: "table-list",
        name: "查询列表",
        element: lazyload(<BasicList />),
      },
      {
        path: "basic-list",
        name: "标准列表",
        element: lazyload(<TableList />),
      },
    ],
  },
];

export default generateRoutes(routes);
