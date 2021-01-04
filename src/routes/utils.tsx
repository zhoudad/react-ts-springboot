/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { routePropsInter } from '../interfaces/routeInterface';

// 渲染当前组件
export const RouteRender: React.FC<routePropsInter> = (route: routePropsInter) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => {
        let isAuthenticated = sessionStorage.getItem('isAuthenticated')
        if (!(typeof route.meta === 'object' && route.meta.requiresAuth) && !isAuthenticated && props.location.pathname != "/login") {
          return <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        }
        console.log(1)
        return (
          route && (route.Redirect ? (<Redirect to={route.Redirect}></Redirect>) : (<route.component {...props} routes={route.routes} />))
        )
      }}
    />
  );
};
