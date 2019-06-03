import * as TypeMoel from './types/model';
import * as TypeGlobal from './types/global';
import { PaginationConfig } from 'antd/lib/pagination';
import { ReactNode } from 'react';

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
export const GetOldUserInfo = (): TypeMoel.TypeUserModel => {
  let UserInfo: TypeMoel.TypeUserModel = {} as TypeMoel.TypeUserModel;
  try {
    const str = localStorage.getItem(USER_INFO_KEY);
    if (str) {
      const User: TypeMoel.TypeUserModel = JSON.parse(str);
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
export const PutOldUserInfo = (user: TypeMoel.TypeUserModel): void => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
};

/**
 *
 * @param t
 * @param format yyyy-MM-dd hh:mm:ss
 */
export const formatTime = (t: string, format = 'yyyy-MM-dd hh:mm:ss') => {
  const __now = new Date(t);
  const date: TypeGlobal.TypeAnyObject = {
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

/**
 * 获取分页配置
 * @param {Object} param0
 * @param {Function} onChange
 */
export const getPager = (
  { curpage = 1, pagesize = 10, totals = 0, pages = 0 }: TypeGlobal.TypePagerParam,
  onChange: (page: number | string, pagesize?: number) => void
): PaginationConfig => {
  return {
    size: 'small',
    // showSize: true,
    showQuickJumper: true,
    current: curpage,
    pageSize: pagesize,
    total: totals,
    showTotal: (total: number, range: [number, number]): ReactNode => {
      return `第${curpage}/${pages}页 每页 ${pagesize} 项 共 ${total} 项`;
    },
    onChange
  };
};

/**
 * 键值对转对象
 * @param {String} str
 * @param {String} key
 */
export const getParam = (str: string, key?: string) => {
  var __o: TypeGlobal.TypeAnyObject = {};
  var __strArr: string[] = str.split('&');
  var __cValue: string = '';

  for (var i = __strArr.length - 1; i >= 0; i--) {
    var __d = __strArr[i].split('=');
    var __k = decodeURIComponent(__d[0]);
    var __v = decodeURIComponent(__d[1]);

    __cValue = __o[__k];

    if (__cValue) {
      if (typeof __cValue === 'string') {
        __o[__k] = [__cValue, __v];
      } else {
        __o[__k].push(__v);
      }
    } else {
      __o[__k] = __v;
    }
  }
  return key ? __o[key] : __o;
};

/**
 * 键值对转对象 search
 * @param {*} str
 * @param {*} key
 */
export const getParamBySearchString = (str: string, key?: string) => {
  if (str) {
    str = str.substr(1);
    return getParam(str, key);
  } else {
    return {};
  }
};

/**
 * 对象格式转成字符串
 * @param {Object} obj
 */
export const parseObject2search = (obj: { [index: string]: any }) => {
  let __s: string[] = [];
  let __ss: string = '';

  Object.keys(obj).forEach((key) => {
    let __value: string | [] = obj[key];
    let __v: string = '';
    if (Array.isArray(__value)) {
      __value.forEach((str) => {
        if (str) {
          __s.push(`${key}=${encodeURIComponent(str)}`);
        }
      });
    } else {
      __v = __value;
      __s.push(`${key}=${encodeURIComponent(__v)}`);
    }
  });

  if (__s.length) {
    __ss = `?${__s.join('&')}`;
  }

  return __ss;
};
