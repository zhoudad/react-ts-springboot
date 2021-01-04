// import React from 'react';
import { Home, Login, Analysis, Monitor,WorkPlace } from '../views';

export const menus = [
  // 菜单相关路由
  {
    path: '/',
    name: '首页',
    exact: true,
    Redirect: '/dashboard/analysis',
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/dashboard/analysis',
    name: '分析页',
    exact: true,
    component: Analysis,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/dashboard/monitor',
    name: '监控页',
    exact: true,
    component: Monitor,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/dashboard/workplace',
    name: '工作台',
    exact: true,
    component: WorkPlace,
    meta: {
      requiresAuth: true,
    },
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
