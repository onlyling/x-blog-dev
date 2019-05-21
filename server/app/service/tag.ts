import { Service } from 'egg';

import { TypeApiBaseResponse } from '../typings/global';
// import { TypeTagModelAttributes } from '../typings/model';

// 新增参数
type TypeTagParams = {
  id?: number;
  name: string;
};

// 修复连表查询
interface TypeFixFindAndCounts {
  count: number;
}

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

    const data = await model.BlogAndTag.findAll({
      attributes: [
        'tag_id',
        // TODO Sequelize.fn 怎么使用的？？？
        [Sequelize.fn('', Sequelize.col('tag.name')), 'tag_name'],
        [Sequelize.fn('COUNT', Sequelize.col('tag_id')), 'count']
      ],
      group: 'tag_id',
      include: [
        {
          model: model.Tag,
          attributes: [],
          as: 'tag'
        }
      ],
      order: [[Sequelize.fn('COUNT', Sequelize.col('tag_id')), 'DESC']]
    });

    return helper.ApiSuccess(data);
  }

  /**
   * GetTagAndBlogPager
   */
  public async GetTagAndBlogPager({ curpage = 1, pagesize = 10, name = '' }): Promise<TypeApiBaseResponse> {
    const { ctx } = this;
    const { helper, model, app } = ctx;
    const { Sequelize } = app;

    const tagInsatnces = await model.Tag.findAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${name}%`
        }
      },
      raw: true
    });

    const tagIds = tagInsatnces.map((i) => {
      return i.id;
    });

    if (tagIds.length === 0) {
      return helper.ApiSuccess(
        helper.formatPagerDate(
          {
            rows: [],
            count: 0
          },
          curpage,
          pagesize
        )
      );
    }

    // TODO count 并没有踢重
    const tagAndBlogInstances = await model.BlogAndTag.findAndCountAll({
      where: {
        tag_id: {
          [Sequelize.Op.or]: tagIds
        }
      },
      limit: pagesize,
      offset: (curpage - 1) * pagesize,
      group: 'blog_id',
      order: [['created_at', 'DESC']],
      include: [
        {
          model: model.Tag,
          as: 'tag'
        },
        {
          model: model.Blog,
          as: 'blog',
          include: [
            {
              model: model.Category,
              as: 'category',
              attributes: ['id', 'name']
            },
            {
              model: model.User,
              as: 'user',
              attributes: ['id', 'user_name']
            }
            // TODO fix some error
            // {
            //   model: model.Tag,
            //   as: 'tags',
            //   attributes: ['id', 'name'],
            //   through: {
            //     attributes: ['blog_and_tag']
            //   }
            // }
          ]
        }
      ]
    });

    // some questions
    // https://github.com/sequelize/sequelize/issues/9109
    const count = tagAndBlogInstances.count as any;

    return helper.ApiSuccess(
      helper.formatPagerDate(
        Object.assign(tagAndBlogInstances, {
          count: count.reduce((accumulator, cV: TypeFixFindAndCounts) => {
            return accumulator + cV.count;
          }, 0)
        }),
        curpage,
        pagesize
      )
    );
  }

  /**
   * GetAll
   */
  public async GetAll(): Promise<TypeApiBaseResponse> {
    const { ctx } = this;
    const { helper, model } = ctx;

    const data = await model.Tag.findAll();
    if (data) {
      return helper.ApiSuccess(data);
    } else {
      return helper.ApiError('没有适合的数据');
    }
  }
}
