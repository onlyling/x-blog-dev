import { Service } from 'egg';

/**
 * Blog Service
 */
export default class MainService extends Service {
  /**
   * SaveBlog
   */
  public async SaveBlog({ id, title = '', markdown_content = '', tags = [] }) {
    const { ctx } = this;
    const { helper, model } = ctx;

    if (title == '') {
      return helper.ApiError('title 必填');
    }
    if (markdown_content == '') {
      return helper.ApiError('markdown_content 必填');
    }

    // const content = helper.Marked(markdown_content);

    if (id) {
      // 修改文章
    } else {
      // 保存文章
      console.log(model);
      if (tags.length > 0) {
        // 管理标签关系
      }
    }
  }
}
