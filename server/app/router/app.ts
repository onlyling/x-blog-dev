import { Application } from 'egg';

/**
 * 构建路径
 * @param p 路径
 */
const buildPath = (p: string) => {
  return `/api/app/${p}`;
};

export default (app: Application) => {
  const { controller, router } = app;
  const jwt = app.middleware.jwt(app.config.jwt);
  const auth = app.middleware.auth({
    scope: 'app',
  });

  router.post(buildPath('user/login'), controller.app.user.PostLogin);
  router.post(buildPath('user/register'), controller.app.user.PostRegister);
  router.get(buildPath('user/mine'), jwt, auth, controller.app.user.GetCurUserInfo);

  router.post(buildPath('tag'), controller.app.tag.PostTag);

  router.post(buildPath('micro-blog'), jwt, auth, controller.app.microBlog.PostMicroBlog);
};
