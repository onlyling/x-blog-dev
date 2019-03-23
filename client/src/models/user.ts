import { createModel } from '@rematch/core';
import { GetOldUserInfo } from '../utils';

import { TypeUserModel } from '../types/model';
import { BaseResponse } from '../axios';
import { iRootState } from '../store';

interface TypeUserState {
  UserInfo: TypeUserModel;
  CurUser: TypeUserModel;
}

const initUser = {} as TypeUserModel;

const initState: TypeUserState = {
  UserInfo: GetOldUserInfo(),
  CurUser: initUser
};

export default createModel({
  state: initState,
  reducers: {
    // 更新登录人信息
    UpdateUserInfo: function(state: TypeUserState, payload: TypeUserModel) {
      return Object.assign({}, state, {
        UserInfo: payload
      });
    }
  },
  effects: ({ User }) => ({
    async PostLogin(params: TypeUserState, rootState: iRootState): Promise<BaseResponse<TypeUserModel>> {
      const data = await rootState.Axios.post<TypeUserModel>('/api/user/login', params);
      if (data.success) {
        User.UpdateUserInfo(data.data);
      }
      return data;
    }
  })
});
