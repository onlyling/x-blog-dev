import { TypeUserModel } from './types/model';

/**
 * 匹配的路径
 * @param p match.path
 */
export const getRootPath = (p: string): string => {
  return p === '/' ? '' : p;
};

// 缓存用户信息的变量
const USER_INFO_KEY = '__UserInfo__';

/**
 * 获取层级的用户
 */
export const GetOldUserInfo = (): TypeUserModel => {
  let UserInfo: TypeUserModel = {} as TypeUserModel;
  try {
    const str = localStorage.getItem(USER_INFO_KEY);
    if (str) {
      const User: TypeUserModel = JSON.parse(str);
      if (User.id) {
        UserInfo = User;
      }
    }
  } catch (error) {}
  return UserInfo;
};

/**
 * 缓存用户信息
 * @param user
 */
export const PutOldUserInfo = (user: TypeUserModel): void => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
};
