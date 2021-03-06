import { Application } from 'egg';

/**
 * 填充路径
 * @param p 路径
 */
const FixApiPath = (p: string): string => {
  return `/admin${p}`;
};

export default (app: Application) => {
  const { controller, router, middleware } = app;

  const adminRequired = middleware.adminRequired();

  // 用户相关
  router.post(FixApiPath('/user/login'), controller.admin.user.PostLogin);
  router.get(FixApiPath('/user/pager'), controller.api.user.GetPager);

  // 目录
  router.post(FixApiPath('/category/one'), adminRequired, controller.api.category.PostOne);
  router.put(FixApiPath('/category/one'), adminRequired, controller.api.category.PutOne);
  router.delete(FixApiPath('/category/one'), adminRequired, controller.api.category.DeleteOne);

  // 标签
  router.post(FixApiPath('/tag/one'), adminRequired, controller.api.tag.PostOne);
  router.put(FixApiPath('/tag/one'), adminRequired, controller.api.tag.PutOne);
  router.delete(FixApiPath('/tag/one'), adminRequired, controller.api.tag.DeleteOne);
};
