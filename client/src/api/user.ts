import { Ajax } from '../axios';

import * as TypeModel from '../types/model';

/**
 * 用户登录
 * @param params
 */
export const PostLogin = (params: TypeModel.TypeUserModel) => {
  return Ajax.post<TypeModel.TypeUserModel>('/api/user/login', params);
};

/**
 * 用户注册
 * @param params
 */
export const PostRegister = (params: TypeModel.TypeUserModel) => {
  return Ajax.post<TypeModel.TypeUserModel>('/api/user/one', params);
}
