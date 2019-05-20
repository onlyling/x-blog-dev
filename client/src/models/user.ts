import { createModel } from '@rematch/core';
import * as Utils from '../utils';
import * as ApiUser from '../api/user';

import * as TypeModel from '../types/model';
import { BaseResponse } from '../axios';
import * as Store from '../store';

// User 基本 State
interface TypeUserState {
  UserInfo: TypeModel.TypeUserModel;
}

export type TypeReturnUserModel = BaseResponse<TypeModel.TypeUserModel>;

// User 初始化 State
const initState: TypeUserState = {
  UserInfo: Utils.GetOldUserInfo()
};

export default createModel({
  state: initState,
  reducers: {
    // 更新登录人信息
    UpdateUserInfo: function(state: TypeUserState, payload: TypeModel.TypeUserModel): TypeUserState {
      Utils.PutOldUserInfo(payload);
      return Object.assign({}, state, {
        UserInfo: payload
      });
    }
  },
  effects: ({ User }) => ({
    async GetUserLogout() {
      const data = await ApiUser.GetUserLogout();
      if (data.success) {
        User.UpdateUserInfo({});
      }
    }
  })
});
