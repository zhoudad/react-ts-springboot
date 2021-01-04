import { USER_LOGIN } from './actionTypes';

// action 是一个对象，type是必须的
export function USER_LOGIN_FUN(dataName: string, data: any) {
  return {
    type: USER_LOGIN,
    [dataName]: data,
  };
}

export const receive = (typeName: string, dataName: string, data: any) => {
  return {
    type: typeName,
    [dataName]: data,
  };
};
