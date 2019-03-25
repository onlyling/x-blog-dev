import { Ajax, BaseResponse } from '../axios';
import { TypeBlogPagerModel } from '../types/model';

export const GetBlogPager = (params: any): Promise<BaseResponse<TypeBlogPagerModel>> => {
  return Ajax.get('/api/blog/pager', params);
};
