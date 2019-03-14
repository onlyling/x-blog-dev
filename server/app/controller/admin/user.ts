import { Controller } from 'egg';

export default class MainController extends Controller {
  /**
   * PostLogin
   */
  public async PostLogin() {
    const { ctx } = this;
    const { service } = ctx;
    ctx.body = await service.user.PostLogin(
      Object.assign(ctx.request.body, {
        is_admin: true
      })
    );
  }

  /**
   * PostOne 创建用户
   */
  public async PostOne() {
    // const { ctx } = this;
    // const { service } = ctx;

    // ctx.body = await service.user.PostOne(ctx.request.body);
  }
}
