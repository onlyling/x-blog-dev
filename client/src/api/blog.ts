import { Ajax } from '../axios';

import * as TypeModel from '../types/model';

export const GetBlogById = (id: number) => {
  return Ajax.get<TypeModel.TypeBlogModel>('/api/blog/one', {
    params: { id }
  });
};
