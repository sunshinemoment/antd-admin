import { lazy } from "react";
import {
  lazyload,
  RouteConfig,
  generateRoutesAndEnhanceRoutes,
} from "./helper";
const TableList = lazy(() => import("@/pages/list/table-list"));
const BasicList = lazy(() => import("@/pages/list/basic-list"));

export const routes: RouteConfig[] = [
  {
    path: "list",
    name: "列表页",
    children: [
      {
        path: "table-list",
        name: "查询列表",
        element: lazyload(<TableList />),
      },
      {
        path: "basic-list",
        name: "标准列表",
        element: lazyload(<BasicList />),
      },
    ],
  },
];

export default generateRoutesAndEnhanceRoutes(routes);
