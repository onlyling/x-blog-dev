import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'scf-blog',
    username: 'root',
    password: '1234567890',
    timezone: '+08:00',
  };

  // config.typeorm = {
  //   type: 'mysql',
  //   host: 'localhost',
  //   port: 3306,
  //   username: 'root',
  //   password: '1234567890',
  //   database: 'scf-blog',
  //   synchronize: true,
  //   logging: false,
  //   entities: ['app/entity/**/*.ts'],
  //   migrations: ['app/migration/**/*.ts'],
  //   subscribers: ['app/subscriber/**/*.ts'],
  //   cli: {
  //     entitiesDir: 'app/entity',
  //     migrationsDir: 'app/migration',
  //     subscribersDir: 'app/subscriber',
  //   },
  // };

  config.security = {
    csrf: false,
  };

  return config;
};
