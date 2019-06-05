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

  // 目录
  router.post(FixApiPath('/category/one'), adminRequired, controller.api.category.PostOne);
  router.put(FixApiPath('/category/one'), adminRequired, controller.api.category.PutOne);
  router.delete(FixApiPath('/category/one'), adminRequired, controller.api.category.DeleteOne);
};
