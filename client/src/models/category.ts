import { createModel } from '@rematch/core';
import * as ApiCategory from '../api/category';

import * as TypeModel from '../types/model';

interface TypeCategoryState {
  Categorys: TypeModel.TypeCategoryModel[];
}

const initState: TypeCategoryState = {
  Categorys: []
};

export default createModel({
  state: initState,
  reducers: {
    UpdateCategorys: function(state: TypeCategoryState, payload: TypeModel.TypeCategoryModel[]): TypeCategoryState {
      return Object.assign({}, state, {
        Categorys: payload
      });
    }
  },
  effects: ({ Category }) => ({
    async GetAll() {
      const data = await ApiCategory.GetAll();
      if (data.success) {
        Category.UpdateCategorys(data.data);
      }
    }
  })
});
