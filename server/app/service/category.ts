import { Service } from 'egg';

import { TypeApiBaseResponse } from '../typings/global';

type TypeCategoryParams = {
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
  public async PostOne(params: TypeCategoryParams): Promise<TypeApiBaseResponse> {
    return this.SaveCategory(params);
  }

  /**
   * PutOne
   */
  public async PutOne({ id, name = '' }: TypeCategoryParams): Promise<TypeApiBaseResponse> {
    const { ctx } = this;
    const { helper } = ctx;

    if (!!!id) {
      return helper.ApiError('id 必填');
    }

    return this.SaveCategory({
      id,
      name
    });
  }

  /**
   * SaveCategory
   */
  public async SaveCategory({ id, name = '' }: TypeCategoryParams): Promise<TypeApiBaseResponse> {
    const { ctx } = this;
    const { helper, model } = ctx;

    if (name == '') {
      return helper.ApiError('name 必填');
    }

    // 方式同名
    const sameNameInstance = await model.Category.findOne({
      where: {
        name
      }
    });
    if (!!!id && !!sameNameInstance) {
      return helper.ApiError('已存在同名类目');
    }

    if (!!sameNameInstance && sameNameInstance.id != id) {
      return helper.ApiError('已存在同名类目');
    }

    if (!!id) {
      const instance = await model.Category.findOne({
        where: {
          id: id
        }
      });

      if (!!!instance) {
        // 没有就去创建
        return this.PostOne({ name });
      }

      // 修改类目
      await instance.update({
        name
      });

      return helper.ApiSuccess(instance);
    } else {
      // 保存类目
      const instance = await model.Category.create({
        name
      });
      if (instance) {
        return helper.ApiSuccess(instance);
      } else {
        return helper.ApiError('创建类目失败');
      }
    }
  }

  /**
   * DeleteOne
   */
  public async DeleteOne(id: number) {
    const { ctx } = this;
    const { helper, model } = ctx;

    if (!!!id) {
      return helper.ApiError('id 必填');
    }

    const instance = await model.Category.findOne({
      where: {
        id: id
      }
    });

    if (!!!instance) {
      return helper.ApiError('类目不存在');
    }

    const blogs = await model.Blog.findAll({
      where: {
        category_id: id
      }
    });

    // 如果还有文章
    if (!!blogs && blogs.length > 0) {
      return helper.ApiError(`该类目下还有 ${blogs.length} 篇文章`);
    }

    await instance.destroy();

    return helper.ApiSuccess('操作成功');
  }

  /**
   * GetAll
   */
  public async GetAll(): Promise<TypeApiBaseResponse> {
    const { ctx } = this;
    const { helper, model } = ctx;

    const datas = await model.Category.findAll();
    if (datas) {
      return helper.ApiSuccess(datas);
    } else {
      return helper.ApiError('没有适合的数据');
    }
  }

  /**
   * GetPager
   */
  public async GetPager({ curpage = 1, pagesize = 10 }): Promise<TypeApiBaseResponse> {
    const { ctx } = this;
    const { helper, model } = ctx;

    const data = await model.Category.findAndCountAll({
      where: {},
      limit: pagesize,
      offset: (curpage - 1) * pagesize,
      order: [['created_at', 'DESC']]
    });

    return helper.ApiSuccess(helper.formatPagerDate(data, curpage, pagesize));
  }
}
