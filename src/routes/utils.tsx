/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { routePropsInter } from '../interfaces/routeInterface';
import { RouteProps } from 'react-router';

// 渲染当前组件
export const RouteRender = (route: routePropsInter) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => {
        let isAuthenticated = sessionStorage.getItem('isAuthenticated');
        if (!(typeof route.meta === 'object' && route.meta.requiresAuth) && !isAuthenticated && props.location.pathname != '/login') {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          );
        }
        return route && (route.Redirect ? <Redirect to={route.Redirect}></Redirect> : <route.component {...props} routes={route.routes ? route.routes : []} />);
      }}
    />
  );
};

export const RoutesRender = ({ routes }: { routes: Array<routePropsInter> }) => {
  return (
    <>
      {routes.map((route: routePropsInter, i: number) => (
        <RouteRender key={i} {...route} />
      ))}
    </>
  );
};
