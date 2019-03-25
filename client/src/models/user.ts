import { createModel } from '@rematch/core';
import { GetOldUserInfo } from '../utils';
// import { PostLogin } from '../api/user';

import { TypeUserModel } from '../types/model';
import { BaseResponse } from '../axios';
import { iRootState } from '../store';

// User 基本 State
interface TypeUserState {
  UserInfo: TypeUserModel;
  CurUser: TypeUserModel;
}

export type TypeReturnUserModel = BaseResponse<TypeUserModel>;

// 默认用户数据
const initUser = {} as TypeUserModel;

// User 初始化 State
const initState: TypeUserState = {
  UserInfo: GetOldUserInfo(),
  CurUser: initUser
};

export default createModel({
  state: initState,
  reducers: {
    // 更新登录人信息
    UpdateUserInfo: function(state: TypeUserState, payload: TypeUserModel): TypeUserState {
      return Object.assign({}, state, {
        UserInfo: payload
      });
    }
  },
  effects: ({ User }) => ({})
});
