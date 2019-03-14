import { Application } from 'egg';
import Api from './routes/api';
import Admin from './routes/admin';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  // API
  Api(app);
  Admin(app);
};
