import { Service } from 'egg';

import { TypeApiBaseResponse } from '../typings/global';

type TypeTagParams = {
  id?: number;
  name: string;
};

/**
 * Tag Service
 */
export default class MainService extends Service {
  /**
   * PostOne
   */
  public async PostOne(params: TypeTagParams): Promise<TypeApiBaseResponse> {
    return this.SaveTag(params);
  }

  /**
   * SaveTag
   */
  public async SaveTag({ id, name = '' }: TypeTagParams): Promise<TypeApiBaseResponse> {
    const { ctx } = this;
    const { helper, model } = ctx;

    if (name == '') {
      return helper.ApiError('name 必填');
    }

    if (id) {
      // 修改标签
      return helper.ApiSuccess('测试');
    } else {
      // 方式同名
      const sameNameInstance = await model.Tag.findOne({
        where: {
          name
        }
      });
      if (sameNameInstance) {
        return helper.ApiError('已存在同名标签');
      }
      // 保存标签
      const instance = await model.Tag.create({
        name
      });
      if (instance) {
        return helper.ApiSuccess(instance);
      } else {
        return helper.ApiError('创建标签失败');
      }
    }
  }

  /**
   * GetPager
   */
  public async GetPager({ curpage = 1, pagesize = 10, name = '' }): Promise<TypeApiBaseResponse> {
    const { ctx } = this;
    const { helper, model, app } = ctx;
    const { Sequelize } = app;

    const data = await model.Tag.findAndCountAll({
      where: name
        ? {
            name: {
              [Sequelize.Op.like]: `%${name}%`
            }
          }
        : {},
      limit: pagesize,
      offset: (curpage - 1) * pagesize,
      order: [['created_at', 'DESC']],
      attributes: { exclude: ['created_at', 'updated_at'] }
    });

    return helper.ApiSuccess(helper.formatPagerDate(data, curpage, pagesize));
  }

  /**
   * GetTagRankList
   */
  public async GetTagRankList(): Promise<TypeApiBaseResponse> {
    const { ctx } = this;
    const { helper, model, app } = ctx;
    const { Sequelize } = app;

    // TODO 把 tag 的 name 找出来
    const data = await model.BlogAndTag.findAll({
      attributes: ['tag_id', [Sequelize.fn('COUNT', Sequelize.col('tag_id')), 'count']],
      group: 'tag_id',
      include: [
        // {
        //   model: model.Tag,
        //   attributes: ['name'],
        //   where: {
        //     id: Sequelize.col('BlogAndTag.tag_id')
        //   }
        // }
      ]
    });

    return helper.ApiSuccess(data);
  }
}
