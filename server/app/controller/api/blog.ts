import { Controller } from 'egg';

export default class MainController extends Controller {
  /**
   * PostOne 创建日记
   */
  public async PostOne() {
    const { ctx } = this;
    const { service } = ctx;

    ctx.body = await service.blog.SaveBlog(
      Object.assign(ctx.request.body, {
        user_id: ctx.session.UserInfo.id
      })
    );
  }

  /**
   * PutOne
   */
  public async PutOne() {
    const { ctx } = this;
    const { service, helper } = ctx;
    const reqBody = ctx.request.body;

    if (!reqBody.id) {
      return (ctx.body = helper.ApiError('id 必填'));
    }

    ctx.body = await service.blog.SaveBlog(
      Object.assign(reqBody, {
        user_id: ctx.session.UserInfo.id
      })
    );
  }

  /**
   * GetPager 日记分页
   */
  public async GetPager() {
    const { ctx } = this;
    const { service } = ctx;

    ctx.body = await service.blog.GetPager(ctx.request.query);
  }

  /**
   * GetOne
   */
  public async GetOne() {
    const { ctx } = this;
    const { service } = ctx;

    ctx.body = await service.blog.GetOne(+ctx.request.query.id);
  }
}
