import { Application } from 'egg';

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
};
