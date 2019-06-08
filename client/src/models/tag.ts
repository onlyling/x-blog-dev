import { createModel } from '@rematch/core';
import * as APITag from '../api/tag';

import * as TypeModel from '../types/model';

interface TypeTagState {
  Tags: TypeModel.TypeTagModel[];
}

const initState: TypeTagState = {
  Tags: []
};

export default createModel({
  state: initState,
  reducers: {
    UpdateTags: function(state: TypeTagState, payload: TypeModel.TypeTagModel[]): TypeTagState {
      return Object.assign({}, state, {
        Tags: payload
      });
    }
  },
  effects: ({ Tag }) => ({
    async GetAll() {
      const data = await APITag.GetAll();
      if (data.success) {
        Tag.UpdateTags(data.data);
      }
    }
  })
});
