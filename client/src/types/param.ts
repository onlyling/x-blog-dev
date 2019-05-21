/**
 * 修改密码参数
 */
export type TypeUserNewPasswordParam = {
  id: number;
  password: string;
  new_password: string;
  new_2_password: string;
};

/**
 * 新增/编辑文章参数
 */
export type TypeBlogParam = {
  id?: number;
  title: string;
  category_id: number;
  tags: number[];
  markdown_content: string;
};
