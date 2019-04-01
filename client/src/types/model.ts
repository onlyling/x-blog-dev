// 用户的基础类型
export interface TypeUserModel {
  id?: number;
  user_name: string;
  password?: string;
  super_admin?: boolean;
  describe?: string;
  email?: string;
  company?: string;
  personal_web?: string;
  title?: string;
  tag?: string;
  location?: string;
}

// 日记的基础类型
export interface TypeBlogModel {
  id: number;
  title: string;
  content: string;
  visit_count: number;
  created_at: string;
  updated_at: string;
  category_id: number;
  user_id: number;
  user: TypeUserModel;
  category: TypeCategoryModel;
  tags: TypeTagModel[];
}

// 类目的基础类型
export interface TypeCategoryModel {
  id: number;
  name: string;
}

// 标签基础类型
export interface TypeTagModel {
  id: number;
  name: string;
}

// 分页数据的基础类型
export interface TypePagerModel<T = any> {
  list: T[];
  pagesize: number;
  curpage: number;
  totals: number;
  pages: number;
}

// 日记分页基础类型
export type TypeBlogPagerModel = TypePagerModel<TypeBlogModel>;
