import { Controller } from 'egg';

export default class MainController extends Controller {
  /**
   * PostOne 创建类目
   */
  public async PostOne() {
    const { ctx } = this;
    const { service } = ctx;

    ctx.body = await service.category.PostOne({
      name: ctx.request.body.name
    });
  }

  /**
   * GetAll
   */
  public async GetAll() {
    const { ctx } = this;
    const { service } = ctx;

    ctx.body = await service.category.GetAll();
  }

  /**
   * GetPager 日记分页
   */
  public async GetPager() {
    const { ctx } = this;
    const { service } = ctx;

    ctx.body = await service.category.GetPager(ctx.request.query);
  }
}
