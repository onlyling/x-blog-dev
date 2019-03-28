import { createModel } from '@rematch/core';
import * as ApiPager from '../api/pager';
import * as ApiBlog from '../api/blog';

import * as TypeModel from '../types/model';
import { BaseResponse } from '../axios';

// Pager 基本 State
interface TypePagerState {
  isFetching: boolean;
  type: string;
  BlogPager: TypeModel.TypeBlogPagerModel;
  CurBlog: TypeModel.TypeBlogModel;
}

// 总共有多少个pager
type TypePagerSets = '' | 'BlogPager';
type TypeCurSets = '' | 'CurBlog';

// Pager 初始化 State
const initState: TypePagerState = {
  isFetching: false,
  type: '',
  BlogPager: {} as TypeModel.TypeBlogPagerModel,
  CurBlog: {} as TypeModel.TypeBlogModel
};

// GetPager 的 params
type TypeGetPagerParams<T = any> = {
  type: TypePagerSets;
  fn: (params: any) => Promise<BaseResponse<T>>;
  params: any;
};

// getPagerType params
type TypePagerType = {
  type: TypePagerSets;
  n: number;
};

// 更新 pager 的参数
type TypeUpdatePagerParams = {
  type: TypePagerType;
  data: object;
};

// 更新 cur 的参数
type TypeUpdateCurParams = {
  type: TypeCurSets;
  data: object;
};

type TypeUpdateSomeCurParams = {
  type: TypeCurSets;
  params: any;
};

/**
 * 标记请求 避免重合
 */
let FetchNumber: number = 0;
// 获取新的请求标识
const getNextFetchNumber = (): number => {
  return FetchNumber++;
};

/**
 * 获取 pager 请求的标识
 * 类型 + 分页
 * @param {Object} param0
 */
const getPagerType = ({ type = '', n }: TypePagerType): string => {
  return `${type}__${n}`;
};

export default createModel({
  state: initState,
  reducers: {
    // 更新加载状态
    UpdateFetch(state: TypePagerState, payload: boolean): TypePagerState {
      return Object.assign({}, state, {
        isFetching: payload
      });
    },
    // 更新分页类型
    UpdateType(state: TypePagerState, payload: TypePagerType): TypePagerState {
      return Object.assign({}, state, {
        type: getPagerType(payload)
      });
    },
    // 更新 pager
    UpdatePager(state: TypePagerState, { type, data }: TypeUpdatePagerParams): TypePagerState {
      const __curType = getPagerType(type);
      const __type = state['type'];

      if (__type === __curType) {
        return Object.assign({}, state, {
          [type.type]: data
        });
      } else {
        return state;
      }
    },
    // 更新 CurXXX
    UpdateCur(state: TypePagerState, { type, data }: TypeUpdateCurParams): TypePagerState {
      return Object.assign({}, state, {
        [type]: data
      });
    }
  },
  effects: ({ Pager }) => ({
    // 分页公共操作
    async GetPager({ type, fn, params }: TypeGetPagerParams): Promise<void> {
      const __type: TypePagerType = {
        type,
        n: getNextFetchNumber()
      };

      Pager.UpdateFetch(true);
      Pager.UpdateType(__type);

      const data = await fn(params);

      if (data.success) {
        Pager.UpdatePager({
          type: __type,
          data: data.data || { list: [] }
        });
      }

      Pager.UpdateFetch(false);
    },
    // 日记分页
    async GetBlogPager(params: any) {
      const param: TypeGetPagerParams<TypeModel.TypeBlogPagerModel> = {
        type: 'BlogPager',
        fn: ApiPager.GetBlogPager,
        params: params
      };
      Pager.GetPager(param);
    },
    // 某个更新某个详情
    async UpdateSomeCur({ type, params }: TypeUpdateSomeCurParams) {
      let ajax;
      switch (type) {
        case 'CurBlog':
          ajax = ApiBlog.GetBlogById;
          break;

        default:
          break;
      }
      // TODO 先从 pager 里捞数据

      // 拉取更新
      if (!!!ajax) {
        return false;
      }
      const data = await ajax(params);
      if (data.success) {
        Pager.UpdateCur({
          type,
          data: data.data
        });
      }
    }
  })
});
