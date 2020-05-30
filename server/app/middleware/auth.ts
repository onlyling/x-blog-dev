import { Context } from 'egg';

module.exports = (option: {
  /** 用户登录的范围 */
  scope: 'app' | 'admin';
}) => {
  return (ctx: Context, next) => {
    const user = ctx.state.user || {};

    if (!user.id) {
      return (ctx.body = ctx.helper.APIFail('请先登录'));
    }

    if (option.scope === 'admin' && !user.isxxx) {
      return (ctx.body = ctx.helper.APIFail('无权访问'));
    }

    next();
  };
};
