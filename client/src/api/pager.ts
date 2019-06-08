import { Ajax } from '../axios';

import * as TypeModel from '../types/model';

/**
 * 文章分页
 * @param params
 */
export const GetBlogPager = (params: any) => {
  return Ajax.get<TypeModel.TypeBlogPagerModel>('/api/blog/pager', {
    params
  });
};

/**
 * 类目分页
 * @param params
 */
export const GetCategoryPager = (params: any) => {
  return Ajax.get<TypeModel.TypeCategoryModel>('/api/category/pager', {
    params
  });
};

/**
 * 标签分页
 * @param params
 */
export const GetTagPager = (params: any) => {
  return Ajax.get<TypeModel.TypeTagModel>('/api/tag/pager', {
    params
  });
};

/**
 * 用户分页
 * @param params
 */
export const GetUserPager = (params: any) => {
  return Ajax.get<TypeModel.TypeUserModel>('/admin/user/pager', {
    params
  });
};
