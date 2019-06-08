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
   * PutOne
   */
  public async PutOne() {
    const { ctx } = this;
    const {
      service,
      request: { body }
    } = ctx;

    ctx.body = await service.tag.PutOne({
      name: body.name,
      id: body.id
    });
  }

  /**
   * DeleteOne
   */
  public async DeleteOne() {
    const { ctx } = this;
    const { service } = ctx;

    ctx.body = await service.tag.DeleteOne(+ctx.request.query.id);
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

  /**
   * GetAll
   */
  public async GetAll() {
    const { ctx } = this;
    const { service } = ctx;

    ctx.body = await service.tag.GetAll();
  }
}
