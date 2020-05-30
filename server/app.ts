import { Application } from 'egg';

module.exports = (app: Application) => {
  if (app.config.env === 'local' || app.config.env === 'unittest') {
    app.beforeStart(async () => {
      await app.model.sync({ force: false });
    });
  }
};
