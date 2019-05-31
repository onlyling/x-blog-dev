/**
 * 没有约束的对象格式
 */
export type TypeAnyObject<T = any> = {
  [index: string]: T;
};

/**
 * 分页
 */
export type TypePagerParam = {
  curPage: number;
  pageSize: number;
  totalRow: number;
  totalPage: number;
};
