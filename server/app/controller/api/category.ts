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
   * PutOne
   */
  public async PutOne() {
    const { ctx } = this;
    const {
      service,
      request: { body }
    } = ctx;

    ctx.body = await service.category.PutOne({
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

    ctx.body = await service.category.DeleteOne(+ctx.request.query.id);
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
