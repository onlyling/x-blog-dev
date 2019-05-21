import { Ajax } from '../axios';

import * as TypeModel from '../types/model';
import * as TypeParam from '../types/param';

/**
 * 通过 id 获取文章详情
 * @param id
 */
export const GetBlogById = (id: number) => {
  return Ajax.get<TypeModel.TypeBlogModel>('/api/blog/one', {
    params: { id }
  });
};

/**
 * 发布新文章
 * @param params
 */
export const PostBlog = (params: TypeParam.TypeBlogParam) => {
  return Ajax.post<TypeModel.TypeBlogModel>('/api/blog/one', params);
};

/**
 * 更新文章
 * @param params
 */
export const PutBlog = (params: TypeParam.TypeBlogParam) => {
  return Ajax.put<TypeModel.TypeBlogModel>('/api/blog/one', params);
};
