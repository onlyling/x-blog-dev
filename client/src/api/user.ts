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
};

/**
 * 通过用户 id 获取详情
 * @param id
 */
export const GetUserInfo = (id: number) => {
  return Ajax.get<TypeModel.TypeUserModel>('/api/user/one', {
    params: { id }
  });
};

/**
 * 更新用户资料
 */
export const PutUserInfo = (params: TypeModel.TypeUserModel) => {
  return Ajax.put<TypeModel.TypeUserModel>('/api/user/one', params);
};
