import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  // mysql ORM
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },

  // JWT
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
};

export default plugin;
