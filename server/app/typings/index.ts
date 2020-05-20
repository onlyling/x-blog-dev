/**
 * Api 最基础的返回数据格式类型
 */
export type BaseResponse<T = any> = {
  code: -1 | 0 | 401;
  data?: T;
  msg?: string;
};
