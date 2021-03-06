import { createModel } from '@rematch/core';
import * as ApiPager from '../api/pager';
import * as ApiBlog from '../api/blog';
import * as ApiUser from '../api/user';

import * as TypeModel from '../types/model';
import * as Store from '../store';
import { BaseResponse } from '../axios';

// Pager 基本 State
interface TypePagerState {
  isFetching: boolean;
  type: string;
  BlogPager: TypeModel.TypeBlogPagerModel;
  CategoryPager: TypeModel.TypeCategoryPagerModel;
  TagPager: TypeModel.TypeTagPagerModel;
  UserPager: TypeModel.TypeUserPagerModel;
  CurBlog: TypeModel.TypeBlogModel;
  CurUser: TypeModel.TypeUserModel;
}

// 总共有多少个pager
type TypePagerSets = '' | 'BlogPager' | 'UserPager' | 'CategoryPager' | 'TagPager';
type TypeCurSets = '' | 'CurBlog' | 'CurUser' | 'CurCategory' | 'CurTag';

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

// Pager 初始化 State
const initState: TypePagerState = {
  isFetching: false,
  type: '',
  BlogPager: {} as TypeModel.TypeBlogPagerModel,
  CategoryPager: {} as TypeModel.TypeCategoryPagerModel,
  TagPager: {} as TypeModel.TypeTagPagerModel,
  UserPager: {} as TypeModel.TypeUserPagerModel,
  CurBlog: {} as TypeModel.TypeBlogModel,
  CurUser: {} as TypeModel.TypeUserModel
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
    // 文章分页
    async GetBlogPager(params: any) {
      const param: TypeGetPagerParams<TypeModel.TypeBlogPagerModel> = {
        type: 'BlogPager',
        fn: ApiPager.GetBlogPager,
        params: params
      };
      Pager.GetPager(param);
    },
    // 类目分页
    async GetCategoryPager(params: any) {
      const param: TypeGetPagerParams<TypeModel.TypeCategoryModel> = {
        type: 'CategoryPager',
        fn: ApiPager.GetCategoryPager,
        params: params
      };
      Pager.GetPager(param);
    },
    // 标签分页
    async GetTagPager(params: any) {
      const param: TypeGetPagerParams<TypeModel.TypeTagModel> = {
        type: 'TagPager',
        fn: ApiPager.GetTagPager,
        params: params
      };
      Pager.GetPager(param);
    },
    // 用户分页
    async GetUserPager(params: any) {
      const param: TypeGetPagerParams<TypeModel.TypeUserModel> = {
        type: 'UserPager',
        fn: ApiPager.GetUserPager,
        params: params
      };
      Pager.GetPager(param);
    },
    // 某个更新某个详情
    async UpdateSomeCur({ type, params }: TypeUpdateSomeCurParams, rootState: Store.iRootState) {
      let ajax;
      switch (type) {
        case 'CurBlog':
          ajax = ApiBlog.GetBlogById;
          const blogs = (rootState.Pager.BlogPager.list || []).filter((b) => {
            return b.id == params;
          });
          if (blogs.length > 0) {
            Pager.UpdateCur({
              type,
              data: blogs[0]
            });
          }
          break;

        case 'CurUser':
          ajax = ApiUser.GetUserInfo;
          // TODO
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
