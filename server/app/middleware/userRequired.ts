import { Context } from 'egg';

export default () => {
  return async (ctx: Context, next: any): Promise<void> => {
    const { helper } = ctx;
    const UserInfo = ctx.session.UserInfo || {};

    if (!UserInfo.id) {
      ctx.body = helper.ApiError('用户未登录');
      return;
    }

    await next();
  };
};
