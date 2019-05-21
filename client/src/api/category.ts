import { Ajax } from '../axios';
import * as TypeModel from '../types/model';

export const GetAll = () => {
  return Ajax.get<TypeModel.TypeCategoryModel[]>('/api/category/all');
};
