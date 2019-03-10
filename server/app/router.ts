import { Application } from 'egg';
import Api from './routes/api';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  // API
  Api(app);
};
