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
   * SaveCategory
   */
  public async SaveCategory({ id, name = '' }: TypeCategoryParams): Promise<TypeApiBaseResponse> {
    const { ctx } = this;
    const { helper, model } = ctx;

    if (name == '') {
      return helper.ApiError('name 必填');
    }

    if (id) {
      // 修改类目
      return helper.ApiSuccess('测试');
    } else {
      // 方式同名
      const sameNameInstance = await model.Category.findOne({
        where: {
          name
        }
      });
      if (sameNameInstance) {
        return helper.ApiError('已存在同名类目');
      }
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
