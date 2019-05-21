import { Service } from 'egg';

import { TypeApiBaseResponse } from '../typings/global';

/**
 *
 */
type TypeBlogParams = {
  id?: number;
  title: string;
  markdown_content: string;
  user_id: number;
  tags: number[];
  category_id: number;
};

/**
 * Blog Service
 */
export default class MainService extends Service {
  /**
   * SaveBlog
   */
  public async SaveBlog({
    id = 0,
    title = '',
    markdown_content = '',
    tags = [],
    category_id = 0,
    user_id = 0
  }: TypeBlogParams): Promise<TypeApiBaseResponse> {
    const { ctx } = this;
    const { helper, model } = ctx;

    if (title === '') {
      return helper.ApiError('title 必填');
    }
    if (markdown_content === '') {
      return helper.ApiError('markdown_content 必填');
    }

    if (category_id === 0) {
      return helper.ApiError('category_id 必填');
    }

    if (user_id === 0) {
      return helper.ApiError('user_id 必填');
    }

    // 校验 category_id 是否合法
    const categoryInstance = await model.Category.findOne({
      where: {
        id: category_id
      }
    });
    if (!!!categoryInstance) {
      return helper.ApiError('category_id 填写有误');
    }

    // 校验 tags 是否合法
    if (tags.length > 0) {
      let datas = await Promise.all(
        tags.map((id) => {
          return model.Tag.findOne({
            where: {
              id
            }
          });
        })
      );

      datas = datas.filter((s) => {
        return !!s;
      });

      if (tags.length != datas.length) {
        return helper.ApiError('tags 填写有误');
      }
    }

    // const content = helper.Marked(markdown_content);

    if (id) {
      // 修改文章
      const instance = await model.Blog.findOne({
        where: {
          id: id
        }
      });

      if (instance) {
        await instance.update({
          title,
          markdown_content,
          content: helper.formartMarkdown(markdown_content)
        });

        instance.setCategory(category_id);
        instance.setTags(tags);

        return helper.ApiSuccess(instance);
      } else {
        return helper.ApiError('文章不存在');
      }
    } else {
      // 保存文章
      const instance = await model.Blog.create({
        title,
        markdown_content,
        content: helper.formartMarkdown(markdown_content)
      });

      if (instance) {
        instance.setCategory(category_id);
        instance.setTags(tags);
        instance.setUser(user_id);

        return helper.ApiSuccess(instance);
      } else {
        return helper.ApiError('文章创建失败');
      }
    }
  }

  /**
   * GetPager
   */
  public async GetPager({ curpage = 1, pagesize = 10 }): Promise<TypeApiBaseResponse> {
    const { ctx } = this;
    const { helper, model } = ctx;

    const data = await model.Blog.findAndCountAll({
      distinct: true,
      where: {},
      limit: pagesize,
      offset: (curpage - 1) * pagesize,
      order: [['created_at', 'DESC']],
      attributes: { exclude: ['diy_url'] },
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
        },
        {
          model: model.Tag,
          as: 'tags',
          attributes: ['id', 'name'],
          through: {
            attributes: ['blog_and_tag']
          }
        }
      ]
    });

    return helper.ApiSuccess(helper.formatPagerDate(data, curpage, pagesize));
  }

  /**
   * GetOne
   */
  public async GetOne(id: number) {
    const { ctx } = this;
    const { helper, model } = ctx;
    if (!!!id) {
      return helper.ApiError('id 不存在');
    }

    const data = await model.Blog.findOne({
      where: {
        id
      },
      attributes: { exclude: ['diy_url'] },
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
        },
        {
          model: model.Tag,
          as: 'tags',
          attributes: ['id', 'name'],
          through: {
            attributes: ['blog_and_tag']
          }
        }
      ]
    });

    if (data) {
      return helper.ApiSuccess(data);
    } else {
      return helper.ApiError('查询结果不存在');
    }
  }
}
