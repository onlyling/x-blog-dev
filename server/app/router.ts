import { Application } from 'egg';

import AppRouter from './router/app';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  AppRouter(app);
};
