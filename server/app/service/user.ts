import { Service } from 'egg';

import { TypeApiBaseResponse } from '../typings/global';

// 登录的参数约定
type TypeLoginParams = {
  user_name: string;
  password: string;
  is_admin?: boolean;
};

// 注册的参数约定
type TypeRegisterParams = {
  user_name: string;
  password: string;
  super_admin?: number;
  id?: number;
};

/**
 * User Service
 */
export default class MainService extends Service {
  /**
   * 用户登录
   */
  public async PostLogin({
    user_name = '',
    password = '',
    is_admin = false
  }: TypeLoginParams): Promise<TypeApiBaseResponse> {
    const { ctx } = this;
    const { helper, model } = ctx;
    const loginErrorMSG = '用户名或密码错误';

    if (user_name == '') {
      return helper.ApiError('user_name 必填');
    }

    if (password == '') {
      return helper.ApiError('password 必填');
    }

    const instance = await model.User.findOne({
      where: {
        user_name: user_name
      }
    });

    if (instance) {
      password = helper.doEncryptBySHA1(password);
      if (instance.password === password) {
        if (is_admin && !instance.get('super_admin')) {
          return helper.ApiSuccess('用户登录失败，权限不够');
        }
        // 登录成功
        ctx.session.UserInfo = instance;

        return helper.ApiSuccess(instance);
      } else {
        return helper.ApiError(loginErrorMSG);
      }
    } else {
      return helper.ApiError(loginErrorMSG);
    }
  }

  /**
   * 创建用户
   * @param params user_name、password
   */
  public async PostOne(params: TypeRegisterParams): Promise<TypeApiBaseResponse> {
    return this.SaveUser(params);
  }

  /**
   * 保存用户
   * @param params user_name、password、super_admin、id
   *
   */
  public async SaveUser({ user_name = '', password = '', super_admin = 1, id = 0 }): Promise<TypeApiBaseResponse> {
    const { ctx } = this;
    const { helper, model } = ctx;
    if (user_name == '') {
      return helper.ApiError('user_name 必填');
    }

    if (password == '') {
      return helper.ApiError('password 必填');
    }

    console.log(user_name);
    console.log(password);
    console.log(super_admin);
    console.log(id);

    // 用户参数
    const params = {
      user_name,
      super_admin,
      password: ''
    };

    if (password) {
      params.password = helper.doEncryptBySHA1(password);
    }

    if (id === 0) {
      // 新增
      // 是否同名
      const oldInstance = await model.User.findOne({
        where: {
          user_name: user_name
        }
      });
      if (oldInstance) {
        return helper.ApiError('已存在同名用户');
      }

      // 新增用户
      const instance = await model.User.create(params);
      if (instance) {
        return helper.ApiSuccess(instance);
      } else {
        return helper.ApiError('创建用户失败');
      }
    } else {
      // 编辑
      return helper.ApiError('TODO');
    }
  }
}
