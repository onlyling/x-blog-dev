import { Controller } from 'egg';

export default class MainController extends Controller {
  /**
   * PostOne 创建用户
   */
  public async PostOne() {
    const { ctx } = this;
    const { service } = ctx;

    ctx.body = await service.user.PostOne(ctx.request.body);
  }

  /**
   * PostLogin
   */
  public async PostLogin() {
    const { ctx } = this;
    const { service } = ctx;
    ctx.body = await service.user.PostLogin(ctx.request.body);
  }
}
