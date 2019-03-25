import { Ajax, BaseResponse } from '../axios';

import { TypeUserModel } from '../types/model';

/**
 * 用户登录
 * @param params
 */
export const PostLogin = (params: TypeUserModel): Promise<BaseResponse<TypeUserModel>> => {
  return Ajax.post<TypeUserModel>('/api/user/login', params);
};

/**
 * 用户注册
 * @param params
 */
export const PostRegister = (params: TypeUserModel): Promise<BaseResponse<TypeUserModel>> => {
  return Ajax.post<TypeUserModel>('/api/user/one', params);
}
