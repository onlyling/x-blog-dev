import { Controller } from 'egg';

export default class TagController extends Controller {
  /**
   * 创建标签
   * {string} name 标签名称
   */
  public async PostTag() {
    const { ctx } = this;

    ctx.body = await ctx.service.tag.PostTag(ctx.request.body);
  }
}
