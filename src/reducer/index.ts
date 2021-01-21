import { combineReducers } from 'redux';
import { USER_LOGIN, SET_USERINFO, SET_PATHS } from './actionTypes';

interface actionConf {
  type: string;
  [dataname: string]: string;
}

// 初始 state
const initState = {
  userInfo: {},
  paths: [],
  breadcrumb: true,
};
// Reducer 是一个函数，它接受当前 State 和 Action 作为参数，返回一个新的 State。
const getLoginFun = (state = initState, action: actionConf) => {
  switch (action.type) {
    case USER_LOGIN:
      // console.log(Object.assign({}, state, action))
      return { ...state, userInfo: action.userInfo };
    default:
      return state;
  }
};

const setUserInfoFun = (state = initState, action: actionConf) => {
  switch (action.type) {
    case SET_USERINFO:
      return { ...state, userInfo: action.userInfo };
    default:
      return state;
  }
};

const setMainPathsFun = (state = initState, action: actionConf) => {
  switch (action.type) {
    case SET_PATHS:
      return { ...state, paths: action.paths };
    default:
      return state;
  }
};

export const setBreadcrumbFun = (state = initState, action: actionConf) => {
  switch (action.type) {
    case SET_PATHS:
      return { ...state, breadcrumb: action.breadcrumb };
    default:
      return state;
  }
};


// combineReducers方法，用于 Reducer 的拆分。combineReducers()做的就是产生一个整体的 Reducer 函数
export const allReducer = combineReducers({
  getLogin: getLoginFun,
  setUserInfo: setUserInfoFun,
  setMainPaths: setMainPathsFun,
  setBreadcrumb: setBreadcrumbFun,
});
