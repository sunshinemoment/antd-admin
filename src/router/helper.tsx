import { Suspense, ReactNode } from "react";
import { RouteObject, Navigate } from "react-router-dom";

export interface RouteConfig {
  caseSensitive?: boolean;
  children?: RouteConfig[];
  element?: ReactNode;
  index?: boolean;
  path?: string;

  name?: string;
}

export const lazyload = (children: ReactNode): ReactNode => {
  return <Suspense fallback={<>loading</>}>{children}</Suspense>;
};

export const generateRoutes = (routes): RouteObject[] => {
  return routes.reduce((pre, route) => {
    const currentRoute: RouteObject = {};
    if (route.caseSensitive !== undefined) {
      currentRoute.caseSensitive = route.caseSensitive;
    }
    if (route.element !== undefined) {
      currentRoute.element = route.element;
    }
    if (route.index !== undefined) {
      currentRoute.index = route.index;
    }
    if (route.path !== undefined) {
      currentRoute.path = route.path;
    }
    if (route.children !== undefined) {
      currentRoute.children = generateRoutes(route.children);
      if (route.children[0].element) {
        currentRoute.children.unshift({
          index: true,
          element: <Navigate to={route.children[0].path} replace={true} />,
        });
      }
    }
    return [...pre, currentRoute];
  }, []);
};
