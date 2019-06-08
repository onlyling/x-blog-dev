import { Ajax } from '../axios';
import * as TypeModel from '../types/model';
import * as TypeParam from '../types/param';

export const GetAll = () => {
  return Ajax.get<TypeModel.TypeTagModel[]>('/api/tag/all');
};

/**
 * 新增类目
 * @param param
 */
export const PostOne = (param: TypeParam.TypeTagParam) => {
  return Ajax.post<TypeModel.TypeTagModel>('/admin/tag/one', param);
};

/**
 * 编辑类目
 * @param param
 */
export const PutOne = (param: TypeParam.TypeTagParam) => {
  return Ajax.put<TypeModel.TypeTagModel>('/admin/tag/one', param);
};

/**
 * 删除类目
 * @param param
 */
export const DeleteOne = (param?: number) => {
  return Ajax.delete<any>('/admin/tag/one', {
    params: {
      id: param
    }
  });
};
