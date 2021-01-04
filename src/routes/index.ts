// import React from 'react';
import { Home, Login } from '../views';

export const menus = [
  // 菜单相关路由
  {
    path: '/',
    name: '首页',
    exact: true,
    component: Home,
  },
];

export const main = [
  {
    path: '/login',
    exact: true,
    name: '登录',
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/',
    name: '首页',
    component: Home,
    routes: menus,
    meta: {
      requiresAuth: true,
    },
  },
];

export const routerConfig = {
  main,
  menus,
};
