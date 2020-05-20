import { Service } from 'egg';

/**
 * MicroBlog Service
 */
export default class MicroBlog extends Service {
  /**
   * 发布微博
   * MicroBlog: { content: string; image: string }
   */
  public async PostMicroBlog() {
    const AAA = await this.ctx.model.MicroBlog.findOne({
      where: {
        id: 1,
      },
    });

    return AAA;
  }

  /**
   * sayHi to you
   * @param name - your name
   */
  public async sayHi(name: string) {
    return `hi, ${name}`;
  }
}
