import { RouteProps } from 'react-router';

export interface routePropsInter {
  component: any;
  token?: string;
  exact?: boolean;
  meta?: routeMataInter;
  Redirect?: string;
  routes?: RouteProps[];
  name: string;
  path: string;
}

// export interface routeInter {
//   component: any;
//   exact: boolean;
//   meta: routeMataInter;
//   name: string;
//   path: string;
// }

export interface routeMataInter {
  requiresAuth: boolean;
  breadcrumb?: boolean;
}
