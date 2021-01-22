import {
  Home,
  Login,
  Analysis,
  Monitor,
  WorkPlace,
  Center,
  Setting,
  Articles,
  Projects,
  Writing,
  NotFound,
  Free
} from '../views';

export const menus = [
  // 菜单相关路由
  {
    path: '/',
    name: '首页',
    exact: true,
    Redirect: '/dashboard/analysis',
    meta: {
      requiresAuth: true,
      breadcrumb: true,
    },
  },
  {
    path: '/common/writing',
    name: '创作',
    exact: true,
    component: Writing,
    meta: {
      requiresAuth: true,
      breadcrumb: false,
    },
  },
  {
    path: '/dashboard/analysis',
    name: '分析页',
    exact: true,
    component: Analysis,
    meta: {
      requiresAuth: true,
      breadcrumb: false,
    },
  },
  {
    path: '/dashboard/monitor',
    name: '监控页',
    exact: true,
    component: Monitor,
    meta: {
      requiresAuth: true,
      breadcrumb: false,
    },
  },
  {
    path: '/dashboard/workplace',
    name: '工作台',
    exact: true,
    component: WorkPlace,
    meta: {
      requiresAuth: true,
      breadcrumb: false,
    },
  },
  {
    path: '/account/center',
    name: '个人中心',
    exact: true,
    component: Center,
    meta: {
      requiresAuth: true,
      breadcrumb: false,
    },
  },
  {
    path: '/account/settings',
    name: '个人设置',
    exact: true,
    component: Setting,
    meta: {
      requiresAuth: true,
      breadcrumb: true,
    },
  },
  {
    path: '/list/seach',
    name: '个人设置',
    exact: true,
    Redirect: '/list/seach/articles',
    meta: {
      requiresAuth: true,
      breadcrumb: false,
    },
  },
  {
    path: '/list/seach/articles',
    name: '文章列表',
    exact: true,
    component: Articles,
    meta: {
      requiresAuth: true,
      breadcrumb: false,
    },
  },
  {
    path: '/list/seach/projects',
    name: '项目列表',
    exact: true,
    component: Projects,
    meta: {
      requiresAuth: true,
      breadcrumb: false,
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
    path: '/404',
    name: '404',
    component: NotFound,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/free',
    name: '自由也、页',
    component: Free,
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
