import { BaseResponse } from '../typings';

/**
 * 成功返回数据
 * @param data any 返回的内容
 */
const APISuccess = (data: any): BaseResponse => {
  const __data: BaseResponse = {
    code: 0,
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
const APIFail = (data: any, code = -1): BaseResponse => {
  const __data: BaseResponse = {
    code,
  };

  if (typeof data === 'object') {
    __data.msg = JSON.stringify(data);
  } else {
    __data.msg = data;
  }

  return __data;
};

export default {
  APISuccess,
  APIFail,
};
