import http from '../api/http';
import { USER_LOGIN, SET_USERINFO, SET_PATHS,SET_Breadcrumb } from './actionTypes';
import { receive } from './actionCreate';
import qs from 'qs';
import { message } from 'antd';

interface fetchConf {
  url: string;
  actionType: string;
  subreddit: string;
  data: any;
}

function fetchPosts(url: string, actionType: string, subreddit: string, data: any) {
  return (dispatch: any) => {
    dispatch(receive(actionType, subreddit, '暂无数据'));
    return http
      .post(url, qs.stringify(data))
      .then((res: any) => {
        switch (res.status) {
          case 200:
            message.success(res.msg, 1);
            dispatch(receive(actionType, subreddit, res.data));
            break;
          case 500:
            message.error(res.msg, 1);
            break;
          default:
            break;
        }
      })
      .catch((err: any) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.desc = '请求错误';
              break;
            case 401:
              err.desc = '未授权，请登录';
              break;
            case 403:
              err.desc = '拒绝访问';
              break;
            case 404:
              err.desc = '请求地址出错';
              break;
            case 408:
              err.desc = '请求超时';
              break;
            case 500:
              err.desc = '服务器内部错误';
              break;
            case 501:
              err.desc = '服务未实现';
              break;
            case 502:
              err.desc = '网关错误';
              break;
            case 503:
              err.desc = '服务不可用';
              break;
            case 504:
              err.desc = '网关超时';
              break;
            case 505:
              err.desc = 'HTTP版本不受支持';
              break;
            default:
              err.desc = '请求失败';
          }
          message.error(err.desc, 1);
        }
      });
  };
}

export const mapLogin = {
  mapStateToProps(state: any) {
    return state.getLogin;
  },
  mapDispatchToProps(dispatch: any) {
    return {
      handleLogin: (data: any) => {
        return dispatch(fetchPosts('/login', USER_LOGIN, 'userInfo', data));
      },
    };
  },
};

export const mapSetInfo = {
  mapStateToProps(state: any) {
    return state.setUserInfo;
  },
  mapDispatchToProps(dispatch: any) {
    return {
      setUserInfo: (data: any) => {
        return dispatch(receive(SET_USERINFO, 'userInfo', data));
      },
    };
  },
};

// ===================================全局面包屑paths
export const mapPaths = {
  mapStateToProps(state: any) {
    return state.setMainPaths;
  },
  mapDispatchToProps(dispatch: any) {
    return {
      handlePaths: (data: any) => {
        return dispatch(receive(SET_PATHS, 'paths', data));
      },
    };
  },
};

export const mapBreadcrumbs = {
  mapStateToProps(state: any) {
    return state.setBreadcrumb;
  },
  mapDispatchToProps(dispatch: any) {
    return {
      handleBreadcrumb: (data: any) => {
        return dispatch(receive(SET_Breadcrumb, 'breadcrumb', data));
      },
    };
  },
};
