import { Controller } from 'egg';

export default class MainController extends Controller {
  /**
   * PostOne 创建标签
   */
  public async PostOne() {
    const { ctx } = this;
    const { service } = ctx;

    ctx.body = await service.tag.PostOne({
      name: ctx.request.body.name
    });
  }

  /**
   * GetPager 标签分页
   */
  public async GetPager() {
    const { ctx } = this;
    const { service } = ctx;

    ctx.body = await service.tag.GetPager(ctx.request.query);
  }
}
