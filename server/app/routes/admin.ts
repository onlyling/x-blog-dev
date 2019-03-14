import { Application } from 'egg';

/**
 * 填充路径
 * @param p 路径
 */
const FixApiPath = (p: string): string => {
  return `/admin${p}`;
};

export default (app: Application) => {
  const { controller, router } = app;

  // 用户相关
  router.post(FixApiPath('/user/login'), controller.admin.user.PostLogin);
};
