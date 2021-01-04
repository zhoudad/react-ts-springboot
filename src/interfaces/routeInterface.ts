import { RouteProps } from 'react-router';

export interface routePropsInter extends RouteProps {
  component: any;
  token?: string;
  meta?: routeMataInter;
  Redirect?: string;
  routes?: Array<RouteProps>;
}

export interface routeMataInter {
  requiresAuth: boolean;
}
