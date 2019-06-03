import { Ajax } from '../axios';

import * as TypeModel from '../types/model';

export const GetBlogPager = (params: any) => {
  return Ajax.get<TypeModel.TypeBlogPagerModel>('/api/blog/pager', {
    params
  });
};

export const GetCategoryPager = (params: any) => {
  return Ajax.get<TypeModel.TypeCategoryModel>('/api/category/pager', {
    params
  });
};
