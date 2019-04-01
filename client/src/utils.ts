import { TypeUserModel } from './types/model';
import { type } from 'os';

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

type TypeFormatDate = {
  [index: string]: any;
};

/**
 *
 * @param t
 * @param format yyyy-MM-dd hh:mm:ss
 */
export const formatTime = (t: string, format = 'yyyy-MM-dd hh:mm:ss') => {
  const __now = new Date(t);
  const date: TypeFormatDate = {
    'M+': __now.getMonth() + 1,
    'd+': __now.getDate(),
    'h+': __now.getHours(),
    'm+': __now.getMinutes(),
    's+': __now.getSeconds(),
    'q+': Math.floor((__now.getMonth() + 3) / 3),
    'S+': __now.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (__now.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length)
      );
    }
  }
  return format;
};
