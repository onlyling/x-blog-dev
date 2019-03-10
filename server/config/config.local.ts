import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    sequelize: {
      dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
      database: 'blog',
      host: 'localhost',
      port: '3306',
      username: 'root',
      password: '',
      timezone: '+08:00'
    },
    security: {
      csrf: false
    }
  };
  return config;
};
