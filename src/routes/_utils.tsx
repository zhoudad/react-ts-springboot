/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect,Switch } from 'react-router-dom';
import { routePropsInter } from '../interfaces/routeInterface';
import { menus as routesConfng } from './index';

export class FrontendAuth extends React.Component<any, any> {
  render() {
    const { path, meta, component, routes } = this.props;
    const isLogin = sessionStorage.getItem('token');

    // 如果该路由不用进行权限校验，登录状态下登陆页除外
    // 因为登陆后，无法跳转到登陆页
    // 这部分代码，是为了在非登陆状态下，访问不需要权限校验的路由

    const targetRouterConfig = routesConfng.find((v: any) => v.path === path);
    if (!meta.requiresAuth && !isLogin) {
      return <Route exact path={path} component={component} routes={routes} />;
    }

    if (isLogin) {
      // 如果是登陆状态，想要跳转到登陆，重定向到主页
      if (path === '/login') {
        return <Redirect to="/" />;
      } else {
        // 如果路由合法，就跳转到相应的路由
        if (targetRouterConfig) {
          // if(targetRouterConfig.Redirect){
          //   return <Redirect to={targetRouterConfig.Redirect} />;
          // }
          // <route.component {...props} routes={route.routes ? route.routes : []} />
          // console.log(this.props,'route')
          return (
            <Route
              path={path}
              render={(props) => <this.props.comcomponent {...props} routes={routes} />}
            />
          );
        } else {
          // 如果路由不合法，重定向到 404 页面
          return <Redirect to="/404" />;
        }
      }
    } else {
      // 非登陆状态下，当路由合法时且需要权限校验时，跳转到登陆页面，要求登陆
      if (targetRouterConfig && meta.requiresAuth) {
        return <Redirect to="/login" />;
      } else {
        // 非登陆状态下，路由不合法时，重定向至 404
        return <Redirect to="/404" />;
      }
    }
  }
}

// 渲染当前组件
export const RouteRender = (route: routePropsInter) => {
  let isAuthenticated = sessionStorage.getItem('token');
  if (!route.meta?.requiresAuth && !isAuthenticated) {
    return <Route exact path={route.path} component={route.component} />;
  }

  if (isAuthenticated) {
    // 如果是登陆状态，想要跳转到登陆，重定向到主页
    if (route.path === '/login') {
      return <Redirect to="/" />;
    } else {
      return (
        <Route
          path={route.path}
          exact={route.exact}
          render={(props) => {
            return (
              route &&
              (route.Redirect ? (
                <Redirect to={route.Redirect}></Redirect>
              ) : (
                <route.component {...props} routes={route.routes} />
              ))
            );
          }}
        />
      );
    }
  } else {
    return <Redirect to="/login" />;
  }
};

export const RoutesRender = ({ routes }: { routes: Array<routePropsInter> }) => {
  return (
    <Switch>
      {routes.map((route: routePropsInter, i: number) => (
        <RouteRender key={i} {...route} />
      ))}
    </Switch>
  );
};
