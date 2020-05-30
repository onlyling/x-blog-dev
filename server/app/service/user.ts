import { Service } from 'egg';

/**
 * User Service
 */
export default class User extends Service {
  public async register(user: { user_name: string; password: string; email: string }) {
    const { ctx, app } = this;

    // 检测数据
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
        email: {
          required: true,
          type: 'email',
        },
      },
      user,
    );

    if (errors && errors.length) {
      return ctx.helper.APIFail(`数据有误[${errors.map((e) => e.field)}]`);
    }

    // 检测用户是否重复
    /** 同名数据 */
    const sameData = await ctx.model.User.findOne({
      where: {
        [app.Sequelize.Op.or]: {
          user_name: user.user_name,
          email: user.email,
        },
      },
    });

    if (sameData) {
      return ctx.helper.APIFail(
        sameData.user_name === user.user_name ? '已有同名用户' : 'email 已注册过了',
      );
    }

    // 创建用户
    try {
      const userData = await ctx.model.User.create(user);
      return ctx.helper.APISuccess(userData);
    } catch (error) {
      return ctx.helper.APIFail('创建用户失败');
    }
  }

  /**
   * sayHi to you
   * @param name - your name
   */
  public async sayHi(name: string) {
    return `hi, ${name}`;
  }
}
