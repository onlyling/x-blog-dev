import { Service } from 'egg';

import { TypeApiBaseResponse } from '../typings/global';
import { TypeUserModelAttributes } from '../model/User';

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
  /**
   * GetOne
   */
  public async GetOne(id: number): Promise<TypeApiBaseResponse> {
    const { ctx } = this;
    const { helper, model } = ctx;
    const data = await model.User.findOne({
      where: {
        id
      }
    });

    if (data) {
      return helper.ApiSuccess(data);
    } else {
      return helper.ApiError('查询结果不存在');
    }
  }

  /**
   * PutOne
   */
  public async PutOne(params: TypeUserModelAttributes) {
    const { ctx } = this;
    const { helper, model } = ctx;

    if (!!!params.id) {
      return helper.ApiError('查询结果不存在');
    }

    // 清除可能附带的密码
    delete params.password;

    const data = await model.User.findOne({
      where: {
        id: params.id
      }
    });

    if (data) {
      await data.update(params);

      return helper.ApiSuccess(data);
    } else {
      return helper.ApiError('查询结果不存在');
    }
  }

  /**
   * PutPassword
   */
  public async PutPassword(id: number | string, password: string, new_password: string) {
    const { ctx } = this;
    const { helper, model } = ctx;
    if (!!!id) {
      return helper.ApiError('id 必填');
    }

    if (!!!password) {
      return helper.ApiError('password 必填');
    }

    if (!!!new_password) {
      return helper.ApiError('new_password 必填');
    }

    const data = await model.User.findOne({
      where: {
        id
      }
    });

    if (!!!data) {
      return helper.ApiError('查询结果不存在');
    }

    password = helper.doEncryptBySHA1(password);
    new_password = helper.doEncryptBySHA1(new_password);

    if (password != data.password) {
      return helper.ApiError('密码不正确');
    }

    await data.update({
      password: new_password
    });

    return helper.ApiSuccess('修改密码成功');
  }
}
