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

  /**
   * GetTagRankList 标签使用排行
   */
  public async GetTagRankList() {
    const { ctx } = this;
    const { service } = ctx;

    ctx.body = await service.tag.GetTagRankList();
  }

  /**
   * GetTagAndBlogPager
   */
  public async GetTagAndBlogPager() {
    const { ctx } = this;
    const { service } = ctx;

    ctx.body = await service.tag.GetTagAndBlogPager(ctx.request.query);
  }
}
