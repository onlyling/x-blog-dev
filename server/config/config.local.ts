import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'blog',
    username: 'root',
    password: '1234567890',
    timezone: '+08:00',
  };

  config.security = {
    csrf: false,
  };

  return config;
};
