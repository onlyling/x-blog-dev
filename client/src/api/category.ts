import { Ajax } from '../axios';
import * as TypeModel from '../types/model';
import * as TypeParam from '../types/param';

/**
 * 获取所有类目
 */
export const GetAll = () => {
  return Ajax.get<TypeModel.TypeCategoryModel[]>('/api/category/all');
};

/**
 * 新增类目
 * @param param
 */
export const PostOne = (param: TypeParam.TypeCategoryParam) => {
  return Ajax.post<TypeModel.TypeCategoryModel>('/admin/category/one', param);
};

/**
 * 编辑类目
 * @param param
 */
export const PutOne = (param: TypeParam.TypeCategoryParam) => {
  return Ajax.put<TypeModel.TypeCategoryModel>('/admin/category/one', param);
};
