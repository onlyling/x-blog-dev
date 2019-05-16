import { Controller } from 'egg';
import { TypeUserModelAttributes } from '../../model/User';

export default class MainController extends Controller {
  /**
   * PostLogin
   */
  public async PostLogin() {
    const { ctx } = this;
    const { service } = ctx;
    ctx.body = await service.user.PostLogin(ctx.request.body);
  }

  /**
   * PostOne 创建用户
   */
  public async PostOne() {
    const { ctx } = this;
    const { service } = ctx;

    ctx.body = await service.user.PostOne(ctx.request.body);
  }

  /**
   * GetOne
   */
  public async GetOne() {
    const { ctx } = this;
    const { service } = ctx;

    ctx.body = await service.user.GetOne(+ctx.request.query.id);
  }

  /**
   * PutOne
   */
  public async PutOne() {
    const { ctx } = this;
    const { service } = ctx;
    const params = ctx.request.body as TypeUserModelAttributes;

    params.id = ctx.session.UserInfo.id;

    ctx.body = await service.user.PutOne(params);
  }

  /**
   * PutPassword
   */
  public async PutPassword() {
    const { ctx } = this;
    const { service } = ctx;
    const params = ctx.request.body;

    ctx.body = await service.user.PutPassword(params.id, params.password, params.new_password);
  }

  /**
   * GetUserIsLogin
   */
  public async GetUserIsLogin() {
    const { ctx } = this;
    const {
      session: { UserInfo },
      helper
    } = ctx;

    if (UserInfo && UserInfo.id) {
      ctx.body = helper.ApiSuccess(UserInfo);
    } else {
      ctx.body = helper.ApiError('登录超时');
    }
  }
}
