import * as crypto from 'crypto';
import * as marked from 'marked';
import highlight from 'highlight.js';

marked.setOptions({
  highlight: function(code) {
    return highlight.highlightAuto(code).value;
  }
});

import { TypeApiBaseResponse } from '../typings/global';

/**
 * 成功返回数据
 * @param data any 返回的内容
 */
const ApiSuccess = (data: any): TypeApiBaseResponse => {
  const __data: TypeApiBaseResponse = {
    success: true
  };

  if (typeof data === 'object') {
    __data.data = data;
  } else {
    __data.msg = data;
  }

  return __data;
};

/**
 * 失败返回的数据
 * @param data any 返回的数据
 */
const ApiError = (data: any): TypeApiBaseResponse => {
  const __data: TypeApiBaseResponse = {
    success: false
  };

  if (typeof data === 'object') {
    __data.msg = JSON.stringify(data);
  } else {
    __data.msg = data;
  }

  return __data;
};

/**
 * sha1 加密一段字符串
 * @param str 字符串
 */
const doEncryptBySHA1 = (str: any): string => {
  return crypto
    .createHash('sha1')
    .update(str)
    .digest('hex');
};

/**
 * markdown 转 HTML
 */
const Marked = (str: string): string => {
  // TODO Marked
  return str;
};

/**
 * 格式化 分页数据
 * @param datas
 * @param curpage
 * @param pagesize
 */
const formatPagerDate = (datas, curpage: number, pagesize: number) => {
  curpage = +curpage;
  return {
    list: datas.rows,
    pagesize,
    curpage,
    totals: datas.count,
    pages: Math.ceil(datas.count / pagesize)
  };
};

const formartMarkdown = (str: string): string => {
  return marked(str);
};

export default {
  ApiSuccess,
  ApiError,
  doEncryptBySHA1,
  Marked,
  formatPagerDate,
  formartMarkdown
};
