import { Ajax } from '../axios';

import * as TypeModel from '../types/model';

export const GetBlogPager = (params: any) => {
  return Ajax.get<TypeModel.TypeBlogPagerModel>('/api/blog/pager', {
    params
  });
};
