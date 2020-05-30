import { Controller } from 'egg';

export default class UserController extends Controller {
  /**
   * 用户登录；
   * {string} user_name 用户名
   * {string} password 密码
   */
  public async PostLogin() {
    const { ctx, app } = this;
    const { body } = ctx.request;

    // 校验数据
    /** 数据错误 */
    const errors = app.validator.validate(
      {
        user_name: {
          required: true,
          type: 'string',
        },
        password: {
          required: true,
          type: 'string',
        },
      },
      body,
    );

    if (errors && errors.length) {
      return (ctx.body = ctx.helper.APIFail(`数据有误[${errors.map((e) => e.field)}]`));
    }

    // 查询数据
    const user = await ctx.model.User.findOne({
      where: {
        user_name: body.user_name,
      },
    });

    if (!user) {
      return (ctx.body = ctx.helper.APIFail('登录失败'));
    }

    if (user.password !== body.password) {
      return (ctx.body = ctx.helper.APIFail('密码不正确'));
    }

    // 登录成功
    // 生成 token
    const token = app.jwt.sign(
      {
        id: user.id,
        user_name: user.user_name,
      },
      app.config.jwt.secret,
      {
        expiresIn: '24h',
      },
    );

    console.log(ctx.state);

    ctx.body = ctx.helper.APISuccess({
      token,
    });
  }

  /**
   * 用户注册
   * {string} user_name 用户名
   * {string} password 密码
   */
  public async PostRegister() {
    const { ctx } = this;

    const user = await ctx.service.user.register(ctx.request.body);

    // 创建用户失败
    if (user.code !== 0) {
      ctx.body = user;
    } else {
      ctx.body = user;
    }
  }
}
