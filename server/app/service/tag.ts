import { Service } from 'egg';

export type TagNew = {
  name: string;
};

/**
 * Tag Service
 */
export default class Tag extends Service {
  /**
   * 用户注册
   */
  public async PostTag(tag: TagNew) {
    const { ctx, app } = this;

    // 检测数据
    /** 数据错误 */
    const errors = app.validator.validate(
      {
        name: {
          required: true,
          type: 'string',
        },
      },
      tag,
    );

    if (errors && errors.length) {
      return ctx.helper.APIFail(`数据有误[${errors.map((e) => e.field)}]`);
    }

    // 检测标签是否重复
    /** 同名数据 */
    const sameData = await ctx.model.Tag.findOne({
      where: {
        name: tag.name,
      },
    });

    if (sameData) {
      return ctx.helper.APIFail('已有同名标签');
    }

    // 创建标签
    try {
      const tagData = await ctx.model.Tag.create(tag);
      return ctx.helper.APISuccess(tagData);
    } catch (error) {
      return ctx.helper.APIFail('创建标签失败');
    }
  }

  /**
   * sayHi to you
   * @param name - your name
   */
  public async sayHi(name: string) {
    return `hi, ${name}`;
  }
}
