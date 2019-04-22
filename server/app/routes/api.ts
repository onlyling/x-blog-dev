import { Application } from 'egg';

/**
 * 填充路径
 * @param p 路径
 */
const FixApiPath = (p: string): string => {
  return `/api${p}`;
};

export default (app: Application) => {
  const { controller, router, middleware } = app;

  const userRequired = middleware.userRequired();

  // 用户相关
  router.post(FixApiPath('/user/one'), controller.api.user.PostOne);
  router.post(FixApiPath('/user/login'), controller.api.user.PostLogin);
  router.get(FixApiPath('/user/one'), controller.api.user.GetOne);
  router.put(FixApiPath('/user/one'), controller.api.user.PutOne);

  // 标签相关
  router.post(FixApiPath('/tag/one'), userRequired, controller.api.tag.PostOne);
  router.get(FixApiPath('/tag/pager'), controller.api.tag.GetPager);
  router.get(FixApiPath('/tag/rank'), controller.api.tag.GetTagRankList);
  router.get(FixApiPath('/tag/blog-pager'), controller.api.tag.GetTagAndBlogPager);

  // 类目项目
  router.post(FixApiPath('/category/one'), controller.api.category.PostOne);

  // 日记项目
  router.post(FixApiPath('/blog/one'), userRequired, controller.api.blog.PostOne);
  router.get(FixApiPath('/blog/pager'), controller.api.blog.GetPager);
  router.get(FixApiPath('/blog/one'), controller.api.blog.GetOne);
};
