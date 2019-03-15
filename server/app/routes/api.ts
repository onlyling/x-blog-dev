import { Application } from 'egg';

/**
 * 填充路径
 * @param p 路径
 */
const FixApiPath = (p: string): string => {
  return `/api${p}`;
};

export default (app: Application) => {
  const { controller, router } = app;

  // 用户相关
  router.post(FixApiPath('/user/one'), controller.api.user.PostOne);
  router.post(FixApiPath('/user/login'), controller.api.user.PostLogin);

  // 标签相关
  router.post(FixApiPath('/tag/one'), controller.api.tag.PostOne);
  router.get(FixApiPath('/tag/pager'), controller.api.tag.GetPager);

  // 类目项目
  router.post(FixApiPath('/category/one'), controller.api.category.PostOne);

  // 日记项目
  router.post(FixApiPath('/blog/one'), controller.api.blog.PostOne);
  router.get(FixApiPath('/blog/pager'), controller.api.blog.GetPager);
};
