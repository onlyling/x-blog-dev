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
}
