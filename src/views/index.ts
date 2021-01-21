import React, { lazy } from 'react';

const Home = lazy(() => import('./Home'));
const Analysis = lazy(() => import('./Dashboard/Analysis'));
const Monitor = lazy(() => import('./Dashboard/Monitor'));
const WorkPlace = lazy(() => import('./Dashboard/WorkPlace'));
const Center = lazy(() => import('./Account/Center'));
const Setting = lazy(() => import('./Account/Setting'));
const Articles = lazy(() => import('./List/Articles'));
const Projects = lazy(() => import('./List/Projects'));
const Writing = lazy(() => import('./Common/Writing'));
import Login from './Login';

export { Home, Login, Analysis, Monitor, WorkPlace, Center, Setting, Articles, Projects,Writing };
